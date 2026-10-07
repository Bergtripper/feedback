import React,{useState}from'react';

const terms=[
 {s:'C',name:'Research capability',plain:'How much of AI R&D can the system do well?',formal:'Capability over the research task-space: problem formulation, implementation, experimentation, interpretation and judgement.',watch:'Direct AI-R&D evaluations; task breadth; quality under open-ended conditions.'},
 {s:'K',name:'Loop closure',plain:'How much of the research loop can run without a person closing the gaps?',formal:'Degree to which idea → experiment → interpretation → decision → modification → evaluation can proceed with decreasing human intervention.',watch:'Human interventions per cycle; autonomous direction-setting; feedback creation; end-to-end completion.'},
 {s:'R',name:'Recursive gain',plain:'Does an improvement make the system better at producing the next improvement?',formal:'Transferable increase in AI-R&D capability attributable to a previous AI-mediated improvement, measured across successive generations rather than a single refinement.',watch:'Successive accepted improvements; transfer outside the optimization harness; persistence across generations.'},
 {s:'τ',name:'Generation time',plain:'How long does one useful improvement cycle take?',formal:'Elapsed end-to-end time between a research system state and a validated successor state, including relevant human and compute bottlenecks.',watch:'Longitudinal cycle-time series; repeated compression; bottleneck-adjusted time to validated improvement.'}
];

export function TheModel(){
 const[detail,setDetail]=useState(false);
 return <section id="model" className="border-t dz-rule relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
   <div className="grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-10">
    <div className="col-span-6 lg:col-span-3"><p className="dz-meta">07 / The model</p><p className="dz-body mt-5 max-w-xs">A measurement framework first. A mathematical model only where assumptions are explicit.</p></div>
    <div className="col-span-6 lg:col-span-8 lg:col-start-5"><h2 className="dz-h2 text-5xl sm:text-7xl lg:text-8xl">Four variables.<br/>One question.</h2><p className="dz-body-strong text-xl sm:text-2xl mt-8 max-w-3xl">Is the feedback loop becoming more capable, more closed, recursively productive — and faster?</p></div>
   </div>
   <div className="mt-16 sm:mt-24 grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l dz-rule">
    {terms.map(x=><article key={x.s} className="p-6 sm:p-7 border-r border-b dz-rule"><span className="dz-h1 text-6xl" style={{color:'var(--accent)'}}>{x.s}</span><h3 className="dz-h3 text-2xl mt-8">{x.name}</h3><p className="dz-body mt-4">{x.plain}</p>{detail&&<div className="mt-8 pt-6 border-t dz-rule"><p className="dz-meta">Operational definition</p><p className="dz-body mt-3">{x.formal}</p><p className="dz-meta mt-6">Watch</p><p className="dz-body mt-3">{x.watch}</p></div>}</article>)}
   </div>
   <div className="mt-8 flex justify-end"><button onClick={()=>setDetail(!detail)} className="model-toggle dz-meta border dz-rule px-4 py-3 bg-transparent dz-text cursor-pointer">{detail?'Hide definitions':'Show operational definitions'} →</button></div>

   <div className="mt-20 sm:mt-28 grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-10">
    <div className="col-span-6 lg:col-span-3"><p className="dz-meta">Relationship / not an equation</p></div>
    <div className="col-span-6 lg:col-span-8 lg:col-start-5">
     <div className="model-chain" aria-label="C to K to R to tau"><span>C ↑</span><b>→</b><span>K ↑</span><b>→</b><span>R &gt; 0</span><b>→</b><span>τ ↓ ?</span></div>
     <p className="dz-h3 text-2xl sm:text-4xl mt-10">The arrows are hypotheses to test, not identities.</p>
     <p className="dz-body mt-5 max-w-3xl">Higher capability may help close the loop. Greater closure may enable recursive gains. Recursive gains may shorten development cycles. None of those implications is guaranteed.</p>
    </div>
   </div>

   <div className="mt-20 border-y dz-rule grid lg:grid-cols-12">
    <div className="lg:col-span-4 p-6 sm:p-8 lg:border-r dz-rule"><p className="dz-meta">What If? / teaching model</p><h3 className="dz-h3 text-3xl mt-4">Illustrative, not fitted.</h3></div>
    <div className="lg:col-span-8 p-6 sm:p-8 border-t lg:border-t-0 dz-rule"><p className="dz-body-strong">The simulator deliberately maps C, K and scale to bounded R* and a signed change in τ. Its coefficients are chosen to make dependencies visible. They are not estimates derived from observed AI-R&D data.</p><p className="dz-body mt-5">FEEDBACK will only promote a relationship from teaching assumption to empirical model when longitudinal evidence can constrain it.</p></div>
   </div>

   <div className="mt-16 grid grid-cols-6 lg:grid-cols-12 gap-x-4"><div className="col-span-6 lg:col-span-7 lg:col-start-5"><p className="dz-meta">Core test</p><p className="dz-h3 text-3xl sm:text-5xl mt-3">The strongest signal is not C ↑. It is persistent, bottleneck-adjusted τ ↓ across successive useful improvements.</p></div></div>
  </div>
 </section>
}