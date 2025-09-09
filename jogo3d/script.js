const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 6, 12);
camera.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,10,5);
scene.add(light);

// chão (grama mais escura)
const groundGeo = new THREE.PlaneGeometry(200, 500);
const groundMat = new THREE.MeshStandardMaterial({color: 0x1d5e1f});
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI/2;
ground.position.y = -0.01;
scene.add(ground);

// rua
const roadGeometry = new THREE.PlaneGeometry(10, 500);
const roadMaterial = new THREE.MeshStandardMaterial({color: 0x333333});
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI/2;
road.position.y = 0;
scene.add(road);

// calçadas
const sidewalkGeo = new THREE.PlaneGeometry(2, 500);
const sidewalkMat = new THREE.MeshStandardMaterial({color:0xaaaaaa});
const sidewalkLeft = new THREE.Mesh(sidewalkGeo, sidewalkMat);
sidewalkLeft.rotation.x = -Math.PI/2;
sidewalkLeft.position.set(-6, 0.02, 0);
scene.add(sidewalkLeft);

const sidewalkRight = new THREE.Mesh(sidewalkGeo, sidewalkMat);
sidewalkRight.rotation.x = -Math.PI/2;
sidewalkRight.position.set(6, 0.02, 0);
scene.add(sidewalkRight);

// faixas da pista
const laneMarks = [];
for (let i=0;i<60;i++){
  const markGeo = new THREE.PlaneGeometry(0.5, 3);
  const markMat = new THREE.MeshStandardMaterial({color:0xffffff});
  const mark = new THREE.Mesh(markGeo,markMat);
  mark.rotation.x = -Math.PI/2;
  mark.position.set(0,0.01,-i*10);
  scene.add(mark);
  laneMarks.push(mark);
}

// carro do jogador
const carGroup = new THREE.Group();
const bodyGeo = new THREE.BoxGeometry(1.2,0.5,2.5);
const bodyMat = new THREE.MeshStandardMaterial({color:0xff0000});
const body = new THREE.Mesh(bodyGeo,bodyMat);
body.position.y=0.35;
carGroup.add(body);

const roofGeo = new THREE.BoxGeometry(0.9,0.4,1.2);
const roofMat = new THREE.MeshStandardMaterial({color:0x4444ff, transparent:true, opacity:0.6});
const roof = new THREE.Mesh(roofGeo,roofMat);
roof.position.y=0.8;
roof.position.z=-0.2;
carGroup.add(roof);

function createWheel(x,z){
  const wheelGeo=new THREE.CylinderGeometry(0.25,0.25,0.2,16);
  const wheelMat=new THREE.MeshStandardMaterial({color:0x000000});
  const wheel=new THREE.Mesh(wheelGeo,wheelMat);
  wheel.rotation.z=Math.PI/2;
  wheel.position.set(x,0.15,z);
  carGroup.add(wheel);
}
createWheel(0.5,0.8);
createWheel(-0.5,0.8);
createWheel(0.5,-0.8);
createWheel(-0.5,-0.8);

scene.add(carGroup);

// obstáculos
let obstacles = [];
function createObstacle() {
  let type = Math.random();
  let obstacle;

  if (type < 0.8) {
    const car = new THREE.Group();
    const colors = [0x0000ff, 0xff9900, 0xffff00, 0x00ff00, 0xff00ff, 0x00ffff];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const bodyGeo = new THREE.BoxGeometry(1.2, 0.5, 2.5);
    const bodyMat = new THREE.MeshStandardMaterial({color: color});
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.35;
    car.add(body);

    const roofGeo = new THREE.BoxGeometry(0.9, 0.4, 1.2);
    const roofMat = new THREE.MeshStandardMaterial({color:0x4444ff, transparent:true, opacity:0.6});
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 0.8, -0.2);
    car.add(roof);

    function createWheel(x,z){
      const wheelGeo=new THREE.CylinderGeometry(0.25,0.25,0.2,16);
      const wheelMat=new THREE.MeshStandardMaterial({color:0x000000});
      const wheel=new THREE.Mesh(wheelGeo,wheelMat);
      wheel.rotation.z=Math.PI/2;
      wheel.position.set(x,0.15,z);
      car.add(wheel);
    }
    createWheel(0.5,0.8);
    createWheel(-0.5,0.8);
    createWheel(0.5,-0.8);
    createWheel(-0.5,-0.8);

    car.userData = {type:"car"};
    obstacle = car;
    obstacle.position.y = 0;
  } else {
    const oilGeo = new THREE.CircleGeometry(0.8, 32);
    const oilMat = new THREE.MeshStandardMaterial({color:0x000000, metalness:0.8, roughness:0.2});
    obstacle = new THREE.Mesh(oilGeo, oilMat);
    obstacle.rotation.x = -Math.PI/2;
    obstacle.position.y=0.01;
    obstacle.userData = {type:"oil"};
  }

  obstacle.position.set((Math.random()*6)-3, obstacle.position.y, -100);
  scene.add(obstacle);
  obstacles.push(obstacle);
}
setInterval(createObstacle, 500);

