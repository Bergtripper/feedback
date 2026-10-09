import {content} from '../content/editorial';
import React,{useMemo,useState}from'react';import{evidence,sources,type IndicatorId}from'../model';

type Filter='all'|IndicatorId;
const filters:{id:Filter;label:string}[]=[{id:'all',label:'ALL'},{id:'capability',label:'C'},{id:'closure',label:'K'},{id:'recursive-gain',label:'R'},{id:'generation-time',label:'τ'}];
const symbol:Record<IndicatorId,string>={capability:'C',closure:'K','recursive-gain':'R','generation-time':'τ'};

export function EvidenceTimeline(){
 const[filter,setFilter]=useState<Filter>('all');
 const rows=useMemo(()=>evidence.filter(e=>filter==='all'||e.indicator===filter).map(e=>({e,source:sources.find(s=>s.id===e.sourceIds[0])})).sort((a,b)=>(b.e.observedAt||b.source?.publishedAt||'').localeCompare(a.e.observedAt||a.source?.publishedAt||'')),[filter]);
 return <section id="timeline" className="border-t dz-rule relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
   <div className="grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-10">
    <div className="col-span-6 lg:col-span-3"><p className="dz-meta">{content.EvidenceTimeline.text1}</p><p className="dz-body mt-5 max-w-xs">{content.EvidenceTimeline.text2}</p></div>
    <div className="col-span-6 lg:col-span-8 lg:col-start-5"><h2 className="dz-h2 text-5xl sm:text-7xl lg:text-8xl">{content.EvidenceTimeline.text3}</h2></div>
   </div>
   <div className="mt-16 sm:mt-24 flex flex-wrap border-t border-l dz-rule w-fit">{filters.map(x=><button key={x.id} onClick={()=>setFilter(x.id)} data-active={filter===x.id} className="timeline-filter dz-meta px-4 py-3 border-r border-b dz-rule bg-transparent dz-text cursor-pointer">{x.label}</button>)}</div>
   <div className="mt-8 border-t dz-rule">
    {rows.map(({e,source},i)=>{const date=e.observedAt||source?.publishedAt||'—';const empirical=Boolean(e.observedAt);return <article key={e.id} className="timeline-row grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-5 py-7 sm:py-9 border-b dz-rule">
      <div className="col-span-2 lg:col-span-1"><span className="dz-h2 text-4xl" style={{color:'var(--accent)'}}>{symbol[e.indicator]}</span></div>
      <div className="col-span-4 lg:col-span-2"><p className="dz-meta">{date}</p><p className="dz-meta mt-2">{empirical?'observed':'publication'}</p></div>
      <div className="col-span-6 lg:col-span-5"><div className="flex flex-wrap gap-2 mb-3"><span className="timeline-chip dz-meta">{e.kind}</span><span className={'timeline-chip timeline-'+e.direction+' dz-meta'}>{e.direction}</span></div><h3 className="dz-h3 text-xl sm:text-2xl">{e.title}</h3><p className="dz-body mt-3">{e.summary}</p></div>
      <div className="col-span-6 lg:col-span-3 lg:col-start-10"><p className="dz-meta">{content.EvidenceTimeline.text4}</p>{source&&<a href={source.url} target="_blank" rel="noreferrer" className="evidence-source dz-body-strong block mt-2">{source.publisher}<br/><span className="dz-body">{source.title}</span></a>}<p className="dz-meta mt-5">Confidence / {e.confidence}</p></div>
    </article>})}
   </div>
   <div className="mt-10 grid grid-cols-6 lg:grid-cols-12 gap-x-4"><div className="col-span-6 lg:col-span-7 lg:col-start-5"><p className="dz-meta">{content.EvidenceTimeline.text5}</p><p className="dz-body-strong mt-3">{content.EvidenceTimeline.text6}</p></div></div>
  </div>
 </section>
}