import control from '../control'

/**
 * Image Dargui 3d class - show 5 stars with the ability to select a rating
 */

  /**
   * Star rating class
   */
  class controlImagedargui extends control {
    // /**
    //  * Class configuration - return the icons & label related to this control
    //  * @returndefinition object
    //  */

    static get definition() {
      return {
        // icon: '🌟',
        i18n: {
          default: 'Image Dargui'
        },
    
        defaultAttrs:{
            'Extra Content': {
                'label': 'extracontent', 
                'value' : '', 
                'type': 'textarea'
            }
        }
      }
    }

    /**
     * javascript & css to load
     */
    configure() {
        this.js = 'assets/js/3d.js'
        this.css = 'assets/css/style.css'
    }

    /**
     * build a text DOM element, supporting other jquery text form-control's
     * @return {Object} DOM Element to be injected into the form.
     */
    build() {
        return this.markup('div', null, { id: this.config.name, class: 'imagedargui'  })
      }
    }

  control.register(['imagedargui'], controlImagedargui)
  // control.register(['div'], controlImagedargui, 'imagedargui')

