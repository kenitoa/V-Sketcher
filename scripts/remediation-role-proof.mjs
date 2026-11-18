import {readFileSync,readdirSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const out=resolve(process.argv[2]);assert.ok(!existsSync(out),'E_REMEDIATION_EXISTS');mkdirSync(out,{recursive:true});
const require=createRequire(import.meta.url),{readBundle}=require(resolve('.local/test-js/packages/project-storage/archive'));
const roots=readdirSync('.local').filter(name=>/^remediation-linear-\d{13}$/.test(name)).sort();const work=resolve('.local',roots.at(-1)),profile=join(work,'profile');
const linear=JSON.parse(readFileSync('evidence/remediation26-31/linear-08/linear.json'));assert.ok(linear.passed);
const row=linear.rows.find(row=>row.route==='split-image'&&row.version===2),saved=await readBundle(join(profile,'broadcast-split.2dsketch'),false);
assert.equal(saved.project.projectId,row.projectId);assert.equal(saved.project.revision,row.sourceRevision);
const catalogRoot=join(profile,'projects'),catalog=JSON.parse(readFileSync(join(catalogRoot,'catalog.json'))),proof=[];
for(const record of catalog.recovery.filter(record=>record.projectId===row.projectId&&record.kind==='checkpoint')){
 const file=join(catalogRoot,'snapshots',record.id+'.2dsketch'),bytes=readFileSync(file),digest=createHash('sha256').update(bytes).digest('hex');assert.equal(digest,record.hash);const bundle=await readBundle(file,false);
 proof.push({revision:bundle.project.revision,role:bundle.project.parts[0].role,snapshotSha256:digest});
}
const finalRole=saved.project.parts[0].role;assert.ok(proof.some(record=>record.role!==finalRole),'E_ROLE_MUTATION_UNPROVEN');assert.ok(proof.some(record=>record.role===finalRole),'E_ROLE_BASELINE_UNPROVEN');
writeFileSync(join(out,'role-proof.json'),JSON.stringify({passed:true,projectId:row.projectId,finalRevision:row.sourceRevision,finalRole,verifiedDurableCheckpoints:proof,
 correctionWasActuallyAppliedAndRestored:true,rawAssetsOrPrivatePathsPublished:false},null,2)+'\n');console.log('Durable checkpoints prove the split-role mutation and restoration on the same saved project.');
