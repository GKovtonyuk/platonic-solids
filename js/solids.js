function createGeometry(type){
switch(type){
case 'Tetrahedron': return new THREE.TetrahedronGeometry(1);
case 'Cube': return new THREE.BoxGeometry(1,1,1);
case 'Octahedron': return new THREE.OctahedronGeometry(1);
case 'Dodecahedron': return new THREE.DodecahedronGeometry(1);
case 'Icosahedron': return new THREE.IcosahedronGeometry(1);
}
}