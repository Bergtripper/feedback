import React,{useEffect,useMemo,useState}from'react';

type M={year:number,date:string,name:string,org:string,type:'architecture'|'model'|'product'|'reasoning';why:string,url:string};
const milestones:M[]=[
{year:2012.92,date:'2012',name:'AlexNet',org:'University of Toronto',type:'architecture',why:'GPU-trained deep convolutional networks decisively changed large-scale vision.',url:'https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks'},
{year:2016.07,date:'2016-01',name:'AlphaGo',org:'Google DeepMind',type:'reasoning',why:'Deep neural networks, search and self-play defeated a professional Go player.',url:'https://www.nature.com/articles/nature16961'},
{year:2017.45,date:'2017-06',name:'Transformer',org:'Google',type:'architecture',why:'Attention Is All You Need introduced the architecture that became the foundation of modern LLMs.',url:'https://arxiv.org/abs/1706.03762'},
{year:2018.45,date:'2018-06',name:'GPT',org:'OpenAI',type:'model',why:'Generative pre-training demonstrated broad transfer from unsupervised language modelling.',url:'https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf'},
{year:2019.12,date:'2019-02-14',name:'GPT-2',org:'OpenAI',type:'model',why:'Scaling a transformer language model produced strong zero-shot behaviour across tasks.',url:'https://openai.com/index/better-language-models/'},
{year:2020.41,date:'2020-05-28',name:'GPT-3',org:'OpenAI',type:'model',why:'175B parameters made few-shot prompting a central capability paradigm.',url:'https://openai.com/index/language-models-are-few-shot-learners/'},
{year:2022.91,date:'2022-11-30',name:'ChatGPT',org:'OpenAI',type:'product',why:'Conversational RLHF turned frontier language models into a mass interactive product.',url:'https://openai.com/index/chatgpt/'},
{year:2023.20,date:'2023-03-14',name:'GPT-4 + Claude',org:'OpenAI / Anthropic',type:'model',why:'GPT-4 and the public launch of Claude marked a new multi-lab frontier era.',url:'https://openai.com/index/gpt-4/'},
{year:2023.93,date:'2023-12-06',name:'Gemini 1.0',org:'Google DeepMind',type:'model',why:'A natively multimodal frontier family spanning Ultra, Pro and Nano.',url:'https://blog.google/innovation-and-ai/technology/ai/google-gemini-ai/'},
{year:2024.17,date:'2024-03-04',name:'Claude 3',org:'Anthropic',type:'model',why:'Claude 3 established a stronger competitive frontier across reasoning and multimodal tasks.',url:'https://www.anthropic.com/news/claude-3-family'},
{year:2024.36,date:'2024-05-13',name:'GPT-4o',org:'OpenAI',type:'model',why:'Native real-time multimodality brought text, vision and audio into one flagship system.',url:'https://openai.com/index/hello-gpt-4o/'},
{year:2024.70,date:'2024-09-12',name:'o1',org:'OpenAI',type:'reasoning',why:'Test-time reasoning and reinforcement learning opened a distinct scaling axis beyond pre-training.',url:'https://openai.com/index/learning-to-reason-with-llms/'},
{year:2025.05,date:'2025-01-20',name:'DeepSeek-R1',org:'DeepSeek',type:'reasoning',why:'Open reasoning models demonstrated strong results with large-scale RL and released weights.',url:'https://deepseek.com/en/news/deepseek-r1/'},
{year:2025.60,date:'2025-08-07',name:'GPT-5',org:'OpenAI',type:'model',why:'A unified system combined fast responses, deeper reasoning and routing for agentic work.',url:'https://openai.com/index/introducing-gpt-5/'},
{year:2026.31,date:'2026-04-23',name:'GPT-5.5',org:'OpenAI',type:'model',why:'Greater autonomous work across coding, research, analysis and computer workflows.',url:'https://openai.com/index/introducing-gpt-5-5/'},
{year:2026.67,date:'2026-09-03',name:'GPT-6 Astra',org:'OpenAI',type:'model',why:'A new frontier generation across computer use, software engineering, science and professional work.',url:'https://openai.com/index/gpt-6-astra/'},
{year:2026.72,date:'2026-09-22',name:'GPT-6 Sol / Luna',org:'OpenAI',type:'model',why:'Frontier capability spread into faster and lower-cost members of the GPT-6 family.',url:'https://openai.com/index/introducing-gpt-6-sol-and-luna/'}
];
const min=2012,max=2026.8;
const pos=(y:number)=>((y-min)/(max-min))*100;

