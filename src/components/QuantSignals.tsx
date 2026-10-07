import React,{useMemo,useState}from'react';

type Lens='horizon'|'benchmark';
const horizon=[
 {year:2019,label:'GPT-2',minutes:.15},{year:2020,label:'GPT-3',minutes:1.5},{year:2022.9,label:'GPT-3.5',minutes:4},
 {year:2023.2,label:'GPT-4',minutes:8},{year:2024.2,label:'Claude 3 Opus',minutes:25},{year:2024.7,label:'o1-preview',minutes:45},
 {year:2025.3,label:'o3',minutes:75},{year:2025.6,label:'GPT-5',minutes:204},{year:2025.9,label:'Claude Opus 4.5',minutes:294},
 {year:2026.1,label:'Claude Opus 4.6',minutes:720}
];
const benchmark=[
 {year:2024,label:'OSWorld / agents',value:12,note:'Approx. agent computer-use success.'},
 {year:2025,label:'OSWorld / agents',value:66.3,note:'Structured computer-use benchmark.'}
];
const W=900,H=360,P=54;
const x=(v:number,min:number,max:number)=>P+(v-min)/(max-min)*(W-P*2);
const logY=(m:number)=>H-P-(Math.log10(Math.max(m,.1))-Math.log10(.1))/(Math.log10(960)-Math.log10(.1))*(H-P*2);

export function QuantSignals(){
 const[lens,setLens]=useState<Lens>('horizon');const[selected,setSelected]=useState(horizon.length-1);
 const path=useMemo(()=>horizon.map((d,i)=>(i?'L':'M')+x(d.year,2019,2026.2).toFixed(1)+' '+logY(d.minutes).toFixed(1)).join(' '),[]);
 const d=horizon[selected];
 return <section id="signals" className="border-t dz-rule relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
   <div className="grid grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-10"><div className="col-span-6 lg:col-span-3"><p className="dz-meta">SIGNALS / Quantitative lenses</p><p className="dz-body mt-5 max-w-xs">Historical context becomes useful when release cadence is compared with independent capability measurements.</p></div><div className="col-span-6 lg:col-span-8 lg:col-start-5"><h2 className="dz-h2 text-5xl sm:text-7xl lg:text-8xl">Is anything measurable accelerating?</h2></div></div>
   <div className="mt-16 flex flex-wrap border-t border-l dz-rule w-fit"><button onClick={()=>setLens('horizon')} data-active={lens==='horizon'} className="signal-tab dz-meta px-4 py-3 border-r border-b dz-rule bg-transparent dz-text cursor-pointer">TASK HORIZON</button><button onClick={()=>setLens('benchmark')} data-active={lens==='benchmark'} className="signal-tab dz-meta px-4 py-3 border-r border-b dz-rule bg-transparent dz-text cursor-pointer">BENCHMARK PRESSURE</button></div>

   {lens==='horizon'?<div className="mt-8 grid lg:grid-cols-12 border-y dz-rule">
    <div className="lg:col-span-9 py-8 lg:pr-8 lg:border-r dz-rule overflow-x-auto"><svg viewBox={'0 0 '+W+' '+H} className="signal-chart" role="img" aria-label="Schematic reconstruction of the METR task horizon trend"><g className="signal-grid">{[.1,1,10,60,240,960].map(v=><g key={v}><line x1={P} x2={W-P} y1={logY(v)} y2={logY(v)}/><text x={8} y={logY(v)+4}>{v<1?'seconds':v<60?v+'m':v/60+'h'}</text></g>)}</g><path d={path} className="signal-line"/>{horizon.map((p,i)=><g key={p.label} onClick={()=>setSelected(i)} className="signal-point" data-active={i===selected} tabIndex={0} role="button" aria-label={p.label}><circle cx={x(p.year,2019,2026.2)} cy={logY(p.minutes)} r={i===selected?8:5}/></g>)}</svg><input type="range" min="0" max={horizon.length-1} value={selected} onChange={e=>setSelected(Number(e.target.value))} className="cadence-range w-full mt-4" aria-label="Navigate task horizon points"/></div>
    <div className="lg:col-span-3 p-6 sm:p-8 border-t lg:border-t-0 dz-rule"><p className="dz-meta">{d.year.toFixed(1)} / selected point</p><h3 className="dz-h3 text-3xl mt-4">{d.label}</h3><p className="dz-h2 text-5xl mt-8">{d.minutes>=60?(d.minutes/60).toFixed(1)+' h':d.minutes+' min'}</p><p className="dz-body mt-5">SCHEMATIC TREND — historical points are provisional visual anchors, not authoritative METR values. Use METR's live dataset for measurement.</p></div>
   </div>:<div className="mt-8 grid lg:grid-cols-12 border-y dz-rule">
    <div className="lg:col-span-7 p-6 sm:p-8 lg:border-r dz-rule"><div className="flex items-end gap-8 h-64">{benchmark.map(b=><div key={b.year} className="flex-1 h-full flex flex-col justify-end"><p className="dz-meta mb-2">{b.value}%</p><div className="benchmark-bar" style={{height:b.value+'%'}}/><p className="dz-meta mt-3">{b.year}</p></div>)}</div></div>
    <div className="lg:col-span-5 p-6 sm:p-8 border-t lg:border-t-0 dz-rule"><p className="dz-meta">Stanford AI Index / OSWorld</p><h3 className="dz-h3 text-3xl mt-4">12% → 66.3%</h3><p className="dz-body mt-5">Agent computer-use performance rose sharply in 2025. Stanford also reports that difficult benchmarks are increasingly saturated in months rather than years.</p><p className="dz-body-strong mt-8">Fast benchmark progress supports C ↑. It does not establish K → 1, R &gt; 0 or τ ↓.</p></div>
   </div>}

   <div className="mt-10 grid grid-cols-6 lg:grid-cols-12 gap-x-4"><div className="col-span-6 lg:col-span-7 lg:col-start-5"><p className="dz-meta">Interpretation</p><p className="dz-body-strong mt-3">The useful comparison is not “models are released faster, therefore intelligence is exploding.” It is whether independent capability measures rise while human intervention falls, recursive gains persist and validated improvement cycles compress.</p></div></div>
  </div>
 </section>
}