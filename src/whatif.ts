// What If? teaching model — pure functions, no React.
// Coefficients are illustrative. They are NOT estimates fitted to AI-R&D data.
//
// v0.2 changes (see src/whatif.test.ts for the invariants):
//  - Zero capability means zero change: residual friction now scales the gain
//    instead of being subtracted, so cycles never lengthen as a modelling artefact.
//  - Compression is no longer constant per cycle. A persistence factor decides
//    whether it fades (accelerated R&D), holds, or compounds (recursive acceleration).
//    A constant per-cycle compression is a geometric series: it always sums to a
//    finite time, so the old model could only show "plateau" or "singularity".

export type Regime='plateau'|'fading'|'sustained'|'compounding';
export type Bottleneck='Research capability'|'Human-dependent loop closure'|'Recursive gain'|'Persistence of gains across cycles'|'No single dominant bottleneck';
export interface WhatIfInput{c:number;k:number;scale:number} // each 0–100
export interface WhatIfResult{gain:number;friction:number;compression:number;persistence:number;perCycle:number[];times:number[];regime:Regime;bottleneck:Bottleneck;scaleOnly:boolean}

export const GENERATIONS=5;          // G0…G4
export const MAX_FIRST_COMPRESSION=.32;
export const MAX_CYCLE_COMPRESSION=.45;
export const PLATEAU_BELOW=.03;      // first-cycle compression under 3% reads as stable
export const FADING_BELOW=.95;       // persistence under this: compression decays
export const COMPOUNDING_ABOVE=1.02; // persistence over this: compression grows

export const clamp=(n:number,min=0,max=1)=>Math.max(min,Math.min(max,n));

export function whatIf({c,k,scale}:WhatIfInput):WhatIfResult{
 const C=clamp(c/100),K=clamp(k/100),S=clamp(scale/100);
 // Effective research capacity: capability, discounted while people still close the loop.
 const effective=C*(.25+.75*K);
 // Continuous, bounded recursive gain. No threshold: partial capability gives partial gain.
 const gain=clamp(Math.pow(effective,1.35)*(.55+.45*S));
 // Residual human and process friction. It absorbs part of the gain; it never adds time.
 const friction=clamp(1-(K*.62+C*.23));
 const compression=Math.min(MAX_FIRST_COMPRESSION,gain*.48*(1-.6*friction));
 // Share of this cycle's compression that carries into the next one.
 const persistence=.5+.65*K*Math.sqrt(gain);
 const perCycle:number[]=[];const times=[1];
 for(let i=0;i<GENERATIONS-1;i++){
  const ci=Math.min(MAX_CYCLE_COMPRESSION,compression*Math.pow(persistence,i));
  perCycle.push(ci);times.push(times[i]!*(1-ci));
 }
 const regime:Regime=compression<PLATEAU_BELOW?'plateau':persistence<FADING_BELOW?'fading':persistence<=COMPOUNDING_ABOVE?'sustained':'compounding';
 let bottleneck:Bottleneck;
 if(C<.4)bottleneck='Research capability';
 else if(K<.55)bottleneck='Human-dependent loop closure';
 else if(gain<.28)bottleneck='Recursive gain';
 else if(persistence<FADING_BELOW)bottleneck='Persistence of gains across cycles';
 else bottleneck='No single dominant bottleneck';
 // Warn only when the warning is true in the model: high scale, modest capability, no compression.
 const scaleOnly=S>.65&&C<.55&&regime==='plateau';
 return{gain,friction,compression,persistence,perCycle,times,regime,bottleneck,scaleOnly};
}

export const regimeLabel:Record<Regime,string>={
 plateau:'Plateau — no meaningful compression',
 fading:'Accelerated R&D — compression fades and cycle time stabilizes',
 sustained:'Sustained compression — each cycle shortens by a similar share',
 compounding:'Recursive acceleration — compression grows from cycle to cycle'
};