export function FrontierCadence(){
 const[idx,setIdx]=useState(milestones.length-1);const[playing,setPlaying]=useState(false);
 useEffect(()=>{if(!playing)return;const id=window.setInterval(()=>setIdx(i=>i>=milestones.length-1?0:i+1),900);return()=>window.clearInterval(id)},[playing]);
 const m=milestones[idx] ?? milestones[milestones.length-1]!;const prev=idx?(milestones[idx-1] ?? null):null;
 const months=prev?Math.max(1,Math.round((m.year-prev.year)*12)):null;
 const maxMonths=48;const angle=months==null?0:Math.min(months,maxMonths)/maxMonths*300-150;
 const density=useMemo(()=>milestones.map((item,i)=>{const previous=i>0?milestones[i-1]:undefined;return {x:item,i,gap:previous?Math.round((item.year-previous.year)*12):null}}),[]);
 return <section id="cadence" className="border-t dz-rule relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
   <div className="grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-10"><div className="col-span-6 lg:col-span-3"><p className="dz-meta">TIME / Frontier cadence</p><p className="dz-body mt-5 max-w-xs">Navigate selected milestones from the deep-learning breakthrough to today's frontier.</p></div><div className="col-span-6 lg:col-span-8 lg:col-start-5"><h2 className="dz-h2 text-5xl sm:text-7xl lg:text-8xl">Watch the frontier compress.</h2><p className="dz-body-strong text-xl sm:text-2xl mt-8 max-w-3xl">Release cadence is not research velocity. It is a visible historical signal — useful only when kept separate from C, K, R and τ.</p></div></div>

   <div className="mt-16 sm:mt-24 border-y dz-rule py-8">
    <div className="flex flex-wrap items-center justify-between gap-4"><div className="flex gap-2"><button onClick={()=>setPlaying(!playing)} className="cadence-control dz-meta border dz-rule px-4 py-3 bg-transparent dz-text cursor-pointer">{playing?'PAUSE':'PLAY'} {playing?'Ⅱ':'▶'}</button><button onClick={()=>{setPlaying(false);setIdx(0)}} className="cadence-control dz-meta border dz-rule px-4 py-3 bg-transparent dz-text cursor-pointer">2012 ↺</button></div><p className="dz-meta">{m.date} / {m.org}</p></div>
    <div className="cadence-track mt-12 relative h-32 border-b dz-rule" aria-label="AI milestone timeline">
     {density.map(d=><button key={d.i} onClick={()=>{setPlaying(false);setIdx(d.i)}} className="cadence-point" data-active={d.i===idx} style={{left:pos(d.x.year)+'%'}} aria-label={d.x.name}><span className="cadence-stem"/><span className="cadence-dot"/><span className="cadence-year">{d.i===0||d.i===density.length-1||d.x.date.slice(0,4)!==(density[d.i-1]?.x.date.slice(0,4) ?? '')?d.x.date.slice(0,4):''}</span></button>)}
    </div>
    <input className="cadence-range mt-8 w-full" type="range" min="0" max={milestones.length-1} value={idx} onChange={e=>{setPlaying(false);setIdx(Number(e.target.value))}} aria-label="Navigate AI milestones"/>
   </div>

   <div className="grid lg:grid-cols-12 border-b dz-rule">
    <div className="lg:col-span-7 py-10 lg:pr-10 lg:border-r dz-rule"><p className="dz-meta">{String(idx+1).padStart(2,'0')} / {m.type}</p><h3 className="dz-h2 text-5xl sm:text-7xl mt-4">{m.name}</h3><p className="dz-body-strong text-xl mt-6 max-w-2xl">{m.why}</p><a href={m.url} target="_blank" rel="noreferrer" className="inline-block dz-meta mt-8 cadence-source">Primary source ↗</a></div>
    <div className="lg:col-span-5 py-10 lg:pl-10 border-t lg:border-t-0 dz-rule flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-8">
     <div className="cadence-clock" aria-label={months?months+' months since previous selected milestone':'Starting milestone'}><div className="cadence-hand" style={{transform:'translateX(-50%) rotate('+angle+'deg)'}}/><div className="cadence-hub"/></div>
     <div><p className="dz-meta">Frontier cadence</p><p className="dz-h2 text-5xl mt-3">{months?months+' mo':'START'}</p><p className="dz-body mt-3 max-w-xs">{months?'Since the previous selected milestone. Editorial cadence — not measured research generation time.':'Timeline baseline.'}</p></div>
    </div>
   </div>
   <div className="mt-10 grid grid-cols-6 lg:grid-cols-12 gap-x-4"><div className="col-span-6 lg:col-span-7 lg:col-start-5"><p className="dz-meta">Reading rule</p><p className="dz-body-strong mt-3">A denser timeline can reflect more labs, more products and finer release naming — not necessarily faster underlying discovery. FEEDBACK therefore treats cadence as context, never as evidence of recursive acceleration by itself.</p></div></div>
  </div>
 </section>
}