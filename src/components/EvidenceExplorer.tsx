import React,{useMemo,useState}from'react';import{evidence,indicators,sources,type IndicatorId}from'../model';

const tone=(d:string)=>d==='supports'?'↑ supports':d==='challenges'?'↓ challenges':'— context';
const kindLabel=(k:string)=>k==='observation'?'Observed':k==='estimate'?'Estimated':k==='hypothesis'?'Hypothesis':'Scenario';

export function EvidenceExplorer(){
 const[active,setActive]=useState<IndicatorId>('capability');
 const indicator=indicators.find(x=>x.id===active)!;
 const rows=useMemo(()=>indicator.evidenceIds.map(id=>evidence.find(e=>e.id===id)).filter(Boolean),[indicator]);
 return <section id="evidence" className="border-t dz-rule relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
   <div className="grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-10">
    <div className="col-span-6 lg:col-span-3"><p className="dz-meta">02 / Where are we?</p><p className="dz-body mt-5 max-w-xs">A reading of public evidence, not a forecast and not a probability of AGI.</p></div>
    <div className="col-span-6 lg:col-span-8 lg:col-start-5"><h2 className="dz-h2 text-5xl sm:text-7xl lg:text-8xl">What does the evidence say?</h2></div>
   </div>

   <div className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 border-t border-l dz-rule">
    {indicators.map(x=><button key={x.id} onClick={()=>setActive(x.id)} data-active={x.id===active} className="evidence-tab text-left p-5 sm:p-7 border-r border-b dz-rule bg-transparent dz-text cursor-pointer">
      <div className="flex justify-between gap-3"><span className="dz-h1 text-5xl sm:text-7xl" style={{color:'var(--accent)'}}>{x.symbol}</span><span className="dz-meta">{x.status}</span></div>
      <span className="block dz-h3 text-lg sm:text-2xl mt-7">{x.label}</span>
    </button>)}
   </div>

   <div className="grid lg:grid-cols-12 border-x border-b dz-rule">
    <aside className="lg:col-span-4 p-6 sm:p-8 lg:border-r dz-rule">
      <p className="dz-meta">{indicator.symbol} / Current reading</p>
      <h3 className="dz-h2 text-4xl sm:text-5xl mt-4">{indicator.status}</h3>
      <p className="dz-body-strong mt-5">{indicator.note}</p>
      <div className="mt-10 pt-5 border-t dz-rule"><p className="dz-meta">Question</p><p className="dz-body-strong mt-2">{indicator.question}</p></div>
      <div className="mt-8"><p className="dz-meta">Evidence count</p><p className="dz-h2 text-4xl mt-2">{rows.length.toString().padStart(2,'0')}</p></div>
    </aside>
    <div className="lg:col-span-8">
      {rows.map((item:any,i:number)=>{const refs=item.sourceIds.map((id:string)=>sources.find(s=>s.id===id)).filter(Boolean);return <details key={item.id} className="evidence-row border-b dz-rule last:border-b-0" open={i===0}>
       <summary className="list-none cursor-pointer p-6 sm:p-8 grid sm:grid-cols-12 gap-4 items-start">
        <div className="sm:col-span-2"><span className="dz-meta">{kindLabel(item.kind)}</span></div>
        <div className="sm:col-span-7"><h4 className="dz-h3 text-xl sm:text-2xl">{item.title}</h4></div>
        <div className="sm:col-span-3 sm:text-right"><span className="dz-meta">{tone(item.direction)}</span><span className="evidence-plus ml-4 dz-meta">+</span></div>
       </summary>
       <div className="px-6 sm:px-8 pb-8 grid sm:grid-cols-12 gap-6">
        <div className="sm:col-span-8 sm:col-start-3"><p className="dz-body-strong">{item.summary}</p>
         <div className="mt-7 p-5 evidence-limit"><p className="dz-meta">Limit / uncertainty</p><p className="dz-body mt-2">{item.limitation}</p></div>
         <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3"><span className="dz-meta">Confidence / {item.confidence}</span>{item.observedAt&&<span className="dz-meta">Observed / {item.observedAt}</span>}</div>
         <div className="mt-7 pt-5 border-t dz-rule"><p className="dz-meta mb-3">Sources</p>{refs.map((s:any)=><a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="evidence-source block dz-body-strong">{s.title} <span className="dz-meta">/ {s.publisher}</span></a>)}</div>
        </div>
       </div>
      </details>})}
    </div>
   </div>

   <div className="mt-10 grid grid-cols-6 lg:grid-cols-12 gap-x-4"><div className="col-span-6 lg:col-span-8 lg:col-start-5"><p className="dz-meta">Reading rule</p><p className="dz-h3 text-2xl sm:text-4xl mt-3">Unknown is a result.</p><p className="dz-body mt-4 max-w-2xl">When public evidence cannot establish a trend, FEEDBACK keeps the indicator unresolved rather than converting uncertainty into a score.</p></div></div>
  </div>
 </section>
}