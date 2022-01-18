(function() {
    'use strict';

    window.requestAnimFrame = (function() {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    })();

    // COLORS
    var SPHERE_SEGMENTS_COLOR = 0xffffff;
    var SPHERE_BACKGROUND_COLOR = 0x284641;

    // SCENE =========================================
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    // CAMERA ========================================
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 1000;

    // CANVAS INJECTED CONTAINER =====================
    var container = document.getElementsByClassName('image');

    // THREE.JS SET UP ===============================
    var renderer = new THREE.WebGLRenderer();
    var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    var scene = new THREE.Scene();

    // Additional settings ===========================
    camera.position.z = 150;
    renderer.setSize(WIDTH, HEIGHT);

    // SPHERE MESH ===============================
    var radius = 30,
        segments = 16,
        rings = 16;


    // sphere 1
    var octahedronSphereMaterial = new THREE.MeshBasicMaterial({
		color: SPHERE_SEGMENTS_COLOR,
		wireframe: true,
		opacity: 0.3,
		transparent: true,
		wireframeLinewidth: 4
	});

    var sphereMaterial = new THREE.MeshBasicMaterial({
		color: SPHERE_SEGMENTS_COLOR,
		wireframe: true,
		opacity: 0.4,
		transparent: true,

	});

    var octahedronSphere = new THREE.Mesh(new THREE.OctahedronGeometry(radius, 3), octahedronSphereMaterial);
    var sphereMaterialBg = new THREE.MeshBasicMaterial({
        color: SPHERE_BACKGROUND_COLOR,
        opacity: .7,
        transparent: true
    });

    var sphereWithBg = new THREE.Mesh(new THREE.SphereBufferGeometry(radius, segments, rings), sphereMaterialBg);

    var sphere_3 = new THREE.Mesh(new THREE.SphereBufferGeometry(radius, segments, rings), sphereMaterial);

    scene.add(sphereWithBg);
    scene.add(octahedronSphere);
    scene.add(sphere_3);

    // RENDER
    container.appendChild(renderer.domElement);

    // Render Function
    var render = function() {
        requestAnimationFrame(render);

        // Rotation Animation
        octahedronSphere.rotation.z += 0.001;
        octahedronSphere.rotation.y += 0.002;
        octahedronSphere.rotation.x += 0.003;

        sphereWithBg.rotation.z += 0.001;
		sphereWithBg.rotation.y += 0.002;
        sphereWithBg.rotation.x += 0.003;

        sphere_3.rotation.z += 0.001;
		sphere_3.rotation.y += 0.002;
		sphere_3.rotation.x += 0.003;

        //Render Initialize
        renderer.render(scene, camera);
    };

    render();

}());
