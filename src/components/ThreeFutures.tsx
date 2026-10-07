import React,{useState}from'react';

type Future={id:string;number:string;name:string;signal:string;summary:string;chain:{c:string;k:string;r:string;t:string};times:number[];distinguish:string;not:string};
const futures:Future[]=[
{id:'plateau',number:'01',name:'Plateau',signal:'Capability rises. Feedback remains bounded.',summary:'AI keeps improving and automates more tasks, but judgement, coordination or diminishing returns prevent the R&D loop from becoming self-accelerating.',chain:{c:'rising',k:'partial',r:'bounded',t:'stable'},times:[1,.98,.99,.97,.98],distinguish:'Research capability improves without persistent shortening of end-to-end AI-R&D cycles.',not:'This does not mean AI stops improving.'},
{id:'accelerated',number:'02',name:'Accelerated R&D',signal:'The loop closes further. Humans still set key constraints.',summary:'AI researchers materially shorten development cycles and expand experimental throughput, producing faster progress without an autonomous runaway dynamic.',chain:{c:'high',k:'advanced',r:'positive',t:'shrinking'},times:[1,.88,.78,.70,.64],distinguish:'Measured R&D cycles shorten, but compression stabilizes rather than compounding across successive generations.',not:'Faster progress is not automatically recursive acceleration.'},
{id:'recursive',number:'03',name:'Recursive acceleration',signal:'Better research systems build still better research systems faster.',summary:'Recursive gain persists across generations and the time required for each useful improvement repeatedly contracts. This is the scenario FEEDBACK is designed to detect, not assume.',chain:{c:'high',k:'closed',r:'persistent',t:'compressing'},times:[1,.78,.56,.37,.22],distinguish:'Repeated generations show both transferable recursive gains and persistent cycle-time compression after accounting for compute and human intervention.',not:'One self-improvement result or one faster release cycle is insufficient evidence.'}
];

export function ThreeFutures(){
 const[active,setActive]=useState(0);const f=futures[active];
 return <section id="futures" className="border-t dz-rule relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
   <div className="grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-10">
    <div className="col-span-6 lg:col-span-3"><p className="dz-meta">05 / Three futures</p><p className="dz-body mt-5 max-w-xs">Three trajectories. No probabilities assigned.</p></div>
    <div className="col-span-6 lg:col-span-8 lg:col-start-5"><h2 className="dz-h2 text-5xl sm:text-7xl lg:text-8xl">Same system.<br/>Different dynamics.</h2></div>
   </div>
   <div className="mt-16 sm:mt-24 grid lg:grid-cols-12 border dz-rule">
    <nav className="lg:col-span-4 border-b lg:border-b-0 lg:border-r dz-rule" aria-label="Future scenarios">
     {futures.map((x,i)=><button key={x.id} onClick={()=>setActive(i)} data-active={i===active} className="future-tab w-full text-left p-6 sm:p-7 border-b dz-rule last:border-b-0 bg-transparent dz-text cursor-pointer"><span className="dz-meta">{x.number} / trajectory</span><span className="block dz-h3 text-2xl sm:text-3xl mt-3">{x.name}</span><span className="block dz-body mt-3">{x.signal}</span></button>)}
    </nav>
    <div className="lg:col-span-8">
     <div className="p-6 sm:p-10 border-b dz-rule"><p className="dz-meta">Scenario / {f.number}</p><h3 className="dz-h2 text-5xl sm:text-7xl mt-3">{f.name}</h3><p className="dz-body-strong text-lg sm:text-xl mt-6 max-w-3xl">{f.summary}</p></div>
     <div className="grid grid-cols-2 sm:grid-cols-4 border-b dz-rule">
      {([['C',f.chain.c],['K',f.chain.k],['R',f.chain.r],['τ',f.chain.t]] as const).map(([s,v])=><div key={s} className="p-5 sm:p-6 border-r last:border-r-0 dz-rule"><p className="dz-h2 text-3xl">{s}</p><p className="dz-meta mt-4">{v}</p></div>)}
     </div>
     <div className="p-6 sm:p-10">
      <p className="dz-meta">Illustrative τ / generation</p>
      <div className="mt-8 flex items-end gap-2 h-40 border-b dz-rule">{f.times.map((t,i)=><div key={i} className="flex-1 flex flex-col justify-end h-full"><div className="future-bar" style={{height:(t*100)+'%'}}/><span className="dz-meta mt-2">G{i}</span></div>)}</div>
      <div className="mt-10 grid sm:grid-cols-2 gap-8"><div><p className="dz-meta">What would distinguish it?</p><p className="dz-body-strong mt-3">{f.distinguish}</p></div><div><p className="dz-meta">Do not infer</p><p className="dz-body mt-3">{f.not}</p></div></div>
     </div>
    </div>
   </div>
   <div className="mt-8"><p className="dz-meta">Scenario discipline / These are conditional trajectories, not forecasts, timelines or probability estimates.</p></div>
  </div>
 </section>
}