export interface ReportModel {
  id: number;
  localite: string;
  structure: string;
  text: string;
  repere: string;
  created_at: string;
  nip: string;
  region: string;
  province: string;
  commune: string;
  agent_code: string;
  has_audio: boolean;
  photos: string[];
}
