const descriptions = {
  Tetrahedron: "🔺 Тетраедр — 4 трикутні грані, найпростіше платонове тіло.",
  Cube: "🟦 Куб — 6 квадратних граней, класична 3D форма.",
  Octahedron: "🔶 Октаедр — 8 трикутних граней, дві піраміди.",
  Dodecahedron: "⬟ Додекаедр — 12 п’ятикутних граней.",
  Icosahedron: "🔷 Ікосаедр — 20 трикутних граней, складна симетрія."
};

const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement); 

const controls = new THREE.OrbitControls(camera, renderer.domElement);
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

let mesh;

function createGeometry(type) {
  switch (type) {
    case "Tetrahedron": return new THREE.TetrahedronGeometry(1);
    case "Cube": return new THREE.BoxGeometry(1, 1, 1);
    case "Octahedron": return new THREE.OctahedronGeometry(1);
    case "Dodecahedron": return new THREE.DodecahedronGeometry(1);
    case "Icosahedron": return new THREE.IcosahedronGeometry(1);
  }
}

function setSolid(type) {
  if (mesh) scene.remove(mesh);
  const geometry = createGeometry(type);
  const material = new THREE.MeshNormalMaterial({ flatShading: true });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const descEl = document.getElementById("description");
  if (descEl) descEl.innerText = descriptions[type];

  document.querySelectorAll("button[data-type]").forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.type === type) btn.classList.add("active");
  });
}

// Обробка кліків
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.type) {
      setSolid(btn.dataset.type);
      // Автоматичне згортання після кліку (для всіх пристроїв)
      document.querySelectorAll('#buttons button:not(#menuToggle)').forEach(b => {
        b.classList.add('hidden');
      });
    }
  });
});

// Логіка згортання меню
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    document.querySelectorAll('#buttons button:not(#menuToggle)').forEach(btn => {
      btn.classList.toggle('hidden');
    });
  });
}

// Старт
setSolid("Tetrahedron");

// Завжди згортати меню при завантаженні сторінки
document.querySelectorAll('#buttons button:not(#menuToggle)').forEach(btn => {
  btn.classList.add('hidden');
});

function animate() {
  requestAnimationFrame(animate);
  if (mesh) mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});