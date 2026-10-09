import {copy} from '../content/en';
import React,{useEffect,useState}from'react';import{Menu,X,Moon,Sun}from'lucide-react';import{DotzeroMark}from'./DotzeroMark';

const links=copy.navigation;
const primary=links.filter(x=>(['#loop','#evidence','#what-if','#timeline'] as readonly string[]).includes(x.href));

export function FeedbackHeader({dark,onToggle,timeTool,onTimeTool}:{dark:boolean;onToggle:()=>void;timeTool:boolean;onTimeTool:()=>void}){
 const[open,setOpen]=useState(false);const[compactBrand,setCompactBrand]=useState(false);
 useEffect(()=>{const sync=()=>setCompactBrand(window.scrollY>32);sync();window.addEventListener('scroll',sync,{passive:true});return()=>window.removeEventListener('scroll',sync)},[]);
 return <header className="fixed inset-x-0 top-0 z-50 border-b dz-border feedback-header">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
   <a href="#top" className="feedback-identity no-underline dz-text" data-compact={compactBrand} aria-label={copy.header.identity}><span className="feedback-wordmark"><strong>FEEDBACK</strong><span className="feedback-return" aria-hidden="true"><i/><b/></span></span><span className="feedback-provenance"><DotzeroMark size={10}/><span>{copy.header.provenance}</span></span></a>
   <nav className="hidden lg:flex items-center gap-6 font-mono text-[9px] uppercase tracking-[0.18em]">{primary.map(l=><a key={l.href} href={l.href} className="feedback-nav-link">{l.label}</a>)}</nav>
   <div className="flex items-center gap-1.5">
    <span className="hidden sm:inline dz-meta mr-2">{copy.header.section}</span>
    <button onClick={onTimeTool} className="border dz-border dz-surface-raised dz-text px-2.5 py-1.5" data-active={timeTool}><span className="dz-meta">{timeTool?copy.header.back:copy.header.accelerator}</span></button>
    <button onClick={onToggle} className="border dz-border dz-surface-raised dz-text p-1.5" title={dark?copy.header.light:copy.header.dark} aria-label={dark?copy.header.activateLight:copy.header.activateDark}>{dark?<Sun className="h-3.5 w-3.5"/>:<Moon className="h-3.5 w-3.5"/>}</button>
    <button onClick={()=>setOpen(!open)} className="border dz-border dz-surface-raised dz-text px-2 py-1.5 flex items-center gap-1.5" aria-label={copy.header.toggleIndex} aria-expanded={open}>{open?<X className="h-3.5 w-3.5"/>:<Menu className="h-3.5 w-3.5"/>}<span className="hidden sm:inline dz-meta">{copy.header.index}</span></button>
   </div>
  </div>
  {open&&<nav className="border-t dz-border feedback-mobile-nav"><div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3">{links.map((l,i)=><a key={l.href} href={l.href} onClick={()=>setOpen(false)} className="flex items-center justify-between px-4 sm:px-6 py-3 border-b sm:border-r dz-border"><span className="dz-meta">{String(i+1).padStart(2,'0')} / {l.label}</span><span className="dz-meta">→</span></a>)}</div></nav>}
 </header>
}