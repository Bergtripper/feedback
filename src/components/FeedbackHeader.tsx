import React,{useState}from'react';import{Menu,X,Moon,Sun}from'lucide-react';

const links=[
 {label:'The Loop',href:'#loop'},
 {label:'Evidence',href:'#evidence'},
 {label:"What's missing?",href:'#missing'},
 {label:'What if?',href:'#what-if'},
 {label:'Futures',href:'#futures'},
 {label:'Timeline',href:'#timeline'},
 {label:'Model',href:'#model'}
];

export function FeedbackHeader({dark,onToggle}:{dark:boolean;onToggle:()=>void}){
 const[open,setOpen]=useState(false);
 return <header className="fixed inset-x-0 top-0 z-50 border-b dz-border feedback-header">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
   <a href="#top" className="font-display text-lg font-extrabold tracking-[-0.07em] uppercase sm:text-xl no-underline dz-text">dotzero<span style={{color:'var(--accent)'}}>.</span></a>
   <nav className="hidden md:flex items-center gap-7 font-mono text-[9px] uppercase tracking-[0.18em]">
    {links.map(l=><a key={l.href} href={l.href} className="feedback-nav-link">{l.label}</a>)}
   </nav>
   <div className="flex items-center gap-1.5">
    <span className="hidden sm:inline dz-meta mr-2">06 / Feedback</span>
    <button onClick={onToggle} className="border dz-border dz-surface-raised dz-text p-1.5" title={dark?'Light mode':'Dark mode'} aria-label={dark?'Activate light mode':'Activate dark mode'}>{dark?<Sun className="h-3.5 w-3.5"/>:<Moon className="h-3.5 w-3.5"/>}</button>
    <button onClick={()=>setOpen(!open)} className="md:hidden border dz-border dz-surface-raised dz-text p-1.5" aria-label="Toggle navigation" aria-expanded={open}>{open?<X className="h-3.5 w-3.5"/>:<Menu className="h-3.5 w-3.5"/>}</button>
   </div>
  </div>
  {open&&<nav className="md:hidden border-t dz-border feedback-mobile-nav">{links.map((l,i)=><a key={l.href} href={l.href} onClick={()=>setOpen(false)} className="flex items-center justify-between px-4 sm:px-6 py-3 border-b dz-border last:border-b-0"><span className="dz-meta">{String(i+1).padStart(2,'0')} / {l.label}</span><span className="dz-meta">→</span></a>)}</nav>}
 </header>
}