// postes
let poles=[];
function createPole(x,z){
  const poleGeo = new THREE.CylinderGeometry(0.1,0.1,4,8);
  const poleMat = new THREE.MeshStandardMaterial({color:0x444444});
  const pole = new THREE.Mesh(poleGeo,poleMat);
  pole.position.set(x,2,z);

  const lampGeo = new THREE.SphereGeometry(0.3,8,8);
  const lampMat = new THREE.MeshStandardMaterial({color:0xffff99, emissive:0xffff33});
  const lamp = new THREE.Mesh(lampGeo,lampMat);
  lamp.position.set(x,4.2,z);

  scene.add(pole);
  scene.add(lamp);
  poles.push({pole,lamp});
}
for(let i=0;i<50;i++){
  createPole(-7, -i*20);
  createPole(7, -i*20);
}

// árvores
let trees=[];
function createTree(x,z){
  const trunkGeo = new THREE.CylinderGeometry(0.1,0.1,1);
  const trunkMat = new THREE.MeshStandardMaterial({color:0x8B4513});
  const trunk = new THREE.Mesh(trunkGeo,trunkMat);
  const topGeo = new THREE.SphereGeometry(0.5+Math.random()*0.8,8,8);
  const topMat = new THREE.MeshStandardMaterial({color:0x006400});
  const top = new THREE.Mesh(topGeo,topMat);
  const offsetX=x+(Math.random()*6-3);
  trunk.position.set(offsetX,0.5,z);
  top.position.set(offsetX,1.2,z);
  scene.add(trunk); scene.add(top);
  trees.push({trunk,top});
}
for(let i=0;i<80;i++){
  createTree(-12, -i*8);
  createTree(12, -i*8);
}

// prédios
let buildings=[];
function createBuilding(x,z){
  const width = 2+Math.random()*3;
  const height = 4+Math.random()*10;
  const depth = 2+Math.random()*3;
  const buildingGeo = new THREE.BoxGeometry(width,height,depth);
  const buildingMat = new THREE.MeshStandardMaterial({color:0x999999});
  const building = new THREE.Mesh(buildingGeo,buildingMat);
  building.position.set(x,height/2,z);
  scene.add(building);
  buildings.push(building);
}
for(let i=0;i<40;i++){
  createBuilding(-30,-i*15);
  createBuilding(30,-i*15);
}

// nuvens
let clouds=[];
function createCloud(x,z){
  const group=new THREE.Group();
  for(let i=0;i<3;i++){
    const geo=new THREE.SphereGeometry(Math.random()*1+1,8,8);
    const mat=new THREE.MeshStandardMaterial({color:0xffffff});
    const sphere=new THREE.Mesh(geo,mat);
    sphere.position.set(i*1.5,0,Math.random()*1);
    group.add(sphere);
  }
  group.position.set(x,8,z);
  scene.add(group);
  clouds.push(group);
}
for(let i=0;i<10;i++){
  createCloud(Math.random()*40-20, -i*30);
}

// controle
let carSpeed=1; 
let keys={};
document.addEventListener("keydown",(e)=>{keys[e.key]=true;});
document.addEventListener("keyup",(e)=>{keys[e.key]=false;});

let targetX = 0;
let slipTimer = 0;

function animate(){
  requestAnimationFrame(animate);

  if (slipTimer>0){
    slipTimer--;
    targetX += (Math.random()-0.5)*0.3;
  } else {
    if(keys["ArrowLeft"]) targetX = Math.max(targetX - 0.2, -4);
    if(keys["ArrowRight"]) targetX = Math.min(targetX + 0.2, 4);
  }

  carGroup.position.x += (targetX - carGroup.position.x) * 0.1;
  carGroup.rotation.z = (targetX - carGroup.position.x) * -0.1;

  // obstáculos
  for(let i=0;i<obstacles.length;i++){
    obstacles[i].position.z+=carSpeed;
    if(obstacles[i].position.z>20){
      scene.remove(obstacles[i]);
      obstacles.splice(i,1); i--;
    } else {
      if(obstacles[i] &&
         Math.abs(carGroup.position.x - obstacles[i].position.x) < 1.2 &&
         Math.abs(carGroup.position.z - obstacles[i].position.z) < 1.5){
        if (obstacles[i].userData.type==="oil"){
          slipTimer=60;
          scene.remove(obstacles[i]);
          obstacles.splice(i,1); i--;
        } else {
          alert("💥 Bateu! Fim de jogo");
          window.location.reload();
        }
      }
    }
  }

  // árvores
  for(let t=0;t<trees.length;t++){
    trees[t].trunk.position.z+=carSpeed;
    trees[t].top.position.z+=carSpeed;
    if(trees[t].trunk.position.z>20){
      trees[t].trunk.position.z-=500;
      trees[t].top.position.z-=500;
    }
  }

  // postes
  for(let p=0;p<poles.length;p++){
    poles[p].pole.position.z+=carSpeed;
    poles[p].lamp.position.z+=carSpeed;
    if(poles[p].pole.position.z>20){
      poles[p].pole.position.z-=1000;
      poles[p].lamp.position.z-=1000;
    }
  }

  // prédios
  for(let b=0;b<buildings.length;b++){
    buildings[b].position.z+=carSpeed;
    if(buildings[b].position.z>50){
      buildings[b].position.z-=600;
    }
  }

  // faixas
  for (let l=0;l<laneMarks.length;l++){
    laneMarks[l].position.z+=carSpeed;
    if(laneMarks[l].position.z>20){
      laneMarks[l].position.z-=600;
    }
  }

  // nuvens
  for(let c=0;c<clouds.length;c++){
    clouds[c].position.z+=0.05;
    if(clouds[c].position.z>20){
      clouds[c].position.z-=300;
    }
  }

  renderer.render(scene,camera);
}

animate();

window.addEventListener("resize",()=>{
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});
