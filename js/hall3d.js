// 3D-вид из зала. Создаётся только по кнопке и полностью удаляется при выключении.
const Hall3D={r:null,sc:null,cam:null,eye:null,mats:{},ox:0,oy:0,
 on(box){if(!window.THREE)return false;const T=THREE;box.innerHTML="";this.r=new T.WebGLRenderer({antialias:true});box.append(this.r.domElement);
  this.cam=new T.PerspectiveCamera(70,4/3,.1,80);this.ro=new ResizeObserver(()=>{this.r.setSize(box.clientWidth,box.clientHeight,false);this.cam.aspect=box.clientWidth/box.clientHeight;this.cam.updateProjectionMatrix();this.draw()});this.ro.observe(box);
  let d=null;const cv=this.r.domElement,k=(v,m)=>Math.max(-m,Math.min(m,v));cv.onpointerdown=e=>d=[e.clientX,e.clientY];cv.onpointerup=()=>d=null;
  cv.onpointermove=e=>{if(!d)return;this.ox=k(this.ox-(e.clientX-d[0])*.05,32);this.oy=k(this.oy+(e.clientY-d[1])*.03,3);d=[e.clientX,e.clientY];this.draw()};return true},
 off(){if(!this.r)return;cancelAnimationFrame(this.tw);this.ro.disconnect();this.r.dispose();this.r.domElement.remove();this.r=this.sc=this.eye=null},
 build(c,taken,sel){const T=THREE,sc=this.sc=new T.Scene(),M=x=>new T.MeshLambertMaterial({color:x}),add=(g,m,x,y,z)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);sc.add(o);return o};
  sc.background=new T.Color(0x090a0d);sc.add(new T.AmbientLight(0xffffff,.75));const dl=new T.DirectionalLight(0xffffff,.55);dl.position.set(0,12,12);sc.add(dl);
  const pl=new T.PointLight(0xfff1d0,1.1,40);pl.position.set(0,4,2);sc.add(pl);
  add(new T.BoxGeometry(26,11,24),new T.MeshLambertMaterial({color:0x1d2026,side:T.BackSide}),0,4.8,11.5);add(new T.BoxGeometry(15,6.3,.1),M(0),0,4.4,-.1);
  const cv=document.createElement("canvas");cv.width=1024;cv.height=430;const g=cv.getContext("2d");g.fillStyle="#f4f1ff";g.fillRect(0,0,1024,430);g.strokeStyle="#0e0f1a";g.lineWidth=4;
  g.beginPath();g.moveTo(0,215);g.lineTo(1024,215);g.moveTo(512,0);g.lineTo(512,430);g.stroke();[170,150].forEach(r=>{g.beginPath();g.arc(512,215,r,0,7);g.stroke()});
  
  add(new T.PlaneGeometry(14.6,6),new T.MeshBasicMaterial({map:new T.CanvasTexture(cv)}),0,4.4,0);
  add(new T.PlaneGeometry(26,24),M(0x14161a),0,-.3,11.5).rotation.x=-Math.PI/2;
  const bc=document.createElement("canvas");bc.width=300;bc.height=440;const q=bc.getContext("2d"),gr=q.createLinearGradient(0,0,0,440);gr.addColorStop(0,"#a30d1f");gr.addColorStop(1,"#0a0a0a");q.fillStyle=gr;q.fillRect(0,0,300,440);q.strokeStyle="rgba(255,255,255,.22)";q.lineWidth=1.5;
  for(let a=0;a<12;a++){q.beginPath();q.moveTo(150,150);q.lineTo(150+Math.cos(a/12*6.283)*260,150+Math.sin(a/12*6.283)*260);q.stroke()}[40,80,120,160].forEach(r=>{q.beginPath();q.arc(150,150,r,0,7);q.stroke()});
  q.fillStyle="#fff";q.textAlign="center";q.font="bold 33px sans-serif";q.fillText("ЧЕЛОВЕК-ПАУК",150,330);q.font="22px sans-serif";q.fillText("НОВЫЙ ДЕНЬ",150,368);q.font="14px sans-serif";q.fillText("MARVEL STUDIOS",150,408);
  const bt=new T.CanvasTexture(bc);[-1,1].forEach(s=>[3,7.5].forEach(z=>{const b=add(new T.PlaneGeometry(3.1,4.5),new T.MeshBasicMaterial({map:bt}),s*12.9,4.6,z);b.rotation.y=-s*Math.PI/2;add(new T.BoxGeometry(.05,4.7,3.3),M(0x0a0a0a),s*12.95,4.6,z)}));
  const L=c.rows.length-1,cloth=[0xb8bec9,0x8d97a6,0xd7dbe2,0x6f7b8d,0xa3aab5,0xe9ecf0],skin=[0xe0b896,0xc9a07c,0x8f6a4f,0xf0d2b6];this.mats={};
  const hs=s=>{let h=0;for(const ch of s)h=(h*31+ch.charCodeAt(0))>>>0;return h};
  c.rows.forEach((n,r)=>{add(new T.BoxGeometry(26,r*.32+.2,1.15),M(0x1a1d23),0,(r*.32+.2)/2-.3,4+r*1.15+.2);
   for(let i=0;i<n;i++){const id=r+"-"+i,[x,y,z]=seatPos(c,r,i),w=r==L?1.55:.78,base=r==L?0x6b5a3a:0x2f3b52,m=M(base);m.userData.base=base;this.mats[id]=m;
    const dark=M(0x12141a);add(new T.BoxGeometry(w,.3,.7),dark,x,y+.2,z);add(new T.BoxGeometry(w-.06,.18,.62),m,x,y+.43,z-.02);
    const bk=add(new T.BoxGeometry(w-.06,.85,.16),m,x,y+.88,z+.3);bk.rotation.x=-.12;
    [-1,1].forEach(s=>add(new T.BoxGeometry(.07,.34,.6),dark,x+s*(w/2-.02),y+.58,z));
    if(taken.has(id)){const q=hs(id),sk=M(skin[q%4]),cl=M(cloth[q%6]);
     add(new T.BoxGeometry(.5,.62,.3),cl,x,y+.95,z+.1);add(new T.SphereGeometry(.18,14,10),sk,x,y+1.5,z+.12);
     add(new T.SphereGeometry(.19,14,8,0,6.3,0,1.6),M(0x1c1f26),x,y+1.53,z+.14);
     [-1,1].forEach(s=>add(new T.BoxGeometry(.12,.12,.45),cl,x+s*.3,y+.78,z-.1))}}});
  this.paint(sel)},
 paint(sel){for(const id in this.mats)this.mats[id].color.setHex(sel.includes(id)?0x3b82f6:this.mats[id].userData.base);this.draw()},
 draw(){if(!this.r||!this.sc)return;const e=this.eye||new THREE.Vector3(0,7,20);this.cam.position.copy(e);this.cam.lookAt(this.eye?e.x*.5+this.ox:0,this.eye?3.2+this.oy:3.5,0);this.r.render(this.sc,this.cam)},
 view(c,id){if(!this.r)return;this.ox=this.oy=0;const[r,i]=id.split("-").map(Number),[x,y,z]=seatPos(c,r,i),to=new THREE.Vector3(x,y+1.4,z),from=(this.eye||new THREE.Vector3(0,7,20)).clone(),t0=performance.now();
  cancelAnimationFrame(this.tw);const st=n=>{const k=Math.min(1,(n-t0)/500);this.eye=new THREE.Vector3().lerpVectors(from,to,k);this.draw();if(k<1)this.tw=requestAnimationFrame(st)};this.tw=requestAnimationFrame(st)}
};
