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
(part.properties as Record<string,Schema>).library=object({catalogId:id,itemId:id,version:semver,key:id});
(part.properties as Record<string,Schema>).color=object({hueDegrees:{type:'number',minimum:-18,maximum:18},minimumHue:{type:'number',minimum:0,maximum:1},maximumHue:{type:'number',minimum:0,maximum:1},minimumSaturation:{type:'number',minimum:0,maximum:1}});
const stateMapping=object({minimumState:string(32),maximumState:string(32)});(stateMapping.properties as Record<string,Schema>).middleState=string(32);
const parameter = object({ id,displayName:string(),semantic:{ ...string(64),pattern:'^[a-z][a-z0-9_-]*$' },unit:choice('ratio','degrees','custom'),min:number,neutral:number,max:number,
  previewKey:nullable(choice('eye_left','eye_right','mouth','head_yaw','head_roll')) });
const inputBinding = object({ id,source:choice('face','microphone','manual'),channel:{ ...string(64),pattern:'^[a-z][a-z0-9_-]*$' },parameterId:id,inputRange:pair,
  invert:boolean,gain:{ type:'number',minimum:0,maximum:10 },offset:number,smoothingMs:integer(10000),
  fallback:object({ mode:choice('neutral','hold','constant'),value:number,returnMs:integer(10000) }) });
const motion = object({ version:{ const:1 },faceWidth:positive,maxRollDegrees:{ type:'number',minimum:0,maximum:6 },secondary:{ const:'disabled' },
  settings:object({ strength:{ type:'number',minimum:0,maximum:1 },smoothingMs:integer(1000),pose:array(object({ parameterId:id,value:number }),128) }),
  meshes:array(object({ partId:id,pivot:pair,yawParameterId:nullable(id),rollParameterId:nullable(id),curve:choice('linear','smoothstep'),
    vertices:{ ...array(object({ position:pair,weight:{ type:'number',minimum:0,maximum:1 },minimum:pair,maximum:pair }),1024),minItems:3 },triangles:{ ...array(integer(1023),6144),minItems:3 } }),64) });
export const PROJECT_SCHEMA = { $schema:'https://json-schema.org/draft/2020-12/schema', $id:'https://2dsketcher.local/schema/project-1.8',
  ...object({ projectId:id,schemaVersion:object({ major:{ const:1 },minor:{ enum:[0,1,2,3,4,5,6,7,8] } }),displayName:string(),sourceType:choice('parts','single-image','split-image'),
    createdAt:{ ...string(24),pattern:'^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$' },modifiedAt:{ ...string(24),pattern:'^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$' },
    revision,savedRevision:nullable(revision),canvas:size,inputAssetIds:{ ...array(id),uniqueItems:true },assets:array(asset),parts:array(part,64),
    groups:array(object({ id,displayName:string(),parentGroupId:nullable(id),visible:boolean }),128),parameters:array(parameter,128),
    partBindings:array({ oneOf:[object({ id,parameterId:id,partId:id,kind:{ const:'state-blend' },mapping:stateMapping }),
      object({ id,parameterId:id,partId:id,kind:{ const:'transform' },mapping:object({ component:choice('rotate-degrees','translate-x','translate-y','scale-x','scale-y'),outputRange:pair }) })] },256),inputBindings:array(inputBinding,128),
    expressions:array(object({ id,displayName:string(),values:array(object({ parameterId:id,value:number,locked:boolean }),128),transitionMs:integer(10000),release:choice('live-input','neutral') }),64),
    runtimeProfile:object({ id,revision,mode:choice('idle','camera','microphone','camera-microphone'),mirror:boolean,fallbackExpressionId:nullable(id) }),
    broadcastProfiles:array(object({ id,revision,displayName:string(),width:{ ...integer(8192),minimum:1 },height:{ ...integer(8192),minimum:1 },fps:{ ...integer(120),minimum:1 },transparent:boolean,region:rect,fit:choice('contain','cover') }),16),
    exportProfiles:array(object({ id,revision,displayName:string(),target:choice('inochi2d'),targetVersion:semver,format:choice('inp'),converterVersion:semver,
      parameterMap:array(object({ parameterId:id,targetName:{ ...string(64),pattern:'^[a-zA-Z][a-zA-Z0-9_]*$' } }),128) }),16),
    provenance:object({ preparation:string(512),limitations:array(string(512),128) }),derivedProjects:array(object({ projectId:id,relation:choice('3d','generated-variant') }),32) }) };
