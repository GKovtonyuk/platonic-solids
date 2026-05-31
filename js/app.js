const descriptions = {
  Tetrahedron: "🔺 Тетраедр — 4 трикутні грані, найпростіше платонове тіло.",
  Cube: "🟦 Куб — 6 квадратних граней, класична 3D форма.",
  Octahedron: "🔶 Октаедр — 8 трикутних граней, дві піраміди.",
  Dodecahedron: "⬟ Додекаедр — 12 п’ятикутних граней.",
  Icosahedron: "🔷 Ікосаедр — 20 трикутних граней, складна симетрія."
};

// сцена
const scene = new THREE.Scene();

// камера
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// світло
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

let mesh;

// геометрії
function createGeometry(type) {
  switch (type) {
    case "Tetrahedron": return new THREE.TetrahedronGeometry(1);
    case "Cube": return new THREE.BoxGeometry(1, 1, 1);
    case "Octahedron": return new THREE.OctahedronGeometry(1);
    case "Dodecahedron": return new THREE.DodecahedronGeometry(1);
    case "Icosahedron": return new THREE.IcosahedronGeometry(1);
  }
}

// створення фігури
function setSolid(type) {

  if (mesh) scene.remove(mesh);

  const geometry = createGeometry(type);
  const material = new THREE.MeshNormalMaterial({ flatShading: true });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  document.getElementById("description").innerText = descriptions[type];

  // активна кнопка
  document.querySelectorAll("button").forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.type === type) {
      btn.classList.add("active");
    }
  });
}

// кнопки
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    setSolid(btn.dataset.type);
  });
});

// старт
setSolid("Tetrahedron");

// анімація
function animate() {
  requestAnimationFrame(animate);
  if (mesh) mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});