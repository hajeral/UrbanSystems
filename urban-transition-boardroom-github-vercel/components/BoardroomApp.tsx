
"use client";
import { useEffect, useMemo, useState } from "react";
import { metricLabels, phases } from "@/lib/data";
import { applyDecision, gateStatus, newGroup, outcome, riskBand } from "@/lib/engine";
import { GroupState, MetricKey } from "@/lib/types";

const STORAGE="urban-transition-boardroom-v1";
type View="boardroom"|"evidence"|"risks"|"comparison";

export default function BoardroomApp(){
 const [groups,setGroups]=useState<GroupState[]>([newGroup(1),newGroup(2),newGroup(3)]);
 const [active,setActive]=useState(0);
 const [view,setView]=useState<View>("boardroom");
 const [selected,setSelected]=useState("");
 const [mitigation,setMitigation]=useState("");
 const [rationale,setRationale]=useState("");
 const [briefingOpen,setBriefingOpen]=useState(true);
 useEffect(()=>{const raw=localStorage.getItem(STORAGE);if(raw)try{setGroups(JSON.parse(raw))}catch{}},[]);
 useEffect(()=>{localStorage.setItem(STORAGE,JSON.stringify(groups))},[groups]);
 const group=groups[active];
 const phase=phases[group.current];
 const option=phase?.options.find(x=>x.id===selected);
 const progress=Math.round((group.current/phases.length)*100);
 function patch(p:Partial<GroupState>){setGroups(gs=>gs.map((g,i)=>i===active?{...g,...p}:g))}
 function commit(){
  if(!selected||!mitigation||rationale.trim().length<10)return;
  setGroups(gs=>gs.map((g,i)=>i===active?applyDecision(g,selected,mitigation,rationale.trim()):g));
  setSelected("");setMitigation("");setRationale("");setBriefingOpen(true);
 }
 function reset(){setGroups(gs=>gs.map((g,i)=>i===active?newGroup(g.id):g))}
 return <main>
  <header className="topbar">
   <div><p className="kicker">Meridian City 2035</p><h1>Urban Transition Boardroom</h1><p className="subtitle">Geospatial intelligence · laser scanning · digital twins · sustainable urban systems</p></div>
   <nav>{(["boardroom","evidence","risks","comparison"] as View[]).map(v=><button key={v} onClick={()=>setView(v)} className={view===v?"active":""}>{v==="boardroom"?"Situation Room":v==="evidence"?"Programme Record":v==="risks"?"Risk & Issues":"Facilitator"}</button>)}</nav>
  </header>
  <section className="group-strip">
   {groups.map((g,i)=><button key={g.id} onClick={()=>{setActive(i);setSelected("");setMitigation("");setRationale("")}} className={i===active?"group active":"group"}>
    <span className="group-index">0{g.id}</span><span><b>{g.name}</b><small>{g.completed?"Assurance complete":`Phase ${g.current+1} of ${phases.length}`}</small></span>
   </button>)}
   <div className="session-meta"><label>Committee name<input value={group.name} onChange={e=>patch({name:e.target.value})}/></label></div>
  </section>

  {view==="boardroom"&&!group.completed&&phase&&<div className="control-room">
   <aside className="left-rail">
    <div className="phase-card"><span>Programme timeline</span><b>{progress}%</b><div className="progress"><i style={{width:`${progress}%`}}/></div></div>
    <div className="timeline">{phases.map((p,i)=><div className={`timeline-item ${i===group.current?"current":i<group.current?"done":""}`} key={p.id}><em>{i+1}</em><span>{p.title}<small>{i<group.current?gateStatus(group,i+1):i===group.current?"In session":"Upcoming"}</small></span></div>)}</div>
   </aside>
   <section className="stage">
    <div className="board-moment"><span>{phase.boardMoment}</span><button onClick={()=>setBriefingOpen(x=>!x)}>{briefingOpen?"Hide briefing":"Show briefing"}</button></div>
    <p className="kicker">Phase {phase.number} · {phase.gate}</p>
    <h2>{phase.title}</h2>
    {briefingOpen&&<div className="briefing"><p>{phase.context}</p><div className="unit-tags">{phase.unitLinks.map(x=><span key={x}>{x}</span>)}</div></div>}
    <div className="decision-call"><span>Board decision required</span><h3>{phase.decisionPrompt}</h3></div>
    <div className="option-grid">{phase.options.map(x=><button key={x.id} onClick={()=>{setSelected(x.id);setMitigation("")}} className={selected===x.id?"option selected":"option"}>
      <span className="radio">{selected===x.id?"●":"○"}</span><div><b>{x.title}</b><p>{x.position}</p><small>{x.benefit}</small></div>
    </button>)}</div>
    {option&&<div className="decision-workbench">
      <div className="tradeoffs"><article><span>Immediate value</span><p>{option.benefit}</p></article><article><span>Delayed consequence</span><p>{option.consequence}</p></article></div>
      <div className="risk-preview"><span>Risk created · {option.risk.category}</span><p>{option.risk.statement}</p><b>Inherent exposure: {option.risk.likelihood*option.risk.impact} · {riskBand(option.risk.likelihood*option.risk.impact)}</b></div>
      <h3>Choose a management response</h3>
      <div className="mitigation-grid">{option.mitigations.map(x=><label key={x.id} className={mitigation===x.id?"selected":""}><input type="radio" checked={mitigation===x.id} onChange={()=>setMitigation(x.id)}/><span><b>{x.title}</b>{x.description}<small>Budget {x.cost} · Schedule +{x.time} days</small></span></label>)}</div>
      <label className="rationale">Board rationale<textarea value={rationale} onChange={e=>setRationale(e.target.value)} placeholder="Record why this trade-off is defensible. Minimum 10 characters."/></label>
      <button className="commit" disabled={!mitigation||rationale.trim().length<10} onClick={commit}>Record board decision and advance</button>
    </div>}
   </section>
   <aside className="right-rail">
    <div className="health-head"><span>Programme health</span><b>Live</b></div>
    {(Object.keys(group.metrics) as MetricKey[]).map(k=><div className="metric" key={k}><div><span>{metricLabels[k]}</span><b>{group.metrics[k]}</b></div><progress max="100" value={group.metrics[k]}/></div>)}
    <div className="mini-grid"><article><span>Budget capacity</span><b>{group.budget}</b></article><article><span>Schedule shift</span><b>+{group.schedule}d</b></article><article><span>Open risks</span><b>{group.risks.filter(r=>r.status==="Open").length}</b></article><article><span>Issues</span><b>{group.issues.length}</b></article></div>
    {group.event&&<div className="incident"><span>Live stress event</span><b>{group.event}</b></div>}
   </aside>
  </div>}

  {view==="boardroom"&&group.completed&&<Final group={group} reset={reset}/>}
  {view==="evidence"&&<ProgrammeRecord group={group}/>}
  {view==="risks"&&<RiskRegister group={group}/>}
  {view==="comparison"&&<Comparison groups={groups}/>}
 </main>
}

