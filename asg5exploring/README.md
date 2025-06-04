# Three.js 3D Scene Exploration

## Overview
This project recreates a first-person exploration application using **Three.js**, a high-level JavaScript 3D graphics library. The application features a dynamic 3D scene with multiple shapes, textures, lighting, and interactive controls. It expands upon the concepts learned in the course, allowing for a deeper understanding of 3D graphics and the use of high-level libraries.

## Features
- 🌐 **Scene Composition:** Includes at least 20 primary 3D shapes (cubes, spheres, cylinders) to build a rich environment.
- 🎨 **Texturing:** Applied textures to at least one 3D object, including a custom 3D model (.obj) with an accompanying .mtl file.
- 🔦 **Lighting:** Implemented three different types of lights:
  - DirectionalLight
  - HemisphereLight
  - PointLight
- ☁️ **Skybox:** Integrated a textured skybox using a cubemap for a realistic background.
- 🖱️ **Camera Controls:** Configured **OrbitControls** for intuitive mouse-based scene navigation.
- 🎭 **Custom 3D Model:** Loaded an OBJ model with material mapping using the OBJLoader.
- 💫 **Wow Point:** Added interactive object selection, allowing users to click on objects to display their names and toggle colors, enhancing scene interactivity.
- 🗺️ **Animations:** Animated at least one 3D object using Three.js animation loops.

## Installation & Usage
1. Clone or download this repository to your local machine.
2. Make sure all dependencies (if any) are installed (usually none, as Three.js can be linked via CDN).
3. Place the texture files and 3D models in the correct directory structure:
    ```
    - index.html
    - main.js
    - obj/
        - Mesh_BengalTiger.obj
        - Mesh_BengalTiger.mtl
    - img/
        - tiger_skin.jpg
        - skybox.jpeg
    - audio/
        - tiger-sound.mp3 (optional)
    ```
4. Open `index.html` in your web browser to run the application.

## Controls
- **Mouse:** Use the mouse to rotate, zoom, and pan around the scene with OrbitControls.
- **Click:** Click on 3D objects to display their names and toggle their colors.

## Additional Information
- The project was built using Three.js, following the recommended tutorials from the assignment.
- Additional references include:
  - Three.js documentation
  - MDN WebGL resources
  - Community tutorials on loading .obj and .mtl files
- The OBJ model uses a relative texture path, so ensure that the `.mtl` file correctly references the texture (e.g., `map_Kd ../img/tiger_skin.jpg`).

## Notes
- Some features, such as interactive object selection and toggling, were implemented as the "Wow Point" to enhance the project beyond basic requirements.
- ChatGPT assisted with debugging, structuring render logic, and refining lighting and texture configurations.

## Contact
- **Name:** Mahi Rahman
- **Email:** mrahma10@ucsc.edu

---

obj credit: Airplane by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/a3XrQkLNna9)

Tiger by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/5A3w06FXUup)

Enjoy exploring the scene!
