export type EvidenceKind='observation'|'estimate'|'hypothesis'|'scenario';
export type Direction='supports'|'challenges'|'context';
export type IndicatorId='capability'|'closure'|'recursive-gain'|'generation-time';
export interface Source{id:string;title:string;publisher:string;publishedAt:string;url:string}
export interface Evidence{id:string;indicator:IndicatorId;kind:EvidenceKind;direction:Direction;title:string;summary:string;sourceIds:string[];observedAt?:string;confidence?:'low'|'medium'|'high'}
export interface Indicator{id:IndicatorId;symbol:'C'|'K'|'R'|'τ';label:string;question:string;status:'limited'|'developing'|'advanced'|'unknown';note:string;evidenceIds:string[]}
export const indicators:Indicator[]=[
{id:'capability',symbol:'C',label:'Research capability',question:'Can AI do the work of an AI researcher?',status:'developing',note:'Evidence layer pending.',evidenceIds:[]},
{id:'closure',symbol:'K',label:'Loop closure',question:'How much of the research loop can AI complete without us?',status:'unknown',note:'Evidence layer pending.',evidenceIds:[]},
{id:'recursive-gain',symbol:'R',label:'Recursive gain',question:'Do improvements make AI better at producing the next improvement?',status:'limited',note:'Evidence layer pending.',evidenceIds:[]},
{id:'generation-time',symbol:'τ',label:'Generation time',question:'Are successive improvement cycles getting faster?',status:'unknown',note:'Evidence layer pending.',evidenceIds:[]}];
export const sources:Source[]=[];export const evidence:Evidence[]=[];