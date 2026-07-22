
import { Mitigation, Option, Phase, RiskTemplate } from "./types";

const m = (id:string,title:string,description:string,cost:number,time:number,effects:Mitigation["effects"]):Mitigation =>
  ({id,title,description,cost,time,effects});
const r = (category:string,statement:string,likelihood:number,impact:number,owner:string):RiskTemplate =>
  ({category,statement,likelihood,impact,owner});
const o = (
  id:string,title:string,position:string,benefit:string,consequence:string,
  effects:Option["effects"],budget:number,schedule:number,tags:string[],
  risk:RiskTemplate,mitigations:Mitigation[]
):Option => ({id,title,position,benefit,consequence,effects,budget,schedule,tags,risk,mitigations});

export const phases:Phase[] = [
{
 id:"diagnose",number:1,title:"Read the city before buying the platform",
 boardMoment:"Day 1 · Mayoral mandate",
 context:"Meridian City has fragmented GIS, incomplete asset records, heat and flood pressures, and a public promise to launch a digital twin within twelve months. Departments disagree about the baseline and the problem the programme should solve.",
 decisionPrompt:"What mandate will the steering committee approve for the first 90 days?",
 unitLinks:["Urban metabolism","Baseline discipline","Eight-layer ecosystem diagnostic","So what? Now what? Says who?"],
 gate:"Problem and evidence readiness",
 evidence:[
  {type:"Briefing",title:"Mayoral mandate",summary:"Deliver a visible urban intelligence programme before the next budget cycle.",confidence:"High"},
  {type:"Data audit",title:"City information landscape",summary:"Only 61% of priority assets have reliable coordinates; ownership is fragmented.",confidence:"Medium"},
  {type:"Climate note",title:"Heat and flood exposure",summary:"Three vulnerable districts show overlapping heat, drainage and social-risk indicators.",confidence:"Medium"}
 ],
 options:[
  o("rapid-model","Launch a rapid 3D city model","Meet the political deadline by commissioning a citywide visual model immediately.","Fast visibility and a clear public narrative.","The model may become an expensive visualisation without decision-grade baselines.",{trust:8,integration:3,governance:-5,finance:-4},-12,0,["observation","rapid"],r("Strategic","Because the programme starts with a predetermined solution, there is a risk that the digital twin does not address the city’s highest-value sustainability decisions.",4,4,"Programme Sponsor"),[
   m("assurance","Independent baseline assurance","Commission an external baseline and use-case review in parallel.",5,14,{governance:7,climate:4}),
   m("accept","Accept and monitor","Proceed and record the assumption for later review.",0,0,{trust:-2})
  ]),
  o("system-diagnosis","Run a whole-system diagnostic","Map energy, water, materials, mobility, buildings, data and vulnerable communities before defining the platform.","Creates a defensible problem statement and reveals cross-system dependencies.","Slower early progress and possible political frustration.",{governance:10,climate:7,equity:6,integration:5,trust:2},-7,14,["evidence-led","systems"],r("Political","Because diagnosis delays visible delivery, there is a risk that sponsorship or funding confidence weakens.",3,3,"Programme Sponsor"),[
   m("90-day-charter","Publish a 90-day evidence charter","Use fixed milestones, public evidence criteria and weekly sponsor updates.",2,3,{trust:5,governance:4}),
   m("prototype","Pair diagnosis with a limited demonstrator","Create a non-operational demonstrator using existing data.",4,7,{trust:4,finance:-2})
  ]),
  o("priority-district","Diagnose one priority district","Focus the baseline on the three overlapping heat, flood and equity hotspots.","Balances evidence quality with speed and creates a testable local context.","May create a fragmented platform and miss citywide dependencies.",{climate:6,equity:8,finance:4,trust:4,integration:-2},-5,7,["focused","equity"],r("Integration","Because the programme begins in one district, there is a risk that data models and workflows do not scale citywide.",3,4,"CIO/CTO"),[
   m("city-schema","Define citywide standards first","Approve a common urban data model and API principles before scanning.",3,7,{integration:8,governance:3}),
   m("scale-test","Add explicit scalability tests","Include cross-district transfer tests in the pilot.",2,5,{integration:5,finance:-1})
  ])
 ]
},
{
 id:"outcomes",number:2,title:"Define outcomes, SDGs and the equity contract",
 boardMoment:"Month 3 · Strategy workshop",
 context:"The diagnostic identifies several valid use cases: heat resilience, building retrofit targeting, flood planning, circular construction and asset maintenance. Funding is insufficient to optimise all of them at once.",
 decisionPrompt:"Which outcome architecture will govern the programme?",
 unitLinks:["Policy–Technology–Impact","SDG causal chain","Balanced KPI taxonomy","Equity stress test"],
 gate:"Strategic outcome approval",
 evidence:[
  {type:"Map",title:"Vulnerability overlay",summary:"Heat exposure, low income and poor tree canopy overlap in the eastern districts.",confidence:"High"},
  {type:"Finance",title:"Capital envelope",summary:"The approved envelope supports one anchor use case and two secondary capabilities.",confidence:"High"},
  {type:"Workshop",title:"Department priorities",summary:"Planning wants development scenarios; operations wants asset condition; sustainability wants measurable climate outcomes.",confidence:"Medium"}
 ],
 options:[
  o("climate-anchor","Anchor on heat and retrofit outcomes","Use geospatial and 3D data to target cooling, shade, retrofit and solar interventions.","Clear climate and equity outcomes with measurable physical actions.","Asset-management and planning benefits may be delayed.",{climate:12,equity:8,trust:4,operations:-2},-10,5,["action","climate"],r("Organisational","Because the programme privileges climate outcomes, there is a risk that operational departments disengage.",3,3,"Chief Sustainability Officer"),[
   m("co-owned-kpis","Create co-owned KPI cascade","Give operations and planning named KPI ownership and secondary use cases.",3,5,{governance:6,operations:5}),
   m("engagement","Run departmental design sprints","Co-design workflows with internal users.",2,7,{trust:3,operations:4})
  ]),
  o("asset-anchor","Anchor on asset-management efficiency","Prioritise condition, maintenance and capital-planning workflows.","Strong operational adoption and a clear financial case.","Climate and equity benefits may remain indirect or unproven.",{operations:11,finance:8,integration:5,climate:-4,equity:-3},-8,4,["operations","observation"],r("Impact","Because the programme focuses on operational efficiency, there is a risk that it cannot demonstrate material sustainability outcomes.",4,4,"Chief Sustainability Officer"),[
   m("impact-contract","Add climate outcome obligations","Require each asset workflow to link to emissions, resilience or circularity outcomes.",3,6,{climate:8,equity:3}),
   m("carbon-price","Apply a shadow carbon price","Use lifecycle carbon in capital prioritisation.",1,3,{climate:5,finance:-1})
  ]),
  o("portfolio","Adopt a phased outcome portfolio","Select heat resilience as the anchor, with asset and circular-construction modules designed for later phases.","Balances strategic value and future adaptability.","Creates governance and scope complexity.",{climate:8,circularity:7,integration:7,governance:-2,finance:-5},-14,10,["portfolio","integrated"],r("Programme","Because the portfolio contains multiple outcomes, there is a risk of diluted accountability and uncontrolled scope.",4,4,"Programme Director"),[
   m("benefits-map","Approve a benefits dependency map","Assign one owner, baseline and decision workflow to every claimed benefit.",3,6,{governance:8,finance:3}),
   m("phase-cap","Set hard phase caps","No secondary module proceeds without passing its own evidence gate.",1,2,{finance:6,governance:4})
  ])
 ]
},
{
 id:"circularity",number:3,title:"Design circularity into the digital twin",
 boardMoment:"Month 5 · Design authority",
 context:"The city plans major retrofits and redevelopment. The twin could store material inventories and support reuse, but this requires additional data standards, supplier participation and long-term stewardship.",
 decisionPrompt:"How deeply should circularity be embedded?",
 unitLinks:["Urban metabolism","Waste hierarchy","Material passports","Lifecycle impact"],
 gate:"Whole-system design approval",
 evidence:[
  {type:"Material flow",title:"Construction waste profile",summary:"Construction and demolition account for 41% of the city’s solid-waste mass.",confidence:"Medium"},
  {type:"Market note",title:"Local reuse capacity",summary:"Several SMEs can recover materials, but demand and quality assurance are inconsistent.",confidence:"Low"},
  {type:"Standards",title:"Asset information requirements",summary:"Current BIM contracts do not require reusable material data at handover.",confidence:"High"}
 ],
 options:[
  o("visual-circular","Map waste and demolition hotspots","Use the twin to visualise material flows and priority sites.","Low-cost evidence base and quick insight.","Observation may not change procurement or recovery behaviour.",{circularity:5,finance:4,trust:2},-5,3,["observation"],r("Benefits","Because circularity is limited to mapping, there is a risk that no physical material loops are created.",4,3,"Circular Economy Lead"),[
   m("policy-link","Link maps to demolition permits","Require recovery plans for high-value sites identified by the platform.",3,8,{circularity:8,governance:5}),
   m("market-pilot","Launch a reuse marketplace pilot","Connect selected projects to local recovery firms.",4,10,{circularity:7,equity:3})
  ]),
  o("material-passports","Require material passports","Create structured records for new public assets and major retrofits.","Supports reuse, maintenance and lifecycle accountability.","Higher data burden and supplier resistance.",{circularity:12,operations:4,governance:4,finance:-5},-11,12,["action","circular"],r("Supplier","Because material passports change contract requirements, there is a risk of higher bids and inconsistent data quality.",3,4,"Procurement Director"),[
   m("minimum-schema","Start with a minimum viable schema","Mandate only decision-relevant fields and phase in detail.",2,4,{finance:5,integration:4}),
   m("supplier-training","Fund supplier onboarding","Train local firms and provide validation tools.",4,7,{equity:4,operations:5})
  ]),
  o("circular-platform","Build a city materials exchange module","Integrate planned demolition, available materials, demand and procurement workflows.","Highest potential for closed loops and local economic value.","Complex governance, uncertain market uptake and integration cost.",{circularity:15,equity:6,integration:5,finance:-9,governance:-3},-18,18,["integrated","circular","action"],r("Market","Because the platform depends on active buyers and sellers, there is a risk of low utilisation and stranded operating cost.",4,4,"Circular Economy Lead"),[
   m("anchor-demand","Guarantee anchor demand","Commit selected public projects to purchase qualified recovered materials.",6,8,{circularity:8,trust:4}),
   m("stage-market","Stage the marketplace","Pilot two material categories before expanding.",2,10,{finance:6,operations:3})
  ])
 ]
},
{
 id:"scalec",number:4,title:"Apply SCALEC before selecting the solution",
 boardMoment:"Month 7 · Technology evaluation",
 context:"Three proposals have arrived: a proprietary full-stack twin, an open modular geospatial platform, and a targeted district twin. Vendor demonstrations are impressive, but evidence quality varies.",
 decisionPrompt:"Which delivery architecture will the city select?",
 unitLinks:["SCALEC","Evidence over marketing","Action versus observation","Technology–Policy–People"],
 gate:"Technology selection approval",
 evidence:[
  {type:"Vendor bid",title:"Full-stack platform",summary:"Fast deployment, polished interface, bundled scanning and hosting; proprietary data model.",confidence:"Medium"},
  {type:"Technical bid",title:"Open modular platform",summary:"Open APIs and standards; greater city integration effort and skills requirement.",confidence:"Medium"},
  {type:"Pilot bid",title:"Targeted district twin",summary:"Clear heat and retrofit use case; limited citywide capability.",confidence:"High"}
 ],
 options:[
  o("proprietary","Select the proprietary full-stack twin","Buy a managed end-to-end package with citywide scanning, cloud hosting and analytics.","Fast mobilisation and clear vendor accountability.","Lifecycle cost, data sovereignty and exit risk increase.",{integration:4,operations:7,trust:5,finance:-8,governance:-5},-22,2,["proprietary","vendor-dependency","rapid"],r("Commercial","Because the city depends on a proprietary platform, there is a risk of vendor lock-in, escalating licence costs and constrained data reuse.",4,5,"CIO/CTO"),[
   m("exit-clauses","Negotiate exit and portability clauses","Mandate open exports, transition assistance, price controls and escrowed documentation.",5,9,{governance:8,finance:5,integration:4}),
   m("dual-control","Retain city data control","Host the authoritative data layer under city governance.",7,12,{governance:10,integration:5})
  ]),
  o("open-modular","Select an open modular platform","Use open standards, city-owned data and multiple specialist suppliers.","Strong adaptability, sovereignty and future interoperability.","Requires internal architecture capacity and clearer accountability.",{integration:12,governance:9,finance:3,operations:-5},-18,14,["open","integrated"],r("Capability","Because the city must orchestrate multiple components, there is a risk of integration delay and fragmented accountability.",4,4,"CIO/CTO"),[
   m("integration-office","Create a city integration office","Fund architecture, product ownership and supplier coordination.",7,8,{operations:9,governance:7}),
   m("prime-integrator","Appoint a neutral integrator","Use outcome-based integration milestones and independent assurance.",6,6,{operations:7,integration:5,finance:-2})
  ]),
  o("targeted-twin","Select a targeted district twin","Buy only the capabilities needed for heat, retrofit and planning decisions in priority districts.","Clear use case, lower cost and stronger evaluation design.","May create duplication and migration cost when scaled.",{climate:9,equity:7,finance:9,operations:4,integration:-4},-11,7,["focused","pilot"],r("Scalability","Because the solution is tailored to one use case and district, there is a risk that it cannot scale without rework.",3,4,"Programme Director"),[
   m("open-foundation","Mandate open foundations","Require open formats, APIs and a transferable urban data model.",3,5,{integration:8,governance:4}),
   m("scale-architecture","Approve a scale architecture now","Define future interfaces and non-functional requirements before pilot build.",4,7,{integration:7,finance:-1})
  ])
 ]
},
{
 id:"governance",number:5,title:"Build governance that can survive change",
 boardMoment:"Month 8 · Programme mobilisation",
 context:"The mayor wants direct oversight, the CIO wants architectural authority, operations wants service continuity, and the vendor wants rapid design decisions. A leadership transition is possible next year.",
 decisionPrompt:"Which governance model will control decisions, data and escalation?",
 unitLinks:["Three governance levels","RACI","Decision rights","Leadership transition"],
 gate:"Governance and accountability approval",
 evidence:[
  {type:"Organisation",title:"Current decision map",summary:"No single body owns cross-departmental urban data or sustainability benefits.",confidence:"High"},
  {type:"Legal",title:"Data authority note",summary:"Departments retain statutory accountability for operational systems.",confidence:"High"},
  {type:"Political",title:"Election calendar",summary:"A change in executive leadership is plausible within fourteen months.",confidence:"Medium"}
 ],
 options:[
  o("sponsor-led","Use sponsor-led governance","Centralise major decisions with the mayoral sponsor and a small programme office.","Fast decisions and clear political accountability.","Programme continuity and technical challenge may be weak.",{trust:7,governance:2,operations:-4},-5,0,["centralised"],r("Governance","Because authority is concentrated in one sponsor, there is a risk that leadership transition destabilises the programme.",4,4,"Programme Sponsor"),[
   m("chartered-board","Create a chartered oversight board","Define cross-party mandate, delegated rights and documented gate criteria.",3,5,{governance:10,trust:3}),
   m("succession-plan","Approve a transition protocol","Require decision logs, deputy authority and sponsor handover.",2,3,{governance:7})
  ]),
  o("three-tier","Use three-tier adaptive governance","Create strategic oversight, programme coordination and technical working groups with explicit RACI and escalation.","Balances accountability, expertise and adaptation.","More meetings and slower routine decisions.",{governance:13,operations:7,integration:5,finance:-3},-8,5,["adaptive","integrated"],r("Delivery","Because governance has multiple levels, there is a risk of slow decisions and duplicated review.",3,3,"Programme Director"),[
   m("decision-sla","Set decision service levels","Define what each level decides and maximum escalation times.",1,2,{operations:6,governance:4}),
   m("single-secretariat","Use one programme secretariat","Maintain one decision, risk and benefits record.",2,2,{governance:5,finance:2})
  ]),
  o("vendor-led","Delegate delivery governance to the prime vendor","Use the vendor’s programme method, architecture board and reporting tools.","Rapid mobilisation and reduced city coordination burden.","Public accountability, challenge and data control may weaken.",{operations:8,finance:3,governance:-10,integration:-2},-4,-2,["vendor-dependency"],r("Accountability","Because the supplier controls delivery governance and evidence, there is a risk that city interests and independent assurance are weakened.",5,4,"Programme Sponsor"),[
   m("independent-assurance","Add independent assurance","Appoint a city-side assurance and data-governance function.",6,7,{governance:10,trust:4}),
   m("reserved-matters","Define reserved city matters","Retain approval of architecture, data, safety, benefits and scale decisions.",3,4,{governance:8,integration:3})
  ])
 ]
},
{
 id:"procurement",number:6,title:"Procure total value, not a demonstration",
 boardMoment:"Month 10 · Investment committee",
 context:"The lowest bid excludes annual rescanning, model maintenance, cloud egress, cyber operations, training and end-of-contract transition. The CFO asks for a ten-year recommendation.",
 decisionPrompt:"Which commercial model will the city approve?",
 unitLinks:["Total cost of ownership","Day 2 operations cliff","Outcome procurement","Risk allocation"],
 gate:"Investment and procurement approval",
 evidence:[
  {type:"Cost model",title:"Ten-year forecast",summary:"Operating and refresh costs could exceed the initial capital purchase by 1.8 times.",confidence:"Medium"},
  {type:"Procurement",title:"Bid comparison",summary:"The lowest capital bid excludes six essential operating capabilities.",confidence:"High"},
  {type:"Carbon",title:"Lifecycle note",summary:"Scanning, cloud compute and hardware refresh have material but manageable lifecycle impacts.",confidence:"Medium"}
 ],
 options:[
  o("lowest-capex","Award the lowest capital-cost bid","Meet the approved capital envelope and launch quickly.","Protects immediate budget and procurement timetable.","Creates a high probability of Day 2 cost escalation and capability gaps.",{finance:8,trust:3,operations:-10,governance:-4},-14,0,["lowest-cost"],r("Financial","Because operating, refresh and exit costs are excluded, there is a risk of an unaffordable Day 2 service.",5,5,"Chief Financial Officer"),[
   m("operations-reserve","Create an operations reserve","Ring-fence three years of service, training and data-refresh funding.",8,2,{operations:9,finance:3}),
   m("reopen-costs","Reopen lifecycle pricing","Require transparent ten-year pricing before award.",2,10,{finance:8,governance:5})
  ]),
  o("total-value","Use total-value procurement","Evaluate lifecycle cost, climate value, equity, interoperability, skills transfer and exit.","Creates a defensible long-term investment decision.","Slower procurement and potentially higher initial price.",{finance:10,operations:10,governance:7,climate:4},-20,10,["lifecycle","value"],r("Schedule","Because the evaluation is broader and evidence-heavy, there is a risk of procurement delay and challenge.",3,3,"Procurement Director"),[
   m("published-method","Publish the evaluation method","Use pre-weighted SCALEC criteria and auditable evidence rules.",2,3,{trust:5,governance:5}),
   m("competitive-dialogue","Use structured dialogue","Clarify outcomes and lifecycle assumptions with all bidders equally.",3,6,{finance:4,operations:4})
  ]),
  o("performance-contract","Use a phased performance-based contract","Pay for verified decision workflows and outcomes, with gates for scanning, twin capability, adoption and scale.","Aligns supplier incentives with public value and learning.","Outcome attribution and contract management are demanding.",{climate:7,operations:7,finance:5,governance:5},-18,12,["adaptive","outcomes"],r("Commercial","Because payment depends on outcomes, there is a risk of disputes over baselines, attribution and evidence.",4,4,"Procurement Director"),[
   m("measurement-protocol","Agree the measurement protocol first","Define baselines, counterfactuals, data rights and independent verification.",4,7,{governance:8,trust:5}),
   m("shared-risk","Use balanced risk allocation","Assign each risk to the party best able to manage it.",2,4,{finance:5,operations:4})
  ])
 ]
},
{
 id:"integration",number:7,title:"Choose the right system-integration level",
 boardMoment:"Month 14 · Architecture review",
 context:"The city already operates GIS, BIM, planning, asset-management, traffic, IoT and legacy SCADA systems. The vendor proposes real-time system-of-systems integration; operators warn that capability and cyber maturity are limited.",
 decisionPrompt:"What integration maturity should the programme target now?",
 unitLinks:["Brownfield city","IT/OT convergence","Open APIs","System-of-systems risk"],
 gate:"Architecture and integration approval",
 evidence:[
  {type:"Architecture",title:"Legacy landscape",summary:"Fourteen priority systems use nine data models and five supplier-controlled interfaces.",confidence:"High"},
  {type:"Cyber",title:"Maturity review",summary:"Identity, segmentation and incident response are uneven across operational departments.",confidence:"High"},
  {type:"Operations",title:"Workflow analysis",summary:"Three high-value decisions can be improved with daily rather than real-time data.",confidence:"Medium"}
 ],
 options:[
  o("standalone","Deploy a standalone analytical twin","Keep the platform separate and exchange approved datasets manually.","Lower cyber exposure and faster controlled deployment.","Creates silos, duplicate work and limited operational value.",{operations:3,finance:6,integration:-10,governance:3},-8,2,["standalone","observation"],r("Integration","Because the twin remains standalone, there is a risk that insights are not embedded in city workflows.",4,4,"CIO/CTO"),[
   m("workflow-owners","Assign workflow owners","Require named departments to use twin outputs in three formal decisions.",2,4,{operations:7,climate:3}),
   m("api-roadmap","Approve an API roadmap","Design phased interfaces without connecting critical operations yet.",3,6,{integration:7})
  ]),
  o("federated","Build a federated data-connected twin","Connect priority systems through open APIs and a governed city data layer, without automated control.","Balances interoperability, sovereignty and manageable risk.","Requires sustained data stewardship and interface work.",{integration:13,governance:8,operations:7,finance:-4},-16,12,["federated","open"],r("Data","Because multiple systems contribute data, there is a risk of inconsistent semantics, quality and ownership.",4,4,"Chief Data Officer"),[
   m("data-products","Create governed data products","Assign owners, quality rules, lineage and service levels to priority datasets.",5,8,{governance:9,integration:7}),
   m("common-model","Adopt a common urban model","Use standards-based identifiers and semantics.",4,10,{integration:10,operations:3})
  ]),
  o("operational","Build an operational system-of-systems twin","Connect live systems and allow the twin to coordinate selected operational actions.","Highest optimisation and emergency-response potential.","Creates cascading-failure, cyber, safety and accountability risks.",{integration:16,operations:12,climate:6,governance:-8,finance:-8},-25,18,["operational","high-integration"],r("Cyber-physical","Because the twin influences live operations, there is a risk that a cyber or data failure causes physical service disruption.",5,5,"Chief Information Security Officer"),[
   m("segmented-control","Use segmented fail-safe architecture","Keep safety control local, use edge operation and restrict twin authority.",8,12,{governance:8,operations:8,integration:-2}),
   m("independent-safety","Require independent safety assurance","Test failure modes, manual override and degraded operation before connection.",7,15,{operations:10,trust:5})
  ])
 ]
},
{
 id:"data",number:8,title:"Govern data as public infrastructure",
 boardMoment:"Month 15 · Data and security committee",
 context:"Laser scans reveal private properties and sensitive infrastructure. The cloud vendor requests broad reuse rights for model training. Departments disagree about open data, retention and operational sensitivity.",
 decisionPrompt:"Which data-governance settlement will the city approve?",
 unitLinks:["Data sovereignty","Privacy by design","Open verification","Cyber-physical resilience"],
 gate:"Data, privacy and security approval",
 evidence:[
  {type:"Privacy",title:"Impact assessment",summary:"Detailed 3D data can expose private spaces, security-sensitive assets and behavioural patterns.",confidence:"High"},
  {type:"Contract",title:"Vendor data clause",summary:"The draft grants the supplier broad rights to derive and reuse platform data.",confidence:"High"},
  {type:"Open data",title:"Public-value assessment",summary:"Planning and climate layers could support research, verification and local innovation.",confidence:"Medium"}
 ],
 options:[
  o("vendor-cloud","Accept the vendor’s managed-data model","Allow broad vendor hosting and derived-data rights in exchange for lower operating cost.","Reduces city staffing and accelerates analytics.","Weakens sovereignty, bargaining power and public trust.",{finance:7,operations:6,governance:-12,trust:-8},-6,0,["vendor-dependency","cloud"],r("Data sovereignty","Because the supplier controls hosting and derived data, there is a risk that the city loses practical control of public infrastructure information.",5,5,"Chief Data Officer"),[
   m("contract-limits","Limit reuse and mandate portability","Restrict purpose, prohibit unapproved model training and require full export.",4,6,{governance:10,trust:5}),
   m("city-key","Retain city encryption control","Use city-controlled keys and access auditing.",5,8,{governance:8,operations:3})
  ]),
  o("city-sovereignty","Adopt city-owned authoritative data","The city controls core data, identities, retention, access and open-data classification.","Strong sovereignty, accountability and long-term flexibility.","Requires skilled stewardship and operating budget.",{governance:14,trust:9,integration:5,finance:-6},-14,10,["sovereign","open"],r("Capability","Because the city assumes stewardship, there is a risk of weak data quality and underfunded governance.",3,4,"Chief Data Officer"),[
   m("data-utility","Fund a city data utility function","Establish permanent ownership, quality, privacy and access roles.",7,8,{operations:8,governance:6}),
   m("tiered-open","Use tiered openness","Publish verification-friendly layers while protecting sensitive detail.",2,4,{trust:7,governance:4})
  ]),
  o("hybrid-trust","Use a hybrid trusted-data model","Keep authoritative and sensitive layers under city control while allowing governed cloud analytics.","Balances capability, openness and operational flexibility.","Boundary management and accountability are more complex.",{governance:9,operations:8,integration:7,finance:-3},-12,8,["hybrid","sovereign"],r("Accountability","Because responsibilities are split, there is a risk of gaps in incident response, retention and access control.",4,4,"Chief Data Officer"),[
   m("control-matrix","Approve a control matrix","Map every dataset to owner, processor, purpose, location, retention and incident duty.",3,5,{governance:9,operations:5}),
   m("joint-exercises","Run joint incident exercises","Test city and vendor responsibilities before launch.",4,7,{operations:7,trust:3})
  ])
 ]
},
{
 id:"pilot",number:9,title:"Pilot to learn, not merely to launch",
 boardMoment:"Month 18 · Pilot review",
 context:"The priority-district twin is technically operational. The 3D model is accurate, but planners use it inconsistently, retrofit decisions have not yet changed, and residents question whether benefits will reach them.",
 decisionPrompt:"What decision will the board make at the pilot gate?",
 unitLinks:["PDCA","Pilot before scale","KPI cascade","Technical outputs versus outcomes"],
 gate:"Pilot acceptance and scale decision",
 evidence:[
  {type:"Technical",title:"Pilot performance",summary:"Platform availability is 99.2%; model accuracy meets specification.",confidence:"High"},
  {type:"Outcome",title:"Benefits review",summary:"Two planning workflows improved, but no verified emissions or heat outcome is yet attributable.",confidence:"Medium"},
  {type:"Community",title:"Resident panel",summary:"Residents value transparency but see few visible interventions in vulnerable streets.",confidence:"Medium"}
 ],
 options:[
  o("scale-now","Scale citywide now","Use technical success and political momentum to begin full-city rollout.","Protects momentum and may reduce unit costs.","Scales unresolved adoption, outcome and equity weaknesses.",{trust:6,integration:5,finance:-10,equity:-7,climate:-3},-25,0,["scale","rapid"],r("Benefits","Because scale precedes verified outcomes, there is a risk of citywide investment in a technically successful but low-value platform.",5,5,"Programme Sponsor"),[
   m("conditional-scale","Use conditional scale","Release only two districts and require benefit thresholds before each tranche.",5,5,{finance:7,governance:7,climate:5}),
   m("adoption-team","Fund operational adoption","Embed planners, retrofit teams and community officers in workflow redesign.",7,8,{operations:10,equity:5})
  ]),
  o("adapt-pilot","Extend and redesign the pilot","Apply PDCA: refine workflows, add physical interventions and test equity outcomes.","Improves evidence and reduces scale risk.","Delays visible expansion and may increase pilot cost.",{climate:9,equity:8,operations:8,trust:2,finance:-4},-10,12,["adapt","evidence-led"],r("Political","Because the pilot is extended, there is a risk of sponsor fatigue and negative public framing.",3,3,"Programme Director"),[
   m("public-learning","Publish the learning review","Explain what worked, what failed and the criteria for scale.",2,3,{trust:7,governance:5}),
   m("quick-wins","Deliver two physical quick wins","Use the twin to implement shade and retrofit actions during the extension.",5,7,{climate:6,equity:5})
  ]),
  o("stop-reframe","Stop the platform scale and retain useful assets","Close the current delivery model, preserve data and rebuild around proven workflows.","Prevents sunk-cost escalation and demonstrates disciplined governance.","Creates political embarrassment and transition cost.",{finance:8,governance:8,trust:-5,operations:-4},-7,15,["stop","reset"],r("Reputation","Because the programme is stopped, there is a risk of public criticism and loss of future funding confidence.",4,3,"Programme Sponsor"),[
   m("value-recovery","Approve a value-recovery plan","Transfer data, models, licences and lessons into existing city systems.",3,7,{finance:6,integration:5}),
   m("independent-review","Commission an independent review","Use transparent findings to support a redesigned investment case.",4,10,{trust:7,governance:6})
  ])
 ]
},
{
 id:"stress",number:10,title:"Govern the city under stress",
 boardMoment:"Month 24 · Extreme heat and cloud outage",
 context:"During a five-day heat emergency, the digital twin’s cloud analytics become unavailable. Cooling demand is peaking, two vulnerable districts report limited access to cooling centres, and the mayor demands an immediate recommendation.",
 decisionPrompt:"How will the steering committee respond and close the programme cycle?",
 unitLinks:["Safe degraded operation","Resilience under stress","Equity under emergency","Independent assurance"],
 gate:"Operational transition and assurance",
 evidence:[
  {type:"Incident",title:"Cloud outage",summary:"Core GIS remains available, but predictive heat analytics and automated dashboards are unavailable.",confidence:"High"},
  {type:"Operations",title:"Fallback capability",summary:"Manual maps exist; not all district teams were trained to use them.",confidence:"Medium"},
  {type:"Equity",title:"Emergency access",summary:"Cooling-centre capacity is lowest in the two most heat-vulnerable districts.",confidence:"High"}
 ],
 options:[
  o("wait-vendor","Wait for vendor restoration","Continue existing emergency operations and rely on the supplier’s four-hour recovery estimate.","Avoids untested manual changes during an incident.","May delay targeted action and expose cloud dependency.",{operations:-10,equity:-8,trust:-9,finance:2},0,0,["vendor-dependency","passive"],r("Resilience","Because the city waits for external restoration, there is a risk of delayed protection for vulnerable residents.",5,5,"Emergency Director"),[
   m("manual-priority","Activate manual priority maps","Use validated offline layers and deploy staff to vulnerable districts immediately.",3,0,{operations:9,equity:9,trust:5}),
   m("vendor-escalation","Use contractual escalation","Invoke emergency service levels and executive escalation.",1,0,{operations:4,governance:3})
  ]),
  o("degraded-mode","Activate safe degraded operation","Switch to offline and edge-supported workflows, prioritise vulnerable districts and log all manual decisions.","Protects service continuity, equity and accountability.","Reduced analytical precision and higher staff workload.",{operations:13,equity:12,governance:8,trust:8},-5,0,["resilient","action"],r("Operational","Because degraded mode uses simplified data, there is a risk of inconsistent local decisions.",3,4,"Emergency Director"),[
   m("decision-log","Use a common decision log","Record evidence, thresholds, owners and deviations across districts.",1,0,{governance:6,trust:3}),
   m("mutual-aid","Deploy trained mutual-aid teams","Move trained staff to districts with capability gaps.",3,0,{operations:7,equity:5})
  ]),
  o("central-command","Centralise all emergency decisions","Create a single control room using available data and suspend departmental autonomy.","Creates one visible command structure and rapid prioritisation.","Local knowledge and distributed resilience may be lost.",{governance:3,operations:5,trust:-4,equity:-3},-3,0,["centralised"],r("Governance","Because emergency decisions are centralised, there is a risk that local conditions and community knowledge are ignored.",4,4,"Programme Sponsor"),[
   m("local-liaisons","Embed district liaisons","Give local officers and community representatives a formal voice in the control room.",2,0,{equity:7,trust:6}),
   m("sunset-clause","Set a 24-hour sunset clause","Require review and restoration of normal decision rights.",0,0,{governance:6})
  ])
 ]
}
];

export const metricLabels:Record<string,string> = {
 climate:"Climate impact",circularity:"Circularity",equity:"Equity",
 governance:"Governance",integration:"Integration",finance:"Financial sustainability",
 operations:"Operational readiness",trust:"Public trust"
};
