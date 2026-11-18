import {createHash} from 'node:crypto';
import type {Project} from '../project-model';
/** Saving metadata alone does not invalidate an already exported content revision. */
export function exportContentHash(project:Project):string {const value=structuredClone(project) as unknown as Record<string,unknown>;for(const key of ['savedRevision','modifiedAt','createdAt'])delete value[key];return createHash('sha256').update(JSON.stringify(value)).digest('hex');}
