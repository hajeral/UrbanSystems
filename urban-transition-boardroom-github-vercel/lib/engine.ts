
import { phases } from "./data";
import { GroupState, MetricKey, Metrics, Option, Risk } from "./types";

const clamp=(n:number)=>Math.max(0,Math.min(100,Math.round(n)));
const base:Metrics={climate:45,circularity:35,equity:45,governance:45,integration:35,finance:60,operations:40,trust:50};

export function newGroup(id:1|2|3):GroupState{
 return {id,name:`Group ${id}`,role:"Executive Steering Committee",current:0,completed:false,budget:100,schedule:0,metrics:{...base},decisions:[],risks:[],issues:[]};
}
export function riskBand(score:number){return score>=20?"Critical":score>=12?"High":score>=6?"Moderate":"Low"}
export function applyDecision(state:GroupState,optionId:string,mitigationId:string,rationale:string):GroupState{
 const phase=phases[state.current];
 if(!phase) throw new Error("No active phase");
 const option=phase.options.find(x=>x.id===optionId);
 if(!option) throw new Error("Option not found");
 const mitigation=option.mitigations.find(x=>x.id===mitigationId);
 if(!mitigation) throw new Error("Mitigation not found");
 const metrics={...state.metrics};
 for(const [key,value] of Object.entries(option.effects)) metrics[key as MetricKey]=clamp(metrics[key as MetricKey]+(value??0));
 for(const [key,value] of Object.entries(mitigation.effects)) metrics[key as MetricKey]=clamp(metrics[key as MetricKey]+(value??0));
 const inherent=option.risk.likelihood*option.risk.impact;
 const reduction=Math.max(1,Math.round(Object.values(mitigation.effects).filter(v=>v>0).reduce((a,b)=>a+(b??0),0)/7));
 const residual=Math.max(1,inherent-reduction);
 const risk:Risk={id:`R-${state.id}-${state.current+1}`,phase:phase.title,category:option.risk.category,statement:option.risk.statement,
  inherent,residual,owner:option.risk.owner,mitigation:mitigation.title,status:residual<=5?"Controlled":"Open"};
 let next={...state,metrics,budget:Math.max(0,state.budget+option.budget-mitigation.cost),schedule:state.schedule+option.schedule+mitigation.time,
  decisions:[...state.decisions,{phaseId:phase.id,phaseTitle:phase.title,optionId:option.id,optionTitle:option.title,mitigationId:mitigation.id,mitigationTitle:mitigation.title,rationale}],
  risks:[...state.risks,risk],current:state.current+1};
 if(state.current===7) next=triggerEvent(next);
 next.completed=next.current>=phases.length;
 return next;
}
function triggerEvent(state:GroupState):GroupState{
 const tags=state.decisions.map(d=>phases.find(p=>p.id===d.phaseId)?.options.find(o=>o.id===d.optionId)?.tags??[]).flat();
 let event="Extreme heat emergency and cloud-service interruption";
 let title="Heat-response analytics unavailable during peak demand";
 if(tags.includes("vendor-dependency")) title="Vendor cloud outage exposes continuity and data-control dependency";
 else if(tags.includes("standalone")) title="Standalone twin cannot support live emergency coordination";
 else if(tags.includes("high-integration")) title="Live integration is isolated after suspicious telemetry";
 return {...state,event,issues:[...state.issues,{id:`I-${state.id}-1`,title,source:event,response:"The final board phase must establish immediate action, degraded operation and an assurance response."}]};
}
export function gateStatus(state:GroupState,index:number){
 if(index>state.current) return "Upcoming";
 const related=state.risks[index-1];
 if(related && related.residual>=12) return "Conditional";
 return "Passed";
}
export function outcome(state:GroupState){
 const avg=Object.values(state.metrics).reduce((a,b)=>a+b,0)/8;
 const tags=state.decisions.map(d=>phases.find(p=>p.id===d.phaseId)?.options.find(o=>o.id===d.optionId)?.tags??[]).flat();
 let classification="Phased, Evidence-Led and Scalable";
 if(tags.includes("stop")) classification="Disciplined Reset with Recoverable Public Value";
 else if(state.metrics.governance<40) classification="Data-Rich but Governance-Poor";
 else if(tags.filter(t=>t==="vendor-dependency").length>=2) classification="Technically Advanced but Vendor-Dependent";
 else if(state.metrics.operations<40) classification="Strong Geospatial Foundation, Weak Operational Adoption";
 else if(state.metrics.climate<45) classification="Visual Twin with Limited Climate Impact";
 else if(state.metrics.integration>75&&state.metrics.governance<55) classification="Over-Integrated and Operationally Fragile";
 else if(state.metrics.climate>=65&&state.metrics.equity>=60&&state.metrics.governance>=60) classification="Decision-Integrated Urban Sustainability Programme";
 let recommendation=avg>=65?"Proceed to governed scale":avg>=52?"Proceed with mandatory conditions":"Redesign before further investment";
 const strengths=Object.entries(state.metrics).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([k])=>k);
 const watch=Object.entries(state.metrics).sort((a,b)=>a[1]-b[1]).slice(0,2).map(([k])=>k);
 return {classification,recommendation,average:Math.round(avg),strengths,watch};
}
export function optionFor(state:GroupState,phaseIndex:number):Option|undefined{
 const d=state.decisions[phaseIndex]; if(!d)return undefined;
 return phases[phaseIndex]?.options.find(o=>o.id===d.optionId);
}
