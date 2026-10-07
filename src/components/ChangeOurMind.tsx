import React,{useState}from'react';

type Test={symbol:string;claim:string;up:string[];down:string[];current:string};
const tests:Test[]=[
{symbol:'C',claim:'AI systems are becoming materially better AI researchers.',up:['Direct AI-R&D evaluations improve across open-ended tasks, not only coding benchmarks.','Systems reliably formulate useful hypotheses and make sound research judgements with less scaffolding.'],down:['Benchmark gains fail to transfer to real AI-R&D work.','Progress remains concentrated in execution while problem selection and judgement stay human-limited.'],current:'Developing / evidence supports material capability, not general research autonomy.'},
{symbol:'K',claim:'The AI-R&D feedback loop is closing.',up:['End-to-end research cycles complete with progressively fewer substantive human interventions.','Systems create and use their own informative feedback rather than relying on a fixed human-designed harness.'],down:['Human direction remains necessary at the same critical points despite stronger models.','Autonomous runs become longer without becoming more decision-complete.'],current:'Developing / important parts can be automated; public evidence does not establish full closure.'},
{symbol:'R',claim:'AI-mediated improvements produce persistent recursive gain.',up:['Accepted improvements make successor research systems measurably better at producing further improvements.','Gains transfer across tasks and survive multiple generations without evaluator gaming.'],down:['Self-improvement saturates after a small number of iterations.','Gains disappear outside the original benchmark, harness or search space.'],current:'Developing / bounded successive improvement exists; persistence remains unresolved.'},
{symbol:'τ',claim:'Useful AI-improvement cycles are recursively accelerating.',up:['Comparable end-to-end cycles repeatedly shorten across successive validated generations.','Compression persists after controlling for added compute, parallelism and human labour.'],down:['Cycle time stabilizes or falls only because more external resources are added.','Diminishing returns offset capability gains, leaving validated improvement cadence roughly constant.'],current:'Unknown / no robust public longitudinal series establishes persistent compression.'}
];

export function ChangeOurMind(){
 const[open,setOpen]=useState<number|null>(0);
 return <section id="change-our-mind" className="border-t dz-rule relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
   <div className="grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-10">
    <div className="col-span-6 lg:col-span-3"><p className="dz-meta">08 / What would change our mind?</p><p className="dz-body mt-5 max-w-xs">Explicit update criteria reduce hindsight bias.</p></div>
    <div className="col-span-6 lg:col-span-8 lg:col-start-5"><h2 className="dz-h2 text-5xl sm:text-7xl lg:text-8xl">A claim must be able to lose.</h2><p className="dz-body-strong text-xl sm:text-2xl mt-8 max-w-3xl">For every indicator, FEEDBACK states what would strengthen the claim — and what would weaken it.</p></div>
   </div>
   <div className="mt-16 sm:mt-24 border-t dz-rule">
    {tests.map((x,i)=><article key={x.symbol} className="border-b dz-rule">
     <button onClick={()=>setOpen(open===i?null:i)} className="mind-row w-full bg-transparent dz-text cursor-pointer text-left grid grid-cols-6 lg:grid-cols-12 gap-x-4 py-6 sm:py-8 items-start">
      <span className="col-span-1 dz-h2 text-4xl sm:text-5xl" style={{color:'var(--accent)'}}>{x.symbol}</span>
      <span className="col-span-4 lg:col-span-8 dz-h3 text-xl sm:text-3xl">{x.claim}</span>
      <span className="col-span-1 lg:col-span-3 text-right dz-meta">{open===i?'CLOSE':'TEST'} {open===i?'−':'+'}</span>
     </button>
     {open===i&&<div className="grid lg:grid-cols-12 border-t dz-rule">
      <div className="lg:col-span-5 p-6 sm:p-8 lg:border-r dz-rule"><p className="dz-meta">Would strengthen</p>{x.up.map((v,j)=><p key={j} className="dz-body-strong mt-5"><span className="mind-mark">↑</span> {v}</p>)}</div>
      <div className="lg:col-span-5 p-6 sm:p-8 border-t lg:border-t-0 lg:border-r dz-rule"><p className="dz-meta">Would weaken</p>{x.down.map((v,j)=><p key={j} className="dz-body-strong mt-5"><span className="mind-mark">↓</span> {v}</p>)}</div>
      <div className="lg:col-span-2 p-6 sm:p-8 border-t lg:border-t-0 dz-rule"><p className="dz-meta">Current reading</p><p className="dz-body mt-4">{x.current}</p></div>
     </div>}
    </article>)}
   </div>
   <div className="mt-16 grid grid-cols-6 lg:grid-cols-12 gap-x-4"><div className="col-span-6 lg:col-span-7 lg:col-start-5"><p className="dz-meta">Update rule</p><p className="dz-h3 text-3xl sm:text-5xl mt-3">New evidence can move an indicator in either direction. “Unknown” remains valid when the evidence cannot discriminate.</p></div></div>
  </div>
 </section>
}