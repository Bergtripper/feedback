import {content} from '../content/editorial';
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
    <div className="col-span-6 lg:col-span-3"><p className="dz-meta">{content.TheModel.text1}</p><p className="dz-body mt-5 max-w-xs">{content.TheModel.text2}</p></div>
    <div className="col-span-6 lg:col-span-8 lg:col-start-5"><h2 className="dz-h2 text-5xl sm:text-7xl lg:text-8xl">{content.TheModel.text3}<br/>{content.TheModel.text4}</h2><p className="dz-body-strong text-xl sm:text-2xl mt-8 max-w-3xl">{content.TheModel.text5}</p></div>
   </div>
   <div className="mt-16 sm:mt-24 grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l dz-rule">
    {terms.map(x=><article key={x.s} className="p-6 sm:p-7 border-r border-b dz-rule"><span className="dz-h1 text-6xl" style={{color:'var(--accent)'}}>{x.s}</span><h3 className="dz-h3 text-2xl mt-8">{x.name}</h3><p className="dz-body mt-4">{x.plain}</p>{detail&&<div className="mt-8 pt-6 border-t dz-rule"><p className="dz-meta">{content.TheModel.text6}</p><p className="dz-body mt-3">{x.formal}</p><p className="dz-meta mt-6">{content.TheModel.text7}</p><p className="dz-body mt-3">{x.watch}</p></div>}</article>)}
   </div>
   <div className="mt-8 flex justify-end"><button onClick={()=>setDetail(!detail)} className="model-toggle dz-meta border dz-rule px-4 py-3 bg-transparent dz-text cursor-pointer">{detail?'Hide definitions':'Show operational definitions'} →</button></div>

   <div className="mt-20 sm:mt-28 grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-10">
    <div className="col-span-6 lg:col-span-3"><p className="dz-meta">{content.TheModel.text8}</p></div>
    <div className="col-span-6 lg:col-span-8 lg:col-start-5">
     <div className="model-chain" aria-label="C to K to R to tau"><span>{content.TheModel.text9}</span><b>→</b><span>{content.TheModel.text10}</span><b>→</b><span>{content.TheModel.text11}</span><b>→</b><span>τ ↓ ?</span></div>
     <p className="dz-h3 text-2xl sm:text-4xl mt-10">{content.TheModel.text12}</p>
     <p className="dz-body mt-5 max-w-3xl">{content.TheModel.text13}</p>
    </div>
   </div>

   <div className="mt-20 border-y dz-rule grid lg:grid-cols-12">
    <div className="lg:col-span-4 p-6 sm:p-8 lg:border-r dz-rule"><p className="dz-meta">{content.TheModel.text14}</p><h3 className="dz-h3 text-3xl mt-4">{content.TheModel.text15}</h3></div>
    <div className="lg:col-span-8 p-6 sm:p-8 border-t lg:border-t-0 dz-rule"><p className="dz-body-strong">{content.TheModel.text16}</p><p className="dz-body mt-5">{content.TheModel.text17}</p></div>
   </div>

   <div className="mt-16 grid grid-cols-6 lg:grid-cols-12 gap-x-4"><div className="col-span-6 lg:col-span-7 lg:col-start-5"><p className="dz-meta">{content.TheModel.text18}</p><p className="dz-h3 text-3xl sm:text-5xl mt-3">{content.TheModel.text19}</p></div></div>
  </div>
 </section>
}