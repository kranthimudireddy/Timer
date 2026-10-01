import assert from 'node:assert/strict';
import {TimerEngine} from './engine.js';
let now=0,events=[];const settings={hours:0,minutes:3,seconds:0,warmUp:10,interval:1};
const engine=new TimerEngine(settings,e=>events.push(e),()=>now);
engine.start(true);assert.equal(engine.phase,'warm');now=5000;engine.pause();now=30000;engine.resume();now=35000;engine.tick();assert.equal(engine.phase,'track');assert.deepEqual(events,['pause','resume','track']);engine.trackEnded();now+=3000;engine.tick();assert.equal(engine.phase,'meditation');assert.equal(events.at(-1),'start');now+=60000;engine.tick();assert.equal(events.at(-1),'interval');engine.tick();assert.equal(events.filter(e=>e==='interval').length,1);now+=10000;engine.pause();const left=engine.left;now+=500000;engine.resume();assert.equal(engine.left,left);now+=left*1000;engine.tick();assert.equal(engine.phase,'complete');assert.equal(events.at(-1),'end');engine.reset();assert.equal(engine.phase,'ready');
settings.warmUp=0;events=[];engine.start();now+=125000;engine.tick();assert.equal(events.filter(e=>e==='interval').length,0);now+=55000;engine.tick();assert.equal(events.at(-1),'end');
settings.minutes=0;settings.seconds=0;assert.equal(engine.total,1);
console.log('Passed: warm-up, opening track, post-track pause, intervals, duplicate prevention, pause/resume, delayed ticks, completion, reset, minimum duration.');
