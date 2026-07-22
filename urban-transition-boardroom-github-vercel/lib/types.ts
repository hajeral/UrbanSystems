
export type MetricKey =
  | "climate" | "circularity" | "equity" | "governance"
  | "integration" | "finance" | "operations" | "trust";

export type Metrics = Record<MetricKey, number>;
export type RiskStatus = "Open" | "Controlled" | "Accepted" | "Realised";

export interface Mitigation {
  id: string;
  title: string;
  description: string;
  cost: number;
  time: number;
  effects: Partial<Metrics>;
}

export interface RiskTemplate {
  category: string;
  statement: string;
  likelihood: number;
  impact: number;
  owner: string;
}

export interface Option {
  id: string;
  title: string;
  position: string;
  benefit: string;
  consequence: string;
  effects: Partial<Metrics>;
  budget: number;
  schedule: number;
  tags: string[];
  risk: RiskTemplate;
  mitigations: Mitigation[];
}

export interface EvidenceItem {
  type: string;
  title: string;
  summary: string;
  confidence: "High" | "Medium" | "Low";
}

export interface Phase {
  id: string;
  number: number;
  title: string;
  boardMoment: string;
  context: string;
  decisionPrompt: string;
  unitLinks: string[];
  gate: string;
  evidence: EvidenceItem[];
  options: Option[];
}

export interface Risk {
  id: string;
  phase: string;
  category: string;
  statement: string;
  inherent: number;
  residual: number;
  owner: string;
  mitigation: string;
  status: RiskStatus;
}

export interface DecisionRecord {
  phaseId: string;
  phaseTitle: string;
  optionId: string;
  optionTitle: string;
  mitigationId: string;
  mitigationTitle: string;
  rationale: string;
}

export interface Issue {
  id: string;
  title: string;
  source: string;
  response: string;
}

export interface GroupState {
  id: 1 | 2 | 3;
  name: string;
  role: string;
  current: number;
  completed: boolean;
  budget: number;
  schedule: number;
  metrics: Metrics;
  decisions: DecisionRecord[];
  risks: Risk[];
  issues: Issue[];
  event?: string;
}
