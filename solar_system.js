const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const planets = [
    { name: 'Mercury', size: 0.055, color: 0xaaaaaa, distance: 1.5, inclination: 7 },
    { name: 'Venus', size: 0.095, color: 0xffcc00, distance: 2.5, inclination: 3.39 },
    { name: 'Earth', size: 0.1, color: 0x0000ff, distance: 3.5, inclination: 50 },
    { name: 'Mars', size: 0.053, color: 0xff0000, distance: 4.5, inclination: 1.85 },
    { name: 'Jupiter', size: 1.0, color: 0xff8800, distance: 6.5, inclination: 1.3 },
    { name: 'Saturn', size: 0.85, color: 0xffdd44, distance: 8.5, inclination: 2.49 },
    { name: 'Uranus', size: 0.4, color: 0x00ffff, distance: 10.5, inclination: 0.77 },
    { name: 'Neptune', size: 0.39, color: 0x0000ff, distance: 12.5, inclination: 1.77 }
];

const planetMeshes = planets.map(planet => {
    const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: planet.color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = planet.distance;
    scene.add(mesh);
    return { mesh, distance: planet.distance, inclination: planet.inclination };
});

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    planetMeshes.forEach(({ mesh, distance, inclination }) => {
        const angle = Date.now() * 0.0001 * distance;
        mesh.position.x = Math.cos(angle) * distance;
        mesh.position.y = Math.sin(inclination * Math.PI / 180) * distance;
        mesh.position.z = Math.sin(angle) * distance * Math.cos(inclination * Math.PI / 180);
    });
    renderer.render(scene, camera);
}

animate();
