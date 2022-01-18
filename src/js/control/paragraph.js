import control from '../control'
import utils from '../utils'
/**
 * Text input class
 * Output a <input type="text" ... /> form element
 */
export default class controlParagraph extends control {
  
  /**
  * javascript & css to load
  */
  configure() {
    
    
    // this.js = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/86/three.min.js'
    this.js = 'assets/js/3d.js'
    this.css = 'assets/css/style.css'
    
  }
  /**
   * build a paragraph DOM element
   * @return {Object} DOM Element to be injected into the form.
   */
  build() {
    const { type, ...attrs } = this.config
    let tag = type

    // some types use an element of a different name
    const typeMap = {
      paragraph: 'p',
      header: this.subtype,
    }
    if (typeMap[type]) {
      tag = typeMap[type]
    }
    return {
      field: this.markup(tag, utils.parsedHtml(this.label), attrs),
      layout: 'noLabel',
    }
  }
}
// https://cdnjs.cloudflare.com/ajax/libs/three.js/86/three.min.js
// register the following controls
control.register(['paragraph', 'header', 'image2'], controlParagraph)
control.register(['p','div', 'address', 'blockquote', 'canvas', 'output'], controlParagraph, 'paragraph')
// control.register(['canvas'], controlParagraph, 'image')
control.register(['div'], controlParagraph, 'image2')
// control.register(['div'], controlParagraph, 'image3')

control.register(['h1', 'h2', 'h3', 'h4', 'h5'], controlParagraph, 'header')
