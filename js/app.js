const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z=3;
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls=new THREE.OrbitControls(camera,renderer.domElement);
const light=new THREE.PointLight(0xffffff,1);
light.position.set(10,10,10);
scene.add(light);

let mesh;

function setSolid(type){
if(mesh) scene.remove(mesh);
mesh=new THREE.Mesh(createGeometry(type),new THREE.MeshNormalMaterial());
scene.add(mesh);
updateInfo(type);
}

buildButtons(setSolid);
setSolid('Tetrahedron');

function animate(){
requestAnimationFrame(animate);
if(mesh) mesh.rotation.y+=0.01;
renderer.render(scene,camera);
}
animate();

window.addEventListener('resize',()=>{
camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);
});