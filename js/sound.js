// Звуки природы с пространственным позиционированием: ветер/ручей слева и справа, птицы вокруг
const Sound={ctx:null,timer:null,
 start(){if(this.ctx)return;const c=this.ctx=new AudioContext(),out=this.out=c.createGain();out.gain.value=.6;out.connect(c.destination);
  const b=c.createBuffer(1,c.sampleRate*3,c.sampleRate),d=b.getChannelData(0);let p=0;for(let i=0;i<d.length;i++){p=p*.96+(Math.random()*2-1)*.12;d[i]=p*3}
  [[-8,500],[8,1400]].forEach(([x,f],k)=>{const s=c.createBufferSource();s.buffer=b;s.loop=true;const lp=c.createBiquadFilter();lp.type="lowpass";lp.frequency.value=f;
   const g=c.createGain(),l=c.createOscillator(),lg=c.createGain();l.frequency.value=.12+k*.07;lg.gain.value=.12;g.gain.value=.22;l.connect(lg);lg.connect(g.gain);l.start();
   s.connect(lp);lp.connect(g);g.connect(this.pan(x,3,2));s.start()});
  this.timer=setInterval(()=>{const n=1+Math.floor(Math.random()*4);for(let i=0;i<n;i++)setTimeout(()=>this.chirp(),i*170)},1800)},
 pan(x,y,z){const p=this.ctx.createPanner();p.panningModel="HRTF";p.refDistance=3;p.positionX.value=x;p.positionY.value=y;p.positionZ.value=z;p.connect(this.out);return p},
 chirp(){const c=this.ctx;if(!c)return;const o=c.createOscillator(),g=c.createGain(),t=c.currentTime,f=2200+Math.random()*1800,x=(Math.random()<.5?-1:1)*(3+Math.random()*8);
  o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*1.5,t+.08);o.frequency.exponentialRampToValueAtTime(f*.9,t+.18);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.2,t+.03);g.gain.exponentialRampToValueAtTime(.001,t+.22);
  o.connect(g);g.connect(this.pan(x,4,Math.random()*10));o.start(t);o.stop(t+.25)},
 listen(x,y,z){const l=this.ctx&&this.ctx.listener;if(!l)return;try{l.positionX.value=x;l.positionY.value=y;l.positionZ.value=z}catch(e){l.setPosition&&l.setPosition(x,y,z)}},
 stop(){clearInterval(this.timer);if(this.ctx)this.ctx.close();this.ctx=null}
};
