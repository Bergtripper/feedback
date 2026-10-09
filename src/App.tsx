import {copy} from './content/en';
import {QuantSignals} from './components/QuantSignals';
import {FrontierCadence} from './components/FrontierCadence';
import {SourcesMethods} from './components/SourcesMethods';
import {ChangeOurMind} from './components/ChangeOurMind';
import {TheModel} from './components/TheModel';
import {EvidenceTimeline} from './components/EvidenceTimeline';
import {ThreeFutures} from './components/ThreeFutures';
import {FeedbackHeader} from './components/FeedbackHeader';
import {WhatIf} from './components/WhatIf';
import {MissingGates} from './components/MissingGates';
import {EvidenceExplorer} from './components/EvidenceExplorer';
import {TheLoop} from './components/TheLoop';
import React,{useState}from'react';
export default function App(){
 const[dark,setDark]=useState(()=>localStorage.getItem('feedback-color-mode')==='dark');
 const[timeTool,setTimeTool]=useState(()=>new URLSearchParams(window.location.search).get('tool')==='time');
 const toggleDark=()=>setDark(v=>{const next=!v;localStorage.setItem('feedback-color-mode',next?'dark':'light');return next});
 const toggleTime=()=>{const next=!timeTool;setTimeTool(next);const u=new URL(window.location.href);next?u.searchParams.set('tool','time'):u.searchParams.delete('tool');window.history.pushState({},'',u)};
 return <div data-color-mode={dark?'dark':'light'} className="min-h-screen dz-bg dz-text relative">
<div id="top" className="fixed inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-6 lg:grid-cols-12">{Array.from({length:12}).map((_,i)=><div key={i} className="h-full border-r dz-grid-line first:border-l"/>)}</div>
<FeedbackHeader dark={dark} onToggle={toggleDark} timeTool={timeTool} onTimeTool={toggleTime}/>
<main className="relative z-10 pt-16">{timeTool?<FrontierCadence/>:<><section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20"><div className="grid grid-cols-6 lg:grid-cols-12 gap-x-4"><p className="dz-meta col-span-6 lg:col-span-2">{copy.hero.meta}</p><div className="col-span-6 lg:col-span-9 lg:col-start-4 mt-8 lg:mt-0"><p className="dz-meta mb-5">{copy.hero.eyebrow}</p><h1 className="dz-h1 text-[clamp(3.5rem,9vw,9rem)] max-w-6xl">{copy.hero.title}</h1><p className="dz-body-strong max-w-3xl mt-10 sm:mt-14 text-xl sm:text-2xl">{copy.hero.subtitle}</p></div></div></section>
<section className="border-y dz-rule"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-10"><p className="dz-meta col-span-6 lg:col-span-3">{copy.premise.eyebrow}</p><div className="col-span-6 lg:col-span-7 lg:col-start-5"><p className="dz-h3 text-3xl sm:text-5xl">{copy.premise.first}</p><p className="dz-h3 text-3xl sm:text-5xl mt-4" style={{color:'var(--accent)'}}>{copy.premise.second}</p></div></div></section>
<TheLoop/><QuantSignals/><EvidenceExplorer/><MissingGates/><WhatIf/><ThreeFutures/><EvidenceTimeline/><TheModel/><ChangeOurMind/><SourcesMethods/><section className="border-t dz-rule"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-6 lg:grid-cols-12 gap-x-4"><p className="dz-meta col-span-6 lg:col-span-3">{copy.method.eyebrow}</p><div className="col-span-6 lg:col-span-7 lg:col-start-5"><p className="dz-body-strong">{copy.method.description}</p></div></div></section></>}</main>
<footer className="relative z-10 border-t dz-rule"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between"><span className="dz-meta">{copy.footer.lab}</span><span className="dz-meta">{copy.footer.version}</span></div></footer></div>}