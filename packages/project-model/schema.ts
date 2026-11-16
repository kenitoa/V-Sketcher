type Schema = Record<string, unknown>;
const string = (maxLength = 120): Schema => ({ type:'string', minLength:1, maxLength });
const id: Schema = { ...string(64), pattern:'^[A-Za-z0-9][A-Za-z0-9_-]*$' };
const number: Schema = { type:'number' };
const integer = (maximum = Number.MAX_SAFE_INTEGER): Schema => ({ type:'integer', minimum:0, maximum });
const boolean: Schema = { type:'boolean' };
const choice = (...values: string[]): Schema => ({ enum:values });
const array = (items: Schema, maxItems = 1024): Schema => ({ type:'array', items, maxItems });
const object = (properties: Record<string, Schema>): Schema => ({ type:'object', additionalProperties:false, properties, required:Object.keys(properties) });
const nullable = (schema: Schema): Schema => ({ anyOf:[schema,{ type:'null' }] });
const matrix: Schema = { type:'array', items:number, minItems:6, maxItems:6 };
const pair: Schema = { type:'array', items:number, minItems:2, maxItems:2 };
const positive: Schema = { type:'number', exclusiveMinimum:0 };
const size = object({ width:{ ...integer(4096), minimum:1 }, height:{ ...integer(4096), minimum:1 } });
const rect = object({ x:number,y:number,width:positive,height:positive });
const revision = integer();
const semver: Schema = { ...string(32), pattern:'^\\d+\\.\\d+\\.\\d+$' };
const asset = object({ id,kind:choice('original-image','part-texture','supplement-image','edited-image'),
  origin:choice('imported','bundled','auto-preparation','auto-completion','manual-edit','generated'), parentAssetIds:{ ...array(id), uniqueItems:true },
  storage:object({ path:{ ...string(240), pattern:'^resources/' } }),
  fingerprint:object({ sha256:{ type:'string',pattern:'^[a-f0-9]{64}$' },bytes:{ ...integer(512*1024*1024),minimum:1 } }),
  version:{ ...integer(),minimum:1 },mediaType:choice('image/png','image/jpeg'), dimensions:size,sourceRegion:rect,sourceToEdited:matrix,
  colorSpace:choice('srgb','unknown'),alphaMode:choice('straight','premultiplied','opaque'),
  producer:object({ name:string(),version:semver }),attribution:object({ creator:string(512),source:string(512),usage:string(1024),status:choice('verified','unverified') }) });
const part = object({ id,displayName:string(),role:choice('base','body','head','hair-front','hair-back','eye','mouth','accessory','custom'),
  side:choice('character-left','character-right','center','none'),parentId:nullable(id),groupId:nullable(id),
  textures:array(object({ state:{ ...string(32),pattern:'^[a-z][a-z0-9_-]*$' },assetId:id,assetVersion:{ ...integer(),minimum:1 },assetToLocal:matrix }),32),
  localTransform:matrix,drawOrder:{ type:'integer',minimum:-100000,maximum:100000 },visible:boolean,opacity:{ type:'number',minimum:0,maximum:1 },
  correctionOrigin:choice('automatic','user-confirmed','manual'),limitations:array(string(512),64) });
const parameter = object({ id,displayName:string(),semantic:{ ...string(64),pattern:'^[a-z][a-z0-9_-]*$' },unit:choice('ratio','degrees','custom'),min:number,neutral:number,max:number,
  previewKey:nullable(choice('eye_left','eye_right','mouth','head_yaw','head_roll')) });
const inputBinding = object({ id,source:choice('face','microphone','manual'),channel:{ ...string(64),pattern:'^[a-z][a-z0-9_-]*$' },parameterId:id,inputRange:pair,
  invert:boolean,gain:{ type:'number',minimum:0,maximum:10 },offset:number,smoothingMs:integer(10000),
  fallback:object({ mode:choice('neutral','hold','constant'),value:number,returnMs:integer(10000) }) });
const motion = object({ version:{ const:1 },faceWidth:positive,maxRollDegrees:{ type:'number',minimum:0,maximum:6 },secondary:{ const:'disabled' },
  settings:object({ strength:{ type:'number',minimum:0,maximum:1 },smoothingMs:integer(1000),pose:array(object({ parameterId:id,value:number }),128) }),
  meshes:array(object({ partId:id,pivot:pair,yawParameterId:nullable(id),rollParameterId:nullable(id),curve:choice('linear','smoothstep'),
    vertices:{ ...array(object({ position:pair,weight:{ type:'number',minimum:0,maximum:1 },minimum:pair,maximum:pair }),1024),minItems:3 },triangles:{ ...array(integer(1023),6144),minItems:3 } }),64) });
export const PROJECT_SCHEMA = { $schema:'https://json-schema.org/draft/2020-12/schema', $id:'https://2dsketcher.local/schema/project-1.1',
  ...object({ projectId:id,schemaVersion:object({ major:{ const:1 },minor:{ enum:[0,1] } }),displayName:string(),sourceType:choice('parts','single-image','split-image'),
    createdAt:{ ...string(24),pattern:'^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$' },modifiedAt:{ ...string(24),pattern:'^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$' },
    revision,savedRevision:nullable(revision),canvas:size,inputAssetIds:{ ...array(id),uniqueItems:true },assets:array(asset),parts:array(part,64),
    groups:array(object({ id,displayName:string(),parentGroupId:nullable(id),visible:boolean }),128),parameters:array(parameter,128),
    partBindings:array({ oneOf:[object({ id,parameterId:id,partId:id,kind:{ const:'state-blend' },mapping:object({ minimumState:string(32),maximumState:string(32) }) }),
      object({ id,parameterId:id,partId:id,kind:{ const:'transform' },mapping:object({ component:choice('rotate-degrees','translate-x','translate-y','scale-x','scale-y'),outputRange:pair }) })] },256),inputBindings:array(inputBinding,128),
    expressions:array(object({ id,displayName:string(),values:array(object({ parameterId:id,value:number,locked:boolean }),128),transitionMs:integer(10000),release:choice('live-input','neutral') }),64),
    runtimeProfile:object({ id,revision,mode:choice('idle','camera','microphone','camera-microphone'),mirror:boolean,fallbackExpressionId:nullable(id) }),
    broadcastProfiles:array(object({ id,revision,displayName:string(),width:{ ...integer(8192),minimum:1 },height:{ ...integer(8192),minimum:1 },fps:{ ...integer(120),minimum:1 },transparent:boolean,region:rect,fit:choice('contain','cover') }),16),
    exportProfiles:array(object({ id,revision,displayName:string(),target:choice('inochi2d'),targetVersion:semver,format:choice('inp'),converterVersion:semver,
      parameterMap:array(object({ parameterId:id,targetName:{ ...string(64),pattern:'^[a-zA-Z][a-zA-Z0-9_]*$' } }),128) }),16),
    provenance:object({ preparation:string(512),limitations:array(string(512),128) }),derivedProjects:array(object({ projectId:id,relation:choice('3d','generated-variant') }),32) }) };
// The optional motion extension is written only with minor 1; legacy 1.0 remains readable.
((PROJECT_SCHEMA as Record<string,unknown>).properties as Record<string,Schema>).motion = motion;
export const MACHINE_SCHEMA = { $schema:'https://json-schema.org/draft/2020-12/schema', ...object({ schemaVersion:{ const:1 },projectId:id,
  cameraId:nullable(string(512)),microphoneId:nullable(string(512)),calibrations:array(object({ bindingId:id,inputRange:pair }),128) }) };
