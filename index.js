function inlineStyles (source, target) {
  // inline style from source element to the target (detached) one
  const computed = window.getComputedStyle(source);
  for (const styleKey of computed) {
    target.style[styleKey] = computed[styleKey]
  }

  // recursively call inlineStyles for the element children
  for (let i = 0; i < source.children.length; i++) {
    inlineStyles(source.children[i], target.children[i])
  }
}

function copyToCanvas ({ source, target, scale, format, quality }) {
  let svgSize = source.getBoundingClientRect();
  target.setAttribute('width', svgSize.width + 'px');
  target.setAttribute('height', svgSize.height + 'px');

  let svgData = new XMLSerializer().serializeToString(target);
  let canvas = document.createElement('canvas');

  //Resize can break shadows
  canvas.width = svgSize.width * scale;
  canvas.height = svgSize.height * scale;
  canvas.style.width = svgSize.width;
  canvas.style.height = svgSize.height;

  let ctxt = canvas.getContext('2d');
  ctxt.scale(scale, scale);

  let img = document.createElement('img');

  img.setAttribute(
    'src',
    'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  );
  return new Promise(resolve => {
    img.onload = () => {
      ctxt.drawImage(img, 0, 0);
      resolve(canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : format}`,  quality));
    };
  });
}

function downloadImage ({ file, name, format }) {
  let a = document.createElement('a');
  a.download = `${name}.${format}`;
  a.href = file;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

module.exports = async function (
  source,
  name,
  {
    scale = 1,
    format = 'png',
    quality = 0.92,
    download = true,
    ignore = null,
    cssinline = 1,
    background = null
  } = {}
) {
  // Accept a selector or directly a DOM Element
  source = (source instanceof Element) ? source : document.querySelector(source);

  // Create a new SVG element similar to the source one to avoid modifying the
  // source element.
  const target = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  target.innerHTML = source.innerHTML;
  for (const attr of source.attributes) {
    target.setAttribute(attr.name, attr.value);
  }

  // Set all the css styles inline on the target element based on the styles
  // of the source element
  if (cssinline === 1) {
    inlineStyles(source, target);
  }

  if (background) {
    target.style.background = background
  }

  //Remove unwanted elements
  if (ignore != null) {
    const elt = target.querySelector(ignore);
    elt.parentNode.removeChild(elt);
  }

  //Copy all html to a new canvas
  const file = await copyToCanvas({
    source,
    target,
    scale,
    format,
    quality
  });

  if (download) {
    downloadImage({ file, name, format });
  }
  return file;
}
