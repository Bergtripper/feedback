import{describe,expect,it}from'vitest';
import{whatIf,type Regime,type Bottleneck}from'./whatif';

const grid:{c:number;k:number;scale:number}[]=[];
for(let c=0;c<=100;c+=5)for(let k=0;k<=100;k+=5)for(let scale=0;scale<=100;scale+=5)grid.push({c,k,scale});

describe('What If? teaching model',()=>{
 it('changes nothing when capability is zero',()=>{
  for(const k of[0,50,100])for(const scale of[0,50,100]){
   const r=whatIf({c:0,k,scale});
   expect(r.gain).toBe(0);expect(r.compression).toBe(0);expect(r.times.every(t=>t===1)).toBe(true);
  }
 });
 it('never lengthens cycles as a modelling artefact',()=>{
  for(const p of grid){const r=whatIf(p);expect(r.compression).toBeGreaterThanOrEqual(0);for(let i=1;i<r.times.length;i++)expect(r.times[i]!).toBeLessThanOrEqual(r.times[i-1]!)}
 });
 it('keeps the default baseline on a plateau',()=>{
  expect(whatIf({c:45,k:30,scale:35}).regime).toBe('plateau');
 });
 it('can reproduce all three futures',()=>{
  const seen=new Set<Regime>(grid.map(p=>whatIf(p).regime));
  expect(seen.has('plateau')).toBe(true);     // Plateau
  expect(seen.has('fading')).toBe(true);      // Accelerated R&D
  expect(seen.has('compounding')).toBe(true); // Recursive acceleration
 });
 it('accelerated R&D: compression shrinks every cycle',()=>{
  const r=whatIf({c:80,k:70,scale:60});expect(r.regime).toBe('fading');
  for(let i=1;i<r.perCycle.length;i++)expect(r.perCycle[i]!).toBeLessThan(r.perCycle[i-1]!);
 });
 it('recursive acceleration: compression does not shrink',()=>{
  const r=whatIf({c:100,k:100,scale:100});expect(r.regime).toBe('compounding');
  for(let i=1;i<r.perCycle.length;i++)expect(r.perCycle[i]!).toBeGreaterThanOrEqual(r.perCycle[i-1]!);
 });
 it('compounding needs a nearly closed loop',()=>{
  for(const p of grid)if(whatIf(p).regime==='compounding')expect(p.k).toBeGreaterThanOrEqual(80);
 });
 it('is monotonic: more capability or closure never reduces gain or compression',()=>{
  for(const p of grid){const r=whatIf(p);
   if(p.c<100){const u=whatIf({...p,c:p.c+5});expect(u.gain).toBeGreaterThanOrEqual(r.gain-1e-12);expect(u.compression).toBeGreaterThanOrEqual(r.compression-1e-12)}
   if(p.k<100){const u=whatIf({...p,k:p.k+5});expect(u.gain).toBeGreaterThanOrEqual(r.gain-1e-12);expect(u.compression).toBeGreaterThanOrEqual(r.compression-1e-12)}
  }
 });
 it('scale alone cannot produce sustained or compounding compression',()=>{
  for(const p of grid)if(p.c<=30){const r=whatIf({...p,scale:100}).regime;expect(r==='plateau'||r==='fading').toBe(true)}
  for(const k of[0,25,50])expect(whatIf({c:20,k,scale:100}).regime).toBe('plateau');
 });
 it('shows the scale warning only when the model shows no compression',()=>{
  for(const p of grid){const r=whatIf(p);if(r.scaleOnly)expect(r.regime).toBe('plateau')}
 });
 it('every binding-constraint label is reachable',()=>{
  const count=new Map<Bottleneck,number>();for(const p of grid){const b=whatIf(p).bottleneck;count.set(b,(count.get(b)??0)+1)}
  for(const b of['Research capability','Human-dependent loop closure','Recursive gain','Persistence of gains across cycles','No single dominant bottleneck'] as Bottleneck[])expect((count.get(b)??0)/grid.length).toBeGreaterThan(.02);
 });
});
