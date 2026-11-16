export interface JobIdentity { jobId: string; projectId: string; revision: number; generation: number; }
export class ResultGate {
  private cancelled = new Set<string>();
  private completed = new Set<string>();
  constructor(public projectId: string, public revision: number, public generation = 0) {}
  cancel(jobId: string): void { this.cancelled.add(jobId); }
  switchProject(projectId: string, revision: number): void { this.projectId = projectId; this.revision = revision; this.generation++; }
  accept(identity: JobIdentity): boolean {
    if (identity.projectId !== this.projectId || identity.revision !== this.revision || identity.generation !== this.generation || this.cancelled.has(identity.jobId) || this.completed.has(identity.jobId)) return false;
    this.completed.add(identity.jobId); return true;
  }
}
