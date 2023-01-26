# d3-svg-to-png

Converts SVG elements in the browser to PNG and other image formats, while keeping CSS styles. Optionally, it returns the data as a promise or downloads it. It can also rescale the svg image, ignore certain DOM elements...

## Installation

```shell
$ npm i d3-svg-to-png
```

## Usage

```js
const d3ToPng = require('d3-svg-to-png');
d3ToPng('selector', 'name');
```

## Mandatory fields

- **Selector** (String): Commonly 'svg' or DOM Element.
- **Name** (String): Name for the file output, without extension.

Output: **name.png**

## Options

```js
const d3ToPng = require('d3-svg-to-png');
d3ToPng('svg', 'name', {
  scale: 3,
  format: 'webp',
  quality: 0.01,
  download: false,
  ignore: '.ignored',
  background: 'white'
}).then(fileData => {
  //do something with the data
});
```

- **scale** (number): Rescale the image by this factor. Default: _1_
- **format** (string): The format to output to. Compatibility might vary between browsers. See [HTMLCanvasElement.toDataURL()
  ](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL). Default: _png_
- **quality** (number): Between 0 (lowest) and 1. Affects formats with compression, like jpg. Default: _.92_
- **download** (boolean): Whether to download the resulting image. Default: _true_
- **ignore** (string): A CSS selector that, the matched elements of which will not be added to the output. Default: _null_
- **background** (string): A style to be added to the svg element. The value will be added as the _background_ shorthand css property, so it can be a single color, an image a gradient or any thing that is a valid background. Default: _null_

## Notes

Please report any problem, as this has not been thoroughly tested and could be improved.
This module works outside of D3. It was created for the [GoPro Telemetry Extractor](https://goprotelemetryextractor.com)

## Contribution

Please make your changes to the **dev** branch, so that automated tests can be run before merging to **master**. Also, if possible, provide tests for new functionality.

## TODO

- Add tests and continuous integration
- Test on multiple browsers

## More creative coding

If you liked this you might like some of my [app prototyping](https://prototyping.barcelona).

## Acknowledgements/credits

- [Juan Irache](https://github.com/JuanIrache) - Main developer
- [Thành Trang](https://github.com/trangcongthanh) - Contributor
- [dwiesner](https://github.com/dwiesner) - Contributor
