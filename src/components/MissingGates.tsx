import React from 'react';

type Gate={id:string;from:string;to:string;title:string;state:'open'|'partial'|'unresolved';body:string;missing:string[]};

const gates:Gate[]=[
{id:'ck',from:'C',to:'K',title:'Capability → Closure',state:'partial',body:'Doing more research tasks is not the same as owning the research loop.',missing:['Open-ended direction setting','Reliable experiment design','Autonomous feedback creation','Judgement under ambiguity']},
{id:'kr',from:'K',to:'R',title:'Closure → Recursive gain',state:'partial',body:'A closed loop matters only if its outputs improve the machinery that runs the next loop.',missing:['Transfer beyond a fixed harness','Robust self-modification','Improvement without evaluator gaming','Repeated gains across generations']},
{id:'rt',from:'R',to:'τ↓',title:'Recursive gain → Faster cycles',state:'unresolved',body:'Successive improvements do not imply an intelligence explosion unless useful generations arrive faster.',missing:['Measured cycle-time series','Persistent compression across cycles','Bottleneck-adjusted productivity','Evidence against diminishing returns']}
];

export function MissingGates(){
 return <section id="missing" className="border-t dz-rule relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
   <div className="grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-10">
    <div className="col-span-6 lg:col-span-3"><p className="dz-meta">03 / What's missing?</p><p className="dz-body mt-5 max-w-xs">The gap between stronger models and a self-accelerating research system.</p></div>
    <div className="col-span-6 lg:col-span-8 lg:col-start-5"><h2 className="dz-h2 text-5xl sm:text-7xl lg:text-8xl">Capability is not acceleration.</h2><p className="dz-body-strong text-xl sm:text-2xl mt-7 max-w-3xl">Each transition has to clear a different bottleneck. Evidence for one does not automatically transfer to the next.</p></div>
   </div>

   <div className="mt-16 sm:mt-24 border-t dz-rule">
    <div className="hidden lg:grid grid-cols-12 py-5 border-b dz-rule">
      <div className="col-span-2"><span className="dz-meta">Transition</span></div><div className="col-span-4"><span className="dz-meta">Interpretation</span></div><div className="col-span-5"><span className="dz-meta">What would need to change?</span></div><div className="col-span-1 text-right"><span className="dz-meta">Gate</span></div>
    </div>
    {gates.map((g,i)=><article key={g.id} className="grid lg:grid-cols-12 gap-6 py-8 sm:py-10 border-b dz-rule">
      <div className="lg:col-span-2"><div className="flex items-center gap-3"><span className="dz-h2 text-4xl">{g.from}</span><span className="dz-meta">→</span><span className="dz-h2 text-4xl" style={{color:i===2?'var(--accent)':'inherit'}}>{g.to}</span></div><p className="dz-meta mt-3">{g.title}</p></div>
      <div className="lg:col-span-4"><p className="dz-body-strong">{g.body}</p></div>
      <div className="lg:col-span-5"><div className="grid sm:grid-cols-2 gap-x-5 gap-y-3">{g.missing.map((m,n)=><div key={m} className="flex gap-3 border-t dz-rule pt-3"><span className="dz-meta">{String(n+1).padStart(2,'0')}</span><span className="dz-body">{m}</span></div>)}</div></div>
      <div className="lg:col-span-1 lg:text-right"><span className={'gate-state gate-'+g.state+' dz-meta'}>{g.state}</span></div>
    </article>)}
   </div>

   <div className="mt-16 grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-8">
    <div className="col-span-6 lg:col-span-4 lg:col-start-5"><p className="dz-meta">Current bottleneck</p><p className="dz-h3 text-3xl sm:text-4xl mt-3">The final arrow is unproven.</p></div>
    <div className="col-span-6 lg:col-span-4"><p className="dz-body">We have evidence of rising capability and bounded recursive improvement. We do not yet have robust public evidence that successive useful AI-R&D generations are arriving faster and faster.</p></div>
   </div>

   <div className="mt-16 sm:mt-24 p-6 sm:p-10 border dz-rule missing-rule">
    <p className="dz-meta">FEEDBACK test</p>
    <p className="dz-h2 text-4xl sm:text-6xl lg:text-7xl mt-5 max-w-5xl">C ↑ does not imply K → 1.<br/>K → 1 does not imply R &gt; 0.<br/>R &gt; 0 does not imply τ ↓.</p>
    <p className="dz-body mt-7 max-w-2xl">An intelligence-explosion claim needs evidence across the chain, not evidence from its strongest link.</p>
   </div>
  </div>
 </section>
}