// The optional motion extension is written only with minor 1; legacy 1.0 remains readable.
((PROJECT_SCHEMA as Record<string,unknown>).properties as Record<string,Schema>).motion = motion;
const projectProperties=(PROJECT_SCHEMA as Schema).properties as Record<string,Schema>;
projectProperties.detail=object({version:{const:1},partOrder:{...array(id,64),uniqueItems:true},meshOrder:{...array(id,64),uniqueItems:true},baselines:array(object({part,partIndex:integer(63),mesh:nullable(((motion.properties as Record<string,Schema>).meshes!.items as Schema)),meshIndex:integer(63),bindings:array(projectProperties.partBindings!.items as Schema,256)}),64),groups:array(projectProperties.groups!.items as Schema,128)});
const INPUT_SCHEMA=(() => {
const object=(properties:Record<string,unknown>) => ({ type:'object',additionalProperties:false,properties,required:Object.keys(properties) });
const number={ type:'number' };const integer={ type:'integer',minimum:0,maximum:4096 };const size=object({ width:{ ...integer,minimum:1 },height:{ ...integer,minimum:1 } });
const rect=object({ x:integer,y:integer,width:{ ...integer,minimum:1 },height:{ ...integer,minimum:1 } });
const face=object({ x:{ ...number,minimum:0,maximum:1024 },y:{ ...number,minimum:0,maximum:1024 },width:{ ...number,exclusiveMinimum:0,maximum:1024 },height:{ ...number,exclusiveMinimum:0,maximum:1024 } });
const id={ type:'string',pattern:'^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$' };const array=(items:unknown,maxItems:number) => ({ type:'array',items,maxItems });
const INPUT_SCHEMA=object({ version:{ const:1 },originalAssetId:id,normalizedAssetId:id,selectedAssetId:id,analysisAssetId:id,
  probe:object({ detectorAvailable:{ type:'boolean' },originalSize:size,size,orientation:{ type:'integer',minimum:1,maximum:8 },iccConverted:{ type:'boolean' },sourceToNormalized:{ type:'array',items:number,minItems:6,maxItems:6 },reduced:{ type:'boolean' },estimatedWorkingBytes:{ type:'integer',minimum:0,maximum:384*1024*1024 },format:{ enum:['png','jpeg'] },hasAlpha:{ type:'boolean' },faceCount:{ type:'integer',minimum:0,maximum:8 },candidates:array(object({ rect,method:{ enum:['alpha','face','manual-required'] } }),8) }),
  selection:object({ rect,backgroundTolerance:{ anyOf:[{ type:'null' },{ type:'integer',minimum:0,maximum:80 }] },masks:array(object({ mode:{ enum:['erase','restore'] },rect }),64),occluded:{ type:'boolean' } }),
  analysis:object({ faces:array(face,8),warnings:array({ enum:['DETECTOR_UNAVAILABLE','FACE_UNCONFIRMED','SMALL_FACE','EDGE_CROPPED_POSSIBLE','OCCLUDED_USER_REPORTED'] },8),crop:rect,analysisSize:size }) });

return INPUT_SCHEMA;
})();
((PROJECT_SCHEMA as Record<string,unknown>).properties as Record<string,unknown>).inputPreparation = INPUT_SCHEMA;
((PROJECT_SCHEMA as Record<string,unknown>).properties as Record<string,Schema>).assembly=object({catalogId:id,version:semver,linkedEyes:boolean,choices:array(object({slot:choice('face','hair','eyes','mouth','outfit','accessory'),itemId:nullable(id),version:semver}),6),adjustments:array(object({key:id,x:{type:'number',minimum:-6,maximum:6},y:{type:'number',minimum:-6,maximum:6},scale:{type:'number',minimum:.95,maximum:1.05},rotation:{type:'number',minimum:-2,maximum:2},hue:{type:'number',minimum:-18,maximum:18}}),16),warnings:array(string(512),16)});
export const MACHINE_SCHEMA = { $schema:'https://json-schema.org/draft/2020-12/schema', ...object({ schemaVersion:{ const:1 },projectId:id,
  cameraId:nullable(string(512)),microphoneId:nullable(string(512)),calibrations:array(object({ bindingId:id,inputRange:pair }),128) }) };
