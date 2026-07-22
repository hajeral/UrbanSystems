
import { describe, expect, test } from "vitest";
import { phases } from "../lib/data";
import { applyDecision, gateStatus, newGroup, outcome, riskBand } from "../lib/engine";

function run(optionIndex=0, mitigationIndex=0){
 let s=newGroup(1);
 for(const phase of phases){
  const option=phase.options[optionIndex % phase.options.length];
  const mitigation=option.mitigations[mitigationIndex % option.mitigations.length];
  s=applyDecision(s,option.id,mitigation.id,"A defensible board rationale");
 }
 return s;
}
describe("urban transition rules engine",()=>{
 test("all configured phases execute and complete",()=>{const s=run();expect(s.completed).toBe(true);expect(s.decisions).toHaveLength(phases.length);expect(s.risks).toHaveLength(phases.length)});
 test("every option and mitigation is executable",()=>{for(let pi=0;pi<phases.length;pi++)for(const option of phases[pi].options)for(const mitigation of option.mitigations){let s=newGroup(1);s={...s,current:pi};expect(()=>applyDecision(s,option.id,mitigation.id,"Board rationale")).not.toThrow()}});
 test("risk bands are deterministic",()=>{expect(riskBand(4)).toBe("Low");expect(riskBand(8)).toBe("Moderate");expect(riskBand(16)).toBe("High");expect(riskBand(25)).toBe("Critical")});
 test("stress event is conditioned by earlier choices",()=>{let s=newGroup(1);for(let i=0;i<8;i++){const phase=phases[i];const option=phase.options.find(o=>o.tags.includes("vendor-dependency"))??phase.options[0];s=applyDecision(s,option.id,option.mitigations[0].id,"Board rationale")}expect(s.event).toContain("cloud-service");expect(s.issues.length).toBe(1)});
 test("gate reflects residual risk",()=>{let s=newGroup(1);const o=phases[0].options[0];s=applyDecision(s,o.id,o.mitigations[1].id,"Board rationale");expect(["Conditional","Passed"]).toContain(gateStatus(s,1))});
 test("final outcome always returns a classification and recommendation",()=>{const x=outcome(run(1,0));expect(x.classification.length).toBeGreaterThan(5);expect(x.recommendation.length).toBeGreaterThan(5)});
});
