declare module 'd3-svg-to-png' {
  type Options = {
    format: string
    scale: number
    quality: number
    download: boolean
    ignore: string
    cssinline: number
    background: string
  }
  function d3ToPng(selector: string | Element, fileName: string, options?: Partial<Options>): Promise<string>

  export default d3ToPng
}
