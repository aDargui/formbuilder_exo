import control from '../control'
import * as THREE from 'three'

// import earth from './earth'



  /**
   * Image Dargui 3d class
   */
  export default class controlImageDargui extends control {
    // /**
    //  * Class configuration - return the icons & label related to this control
    //  * @returndefinition object
    //  */

    static get definition() {
      return {
        // icon: '🌟',
        i18n: {
          default: 'Vue 3d'
        },
      }
    }

    /**
     * javascript & css to load
     */
    configure() {
        // this.js = 'assets/js/3d.js'
        this.css = 'assets/css/style.css'
    }

    /**
     * build a text DOM element, supporting other jquery text form-control's
     * @return {Object} DOM Element to be injected into the form.
     */
    build() {
      
      return this.markup('div', null, { id: this.config.name, class: 'imagedargui'  })
      }
      /**
     * onRender callback
     */
    onRender() {
      // Bascket()
      // ------------------------------------------------------
      // Scene
      // ------------------------------------------------------
      const scene = new THREE.Scene();
      let containerField = document.querySelector('.imagedargui-field');
        // var WIDTH = window.innerWidth,
        //     HEIGHT = window.innerHeight;
      let WIDTH = containerField.clientWidth,
          HEIGHT = containerField.clientHeight*10;

      // let container = document.querySelector('.formbuilder-imagedargui');
      let container = document.getElementById(this.config.name);

      // ------------------------------------------------------
      // Camera
      // ------------------------------------------------------

      // let fieldOfView = 75,
      //     aspectRatio = WIDTH/HEIGHT,
      //     near = 0.1,
      //     far = 400;

      let fieldOfView = 75,
          aspectRatio = window.innerWidth/window.innerHeight,
          near = 0.1,
          far = 400;
      const camera = new THREE.PerspectiveCamera( fieldOfView, aspectRatio, near, far );
      camera.position.z = 120;

      // ------------------------------------------------------
      // Lights
      // ------------------------------------------------------

      const light = new THREE.DirectionalLight( 0xffffff );
      light.position.set( 1, 0, 2 ).normalize();
      scene.add(light);
      
      // ------------------------------------------------------
      // Mesh
      // ------------------------------------------------------

      // planet
      // ---------
      let planetRadius = 40,
          planetWidthSegments = 20,
          planetHeightSegments = 20;

      let planetMaterial = new THREE.MeshPhongMaterial( {} );
      let loader = new THREE.ImageLoader();

      loader.load( "https://raw.githubusercontent.com/afonsopacifer/cdn/master/earthmap1k.jpg", ( image ) => {
        let texture = new THREE.Texture();
        texture.image = image;
        texture.needsUpdate = true;
        
        planetMaterial.map = texture;
        planetMaterial.needsUpdate = true;
      });

      const planetGeometry = new THREE.SphereGeometry( planetRadius, planetWidthSegments, planetHeightSegments );

      const planet = new THREE.Mesh( planetGeometry, planetMaterial );



      // moon
      // ---------
      let moonRadius = 12,
          moonWidthSegments = 10,
          moonHeightSegments =10;

      let moonMaterial = new THREE.MeshPhongMaterial( {} );
      let loader2 = new THREE.ImageLoader();

      loader2.load( "https://raw.githubusercontent.com/afonsopacifer/cdn/master/moonmap1k.jpg", ( image ) => {
        let texture = new THREE.Texture();
        texture.image = image;
        texture.needsUpdate = true;
        
        moonMaterial.map = texture;
        moonMaterial.needsUpdate = true;
      });

      const moonGeometry = new THREE.SphereGeometry( moonRadius, moonWidthSegments, moonHeightSegments );

      const moon = new THREE.Mesh( moonGeometry, moonMaterial );


      scene.add( planet, moon );


      // ------------------------------------------------------
      // render
      // ------------------------------------------------------

      const renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setSize( WIDTH, HEIGHT );
      container.appendChild(renderer.domElement);
      // document.body.appendChild( renderer.domElement );

      const render = () => {
        
          moon.position.set( -100, 20, -10 );

        // ------------------------------------------------------
        // animation
        // ------------------------------------------------------
        
        requestAnimationFrame( render );
        planet.rotation.y += 0.003;
        moon.rotation.y -= 0.010;
        
        renderer.render( scene, camera );
        
      };
      
      render()
       
            
          }
    
    }

    

  control.register(['imagedargui'], controlImageDargui)
  // control.register(['div'], controlImagedargui, 'imagedargui')

