export interface OracleRequest {
  businessName: string;
  industry: string;
  currentStatus: string;
  biggestGap: string;
  targetAspiration: string;
}

export interface OracleResponse {
  authorityScore: number;
  diagnosisTitle: string;
  narrativeIntroduction: string;
  coreGaps: string[];
  transformationStrategy: string;
  proposedConcept: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface ParadoxStat {
  metric: string;
  fact: string;
  consequence: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  duration: string;
  description: string;
  concept: string;
}