const structureReport=object({version:{const:'1.0.0'},method:{const:'mediapipe-landmarks-pixel-evidence'},status:choice('ready','partial','failed'),face:nullable(rect),regions:array({...object({key:choice('eye_left','eye_right','mouth'),rect,observed:boolean,reason:string(128),estimatedStates:array(choice('open','closed'),2),enabled:boolean}),required:['key','rect','observed','reason','estimatedStates']},3),unconfirmed:array(string(128),16),warnings:array(string(128),16),headGain:{type:'number',minimum:0,maximum:.65},maxRollDegrees:{type:'number',minimum:0,maximum:3.900000001},completion:choice('estimated','restrict'),files:array({...string(128),pattern:'^structure-(base|eye_(left|right)-(open|closed)|mouth-(open|closed))\\.png$'},7)});
((PROJECT_SCHEMA as Record<string,unknown>).properties as Record<string,Schema>).structure=object({version:{const:1},inputAssetId:id,inputRevision:revision,configurationVersion:choice('1.0.0','1.1.0'),report:structureReport});

const correctionMask=object({mode:choice('erase','restore'),rect});
const correction=object({key:choice('eye_left','eye_right','mouth'),rect,masks:array(correctionMask,32),order:{type:'integer',minimum:5,maximum:20},decision:choice('confirmed','skip','blocked'),occluded:boolean,protect:boolean});
const reportRegion=(((structureReport.properties as Record<string,Schema>).regions!.items as Schema).properties as Record<string,Schema>);
reportRegion.masks=array(correctionMask,32);reportRegion.order={type:'integer',minimum:5,maximum:20};
const structureExtension=(((PROJECT_SCHEMA as Schema).properties as Record<string,Schema>).structure!.properties as Record<string,Schema>);
structureExtension.corrections=object({version:{const:1},automatic:structureReport,entries:array(correction,3),invalidated:object({keys:array(choice('eye_left','eye_right','mouth'),3),checks:array(choice('preview','compatibility','export'),3)})});

const groupOpacity={type:'number',minimum:0,maximum:1};
(((((PROJECT_SCHEMA as Schema).properties as Record<string,Schema>).groups!.items as Schema).properties) as Record<string,Schema>).opacity=groupOpacity;
const splitRole=choice('base','body','head','hair-front','hair-back','eye','mouth','accessory','custom');
const splitSide=choice('character-left','character-right','center','none');
const splitGroup=object({id,name:string(),parentGroupId:nullable(id),visible:boolean,opacity:groupOpacity});
const splitImage=object({key:{type:'string',pattern:'^[a-f0-9]{64}$'},width:{...integer(4096),minimum:1},height:{...integer(4096),minimum:1},bounds:nullable(rect),empty:boolean,opaque:boolean,iccConverted:boolean});
const splitLayer=object({id,name:string(),origin:pair,z:{type:'integer',minimum:-100000,maximum:100000},role:splitRole,side:splitSide,visible:boolean,opacity:groupOpacity,parentId:nullable(id),groupId:nullable(id),usage:choice('primary','auxiliary','alternative'),variantOf:nullable(id),state:choice('default','open','closed','middle'),positionConfirmed:boolean,roleConfirmed:boolean,
 sourceId:string(128),sourceName:string(),sourcePath:string(240),sourceZ:nullable({type:'integer',minimum:-100000,maximum:100000}),sourceOrigin:nullable(pair),originalAssetId:id,imageAssetId:id,sourceHash:{type:'string',pattern:'^[a-f0-9]{64}$'},imageHash:{type:'string',pattern:'^[a-f0-9]{64}$'},image:splitImage,proposal:object({role:splitRole,side:splitSide,confidence:{type:'number',minimum:0,maximum:1},reasons:array(string(128),8)})});
((PROJECT_SCHEMA as Schema).properties as Record<string,Schema>).split=object({version:{const:1},rigSignature:{type:'string',pattern:'^[a-f0-9]{64}$'},draft:object({id,sourceKind:choice('folder','2dparts'),sourceHash:nullable({type:'string',pattern:'^[a-f0-9]{64}$'}),sourceManifest:nullable(string(1048576)),canvas:size,layout:choice('manifest','common','cropped'),layoutConfirmed:boolean,limitedAccepted:boolean,omittedAccepted:boolean,layers:{...array(splitLayer,64),minItems:1},groups:array(splitGroup,128),missingProperties:array(string(128),32),omitted:array(string(240),128)})});

const expressionValue=((projectProperties.expressions!.items as Schema).properties as Record<string,Schema>).values!.items as Schema;
(expressionValue.properties as Record<string,Schema>).partIds={...array(id,64),uniqueItems:true};
((projectProperties.expressions!.items as Schema).properties as Record<string,Schema>).releaseMs=integer(3000);
projectProperties.expressionSettings=object({version:{const:1},mouth:choice('camera','microphone'),alternate:boolean,autoBlink:boolean,releaseMs:integer(3000),shortcuts:{...array(nullable(id),3),minItems:3}});
