function buildButtons(callback){
const container=document.getElementById('buttons');
Object.keys(descriptions).forEach(key=>{
const btn=document.createElement('button');
btn.textContent=descriptions[key].title;
btn.onclick=()=>callback(key);
container.appendChild(btn);
});
}
function updateInfo(type){
const d=descriptions[type];
document.getElementById('info').innerHTML=
`<h3>${d.title}</h3><p>Грані: ${d.faces}<br>Вершини: ${d.vertices}<br>Ребра: ${d.edges}</p><p>${d.text}</p>`;
}