function ProgrammeRecord({group}:{group:GroupState}){
 return <section className="page-panel"><p className="kicker">{group.name}</p><h2>Programme decision and evidence record</h2>
  {phases.map((p,i)=><article className="record" key={p.id}><div className="record-no">{i+1}</div><div><span>{p.gate}</span><h3>{p.title}</h3>
   <div className="evidence-grid">{p.evidence.map(e=><div key={e.title}><small>{e.type} · Confidence {e.confidence}</small><b>{e.title}</b><p>{e.summary}</p></div>)}</div>
   {group.decisions[i]?<div className="decision-record"><b>Decision: {group.decisions[i].optionTitle}</b><span>Control: {group.decisions[i].mitigationTitle}</span><p>Rationale: {group.decisions[i].rationale}</p></div>:<p className="muted">No board decision recorded yet.</p>}
  </div></article>)}
 </section>
}
function RiskRegister({group}:{group:GroupState}){
 return <section className="page-panel"><p className="kicker">{group.name}</p><h2>Dynamic risk and issue register</h2>
  <div className="risk-summary"><article><span>Total risks</span><b>{group.risks.length}</b></article><article><span>High / critical residual</span><b>{group.risks.filter(r=>r.residual>=12).length}</b></article><article><span>Realised issues</span><b>{group.issues.length}</b></article></div>
  <div className="table-scroll"><table><thead><tr><th>ID</th><th>Phase</th><th>Risk statement</th><th>Category</th><th>Inherent</th><th>Control</th><th>Residual</th><th>Owner</th></tr></thead><tbody>
   {group.risks.map(r=><tr key={r.id}><td>{r.id}</td><td>{r.phase}</td><td>{r.statement}</td><td>{r.category}</td><td>{r.inherent}<small>{riskBand(r.inherent)}</small></td><td>{r.mitigation}</td><td>{r.residual}<small>{riskBand(r.residual)}</small></td><td>{r.owner}</td></tr>)}
  </tbody></table></div>
  <h3>Issue log</h3>{group.issues.length?group.issues.map(i=><article className="issue" key={i.id}><span>{i.source}</span><b>{i.title}</b><p>{i.response}</p></article>):<p className="muted">No risks have converted to issues.</p>}
 </section>
}
function Comparison({groups}:{groups:GroupState[]}){
 const metrics=Object.keys(groups[0].metrics) as MetricKey[];
 return <section className="page-panel"><p className="kicker">Facilitator control room</p><h2>Three-group strategy comparison</h2><p className="intro">Compare the distribution of public value, risk and readiness. This view deliberately avoids a single winner score.</p>
  <div className="comparison-cards">{groups.map(g=>{const x=outcome(g);return <article key={g.id}><span>{g.name}</span><h3>{x.classification}</h3><p>{x.recommendation}</p><div className="fingerprint">{metrics.map(k=><div key={k}><small>{metricLabels[k]}</small><b>{g.metrics[k]}</b></div>)}</div></article>})}</div>
  <div className="debrief"><h3>Facilitator debrief prompts</h3><p>Which committee diagnosed the city before selecting technology? Who converted observation into physical action? Which team protected data sovereignty and Day 2 operations? Where did integration ambition exceed governance capability? Who benefited, who carried the burden, and what would each board redesign?</p></div>
 </section>
}
function Final({group,reset}:{group:GroupState;reset:()=>void}){
 const x=outcome(group);
 return <section className="final-page"><p className="kicker">Independent urban transition assurance review</p><h2>{x.classification}</h2><p className="assurance">The committee has completed the full cycle from city-system diagnosis to technology selection, circular design, governance, procurement, brownfield integration, data stewardship, pilot learning and operational stress. The assessment reflects the accumulated decisions and residual risks rather than one quiz score.</p>
  <div className="final-grid"><article><span>Recommendation</span><b>{x.recommendation}</b></article><article><span>Programme health</span><b>{x.average}/100</b></article><article><span>Residual high risks</span><b>{group.risks.filter(r=>r.residual>=12).length}</b></article><article><span>Schedule movement</span><b>+{group.schedule} days</b></article></div>
  <div className="assurance-columns"><div><h3>Strongest dimensions</h3>{x.strengths.map(k=><p key={k}>{metricLabels[k]}</p>)}</div><div><h3>Assurance watchpoints</h3>{x.watch.map(k=><p key={k}>{metricLabels[k]}</p>)}</div></div>
  <h3>Board decision trail</h3><div className="history">{group.decisions.map((d,i)=><div key={d.phaseId}><span>{i+1}</span><p><b>{d.optionTitle}</b><small>{d.mitigationTitle}</small></p></div>)}</div>
  <button onClick={reset}>Reset this committee and replay</button>
 </section>
}
