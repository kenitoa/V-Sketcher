import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import standalone from 'ajv/dist/standalone/index.js';
import { root } from './common.mjs';
// The locked Node 24 runtime strips this schema file's type-only declarations.
const { PROJECT_SCHEMA, MACHINE_SCHEMA } = await import('../packages/project-model/schema.ts');
const ajv = new Ajv2020({ strict:true,allErrors:true,code:{ source:true,esm:true,lines:true } });
ajv.addSchema(PROJECT_SCHEMA,'project'); ajv.addSchema(MACHINE_SCHEMA,'machine');
let code = standalone(ajv,{ projectStructure:'project',machineStructure:'machine' });
code = code.replaceAll('require("ajv/dist/runtime/ucs2length").default','ucs2length');
if (/require\(|new Function\(|eval\(/.test(code)) throw new Error('E_VALIDATOR_RUNTIME_CODE');
code = '// @ts-nocheck -- Generated from schema.ts with locked Ajv; do not edit.\n'+
  'import ucs2lengthModule from "ajv/dist/runtime/ucs2length.js";\nconst ucs2length = ucs2lengthModule.default ?? ucs2lengthModule;\n'+code.trimEnd()+'\n';
const path = resolve(root,'packages/project-model/structure.generated.ts');
if (process.argv.includes('--check')) {
  if (readFileSync(path,'utf8') !== code) throw new Error('E_VALIDATOR_STALE: run node scripts/generate-project-validators.mjs');
  console.log('Precompiled schema validators match source; no runtime code generation');
} else { writeFileSync(path,code); console.log('Generated CSP-compatible project validators'); }
