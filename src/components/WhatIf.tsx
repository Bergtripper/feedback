import React,{useMemo,useState}from'react';

const clamp=(n:number,min=0,max=1)=>Math.max(min,Math.min(max,n));

export function WhatIf(){
 const[c,setC]=useState(45),[k,setK]=useState(30),[scale,setScale]=useState(35);
 const m=useMemo(()=>{
  const C=c/100,K=k/100,S=scale/100;
  const effective=C*(.25+.75*K);
  // Continuous teaching model: bounded gains can exist before full loop closure.
  const gain=clamp(Math.pow(effective,1.35)*(.55+.45*S));
  const friction=clamp(1-(K*.62+C*.23));
  // Signed cycle change: positive = compression, negative = slower cycles.
  const compression=Math.max(-.12,Math.min(.32,gain*.48-friction*.14));
  const times=[1];for(let i=1;i<5;i++)times.push(times[i-1]*(1-compression));
  let bottleneck='Research capability';
  if(C>.58&&K<.55)bottleneck='Human-dependent loop closure';
  else if(C>.58&&K>=.55&&gain<.28)bottleneck='Recursive gain';
  else if(gain>=.28&&compression<.08)bottleneck='Cycle-time compression';
  else if(compression>=.08)bottleneck='No single dominant bottleneck';
  return{gain,compression,times,bottleneck};
 },[c,k,scale]);
 const scaleOnly=scale>65&&c<55;
 return <section id="what-if" className="border-t dz-rule relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
   <div className="grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-10">
    <div className="col-span-6 lg:col-span-3"><p className="dz-meta">04 / What if?</p><p className="dz-body mt-5 max-w-xs">A teaching model for exploring dependencies. Not a forecast.</p></div>
    <div className="col-span-6 lg:col-span-8 lg:col-start-5"><h2 className="dz-h2 text-5xl sm:text-7xl lg:text-8xl">Change the loop.</h2><p className="dz-body-strong text-xl sm:text-2xl mt-7 max-w-3xl">What happens when capability, autonomy or experimental scale changes — while the other bottlenecks remain?</p></div>
   </div>

   <div className="mt-16 sm:mt-24 grid lg:grid-cols-12 border dz-rule">
    <div className="lg:col-span-5 p-6 sm:p-8 lg:border-r dz-rule">
     <Control symbol="C" label="AI research capability" value={c} set={setC}/>
     <Control symbol="K" label="Loop closure / autonomy" value={k} set={setK}/>
     <Control symbol="N" label="Parallel experiments / scale" value={scale} set={setScale}/>
     <div className="mt-10 pt-6 border-t dz-rule"><button className="whatif-reset dz-meta" onClick={()=>{setC(45);setK(30);setScale(35)}}>Reset / baseline</button></div>
    </div>

    <div className="lg:col-span-7">
     <div className="grid sm:grid-cols-2 border-b dz-rule">
      <Metric label="Modelled recursive gain" value={m.gain<.08?'limited':m.gain<.35?'emerging':'strong'} detail={'R* / '+m.gain.toFixed(2)}/>
      <Metric label="Cycle compression" value={m.compression<-.02?'lengthening':m.compression<.03?'stable':m.compression<.12?'shrinking':'rapidly shrinking'} detail={'Δτ / '+(m.compression>0?'−':m.compression<0?'+':'')+Math.abs(Math.round(m.compression*100))+'% per cycle'}/>
     </div>
     <div className="p-6 sm:p-8">
      <p className="dz-meta">Illustrative generation time</p>
      <div className="mt-8 space-y-4">{m.times.map((t,i)=><div key={i} className="grid grid-cols-[3rem_1fr_4rem] items-center gap-4"><span className="dz-meta">G{i}</span><div className="whatif-track"><div className="whatif-bar" style={{width:(Math.min(t,1.35)/1.35*100)+'%'}}/></div><span className="dz-meta text-right">{t.toFixed(2)}×</span></div>)}</div>
      <div className="mt-10 pt-6 border-t dz-rule"><p className="dz-meta">Binding constraint</p><p className="dz-h3 text-2xl sm:text-3xl mt-2">{m.bottleneck}</p><p className="dz-body mt-3">R* is continuous: partial capability can produce bounded gains. τ only begins to compress when those gains outweigh residual loop friction.</p></div>
      {scaleOnly&&<div className="mt-8 p-5 whatif-warning"><p className="dz-meta">Scale is not capability</p><p className="dz-body-strong mt-2">More experiments. Same bottleneck. No intelligence explosion. Research capability and judgement are still limiting the loop.</p></div>}
     </div>
    </div>
   </div>

   <details className="mt-8 border dz-rule whatif-model">
    <summary className="cursor-pointer list-none p-5 sm:p-6 flex justify-between gap-5"><span className="dz-meta">Show the model</span><span className="dz-meta">C · K · N · R* · τ</span></summary>
    <div className="border-t dz-rule p-6 sm:p-8 grid lg:grid-cols-12 gap-8"><div className="lg:col-span-5"><p className="dz-h3 text-2xl">A deliberately bounded teaching model.</p><p className="dz-body mt-4">Effective research capacity depends on capability and loop closure. Recursive gain appears only after a threshold and is moderated by scale. Cycle compression is then reduced by residual human and process friction.</p></div><div className="lg:col-span-6 lg:col-start-7"><p className="dz-meta">Interpretation rule</p><p className="dz-body-strong mt-3">The simulator demonstrates dependencies, not calibrated probabilities. Coefficients are illustrative and must not be read as empirical estimates.</p><p className="dz-meta mt-6">Next research requirement</p><p className="dz-body mt-2">Replace illustrative coefficients only when longitudinal AI-R&D cycle data can support calibration.</p></div></div>
   </details>
  </div>
 </section>
}

function Control({symbol,label,value,set}:{symbol:string;label:string;value:number;set:(v:number)=>void}){
 return <label className="block py-6 border-b dz-rule"><div className="flex items-end justify-between gap-4"><div><span className="dz-h2 text-4xl">{symbol}</span><span className="dz-body-strong ml-4">{label}</span></div><span className="dz-meta">{value}</span></div><input aria-label={label} className="whatif-range mt-6 w-full" type="range" min="0" max="100" value={value} onChange={e=>set(Number(e.target.value))}/></label>
}
function Metric({label,value,detail}:{label:string;value:string;detail:string}){return <div className="p-6 sm:p-8 border-b sm:border-b-0 sm:border-r last:border-r-0 dz-rule"><p className="dz-meta">{label}</p><p className="dz-h3 text-2xl sm:text-3xl mt-3">{value}</p><p className="dz-meta mt-4">{detail}</p></div>}
