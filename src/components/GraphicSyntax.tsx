import React from 'react';
export function DotMarker({size=8}:{size?:number}){return <span className="dz-dot-marker" style={{width:size,height:size}} aria-hidden="true"/>}
export function FieldGlyph({size=14}:{size?:number}){return <svg className="dz-field-glyph" width={size} height={size} viewBox="0 0 18 18" aria-hidden="true"><rect x="3" y="2" width="12" height="14" rx="5"/></svg>}
export function SystemGlyph({size=18}:{size?:number}){return <svg className="dz-system-glyph" width={size} height={size} viewBox="0 0 24 18" aria-hidden="true"><path d="M8 3 3 9l5 6M16 3l5 6-5 6"/><path className="dz-system-glyph__slash" d="m14.5 2-5 14"/></svg>}
