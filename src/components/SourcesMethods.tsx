import {content} from '../content/editorial';
import React,{useMemo,useState}from'react';import{sources}from'../model';

type SourceFilter='all'|'evaluation'|'paper'|'survey'|'model';
const filters:SourceFilter[]=['all','evaluation','paper','survey','model'];

export function SourcesMethods(){
 const[filter,setFilter]=useState<SourceFilter>('all');
 const visible=useMemo(()=>sources.filter(s=>filter==='all'||s.sourceType===filter).sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)),[filter]);
 return <section id="sources-methods" className="border-t dz-rule relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
   <div className="grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-10">
    <div className="col-span-6 lg:col-span-3"><p className="dz-meta">{content.SourcesMethods.text1}</p><p className="dz-body mt-5 max-w-xs">{content.SourcesMethods.text2}</p></div>
    <div className="col-span-6 lg:col-span-8 lg:col-start-5"><h2 className="dz-h2 text-5xl sm:text-7xl lg:text-8xl">{content.SourcesMethods.text3}</h2><p className="dz-body-strong text-xl sm:text-2xl mt-8 max-w-3xl">{content.SourcesMethods.text4}</p></div>
   </div>

   <div className="mt-16 sm:mt-24 grid lg:grid-cols-12 border-t dz-rule">
    <div className="lg:col-span-4 py-8 lg:pr-8 lg:border-r dz-rule"><p className="dz-meta">{content.SourcesMethods.text5}</p><h3 className="dz-h3 text-3xl mt-4">{content.SourcesMethods.text6}</h3></div>
    <div className="lg:col-span-8 py-8 lg:pl-8 border-t lg:border-t-0 dz-rule grid sm:grid-cols-2 gap-8">
     <div><p className="dz-meta">{content.SourcesMethods.text7}</p><p className="dz-body mt-3">{content.SourcesMethods.text8}</p></div>
     <div><p className="dz-meta">{content.SourcesMethods.text9}</p><p className="dz-body mt-3">{content.SourcesMethods.text10}</p></div>
     <div><p className="dz-meta">{content.SourcesMethods.text11}</p><p className="dz-body mt-3">{content.SourcesMethods.text12}</p></div>
     <div><p className="dz-meta">{content.SourcesMethods.text13}</p><p className="dz-body mt-3">{content.SourcesMethods.text14}</p></div>
    </div>
   </div>

   <div className="mt-16 flex flex-wrap border-t border-l dz-rule w-fit">{filters.map(x=><button key={x} onClick={()=>setFilter(x)} data-active={filter===x} className="source-filter dz-meta px-4 py-3 border-r border-b dz-rule bg-transparent dz-text cursor-pointer">{x}</button>)}</div>
   <div className="mt-8 border-t dz-rule">
    {visible.map((s,i)=><article key={s.id} className="grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-4 py-7 border-b dz-rule">
     <div className="col-span-2 lg:col-span-1"><p className="dz-meta">{String(i+1).padStart(2,'0')}</p></div>
     <div className="col-span-4 lg:col-span-2"><p className="dz-meta">{s.publishedAt}</p><p className="dz-meta mt-2">{s.sourceType}</p></div>
     <div className="col-span-6 lg:col-span-6"><a href={s.url} target="_blank" rel="noreferrer" className="source-title dz-h3 text-xl sm:text-2xl">{s.title}</a><p className="dz-body mt-2">{s.publisher}</p></div>
     <div className="col-span-6 lg:col-span-3">{s.note?<p className="dz-body">{s.note}</p>:<p className="dz-meta">{content.SourcesMethods.text15}</p>}</div>
    </article>)}
   </div>

   <div className="mt-20 grid lg:grid-cols-12 border-y dz-rule">
    <div className="lg:col-span-4 p-6 sm:p-8 lg:border-r dz-rule"><p className="dz-meta">{content.SourcesMethods.text16}</p><h3 className="dz-h3 text-3xl mt-4">{content.SourcesMethods.text17}</h3></div>
    <div className="lg:col-span-8 p-6 sm:p-8 border-t lg:border-t-0 dz-rule"><p className="dz-body-strong">{content.SourcesMethods.text18}</p><p className="dz-body mt-5">{content.SourcesMethods.text19}</p></div>
   </div>
   <div className="mt-10 grid grid-cols-6 lg:grid-cols-12 gap-x-4"><div className="col-span-6 lg:col-span-7 lg:col-start-5"><p className="dz-meta">{content.SourcesMethods.text20}</p><p className="dz-body-strong mt-3">{content.SourcesMethods.text21}</p></div></div>
  </div>
 </section>
}