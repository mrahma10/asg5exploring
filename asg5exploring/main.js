import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Create the scene
const scene = new THREE.Scene();


// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;  

// Add AudioListener to camera
const listener = new THREE.AudioListener();
camera.add(listener);

// Create a global audio source
const sound = new THREE.Audio(listener);

// Load the sound
const audioLoader = new THREE.AudioLoader();
audioLoader.load('audio/tiger-sound.mp3', function(buffer) {
    sound.setBuffer(buffer);
});

// Create the renderer
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas }); 
renderer.setSize(800, 800); 

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.25; 
controls.screenSpacePanning = false; 
controls.maxPolarAngle = Math.PI / 2; 

// Create a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// Add a Point Light
const pointLight = new THREE.PointLight(0xff00ff, 1, 100);
pointLight.position.set(-5, 5, 5);
scene.add(pointLight);

// Get light control elements
const togglePointLightButton = document.getElementById('togglePointLight');
const ambientIntensitySlider = document.getElementById('ambientIntensity');
const directionalIntensitySlider = document.getElementById('directionalIntensity');
const directionalXSlider = document.getElementById('directionalX');
const directionalYSlider = document.getElementById('directionalY');
const directionalZSlider = document.getElementById('directionalZ');
const pointIntensitySlider = document.getElementById('pointIntensity');
const pointXSlider = document.getElementById('pointX');
const pointYSlider = document.getElementById('pointY');
const pointZSlider = document.getElementById('pointZ');

// Event listeners for light controls
togglePointLightButton.addEventListener('click', () => {
    pointLight.visible = !pointLight.visible;
});

ambientIntensitySlider.addEventListener('input', (event) => {
    ambientLight.intensity = parseFloat(event.target.value);
});

directionalIntensitySlider.addEventListener('input', (event) => {
    directionalLight.intensity = parseFloat(event.target.value);
});

directionalXSlider.addEventListener('input', (event) => {
    directionalLight.position.x = parseFloat(event.target.value);
});
directionalYSlider.addEventListener('input', (event) => {
    directionalLight.position.y = parseFloat(event.target.value);
});
directionalZSlider.addEventListener('input', (event) => {
    directionalLight.position.z = parseFloat(event.target.value);
});

pointIntensitySlider.addEventListener('input', (event) => {
    pointLight.intensity = parseFloat(event.target.value);
});
pointXSlider.addEventListener('input', (event) => {
    pointLight.position.x = parseFloat(event.target.value);
});
pointYSlider.addEventListener('input', (event) => {
    pointLight.position.y = parseFloat(event.target.value);
});
pointZSlider.addEventListener('input', (event) => {
    pointLight.position.z = parseFloat(event.target.value);
});

// Create shapes array to store all shapes
const shapes = [];

// Materials
const coloredMaterials = [
    new THREE.MeshPhongMaterial({ color: 0xff0000 }),  // Red
    new THREE.MeshPhongMaterial({ color: 0x00ff00 }),  // Green
    new THREE.MeshPhongMaterial({ color: 0x0000ff }),  // Blue
    new THREE.MeshPhongMaterial({ color: 0xffff00 }),  // Yellow
    new THREE.MeshPhongMaterial({ color: 0xff00ff }),  // Magenta
    new THREE.MeshPhongMaterial({ color: 0x00ffff })   // Cyan
];

// Texture Loader for shapes and panoramic skybox
const textureLoader = new THREE.TextureLoader();
const tigerTexture = textureLoader.load('img/tiger_skin.jpg'); // Updated path
const texturedMaterial = new THREE.MeshPhongMaterial({ map: tigerTexture });

// Create 8 cubes
for (let i = 0; i < 8; i++) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // Randomly select a material (colored or textured)
    const material = Math.random() > 0.5 ? texturedMaterial : coloredMaterials[i % coloredMaterials.length];
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set((i - 4) * 2, 4, 0);
    scene.add(cube);
    shapes.push({
        mesh: cube,
        rotationSpeed: { x: 0.01, y: 0.01, z: 0 }
    });
}

// Create 6 spheres
for (let i = 0; i < 6; i++) {
    const geometry = new THREE.SphereGeometry(0.7, 32, 32);
    
    const material = Math.random() > 0.5 ? texturedMaterial : coloredMaterials[i % coloredMaterials.length];
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set((i - 3) * 2, 0, 0);
    scene.add(sphere);
    shapes.push({
        mesh: sphere,
        rotationSpeed: { x: 0.01, y: 0.01, z: 0.01 }
    });
}

// Create 6 cylinders
for (let i = 0; i < 6; i++) {
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
    // Randomly select a material (colored or textured)
    const material = Math.random() > 0.5 ? texturedMaterial : coloredMaterials[i % coloredMaterials.length];
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set((i - 3) * 2, -4, 0);
    scene.add(cylinder);
    shapes.push({
        mesh: cylinder,
        rotationSpeed: { x: 0.01, y: 0.01, z: 0 }
    });
}

// Load custom 3D model
const objLoader = new OBJLoader();
objLoader.load(
    'obj/Mesh_BengalTiger.obj', // Updated filename
    function (object) {
        // Add the loaded object to the scene
        scene.add(object);
        
        object.position.set(-1, -1.5, 4); 
        object.rotation.y = Math.PI / 2; 
        object.scale.set(0.01, 0.01, 0.01); 
    },
    function (xhr) {
        // Optional: called when loading is in progresses
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        // Optional: called when there are errors
        console.error('An error happened', error);
    }
);

// Load Plane model (OBJ)
objLoader.load(
    'obj/1405 Plane.obj', // path to the plane .obj file
    function (object) {
        // Add the loaded object to the scene
        scene.add(object);
        // Adjust position and scale as needed
        object.position.set(2, 5, 0); // Example position below other shapes
        object.rotation.y = Math.PI / 2; // Rotate to face sideways
        object.scale.set(0.1, 0.1, 0.1); // Adjusted scale
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded for plane');
    },
    function (error) {
        console.error('An error happened loading plane', error);
    }
);

// Add skybox using panoramic image
const skyboxTexture = textureLoader.load('img/skybox.jpeg', () => {
    // Once the texture is loaded, set it as the scene background
    scene.background = skyboxTexture;
    skyboxTexture.mapping = THREE.EquirectangularReflectionMapping; 

    // Set texture filtering for smoother appearance
    skyboxTexture.minFilter = THREE.LinearFilter;
    skyboxTexture.magFilter = THREE.LinearFilter;
});
skyboxTexture.colorSpace = THREE.SRGBColorSpace; // Set color space

// Raycaster for click detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onCanvasClick(event) {
    // Play the sound every time the canvas is clicked
    if (sound.buffer) { // Make sure the sound buffer is loaded
        const clickSound = new THREE.Audio(listener); // Create a new audio source
        clickSound.setBuffer(sound.buffer); // Set the loaded buffer
        clickSound.play(); // Play the new sound instance
    }
}

// Add event listener for clicks on the canvas
renderer.domElement.addEventListener('click', onCanvasClick, false);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Rotate all shapes
    shapes.forEach((shape) => {
        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
        shape.mesh.rotation.z += shape.rotationSpeed.z;
    });

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
