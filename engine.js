export class TimerEngine {
 constructor(settings,emit=()=>{},now=()=>Date.now()){this.s=settings;this.emit=emit;this.now=now;this.reset()}
 get total(){return Math.max(1,this.s.hours*3600+this.s.minutes*60+this.s.seconds)}
 reset(){this.phase='ready';this.running=false;this.left=this.total;this.deadline=0;this.lastInterval=0}
 start(hasTrack=false){this.hasTrack=hasTrack;this.running=true;this.lastInterval=0;this.enter(this.s.warmUp?'warm':'opening',this.s.warmUp);if(this.phase==='opening')this.open()}
 enter(phase,seconds){this.phase=phase;this.left=seconds;this.deadline=this.now()+seconds*1000}
 open(){if(this.hasTrack){this.phase='track';this.emit('track')}else this.meditate()}
 trackEnded(){this.enter('post',3)}
 meditate(){this.enter('meditation',this.total);this.emit('start')}
 pause(){this.tick();if(!this.running)return;this.left=Math.max(0,(this.deadline-this.now())/1000);this.running=false;this.emit('pause')}
 resume(){this.deadline=this.now()+this.left*1000;this.running=true;this.emit('resume')}
 tick(){if(!this.running||this.phase==='track')return;this.left=Math.max(0,(this.deadline-this.now())/1000);if(this.phase==='meditation'){const elapsed=this.total-Math.ceil(this.left),interval=this.s.interval*60,due=interval?Math.floor(elapsed/interval):0;if(due>this.lastInterval){this.lastInterval=due;if(elapsed<this.total&&elapsed-due*interval<=2)this.emit('interval')}}if(this.left===0){if(this.phase==='warm')this.open();else if(this.phase==='post')this.meditate();else if(this.phase==='meditation'){this.phase='complete';this.running=false;this.emit('end')}}}
}
