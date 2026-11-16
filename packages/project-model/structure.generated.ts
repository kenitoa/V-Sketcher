// @ts-nocheck -- Generated from schema.ts with locked Ajv; do not edit.
import ucs2lengthModule from "ajv/dist/runtime/ucs2length.js";
const ucs2length = ucs2lengthModule.default ?? ucs2lengthModule;
"use strict";
export const projectStructure = validate20;
const schema31 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://2dsketcher.local/schema/project-1.3","type":"object","additionalProperties":false,"properties":{"projectId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"schemaVersion":{"type":"object","additionalProperties":false,"properties":{"major":{"const":1},"minor":{"enum":[0,1,2,3]}},"required":["major","minor"]},"displayName":{"type":"string","minLength":1,"maxLength":120},"sourceType":{"enum":["parts","single-image","split-image"]},"createdAt":{"type":"string","minLength":1,"maxLength":24,"pattern":"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"},"modifiedAt":{"type":"string","minLength":1,"maxLength":24,"pattern":"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"savedRevision":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]},"canvas":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"inputAssetIds":{"type":"array","items":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"maxItems":1024,"uniqueItems":true},"assets":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"kind":{"enum":["original-image","part-texture","supplement-image","edited-image"]},"origin":{"enum":["imported","bundled","auto-preparation","auto-completion","manual-edit","generated"]},"parentAssetIds":{"type":"array","items":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"maxItems":1024,"uniqueItems":true},"storage":{"type":"object","additionalProperties":false,"properties":{"path":{"type":"string","minLength":1,"maxLength":240,"pattern":"^resources/"}},"required":["path"]},"fingerprint":{"type":"object","additionalProperties":false,"properties":{"sha256":{"type":"string","pattern":"^[a-f0-9]{64}$"},"bytes":{"type":"integer","minimum":1,"maximum":536870912}},"required":["sha256","bytes"]},"version":{"type":"integer","minimum":1,"maximum":9007199254740991},"mediaType":{"enum":["image/png","image/jpeg"]},"dimensions":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"sourceRegion":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},"sourceToEdited":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6},"colorSpace":{"enum":["srgb","unknown"]},"alphaMode":{"enum":["straight","premultiplied","opaque"]},"producer":{"type":"object","additionalProperties":false,"properties":{"name":{"type":"string","minLength":1,"maxLength":120},"version":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"}},"required":["name","version"]},"attribution":{"type":"object","additionalProperties":false,"properties":{"creator":{"type":"string","minLength":1,"maxLength":512},"source":{"type":"string","minLength":1,"maxLength":512},"usage":{"type":"string","minLength":1,"maxLength":1024},"status":{"enum":["verified","unverified"]}},"required":["creator","source","usage","status"]}},"required":["id","kind","origin","parentAssetIds","storage","fingerprint","version","mediaType","dimensions","sourceRegion","sourceToEdited","colorSpace","alphaMode","producer","attribution"]},"maxItems":1024},"parts":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"role":{"enum":["base","body","head","hair-front","hair-back","eye","mouth","accessory","custom"]},"side":{"enum":["character-left","character-right","center","none"]},"parentId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"groupId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"textures":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"state":{"type":"string","minLength":1,"maxLength":32,"pattern":"^[a-z][a-z0-9_-]*$"},"assetId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"assetVersion":{"type":"integer","minimum":1,"maximum":9007199254740991},"assetToLocal":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6}},"required":["state","assetId","assetVersion","assetToLocal"]},"maxItems":32},"localTransform":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6},"drawOrder":{"type":"integer","minimum":-100000,"maximum":100000},"visible":{"type":"boolean"},"opacity":{"type":"number","minimum":0,"maximum":1},"correctionOrigin":{"enum":["automatic","user-confirmed","manual"]},"limitations":{"type":"array","items":{"type":"string","minLength":1,"maxLength":512},"maxItems":64},"library":{"type":"object","additionalProperties":false,"properties":{"catalogId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"itemId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"version":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"},"key":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"}},"required":["catalogId","itemId","version","key"]},"color":{"type":"object","additionalProperties":false,"properties":{"hueDegrees":{"type":"number","minimum":-18,"maximum":18},"minimumHue":{"type":"number","minimum":0,"maximum":1},"maximumHue":{"type":"number","minimum":0,"maximum":1},"minimumSaturation":{"type":"number","minimum":0,"maximum":1}},"required":["hueDegrees","minimumHue","maximumHue","minimumSaturation"]}},"required":["id","displayName","role","side","parentId","groupId","textures","localTransform","drawOrder","visible","opacity","correctionOrigin","limitations"]},"maxItems":64},"groups":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"parentGroupId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"visible":{"type":"boolean"}},"required":["id","displayName","parentGroupId","visible"]},"maxItems":128},"parameters":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"semantic":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[a-z][a-z0-9_-]*$"},"unit":{"enum":["ratio","degrees","custom"]},"min":{"type":"number"},"neutral":{"type":"number"},"max":{"type":"number"},"previewKey":{"anyOf":[{"enum":["eye_left","eye_right","mouth","head_yaw","head_roll"]},{"type":"null"}]}},"required":["id","displayName","semantic","unit","min","neutral","max","previewKey"]},"maxItems":128},"partBindings":{"type":"array","items":{"oneOf":[{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"partId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"kind":{"const":"state-blend"},"mapping":{"type":"object","additionalProperties":false,"properties":{"minimumState":{"type":"string","minLength":1,"maxLength":32},"maximumState":{"type":"string","minLength":1,"maxLength":32},"middleState":{"type":"string","minLength":1,"maxLength":32}},"required":["minimumState","maximumState"]}},"required":["id","parameterId","partId","kind","mapping"]},{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"partId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"kind":{"const":"transform"},"mapping":{"type":"object","additionalProperties":false,"properties":{"component":{"enum":["rotate-degrees","translate-x","translate-y","scale-x","scale-y"]},"outputRange":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2}},"required":["component","outputRange"]}},"required":["id","parameterId","partId","kind","mapping"]}]},"maxItems":256},"inputBindings":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"source":{"enum":["face","microphone","manual"]},"channel":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[a-z][a-z0-9_-]*$"},"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"inputRange":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"invert":{"type":"boolean"},"gain":{"type":"number","minimum":0,"maximum":10},"offset":{"type":"number"},"smoothingMs":{"type":"integer","minimum":0,"maximum":10000},"fallback":{"type":"object","additionalProperties":false,"properties":{"mode":{"enum":["neutral","hold","constant"]},"value":{"type":"number"},"returnMs":{"type":"integer","minimum":0,"maximum":10000}},"required":["mode","value","returnMs"]}},"required":["id","source","channel","parameterId","inputRange","invert","gain","offset","smoothingMs","fallback"]},"maxItems":128},"expressions":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"values":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"value":{"type":"number"},"locked":{"type":"boolean"}},"required":["parameterId","value","locked"]},"maxItems":128},"transitionMs":{"type":"integer","minimum":0,"maximum":10000},"release":{"enum":["live-input","neutral"]}},"required":["id","displayName","values","transitionMs","release"]},"maxItems":64},"runtimeProfile":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"mode":{"enum":["idle","camera","microphone","camera-microphone"]},"mirror":{"type":"boolean"},"fallbackExpressionId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]}},"required":["id","revision","mode","mirror","fallbackExpressionId"]},"broadcastProfiles":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"displayName":{"type":"string","minLength":1,"maxLength":120},"width":{"type":"integer","minimum":1,"maximum":8192},"height":{"type":"integer","minimum":1,"maximum":8192},"fps":{"type":"integer","minimum":1,"maximum":120},"transparent":{"type":"boolean"},"region":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},"fit":{"enum":["contain","cover"]}},"required":["id","revision","displayName","width","height","fps","transparent","region","fit"]},"maxItems":16},"exportProfiles":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"displayName":{"type":"string","minLength":1,"maxLength":120},"target":{"enum":["inochi2d"]},"targetVersion":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"},"format":{"enum":["inp"]},"converterVersion":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"},"parameterMap":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"targetName":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[a-zA-Z][a-zA-Z0-9_]*$"}},"required":["parameterId","targetName"]},"maxItems":128}},"required":["id","revision","displayName","target","targetVersion","format","converterVersion","parameterMap"]},"maxItems":16},"provenance":{"type":"object","additionalProperties":false,"properties":{"preparation":{"type":"string","minLength":1,"maxLength":512},"limitations":{"type":"array","items":{"type":"string","minLength":1,"maxLength":512},"maxItems":128}},"required":["preparation","limitations"]},"derivedProjects":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"projectId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"relation":{"enum":["3d","generated-variant"]}},"required":["projectId","relation"]},"maxItems":32},"motion":{"type":"object","additionalProperties":false,"properties":{"version":{"const":1},"faceWidth":{"type":"number","exclusiveMinimum":0},"maxRollDegrees":{"type":"number","minimum":0,"maximum":6},"secondary":{"const":"disabled"},"settings":{"type":"object","additionalProperties":false,"properties":{"strength":{"type":"number","minimum":0,"maximum":1},"smoothingMs":{"type":"integer","minimum":0,"maximum":1000},"pose":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"value":{"type":"number"}},"required":["parameterId","value"]},"maxItems":128}},"required":["strength","smoothingMs","pose"]},"meshes":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"partId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"pivot":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"yawParameterId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"rollParameterId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"curve":{"enum":["linear","smoothstep"]},"vertices":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"position":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"weight":{"type":"number","minimum":0,"maximum":1},"minimum":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"maximum":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2}},"required":["position","weight","minimum","maximum"]},"maxItems":1024,"minItems":3},"triangles":{"type":"array","items":{"type":"integer","minimum":0,"maximum":1023},"maxItems":6144,"minItems":3}},"required":["partId","pivot","yawParameterId","rollParameterId","curve","vertices","triangles"]},"maxItems":64}},"required":["version","faceWidth","maxRollDegrees","secondary","settings","meshes"]},"inputPreparation":{"type":"object","additionalProperties":false,"properties":{"version":{"const":1},"originalAssetId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},"normalizedAssetId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},"selectedAssetId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},"analysisAssetId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},"probe":{"type":"object","additionalProperties":false,"properties":{"detectorAvailable":{"type":"boolean"},"originalSize":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"size":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"orientation":{"type":"integer","minimum":1,"maximum":8},"iccConverted":{"type":"boolean"},"sourceToNormalized":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6},"reduced":{"type":"boolean"},"estimatedWorkingBytes":{"type":"integer","minimum":0,"maximum":402653184},"format":{"enum":["png","jpeg"]},"hasAlpha":{"type":"boolean"},"faceCount":{"type":"integer","minimum":0,"maximum":8},"candidates":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"integer","minimum":0,"maximum":4096},"y":{"type":"integer","minimum":0,"maximum":4096},"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["x","y","width","height"]},"method":{"enum":["alpha","face","manual-required"]}},"required":["rect","method"]},"maxItems":8}},"required":["detectorAvailable","originalSize","size","orientation","iccConverted","sourceToNormalized","reduced","estimatedWorkingBytes","format","hasAlpha","faceCount","candidates"]},"selection":{"type":"object","additionalProperties":false,"properties":{"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"integer","minimum":0,"maximum":4096},"y":{"type":"integer","minimum":0,"maximum":4096},"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["x","y","width","height"]},"backgroundTolerance":{"anyOf":[{"type":"null"},{"type":"integer","minimum":0,"maximum":80}]},"masks":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"mode":{"enum":["erase","restore"]},"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"integer","minimum":0,"maximum":4096},"y":{"type":"integer","minimum":0,"maximum":4096},"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["x","y","width","height"]}},"required":["mode","rect"]},"maxItems":64},"occluded":{"type":"boolean"}},"required":["rect","backgroundTolerance","masks","occluded"]},"analysis":{"type":"object","additionalProperties":false,"properties":{"faces":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number","minimum":0,"maximum":1024},"y":{"type":"number","minimum":0,"maximum":1024},"width":{"type":"number","exclusiveMinimum":0,"maximum":1024},"height":{"type":"number","exclusiveMinimum":0,"maximum":1024}},"required":["x","y","width","height"]},"maxItems":8},"warnings":{"type":"array","items":{"enum":["DETECTOR_UNAVAILABLE","FACE_UNCONFIRMED","SMALL_FACE","EDGE_CROPPED_POSSIBLE","OCCLUDED_USER_REPORTED"]},"maxItems":8},"crop":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"integer","minimum":0,"maximum":4096},"y":{"type":"integer","minimum":0,"maximum":4096},"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["x","y","width","height"]},"analysisSize":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]}},"required":["faces","warnings","crop","analysisSize"]}},"required":["version","originalAssetId","normalizedAssetId","selectedAssetId","analysisAssetId","probe","selection","analysis"]},"assembly":{"type":"object","additionalProperties":false,"properties":{"catalogId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"version":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"},"linkedEyes":{"type":"boolean"},"choices":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"slot":{"enum":["face","hair","eyes","mouth","outfit","accessory"]},"itemId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"version":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"}},"required":["slot","itemId","version"]},"maxItems":6},"adjustments":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"key":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"x":{"type":"number","minimum":-6,"maximum":6},"y":{"type":"number","minimum":-6,"maximum":6},"scale":{"type":"number","minimum":0.95,"maximum":1.05},"rotation":{"type":"number","minimum":-2,"maximum":2},"hue":{"type":"number","minimum":-18,"maximum":18}},"required":["key","x","y","scale","rotation","hue"]},"maxItems":16},"warnings":{"type":"array","items":{"type":"string","minLength":1,"maxLength":512},"maxItems":16}},"required":["catalogId","version","linkedEyes","choices","adjustments","warnings"]}},"required":["projectId","schemaVersion","displayName","sourceType","createdAt","modifiedAt","revision","savedRevision","canvas","inputAssetIds","assets","parts","groups","parameters","partBindings","inputBindings","expressions","runtimeProfile","broadcastProfiles","exportProfiles","provenance","derivedProjects"]};
const func1 = Object.prototype.hasOwnProperty;
const func2 = ucs2length;
const pattern4 = new RegExp("^[A-Za-z0-9][A-Za-z0-9_-]*$", "u");
const pattern5 = new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$", "u");
const pattern10 = new RegExp("^resources/", "u");
const pattern11 = new RegExp("^[a-f0-9]{64}$", "u");
const pattern12 = new RegExp("^\\d+\\.\\d+\\.\\d+$", "u");
const pattern16 = new RegExp("^[a-z][a-z0-9_-]*$", "u");
const pattern44 = new RegExp("^[a-zA-Z][a-zA-Z0-9_]*$", "u");
const pattern50 = new RegExp("^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$", "u");

function validate20(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="https://2dsketcher.local/schema/project-1.3" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate20.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.projectId === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "projectId"},message:"must have required property '"+"projectId"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schemaVersion === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schemaVersion"},message:"must have required property '"+"schemaVersion"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.displayName === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.sourceType === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "sourceType"},message:"must have required property '"+"sourceType"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.createdAt === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "createdAt"},message:"must have required property '"+"createdAt"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.modifiedAt === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "modifiedAt"},message:"must have required property '"+"modifiedAt"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.revision === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.savedRevision === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "savedRevision"},message:"must have required property '"+"savedRevision"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.canvas === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "canvas"},message:"must have required property '"+"canvas"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data.inputAssetIds === undefined){
const err9 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "inputAssetIds"},message:"must have required property '"+"inputAssetIds"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(data.assets === undefined){
const err10 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "assets"},message:"must have required property '"+"assets"+"'"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(data.parts === undefined){
const err11 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "parts"},message:"must have required property '"+"parts"+"'"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data.groups === undefined){
const err12 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "groups"},message:"must have required property '"+"groups"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(data.parameters === undefined){
const err13 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "parameters"},message:"must have required property '"+"parameters"+"'"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(data.partBindings === undefined){
const err14 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "partBindings"},message:"must have required property '"+"partBindings"+"'"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if(data.inputBindings === undefined){
const err15 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "inputBindings"},message:"must have required property '"+"inputBindings"+"'"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(data.expressions === undefined){
const err16 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "expressions"},message:"must have required property '"+"expressions"+"'"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(data.runtimeProfile === undefined){
const err17 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "runtimeProfile"},message:"must have required property '"+"runtimeProfile"+"'"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(data.broadcastProfiles === undefined){
const err18 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "broadcastProfiles"},message:"must have required property '"+"broadcastProfiles"+"'"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(data.exportProfiles === undefined){
const err19 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "exportProfiles"},message:"must have required property '"+"exportProfiles"+"'"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(data.provenance === undefined){
const err20 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "provenance"},message:"must have required property '"+"provenance"+"'"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(data.derivedProjects === undefined){
const err21 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "derivedProjects"},message:"must have required property '"+"derivedProjects"+"'"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema31.properties, key0))){
const err22 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data.projectId !== undefined){
let data0 = data.projectId;
if(typeof data0 === "string"){
if(func2(data0) > 64){
const err23 = {instancePath:instancePath+"/projectId",schemaPath:"#/properties/projectId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
if(func2(data0) < 1){
const err24 = {instancePath:instancePath+"/projectId",schemaPath:"#/properties/projectId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if(!pattern4.test(data0)){
const err25 = {instancePath:instancePath+"/projectId",schemaPath:"#/properties/projectId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
else {
const err26 = {instancePath:instancePath+"/projectId",schemaPath:"#/properties/projectId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
if(data.schemaVersion !== undefined){
let data1 = data.schemaVersion;
if(data1 && typeof data1 == "object" && !Array.isArray(data1)){
if(data1.major === undefined){
const err27 = {instancePath:instancePath+"/schemaVersion",schemaPath:"#/properties/schemaVersion/required",keyword:"required",params:{missingProperty: "major"},message:"must have required property '"+"major"+"'"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if(data1.minor === undefined){
const err28 = {instancePath:instancePath+"/schemaVersion",schemaPath:"#/properties/schemaVersion/required",keyword:"required",params:{missingProperty: "minor"},message:"must have required property '"+"minor"+"'"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
for(const key1 in data1){
if(!((key1 === "major") || (key1 === "minor"))){
const err29 = {instancePath:instancePath+"/schemaVersion",schemaPath:"#/properties/schemaVersion/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
if(data1.major !== undefined){
if(1 !== data1.major){
const err30 = {instancePath:instancePath+"/schemaVersion/major",schemaPath:"#/properties/schemaVersion/properties/major/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data1.minor !== undefined){
let data3 = data1.minor;
if(!((((data3 === 0) || (data3 === 1)) || (data3 === 2)) || (data3 === 3))){
const err31 = {instancePath:instancePath+"/schemaVersion/minor",schemaPath:"#/properties/schemaVersion/properties/minor/enum",keyword:"enum",params:{allowedValues: schema31.properties.schemaVersion.properties.minor.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
}
else {
const err32 = {instancePath:instancePath+"/schemaVersion",schemaPath:"#/properties/schemaVersion/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
if(data.displayName !== undefined){
let data4 = data.displayName;
if(typeof data4 === "string"){
if(func2(data4) > 120){
const err33 = {instancePath:instancePath+"/displayName",schemaPath:"#/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
if(func2(data4) < 1){
const err34 = {instancePath:instancePath+"/displayName",schemaPath:"#/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
else {
const err35 = {instancePath:instancePath+"/displayName",schemaPath:"#/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
if(data.sourceType !== undefined){
let data5 = data.sourceType;
if(!(((data5 === "parts") || (data5 === "single-image")) || (data5 === "split-image"))){
const err36 = {instancePath:instancePath+"/sourceType",schemaPath:"#/properties/sourceType/enum",keyword:"enum",params:{allowedValues: schema31.properties.sourceType.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(data.createdAt !== undefined){
let data6 = data.createdAt;
if(typeof data6 === "string"){
if(func2(data6) > 24){
const err37 = {instancePath:instancePath+"/createdAt",schemaPath:"#/properties/createdAt/maxLength",keyword:"maxLength",params:{limit: 24},message:"must NOT have more than 24 characters"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
if(func2(data6) < 1){
const err38 = {instancePath:instancePath+"/createdAt",schemaPath:"#/properties/createdAt/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
if(!pattern5.test(data6)){
const err39 = {instancePath:instancePath+"/createdAt",schemaPath:"#/properties/createdAt/pattern",keyword:"pattern",params:{pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"},message:"must match pattern \""+"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"+"\""};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
else {
const err40 = {instancePath:instancePath+"/createdAt",schemaPath:"#/properties/createdAt/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
if(data.modifiedAt !== undefined){
let data7 = data.modifiedAt;
if(typeof data7 === "string"){
if(func2(data7) > 24){
const err41 = {instancePath:instancePath+"/modifiedAt",schemaPath:"#/properties/modifiedAt/maxLength",keyword:"maxLength",params:{limit: 24},message:"must NOT have more than 24 characters"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
if(func2(data7) < 1){
const err42 = {instancePath:instancePath+"/modifiedAt",schemaPath:"#/properties/modifiedAt/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
if(!pattern5.test(data7)){
const err43 = {instancePath:instancePath+"/modifiedAt",schemaPath:"#/properties/modifiedAt/pattern",keyword:"pattern",params:{pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"},message:"must match pattern \""+"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"+"\""};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
else {
const err44 = {instancePath:instancePath+"/modifiedAt",schemaPath:"#/properties/modifiedAt/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
if(data.revision !== undefined){
let data8 = data.revision;
if(!(((typeof data8 == "number") && (!(data8 % 1) && !isNaN(data8))) && (isFinite(data8)))){
const err45 = {instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
if((typeof data8 == "number") && (isFinite(data8))){
if(data8 > 9007199254740991 || isNaN(data8)){
const err46 = {instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
if(data8 < 0 || isNaN(data8)){
const err47 = {instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
}
}
if(data.savedRevision !== undefined){
let data9 = data.savedRevision;
const _errs19 = errors;
let valid2 = false;
const _errs20 = errors;
if(!(((typeof data9 == "number") && (!(data9 % 1) && !isNaN(data9))) && (isFinite(data9)))){
const err48 = {instancePath:instancePath+"/savedRevision",schemaPath:"#/properties/savedRevision/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
if((typeof data9 == "number") && (isFinite(data9))){
if(data9 > 9007199254740991 || isNaN(data9)){
const err49 = {instancePath:instancePath+"/savedRevision",schemaPath:"#/properties/savedRevision/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
if(data9 < 0 || isNaN(data9)){
const err50 = {instancePath:instancePath+"/savedRevision",schemaPath:"#/properties/savedRevision/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
}
var _valid0 = _errs20 === errors;
valid2 = valid2 || _valid0;
const _errs22 = errors;
if(data9 !== null){
const err51 = {instancePath:instancePath+"/savedRevision",schemaPath:"#/properties/savedRevision/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
var _valid0 = _errs22 === errors;
valid2 = valid2 || _valid0;
if(!valid2){
const err52 = {instancePath:instancePath+"/savedRevision",schemaPath:"#/properties/savedRevision/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
else {
errors = _errs19;
if(vErrors !== null){
if(_errs19){
vErrors.length = _errs19;
}
else {
vErrors = null;
}
}
}
}
if(data.canvas !== undefined){
let data10 = data.canvas;
if(data10 && typeof data10 == "object" && !Array.isArray(data10)){
if(data10.width === undefined){
const err53 = {instancePath:instancePath+"/canvas",schemaPath:"#/properties/canvas/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
if(data10.height === undefined){
const err54 = {instancePath:instancePath+"/canvas",schemaPath:"#/properties/canvas/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
for(const key2 in data10){
if(!((key2 === "width") || (key2 === "height"))){
const err55 = {instancePath:instancePath+"/canvas",schemaPath:"#/properties/canvas/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
}
}
if(data10.width !== undefined){
let data11 = data10.width;
if(!(((typeof data11 == "number") && (!(data11 % 1) && !isNaN(data11))) && (isFinite(data11)))){
const err56 = {instancePath:instancePath+"/canvas/width",schemaPath:"#/properties/canvas/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
if((typeof data11 == "number") && (isFinite(data11))){
if(data11 > 4096 || isNaN(data11)){
const err57 = {instancePath:instancePath+"/canvas/width",schemaPath:"#/properties/canvas/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
if(data11 < 1 || isNaN(data11)){
const err58 = {instancePath:instancePath+"/canvas/width",schemaPath:"#/properties/canvas/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
}
}
if(data10.height !== undefined){
let data12 = data10.height;
if(!(((typeof data12 == "number") && (!(data12 % 1) && !isNaN(data12))) && (isFinite(data12)))){
const err59 = {instancePath:instancePath+"/canvas/height",schemaPath:"#/properties/canvas/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
if((typeof data12 == "number") && (isFinite(data12))){
if(data12 > 4096 || isNaN(data12)){
const err60 = {instancePath:instancePath+"/canvas/height",schemaPath:"#/properties/canvas/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
if(data12 < 1 || isNaN(data12)){
const err61 = {instancePath:instancePath+"/canvas/height",schemaPath:"#/properties/canvas/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err61];
}
else {
vErrors.push(err61);
}
errors++;
}
}
}
}
else {
const err62 = {instancePath:instancePath+"/canvas",schemaPath:"#/properties/canvas/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err62];
}
else {
vErrors.push(err62);
}
errors++;
}
}
if(data.inputAssetIds !== undefined){
let data13 = data.inputAssetIds;
if(Array.isArray(data13)){
if(data13.length > 1024){
const err63 = {instancePath:instancePath+"/inputAssetIds",schemaPath:"#/properties/inputAssetIds/maxItems",keyword:"maxItems",params:{limit: 1024},message:"must NOT have more than 1024 items"};
if(vErrors === null){
vErrors = [err63];
}
else {
vErrors.push(err63);
}
errors++;
}
const len0 = data13.length;
for(let i0=0; i0<len0; i0++){
let data14 = data13[i0];
if(typeof data14 === "string"){
if(func2(data14) > 64){
const err64 = {instancePath:instancePath+"/inputAssetIds/" + i0,schemaPath:"#/properties/inputAssetIds/items/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err64];
}
else {
vErrors.push(err64);
}
errors++;
}
if(func2(data14) < 1){
const err65 = {instancePath:instancePath+"/inputAssetIds/" + i0,schemaPath:"#/properties/inputAssetIds/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err65];
}
else {
vErrors.push(err65);
}
errors++;
}
if(!pattern4.test(data14)){
const err66 = {instancePath:instancePath+"/inputAssetIds/" + i0,schemaPath:"#/properties/inputAssetIds/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err66];
}
else {
vErrors.push(err66);
}
errors++;
}
}
else {
const err67 = {instancePath:instancePath+"/inputAssetIds/" + i0,schemaPath:"#/properties/inputAssetIds/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err67];
}
else {
vErrors.push(err67);
}
errors++;
}
}
let i1 = data13.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data13[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err68 = {instancePath:instancePath+"/inputAssetIds",schemaPath:"#/properties/inputAssetIds/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err68];
}
else {
vErrors.push(err68);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err69 = {instancePath:instancePath+"/inputAssetIds",schemaPath:"#/properties/inputAssetIds/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err69];
}
else {
vErrors.push(err69);
}
errors++;
}
}
if(data.assets !== undefined){
let data15 = data.assets;
if(Array.isArray(data15)){
if(data15.length > 1024){
const err70 = {instancePath:instancePath+"/assets",schemaPath:"#/properties/assets/maxItems",keyword:"maxItems",params:{limit: 1024},message:"must NOT have more than 1024 items"};
if(vErrors === null){
vErrors = [err70];
}
else {
vErrors.push(err70);
}
errors++;
}
const len1 = data15.length;
for(let i2=0; i2<len1; i2++){
let data16 = data15[i2];
if(data16 && typeof data16 == "object" && !Array.isArray(data16)){
if(data16.id === undefined){
const err71 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err71];
}
else {
vErrors.push(err71);
}
errors++;
}
if(data16.kind === undefined){
const err72 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err72];
}
else {
vErrors.push(err72);
}
errors++;
}
if(data16.origin === undefined){
const err73 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/required",keyword:"required",params:{missingProperty: "origin"},message:"must have required property '"+"origin"+"'"};
if(vErrors === null){
vErrors = [err73];
}
else {
vErrors.push(err73);
}
errors++;
}
if(data16.parentAssetIds === undefined){
const err74 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/required",keyword:"required",params:{missingProperty: "parentAssetIds"},message:"must have required property '"+"parentAssetIds"+"'"};
if(vErrors === null){
vErrors = [err74];
}
else {
vErrors.push(err74);
}
errors++;
}
if(data16.storage === undefined){
const err75 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/required",keyword:"required",params:{missingProperty: "storage"},message:"must have required property '"+"storage"+"'"};
if(vErrors === null){
vErrors = [err75];
}
else {
vErrors.push(err75);
}
errors++;
}
if(data16.fingerprint === undefined){
const err76 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/required",keyword:"required",params:{missingProperty: "fingerprint"},message:"must have required property '"+"fingerprint"+"'"};
if(vErrors === null){
vErrors = [err76];
}
else {
vErrors.push(err76);
}
errors++;
}
if(data16.version === undefined){
const err77 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err77];
}
else {
vErrors.push(err77);
}
errors++;
}
if(data16.mediaType === undefined){
const err78 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/required",keyword:"required",params:{missingProperty: "mediaType"},message:"must have required property '"+"mediaType"+"'"};
if(vErrors === null){
vErrors = [err78];
}
else {
vErrors.push(err78);
}
errors++;
}
if(data16.dimensions === undefined){
const err79 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/required",keyword:"required",params:{missingProperty: "dimensions"},message:"must have required property '"+"dimensions"+"'"};
if(vErrors === null){
vErrors = [err79];
}
else {
vErrors.push(err79);
}
errors++;
}
if(data16.sourceRegion === undefined){
const err80 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/required",keyword:"required",params:{missingProperty: "sourceRegion"},message:"must have required property '"+"sourceRegion"+"'"};
if(vErrors === null){
vErrors = [err80];
}
else {
vErrors.push(err80);
}
errors++;
}
if(data16.sourceToEdited === undefined){
const err81 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/required",keyword:"required",params:{missingProperty: "sourceToEdited"},message:"must have required property '"+"sourceToEdited"+"'"};
if(vErrors === null){
vErrors = [err81];
}
else {
vErrors.push(err81);
}
errors++;
}
if(data16.colorSpace === undefined){
const err82 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/required",keyword:"required",params:{missingProperty: "colorSpace"},message:"must have required property '"+"colorSpace"+"'"};
if(vErrors === null){
vErrors = [err82];
}
else {
vErrors.push(err82);
}
errors++;
}
if(data16.alphaMode === undefined){
const err83 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/required",keyword:"required",params:{missingProperty: "alphaMode"},message:"must have required property '"+"alphaMode"+"'"};
if(vErrors === null){
vErrors = [err83];
}
else {
vErrors.push(err83);
}
errors++;
}
if(data16.producer === undefined){
const err84 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/required",keyword:"required",params:{missingProperty: "producer"},message:"must have required property '"+"producer"+"'"};
if(vErrors === null){
vErrors = [err84];
}
else {
vErrors.push(err84);
}
errors++;
}
if(data16.attribution === undefined){
const err85 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/required",keyword:"required",params:{missingProperty: "attribution"},message:"must have required property '"+"attribution"+"'"};
if(vErrors === null){
vErrors = [err85];
}
else {
vErrors.push(err85);
}
errors++;
}
for(const key3 in data16){
if(!(func1.call(schema31.properties.assets.items.properties, key3))){
const err86 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err86];
}
else {
vErrors.push(err86);
}
errors++;
}
}
if(data16.id !== undefined){
let data17 = data16.id;
if(typeof data17 === "string"){
if(func2(data17) > 64){
const err87 = {instancePath:instancePath+"/assets/" + i2+"/id",schemaPath:"#/properties/assets/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err87];
}
else {
vErrors.push(err87);
}
errors++;
}
if(func2(data17) < 1){
const err88 = {instancePath:instancePath+"/assets/" + i2+"/id",schemaPath:"#/properties/assets/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err88];
}
else {
vErrors.push(err88);
}
errors++;
}
if(!pattern4.test(data17)){
const err89 = {instancePath:instancePath+"/assets/" + i2+"/id",schemaPath:"#/properties/assets/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err89];
}
else {
vErrors.push(err89);
}
errors++;
}
}
else {
const err90 = {instancePath:instancePath+"/assets/" + i2+"/id",schemaPath:"#/properties/assets/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err90];
}
else {
vErrors.push(err90);
}
errors++;
}
}
if(data16.kind !== undefined){
let data18 = data16.kind;
if(!((((data18 === "original-image") || (data18 === "part-texture")) || (data18 === "supplement-image")) || (data18 === "edited-image"))){
const err91 = {instancePath:instancePath+"/assets/" + i2+"/kind",schemaPath:"#/properties/assets/items/properties/kind/enum",keyword:"enum",params:{allowedValues: schema31.properties.assets.items.properties.kind.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err91];
}
else {
vErrors.push(err91);
}
errors++;
}
}
if(data16.origin !== undefined){
let data19 = data16.origin;
if(!((((((data19 === "imported") || (data19 === "bundled")) || (data19 === "auto-preparation")) || (data19 === "auto-completion")) || (data19 === "manual-edit")) || (data19 === "generated"))){
const err92 = {instancePath:instancePath+"/assets/" + i2+"/origin",schemaPath:"#/properties/assets/items/properties/origin/enum",keyword:"enum",params:{allowedValues: schema31.properties.assets.items.properties.origin.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err92];
}
else {
vErrors.push(err92);
}
errors++;
}
}
if(data16.parentAssetIds !== undefined){
let data20 = data16.parentAssetIds;
if(Array.isArray(data20)){
if(data20.length > 1024){
const err93 = {instancePath:instancePath+"/assets/" + i2+"/parentAssetIds",schemaPath:"#/properties/assets/items/properties/parentAssetIds/maxItems",keyword:"maxItems",params:{limit: 1024},message:"must NOT have more than 1024 items"};
if(vErrors === null){
vErrors = [err93];
}
else {
vErrors.push(err93);
}
errors++;
}
const len2 = data20.length;
for(let i3=0; i3<len2; i3++){
let data21 = data20[i3];
if(typeof data21 === "string"){
if(func2(data21) > 64){
const err94 = {instancePath:instancePath+"/assets/" + i2+"/parentAssetIds/" + i3,schemaPath:"#/properties/assets/items/properties/parentAssetIds/items/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err94];
}
else {
vErrors.push(err94);
}
errors++;
}
if(func2(data21) < 1){
const err95 = {instancePath:instancePath+"/assets/" + i2+"/parentAssetIds/" + i3,schemaPath:"#/properties/assets/items/properties/parentAssetIds/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err95];
}
else {
vErrors.push(err95);
}
errors++;
}
if(!pattern4.test(data21)){
const err96 = {instancePath:instancePath+"/assets/" + i2+"/parentAssetIds/" + i3,schemaPath:"#/properties/assets/items/properties/parentAssetIds/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err96];
}
else {
vErrors.push(err96);
}
errors++;
}
}
else {
const err97 = {instancePath:instancePath+"/assets/" + i2+"/parentAssetIds/" + i3,schemaPath:"#/properties/assets/items/properties/parentAssetIds/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err97];
}
else {
vErrors.push(err97);
}
errors++;
}
}
let i4 = data20.length;
let j1;
if(i4 > 1){
const indices1 = {};
for(;i4--;){
let item1 = data20[i4];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err98 = {instancePath:instancePath+"/assets/" + i2+"/parentAssetIds",schemaPath:"#/properties/assets/items/properties/parentAssetIds/uniqueItems",keyword:"uniqueItems",params:{i: i4, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i4+" are identical)"};
if(vErrors === null){
vErrors = [err98];
}
else {
vErrors.push(err98);
}
errors++;
break;
}
indices1[item1] = i4;
}
}
}
else {
const err99 = {instancePath:instancePath+"/assets/" + i2+"/parentAssetIds",schemaPath:"#/properties/assets/items/properties/parentAssetIds/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err99];
}
else {
vErrors.push(err99);
}
errors++;
}
}
if(data16.storage !== undefined){
let data22 = data16.storage;
if(data22 && typeof data22 == "object" && !Array.isArray(data22)){
if(data22.path === undefined){
const err100 = {instancePath:instancePath+"/assets/" + i2+"/storage",schemaPath:"#/properties/assets/items/properties/storage/required",keyword:"required",params:{missingProperty: "path"},message:"must have required property '"+"path"+"'"};
if(vErrors === null){
vErrors = [err100];
}
else {
vErrors.push(err100);
}
errors++;
}
for(const key4 in data22){
if(!(key4 === "path")){
const err101 = {instancePath:instancePath+"/assets/" + i2+"/storage",schemaPath:"#/properties/assets/items/properties/storage/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err101];
}
else {
vErrors.push(err101);
}
errors++;
}
}
if(data22.path !== undefined){
let data23 = data22.path;
if(typeof data23 === "string"){
if(func2(data23) > 240){
const err102 = {instancePath:instancePath+"/assets/" + i2+"/storage/path",schemaPath:"#/properties/assets/items/properties/storage/properties/path/maxLength",keyword:"maxLength",params:{limit: 240},message:"must NOT have more than 240 characters"};
if(vErrors === null){
vErrors = [err102];
}
else {
vErrors.push(err102);
}
errors++;
}
if(func2(data23) < 1){
const err103 = {instancePath:instancePath+"/assets/" + i2+"/storage/path",schemaPath:"#/properties/assets/items/properties/storage/properties/path/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err103];
}
else {
vErrors.push(err103);
}
errors++;
}
if(!pattern10.test(data23)){
const err104 = {instancePath:instancePath+"/assets/" + i2+"/storage/path",schemaPath:"#/properties/assets/items/properties/storage/properties/path/pattern",keyword:"pattern",params:{pattern: "^resources/"},message:"must match pattern \""+"^resources/"+"\""};
if(vErrors === null){
vErrors = [err104];
}
else {
vErrors.push(err104);
}
errors++;
}
}
else {
const err105 = {instancePath:instancePath+"/assets/" + i2+"/storage/path",schemaPath:"#/properties/assets/items/properties/storage/properties/path/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err105];
}
else {
vErrors.push(err105);
}
errors++;
}
}
}
else {
const err106 = {instancePath:instancePath+"/assets/" + i2+"/storage",schemaPath:"#/properties/assets/items/properties/storage/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err106];
}
else {
vErrors.push(err106);
}
errors++;
}
}
if(data16.fingerprint !== undefined){
let data24 = data16.fingerprint;
if(data24 && typeof data24 == "object" && !Array.isArray(data24)){
if(data24.sha256 === undefined){
const err107 = {instancePath:instancePath+"/assets/" + i2+"/fingerprint",schemaPath:"#/properties/assets/items/properties/fingerprint/required",keyword:"required",params:{missingProperty: "sha256"},message:"must have required property '"+"sha256"+"'"};
if(vErrors === null){
vErrors = [err107];
}
else {
vErrors.push(err107);
}
errors++;
}
if(data24.bytes === undefined){
const err108 = {instancePath:instancePath+"/assets/" + i2+"/fingerprint",schemaPath:"#/properties/assets/items/properties/fingerprint/required",keyword:"required",params:{missingProperty: "bytes"},message:"must have required property '"+"bytes"+"'"};
if(vErrors === null){
vErrors = [err108];
}
else {
vErrors.push(err108);
}
errors++;
}
for(const key5 in data24){
if(!((key5 === "sha256") || (key5 === "bytes"))){
const err109 = {instancePath:instancePath+"/assets/" + i2+"/fingerprint",schemaPath:"#/properties/assets/items/properties/fingerprint/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err109];
}
else {
vErrors.push(err109);
}
errors++;
}
}
if(data24.sha256 !== undefined){
let data25 = data24.sha256;
if(typeof data25 === "string"){
if(!pattern11.test(data25)){
const err110 = {instancePath:instancePath+"/assets/" + i2+"/fingerprint/sha256",schemaPath:"#/properties/assets/items/properties/fingerprint/properties/sha256/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""};
if(vErrors === null){
vErrors = [err110];
}
else {
vErrors.push(err110);
}
errors++;
}
}
else {
const err111 = {instancePath:instancePath+"/assets/" + i2+"/fingerprint/sha256",schemaPath:"#/properties/assets/items/properties/fingerprint/properties/sha256/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err111];
}
else {
vErrors.push(err111);
}
errors++;
}
}
if(data24.bytes !== undefined){
let data26 = data24.bytes;
if(!(((typeof data26 == "number") && (!(data26 % 1) && !isNaN(data26))) && (isFinite(data26)))){
const err112 = {instancePath:instancePath+"/assets/" + i2+"/fingerprint/bytes",schemaPath:"#/properties/assets/items/properties/fingerprint/properties/bytes/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err112];
}
else {
vErrors.push(err112);
}
errors++;
}
if((typeof data26 == "number") && (isFinite(data26))){
if(data26 > 536870912 || isNaN(data26)){
const err113 = {instancePath:instancePath+"/assets/" + i2+"/fingerprint/bytes",schemaPath:"#/properties/assets/items/properties/fingerprint/properties/bytes/maximum",keyword:"maximum",params:{comparison: "<=", limit: 536870912},message:"must be <= 536870912"};
if(vErrors === null){
vErrors = [err113];
}
else {
vErrors.push(err113);
}
errors++;
}
if(data26 < 1 || isNaN(data26)){
const err114 = {instancePath:instancePath+"/assets/" + i2+"/fingerprint/bytes",schemaPath:"#/properties/assets/items/properties/fingerprint/properties/bytes/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err114];
}
else {
vErrors.push(err114);
}
errors++;
}
}
}
}
else {
const err115 = {instancePath:instancePath+"/assets/" + i2+"/fingerprint",schemaPath:"#/properties/assets/items/properties/fingerprint/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err115];
}
else {
vErrors.push(err115);
}
errors++;
}
}
if(data16.version !== undefined){
let data27 = data16.version;
if(!(((typeof data27 == "number") && (!(data27 % 1) && !isNaN(data27))) && (isFinite(data27)))){
const err116 = {instancePath:instancePath+"/assets/" + i2+"/version",schemaPath:"#/properties/assets/items/properties/version/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err116];
}
else {
vErrors.push(err116);
}
errors++;
}
if((typeof data27 == "number") && (isFinite(data27))){
if(data27 > 9007199254740991 || isNaN(data27)){
const err117 = {instancePath:instancePath+"/assets/" + i2+"/version",schemaPath:"#/properties/assets/items/properties/version/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err117];
}
else {
vErrors.push(err117);
}
errors++;
}
if(data27 < 1 || isNaN(data27)){
const err118 = {instancePath:instancePath+"/assets/" + i2+"/version",schemaPath:"#/properties/assets/items/properties/version/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err118];
}
else {
vErrors.push(err118);
}
errors++;
}
}
}
if(data16.mediaType !== undefined){
let data28 = data16.mediaType;
if(!((data28 === "image/png") || (data28 === "image/jpeg"))){
const err119 = {instancePath:instancePath+"/assets/" + i2+"/mediaType",schemaPath:"#/properties/assets/items/properties/mediaType/enum",keyword:"enum",params:{allowedValues: schema31.properties.assets.items.properties.mediaType.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err119];
}
else {
vErrors.push(err119);
}
errors++;
}
}
if(data16.dimensions !== undefined){
let data29 = data16.dimensions;
if(data29 && typeof data29 == "object" && !Array.isArray(data29)){
if(data29.width === undefined){
const err120 = {instancePath:instancePath+"/assets/" + i2+"/dimensions",schemaPath:"#/properties/assets/items/properties/dimensions/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err120];
}
else {
vErrors.push(err120);
}
errors++;
}
if(data29.height === undefined){
const err121 = {instancePath:instancePath+"/assets/" + i2+"/dimensions",schemaPath:"#/properties/assets/items/properties/dimensions/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err121];
}
else {
vErrors.push(err121);
}
errors++;
}
for(const key6 in data29){
if(!((key6 === "width") || (key6 === "height"))){
const err122 = {instancePath:instancePath+"/assets/" + i2+"/dimensions",schemaPath:"#/properties/assets/items/properties/dimensions/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key6},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err122];
}
else {
vErrors.push(err122);
}
errors++;
}
}
if(data29.width !== undefined){
let data30 = data29.width;
if(!(((typeof data30 == "number") && (!(data30 % 1) && !isNaN(data30))) && (isFinite(data30)))){
const err123 = {instancePath:instancePath+"/assets/" + i2+"/dimensions/width",schemaPath:"#/properties/assets/items/properties/dimensions/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err123];
}
else {
vErrors.push(err123);
}
errors++;
}
if((typeof data30 == "number") && (isFinite(data30))){
if(data30 > 4096 || isNaN(data30)){
const err124 = {instancePath:instancePath+"/assets/" + i2+"/dimensions/width",schemaPath:"#/properties/assets/items/properties/dimensions/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err124];
}
else {
vErrors.push(err124);
}
errors++;
}
if(data30 < 1 || isNaN(data30)){
const err125 = {instancePath:instancePath+"/assets/" + i2+"/dimensions/width",schemaPath:"#/properties/assets/items/properties/dimensions/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err125];
}
else {
vErrors.push(err125);
}
errors++;
}
}
}
if(data29.height !== undefined){
let data31 = data29.height;
if(!(((typeof data31 == "number") && (!(data31 % 1) && !isNaN(data31))) && (isFinite(data31)))){
const err126 = {instancePath:instancePath+"/assets/" + i2+"/dimensions/height",schemaPath:"#/properties/assets/items/properties/dimensions/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err126];
}
else {
vErrors.push(err126);
}
errors++;
}
if((typeof data31 == "number") && (isFinite(data31))){
if(data31 > 4096 || isNaN(data31)){
const err127 = {instancePath:instancePath+"/assets/" + i2+"/dimensions/height",schemaPath:"#/properties/assets/items/properties/dimensions/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err127];
}
else {
vErrors.push(err127);
}
errors++;
}
if(data31 < 1 || isNaN(data31)){
const err128 = {instancePath:instancePath+"/assets/" + i2+"/dimensions/height",schemaPath:"#/properties/assets/items/properties/dimensions/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err128];
}
else {
vErrors.push(err128);
}
errors++;
}
}
}
}
else {
const err129 = {instancePath:instancePath+"/assets/" + i2+"/dimensions",schemaPath:"#/properties/assets/items/properties/dimensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err129];
}
else {
vErrors.push(err129);
}
errors++;
}
}
if(data16.sourceRegion !== undefined){
let data32 = data16.sourceRegion;
if(data32 && typeof data32 == "object" && !Array.isArray(data32)){
if(data32.x === undefined){
const err130 = {instancePath:instancePath+"/assets/" + i2+"/sourceRegion",schemaPath:"#/properties/assets/items/properties/sourceRegion/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err130];
}
else {
vErrors.push(err130);
}
errors++;
}
if(data32.y === undefined){
const err131 = {instancePath:instancePath+"/assets/" + i2+"/sourceRegion",schemaPath:"#/properties/assets/items/properties/sourceRegion/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err131];
}
else {
vErrors.push(err131);
}
errors++;
}
if(data32.width === undefined){
const err132 = {instancePath:instancePath+"/assets/" + i2+"/sourceRegion",schemaPath:"#/properties/assets/items/properties/sourceRegion/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err132];
}
else {
vErrors.push(err132);
}
errors++;
}
if(data32.height === undefined){
const err133 = {instancePath:instancePath+"/assets/" + i2+"/sourceRegion",schemaPath:"#/properties/assets/items/properties/sourceRegion/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err133];
}
else {
vErrors.push(err133);
}
errors++;
}
for(const key7 in data32){
if(!((((key7 === "x") || (key7 === "y")) || (key7 === "width")) || (key7 === "height"))){
const err134 = {instancePath:instancePath+"/assets/" + i2+"/sourceRegion",schemaPath:"#/properties/assets/items/properties/sourceRegion/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key7},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err134];
}
else {
vErrors.push(err134);
}
errors++;
}
}
if(data32.x !== undefined){
let data33 = data32.x;
if(!((typeof data33 == "number") && (isFinite(data33)))){
const err135 = {instancePath:instancePath+"/assets/" + i2+"/sourceRegion/x",schemaPath:"#/properties/assets/items/properties/sourceRegion/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err135];
}
else {
vErrors.push(err135);
}
errors++;
}
}
if(data32.y !== undefined){
let data34 = data32.y;
if(!((typeof data34 == "number") && (isFinite(data34)))){
const err136 = {instancePath:instancePath+"/assets/" + i2+"/sourceRegion/y",schemaPath:"#/properties/assets/items/properties/sourceRegion/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err136];
}
else {
vErrors.push(err136);
}
errors++;
}
}
if(data32.width !== undefined){
let data35 = data32.width;
if((typeof data35 == "number") && (isFinite(data35))){
if(data35 <= 0 || isNaN(data35)){
const err137 = {instancePath:instancePath+"/assets/" + i2+"/sourceRegion/width",schemaPath:"#/properties/assets/items/properties/sourceRegion/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err137];
}
else {
vErrors.push(err137);
}
errors++;
}
}
else {
const err138 = {instancePath:instancePath+"/assets/" + i2+"/sourceRegion/width",schemaPath:"#/properties/assets/items/properties/sourceRegion/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err138];
}
else {
vErrors.push(err138);
}
errors++;
}
}
if(data32.height !== undefined){
let data36 = data32.height;
if((typeof data36 == "number") && (isFinite(data36))){
if(data36 <= 0 || isNaN(data36)){
const err139 = {instancePath:instancePath+"/assets/" + i2+"/sourceRegion/height",schemaPath:"#/properties/assets/items/properties/sourceRegion/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err139];
}
else {
vErrors.push(err139);
}
errors++;
}
}
else {
const err140 = {instancePath:instancePath+"/assets/" + i2+"/sourceRegion/height",schemaPath:"#/properties/assets/items/properties/sourceRegion/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err140];
}
else {
vErrors.push(err140);
}
errors++;
}
}
}
else {
const err141 = {instancePath:instancePath+"/assets/" + i2+"/sourceRegion",schemaPath:"#/properties/assets/items/properties/sourceRegion/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err141];
}
else {
vErrors.push(err141);
}
errors++;
}
}
if(data16.sourceToEdited !== undefined){
let data37 = data16.sourceToEdited;
if(Array.isArray(data37)){
if(data37.length > 6){
const err142 = {instancePath:instancePath+"/assets/" + i2+"/sourceToEdited",schemaPath:"#/properties/assets/items/properties/sourceToEdited/maxItems",keyword:"maxItems",params:{limit: 6},message:"must NOT have more than 6 items"};
if(vErrors === null){
vErrors = [err142];
}
else {
vErrors.push(err142);
}
errors++;
}
if(data37.length < 6){
const err143 = {instancePath:instancePath+"/assets/" + i2+"/sourceToEdited",schemaPath:"#/properties/assets/items/properties/sourceToEdited/minItems",keyword:"minItems",params:{limit: 6},message:"must NOT have fewer than 6 items"};
if(vErrors === null){
vErrors = [err143];
}
else {
vErrors.push(err143);
}
errors++;
}
const len3 = data37.length;
for(let i5=0; i5<len3; i5++){
let data38 = data37[i5];
if(!((typeof data38 == "number") && (isFinite(data38)))){
const err144 = {instancePath:instancePath+"/assets/" + i2+"/sourceToEdited/" + i5,schemaPath:"#/properties/assets/items/properties/sourceToEdited/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err144];
}
else {
vErrors.push(err144);
}
errors++;
}
}
}
else {
const err145 = {instancePath:instancePath+"/assets/" + i2+"/sourceToEdited",schemaPath:"#/properties/assets/items/properties/sourceToEdited/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err145];
}
else {
vErrors.push(err145);
}
errors++;
}
}
if(data16.colorSpace !== undefined){
let data39 = data16.colorSpace;
if(!((data39 === "srgb") || (data39 === "unknown"))){
const err146 = {instancePath:instancePath+"/assets/" + i2+"/colorSpace",schemaPath:"#/properties/assets/items/properties/colorSpace/enum",keyword:"enum",params:{allowedValues: schema31.properties.assets.items.properties.colorSpace.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err146];
}
else {
vErrors.push(err146);
}
errors++;
}
}
if(data16.alphaMode !== undefined){
let data40 = data16.alphaMode;
if(!(((data40 === "straight") || (data40 === "premultiplied")) || (data40 === "opaque"))){
const err147 = {instancePath:instancePath+"/assets/" + i2+"/alphaMode",schemaPath:"#/properties/assets/items/properties/alphaMode/enum",keyword:"enum",params:{allowedValues: schema31.properties.assets.items.properties.alphaMode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err147];
}
else {
vErrors.push(err147);
}
errors++;
}
}
if(data16.producer !== undefined){
let data41 = data16.producer;
if(data41 && typeof data41 == "object" && !Array.isArray(data41)){
if(data41.name === undefined){
const err148 = {instancePath:instancePath+"/assets/" + i2+"/producer",schemaPath:"#/properties/assets/items/properties/producer/required",keyword:"required",params:{missingProperty: "name"},message:"must have required property '"+"name"+"'"};
if(vErrors === null){
vErrors = [err148];
}
else {
vErrors.push(err148);
}
errors++;
}
if(data41.version === undefined){
const err149 = {instancePath:instancePath+"/assets/" + i2+"/producer",schemaPath:"#/properties/assets/items/properties/producer/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err149];
}
else {
vErrors.push(err149);
}
errors++;
}
for(const key8 in data41){
if(!((key8 === "name") || (key8 === "version"))){
const err150 = {instancePath:instancePath+"/assets/" + i2+"/producer",schemaPath:"#/properties/assets/items/properties/producer/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key8},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err150];
}
else {
vErrors.push(err150);
}
errors++;
}
}
if(data41.name !== undefined){
let data42 = data41.name;
if(typeof data42 === "string"){
if(func2(data42) > 120){
const err151 = {instancePath:instancePath+"/assets/" + i2+"/producer/name",schemaPath:"#/properties/assets/items/properties/producer/properties/name/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err151];
}
else {
vErrors.push(err151);
}
errors++;
}
if(func2(data42) < 1){
const err152 = {instancePath:instancePath+"/assets/" + i2+"/producer/name",schemaPath:"#/properties/assets/items/properties/producer/properties/name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err152];
}
else {
vErrors.push(err152);
}
errors++;
}
}
else {
const err153 = {instancePath:instancePath+"/assets/" + i2+"/producer/name",schemaPath:"#/properties/assets/items/properties/producer/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err153];
}
else {
vErrors.push(err153);
}
errors++;
}
}
if(data41.version !== undefined){
let data43 = data41.version;
if(typeof data43 === "string"){
if(func2(data43) > 32){
const err154 = {instancePath:instancePath+"/assets/" + i2+"/producer/version",schemaPath:"#/properties/assets/items/properties/producer/properties/version/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err154];
}
else {
vErrors.push(err154);
}
errors++;
}
if(func2(data43) < 1){
const err155 = {instancePath:instancePath+"/assets/" + i2+"/producer/version",schemaPath:"#/properties/assets/items/properties/producer/properties/version/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err155];
}
else {
vErrors.push(err155);
}
errors++;
}
if(!pattern12.test(data43)){
const err156 = {instancePath:instancePath+"/assets/" + i2+"/producer/version",schemaPath:"#/properties/assets/items/properties/producer/properties/version/pattern",keyword:"pattern",params:{pattern: "^\\d+\\.\\d+\\.\\d+$"},message:"must match pattern \""+"^\\d+\\.\\d+\\.\\d+$"+"\""};
if(vErrors === null){
vErrors = [err156];
}
else {
vErrors.push(err156);
}
errors++;
}
}
else {
const err157 = {instancePath:instancePath+"/assets/" + i2+"/producer/version",schemaPath:"#/properties/assets/items/properties/producer/properties/version/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err157];
}
else {
vErrors.push(err157);
}
errors++;
}
}
}
else {
const err158 = {instancePath:instancePath+"/assets/" + i2+"/producer",schemaPath:"#/properties/assets/items/properties/producer/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err158];
}
else {
vErrors.push(err158);
}
errors++;
}
}
if(data16.attribution !== undefined){
let data44 = data16.attribution;
if(data44 && typeof data44 == "object" && !Array.isArray(data44)){
if(data44.creator === undefined){
const err159 = {instancePath:instancePath+"/assets/" + i2+"/attribution",schemaPath:"#/properties/assets/items/properties/attribution/required",keyword:"required",params:{missingProperty: "creator"},message:"must have required property '"+"creator"+"'"};
if(vErrors === null){
vErrors = [err159];
}
else {
vErrors.push(err159);
}
errors++;
}
if(data44.source === undefined){
const err160 = {instancePath:instancePath+"/assets/" + i2+"/attribution",schemaPath:"#/properties/assets/items/properties/attribution/required",keyword:"required",params:{missingProperty: "source"},message:"must have required property '"+"source"+"'"};
if(vErrors === null){
vErrors = [err160];
}
else {
vErrors.push(err160);
}
errors++;
}
if(data44.usage === undefined){
const err161 = {instancePath:instancePath+"/assets/" + i2+"/attribution",schemaPath:"#/properties/assets/items/properties/attribution/required",keyword:"required",params:{missingProperty: "usage"},message:"must have required property '"+"usage"+"'"};
if(vErrors === null){
vErrors = [err161];
}
else {
vErrors.push(err161);
}
errors++;
}
if(data44.status === undefined){
const err162 = {instancePath:instancePath+"/assets/" + i2+"/attribution",schemaPath:"#/properties/assets/items/properties/attribution/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err162];
}
else {
vErrors.push(err162);
}
errors++;
}
for(const key9 in data44){
if(!((((key9 === "creator") || (key9 === "source")) || (key9 === "usage")) || (key9 === "status"))){
const err163 = {instancePath:instancePath+"/assets/" + i2+"/attribution",schemaPath:"#/properties/assets/items/properties/attribution/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key9},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err163];
}
else {
vErrors.push(err163);
}
errors++;
}
}
if(data44.creator !== undefined){
let data45 = data44.creator;
if(typeof data45 === "string"){
if(func2(data45) > 512){
const err164 = {instancePath:instancePath+"/assets/" + i2+"/attribution/creator",schemaPath:"#/properties/assets/items/properties/attribution/properties/creator/maxLength",keyword:"maxLength",params:{limit: 512},message:"must NOT have more than 512 characters"};
if(vErrors === null){
vErrors = [err164];
}
else {
vErrors.push(err164);
}
errors++;
}
if(func2(data45) < 1){
const err165 = {instancePath:instancePath+"/assets/" + i2+"/attribution/creator",schemaPath:"#/properties/assets/items/properties/attribution/properties/creator/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err165];
}
else {
vErrors.push(err165);
}
errors++;
}
}
else {
const err166 = {instancePath:instancePath+"/assets/" + i2+"/attribution/creator",schemaPath:"#/properties/assets/items/properties/attribution/properties/creator/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err166];
}
else {
vErrors.push(err166);
}
errors++;
}
}
if(data44.source !== undefined){
let data46 = data44.source;
if(typeof data46 === "string"){
if(func2(data46) > 512){
const err167 = {instancePath:instancePath+"/assets/" + i2+"/attribution/source",schemaPath:"#/properties/assets/items/properties/attribution/properties/source/maxLength",keyword:"maxLength",params:{limit: 512},message:"must NOT have more than 512 characters"};
if(vErrors === null){
vErrors = [err167];
}
else {
vErrors.push(err167);
}
errors++;
}
if(func2(data46) < 1){
const err168 = {instancePath:instancePath+"/assets/" + i2+"/attribution/source",schemaPath:"#/properties/assets/items/properties/attribution/properties/source/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err168];
}
else {
vErrors.push(err168);
}
errors++;
}
}
else {
const err169 = {instancePath:instancePath+"/assets/" + i2+"/attribution/source",schemaPath:"#/properties/assets/items/properties/attribution/properties/source/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err169];
}
else {
vErrors.push(err169);
}
errors++;
}
}
if(data44.usage !== undefined){
let data47 = data44.usage;
if(typeof data47 === "string"){
if(func2(data47) > 1024){
const err170 = {instancePath:instancePath+"/assets/" + i2+"/attribution/usage",schemaPath:"#/properties/assets/items/properties/attribution/properties/usage/maxLength",keyword:"maxLength",params:{limit: 1024},message:"must NOT have more than 1024 characters"};
if(vErrors === null){
vErrors = [err170];
}
else {
vErrors.push(err170);
}
errors++;
}
if(func2(data47) < 1){
const err171 = {instancePath:instancePath+"/assets/" + i2+"/attribution/usage",schemaPath:"#/properties/assets/items/properties/attribution/properties/usage/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err171];
}
else {
vErrors.push(err171);
}
errors++;
}
}
else {
const err172 = {instancePath:instancePath+"/assets/" + i2+"/attribution/usage",schemaPath:"#/properties/assets/items/properties/attribution/properties/usage/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err172];
}
else {
vErrors.push(err172);
}
errors++;
}
}
if(data44.status !== undefined){
let data48 = data44.status;
if(!((data48 === "verified") || (data48 === "unverified"))){
const err173 = {instancePath:instancePath+"/assets/" + i2+"/attribution/status",schemaPath:"#/properties/assets/items/properties/attribution/properties/status/enum",keyword:"enum",params:{allowedValues: schema31.properties.assets.items.properties.attribution.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err173];
}
else {
vErrors.push(err173);
}
errors++;
}
}
}
else {
const err174 = {instancePath:instancePath+"/assets/" + i2+"/attribution",schemaPath:"#/properties/assets/items/properties/attribution/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err174];
}
else {
vErrors.push(err174);
}
errors++;
}
}
}
else {
const err175 = {instancePath:instancePath+"/assets/" + i2,schemaPath:"#/properties/assets/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err175];
}
else {
vErrors.push(err175);
}
errors++;
}
}
}
else {
const err176 = {instancePath:instancePath+"/assets",schemaPath:"#/properties/assets/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err176];
}
else {
vErrors.push(err176);
}
errors++;
}
}
if(data.parts !== undefined){
let data49 = data.parts;
if(Array.isArray(data49)){
if(data49.length > 64){
const err177 = {instancePath:instancePath+"/parts",schemaPath:"#/properties/parts/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err177];
}
else {
vErrors.push(err177);
}
errors++;
}
const len4 = data49.length;
for(let i6=0; i6<len4; i6++){
let data50 = data49[i6];
if(data50 && typeof data50 == "object" && !Array.isArray(data50)){
if(data50.id === undefined){
const err178 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err178];
}
else {
vErrors.push(err178);
}
errors++;
}
if(data50.displayName === undefined){
const err179 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err179];
}
else {
vErrors.push(err179);
}
errors++;
}
if(data50.role === undefined){
const err180 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/required",keyword:"required",params:{missingProperty: "role"},message:"must have required property '"+"role"+"'"};
if(vErrors === null){
vErrors = [err180];
}
else {
vErrors.push(err180);
}
errors++;
}
if(data50.side === undefined){
const err181 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/required",keyword:"required",params:{missingProperty: "side"},message:"must have required property '"+"side"+"'"};
if(vErrors === null){
vErrors = [err181];
}
else {
vErrors.push(err181);
}
errors++;
}
if(data50.parentId === undefined){
const err182 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/required",keyword:"required",params:{missingProperty: "parentId"},message:"must have required property '"+"parentId"+"'"};
if(vErrors === null){
vErrors = [err182];
}
else {
vErrors.push(err182);
}
errors++;
}
if(data50.groupId === undefined){
const err183 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/required",keyword:"required",params:{missingProperty: "groupId"},message:"must have required property '"+"groupId"+"'"};
if(vErrors === null){
vErrors = [err183];
}
else {
vErrors.push(err183);
}
errors++;
}
if(data50.textures === undefined){
const err184 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/required",keyword:"required",params:{missingProperty: "textures"},message:"must have required property '"+"textures"+"'"};
if(vErrors === null){
vErrors = [err184];
}
else {
vErrors.push(err184);
}
errors++;
}
if(data50.localTransform === undefined){
const err185 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/required",keyword:"required",params:{missingProperty: "localTransform"},message:"must have required property '"+"localTransform"+"'"};
if(vErrors === null){
vErrors = [err185];
}
else {
vErrors.push(err185);
}
errors++;
}
if(data50.drawOrder === undefined){
const err186 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/required",keyword:"required",params:{missingProperty: "drawOrder"},message:"must have required property '"+"drawOrder"+"'"};
if(vErrors === null){
vErrors = [err186];
}
else {
vErrors.push(err186);
}
errors++;
}
if(data50.visible === undefined){
const err187 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/required",keyword:"required",params:{missingProperty: "visible"},message:"must have required property '"+"visible"+"'"};
if(vErrors === null){
vErrors = [err187];
}
else {
vErrors.push(err187);
}
errors++;
}
if(data50.opacity === undefined){
const err188 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/required",keyword:"required",params:{missingProperty: "opacity"},message:"must have required property '"+"opacity"+"'"};
if(vErrors === null){
vErrors = [err188];
}
else {
vErrors.push(err188);
}
errors++;
}
if(data50.correctionOrigin === undefined){
const err189 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/required",keyword:"required",params:{missingProperty: "correctionOrigin"},message:"must have required property '"+"correctionOrigin"+"'"};
if(vErrors === null){
vErrors = [err189];
}
else {
vErrors.push(err189);
}
errors++;
}
if(data50.limitations === undefined){
const err190 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/required",keyword:"required",params:{missingProperty: "limitations"},message:"must have required property '"+"limitations"+"'"};
if(vErrors === null){
vErrors = [err190];
}
else {
vErrors.push(err190);
}
errors++;
}
for(const key10 in data50){
if(!(func1.call(schema31.properties.parts.items.properties, key10))){
const err191 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key10},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err191];
}
else {
vErrors.push(err191);
}
errors++;
}
}
if(data50.id !== undefined){
let data51 = data50.id;
if(typeof data51 === "string"){
if(func2(data51) > 64){
const err192 = {instancePath:instancePath+"/parts/" + i6+"/id",schemaPath:"#/properties/parts/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err192];
}
else {
vErrors.push(err192);
}
errors++;
}
if(func2(data51) < 1){
const err193 = {instancePath:instancePath+"/parts/" + i6+"/id",schemaPath:"#/properties/parts/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err193];
}
else {
vErrors.push(err193);
}
errors++;
}
if(!pattern4.test(data51)){
const err194 = {instancePath:instancePath+"/parts/" + i6+"/id",schemaPath:"#/properties/parts/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err194];
}
else {
vErrors.push(err194);
}
errors++;
}
}
else {
const err195 = {instancePath:instancePath+"/parts/" + i6+"/id",schemaPath:"#/properties/parts/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err195];
}
else {
vErrors.push(err195);
}
errors++;
}
}
if(data50.displayName !== undefined){
let data52 = data50.displayName;
if(typeof data52 === "string"){
if(func2(data52) > 120){
const err196 = {instancePath:instancePath+"/parts/" + i6+"/displayName",schemaPath:"#/properties/parts/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err196];
}
else {
vErrors.push(err196);
}
errors++;
}
if(func2(data52) < 1){
const err197 = {instancePath:instancePath+"/parts/" + i6+"/displayName",schemaPath:"#/properties/parts/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err197];
}
else {
vErrors.push(err197);
}
errors++;
}
}
else {
const err198 = {instancePath:instancePath+"/parts/" + i6+"/displayName",schemaPath:"#/properties/parts/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err198];
}
else {
vErrors.push(err198);
}
errors++;
}
}
if(data50.role !== undefined){
let data53 = data50.role;
if(!(((((((((data53 === "base") || (data53 === "body")) || (data53 === "head")) || (data53 === "hair-front")) || (data53 === "hair-back")) || (data53 === "eye")) || (data53 === "mouth")) || (data53 === "accessory")) || (data53 === "custom"))){
const err199 = {instancePath:instancePath+"/parts/" + i6+"/role",schemaPath:"#/properties/parts/items/properties/role/enum",keyword:"enum",params:{allowedValues: schema31.properties.parts.items.properties.role.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err199];
}
else {
vErrors.push(err199);
}
errors++;
}
}
if(data50.side !== undefined){
let data54 = data50.side;
if(!((((data54 === "character-left") || (data54 === "character-right")) || (data54 === "center")) || (data54 === "none"))){
const err200 = {instancePath:instancePath+"/parts/" + i6+"/side",schemaPath:"#/properties/parts/items/properties/side/enum",keyword:"enum",params:{allowedValues: schema31.properties.parts.items.properties.side.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err200];
}
else {
vErrors.push(err200);
}
errors++;
}
}
if(data50.parentId !== undefined){
let data55 = data50.parentId;
const _errs116 = errors;
let valid24 = false;
const _errs117 = errors;
if(typeof data55 === "string"){
if(func2(data55) > 64){
const err201 = {instancePath:instancePath+"/parts/" + i6+"/parentId",schemaPath:"#/properties/parts/items/properties/parentId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err201];
}
else {
vErrors.push(err201);
}
errors++;
}
if(func2(data55) < 1){
const err202 = {instancePath:instancePath+"/parts/" + i6+"/parentId",schemaPath:"#/properties/parts/items/properties/parentId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err202];
}
else {
vErrors.push(err202);
}
errors++;
}
if(!pattern4.test(data55)){
const err203 = {instancePath:instancePath+"/parts/" + i6+"/parentId",schemaPath:"#/properties/parts/items/properties/parentId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err203];
}
else {
vErrors.push(err203);
}
errors++;
}
}
else {
const err204 = {instancePath:instancePath+"/parts/" + i6+"/parentId",schemaPath:"#/properties/parts/items/properties/parentId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err204];
}
else {
vErrors.push(err204);
}
errors++;
}
var _valid1 = _errs117 === errors;
valid24 = valid24 || _valid1;
const _errs119 = errors;
if(data55 !== null){
const err205 = {instancePath:instancePath+"/parts/" + i6+"/parentId",schemaPath:"#/properties/parts/items/properties/parentId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err205];
}
else {
vErrors.push(err205);
}
errors++;
}
var _valid1 = _errs119 === errors;
valid24 = valid24 || _valid1;
if(!valid24){
const err206 = {instancePath:instancePath+"/parts/" + i6+"/parentId",schemaPath:"#/properties/parts/items/properties/parentId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err206];
}
else {
vErrors.push(err206);
}
errors++;
}
else {
errors = _errs116;
if(vErrors !== null){
if(_errs116){
vErrors.length = _errs116;
}
else {
vErrors = null;
}
}
}
}
if(data50.groupId !== undefined){
let data56 = data50.groupId;
const _errs122 = errors;
let valid25 = false;
const _errs123 = errors;
if(typeof data56 === "string"){
if(func2(data56) > 64){
const err207 = {instancePath:instancePath+"/parts/" + i6+"/groupId",schemaPath:"#/properties/parts/items/properties/groupId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err207];
}
else {
vErrors.push(err207);
}
errors++;
}
if(func2(data56) < 1){
const err208 = {instancePath:instancePath+"/parts/" + i6+"/groupId",schemaPath:"#/properties/parts/items/properties/groupId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err208];
}
else {
vErrors.push(err208);
}
errors++;
}
if(!pattern4.test(data56)){
const err209 = {instancePath:instancePath+"/parts/" + i6+"/groupId",schemaPath:"#/properties/parts/items/properties/groupId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err209];
}
else {
vErrors.push(err209);
}
errors++;
}
}
else {
const err210 = {instancePath:instancePath+"/parts/" + i6+"/groupId",schemaPath:"#/properties/parts/items/properties/groupId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err210];
}
else {
vErrors.push(err210);
}
errors++;
}
var _valid2 = _errs123 === errors;
valid25 = valid25 || _valid2;
const _errs125 = errors;
if(data56 !== null){
const err211 = {instancePath:instancePath+"/parts/" + i6+"/groupId",schemaPath:"#/properties/parts/items/properties/groupId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err211];
}
else {
vErrors.push(err211);
}
errors++;
}
var _valid2 = _errs125 === errors;
valid25 = valid25 || _valid2;
if(!valid25){
const err212 = {instancePath:instancePath+"/parts/" + i6+"/groupId",schemaPath:"#/properties/parts/items/properties/groupId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err212];
}
else {
vErrors.push(err212);
}
errors++;
}
else {
errors = _errs122;
if(vErrors !== null){
if(_errs122){
vErrors.length = _errs122;
}
else {
vErrors = null;
}
}
}
}
if(data50.textures !== undefined){
let data57 = data50.textures;
if(Array.isArray(data57)){
if(data57.length > 32){
const err213 = {instancePath:instancePath+"/parts/" + i6+"/textures",schemaPath:"#/properties/parts/items/properties/textures/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err213];
}
else {
vErrors.push(err213);
}
errors++;
}
const len5 = data57.length;
for(let i7=0; i7<len5; i7++){
let data58 = data57[i7];
if(data58 && typeof data58 == "object" && !Array.isArray(data58)){
if(data58.state === undefined){
const err214 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7,schemaPath:"#/properties/parts/items/properties/textures/items/required",keyword:"required",params:{missingProperty: "state"},message:"must have required property '"+"state"+"'"};
if(vErrors === null){
vErrors = [err214];
}
else {
vErrors.push(err214);
}
errors++;
}
if(data58.assetId === undefined){
const err215 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7,schemaPath:"#/properties/parts/items/properties/textures/items/required",keyword:"required",params:{missingProperty: "assetId"},message:"must have required property '"+"assetId"+"'"};
if(vErrors === null){
vErrors = [err215];
}
else {
vErrors.push(err215);
}
errors++;
}
if(data58.assetVersion === undefined){
const err216 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7,schemaPath:"#/properties/parts/items/properties/textures/items/required",keyword:"required",params:{missingProperty: "assetVersion"},message:"must have required property '"+"assetVersion"+"'"};
if(vErrors === null){
vErrors = [err216];
}
else {
vErrors.push(err216);
}
errors++;
}
if(data58.assetToLocal === undefined){
const err217 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7,schemaPath:"#/properties/parts/items/properties/textures/items/required",keyword:"required",params:{missingProperty: "assetToLocal"},message:"must have required property '"+"assetToLocal"+"'"};
if(vErrors === null){
vErrors = [err217];
}
else {
vErrors.push(err217);
}
errors++;
}
for(const key11 in data58){
if(!((((key11 === "state") || (key11 === "assetId")) || (key11 === "assetVersion")) || (key11 === "assetToLocal"))){
const err218 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7,schemaPath:"#/properties/parts/items/properties/textures/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key11},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err218];
}
else {
vErrors.push(err218);
}
errors++;
}
}
if(data58.state !== undefined){
let data59 = data58.state;
if(typeof data59 === "string"){
if(func2(data59) > 32){
const err219 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7+"/state",schemaPath:"#/properties/parts/items/properties/textures/items/properties/state/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err219];
}
else {
vErrors.push(err219);
}
errors++;
}
if(func2(data59) < 1){
const err220 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7+"/state",schemaPath:"#/properties/parts/items/properties/textures/items/properties/state/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err220];
}
else {
vErrors.push(err220);
}
errors++;
}
if(!pattern16.test(data59)){
const err221 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7+"/state",schemaPath:"#/properties/parts/items/properties/textures/items/properties/state/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err221];
}
else {
vErrors.push(err221);
}
errors++;
}
}
else {
const err222 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7+"/state",schemaPath:"#/properties/parts/items/properties/textures/items/properties/state/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err222];
}
else {
vErrors.push(err222);
}
errors++;
}
}
if(data58.assetId !== undefined){
let data60 = data58.assetId;
if(typeof data60 === "string"){
if(func2(data60) > 64){
const err223 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7+"/assetId",schemaPath:"#/properties/parts/items/properties/textures/items/properties/assetId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err223];
}
else {
vErrors.push(err223);
}
errors++;
}
if(func2(data60) < 1){
const err224 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7+"/assetId",schemaPath:"#/properties/parts/items/properties/textures/items/properties/assetId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err224];
}
else {
vErrors.push(err224);
}
errors++;
}
if(!pattern4.test(data60)){
const err225 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7+"/assetId",schemaPath:"#/properties/parts/items/properties/textures/items/properties/assetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err225];
}
else {
vErrors.push(err225);
}
errors++;
}
}
else {
const err226 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7+"/assetId",schemaPath:"#/properties/parts/items/properties/textures/items/properties/assetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err226];
}
else {
vErrors.push(err226);
}
errors++;
}
}
if(data58.assetVersion !== undefined){
let data61 = data58.assetVersion;
if(!(((typeof data61 == "number") && (!(data61 % 1) && !isNaN(data61))) && (isFinite(data61)))){
const err227 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7+"/assetVersion",schemaPath:"#/properties/parts/items/properties/textures/items/properties/assetVersion/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err227];
}
else {
vErrors.push(err227);
}
errors++;
}
if((typeof data61 == "number") && (isFinite(data61))){
if(data61 > 9007199254740991 || isNaN(data61)){
const err228 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7+"/assetVersion",schemaPath:"#/properties/parts/items/properties/textures/items/properties/assetVersion/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err228];
}
else {
vErrors.push(err228);
}
errors++;
}
if(data61 < 1 || isNaN(data61)){
const err229 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7+"/assetVersion",schemaPath:"#/properties/parts/items/properties/textures/items/properties/assetVersion/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err229];
}
else {
vErrors.push(err229);
}
errors++;
}
}
}
if(data58.assetToLocal !== undefined){
let data62 = data58.assetToLocal;
if(Array.isArray(data62)){
if(data62.length > 6){
const err230 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7+"/assetToLocal",schemaPath:"#/properties/parts/items/properties/textures/items/properties/assetToLocal/maxItems",keyword:"maxItems",params:{limit: 6},message:"must NOT have more than 6 items"};
if(vErrors === null){
vErrors = [err230];
}
else {
vErrors.push(err230);
}
errors++;
}
if(data62.length < 6){
const err231 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7+"/assetToLocal",schemaPath:"#/properties/parts/items/properties/textures/items/properties/assetToLocal/minItems",keyword:"minItems",params:{limit: 6},message:"must NOT have fewer than 6 items"};
if(vErrors === null){
vErrors = [err231];
}
else {
vErrors.push(err231);
}
errors++;
}
const len6 = data62.length;
for(let i8=0; i8<len6; i8++){
let data63 = data62[i8];
if(!((typeof data63 == "number") && (isFinite(data63)))){
const err232 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7+"/assetToLocal/" + i8,schemaPath:"#/properties/parts/items/properties/textures/items/properties/assetToLocal/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err232];
}
else {
vErrors.push(err232);
}
errors++;
}
}
}
else {
const err233 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7+"/assetToLocal",schemaPath:"#/properties/parts/items/properties/textures/items/properties/assetToLocal/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err233];
}
else {
vErrors.push(err233);
}
errors++;
}
}
}
else {
const err234 = {instancePath:instancePath+"/parts/" + i6+"/textures/" + i7,schemaPath:"#/properties/parts/items/properties/textures/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err234];
}
else {
vErrors.push(err234);
}
errors++;
}
}
}
else {
const err235 = {instancePath:instancePath+"/parts/" + i6+"/textures",schemaPath:"#/properties/parts/items/properties/textures/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err235];
}
else {
vErrors.push(err235);
}
errors++;
}
}
if(data50.localTransform !== undefined){
let data64 = data50.localTransform;
if(Array.isArray(data64)){
if(data64.length > 6){
const err236 = {instancePath:instancePath+"/parts/" + i6+"/localTransform",schemaPath:"#/properties/parts/items/properties/localTransform/maxItems",keyword:"maxItems",params:{limit: 6},message:"must NOT have more than 6 items"};
if(vErrors === null){
vErrors = [err236];
}
else {
vErrors.push(err236);
}
errors++;
}
if(data64.length < 6){
const err237 = {instancePath:instancePath+"/parts/" + i6+"/localTransform",schemaPath:"#/properties/parts/items/properties/localTransform/minItems",keyword:"minItems",params:{limit: 6},message:"must NOT have fewer than 6 items"};
if(vErrors === null){
vErrors = [err237];
}
else {
vErrors.push(err237);
}
errors++;
}
const len7 = data64.length;
for(let i9=0; i9<len7; i9++){
let data65 = data64[i9];
if(!((typeof data65 == "number") && (isFinite(data65)))){
const err238 = {instancePath:instancePath+"/parts/" + i6+"/localTransform/" + i9,schemaPath:"#/properties/parts/items/properties/localTransform/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err238];
}
else {
vErrors.push(err238);
}
errors++;
}
}
}
else {
const err239 = {instancePath:instancePath+"/parts/" + i6+"/localTransform",schemaPath:"#/properties/parts/items/properties/localTransform/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err239];
}
else {
vErrors.push(err239);
}
errors++;
}
}
if(data50.drawOrder !== undefined){
let data66 = data50.drawOrder;
if(!(((typeof data66 == "number") && (!(data66 % 1) && !isNaN(data66))) && (isFinite(data66)))){
const err240 = {instancePath:instancePath+"/parts/" + i6+"/drawOrder",schemaPath:"#/properties/parts/items/properties/drawOrder/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err240];
}
else {
vErrors.push(err240);
}
errors++;
}
if((typeof data66 == "number") && (isFinite(data66))){
if(data66 > 100000 || isNaN(data66)){
const err241 = {instancePath:instancePath+"/parts/" + i6+"/drawOrder",schemaPath:"#/properties/parts/items/properties/drawOrder/maximum",keyword:"maximum",params:{comparison: "<=", limit: 100000},message:"must be <= 100000"};
if(vErrors === null){
vErrors = [err241];
}
else {
vErrors.push(err241);
}
errors++;
}
if(data66 < -100000 || isNaN(data66)){
const err242 = {instancePath:instancePath+"/parts/" + i6+"/drawOrder",schemaPath:"#/properties/parts/items/properties/drawOrder/minimum",keyword:"minimum",params:{comparison: ">=", limit: -100000},message:"must be >= -100000"};
if(vErrors === null){
vErrors = [err242];
}
else {
vErrors.push(err242);
}
errors++;
}
}
}
if(data50.visible !== undefined){
if(typeof data50.visible !== "boolean"){
const err243 = {instancePath:instancePath+"/parts/" + i6+"/visible",schemaPath:"#/properties/parts/items/properties/visible/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err243];
}
else {
vErrors.push(err243);
}
errors++;
}
}
if(data50.opacity !== undefined){
let data68 = data50.opacity;
if((typeof data68 == "number") && (isFinite(data68))){
if(data68 > 1 || isNaN(data68)){
const err244 = {instancePath:instancePath+"/parts/" + i6+"/opacity",schemaPath:"#/properties/parts/items/properties/opacity/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err244];
}
else {
vErrors.push(err244);
}
errors++;
}
if(data68 < 0 || isNaN(data68)){
const err245 = {instancePath:instancePath+"/parts/" + i6+"/opacity",schemaPath:"#/properties/parts/items/properties/opacity/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err245];
}
else {
vErrors.push(err245);
}
errors++;
}
}
else {
const err246 = {instancePath:instancePath+"/parts/" + i6+"/opacity",schemaPath:"#/properties/parts/items/properties/opacity/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err246];
}
else {
vErrors.push(err246);
}
errors++;
}
}
if(data50.correctionOrigin !== undefined){
let data69 = data50.correctionOrigin;
if(!(((data69 === "automatic") || (data69 === "user-confirmed")) || (data69 === "manual"))){
const err247 = {instancePath:instancePath+"/parts/" + i6+"/correctionOrigin",schemaPath:"#/properties/parts/items/properties/correctionOrigin/enum",keyword:"enum",params:{allowedValues: schema31.properties.parts.items.properties.correctionOrigin.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err247];
}
else {
vErrors.push(err247);
}
errors++;
}
}
if(data50.limitations !== undefined){
let data70 = data50.limitations;
if(Array.isArray(data70)){
if(data70.length > 64){
const err248 = {instancePath:instancePath+"/parts/" + i6+"/limitations",schemaPath:"#/properties/parts/items/properties/limitations/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err248];
}
else {
vErrors.push(err248);
}
errors++;
}
const len8 = data70.length;
for(let i10=0; i10<len8; i10++){
let data71 = data70[i10];
if(typeof data71 === "string"){
if(func2(data71) > 512){
const err249 = {instancePath:instancePath+"/parts/" + i6+"/limitations/" + i10,schemaPath:"#/properties/parts/items/properties/limitations/items/maxLength",keyword:"maxLength",params:{limit: 512},message:"must NOT have more than 512 characters"};
if(vErrors === null){
vErrors = [err249];
}
else {
vErrors.push(err249);
}
errors++;
}
if(func2(data71) < 1){
const err250 = {instancePath:instancePath+"/parts/" + i6+"/limitations/" + i10,schemaPath:"#/properties/parts/items/properties/limitations/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err250];
}
else {
vErrors.push(err250);
}
errors++;
}
}
else {
const err251 = {instancePath:instancePath+"/parts/" + i6+"/limitations/" + i10,schemaPath:"#/properties/parts/items/properties/limitations/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err251];
}
else {
vErrors.push(err251);
}
errors++;
}
}
}
else {
const err252 = {instancePath:instancePath+"/parts/" + i6+"/limitations",schemaPath:"#/properties/parts/items/properties/limitations/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err252];
}
else {
vErrors.push(err252);
}
errors++;
}
}
if(data50.library !== undefined){
let data72 = data50.library;
if(data72 && typeof data72 == "object" && !Array.isArray(data72)){
if(data72.catalogId === undefined){
const err253 = {instancePath:instancePath+"/parts/" + i6+"/library",schemaPath:"#/properties/parts/items/properties/library/required",keyword:"required",params:{missingProperty: "catalogId"},message:"must have required property '"+"catalogId"+"'"};
if(vErrors === null){
vErrors = [err253];
}
else {
vErrors.push(err253);
}
errors++;
}
if(data72.itemId === undefined){
const err254 = {instancePath:instancePath+"/parts/" + i6+"/library",schemaPath:"#/properties/parts/items/properties/library/required",keyword:"required",params:{missingProperty: "itemId"},message:"must have required property '"+"itemId"+"'"};
if(vErrors === null){
vErrors = [err254];
}
else {
vErrors.push(err254);
}
errors++;
}
if(data72.version === undefined){
const err255 = {instancePath:instancePath+"/parts/" + i6+"/library",schemaPath:"#/properties/parts/items/properties/library/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err255];
}
else {
vErrors.push(err255);
}
errors++;
}
if(data72.key === undefined){
const err256 = {instancePath:instancePath+"/parts/" + i6+"/library",schemaPath:"#/properties/parts/items/properties/library/required",keyword:"required",params:{missingProperty: "key"},message:"must have required property '"+"key"+"'"};
if(vErrors === null){
vErrors = [err256];
}
else {
vErrors.push(err256);
}
errors++;
}
for(const key12 in data72){
if(!((((key12 === "catalogId") || (key12 === "itemId")) || (key12 === "version")) || (key12 === "key"))){
const err257 = {instancePath:instancePath+"/parts/" + i6+"/library",schemaPath:"#/properties/parts/items/properties/library/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key12},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err257];
}
else {
vErrors.push(err257);
}
errors++;
}
}
if(data72.catalogId !== undefined){
let data73 = data72.catalogId;
if(typeof data73 === "string"){
if(func2(data73) > 64){
const err258 = {instancePath:instancePath+"/parts/" + i6+"/library/catalogId",schemaPath:"#/properties/parts/items/properties/library/properties/catalogId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err258];
}
else {
vErrors.push(err258);
}
errors++;
}
if(func2(data73) < 1){
const err259 = {instancePath:instancePath+"/parts/" + i6+"/library/catalogId",schemaPath:"#/properties/parts/items/properties/library/properties/catalogId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err259];
}
else {
vErrors.push(err259);
}
errors++;
}
if(!pattern4.test(data73)){
const err260 = {instancePath:instancePath+"/parts/" + i6+"/library/catalogId",schemaPath:"#/properties/parts/items/properties/library/properties/catalogId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err260];
}
else {
vErrors.push(err260);
}
errors++;
}
}
else {
const err261 = {instancePath:instancePath+"/parts/" + i6+"/library/catalogId",schemaPath:"#/properties/parts/items/properties/library/properties/catalogId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err261];
}
else {
vErrors.push(err261);
}
errors++;
}
}
if(data72.itemId !== undefined){
let data74 = data72.itemId;
if(typeof data74 === "string"){
if(func2(data74) > 64){
const err262 = {instancePath:instancePath+"/parts/" + i6+"/library/itemId",schemaPath:"#/properties/parts/items/properties/library/properties/itemId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err262];
}
else {
vErrors.push(err262);
}
errors++;
}
if(func2(data74) < 1){
const err263 = {instancePath:instancePath+"/parts/" + i6+"/library/itemId",schemaPath:"#/properties/parts/items/properties/library/properties/itemId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err263];
}
else {
vErrors.push(err263);
}
errors++;
}
if(!pattern4.test(data74)){
const err264 = {instancePath:instancePath+"/parts/" + i6+"/library/itemId",schemaPath:"#/properties/parts/items/properties/library/properties/itemId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err264];
}
else {
vErrors.push(err264);
}
errors++;
}
}
else {
const err265 = {instancePath:instancePath+"/parts/" + i6+"/library/itemId",schemaPath:"#/properties/parts/items/properties/library/properties/itemId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err265];
}
else {
vErrors.push(err265);
}
errors++;
}
}
if(data72.version !== undefined){
let data75 = data72.version;
if(typeof data75 === "string"){
if(func2(data75) > 32){
const err266 = {instancePath:instancePath+"/parts/" + i6+"/library/version",schemaPath:"#/properties/parts/items/properties/library/properties/version/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err266];
}
else {
vErrors.push(err266);
}
errors++;
}
if(func2(data75) < 1){
const err267 = {instancePath:instancePath+"/parts/" + i6+"/library/version",schemaPath:"#/properties/parts/items/properties/library/properties/version/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err267];
}
else {
vErrors.push(err267);
}
errors++;
}
if(!pattern12.test(data75)){
const err268 = {instancePath:instancePath+"/parts/" + i6+"/library/version",schemaPath:"#/properties/parts/items/properties/library/properties/version/pattern",keyword:"pattern",params:{pattern: "^\\d+\\.\\d+\\.\\d+$"},message:"must match pattern \""+"^\\d+\\.\\d+\\.\\d+$"+"\""};
if(vErrors === null){
vErrors = [err268];
}
else {
vErrors.push(err268);
}
errors++;
}
}
else {
const err269 = {instancePath:instancePath+"/parts/" + i6+"/library/version",schemaPath:"#/properties/parts/items/properties/library/properties/version/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err269];
}
else {
vErrors.push(err269);
}
errors++;
}
}
if(data72.key !== undefined){
let data76 = data72.key;
if(typeof data76 === "string"){
if(func2(data76) > 64){
const err270 = {instancePath:instancePath+"/parts/" + i6+"/library/key",schemaPath:"#/properties/parts/items/properties/library/properties/key/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err270];
}
else {
vErrors.push(err270);
}
errors++;
}
if(func2(data76) < 1){
const err271 = {instancePath:instancePath+"/parts/" + i6+"/library/key",schemaPath:"#/properties/parts/items/properties/library/properties/key/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err271];
}
else {
vErrors.push(err271);
}
errors++;
}
if(!pattern4.test(data76)){
const err272 = {instancePath:instancePath+"/parts/" + i6+"/library/key",schemaPath:"#/properties/parts/items/properties/library/properties/key/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err272];
}
else {
vErrors.push(err272);
}
errors++;
}
}
else {
const err273 = {instancePath:instancePath+"/parts/" + i6+"/library/key",schemaPath:"#/properties/parts/items/properties/library/properties/key/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err273];
}
else {
vErrors.push(err273);
}
errors++;
}
}
}
else {
const err274 = {instancePath:instancePath+"/parts/" + i6+"/library",schemaPath:"#/properties/parts/items/properties/library/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err274];
}
else {
vErrors.push(err274);
}
errors++;
}
}
if(data50.color !== undefined){
let data77 = data50.color;
if(data77 && typeof data77 == "object" && !Array.isArray(data77)){
if(data77.hueDegrees === undefined){
const err275 = {instancePath:instancePath+"/parts/" + i6+"/color",schemaPath:"#/properties/parts/items/properties/color/required",keyword:"required",params:{missingProperty: "hueDegrees"},message:"must have required property '"+"hueDegrees"+"'"};
if(vErrors === null){
vErrors = [err275];
}
else {
vErrors.push(err275);
}
errors++;
}
if(data77.minimumHue === undefined){
const err276 = {instancePath:instancePath+"/parts/" + i6+"/color",schemaPath:"#/properties/parts/items/properties/color/required",keyword:"required",params:{missingProperty: "minimumHue"},message:"must have required property '"+"minimumHue"+"'"};
if(vErrors === null){
vErrors = [err276];
}
else {
vErrors.push(err276);
}
errors++;
}
if(data77.maximumHue === undefined){
const err277 = {instancePath:instancePath+"/parts/" + i6+"/color",schemaPath:"#/properties/parts/items/properties/color/required",keyword:"required",params:{missingProperty: "maximumHue"},message:"must have required property '"+"maximumHue"+"'"};
if(vErrors === null){
vErrors = [err277];
}
else {
vErrors.push(err277);
}
errors++;
}
if(data77.minimumSaturation === undefined){
const err278 = {instancePath:instancePath+"/parts/" + i6+"/color",schemaPath:"#/properties/parts/items/properties/color/required",keyword:"required",params:{missingProperty: "minimumSaturation"},message:"must have required property '"+"minimumSaturation"+"'"};
if(vErrors === null){
vErrors = [err278];
}
else {
vErrors.push(err278);
}
errors++;
}
for(const key13 in data77){
if(!((((key13 === "hueDegrees") || (key13 === "minimumHue")) || (key13 === "maximumHue")) || (key13 === "minimumSaturation"))){
const err279 = {instancePath:instancePath+"/parts/" + i6+"/color",schemaPath:"#/properties/parts/items/properties/color/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key13},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err279];
}
else {
vErrors.push(err279);
}
errors++;
}
}
if(data77.hueDegrees !== undefined){
let data78 = data77.hueDegrees;
if((typeof data78 == "number") && (isFinite(data78))){
if(data78 > 18 || isNaN(data78)){
const err280 = {instancePath:instancePath+"/parts/" + i6+"/color/hueDegrees",schemaPath:"#/properties/parts/items/properties/color/properties/hueDegrees/maximum",keyword:"maximum",params:{comparison: "<=", limit: 18},message:"must be <= 18"};
if(vErrors === null){
vErrors = [err280];
}
else {
vErrors.push(err280);
}
errors++;
}
if(data78 < -18 || isNaN(data78)){
const err281 = {instancePath:instancePath+"/parts/" + i6+"/color/hueDegrees",schemaPath:"#/properties/parts/items/properties/color/properties/hueDegrees/minimum",keyword:"minimum",params:{comparison: ">=", limit: -18},message:"must be >= -18"};
if(vErrors === null){
vErrors = [err281];
}
else {
vErrors.push(err281);
}
errors++;
}
}
else {
const err282 = {instancePath:instancePath+"/parts/" + i6+"/color/hueDegrees",schemaPath:"#/properties/parts/items/properties/color/properties/hueDegrees/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err282];
}
else {
vErrors.push(err282);
}
errors++;
}
}
if(data77.minimumHue !== undefined){
let data79 = data77.minimumHue;
if((typeof data79 == "number") && (isFinite(data79))){
if(data79 > 1 || isNaN(data79)){
const err283 = {instancePath:instancePath+"/parts/" + i6+"/color/minimumHue",schemaPath:"#/properties/parts/items/properties/color/properties/minimumHue/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err283];
}
else {
vErrors.push(err283);
}
errors++;
}
if(data79 < 0 || isNaN(data79)){
const err284 = {instancePath:instancePath+"/parts/" + i6+"/color/minimumHue",schemaPath:"#/properties/parts/items/properties/color/properties/minimumHue/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err284];
}
else {
vErrors.push(err284);
}
errors++;
}
}
else {
const err285 = {instancePath:instancePath+"/parts/" + i6+"/color/minimumHue",schemaPath:"#/properties/parts/items/properties/color/properties/minimumHue/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err285];
}
else {
vErrors.push(err285);
}
errors++;
}
}
if(data77.maximumHue !== undefined){
let data80 = data77.maximumHue;
if((typeof data80 == "number") && (isFinite(data80))){
if(data80 > 1 || isNaN(data80)){
const err286 = {instancePath:instancePath+"/parts/" + i6+"/color/maximumHue",schemaPath:"#/properties/parts/items/properties/color/properties/maximumHue/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err286];
}
else {
vErrors.push(err286);
}
errors++;
}
if(data80 < 0 || isNaN(data80)){
const err287 = {instancePath:instancePath+"/parts/" + i6+"/color/maximumHue",schemaPath:"#/properties/parts/items/properties/color/properties/maximumHue/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err287];
}
else {
vErrors.push(err287);
}
errors++;
}
}
else {
const err288 = {instancePath:instancePath+"/parts/" + i6+"/color/maximumHue",schemaPath:"#/properties/parts/items/properties/color/properties/maximumHue/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err288];
}
else {
vErrors.push(err288);
}
errors++;
}
}
if(data77.minimumSaturation !== undefined){
let data81 = data77.minimumSaturation;
if((typeof data81 == "number") && (isFinite(data81))){
if(data81 > 1 || isNaN(data81)){
const err289 = {instancePath:instancePath+"/parts/" + i6+"/color/minimumSaturation",schemaPath:"#/properties/parts/items/properties/color/properties/minimumSaturation/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err289];
}
else {
vErrors.push(err289);
}
errors++;
}
if(data81 < 0 || isNaN(data81)){
const err290 = {instancePath:instancePath+"/parts/" + i6+"/color/minimumSaturation",schemaPath:"#/properties/parts/items/properties/color/properties/minimumSaturation/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err290];
}
else {
vErrors.push(err290);
}
errors++;
}
}
else {
const err291 = {instancePath:instancePath+"/parts/" + i6+"/color/minimumSaturation",schemaPath:"#/properties/parts/items/properties/color/properties/minimumSaturation/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err291];
}
else {
vErrors.push(err291);
}
errors++;
}
}
}
else {
const err292 = {instancePath:instancePath+"/parts/" + i6+"/color",schemaPath:"#/properties/parts/items/properties/color/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err292];
}
else {
vErrors.push(err292);
}
errors++;
}
}
}
else {
const err293 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err293];
}
else {
vErrors.push(err293);
}
errors++;
}
}
}
else {
const err294 = {instancePath:instancePath+"/parts",schemaPath:"#/properties/parts/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err294];
}
else {
vErrors.push(err294);
}
errors++;
}
}
if(data.groups !== undefined){
let data82 = data.groups;
if(Array.isArray(data82)){
if(data82.length > 128){
const err295 = {instancePath:instancePath+"/groups",schemaPath:"#/properties/groups/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err295];
}
else {
vErrors.push(err295);
}
errors++;
}
const len9 = data82.length;
for(let i11=0; i11<len9; i11++){
let data83 = data82[i11];
if(data83 && typeof data83 == "object" && !Array.isArray(data83)){
if(data83.id === undefined){
const err296 = {instancePath:instancePath+"/groups/" + i11,schemaPath:"#/properties/groups/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err296];
}
else {
vErrors.push(err296);
}
errors++;
}
if(data83.displayName === undefined){
const err297 = {instancePath:instancePath+"/groups/" + i11,schemaPath:"#/properties/groups/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err297];
}
else {
vErrors.push(err297);
}
errors++;
}
if(data83.parentGroupId === undefined){
const err298 = {instancePath:instancePath+"/groups/" + i11,schemaPath:"#/properties/groups/items/required",keyword:"required",params:{missingProperty: "parentGroupId"},message:"must have required property '"+"parentGroupId"+"'"};
if(vErrors === null){
vErrors = [err298];
}
else {
vErrors.push(err298);
}
errors++;
}
if(data83.visible === undefined){
const err299 = {instancePath:instancePath+"/groups/" + i11,schemaPath:"#/properties/groups/items/required",keyword:"required",params:{missingProperty: "visible"},message:"must have required property '"+"visible"+"'"};
if(vErrors === null){
vErrors = [err299];
}
else {
vErrors.push(err299);
}
errors++;
}
for(const key14 in data83){
if(!((((key14 === "id") || (key14 === "displayName")) || (key14 === "parentGroupId")) || (key14 === "visible"))){
const err300 = {instancePath:instancePath+"/groups/" + i11,schemaPath:"#/properties/groups/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key14},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err300];
}
else {
vErrors.push(err300);
}
errors++;
}
}
if(data83.id !== undefined){
let data84 = data83.id;
if(typeof data84 === "string"){
if(func2(data84) > 64){
const err301 = {instancePath:instancePath+"/groups/" + i11+"/id",schemaPath:"#/properties/groups/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err301];
}
else {
vErrors.push(err301);
}
errors++;
}
if(func2(data84) < 1){
const err302 = {instancePath:instancePath+"/groups/" + i11+"/id",schemaPath:"#/properties/groups/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err302];
}
else {
vErrors.push(err302);
}
errors++;
}
if(!pattern4.test(data84)){
const err303 = {instancePath:instancePath+"/groups/" + i11+"/id",schemaPath:"#/properties/groups/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err303];
}
else {
vErrors.push(err303);
}
errors++;
}
}
else {
const err304 = {instancePath:instancePath+"/groups/" + i11+"/id",schemaPath:"#/properties/groups/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err304];
}
else {
vErrors.push(err304);
}
errors++;
}
}
if(data83.displayName !== undefined){
let data85 = data83.displayName;
if(typeof data85 === "string"){
if(func2(data85) > 120){
const err305 = {instancePath:instancePath+"/groups/" + i11+"/displayName",schemaPath:"#/properties/groups/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err305];
}
else {
vErrors.push(err305);
}
errors++;
}
if(func2(data85) < 1){
const err306 = {instancePath:instancePath+"/groups/" + i11+"/displayName",schemaPath:"#/properties/groups/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err306];
}
else {
vErrors.push(err306);
}
errors++;
}
}
else {
const err307 = {instancePath:instancePath+"/groups/" + i11+"/displayName",schemaPath:"#/properties/groups/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err307];
}
else {
vErrors.push(err307);
}
errors++;
}
}
if(data83.parentGroupId !== undefined){
let data86 = data83.parentGroupId;
const _errs189 = errors;
let valid40 = false;
const _errs190 = errors;
if(typeof data86 === "string"){
if(func2(data86) > 64){
const err308 = {instancePath:instancePath+"/groups/" + i11+"/parentGroupId",schemaPath:"#/properties/groups/items/properties/parentGroupId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err308];
}
else {
vErrors.push(err308);
}
errors++;
}
if(func2(data86) < 1){
const err309 = {instancePath:instancePath+"/groups/" + i11+"/parentGroupId",schemaPath:"#/properties/groups/items/properties/parentGroupId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err309];
}
else {
vErrors.push(err309);
}
errors++;
}
if(!pattern4.test(data86)){
const err310 = {instancePath:instancePath+"/groups/" + i11+"/parentGroupId",schemaPath:"#/properties/groups/items/properties/parentGroupId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err310];
}
else {
vErrors.push(err310);
}
errors++;
}
}
else {
const err311 = {instancePath:instancePath+"/groups/" + i11+"/parentGroupId",schemaPath:"#/properties/groups/items/properties/parentGroupId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err311];
}
else {
vErrors.push(err311);
}
errors++;
}
var _valid3 = _errs190 === errors;
valid40 = valid40 || _valid3;
const _errs192 = errors;
if(data86 !== null){
const err312 = {instancePath:instancePath+"/groups/" + i11+"/parentGroupId",schemaPath:"#/properties/groups/items/properties/parentGroupId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err312];
}
else {
vErrors.push(err312);
}
errors++;
}
var _valid3 = _errs192 === errors;
valid40 = valid40 || _valid3;
if(!valid40){
const err313 = {instancePath:instancePath+"/groups/" + i11+"/parentGroupId",schemaPath:"#/properties/groups/items/properties/parentGroupId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err313];
}
else {
vErrors.push(err313);
}
errors++;
}
else {
errors = _errs189;
if(vErrors !== null){
if(_errs189){
vErrors.length = _errs189;
}
else {
vErrors = null;
}
}
}
}
if(data83.visible !== undefined){
if(typeof data83.visible !== "boolean"){
const err314 = {instancePath:instancePath+"/groups/" + i11+"/visible",schemaPath:"#/properties/groups/items/properties/visible/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err314];
}
else {
vErrors.push(err314);
}
errors++;
}
}
}
else {
const err315 = {instancePath:instancePath+"/groups/" + i11,schemaPath:"#/properties/groups/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err315];
}
else {
vErrors.push(err315);
}
errors++;
}
}
}
else {
const err316 = {instancePath:instancePath+"/groups",schemaPath:"#/properties/groups/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err316];
}
else {
vErrors.push(err316);
}
errors++;
}
}
if(data.parameters !== undefined){
let data88 = data.parameters;
if(Array.isArray(data88)){
if(data88.length > 128){
const err317 = {instancePath:instancePath+"/parameters",schemaPath:"#/properties/parameters/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err317];
}
else {
vErrors.push(err317);
}
errors++;
}
const len10 = data88.length;
for(let i12=0; i12<len10; i12++){
let data89 = data88[i12];
if(data89 && typeof data89 == "object" && !Array.isArray(data89)){
if(data89.id === undefined){
const err318 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err318];
}
else {
vErrors.push(err318);
}
errors++;
}
if(data89.displayName === undefined){
const err319 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err319];
}
else {
vErrors.push(err319);
}
errors++;
}
if(data89.semantic === undefined){
const err320 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "semantic"},message:"must have required property '"+"semantic"+"'"};
if(vErrors === null){
vErrors = [err320];
}
else {
vErrors.push(err320);
}
errors++;
}
if(data89.unit === undefined){
const err321 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "unit"},message:"must have required property '"+"unit"+"'"};
if(vErrors === null){
vErrors = [err321];
}
else {
vErrors.push(err321);
}
errors++;
}
if(data89.min === undefined){
const err322 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "min"},message:"must have required property '"+"min"+"'"};
if(vErrors === null){
vErrors = [err322];
}
else {
vErrors.push(err322);
}
errors++;
}
if(data89.neutral === undefined){
const err323 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "neutral"},message:"must have required property '"+"neutral"+"'"};
if(vErrors === null){
vErrors = [err323];
}
else {
vErrors.push(err323);
}
errors++;
}
if(data89.max === undefined){
const err324 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "max"},message:"must have required property '"+"max"+"'"};
if(vErrors === null){
vErrors = [err324];
}
else {
vErrors.push(err324);
}
errors++;
}
if(data89.previewKey === undefined){
const err325 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "previewKey"},message:"must have required property '"+"previewKey"+"'"};
if(vErrors === null){
vErrors = [err325];
}
else {
vErrors.push(err325);
}
errors++;
}
for(const key15 in data89){
if(!((((((((key15 === "id") || (key15 === "displayName")) || (key15 === "semantic")) || (key15 === "unit")) || (key15 === "min")) || (key15 === "neutral")) || (key15 === "max")) || (key15 === "previewKey"))){
const err326 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key15},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err326];
}
else {
vErrors.push(err326);
}
errors++;
}
}
if(data89.id !== undefined){
let data90 = data89.id;
if(typeof data90 === "string"){
if(func2(data90) > 64){
const err327 = {instancePath:instancePath+"/parameters/" + i12+"/id",schemaPath:"#/properties/parameters/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err327];
}
else {
vErrors.push(err327);
}
errors++;
}
if(func2(data90) < 1){
const err328 = {instancePath:instancePath+"/parameters/" + i12+"/id",schemaPath:"#/properties/parameters/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err328];
}
else {
vErrors.push(err328);
}
errors++;
}
if(!pattern4.test(data90)){
const err329 = {instancePath:instancePath+"/parameters/" + i12+"/id",schemaPath:"#/properties/parameters/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err329];
}
else {
vErrors.push(err329);
}
errors++;
}
}
else {
const err330 = {instancePath:instancePath+"/parameters/" + i12+"/id",schemaPath:"#/properties/parameters/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err330];
}
else {
vErrors.push(err330);
}
errors++;
}
}
if(data89.displayName !== undefined){
let data91 = data89.displayName;
if(typeof data91 === "string"){
if(func2(data91) > 120){
const err331 = {instancePath:instancePath+"/parameters/" + i12+"/displayName",schemaPath:"#/properties/parameters/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err331];
}
else {
vErrors.push(err331);
}
errors++;
}
if(func2(data91) < 1){
const err332 = {instancePath:instancePath+"/parameters/" + i12+"/displayName",schemaPath:"#/properties/parameters/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err332];
}
else {
vErrors.push(err332);
}
errors++;
}
}
else {
const err333 = {instancePath:instancePath+"/parameters/" + i12+"/displayName",schemaPath:"#/properties/parameters/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err333];
}
else {
vErrors.push(err333);
}
errors++;
}
}
if(data89.semantic !== undefined){
let data92 = data89.semantic;
if(typeof data92 === "string"){
if(func2(data92) > 64){
const err334 = {instancePath:instancePath+"/parameters/" + i12+"/semantic",schemaPath:"#/properties/parameters/items/properties/semantic/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err334];
}
else {
vErrors.push(err334);
}
errors++;
}
if(func2(data92) < 1){
const err335 = {instancePath:instancePath+"/parameters/" + i12+"/semantic",schemaPath:"#/properties/parameters/items/properties/semantic/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err335];
}
else {
vErrors.push(err335);
}
errors++;
}
if(!pattern16.test(data92)){
const err336 = {instancePath:instancePath+"/parameters/" + i12+"/semantic",schemaPath:"#/properties/parameters/items/properties/semantic/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err336];
}
else {
vErrors.push(err336);
}
errors++;
}
}
else {
const err337 = {instancePath:instancePath+"/parameters/" + i12+"/semantic",schemaPath:"#/properties/parameters/items/properties/semantic/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err337];
}
else {
vErrors.push(err337);
}
errors++;
}
}
if(data89.unit !== undefined){
let data93 = data89.unit;
if(!(((data93 === "ratio") || (data93 === "degrees")) || (data93 === "custom"))){
const err338 = {instancePath:instancePath+"/parameters/" + i12+"/unit",schemaPath:"#/properties/parameters/items/properties/unit/enum",keyword:"enum",params:{allowedValues: schema31.properties.parameters.items.properties.unit.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err338];
}
else {
vErrors.push(err338);
}
errors++;
}
}
if(data89.min !== undefined){
let data94 = data89.min;
if(!((typeof data94 == "number") && (isFinite(data94)))){
const err339 = {instancePath:instancePath+"/parameters/" + i12+"/min",schemaPath:"#/properties/parameters/items/properties/min/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err339];
}
else {
vErrors.push(err339);
}
errors++;
}
}
if(data89.neutral !== undefined){
let data95 = data89.neutral;
if(!((typeof data95 == "number") && (isFinite(data95)))){
const err340 = {instancePath:instancePath+"/parameters/" + i12+"/neutral",schemaPath:"#/properties/parameters/items/properties/neutral/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err340];
}
else {
vErrors.push(err340);
}
errors++;
}
}
if(data89.max !== undefined){
let data96 = data89.max;
if(!((typeof data96 == "number") && (isFinite(data96)))){
const err341 = {instancePath:instancePath+"/parameters/" + i12+"/max",schemaPath:"#/properties/parameters/items/properties/max/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err341];
}
else {
vErrors.push(err341);
}
errors++;
}
}
if(data89.previewKey !== undefined){
let data97 = data89.previewKey;
const _errs215 = errors;
let valid44 = false;
const _errs216 = errors;
if(!(((((data97 === "eye_left") || (data97 === "eye_right")) || (data97 === "mouth")) || (data97 === "head_yaw")) || (data97 === "head_roll"))){
const err342 = {instancePath:instancePath+"/parameters/" + i12+"/previewKey",schemaPath:"#/properties/parameters/items/properties/previewKey/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema31.properties.parameters.items.properties.previewKey.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err342];
}
else {
vErrors.push(err342);
}
errors++;
}
var _valid4 = _errs216 === errors;
valid44 = valid44 || _valid4;
const _errs217 = errors;
if(data97 !== null){
const err343 = {instancePath:instancePath+"/parameters/" + i12+"/previewKey",schemaPath:"#/properties/parameters/items/properties/previewKey/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err343];
}
else {
vErrors.push(err343);
}
errors++;
}
var _valid4 = _errs217 === errors;
valid44 = valid44 || _valid4;
if(!valid44){
const err344 = {instancePath:instancePath+"/parameters/" + i12+"/previewKey",schemaPath:"#/properties/parameters/items/properties/previewKey/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err344];
}
else {
vErrors.push(err344);
}
errors++;
}
else {
errors = _errs215;
if(vErrors !== null){
if(_errs215){
vErrors.length = _errs215;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err345 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err345];
}
else {
vErrors.push(err345);
}
errors++;
}
}
}
else {
const err346 = {instancePath:instancePath+"/parameters",schemaPath:"#/properties/parameters/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err346];
}
else {
vErrors.push(err346);
}
errors++;
}
}
if(data.partBindings !== undefined){
let data98 = data.partBindings;
if(Array.isArray(data98)){
if(data98.length > 256){
const err347 = {instancePath:instancePath+"/partBindings",schemaPath:"#/properties/partBindings/maxItems",keyword:"maxItems",params:{limit: 256},message:"must NOT have more than 256 items"};
if(vErrors === null){
vErrors = [err347];
}
else {
vErrors.push(err347);
}
errors++;
}
const len11 = data98.length;
for(let i13=0; i13<len11; i13++){
let data99 = data98[i13];
const _errs222 = errors;
let valid47 = false;
let passing0 = null;
const _errs223 = errors;
if(data99 && typeof data99 == "object" && !Array.isArray(data99)){
if(data99.id === undefined){
const err348 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err348];
}
else {
vErrors.push(err348);
}
errors++;
}
if(data99.parameterId === undefined){
const err349 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err349];
}
else {
vErrors.push(err349);
}
errors++;
}
if(data99.partId === undefined){
const err350 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "partId"},message:"must have required property '"+"partId"+"'"};
if(vErrors === null){
vErrors = [err350];
}
else {
vErrors.push(err350);
}
errors++;
}
if(data99.kind === undefined){
const err351 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err351];
}
else {
vErrors.push(err351);
}
errors++;
}
if(data99.mapping === undefined){
const err352 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "mapping"},message:"must have required property '"+"mapping"+"'"};
if(vErrors === null){
vErrors = [err352];
}
else {
vErrors.push(err352);
}
errors++;
}
for(const key16 in data99){
if(!(((((key16 === "id") || (key16 === "parameterId")) || (key16 === "partId")) || (key16 === "kind")) || (key16 === "mapping"))){
const err353 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key16},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err353];
}
else {
vErrors.push(err353);
}
errors++;
}
}
if(data99.id !== undefined){
let data100 = data99.id;
if(typeof data100 === "string"){
if(func2(data100) > 64){
const err354 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err354];
}
else {
vErrors.push(err354);
}
errors++;
}
if(func2(data100) < 1){
const err355 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err355];
}
else {
vErrors.push(err355);
}
errors++;
}
if(!pattern4.test(data100)){
const err356 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err356];
}
else {
vErrors.push(err356);
}
errors++;
}
}
else {
const err357 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err357];
}
else {
vErrors.push(err357);
}
errors++;
}
}
if(data99.parameterId !== undefined){
let data101 = data99.parameterId;
if(typeof data101 === "string"){
if(func2(data101) > 64){
const err358 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err358];
}
else {
vErrors.push(err358);
}
errors++;
}
if(func2(data101) < 1){
const err359 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err359];
}
else {
vErrors.push(err359);
}
errors++;
}
if(!pattern4.test(data101)){
const err360 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err360];
}
else {
vErrors.push(err360);
}
errors++;
}
}
else {
const err361 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err361];
}
else {
vErrors.push(err361);
}
errors++;
}
}
if(data99.partId !== undefined){
let data102 = data99.partId;
if(typeof data102 === "string"){
if(func2(data102) > 64){
const err362 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/partId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err362];
}
else {
vErrors.push(err362);
}
errors++;
}
if(func2(data102) < 1){
const err363 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/partId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err363];
}
else {
vErrors.push(err363);
}
errors++;
}
if(!pattern4.test(data102)){
const err364 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/partId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err364];
}
else {
vErrors.push(err364);
}
errors++;
}
}
else {
const err365 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/partId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err365];
}
else {
vErrors.push(err365);
}
errors++;
}
}
if(data99.kind !== undefined){
if("state-blend" !== data99.kind){
const err366 = {instancePath:instancePath+"/partBindings/" + i13+"/kind",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/kind/const",keyword:"const",params:{allowedValue: "state-blend"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err366];
}
else {
vErrors.push(err366);
}
errors++;
}
}
if(data99.mapping !== undefined){
let data104 = data99.mapping;
if(data104 && typeof data104 == "object" && !Array.isArray(data104)){
if(data104.minimumState === undefined){
const err367 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/required",keyword:"required",params:{missingProperty: "minimumState"},message:"must have required property '"+"minimumState"+"'"};
if(vErrors === null){
vErrors = [err367];
}
else {
vErrors.push(err367);
}
errors++;
}
if(data104.maximumState === undefined){
const err368 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/required",keyword:"required",params:{missingProperty: "maximumState"},message:"must have required property '"+"maximumState"+"'"};
if(vErrors === null){
vErrors = [err368];
}
else {
vErrors.push(err368);
}
errors++;
}
for(const key17 in data104){
if(!(((key17 === "minimumState") || (key17 === "maximumState")) || (key17 === "middleState"))){
const err369 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key17},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err369];
}
else {
vErrors.push(err369);
}
errors++;
}
}
if(data104.minimumState !== undefined){
let data105 = data104.minimumState;
if(typeof data105 === "string"){
if(func2(data105) > 32){
const err370 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/minimumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/minimumState/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err370];
}
else {
vErrors.push(err370);
}
errors++;
}
if(func2(data105) < 1){
const err371 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/minimumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/minimumState/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err371];
}
else {
vErrors.push(err371);
}
errors++;
}
}
else {
const err372 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/minimumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/minimumState/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err372];
}
else {
vErrors.push(err372);
}
errors++;
}
}
if(data104.maximumState !== undefined){
let data106 = data104.maximumState;
if(typeof data106 === "string"){
if(func2(data106) > 32){
const err373 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/maximumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/maximumState/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err373];
}
else {
vErrors.push(err373);
}
errors++;
}
if(func2(data106) < 1){
const err374 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/maximumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/maximumState/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err374];
}
else {
vErrors.push(err374);
}
errors++;
}
}
else {
const err375 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/maximumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/maximumState/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err375];
}
else {
vErrors.push(err375);
}
errors++;
}
}
if(data104.middleState !== undefined){
let data107 = data104.middleState;
if(typeof data107 === "string"){
if(func2(data107) > 32){
const err376 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/middleState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/middleState/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err376];
}
else {
vErrors.push(err376);
}
errors++;
}
if(func2(data107) < 1){
const err377 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/middleState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/middleState/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err377];
}
else {
vErrors.push(err377);
}
errors++;
}
}
else {
const err378 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/middleState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/middleState/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err378];
}
else {
vErrors.push(err378);
}
errors++;
}
}
}
else {
const err379 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err379];
}
else {
vErrors.push(err379);
}
errors++;
}
}
}
else {
const err380 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err380];
}
else {
vErrors.push(err380);
}
errors++;
}
var _valid5 = _errs223 === errors;
if(_valid5){
valid47 = true;
passing0 = 0;
var props0 = true;
}
const _errs242 = errors;
if(data99 && typeof data99 == "object" && !Array.isArray(data99)){
if(data99.id === undefined){
const err381 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err381];
}
else {
vErrors.push(err381);
}
errors++;
}
if(data99.parameterId === undefined){
const err382 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err382];
}
else {
vErrors.push(err382);
}
errors++;
}
if(data99.partId === undefined){
const err383 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "partId"},message:"must have required property '"+"partId"+"'"};
if(vErrors === null){
vErrors = [err383];
}
else {
vErrors.push(err383);
}
errors++;
}
if(data99.kind === undefined){
const err384 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err384];
}
else {
vErrors.push(err384);
}
errors++;
}
if(data99.mapping === undefined){
const err385 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "mapping"},message:"must have required property '"+"mapping"+"'"};
if(vErrors === null){
vErrors = [err385];
}
else {
vErrors.push(err385);
}
errors++;
}
for(const key18 in data99){
if(!(((((key18 === "id") || (key18 === "parameterId")) || (key18 === "partId")) || (key18 === "kind")) || (key18 === "mapping"))){
const err386 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key18},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err386];
}
else {
vErrors.push(err386);
}
errors++;
}
}
if(data99.id !== undefined){
let data108 = data99.id;
if(typeof data108 === "string"){
if(func2(data108) > 64){
const err387 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err387];
}
else {
vErrors.push(err387);
}
errors++;
}
if(func2(data108) < 1){
const err388 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err388];
}
else {
vErrors.push(err388);
}
errors++;
}
if(!pattern4.test(data108)){
const err389 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err389];
}
else {
vErrors.push(err389);
}
errors++;
}
}
else {
const err390 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err390];
}
else {
vErrors.push(err390);
}
errors++;
}
}
if(data99.parameterId !== undefined){
let data109 = data99.parameterId;
if(typeof data109 === "string"){
if(func2(data109) > 64){
const err391 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err391];
}
else {
vErrors.push(err391);
}
errors++;
}
if(func2(data109) < 1){
const err392 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err392];
}
else {
vErrors.push(err392);
}
errors++;
}
if(!pattern4.test(data109)){
const err393 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err393];
}
else {
vErrors.push(err393);
}
errors++;
}
}
else {
const err394 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err394];
}
else {
vErrors.push(err394);
}
errors++;
}
}
if(data99.partId !== undefined){
let data110 = data99.partId;
if(typeof data110 === "string"){
if(func2(data110) > 64){
const err395 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/partId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err395];
}
else {
vErrors.push(err395);
}
errors++;
}
if(func2(data110) < 1){
const err396 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/partId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err396];
}
else {
vErrors.push(err396);
}
errors++;
}
if(!pattern4.test(data110)){
const err397 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/partId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err397];
}
else {
vErrors.push(err397);
}
errors++;
}
}
else {
const err398 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/partId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err398];
}
else {
vErrors.push(err398);
}
errors++;
}
}
if(data99.kind !== undefined){
if("transform" !== data99.kind){
const err399 = {instancePath:instancePath+"/partBindings/" + i13+"/kind",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/kind/const",keyword:"const",params:{allowedValue: "transform"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err399];
}
else {
vErrors.push(err399);
}
errors++;
}
}
if(data99.mapping !== undefined){
let data112 = data99.mapping;
if(data112 && typeof data112 == "object" && !Array.isArray(data112)){
if(data112.component === undefined){
const err400 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/required",keyword:"required",params:{missingProperty: "component"},message:"must have required property '"+"component"+"'"};
if(vErrors === null){
vErrors = [err400];
}
else {
vErrors.push(err400);
}
errors++;
}
if(data112.outputRange === undefined){
const err401 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/required",keyword:"required",params:{missingProperty: "outputRange"},message:"must have required property '"+"outputRange"+"'"};
if(vErrors === null){
vErrors = [err401];
}
else {
vErrors.push(err401);
}
errors++;
}
for(const key19 in data112){
if(!((key19 === "component") || (key19 === "outputRange"))){
const err402 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key19},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err402];
}
else {
vErrors.push(err402);
}
errors++;
}
}
if(data112.component !== undefined){
let data113 = data112.component;
if(!(((((data113 === "rotate-degrees") || (data113 === "translate-x")) || (data113 === "translate-y")) || (data113 === "scale-x")) || (data113 === "scale-y"))){
const err403 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/component",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/properties/component/enum",keyword:"enum",params:{allowedValues: schema31.properties.partBindings.items.oneOf[1].properties.mapping.properties.component.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err403];
}
else {
vErrors.push(err403);
}
errors++;
}
}
if(data112.outputRange !== undefined){
let data114 = data112.outputRange;
if(Array.isArray(data114)){
if(data114.length > 2){
const err404 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/outputRange",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/properties/outputRange/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err404];
}
else {
vErrors.push(err404);
}
errors++;
}
if(data114.length < 2){
const err405 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/outputRange",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/properties/outputRange/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err405];
}
else {
vErrors.push(err405);
}
errors++;
}
const len12 = data114.length;
for(let i14=0; i14<len12; i14++){
let data115 = data114[i14];
if(!((typeof data115 == "number") && (isFinite(data115)))){
const err406 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/outputRange/" + i14,schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/properties/outputRange/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err406];
}
else {
vErrors.push(err406);
}
errors++;
}
}
}
else {
const err407 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/outputRange",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/properties/outputRange/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err407];
}
else {
vErrors.push(err407);
}
errors++;
}
}
}
else {
const err408 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err408];
}
else {
vErrors.push(err408);
}
errors++;
}
}
}
else {
const err409 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err409];
}
else {
vErrors.push(err409);
}
errors++;
}
var _valid5 = _errs242 === errors;
if(_valid5 && valid47){
valid47 = false;
passing0 = [passing0, 1];
}
else {
if(_valid5){
valid47 = true;
passing0 = 1;
if(props0 !== true){
props0 = true;
}
}
}
if(!valid47){
const err410 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf",keyword:"oneOf",params:{passingSchemas: passing0},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err410];
}
else {
vErrors.push(err410);
}
errors++;
}
else {
errors = _errs222;
if(vErrors !== null){
if(_errs222){
vErrors.length = _errs222;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err411 = {instancePath:instancePath+"/partBindings",schemaPath:"#/properties/partBindings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err411];
}
else {
vErrors.push(err411);
}
errors++;
}
}
if(data.inputBindings !== undefined){
let data116 = data.inputBindings;
if(Array.isArray(data116)){
if(data116.length > 128){
const err412 = {instancePath:instancePath+"/inputBindings",schemaPath:"#/properties/inputBindings/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err412];
}
else {
vErrors.push(err412);
}
errors++;
}
const len13 = data116.length;
for(let i15=0; i15<len13; i15++){
let data117 = data116[i15];
if(data117 && typeof data117 == "object" && !Array.isArray(data117)){
if(data117.id === undefined){
const err413 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err413];
}
else {
vErrors.push(err413);
}
errors++;
}
if(data117.source === undefined){
const err414 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "source"},message:"must have required property '"+"source"+"'"};
if(vErrors === null){
vErrors = [err414];
}
else {
vErrors.push(err414);
}
errors++;
}
if(data117.channel === undefined){
const err415 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "channel"},message:"must have required property '"+"channel"+"'"};
if(vErrors === null){
vErrors = [err415];
}
else {
vErrors.push(err415);
}
errors++;
}
if(data117.parameterId === undefined){
const err416 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err416];
}
else {
vErrors.push(err416);
}
errors++;
}
if(data117.inputRange === undefined){
const err417 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "inputRange"},message:"must have required property '"+"inputRange"+"'"};
if(vErrors === null){
vErrors = [err417];
}
else {
vErrors.push(err417);
}
errors++;
}
if(data117.invert === undefined){
const err418 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "invert"},message:"must have required property '"+"invert"+"'"};
if(vErrors === null){
vErrors = [err418];
}
else {
vErrors.push(err418);
}
errors++;
}
if(data117.gain === undefined){
const err419 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "gain"},message:"must have required property '"+"gain"+"'"};
if(vErrors === null){
vErrors = [err419];
}
else {
vErrors.push(err419);
}
errors++;
}
if(data117.offset === undefined){
const err420 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "offset"},message:"must have required property '"+"offset"+"'"};
if(vErrors === null){
vErrors = [err420];
}
else {
vErrors.push(err420);
}
errors++;
}
if(data117.smoothingMs === undefined){
const err421 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "smoothingMs"},message:"must have required property '"+"smoothingMs"+"'"};
if(vErrors === null){
vErrors = [err421];
}
else {
vErrors.push(err421);
}
errors++;
}
if(data117.fallback === undefined){
const err422 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "fallback"},message:"must have required property '"+"fallback"+"'"};
if(vErrors === null){
vErrors = [err422];
}
else {
vErrors.push(err422);
}
errors++;
}
for(const key20 in data117){
if(!(func1.call(schema31.properties.inputBindings.items.properties, key20))){
const err423 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key20},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err423];
}
else {
vErrors.push(err423);
}
errors++;
}
}
if(data117.id !== undefined){
let data118 = data117.id;
if(typeof data118 === "string"){
if(func2(data118) > 64){
const err424 = {instancePath:instancePath+"/inputBindings/" + i15+"/id",schemaPath:"#/properties/inputBindings/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err424];
}
else {
vErrors.push(err424);
}
errors++;
}
if(func2(data118) < 1){
const err425 = {instancePath:instancePath+"/inputBindings/" + i15+"/id",schemaPath:"#/properties/inputBindings/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err425];
}
else {
vErrors.push(err425);
}
errors++;
}
if(!pattern4.test(data118)){
const err426 = {instancePath:instancePath+"/inputBindings/" + i15+"/id",schemaPath:"#/properties/inputBindings/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err426];
}
else {
vErrors.push(err426);
}
errors++;
}
}
else {
const err427 = {instancePath:instancePath+"/inputBindings/" + i15+"/id",schemaPath:"#/properties/inputBindings/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err427];
}
else {
vErrors.push(err427);
}
errors++;
}
}
if(data117.source !== undefined){
let data119 = data117.source;
if(!(((data119 === "face") || (data119 === "microphone")) || (data119 === "manual"))){
const err428 = {instancePath:instancePath+"/inputBindings/" + i15+"/source",schemaPath:"#/properties/inputBindings/items/properties/source/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputBindings.items.properties.source.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err428];
}
else {
vErrors.push(err428);
}
errors++;
}
}
if(data117.channel !== undefined){
let data120 = data117.channel;
if(typeof data120 === "string"){
if(func2(data120) > 64){
const err429 = {instancePath:instancePath+"/inputBindings/" + i15+"/channel",schemaPath:"#/properties/inputBindings/items/properties/channel/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err429];
}
else {
vErrors.push(err429);
}
errors++;
}
if(func2(data120) < 1){
const err430 = {instancePath:instancePath+"/inputBindings/" + i15+"/channel",schemaPath:"#/properties/inputBindings/items/properties/channel/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err430];
}
else {
vErrors.push(err430);
}
errors++;
}
if(!pattern16.test(data120)){
const err431 = {instancePath:instancePath+"/inputBindings/" + i15+"/channel",schemaPath:"#/properties/inputBindings/items/properties/channel/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err431];
}
else {
vErrors.push(err431);
}
errors++;
}
}
else {
const err432 = {instancePath:instancePath+"/inputBindings/" + i15+"/channel",schemaPath:"#/properties/inputBindings/items/properties/channel/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err432];
}
else {
vErrors.push(err432);
}
errors++;
}
}
if(data117.parameterId !== undefined){
let data121 = data117.parameterId;
if(typeof data121 === "string"){
if(func2(data121) > 64){
const err433 = {instancePath:instancePath+"/inputBindings/" + i15+"/parameterId",schemaPath:"#/properties/inputBindings/items/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err433];
}
else {
vErrors.push(err433);
}
errors++;
}
if(func2(data121) < 1){
const err434 = {instancePath:instancePath+"/inputBindings/" + i15+"/parameterId",schemaPath:"#/properties/inputBindings/items/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err434];
}
else {
vErrors.push(err434);
}
errors++;
}
if(!pattern4.test(data121)){
const err435 = {instancePath:instancePath+"/inputBindings/" + i15+"/parameterId",schemaPath:"#/properties/inputBindings/items/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err435];
}
else {
vErrors.push(err435);
}
errors++;
}
}
else {
const err436 = {instancePath:instancePath+"/inputBindings/" + i15+"/parameterId",schemaPath:"#/properties/inputBindings/items/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err436];
}
else {
vErrors.push(err436);
}
errors++;
}
}
if(data117.inputRange !== undefined){
let data122 = data117.inputRange;
if(Array.isArray(data122)){
if(data122.length > 2){
const err437 = {instancePath:instancePath+"/inputBindings/" + i15+"/inputRange",schemaPath:"#/properties/inputBindings/items/properties/inputRange/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err437];
}
else {
vErrors.push(err437);
}
errors++;
}
if(data122.length < 2){
const err438 = {instancePath:instancePath+"/inputBindings/" + i15+"/inputRange",schemaPath:"#/properties/inputBindings/items/properties/inputRange/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err438];
}
else {
vErrors.push(err438);
}
errors++;
}
const len14 = data122.length;
for(let i16=0; i16<len14; i16++){
let data123 = data122[i16];
if(!((typeof data123 == "number") && (isFinite(data123)))){
const err439 = {instancePath:instancePath+"/inputBindings/" + i15+"/inputRange/" + i16,schemaPath:"#/properties/inputBindings/items/properties/inputRange/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err439];
}
else {
vErrors.push(err439);
}
errors++;
}
}
}
else {
const err440 = {instancePath:instancePath+"/inputBindings/" + i15+"/inputRange",schemaPath:"#/properties/inputBindings/items/properties/inputRange/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err440];
}
else {
vErrors.push(err440);
}
errors++;
}
}
if(data117.invert !== undefined){
if(typeof data117.invert !== "boolean"){
const err441 = {instancePath:instancePath+"/inputBindings/" + i15+"/invert",schemaPath:"#/properties/inputBindings/items/properties/invert/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err441];
}
else {
vErrors.push(err441);
}
errors++;
}
}
if(data117.gain !== undefined){
let data125 = data117.gain;
if((typeof data125 == "number") && (isFinite(data125))){
if(data125 > 10 || isNaN(data125)){
const err442 = {instancePath:instancePath+"/inputBindings/" + i15+"/gain",schemaPath:"#/properties/inputBindings/items/properties/gain/maximum",keyword:"maximum",params:{comparison: "<=", limit: 10},message:"must be <= 10"};
if(vErrors === null){
vErrors = [err442];
}
else {
vErrors.push(err442);
}
errors++;
}
if(data125 < 0 || isNaN(data125)){
const err443 = {instancePath:instancePath+"/inputBindings/" + i15+"/gain",schemaPath:"#/properties/inputBindings/items/properties/gain/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err443];
}
else {
vErrors.push(err443);
}
errors++;
}
}
else {
const err444 = {instancePath:instancePath+"/inputBindings/" + i15+"/gain",schemaPath:"#/properties/inputBindings/items/properties/gain/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err444];
}
else {
vErrors.push(err444);
}
errors++;
}
}
if(data117.offset !== undefined){
let data126 = data117.offset;
if(!((typeof data126 == "number") && (isFinite(data126)))){
const err445 = {instancePath:instancePath+"/inputBindings/" + i15+"/offset",schemaPath:"#/properties/inputBindings/items/properties/offset/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err445];
}
else {
vErrors.push(err445);
}
errors++;
}
}
if(data117.smoothingMs !== undefined){
let data127 = data117.smoothingMs;
if(!(((typeof data127 == "number") && (!(data127 % 1) && !isNaN(data127))) && (isFinite(data127)))){
const err446 = {instancePath:instancePath+"/inputBindings/" + i15+"/smoothingMs",schemaPath:"#/properties/inputBindings/items/properties/smoothingMs/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err446];
}
else {
vErrors.push(err446);
}
errors++;
}
if((typeof data127 == "number") && (isFinite(data127))){
if(data127 > 10000 || isNaN(data127)){
const err447 = {instancePath:instancePath+"/inputBindings/" + i15+"/smoothingMs",schemaPath:"#/properties/inputBindings/items/properties/smoothingMs/maximum",keyword:"maximum",params:{comparison: "<=", limit: 10000},message:"must be <= 10000"};
if(vErrors === null){
vErrors = [err447];
}
else {
vErrors.push(err447);
}
errors++;
}
if(data127 < 0 || isNaN(data127)){
const err448 = {instancePath:instancePath+"/inputBindings/" + i15+"/smoothingMs",schemaPath:"#/properties/inputBindings/items/properties/smoothingMs/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err448];
}
else {
vErrors.push(err448);
}
errors++;
}
}
}
if(data117.fallback !== undefined){
let data128 = data117.fallback;
if(data128 && typeof data128 == "object" && !Array.isArray(data128)){
if(data128.mode === undefined){
const err449 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback",schemaPath:"#/properties/inputBindings/items/properties/fallback/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err449];
}
else {
vErrors.push(err449);
}
errors++;
}
if(data128.value === undefined){
const err450 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback",schemaPath:"#/properties/inputBindings/items/properties/fallback/required",keyword:"required",params:{missingProperty: "value"},message:"must have required property '"+"value"+"'"};
if(vErrors === null){
vErrors = [err450];
}
else {
vErrors.push(err450);
}
errors++;
}
if(data128.returnMs === undefined){
const err451 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback",schemaPath:"#/properties/inputBindings/items/properties/fallback/required",keyword:"required",params:{missingProperty: "returnMs"},message:"must have required property '"+"returnMs"+"'"};
if(vErrors === null){
vErrors = [err451];
}
else {
vErrors.push(err451);
}
errors++;
}
for(const key21 in data128){
if(!(((key21 === "mode") || (key21 === "value")) || (key21 === "returnMs"))){
const err452 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback",schemaPath:"#/properties/inputBindings/items/properties/fallback/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key21},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err452];
}
else {
vErrors.push(err452);
}
errors++;
}
}
if(data128.mode !== undefined){
let data129 = data128.mode;
if(!(((data129 === "neutral") || (data129 === "hold")) || (data129 === "constant"))){
const err453 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback/mode",schemaPath:"#/properties/inputBindings/items/properties/fallback/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputBindings.items.properties.fallback.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err453];
}
else {
vErrors.push(err453);
}
errors++;
}
}
if(data128.value !== undefined){
let data130 = data128.value;
if(!((typeof data130 == "number") && (isFinite(data130)))){
const err454 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback/value",schemaPath:"#/properties/inputBindings/items/properties/fallback/properties/value/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err454];
}
else {
vErrors.push(err454);
}
errors++;
}
}
if(data128.returnMs !== undefined){
let data131 = data128.returnMs;
if(!(((typeof data131 == "number") && (!(data131 % 1) && !isNaN(data131))) && (isFinite(data131)))){
const err455 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback/returnMs",schemaPath:"#/properties/inputBindings/items/properties/fallback/properties/returnMs/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err455];
}
else {
vErrors.push(err455);
}
errors++;
}
if((typeof data131 == "number") && (isFinite(data131))){
if(data131 > 10000 || isNaN(data131)){
const err456 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback/returnMs",schemaPath:"#/properties/inputBindings/items/properties/fallback/properties/returnMs/maximum",keyword:"maximum",params:{comparison: "<=", limit: 10000},message:"must be <= 10000"};
if(vErrors === null){
vErrors = [err456];
}
else {
vErrors.push(err456);
}
errors++;
}
if(data131 < 0 || isNaN(data131)){
const err457 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback/returnMs",schemaPath:"#/properties/inputBindings/items/properties/fallback/properties/returnMs/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err457];
}
else {
vErrors.push(err457);
}
errors++;
}
}
}
}
else {
const err458 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback",schemaPath:"#/properties/inputBindings/items/properties/fallback/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err458];
}
else {
vErrors.push(err458);
}
errors++;
}
}
}
else {
const err459 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err459];
}
else {
vErrors.push(err459);
}
errors++;
}
}
}
else {
const err460 = {instancePath:instancePath+"/inputBindings",schemaPath:"#/properties/inputBindings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err460];
}
else {
vErrors.push(err460);
}
errors++;
}
}
if(data.expressions !== undefined){
let data132 = data.expressions;
if(Array.isArray(data132)){
if(data132.length > 64){
const err461 = {instancePath:instancePath+"/expressions",schemaPath:"#/properties/expressions/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err461];
}
else {
vErrors.push(err461);
}
errors++;
}
const len15 = data132.length;
for(let i17=0; i17<len15; i17++){
let data133 = data132[i17];
if(data133 && typeof data133 == "object" && !Array.isArray(data133)){
if(data133.id === undefined){
const err462 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err462];
}
else {
vErrors.push(err462);
}
errors++;
}
if(data133.displayName === undefined){
const err463 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err463];
}
else {
vErrors.push(err463);
}
errors++;
}
if(data133.values === undefined){
const err464 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/required",keyword:"required",params:{missingProperty: "values"},message:"must have required property '"+"values"+"'"};
if(vErrors === null){
vErrors = [err464];
}
else {
vErrors.push(err464);
}
errors++;
}
if(data133.transitionMs === undefined){
const err465 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/required",keyword:"required",params:{missingProperty: "transitionMs"},message:"must have required property '"+"transitionMs"+"'"};
if(vErrors === null){
vErrors = [err465];
}
else {
vErrors.push(err465);
}
errors++;
}
if(data133.release === undefined){
const err466 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/required",keyword:"required",params:{missingProperty: "release"},message:"must have required property '"+"release"+"'"};
if(vErrors === null){
vErrors = [err466];
}
else {
vErrors.push(err466);
}
errors++;
}
for(const key22 in data133){
if(!(((((key22 === "id") || (key22 === "displayName")) || (key22 === "values")) || (key22 === "transitionMs")) || (key22 === "release"))){
const err467 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key22},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err467];
}
else {
vErrors.push(err467);
}
errors++;
}
}
if(data133.id !== undefined){
let data134 = data133.id;
if(typeof data134 === "string"){
if(func2(data134) > 64){
const err468 = {instancePath:instancePath+"/expressions/" + i17+"/id",schemaPath:"#/properties/expressions/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err468];
}
else {
vErrors.push(err468);
}
errors++;
}
if(func2(data134) < 1){
const err469 = {instancePath:instancePath+"/expressions/" + i17+"/id",schemaPath:"#/properties/expressions/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err469];
}
else {
vErrors.push(err469);
}
errors++;
}
if(!pattern4.test(data134)){
const err470 = {instancePath:instancePath+"/expressions/" + i17+"/id",schemaPath:"#/properties/expressions/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err470];
}
else {
vErrors.push(err470);
}
errors++;
}
}
else {
const err471 = {instancePath:instancePath+"/expressions/" + i17+"/id",schemaPath:"#/properties/expressions/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err471];
}
else {
vErrors.push(err471);
}
errors++;
}
}
if(data133.displayName !== undefined){
let data135 = data133.displayName;
if(typeof data135 === "string"){
if(func2(data135) > 120){
const err472 = {instancePath:instancePath+"/expressions/" + i17+"/displayName",schemaPath:"#/properties/expressions/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err472];
}
else {
vErrors.push(err472);
}
errors++;
}
if(func2(data135) < 1){
const err473 = {instancePath:instancePath+"/expressions/" + i17+"/displayName",schemaPath:"#/properties/expressions/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err473];
}
else {
vErrors.push(err473);
}
errors++;
}
}
else {
const err474 = {instancePath:instancePath+"/expressions/" + i17+"/displayName",schemaPath:"#/properties/expressions/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err474];
}
else {
vErrors.push(err474);
}
errors++;
}
}
if(data133.values !== undefined){
let data136 = data133.values;
if(Array.isArray(data136)){
if(data136.length > 128){
const err475 = {instancePath:instancePath+"/expressions/" + i17+"/values",schemaPath:"#/properties/expressions/items/properties/values/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err475];
}
else {
vErrors.push(err475);
}
errors++;
}
const len16 = data136.length;
for(let i18=0; i18<len16; i18++){
let data137 = data136[i18];
if(data137 && typeof data137 == "object" && !Array.isArray(data137)){
if(data137.parameterId === undefined){
const err476 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18,schemaPath:"#/properties/expressions/items/properties/values/items/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err476];
}
else {
vErrors.push(err476);
}
errors++;
}
if(data137.value === undefined){
const err477 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18,schemaPath:"#/properties/expressions/items/properties/values/items/required",keyword:"required",params:{missingProperty: "value"},message:"must have required property '"+"value"+"'"};
if(vErrors === null){
vErrors = [err477];
}
else {
vErrors.push(err477);
}
errors++;
}
if(data137.locked === undefined){
const err478 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18,schemaPath:"#/properties/expressions/items/properties/values/items/required",keyword:"required",params:{missingProperty: "locked"},message:"must have required property '"+"locked"+"'"};
if(vErrors === null){
vErrors = [err478];
}
else {
vErrors.push(err478);
}
errors++;
}
for(const key23 in data137){
if(!(((key23 === "parameterId") || (key23 === "value")) || (key23 === "locked"))){
const err479 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18,schemaPath:"#/properties/expressions/items/properties/values/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key23},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err479];
}
else {
vErrors.push(err479);
}
errors++;
}
}
if(data137.parameterId !== undefined){
let data138 = data137.parameterId;
if(typeof data138 === "string"){
if(func2(data138) > 64){
const err480 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/parameterId",schemaPath:"#/properties/expressions/items/properties/values/items/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err480];
}
else {
vErrors.push(err480);
}
errors++;
}
if(func2(data138) < 1){
const err481 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/parameterId",schemaPath:"#/properties/expressions/items/properties/values/items/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err481];
}
else {
vErrors.push(err481);
}
errors++;
}
if(!pattern4.test(data138)){
const err482 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/parameterId",schemaPath:"#/properties/expressions/items/properties/values/items/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err482];
}
else {
vErrors.push(err482);
}
errors++;
}
}
else {
const err483 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/parameterId",schemaPath:"#/properties/expressions/items/properties/values/items/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err483];
}
else {
vErrors.push(err483);
}
errors++;
}
}
if(data137.value !== undefined){
let data139 = data137.value;
if(!((typeof data139 == "number") && (isFinite(data139)))){
const err484 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/value",schemaPath:"#/properties/expressions/items/properties/values/items/properties/value/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err484];
}
else {
vErrors.push(err484);
}
errors++;
}
}
if(data137.locked !== undefined){
if(typeof data137.locked !== "boolean"){
const err485 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/locked",schemaPath:"#/properties/expressions/items/properties/values/items/properties/locked/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err485];
}
else {
vErrors.push(err485);
}
errors++;
}
}
}
else {
const err486 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18,schemaPath:"#/properties/expressions/items/properties/values/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err486];
}
else {
vErrors.push(err486);
}
errors++;
}
}
}
else {
const err487 = {instancePath:instancePath+"/expressions/" + i17+"/values",schemaPath:"#/properties/expressions/items/properties/values/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err487];
}
else {
vErrors.push(err487);
}
errors++;
}
}
if(data133.transitionMs !== undefined){
let data141 = data133.transitionMs;
if(!(((typeof data141 == "number") && (!(data141 % 1) && !isNaN(data141))) && (isFinite(data141)))){
const err488 = {instancePath:instancePath+"/expressions/" + i17+"/transitionMs",schemaPath:"#/properties/expressions/items/properties/transitionMs/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err488];
}
else {
vErrors.push(err488);
}
errors++;
}
if((typeof data141 == "number") && (isFinite(data141))){
if(data141 > 10000 || isNaN(data141)){
const err489 = {instancePath:instancePath+"/expressions/" + i17+"/transitionMs",schemaPath:"#/properties/expressions/items/properties/transitionMs/maximum",keyword:"maximum",params:{comparison: "<=", limit: 10000},message:"must be <= 10000"};
if(vErrors === null){
vErrors = [err489];
}
else {
vErrors.push(err489);
}
errors++;
}
if(data141 < 0 || isNaN(data141)){
const err490 = {instancePath:instancePath+"/expressions/" + i17+"/transitionMs",schemaPath:"#/properties/expressions/items/properties/transitionMs/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err490];
}
else {
vErrors.push(err490);
}
errors++;
}
}
}
if(data133.release !== undefined){
let data142 = data133.release;
if(!((data142 === "live-input") || (data142 === "neutral"))){
const err491 = {instancePath:instancePath+"/expressions/" + i17+"/release",schemaPath:"#/properties/expressions/items/properties/release/enum",keyword:"enum",params:{allowedValues: schema31.properties.expressions.items.properties.release.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err491];
}
else {
vErrors.push(err491);
}
errors++;
}
}
}
else {
const err492 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err492];
}
else {
vErrors.push(err492);
}
errors++;
}
}
}
else {
const err493 = {instancePath:instancePath+"/expressions",schemaPath:"#/properties/expressions/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err493];
}
else {
vErrors.push(err493);
}
errors++;
}
}
if(data.runtimeProfile !== undefined){
let data143 = data.runtimeProfile;
if(data143 && typeof data143 == "object" && !Array.isArray(data143)){
if(data143.id === undefined){
const err494 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err494];
}
else {
vErrors.push(err494);
}
errors++;
}
if(data143.revision === undefined){
const err495 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err495];
}
else {
vErrors.push(err495);
}
errors++;
}
if(data143.mode === undefined){
const err496 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err496];
}
else {
vErrors.push(err496);
}
errors++;
}
if(data143.mirror === undefined){
const err497 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/required",keyword:"required",params:{missingProperty: "mirror"},message:"must have required property '"+"mirror"+"'"};
if(vErrors === null){
vErrors = [err497];
}
else {
vErrors.push(err497);
}
errors++;
}
if(data143.fallbackExpressionId === undefined){
const err498 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/required",keyword:"required",params:{missingProperty: "fallbackExpressionId"},message:"must have required property '"+"fallbackExpressionId"+"'"};
if(vErrors === null){
vErrors = [err498];
}
else {
vErrors.push(err498);
}
errors++;
}
for(const key24 in data143){
if(!(((((key24 === "id") || (key24 === "revision")) || (key24 === "mode")) || (key24 === "mirror")) || (key24 === "fallbackExpressionId"))){
const err499 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key24},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err499];
}
else {
vErrors.push(err499);
}
errors++;
}
}
if(data143.id !== undefined){
let data144 = data143.id;
if(typeof data144 === "string"){
if(func2(data144) > 64){
const err500 = {instancePath:instancePath+"/runtimeProfile/id",schemaPath:"#/properties/runtimeProfile/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err500];
}
else {
vErrors.push(err500);
}
errors++;
}
if(func2(data144) < 1){
const err501 = {instancePath:instancePath+"/runtimeProfile/id",schemaPath:"#/properties/runtimeProfile/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err501];
}
else {
vErrors.push(err501);
}
errors++;
}
if(!pattern4.test(data144)){
const err502 = {instancePath:instancePath+"/runtimeProfile/id",schemaPath:"#/properties/runtimeProfile/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err502];
}
else {
vErrors.push(err502);
}
errors++;
}
}
else {
const err503 = {instancePath:instancePath+"/runtimeProfile/id",schemaPath:"#/properties/runtimeProfile/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err503];
}
else {
vErrors.push(err503);
}
errors++;
}
}
if(data143.revision !== undefined){
let data145 = data143.revision;
if(!(((typeof data145 == "number") && (!(data145 % 1) && !isNaN(data145))) && (isFinite(data145)))){
const err504 = {instancePath:instancePath+"/runtimeProfile/revision",schemaPath:"#/properties/runtimeProfile/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err504];
}
else {
vErrors.push(err504);
}
errors++;
}
if((typeof data145 == "number") && (isFinite(data145))){
if(data145 > 9007199254740991 || isNaN(data145)){
const err505 = {instancePath:instancePath+"/runtimeProfile/revision",schemaPath:"#/properties/runtimeProfile/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err505];
}
else {
vErrors.push(err505);
}
errors++;
}
if(data145 < 0 || isNaN(data145)){
const err506 = {instancePath:instancePath+"/runtimeProfile/revision",schemaPath:"#/properties/runtimeProfile/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err506];
}
else {
vErrors.push(err506);
}
errors++;
}
}
}
if(data143.mode !== undefined){
let data146 = data143.mode;
if(!((((data146 === "idle") || (data146 === "camera")) || (data146 === "microphone")) || (data146 === "camera-microphone"))){
const err507 = {instancePath:instancePath+"/runtimeProfile/mode",schemaPath:"#/properties/runtimeProfile/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.runtimeProfile.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err507];
}
else {
vErrors.push(err507);
}
errors++;
}
}
if(data143.mirror !== undefined){
if(typeof data143.mirror !== "boolean"){
const err508 = {instancePath:instancePath+"/runtimeProfile/mirror",schemaPath:"#/properties/runtimeProfile/properties/mirror/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err508];
}
else {
vErrors.push(err508);
}
errors++;
}
}
if(data143.fallbackExpressionId !== undefined){
let data148 = data143.fallbackExpressionId;
const _errs326 = errors;
let valid67 = false;
const _errs327 = errors;
if(typeof data148 === "string"){
if(func2(data148) > 64){
const err509 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err509];
}
else {
vErrors.push(err509);
}
errors++;
}
if(func2(data148) < 1){
const err510 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err510];
}
else {
vErrors.push(err510);
}
errors++;
}
if(!pattern4.test(data148)){
const err511 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err511];
}
else {
vErrors.push(err511);
}
errors++;
}
}
else {
const err512 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err512];
}
else {
vErrors.push(err512);
}
errors++;
}
var _valid6 = _errs327 === errors;
valid67 = valid67 || _valid6;
const _errs329 = errors;
if(data148 !== null){
const err513 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err513];
}
else {
vErrors.push(err513);
}
errors++;
}
var _valid6 = _errs329 === errors;
valid67 = valid67 || _valid6;
if(!valid67){
const err514 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err514];
}
else {
vErrors.push(err514);
}
errors++;
}
else {
errors = _errs326;
if(vErrors !== null){
if(_errs326){
vErrors.length = _errs326;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err515 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err515];
}
else {
vErrors.push(err515);
}
errors++;
}
}
if(data.broadcastProfiles !== undefined){
let data149 = data.broadcastProfiles;
if(Array.isArray(data149)){
if(data149.length > 16){
const err516 = {instancePath:instancePath+"/broadcastProfiles",schemaPath:"#/properties/broadcastProfiles/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err516];
}
else {
vErrors.push(err516);
}
errors++;
}
const len17 = data149.length;
for(let i19=0; i19<len17; i19++){
let data150 = data149[i19];
if(data150 && typeof data150 == "object" && !Array.isArray(data150)){
if(data150.id === undefined){
const err517 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err517];
}
else {
vErrors.push(err517);
}
errors++;
}
if(data150.revision === undefined){
const err518 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err518];
}
else {
vErrors.push(err518);
}
errors++;
}
if(data150.displayName === undefined){
const err519 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err519];
}
else {
vErrors.push(err519);
}
errors++;
}
if(data150.width === undefined){
const err520 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err520];
}
else {
vErrors.push(err520);
}
errors++;
}
if(data150.height === undefined){
const err521 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err521];
}
else {
vErrors.push(err521);
}
errors++;
}
if(data150.fps === undefined){
const err522 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "fps"},message:"must have required property '"+"fps"+"'"};
if(vErrors === null){
vErrors = [err522];
}
else {
vErrors.push(err522);
}
errors++;
}
if(data150.transparent === undefined){
const err523 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "transparent"},message:"must have required property '"+"transparent"+"'"};
if(vErrors === null){
vErrors = [err523];
}
else {
vErrors.push(err523);
}
errors++;
}
if(data150.region === undefined){
const err524 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "region"},message:"must have required property '"+"region"+"'"};
if(vErrors === null){
vErrors = [err524];
}
else {
vErrors.push(err524);
}
errors++;
}
if(data150.fit === undefined){
const err525 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "fit"},message:"must have required property '"+"fit"+"'"};
if(vErrors === null){
vErrors = [err525];
}
else {
vErrors.push(err525);
}
errors++;
}
for(const key25 in data150){
if(!(func1.call(schema31.properties.broadcastProfiles.items.properties, key25))){
const err526 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key25},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err526];
}
else {
vErrors.push(err526);
}
errors++;
}
}
if(data150.id !== undefined){
let data151 = data150.id;
if(typeof data151 === "string"){
if(func2(data151) > 64){
const err527 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/id",schemaPath:"#/properties/broadcastProfiles/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err527];
}
else {
vErrors.push(err527);
}
errors++;
}
if(func2(data151) < 1){
const err528 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/id",schemaPath:"#/properties/broadcastProfiles/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err528];
}
else {
vErrors.push(err528);
}
errors++;
}
if(!pattern4.test(data151)){
const err529 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/id",schemaPath:"#/properties/broadcastProfiles/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err529];
}
else {
vErrors.push(err529);
}
errors++;
}
}
else {
const err530 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/id",schemaPath:"#/properties/broadcastProfiles/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err530];
}
else {
vErrors.push(err530);
}
errors++;
}
}
if(data150.revision !== undefined){
let data152 = data150.revision;
if(!(((typeof data152 == "number") && (!(data152 % 1) && !isNaN(data152))) && (isFinite(data152)))){
const err531 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/revision",schemaPath:"#/properties/broadcastProfiles/items/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err531];
}
else {
vErrors.push(err531);
}
errors++;
}
if((typeof data152 == "number") && (isFinite(data152))){
if(data152 > 9007199254740991 || isNaN(data152)){
const err532 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/revision",schemaPath:"#/properties/broadcastProfiles/items/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err532];
}
else {
vErrors.push(err532);
}
errors++;
}
if(data152 < 0 || isNaN(data152)){
const err533 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/revision",schemaPath:"#/properties/broadcastProfiles/items/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err533];
}
else {
vErrors.push(err533);
}
errors++;
}
}
}
if(data150.displayName !== undefined){
let data153 = data150.displayName;
if(typeof data153 === "string"){
if(func2(data153) > 120){
const err534 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/displayName",schemaPath:"#/properties/broadcastProfiles/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err534];
}
else {
vErrors.push(err534);
}
errors++;
}
if(func2(data153) < 1){
const err535 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/displayName",schemaPath:"#/properties/broadcastProfiles/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err535];
}
else {
vErrors.push(err535);
}
errors++;
}
}
else {
const err536 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/displayName",schemaPath:"#/properties/broadcastProfiles/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err536];
}
else {
vErrors.push(err536);
}
errors++;
}
}
if(data150.width !== undefined){
let data154 = data150.width;
if(!(((typeof data154 == "number") && (!(data154 % 1) && !isNaN(data154))) && (isFinite(data154)))){
const err537 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/width",schemaPath:"#/properties/broadcastProfiles/items/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err537];
}
else {
vErrors.push(err537);
}
errors++;
}
if((typeof data154 == "number") && (isFinite(data154))){
if(data154 > 8192 || isNaN(data154)){
const err538 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/width",schemaPath:"#/properties/broadcastProfiles/items/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 8192},message:"must be <= 8192"};
if(vErrors === null){
vErrors = [err538];
}
else {
vErrors.push(err538);
}
errors++;
}
if(data154 < 1 || isNaN(data154)){
const err539 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/width",schemaPath:"#/properties/broadcastProfiles/items/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err539];
}
else {
vErrors.push(err539);
}
errors++;
}
}
}
if(data150.height !== undefined){
let data155 = data150.height;
if(!(((typeof data155 == "number") && (!(data155 % 1) && !isNaN(data155))) && (isFinite(data155)))){
const err540 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/height",schemaPath:"#/properties/broadcastProfiles/items/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err540];
}
else {
vErrors.push(err540);
}
errors++;
}
if((typeof data155 == "number") && (isFinite(data155))){
if(data155 > 8192 || isNaN(data155)){
const err541 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/height",schemaPath:"#/properties/broadcastProfiles/items/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 8192},message:"must be <= 8192"};
if(vErrors === null){
vErrors = [err541];
}
else {
vErrors.push(err541);
}
errors++;
}
if(data155 < 1 || isNaN(data155)){
const err542 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/height",schemaPath:"#/properties/broadcastProfiles/items/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err542];
}
else {
vErrors.push(err542);
}
errors++;
}
}
}
if(data150.fps !== undefined){
let data156 = data150.fps;
if(!(((typeof data156 == "number") && (!(data156 % 1) && !isNaN(data156))) && (isFinite(data156)))){
const err543 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/fps",schemaPath:"#/properties/broadcastProfiles/items/properties/fps/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err543];
}
else {
vErrors.push(err543);
}
errors++;
}
if((typeof data156 == "number") && (isFinite(data156))){
if(data156 > 120 || isNaN(data156)){
const err544 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/fps",schemaPath:"#/properties/broadcastProfiles/items/properties/fps/maximum",keyword:"maximum",params:{comparison: "<=", limit: 120},message:"must be <= 120"};
if(vErrors === null){
vErrors = [err544];
}
else {
vErrors.push(err544);
}
errors++;
}
if(data156 < 1 || isNaN(data156)){
const err545 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/fps",schemaPath:"#/properties/broadcastProfiles/items/properties/fps/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err545];
}
else {
vErrors.push(err545);
}
errors++;
}
}
}
if(data150.transparent !== undefined){
if(typeof data150.transparent !== "boolean"){
const err546 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/transparent",schemaPath:"#/properties/broadcastProfiles/items/properties/transparent/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err546];
}
else {
vErrors.push(err546);
}
errors++;
}
}
if(data150.region !== undefined){
let data158 = data150.region;
if(data158 && typeof data158 == "object" && !Array.isArray(data158)){
if(data158.x === undefined){
const err547 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err547];
}
else {
vErrors.push(err547);
}
errors++;
}
if(data158.y === undefined){
const err548 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err548];
}
else {
vErrors.push(err548);
}
errors++;
}
if(data158.width === undefined){
const err549 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err549];
}
else {
vErrors.push(err549);
}
errors++;
}
if(data158.height === undefined){
const err550 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err550];
}
else {
vErrors.push(err550);
}
errors++;
}
for(const key26 in data158){
if(!((((key26 === "x") || (key26 === "y")) || (key26 === "width")) || (key26 === "height"))){
const err551 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key26},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err551];
}
else {
vErrors.push(err551);
}
errors++;
}
}
if(data158.x !== undefined){
let data159 = data158.x;
if(!((typeof data159 == "number") && (isFinite(data159)))){
const err552 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/x",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err552];
}
else {
vErrors.push(err552);
}
errors++;
}
}
if(data158.y !== undefined){
let data160 = data158.y;
if(!((typeof data160 == "number") && (isFinite(data160)))){
const err553 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/y",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err553];
}
else {
vErrors.push(err553);
}
errors++;
}
}
if(data158.width !== undefined){
let data161 = data158.width;
if((typeof data161 == "number") && (isFinite(data161))){
if(data161 <= 0 || isNaN(data161)){
const err554 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/width",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err554];
}
else {
vErrors.push(err554);
}
errors++;
}
}
else {
const err555 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/width",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err555];
}
else {
vErrors.push(err555);
}
errors++;
}
}
if(data158.height !== undefined){
let data162 = data158.height;
if((typeof data162 == "number") && (isFinite(data162))){
if(data162 <= 0 || isNaN(data162)){
const err556 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/height",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err556];
}
else {
vErrors.push(err556);
}
errors++;
}
}
else {
const err557 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/height",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err557];
}
else {
vErrors.push(err557);
}
errors++;
}
}
}
else {
const err558 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err558];
}
else {
vErrors.push(err558);
}
errors++;
}
}
if(data150.fit !== undefined){
let data163 = data150.fit;
if(!((data163 === "contain") || (data163 === "cover"))){
const err559 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/fit",schemaPath:"#/properties/broadcastProfiles/items/properties/fit/enum",keyword:"enum",params:{allowedValues: schema31.properties.broadcastProfiles.items.properties.fit.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err559];
}
else {
vErrors.push(err559);
}
errors++;
}
}
}
else {
const err560 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err560];
}
else {
vErrors.push(err560);
}
errors++;
}
}
}
else {
const err561 = {instancePath:instancePath+"/broadcastProfiles",schemaPath:"#/properties/broadcastProfiles/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err561];
}
else {
vErrors.push(err561);
}
errors++;
}
}
if(data.exportProfiles !== undefined){
let data164 = data.exportProfiles;
if(Array.isArray(data164)){
if(data164.length > 16){
const err562 = {instancePath:instancePath+"/exportProfiles",schemaPath:"#/properties/exportProfiles/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err562];
}
else {
vErrors.push(err562);
}
errors++;
}
const len18 = data164.length;
for(let i20=0; i20<len18; i20++){
let data165 = data164[i20];
if(data165 && typeof data165 == "object" && !Array.isArray(data165)){
if(data165.id === undefined){
const err563 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err563];
}
else {
vErrors.push(err563);
}
errors++;
}
if(data165.revision === undefined){
const err564 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err564];
}
else {
vErrors.push(err564);
}
errors++;
}
if(data165.displayName === undefined){
const err565 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err565];
}
else {
vErrors.push(err565);
}
errors++;
}
if(data165.target === undefined){
const err566 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "target"},message:"must have required property '"+"target"+"'"};
if(vErrors === null){
vErrors = [err566];
}
else {
vErrors.push(err566);
}
errors++;
}
if(data165.targetVersion === undefined){
const err567 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "targetVersion"},message:"must have required property '"+"targetVersion"+"'"};
if(vErrors === null){
vErrors = [err567];
}
else {
vErrors.push(err567);
}
errors++;
}
if(data165.format === undefined){
const err568 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "format"},message:"must have required property '"+"format"+"'"};
if(vErrors === null){
vErrors = [err568];
}
else {
vErrors.push(err568);
}
errors++;
}
if(data165.converterVersion === undefined){
const err569 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "converterVersion"},message:"must have required property '"+"converterVersion"+"'"};
if(vErrors === null){
vErrors = [err569];
}
else {
vErrors.push(err569);
}
errors++;
}
if(data165.parameterMap === undefined){
const err570 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "parameterMap"},message:"must have required property '"+"parameterMap"+"'"};
if(vErrors === null){
vErrors = [err570];
}
else {
vErrors.push(err570);
}
errors++;
}
for(const key27 in data165){
if(!((((((((key27 === "id") || (key27 === "revision")) || (key27 === "displayName")) || (key27 === "target")) || (key27 === "targetVersion")) || (key27 === "format")) || (key27 === "converterVersion")) || (key27 === "parameterMap"))){
const err571 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key27},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err571];
}
else {
vErrors.push(err571);
}
errors++;
}
}
if(data165.id !== undefined){
let data166 = data165.id;
if(typeof data166 === "string"){
if(func2(data166) > 64){
const err572 = {instancePath:instancePath+"/exportProfiles/" + i20+"/id",schemaPath:"#/properties/exportProfiles/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err572];
}
else {
vErrors.push(err572);
}
errors++;
}
if(func2(data166) < 1){
const err573 = {instancePath:instancePath+"/exportProfiles/" + i20+"/id",schemaPath:"#/properties/exportProfiles/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err573];
}
else {
vErrors.push(err573);
}
errors++;
}
if(!pattern4.test(data166)){
const err574 = {instancePath:instancePath+"/exportProfiles/" + i20+"/id",schemaPath:"#/properties/exportProfiles/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err574];
}
else {
vErrors.push(err574);
}
errors++;
}
}
else {
const err575 = {instancePath:instancePath+"/exportProfiles/" + i20+"/id",schemaPath:"#/properties/exportProfiles/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err575];
}
else {
vErrors.push(err575);
}
errors++;
}
}
if(data165.revision !== undefined){
let data167 = data165.revision;
if(!(((typeof data167 == "number") && (!(data167 % 1) && !isNaN(data167))) && (isFinite(data167)))){
const err576 = {instancePath:instancePath+"/exportProfiles/" + i20+"/revision",schemaPath:"#/properties/exportProfiles/items/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err576];
}
else {
vErrors.push(err576);
}
errors++;
}
if((typeof data167 == "number") && (isFinite(data167))){
if(data167 > 9007199254740991 || isNaN(data167)){
const err577 = {instancePath:instancePath+"/exportProfiles/" + i20+"/revision",schemaPath:"#/properties/exportProfiles/items/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err577];
}
else {
vErrors.push(err577);
}
errors++;
}
if(data167 < 0 || isNaN(data167)){
const err578 = {instancePath:instancePath+"/exportProfiles/" + i20+"/revision",schemaPath:"#/properties/exportProfiles/items/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err578];
}
else {
vErrors.push(err578);
}
errors++;
}
}
}
if(data165.displayName !== undefined){
let data168 = data165.displayName;
if(typeof data168 === "string"){
if(func2(data168) > 120){
const err579 = {instancePath:instancePath+"/exportProfiles/" + i20+"/displayName",schemaPath:"#/properties/exportProfiles/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err579];
}
else {
vErrors.push(err579);
}
errors++;
}
if(func2(data168) < 1){
const err580 = {instancePath:instancePath+"/exportProfiles/" + i20+"/displayName",schemaPath:"#/properties/exportProfiles/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err580];
}
else {
vErrors.push(err580);
}
errors++;
}
}
else {
const err581 = {instancePath:instancePath+"/exportProfiles/" + i20+"/displayName",schemaPath:"#/properties/exportProfiles/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err581];
}
else {
vErrors.push(err581);
}
errors++;
}
}
if(data165.target !== undefined){
if(!(data165.target === "inochi2d")){
const err582 = {instancePath:instancePath+"/exportProfiles/" + i20+"/target",schemaPath:"#/properties/exportProfiles/items/properties/target/enum",keyword:"enum",params:{allowedValues: schema31.properties.exportProfiles.items.properties.target.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err582];
}
else {
vErrors.push(err582);
}
errors++;
}
}
if(data165.targetVersion !== undefined){
let data170 = data165.targetVersion;
if(typeof data170 === "string"){
if(func2(data170) > 32){
const err583 = {instancePath:instancePath+"/exportProfiles/" + i20+"/targetVersion",schemaPath:"#/properties/exportProfiles/items/properties/targetVersion/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err583];
}
else {
vErrors.push(err583);
}
errors++;
}
if(func2(data170) < 1){
const err584 = {instancePath:instancePath+"/exportProfiles/" + i20+"/targetVersion",schemaPath:"#/properties/exportProfiles/items/properties/targetVersion/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err584];
}
else {
vErrors.push(err584);
}
errors++;
}
if(!pattern12.test(data170)){
const err585 = {instancePath:instancePath+"/exportProfiles/" + i20+"/targetVersion",schemaPath:"#/properties/exportProfiles/items/properties/targetVersion/pattern",keyword:"pattern",params:{pattern: "^\\d+\\.\\d+\\.\\d+$"},message:"must match pattern \""+"^\\d+\\.\\d+\\.\\d+$"+"\""};
if(vErrors === null){
vErrors = [err585];
}
else {
vErrors.push(err585);
}
errors++;
}
}
else {
const err586 = {instancePath:instancePath+"/exportProfiles/" + i20+"/targetVersion",schemaPath:"#/properties/exportProfiles/items/properties/targetVersion/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err586];
}
else {
vErrors.push(err586);
}
errors++;
}
}
if(data165.format !== undefined){
if(!(data165.format === "inp")){
const err587 = {instancePath:instancePath+"/exportProfiles/" + i20+"/format",schemaPath:"#/properties/exportProfiles/items/properties/format/enum",keyword:"enum",params:{allowedValues: schema31.properties.exportProfiles.items.properties.format.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err587];
}
else {
vErrors.push(err587);
}
errors++;
}
}
if(data165.converterVersion !== undefined){
let data172 = data165.converterVersion;
if(typeof data172 === "string"){
if(func2(data172) > 32){
const err588 = {instancePath:instancePath+"/exportProfiles/" + i20+"/converterVersion",schemaPath:"#/properties/exportProfiles/items/properties/converterVersion/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err588];
}
else {
vErrors.push(err588);
}
errors++;
}
if(func2(data172) < 1){
const err589 = {instancePath:instancePath+"/exportProfiles/" + i20+"/converterVersion",schemaPath:"#/properties/exportProfiles/items/properties/converterVersion/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err589];
}
else {
vErrors.push(err589);
}
errors++;
}
if(!pattern12.test(data172)){
const err590 = {instancePath:instancePath+"/exportProfiles/" + i20+"/converterVersion",schemaPath:"#/properties/exportProfiles/items/properties/converterVersion/pattern",keyword:"pattern",params:{pattern: "^\\d+\\.\\d+\\.\\d+$"},message:"must match pattern \""+"^\\d+\\.\\d+\\.\\d+$"+"\""};
if(vErrors === null){
vErrors = [err590];
}
else {
vErrors.push(err590);
}
errors++;
}
}
else {
const err591 = {instancePath:instancePath+"/exportProfiles/" + i20+"/converterVersion",schemaPath:"#/properties/exportProfiles/items/properties/converterVersion/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err591];
}
else {
vErrors.push(err591);
}
errors++;
}
}
if(data165.parameterMap !== undefined){
let data173 = data165.parameterMap;
if(Array.isArray(data173)){
if(data173.length > 128){
const err592 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err592];
}
else {
vErrors.push(err592);
}
errors++;
}
const len19 = data173.length;
for(let i21=0; i21<len19; i21++){
let data174 = data173[i21];
if(data174 && typeof data174 == "object" && !Array.isArray(data174)){
if(data174.parameterId === undefined){
const err593 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21,schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err593];
}
else {
vErrors.push(err593);
}
errors++;
}
if(data174.targetName === undefined){
const err594 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21,schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/required",keyword:"required",params:{missingProperty: "targetName"},message:"must have required property '"+"targetName"+"'"};
if(vErrors === null){
vErrors = [err594];
}
else {
vErrors.push(err594);
}
errors++;
}
for(const key28 in data174){
if(!((key28 === "parameterId") || (key28 === "targetName"))){
const err595 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21,schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key28},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err595];
}
else {
vErrors.push(err595);
}
errors++;
}
}
if(data174.parameterId !== undefined){
let data175 = data174.parameterId;
if(typeof data175 === "string"){
if(func2(data175) > 64){
const err596 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/parameterId",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err596];
}
else {
vErrors.push(err596);
}
errors++;
}
if(func2(data175) < 1){
const err597 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/parameterId",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err597];
}
else {
vErrors.push(err597);
}
errors++;
}
if(!pattern4.test(data175)){
const err598 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/parameterId",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err598];
}
else {
vErrors.push(err598);
}
errors++;
}
}
else {
const err599 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/parameterId",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err599];
}
else {
vErrors.push(err599);
}
errors++;
}
}
if(data174.targetName !== undefined){
let data176 = data174.targetName;
if(typeof data176 === "string"){
if(func2(data176) > 64){
const err600 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/targetName",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/targetName/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err600];
}
else {
vErrors.push(err600);
}
errors++;
}
if(func2(data176) < 1){
const err601 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/targetName",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/targetName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err601];
}
else {
vErrors.push(err601);
}
errors++;
}
if(!pattern44.test(data176)){
const err602 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/targetName",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/targetName/pattern",keyword:"pattern",params:{pattern: "^[a-zA-Z][a-zA-Z0-9_]*$"},message:"must match pattern \""+"^[a-zA-Z][a-zA-Z0-9_]*$"+"\""};
if(vErrors === null){
vErrors = [err602];
}
else {
vErrors.push(err602);
}
errors++;
}
}
else {
const err603 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/targetName",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/targetName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err603];
}
else {
vErrors.push(err603);
}
errors++;
}
}
}
else {
const err604 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21,schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err604];
}
else {
vErrors.push(err604);
}
errors++;
}
}
}
else {
const err605 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err605];
}
else {
vErrors.push(err605);
}
errors++;
}
}
}
else {
const err606 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err606];
}
else {
vErrors.push(err606);
}
errors++;
}
}
}
else {
const err607 = {instancePath:instancePath+"/exportProfiles",schemaPath:"#/properties/exportProfiles/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err607];
}
else {
vErrors.push(err607);
}
errors++;
}
}
if(data.provenance !== undefined){
let data177 = data.provenance;
if(data177 && typeof data177 == "object" && !Array.isArray(data177)){
if(data177.preparation === undefined){
const err608 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/required",keyword:"required",params:{missingProperty: "preparation"},message:"must have required property '"+"preparation"+"'"};
if(vErrors === null){
vErrors = [err608];
}
else {
vErrors.push(err608);
}
errors++;
}
if(data177.limitations === undefined){
const err609 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/required",keyword:"required",params:{missingProperty: "limitations"},message:"must have required property '"+"limitations"+"'"};
if(vErrors === null){
vErrors = [err609];
}
else {
vErrors.push(err609);
}
errors++;
}
for(const key29 in data177){
if(!((key29 === "preparation") || (key29 === "limitations"))){
const err610 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key29},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err610];
}
else {
vErrors.push(err610);
}
errors++;
}
}
if(data177.preparation !== undefined){
let data178 = data177.preparation;
if(typeof data178 === "string"){
if(func2(data178) > 512){
const err611 = {instancePath:instancePath+"/provenance/preparation",schemaPath:"#/properties/provenance/properties/preparation/maxLength",keyword:"maxLength",params:{limit: 512},message:"must NOT have more than 512 characters"};
if(vErrors === null){
vErrors = [err611];
}
else {
vErrors.push(err611);
}
errors++;
}
if(func2(data178) < 1){
const err612 = {instancePath:instancePath+"/provenance/preparation",schemaPath:"#/properties/provenance/properties/preparation/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err612];
}
else {
vErrors.push(err612);
}
errors++;
}
}
else {
const err613 = {instancePath:instancePath+"/provenance/preparation",schemaPath:"#/properties/provenance/properties/preparation/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err613];
}
else {
vErrors.push(err613);
}
errors++;
}
}
if(data177.limitations !== undefined){
let data179 = data177.limitations;
if(Array.isArray(data179)){
if(data179.length > 128){
const err614 = {instancePath:instancePath+"/provenance/limitations",schemaPath:"#/properties/provenance/properties/limitations/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err614];
}
else {
vErrors.push(err614);
}
errors++;
}
const len20 = data179.length;
for(let i22=0; i22<len20; i22++){
let data180 = data179[i22];
if(typeof data180 === "string"){
if(func2(data180) > 512){
const err615 = {instancePath:instancePath+"/provenance/limitations/" + i22,schemaPath:"#/properties/provenance/properties/limitations/items/maxLength",keyword:"maxLength",params:{limit: 512},message:"must NOT have more than 512 characters"};
if(vErrors === null){
vErrors = [err615];
}
else {
vErrors.push(err615);
}
errors++;
}
if(func2(data180) < 1){
const err616 = {instancePath:instancePath+"/provenance/limitations/" + i22,schemaPath:"#/properties/provenance/properties/limitations/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err616];
}
else {
vErrors.push(err616);
}
errors++;
}
}
else {
const err617 = {instancePath:instancePath+"/provenance/limitations/" + i22,schemaPath:"#/properties/provenance/properties/limitations/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err617];
}
else {
vErrors.push(err617);
}
errors++;
}
}
}
else {
const err618 = {instancePath:instancePath+"/provenance/limitations",schemaPath:"#/properties/provenance/properties/limitations/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err618];
}
else {
vErrors.push(err618);
}
errors++;
}
}
}
else {
const err619 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err619];
}
else {
vErrors.push(err619);
}
errors++;
}
}
if(data.derivedProjects !== undefined){
let data181 = data.derivedProjects;
if(Array.isArray(data181)){
if(data181.length > 32){
const err620 = {instancePath:instancePath+"/derivedProjects",schemaPath:"#/properties/derivedProjects/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err620];
}
else {
vErrors.push(err620);
}
errors++;
}
const len21 = data181.length;
for(let i23=0; i23<len21; i23++){
let data182 = data181[i23];
if(data182 && typeof data182 == "object" && !Array.isArray(data182)){
if(data182.projectId === undefined){
const err621 = {instancePath:instancePath+"/derivedProjects/" + i23,schemaPath:"#/properties/derivedProjects/items/required",keyword:"required",params:{missingProperty: "projectId"},message:"must have required property '"+"projectId"+"'"};
if(vErrors === null){
vErrors = [err621];
}
else {
vErrors.push(err621);
}
errors++;
}
if(data182.relation === undefined){
const err622 = {instancePath:instancePath+"/derivedProjects/" + i23,schemaPath:"#/properties/derivedProjects/items/required",keyword:"required",params:{missingProperty: "relation"},message:"must have required property '"+"relation"+"'"};
if(vErrors === null){
vErrors = [err622];
}
else {
vErrors.push(err622);
}
errors++;
}
for(const key30 in data182){
if(!((key30 === "projectId") || (key30 === "relation"))){
const err623 = {instancePath:instancePath+"/derivedProjects/" + i23,schemaPath:"#/properties/derivedProjects/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key30},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err623];
}
else {
vErrors.push(err623);
}
errors++;
}
}
if(data182.projectId !== undefined){
let data183 = data182.projectId;
if(typeof data183 === "string"){
if(func2(data183) > 64){
const err624 = {instancePath:instancePath+"/derivedProjects/" + i23+"/projectId",schemaPath:"#/properties/derivedProjects/items/properties/projectId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err624];
}
else {
vErrors.push(err624);
}
errors++;
}
if(func2(data183) < 1){
const err625 = {instancePath:instancePath+"/derivedProjects/" + i23+"/projectId",schemaPath:"#/properties/derivedProjects/items/properties/projectId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err625];
}
else {
vErrors.push(err625);
}
errors++;
}
if(!pattern4.test(data183)){
const err626 = {instancePath:instancePath+"/derivedProjects/" + i23+"/projectId",schemaPath:"#/properties/derivedProjects/items/properties/projectId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err626];
}
else {
vErrors.push(err626);
}
errors++;
}
}
else {
const err627 = {instancePath:instancePath+"/derivedProjects/" + i23+"/projectId",schemaPath:"#/properties/derivedProjects/items/properties/projectId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err627];
}
else {
vErrors.push(err627);
}
errors++;
}
}
if(data182.relation !== undefined){
let data184 = data182.relation;
if(!((data184 === "3d") || (data184 === "generated-variant"))){
const err628 = {instancePath:instancePath+"/derivedProjects/" + i23+"/relation",schemaPath:"#/properties/derivedProjects/items/properties/relation/enum",keyword:"enum",params:{allowedValues: schema31.properties.derivedProjects.items.properties.relation.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err628];
}
else {
vErrors.push(err628);
}
errors++;
}
}
}
else {
const err629 = {instancePath:instancePath+"/derivedProjects/" + i23,schemaPath:"#/properties/derivedProjects/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err629];
}
else {
vErrors.push(err629);
}
errors++;
}
}
}
else {
const err630 = {instancePath:instancePath+"/derivedProjects",schemaPath:"#/properties/derivedProjects/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err630];
}
else {
vErrors.push(err630);
}
errors++;
}
}
if(data.motion !== undefined){
let data185 = data.motion;
if(data185 && typeof data185 == "object" && !Array.isArray(data185)){
if(data185.version === undefined){
const err631 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err631];
}
else {
vErrors.push(err631);
}
errors++;
}
if(data185.faceWidth === undefined){
const err632 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "faceWidth"},message:"must have required property '"+"faceWidth"+"'"};
if(vErrors === null){
vErrors = [err632];
}
else {
vErrors.push(err632);
}
errors++;
}
if(data185.maxRollDegrees === undefined){
const err633 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "maxRollDegrees"},message:"must have required property '"+"maxRollDegrees"+"'"};
if(vErrors === null){
vErrors = [err633];
}
else {
vErrors.push(err633);
}
errors++;
}
if(data185.secondary === undefined){
const err634 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "secondary"},message:"must have required property '"+"secondary"+"'"};
if(vErrors === null){
vErrors = [err634];
}
else {
vErrors.push(err634);
}
errors++;
}
if(data185.settings === undefined){
const err635 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "settings"},message:"must have required property '"+"settings"+"'"};
if(vErrors === null){
vErrors = [err635];
}
else {
vErrors.push(err635);
}
errors++;
}
if(data185.meshes === undefined){
const err636 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "meshes"},message:"must have required property '"+"meshes"+"'"};
if(vErrors === null){
vErrors = [err636];
}
else {
vErrors.push(err636);
}
errors++;
}
for(const key31 in data185){
if(!((((((key31 === "version") || (key31 === "faceWidth")) || (key31 === "maxRollDegrees")) || (key31 === "secondary")) || (key31 === "settings")) || (key31 === "meshes"))){
const err637 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key31},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err637];
}
else {
vErrors.push(err637);
}
errors++;
}
}
if(data185.version !== undefined){
if(1 !== data185.version){
const err638 = {instancePath:instancePath+"/motion/version",schemaPath:"#/properties/motion/properties/version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err638];
}
else {
vErrors.push(err638);
}
errors++;
}
}
if(data185.faceWidth !== undefined){
let data187 = data185.faceWidth;
if((typeof data187 == "number") && (isFinite(data187))){
if(data187 <= 0 || isNaN(data187)){
const err639 = {instancePath:instancePath+"/motion/faceWidth",schemaPath:"#/properties/motion/properties/faceWidth/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err639];
}
else {
vErrors.push(err639);
}
errors++;
}
}
else {
const err640 = {instancePath:instancePath+"/motion/faceWidth",schemaPath:"#/properties/motion/properties/faceWidth/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err640];
}
else {
vErrors.push(err640);
}
errors++;
}
}
if(data185.maxRollDegrees !== undefined){
let data188 = data185.maxRollDegrees;
if((typeof data188 == "number") && (isFinite(data188))){
if(data188 > 6 || isNaN(data188)){
const err641 = {instancePath:instancePath+"/motion/maxRollDegrees",schemaPath:"#/properties/motion/properties/maxRollDegrees/maximum",keyword:"maximum",params:{comparison: "<=", limit: 6},message:"must be <= 6"};
if(vErrors === null){
vErrors = [err641];
}
else {
vErrors.push(err641);
}
errors++;
}
if(data188 < 0 || isNaN(data188)){
const err642 = {instancePath:instancePath+"/motion/maxRollDegrees",schemaPath:"#/properties/motion/properties/maxRollDegrees/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err642];
}
else {
vErrors.push(err642);
}
errors++;
}
}
else {
const err643 = {instancePath:instancePath+"/motion/maxRollDegrees",schemaPath:"#/properties/motion/properties/maxRollDegrees/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err643];
}
else {
vErrors.push(err643);
}
errors++;
}
}
if(data185.secondary !== undefined){
if("disabled" !== data185.secondary){
const err644 = {instancePath:instancePath+"/motion/secondary",schemaPath:"#/properties/motion/properties/secondary/const",keyword:"const",params:{allowedValue: "disabled"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err644];
}
else {
vErrors.push(err644);
}
errors++;
}
}
if(data185.settings !== undefined){
let data190 = data185.settings;
if(data190 && typeof data190 == "object" && !Array.isArray(data190)){
if(data190.strength === undefined){
const err645 = {instancePath:instancePath+"/motion/settings",schemaPath:"#/properties/motion/properties/settings/required",keyword:"required",params:{missingProperty: "strength"},message:"must have required property '"+"strength"+"'"};
if(vErrors === null){
vErrors = [err645];
}
else {
vErrors.push(err645);
}
errors++;
}
if(data190.smoothingMs === undefined){
const err646 = {instancePath:instancePath+"/motion/settings",schemaPath:"#/properties/motion/properties/settings/required",keyword:"required",params:{missingProperty: "smoothingMs"},message:"must have required property '"+"smoothingMs"+"'"};
if(vErrors === null){
vErrors = [err646];
}
else {
vErrors.push(err646);
}
errors++;
}
if(data190.pose === undefined){
const err647 = {instancePath:instancePath+"/motion/settings",schemaPath:"#/properties/motion/properties/settings/required",keyword:"required",params:{missingProperty: "pose"},message:"must have required property '"+"pose"+"'"};
if(vErrors === null){
vErrors = [err647];
}
else {
vErrors.push(err647);
}
errors++;
}
for(const key32 in data190){
if(!(((key32 === "strength") || (key32 === "smoothingMs")) || (key32 === "pose"))){
const err648 = {instancePath:instancePath+"/motion/settings",schemaPath:"#/properties/motion/properties/settings/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key32},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err648];
}
else {
vErrors.push(err648);
}
errors++;
}
}
if(data190.strength !== undefined){
let data191 = data190.strength;
if((typeof data191 == "number") && (isFinite(data191))){
if(data191 > 1 || isNaN(data191)){
const err649 = {instancePath:instancePath+"/motion/settings/strength",schemaPath:"#/properties/motion/properties/settings/properties/strength/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err649];
}
else {
vErrors.push(err649);
}
errors++;
}
if(data191 < 0 || isNaN(data191)){
const err650 = {instancePath:instancePath+"/motion/settings/strength",schemaPath:"#/properties/motion/properties/settings/properties/strength/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err650];
}
else {
vErrors.push(err650);
}
errors++;
}
}
else {
const err651 = {instancePath:instancePath+"/motion/settings/strength",schemaPath:"#/properties/motion/properties/settings/properties/strength/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err651];
}
else {
vErrors.push(err651);
}
errors++;
}
}
if(data190.smoothingMs !== undefined){
let data192 = data190.smoothingMs;
if(!(((typeof data192 == "number") && (!(data192 % 1) && !isNaN(data192))) && (isFinite(data192)))){
const err652 = {instancePath:instancePath+"/motion/settings/smoothingMs",schemaPath:"#/properties/motion/properties/settings/properties/smoothingMs/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err652];
}
else {
vErrors.push(err652);
}
errors++;
}
if((typeof data192 == "number") && (isFinite(data192))){
if(data192 > 1000 || isNaN(data192)){
const err653 = {instancePath:instancePath+"/motion/settings/smoothingMs",schemaPath:"#/properties/motion/properties/settings/properties/smoothingMs/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1000},message:"must be <= 1000"};
if(vErrors === null){
vErrors = [err653];
}
else {
vErrors.push(err653);
}
errors++;
}
if(data192 < 0 || isNaN(data192)){
const err654 = {instancePath:instancePath+"/motion/settings/smoothingMs",schemaPath:"#/properties/motion/properties/settings/properties/smoothingMs/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err654];
}
else {
vErrors.push(err654);
}
errors++;
}
}
}
if(data190.pose !== undefined){
let data193 = data190.pose;
if(Array.isArray(data193)){
if(data193.length > 128){
const err655 = {instancePath:instancePath+"/motion/settings/pose",schemaPath:"#/properties/motion/properties/settings/properties/pose/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err655];
}
else {
vErrors.push(err655);
}
errors++;
}
const len22 = data193.length;
for(let i24=0; i24<len22; i24++){
let data194 = data193[i24];
if(data194 && typeof data194 == "object" && !Array.isArray(data194)){
if(data194.parameterId === undefined){
const err656 = {instancePath:instancePath+"/motion/settings/pose/" + i24,schemaPath:"#/properties/motion/properties/settings/properties/pose/items/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err656];
}
else {
vErrors.push(err656);
}
errors++;
}
if(data194.value === undefined){
const err657 = {instancePath:instancePath+"/motion/settings/pose/" + i24,schemaPath:"#/properties/motion/properties/settings/properties/pose/items/required",keyword:"required",params:{missingProperty: "value"},message:"must have required property '"+"value"+"'"};
if(vErrors === null){
vErrors = [err657];
}
else {
vErrors.push(err657);
}
errors++;
}
for(const key33 in data194){
if(!((key33 === "parameterId") || (key33 === "value"))){
const err658 = {instancePath:instancePath+"/motion/settings/pose/" + i24,schemaPath:"#/properties/motion/properties/settings/properties/pose/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key33},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err658];
}
else {
vErrors.push(err658);
}
errors++;
}
}
if(data194.parameterId !== undefined){
let data195 = data194.parameterId;
if(typeof data195 === "string"){
if(func2(data195) > 64){
const err659 = {instancePath:instancePath+"/motion/settings/pose/" + i24+"/parameterId",schemaPath:"#/properties/motion/properties/settings/properties/pose/items/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err659];
}
else {
vErrors.push(err659);
}
errors++;
}
if(func2(data195) < 1){
const err660 = {instancePath:instancePath+"/motion/settings/pose/" + i24+"/parameterId",schemaPath:"#/properties/motion/properties/settings/properties/pose/items/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err660];
}
else {
vErrors.push(err660);
}
errors++;
}
if(!pattern4.test(data195)){
const err661 = {instancePath:instancePath+"/motion/settings/pose/" + i24+"/parameterId",schemaPath:"#/properties/motion/properties/settings/properties/pose/items/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err661];
}
else {
vErrors.push(err661);
}
errors++;
}
}
else {
const err662 = {instancePath:instancePath+"/motion/settings/pose/" + i24+"/parameterId",schemaPath:"#/properties/motion/properties/settings/properties/pose/items/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err662];
}
else {
vErrors.push(err662);
}
errors++;
}
}
if(data194.value !== undefined){
let data196 = data194.value;
if(!((typeof data196 == "number") && (isFinite(data196)))){
const err663 = {instancePath:instancePath+"/motion/settings/pose/" + i24+"/value",schemaPath:"#/properties/motion/properties/settings/properties/pose/items/properties/value/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err663];
}
else {
vErrors.push(err663);
}
errors++;
}
}
}
else {
const err664 = {instancePath:instancePath+"/motion/settings/pose/" + i24,schemaPath:"#/properties/motion/properties/settings/properties/pose/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err664];
}
else {
vErrors.push(err664);
}
errors++;
}
}
}
else {
const err665 = {instancePath:instancePath+"/motion/settings/pose",schemaPath:"#/properties/motion/properties/settings/properties/pose/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err665];
}
else {
vErrors.push(err665);
}
errors++;
}
}
}
else {
const err666 = {instancePath:instancePath+"/motion/settings",schemaPath:"#/properties/motion/properties/settings/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err666];
}
else {
vErrors.push(err666);
}
errors++;
}
}
if(data185.meshes !== undefined){
let data197 = data185.meshes;
if(Array.isArray(data197)){
if(data197.length > 64){
const err667 = {instancePath:instancePath+"/motion/meshes",schemaPath:"#/properties/motion/properties/meshes/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err667];
}
else {
vErrors.push(err667);
}
errors++;
}
const len23 = data197.length;
for(let i25=0; i25<len23; i25++){
let data198 = data197[i25];
if(data198 && typeof data198 == "object" && !Array.isArray(data198)){
if(data198.partId === undefined){
const err668 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "partId"},message:"must have required property '"+"partId"+"'"};
if(vErrors === null){
vErrors = [err668];
}
else {
vErrors.push(err668);
}
errors++;
}
if(data198.pivot === undefined){
const err669 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "pivot"},message:"must have required property '"+"pivot"+"'"};
if(vErrors === null){
vErrors = [err669];
}
else {
vErrors.push(err669);
}
errors++;
}
if(data198.yawParameterId === undefined){
const err670 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "yawParameterId"},message:"must have required property '"+"yawParameterId"+"'"};
if(vErrors === null){
vErrors = [err670];
}
else {
vErrors.push(err670);
}
errors++;
}
if(data198.rollParameterId === undefined){
const err671 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "rollParameterId"},message:"must have required property '"+"rollParameterId"+"'"};
if(vErrors === null){
vErrors = [err671];
}
else {
vErrors.push(err671);
}
errors++;
}
if(data198.curve === undefined){
const err672 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "curve"},message:"must have required property '"+"curve"+"'"};
if(vErrors === null){
vErrors = [err672];
}
else {
vErrors.push(err672);
}
errors++;
}
if(data198.vertices === undefined){
const err673 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "vertices"},message:"must have required property '"+"vertices"+"'"};
if(vErrors === null){
vErrors = [err673];
}
else {
vErrors.push(err673);
}
errors++;
}
if(data198.triangles === undefined){
const err674 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "triangles"},message:"must have required property '"+"triangles"+"'"};
if(vErrors === null){
vErrors = [err674];
}
else {
vErrors.push(err674);
}
errors++;
}
for(const key34 in data198){
if(!(((((((key34 === "partId") || (key34 === "pivot")) || (key34 === "yawParameterId")) || (key34 === "rollParameterId")) || (key34 === "curve")) || (key34 === "vertices")) || (key34 === "triangles"))){
const err675 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key34},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err675];
}
else {
vErrors.push(err675);
}
errors++;
}
}
if(data198.partId !== undefined){
let data199 = data198.partId;
if(typeof data199 === "string"){
if(func2(data199) > 64){
const err676 = {instancePath:instancePath+"/motion/meshes/" + i25+"/partId",schemaPath:"#/properties/motion/properties/meshes/items/properties/partId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err676];
}
else {
vErrors.push(err676);
}
errors++;
}
if(func2(data199) < 1){
const err677 = {instancePath:instancePath+"/motion/meshes/" + i25+"/partId",schemaPath:"#/properties/motion/properties/meshes/items/properties/partId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err677];
}
else {
vErrors.push(err677);
}
errors++;
}
if(!pattern4.test(data199)){
const err678 = {instancePath:instancePath+"/motion/meshes/" + i25+"/partId",schemaPath:"#/properties/motion/properties/meshes/items/properties/partId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err678];
}
else {
vErrors.push(err678);
}
errors++;
}
}
else {
const err679 = {instancePath:instancePath+"/motion/meshes/" + i25+"/partId",schemaPath:"#/properties/motion/properties/meshes/items/properties/partId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err679];
}
else {
vErrors.push(err679);
}
errors++;
}
}
if(data198.pivot !== undefined){
let data200 = data198.pivot;
if(Array.isArray(data200)){
if(data200.length > 2){
const err680 = {instancePath:instancePath+"/motion/meshes/" + i25+"/pivot",schemaPath:"#/properties/motion/properties/meshes/items/properties/pivot/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err680];
}
else {
vErrors.push(err680);
}
errors++;
}
if(data200.length < 2){
const err681 = {instancePath:instancePath+"/motion/meshes/" + i25+"/pivot",schemaPath:"#/properties/motion/properties/meshes/items/properties/pivot/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err681];
}
else {
vErrors.push(err681);
}
errors++;
}
const len24 = data200.length;
for(let i26=0; i26<len24; i26++){
let data201 = data200[i26];
if(!((typeof data201 == "number") && (isFinite(data201)))){
const err682 = {instancePath:instancePath+"/motion/meshes/" + i25+"/pivot/" + i26,schemaPath:"#/properties/motion/properties/meshes/items/properties/pivot/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err682];
}
else {
vErrors.push(err682);
}
errors++;
}
}
}
else {
const err683 = {instancePath:instancePath+"/motion/meshes/" + i25+"/pivot",schemaPath:"#/properties/motion/properties/meshes/items/properties/pivot/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err683];
}
else {
vErrors.push(err683);
}
errors++;
}
}
if(data198.yawParameterId !== undefined){
let data202 = data198.yawParameterId;
const _errs442 = errors;
let valid94 = false;
const _errs443 = errors;
if(typeof data202 === "string"){
if(func2(data202) > 64){
const err684 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err684];
}
else {
vErrors.push(err684);
}
errors++;
}
if(func2(data202) < 1){
const err685 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err685];
}
else {
vErrors.push(err685);
}
errors++;
}
if(!pattern4.test(data202)){
const err686 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err686];
}
else {
vErrors.push(err686);
}
errors++;
}
}
else {
const err687 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err687];
}
else {
vErrors.push(err687);
}
errors++;
}
var _valid7 = _errs443 === errors;
valid94 = valid94 || _valid7;
const _errs445 = errors;
if(data202 !== null){
const err688 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err688];
}
else {
vErrors.push(err688);
}
errors++;
}
var _valid7 = _errs445 === errors;
valid94 = valid94 || _valid7;
if(!valid94){
const err689 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err689];
}
else {
vErrors.push(err689);
}
errors++;
}
else {
errors = _errs442;
if(vErrors !== null){
if(_errs442){
vErrors.length = _errs442;
}
else {
vErrors = null;
}
}
}
}
if(data198.rollParameterId !== undefined){
let data203 = data198.rollParameterId;
const _errs448 = errors;
let valid95 = false;
const _errs449 = errors;
if(typeof data203 === "string"){
if(func2(data203) > 64){
const err690 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err690];
}
else {
vErrors.push(err690);
}
errors++;
}
if(func2(data203) < 1){
const err691 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err691];
}
else {
vErrors.push(err691);
}
errors++;
}
if(!pattern4.test(data203)){
const err692 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err692];
}
else {
vErrors.push(err692);
}
errors++;
}
}
else {
const err693 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err693];
}
else {
vErrors.push(err693);
}
errors++;
}
var _valid8 = _errs449 === errors;
valid95 = valid95 || _valid8;
const _errs451 = errors;
if(data203 !== null){
const err694 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err694];
}
else {
vErrors.push(err694);
}
errors++;
}
var _valid8 = _errs451 === errors;
valid95 = valid95 || _valid8;
if(!valid95){
const err695 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err695];
}
else {
vErrors.push(err695);
}
errors++;
}
else {
errors = _errs448;
if(vErrors !== null){
if(_errs448){
vErrors.length = _errs448;
}
else {
vErrors = null;
}
}
}
}
if(data198.curve !== undefined){
let data204 = data198.curve;
if(!((data204 === "linear") || (data204 === "smoothstep"))){
const err696 = {instancePath:instancePath+"/motion/meshes/" + i25+"/curve",schemaPath:"#/properties/motion/properties/meshes/items/properties/curve/enum",keyword:"enum",params:{allowedValues: schema31.properties.motion.properties.meshes.items.properties.curve.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err696];
}
else {
vErrors.push(err696);
}
errors++;
}
}
if(data198.vertices !== undefined){
let data205 = data198.vertices;
if(Array.isArray(data205)){
if(data205.length > 1024){
const err697 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/maxItems",keyword:"maxItems",params:{limit: 1024},message:"must NOT have more than 1024 items"};
if(vErrors === null){
vErrors = [err697];
}
else {
vErrors.push(err697);
}
errors++;
}
if(data205.length < 3){
const err698 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/minItems",keyword:"minItems",params:{limit: 3},message:"must NOT have fewer than 3 items"};
if(vErrors === null){
vErrors = [err698];
}
else {
vErrors.push(err698);
}
errors++;
}
const len25 = data205.length;
for(let i27=0; i27<len25; i27++){
let data206 = data205[i27];
if(data206 && typeof data206 == "object" && !Array.isArray(data206)){
if(data206.position === undefined){
const err699 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/required",keyword:"required",params:{missingProperty: "position"},message:"must have required property '"+"position"+"'"};
if(vErrors === null){
vErrors = [err699];
}
else {
vErrors.push(err699);
}
errors++;
}
if(data206.weight === undefined){
const err700 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/required",keyword:"required",params:{missingProperty: "weight"},message:"must have required property '"+"weight"+"'"};
if(vErrors === null){
vErrors = [err700];
}
else {
vErrors.push(err700);
}
errors++;
}
if(data206.minimum === undefined){
const err701 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/required",keyword:"required",params:{missingProperty: "minimum"},message:"must have required property '"+"minimum"+"'"};
if(vErrors === null){
vErrors = [err701];
}
else {
vErrors.push(err701);
}
errors++;
}
if(data206.maximum === undefined){
const err702 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/required",keyword:"required",params:{missingProperty: "maximum"},message:"must have required property '"+"maximum"+"'"};
if(vErrors === null){
vErrors = [err702];
}
else {
vErrors.push(err702);
}
errors++;
}
for(const key35 in data206){
if(!((((key35 === "position") || (key35 === "weight")) || (key35 === "minimum")) || (key35 === "maximum"))){
const err703 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key35},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err703];
}
else {
vErrors.push(err703);
}
errors++;
}
}
if(data206.position !== undefined){
let data207 = data206.position;
if(Array.isArray(data207)){
if(data207.length > 2){
const err704 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/position",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/position/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err704];
}
else {
vErrors.push(err704);
}
errors++;
}
if(data207.length < 2){
const err705 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/position",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/position/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err705];
}
else {
vErrors.push(err705);
}
errors++;
}
const len26 = data207.length;
for(let i28=0; i28<len26; i28++){
let data208 = data207[i28];
if(!((typeof data208 == "number") && (isFinite(data208)))){
const err706 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/position/" + i28,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/position/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err706];
}
else {
vErrors.push(err706);
}
errors++;
}
}
}
else {
const err707 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/position",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/position/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err707];
}
else {
vErrors.push(err707);
}
errors++;
}
}
if(data206.weight !== undefined){
let data209 = data206.weight;
if((typeof data209 == "number") && (isFinite(data209))){
if(data209 > 1 || isNaN(data209)){
const err708 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/weight",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/weight/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err708];
}
else {
vErrors.push(err708);
}
errors++;
}
if(data209 < 0 || isNaN(data209)){
const err709 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/weight",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/weight/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err709];
}
else {
vErrors.push(err709);
}
errors++;
}
}
else {
const err710 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/weight",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/weight/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err710];
}
else {
vErrors.push(err710);
}
errors++;
}
}
if(data206.minimum !== undefined){
let data210 = data206.minimum;
if(Array.isArray(data210)){
if(data210.length > 2){
const err711 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/minimum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/minimum/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err711];
}
else {
vErrors.push(err711);
}
errors++;
}
if(data210.length < 2){
const err712 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/minimum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/minimum/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err712];
}
else {
vErrors.push(err712);
}
errors++;
}
const len27 = data210.length;
for(let i29=0; i29<len27; i29++){
let data211 = data210[i29];
if(!((typeof data211 == "number") && (isFinite(data211)))){
const err713 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/minimum/" + i29,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/minimum/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err713];
}
else {
vErrors.push(err713);
}
errors++;
}
}
}
else {
const err714 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/minimum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/minimum/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err714];
}
else {
vErrors.push(err714);
}
errors++;
}
}
if(data206.maximum !== undefined){
let data212 = data206.maximum;
if(Array.isArray(data212)){
if(data212.length > 2){
const err715 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/maximum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/maximum/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err715];
}
else {
vErrors.push(err715);
}
errors++;
}
if(data212.length < 2){
const err716 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/maximum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/maximum/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err716];
}
else {
vErrors.push(err716);
}
errors++;
}
const len28 = data212.length;
for(let i30=0; i30<len28; i30++){
let data213 = data212[i30];
if(!((typeof data213 == "number") && (isFinite(data213)))){
const err717 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/maximum/" + i30,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/maximum/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err717];
}
else {
vErrors.push(err717);
}
errors++;
}
}
}
else {
const err718 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/maximum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/maximum/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err718];
}
else {
vErrors.push(err718);
}
errors++;
}
}
}
else {
const err719 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err719];
}
else {
vErrors.push(err719);
}
errors++;
}
}
}
else {
const err720 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err720];
}
else {
vErrors.push(err720);
}
errors++;
}
}
if(data198.triangles !== undefined){
let data214 = data198.triangles;
if(Array.isArray(data214)){
if(data214.length > 6144){
const err721 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles",schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/maxItems",keyword:"maxItems",params:{limit: 6144},message:"must NOT have more than 6144 items"};
if(vErrors === null){
vErrors = [err721];
}
else {
vErrors.push(err721);
}
errors++;
}
if(data214.length < 3){
const err722 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles",schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/minItems",keyword:"minItems",params:{limit: 3},message:"must NOT have fewer than 3 items"};
if(vErrors === null){
vErrors = [err722];
}
else {
vErrors.push(err722);
}
errors++;
}
const len29 = data214.length;
for(let i31=0; i31<len29; i31++){
let data215 = data214[i31];
if(!(((typeof data215 == "number") && (!(data215 % 1) && !isNaN(data215))) && (isFinite(data215)))){
const err723 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles/" + i31,schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/items/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err723];
}
else {
vErrors.push(err723);
}
errors++;
}
if((typeof data215 == "number") && (isFinite(data215))){
if(data215 > 1023 || isNaN(data215)){
const err724 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles/" + i31,schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/items/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1023},message:"must be <= 1023"};
if(vErrors === null){
vErrors = [err724];
}
else {
vErrors.push(err724);
}
errors++;
}
if(data215 < 0 || isNaN(data215)){
const err725 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles/" + i31,schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/items/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err725];
}
else {
vErrors.push(err725);
}
errors++;
}
}
}
}
else {
const err726 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles",schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err726];
}
else {
vErrors.push(err726);
}
errors++;
}
}
}
else {
const err727 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err727];
}
else {
vErrors.push(err727);
}
errors++;
}
}
}
else {
const err728 = {instancePath:instancePath+"/motion/meshes",schemaPath:"#/properties/motion/properties/meshes/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err728];
}
else {
vErrors.push(err728);
}
errors++;
}
}
}
else {
const err729 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err729];
}
else {
vErrors.push(err729);
}
errors++;
}
}
if(data.inputPreparation !== undefined){
let data216 = data.inputPreparation;
if(data216 && typeof data216 == "object" && !Array.isArray(data216)){
if(data216.version === undefined){
const err730 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err730];
}
else {
vErrors.push(err730);
}
errors++;
}
if(data216.originalAssetId === undefined){
const err731 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "originalAssetId"},message:"must have required property '"+"originalAssetId"+"'"};
if(vErrors === null){
vErrors = [err731];
}
else {
vErrors.push(err731);
}
errors++;
}
if(data216.normalizedAssetId === undefined){
const err732 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "normalizedAssetId"},message:"must have required property '"+"normalizedAssetId"+"'"};
if(vErrors === null){
vErrors = [err732];
}
else {
vErrors.push(err732);
}
errors++;
}
if(data216.selectedAssetId === undefined){
const err733 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "selectedAssetId"},message:"must have required property '"+"selectedAssetId"+"'"};
if(vErrors === null){
vErrors = [err733];
}
else {
vErrors.push(err733);
}
errors++;
}
if(data216.analysisAssetId === undefined){
const err734 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "analysisAssetId"},message:"must have required property '"+"analysisAssetId"+"'"};
if(vErrors === null){
vErrors = [err734];
}
else {
vErrors.push(err734);
}
errors++;
}
if(data216.probe === undefined){
const err735 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "probe"},message:"must have required property '"+"probe"+"'"};
if(vErrors === null){
vErrors = [err735];
}
else {
vErrors.push(err735);
}
errors++;
}
if(data216.selection === undefined){
const err736 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "selection"},message:"must have required property '"+"selection"+"'"};
if(vErrors === null){
vErrors = [err736];
}
else {
vErrors.push(err736);
}
errors++;
}
if(data216.analysis === undefined){
const err737 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "analysis"},message:"must have required property '"+"analysis"+"'"};
if(vErrors === null){
vErrors = [err737];
}
else {
vErrors.push(err737);
}
errors++;
}
for(const key36 in data216){
if(!((((((((key36 === "version") || (key36 === "originalAssetId")) || (key36 === "normalizedAssetId")) || (key36 === "selectedAssetId")) || (key36 === "analysisAssetId")) || (key36 === "probe")) || (key36 === "selection")) || (key36 === "analysis"))){
const err738 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key36},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err738];
}
else {
vErrors.push(err738);
}
errors++;
}
}
if(data216.version !== undefined){
if(1 !== data216.version){
const err739 = {instancePath:instancePath+"/inputPreparation/version",schemaPath:"#/properties/inputPreparation/properties/version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err739];
}
else {
vErrors.push(err739);
}
errors++;
}
}
if(data216.originalAssetId !== undefined){
let data218 = data216.originalAssetId;
if(typeof data218 === "string"){
if(!pattern50.test(data218)){
const err740 = {instancePath:instancePath+"/inputPreparation/originalAssetId",schemaPath:"#/properties/inputPreparation/properties/originalAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"+"\""};
if(vErrors === null){
vErrors = [err740];
}
else {
vErrors.push(err740);
}
errors++;
}
}
else {
const err741 = {instancePath:instancePath+"/inputPreparation/originalAssetId",schemaPath:"#/properties/inputPreparation/properties/originalAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err741];
}
else {
vErrors.push(err741);
}
errors++;
}
}
if(data216.normalizedAssetId !== undefined){
let data219 = data216.normalizedAssetId;
if(typeof data219 === "string"){
if(!pattern50.test(data219)){
const err742 = {instancePath:instancePath+"/inputPreparation/normalizedAssetId",schemaPath:"#/properties/inputPreparation/properties/normalizedAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"+"\""};
if(vErrors === null){
vErrors = [err742];
}
else {
vErrors.push(err742);
}
errors++;
}
}
else {
const err743 = {instancePath:instancePath+"/inputPreparation/normalizedAssetId",schemaPath:"#/properties/inputPreparation/properties/normalizedAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err743];
}
else {
vErrors.push(err743);
}
errors++;
}
}
if(data216.selectedAssetId !== undefined){
let data220 = data216.selectedAssetId;
if(typeof data220 === "string"){
if(!pattern50.test(data220)){
const err744 = {instancePath:instancePath+"/inputPreparation/selectedAssetId",schemaPath:"#/properties/inputPreparation/properties/selectedAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"+"\""};
if(vErrors === null){
vErrors = [err744];
}
else {
vErrors.push(err744);
}
errors++;
}
}
else {
const err745 = {instancePath:instancePath+"/inputPreparation/selectedAssetId",schemaPath:"#/properties/inputPreparation/properties/selectedAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err745];
}
else {
vErrors.push(err745);
}
errors++;
}
}
if(data216.analysisAssetId !== undefined){
let data221 = data216.analysisAssetId;
if(typeof data221 === "string"){
if(!pattern50.test(data221)){
const err746 = {instancePath:instancePath+"/inputPreparation/analysisAssetId",schemaPath:"#/properties/inputPreparation/properties/analysisAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"+"\""};
if(vErrors === null){
vErrors = [err746];
}
else {
vErrors.push(err746);
}
errors++;
}
}
else {
const err747 = {instancePath:instancePath+"/inputPreparation/analysisAssetId",schemaPath:"#/properties/inputPreparation/properties/analysisAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err747];
}
else {
vErrors.push(err747);
}
errors++;
}
}
if(data216.probe !== undefined){
let data222 = data216.probe;
if(data222 && typeof data222 == "object" && !Array.isArray(data222)){
if(data222.detectorAvailable === undefined){
const err748 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "detectorAvailable"},message:"must have required property '"+"detectorAvailable"+"'"};
if(vErrors === null){
vErrors = [err748];
}
else {
vErrors.push(err748);
}
errors++;
}
if(data222.originalSize === undefined){
const err749 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "originalSize"},message:"must have required property '"+"originalSize"+"'"};
if(vErrors === null){
vErrors = [err749];
}
else {
vErrors.push(err749);
}
errors++;
}
if(data222.size === undefined){
const err750 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "size"},message:"must have required property '"+"size"+"'"};
if(vErrors === null){
vErrors = [err750];
}
else {
vErrors.push(err750);
}
errors++;
}
if(data222.orientation === undefined){
const err751 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "orientation"},message:"must have required property '"+"orientation"+"'"};
if(vErrors === null){
vErrors = [err751];
}
else {
vErrors.push(err751);
}
errors++;
}
if(data222.iccConverted === undefined){
const err752 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "iccConverted"},message:"must have required property '"+"iccConverted"+"'"};
if(vErrors === null){
vErrors = [err752];
}
else {
vErrors.push(err752);
}
errors++;
}
if(data222.sourceToNormalized === undefined){
const err753 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "sourceToNormalized"},message:"must have required property '"+"sourceToNormalized"+"'"};
if(vErrors === null){
vErrors = [err753];
}
else {
vErrors.push(err753);
}
errors++;
}
if(data222.reduced === undefined){
const err754 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "reduced"},message:"must have required property '"+"reduced"+"'"};
if(vErrors === null){
vErrors = [err754];
}
else {
vErrors.push(err754);
}
errors++;
}
if(data222.estimatedWorkingBytes === undefined){
const err755 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "estimatedWorkingBytes"},message:"must have required property '"+"estimatedWorkingBytes"+"'"};
if(vErrors === null){
vErrors = [err755];
}
else {
vErrors.push(err755);
}
errors++;
}
if(data222.format === undefined){
const err756 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "format"},message:"must have required property '"+"format"+"'"};
if(vErrors === null){
vErrors = [err756];
}
else {
vErrors.push(err756);
}
errors++;
}
if(data222.hasAlpha === undefined){
const err757 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "hasAlpha"},message:"must have required property '"+"hasAlpha"+"'"};
if(vErrors === null){
vErrors = [err757];
}
else {
vErrors.push(err757);
}
errors++;
}
if(data222.faceCount === undefined){
const err758 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "faceCount"},message:"must have required property '"+"faceCount"+"'"};
if(vErrors === null){
vErrors = [err758];
}
else {
vErrors.push(err758);
}
errors++;
}
if(data222.candidates === undefined){
const err759 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "candidates"},message:"must have required property '"+"candidates"+"'"};
if(vErrors === null){
vErrors = [err759];
}
else {
vErrors.push(err759);
}
errors++;
}
for(const key37 in data222){
if(!(func1.call(schema31.properties.inputPreparation.properties.probe.properties, key37))){
const err760 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key37},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err760];
}
else {
vErrors.push(err760);
}
errors++;
}
}
if(data222.detectorAvailable !== undefined){
if(typeof data222.detectorAvailable !== "boolean"){
const err761 = {instancePath:instancePath+"/inputPreparation/probe/detectorAvailable",schemaPath:"#/properties/inputPreparation/properties/probe/properties/detectorAvailable/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err761];
}
else {
vErrors.push(err761);
}
errors++;
}
}
if(data222.originalSize !== undefined){
let data224 = data222.originalSize;
if(data224 && typeof data224 == "object" && !Array.isArray(data224)){
if(data224.width === undefined){
const err762 = {instancePath:instancePath+"/inputPreparation/probe/originalSize",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err762];
}
else {
vErrors.push(err762);
}
errors++;
}
if(data224.height === undefined){
const err763 = {instancePath:instancePath+"/inputPreparation/probe/originalSize",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err763];
}
else {
vErrors.push(err763);
}
errors++;
}
for(const key38 in data224){
if(!((key38 === "width") || (key38 === "height"))){
const err764 = {instancePath:instancePath+"/inputPreparation/probe/originalSize",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key38},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err764];
}
else {
vErrors.push(err764);
}
errors++;
}
}
if(data224.width !== undefined){
let data225 = data224.width;
if(!(((typeof data225 == "number") && (!(data225 % 1) && !isNaN(data225))) && (isFinite(data225)))){
const err765 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err765];
}
else {
vErrors.push(err765);
}
errors++;
}
if((typeof data225 == "number") && (isFinite(data225))){
if(data225 > 4096 || isNaN(data225)){
const err766 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err766];
}
else {
vErrors.push(err766);
}
errors++;
}
if(data225 < 1 || isNaN(data225)){
const err767 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err767];
}
else {
vErrors.push(err767);
}
errors++;
}
}
}
if(data224.height !== undefined){
let data226 = data224.height;
if(!(((typeof data226 == "number") && (!(data226 % 1) && !isNaN(data226))) && (isFinite(data226)))){
const err768 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err768];
}
else {
vErrors.push(err768);
}
errors++;
}
if((typeof data226 == "number") && (isFinite(data226))){
if(data226 > 4096 || isNaN(data226)){
const err769 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err769];
}
else {
vErrors.push(err769);
}
errors++;
}
if(data226 < 1 || isNaN(data226)){
const err770 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err770];
}
else {
vErrors.push(err770);
}
errors++;
}
}
}
}
else {
const err771 = {instancePath:instancePath+"/inputPreparation/probe/originalSize",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err771];
}
else {
vErrors.push(err771);
}
errors++;
}
}
if(data222.size !== undefined){
let data227 = data222.size;
if(data227 && typeof data227 == "object" && !Array.isArray(data227)){
if(data227.width === undefined){
const err772 = {instancePath:instancePath+"/inputPreparation/probe/size",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err772];
}
else {
vErrors.push(err772);
}
errors++;
}
if(data227.height === undefined){
const err773 = {instancePath:instancePath+"/inputPreparation/probe/size",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err773];
}
else {
vErrors.push(err773);
}
errors++;
}
for(const key39 in data227){
if(!((key39 === "width") || (key39 === "height"))){
const err774 = {instancePath:instancePath+"/inputPreparation/probe/size",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key39},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err774];
}
else {
vErrors.push(err774);
}
errors++;
}
}
if(data227.width !== undefined){
let data228 = data227.width;
if(!(((typeof data228 == "number") && (!(data228 % 1) && !isNaN(data228))) && (isFinite(data228)))){
const err775 = {instancePath:instancePath+"/inputPreparation/probe/size/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err775];
}
else {
vErrors.push(err775);
}
errors++;
}
if((typeof data228 == "number") && (isFinite(data228))){
if(data228 > 4096 || isNaN(data228)){
const err776 = {instancePath:instancePath+"/inputPreparation/probe/size/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err776];
}
else {
vErrors.push(err776);
}
errors++;
}
if(data228 < 1 || isNaN(data228)){
const err777 = {instancePath:instancePath+"/inputPreparation/probe/size/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err777];
}
else {
vErrors.push(err777);
}
errors++;
}
}
}
if(data227.height !== undefined){
let data229 = data227.height;
if(!(((typeof data229 == "number") && (!(data229 % 1) && !isNaN(data229))) && (isFinite(data229)))){
const err778 = {instancePath:instancePath+"/inputPreparation/probe/size/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err778];
}
else {
vErrors.push(err778);
}
errors++;
}
if((typeof data229 == "number") && (isFinite(data229))){
if(data229 > 4096 || isNaN(data229)){
const err779 = {instancePath:instancePath+"/inputPreparation/probe/size/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err779];
}
else {
vErrors.push(err779);
}
errors++;
}
if(data229 < 1 || isNaN(data229)){
const err780 = {instancePath:instancePath+"/inputPreparation/probe/size/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err780];
}
else {
vErrors.push(err780);
}
errors++;
}
}
}
}
else {
const err781 = {instancePath:instancePath+"/inputPreparation/probe/size",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err781];
}
else {
vErrors.push(err781);
}
errors++;
}
}
if(data222.orientation !== undefined){
let data230 = data222.orientation;
if(!(((typeof data230 == "number") && (!(data230 % 1) && !isNaN(data230))) && (isFinite(data230)))){
const err782 = {instancePath:instancePath+"/inputPreparation/probe/orientation",schemaPath:"#/properties/inputPreparation/properties/probe/properties/orientation/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err782];
}
else {
vErrors.push(err782);
}
errors++;
}
if((typeof data230 == "number") && (isFinite(data230))){
if(data230 > 8 || isNaN(data230)){
const err783 = {instancePath:instancePath+"/inputPreparation/probe/orientation",schemaPath:"#/properties/inputPreparation/properties/probe/properties/orientation/maximum",keyword:"maximum",params:{comparison: "<=", limit: 8},message:"must be <= 8"};
if(vErrors === null){
vErrors = [err783];
}
else {
vErrors.push(err783);
}
errors++;
}
if(data230 < 1 || isNaN(data230)){
const err784 = {instancePath:instancePath+"/inputPreparation/probe/orientation",schemaPath:"#/properties/inputPreparation/properties/probe/properties/orientation/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err784];
}
else {
vErrors.push(err784);
}
errors++;
}
}
}
if(data222.iccConverted !== undefined){
if(typeof data222.iccConverted !== "boolean"){
const err785 = {instancePath:instancePath+"/inputPreparation/probe/iccConverted",schemaPath:"#/properties/inputPreparation/properties/probe/properties/iccConverted/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err785];
}
else {
vErrors.push(err785);
}
errors++;
}
}
if(data222.sourceToNormalized !== undefined){
let data232 = data222.sourceToNormalized;
if(Array.isArray(data232)){
if(data232.length > 6){
const err786 = {instancePath:instancePath+"/inputPreparation/probe/sourceToNormalized",schemaPath:"#/properties/inputPreparation/properties/probe/properties/sourceToNormalized/maxItems",keyword:"maxItems",params:{limit: 6},message:"must NOT have more than 6 items"};
if(vErrors === null){
vErrors = [err786];
}
else {
vErrors.push(err786);
}
errors++;
}
if(data232.length < 6){
const err787 = {instancePath:instancePath+"/inputPreparation/probe/sourceToNormalized",schemaPath:"#/properties/inputPreparation/properties/probe/properties/sourceToNormalized/minItems",keyword:"minItems",params:{limit: 6},message:"must NOT have fewer than 6 items"};
if(vErrors === null){
vErrors = [err787];
}
else {
vErrors.push(err787);
}
errors++;
}
const len30 = data232.length;
for(let i32=0; i32<len30; i32++){
let data233 = data232[i32];
if(!((typeof data233 == "number") && (isFinite(data233)))){
const err788 = {instancePath:instancePath+"/inputPreparation/probe/sourceToNormalized/" + i32,schemaPath:"#/properties/inputPreparation/properties/probe/properties/sourceToNormalized/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err788];
}
else {
vErrors.push(err788);
}
errors++;
}
}
}
else {
const err789 = {instancePath:instancePath+"/inputPreparation/probe/sourceToNormalized",schemaPath:"#/properties/inputPreparation/properties/probe/properties/sourceToNormalized/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err789];
}
else {
vErrors.push(err789);
}
errors++;
}
}
if(data222.reduced !== undefined){
if(typeof data222.reduced !== "boolean"){
const err790 = {instancePath:instancePath+"/inputPreparation/probe/reduced",schemaPath:"#/properties/inputPreparation/properties/probe/properties/reduced/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err790];
}
else {
vErrors.push(err790);
}
errors++;
}
}
if(data222.estimatedWorkingBytes !== undefined){
let data235 = data222.estimatedWorkingBytes;
if(!(((typeof data235 == "number") && (!(data235 % 1) && !isNaN(data235))) && (isFinite(data235)))){
const err791 = {instancePath:instancePath+"/inputPreparation/probe/estimatedWorkingBytes",schemaPath:"#/properties/inputPreparation/properties/probe/properties/estimatedWorkingBytes/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err791];
}
else {
vErrors.push(err791);
}
errors++;
}
if((typeof data235 == "number") && (isFinite(data235))){
if(data235 > 402653184 || isNaN(data235)){
const err792 = {instancePath:instancePath+"/inputPreparation/probe/estimatedWorkingBytes",schemaPath:"#/properties/inputPreparation/properties/probe/properties/estimatedWorkingBytes/maximum",keyword:"maximum",params:{comparison: "<=", limit: 402653184},message:"must be <= 402653184"};
if(vErrors === null){
vErrors = [err792];
}
else {
vErrors.push(err792);
}
errors++;
}
if(data235 < 0 || isNaN(data235)){
const err793 = {instancePath:instancePath+"/inputPreparation/probe/estimatedWorkingBytes",schemaPath:"#/properties/inputPreparation/properties/probe/properties/estimatedWorkingBytes/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err793];
}
else {
vErrors.push(err793);
}
errors++;
}
}
}
if(data222.format !== undefined){
let data236 = data222.format;
if(!((data236 === "png") || (data236 === "jpeg"))){
const err794 = {instancePath:instancePath+"/inputPreparation/probe/format",schemaPath:"#/properties/inputPreparation/properties/probe/properties/format/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputPreparation.properties.probe.properties.format.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err794];
}
else {
vErrors.push(err794);
}
errors++;
}
}
if(data222.hasAlpha !== undefined){
if(typeof data222.hasAlpha !== "boolean"){
const err795 = {instancePath:instancePath+"/inputPreparation/probe/hasAlpha",schemaPath:"#/properties/inputPreparation/properties/probe/properties/hasAlpha/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err795];
}
else {
vErrors.push(err795);
}
errors++;
}
}
if(data222.faceCount !== undefined){
let data238 = data222.faceCount;
if(!(((typeof data238 == "number") && (!(data238 % 1) && !isNaN(data238))) && (isFinite(data238)))){
const err796 = {instancePath:instancePath+"/inputPreparation/probe/faceCount",schemaPath:"#/properties/inputPreparation/properties/probe/properties/faceCount/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err796];
}
else {
vErrors.push(err796);
}
errors++;
}
if((typeof data238 == "number") && (isFinite(data238))){
if(data238 > 8 || isNaN(data238)){
const err797 = {instancePath:instancePath+"/inputPreparation/probe/faceCount",schemaPath:"#/properties/inputPreparation/properties/probe/properties/faceCount/maximum",keyword:"maximum",params:{comparison: "<=", limit: 8},message:"must be <= 8"};
if(vErrors === null){
vErrors = [err797];
}
else {
vErrors.push(err797);
}
errors++;
}
if(data238 < 0 || isNaN(data238)){
const err798 = {instancePath:instancePath+"/inputPreparation/probe/faceCount",schemaPath:"#/properties/inputPreparation/properties/probe/properties/faceCount/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err798];
}
else {
vErrors.push(err798);
}
errors++;
}
}
}
if(data222.candidates !== undefined){
let data239 = data222.candidates;
if(Array.isArray(data239)){
if(data239.length > 8){
const err799 = {instancePath:instancePath+"/inputPreparation/probe/candidates",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/maxItems",keyword:"maxItems",params:{limit: 8},message:"must NOT have more than 8 items"};
if(vErrors === null){
vErrors = [err799];
}
else {
vErrors.push(err799);
}
errors++;
}
const len31 = data239.length;
for(let i33=0; i33<len31; i33++){
let data240 = data239[i33];
if(data240 && typeof data240 == "object" && !Array.isArray(data240)){
if(data240.rect === undefined){
const err800 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33,schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err800];
}
else {
vErrors.push(err800);
}
errors++;
}
if(data240.method === undefined){
const err801 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33,schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/required",keyword:"required",params:{missingProperty: "method"},message:"must have required property '"+"method"+"'"};
if(vErrors === null){
vErrors = [err801];
}
else {
vErrors.push(err801);
}
errors++;
}
for(const key40 in data240){
if(!((key40 === "rect") || (key40 === "method"))){
const err802 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33,schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key40},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err802];
}
else {
vErrors.push(err802);
}
errors++;
}
}
if(data240.rect !== undefined){
let data241 = data240.rect;
if(data241 && typeof data241 == "object" && !Array.isArray(data241)){
if(data241.x === undefined){
const err803 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err803];
}
else {
vErrors.push(err803);
}
errors++;
}
if(data241.y === undefined){
const err804 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err804];
}
else {
vErrors.push(err804);
}
errors++;
}
if(data241.width === undefined){
const err805 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err805];
}
else {
vErrors.push(err805);
}
errors++;
}
if(data241.height === undefined){
const err806 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err806];
}
else {
vErrors.push(err806);
}
errors++;
}
for(const key41 in data241){
if(!((((key41 === "x") || (key41 === "y")) || (key41 === "width")) || (key41 === "height"))){
const err807 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key41},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err807];
}
else {
vErrors.push(err807);
}
errors++;
}
}
if(data241.x !== undefined){
let data242 = data241.x;
if(!(((typeof data242 == "number") && (!(data242 % 1) && !isNaN(data242))) && (isFinite(data242)))){
const err808 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/x/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err808];
}
else {
vErrors.push(err808);
}
errors++;
}
if((typeof data242 == "number") && (isFinite(data242))){
if(data242 > 4096 || isNaN(data242)){
const err809 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err809];
}
else {
vErrors.push(err809);
}
errors++;
}
if(data242 < 0 || isNaN(data242)){
const err810 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err810];
}
else {
vErrors.push(err810);
}
errors++;
}
}
}
if(data241.y !== undefined){
let data243 = data241.y;
if(!(((typeof data243 == "number") && (!(data243 % 1) && !isNaN(data243))) && (isFinite(data243)))){
const err811 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/y/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err811];
}
else {
vErrors.push(err811);
}
errors++;
}
if((typeof data243 == "number") && (isFinite(data243))){
if(data243 > 4096 || isNaN(data243)){
const err812 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err812];
}
else {
vErrors.push(err812);
}
errors++;
}
if(data243 < 0 || isNaN(data243)){
const err813 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err813];
}
else {
vErrors.push(err813);
}
errors++;
}
}
}
if(data241.width !== undefined){
let data244 = data241.width;
if(!(((typeof data244 == "number") && (!(data244 % 1) && !isNaN(data244))) && (isFinite(data244)))){
const err814 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err814];
}
else {
vErrors.push(err814);
}
errors++;
}
if((typeof data244 == "number") && (isFinite(data244))){
if(data244 > 4096 || isNaN(data244)){
const err815 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err815];
}
else {
vErrors.push(err815);
}
errors++;
}
if(data244 < 1 || isNaN(data244)){
const err816 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err816];
}
else {
vErrors.push(err816);
}
errors++;
}
}
}
if(data241.height !== undefined){
let data245 = data241.height;
if(!(((typeof data245 == "number") && (!(data245 % 1) && !isNaN(data245))) && (isFinite(data245)))){
const err817 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err817];
}
else {
vErrors.push(err817);
}
errors++;
}
if((typeof data245 == "number") && (isFinite(data245))){
if(data245 > 4096 || isNaN(data245)){
const err818 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err818];
}
else {
vErrors.push(err818);
}
errors++;
}
if(data245 < 1 || isNaN(data245)){
const err819 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err819];
}
else {
vErrors.push(err819);
}
errors++;
}
}
}
}
else {
const err820 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err820];
}
else {
vErrors.push(err820);
}
errors++;
}
}
if(data240.method !== undefined){
let data246 = data240.method;
if(!(((data246 === "alpha") || (data246 === "face")) || (data246 === "manual-required"))){
const err821 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/method",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/method/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputPreparation.properties.probe.properties.candidates.items.properties.method.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err821];
}
else {
vErrors.push(err821);
}
errors++;
}
}
}
else {
const err822 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33,schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err822];
}
else {
vErrors.push(err822);
}
errors++;
}
}
}
else {
const err823 = {instancePath:instancePath+"/inputPreparation/probe/candidates",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err823];
}
else {
vErrors.push(err823);
}
errors++;
}
}
}
else {
const err824 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err824];
}
else {
vErrors.push(err824);
}
errors++;
}
}
if(data216.selection !== undefined){
let data247 = data216.selection;
if(data247 && typeof data247 == "object" && !Array.isArray(data247)){
if(data247.rect === undefined){
const err825 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err825];
}
else {
vErrors.push(err825);
}
errors++;
}
if(data247.backgroundTolerance === undefined){
const err826 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/required",keyword:"required",params:{missingProperty: "backgroundTolerance"},message:"must have required property '"+"backgroundTolerance"+"'"};
if(vErrors === null){
vErrors = [err826];
}
else {
vErrors.push(err826);
}
errors++;
}
if(data247.masks === undefined){
const err827 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/required",keyword:"required",params:{missingProperty: "masks"},message:"must have required property '"+"masks"+"'"};
if(vErrors === null){
vErrors = [err827];
}
else {
vErrors.push(err827);
}
errors++;
}
if(data247.occluded === undefined){
const err828 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/required",keyword:"required",params:{missingProperty: "occluded"},message:"must have required property '"+"occluded"+"'"};
if(vErrors === null){
vErrors = [err828];
}
else {
vErrors.push(err828);
}
errors++;
}
for(const key42 in data247){
if(!((((key42 === "rect") || (key42 === "backgroundTolerance")) || (key42 === "masks")) || (key42 === "occluded"))){
const err829 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key42},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err829];
}
else {
vErrors.push(err829);
}
errors++;
}
}
if(data247.rect !== undefined){
let data248 = data247.rect;
if(data248 && typeof data248 == "object" && !Array.isArray(data248)){
if(data248.x === undefined){
const err830 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err830];
}
else {
vErrors.push(err830);
}
errors++;
}
if(data248.y === undefined){
const err831 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err831];
}
else {
vErrors.push(err831);
}
errors++;
}
if(data248.width === undefined){
const err832 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err832];
}
else {
vErrors.push(err832);
}
errors++;
}
if(data248.height === undefined){
const err833 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err833];
}
else {
vErrors.push(err833);
}
errors++;
}
for(const key43 in data248){
if(!((((key43 === "x") || (key43 === "y")) || (key43 === "width")) || (key43 === "height"))){
const err834 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key43},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err834];
}
else {
vErrors.push(err834);
}
errors++;
}
}
if(data248.x !== undefined){
let data249 = data248.x;
if(!(((typeof data249 == "number") && (!(data249 % 1) && !isNaN(data249))) && (isFinite(data249)))){
const err835 = {instancePath:instancePath+"/inputPreparation/selection/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/x/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err835];
}
else {
vErrors.push(err835);
}
errors++;
}
if((typeof data249 == "number") && (isFinite(data249))){
if(data249 > 4096 || isNaN(data249)){
const err836 = {instancePath:instancePath+"/inputPreparation/selection/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err836];
}
else {
vErrors.push(err836);
}
errors++;
}
if(data249 < 0 || isNaN(data249)){
const err837 = {instancePath:instancePath+"/inputPreparation/selection/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err837];
}
else {
vErrors.push(err837);
}
errors++;
}
}
}
if(data248.y !== undefined){
let data250 = data248.y;
if(!(((typeof data250 == "number") && (!(data250 % 1) && !isNaN(data250))) && (isFinite(data250)))){
const err838 = {instancePath:instancePath+"/inputPreparation/selection/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/y/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err838];
}
else {
vErrors.push(err838);
}
errors++;
}
if((typeof data250 == "number") && (isFinite(data250))){
if(data250 > 4096 || isNaN(data250)){
const err839 = {instancePath:instancePath+"/inputPreparation/selection/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err839];
}
else {
vErrors.push(err839);
}
errors++;
}
if(data250 < 0 || isNaN(data250)){
const err840 = {instancePath:instancePath+"/inputPreparation/selection/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err840];
}
else {
vErrors.push(err840);
}
errors++;
}
}
}
if(data248.width !== undefined){
let data251 = data248.width;
if(!(((typeof data251 == "number") && (!(data251 % 1) && !isNaN(data251))) && (isFinite(data251)))){
const err841 = {instancePath:instancePath+"/inputPreparation/selection/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err841];
}
else {
vErrors.push(err841);
}
errors++;
}
if((typeof data251 == "number") && (isFinite(data251))){
if(data251 > 4096 || isNaN(data251)){
const err842 = {instancePath:instancePath+"/inputPreparation/selection/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err842];
}
else {
vErrors.push(err842);
}
errors++;
}
if(data251 < 1 || isNaN(data251)){
const err843 = {instancePath:instancePath+"/inputPreparation/selection/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err843];
}
else {
vErrors.push(err843);
}
errors++;
}
}
}
if(data248.height !== undefined){
let data252 = data248.height;
if(!(((typeof data252 == "number") && (!(data252 % 1) && !isNaN(data252))) && (isFinite(data252)))){
const err844 = {instancePath:instancePath+"/inputPreparation/selection/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err844];
}
else {
vErrors.push(err844);
}
errors++;
}
if((typeof data252 == "number") && (isFinite(data252))){
if(data252 > 4096 || isNaN(data252)){
const err845 = {instancePath:instancePath+"/inputPreparation/selection/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err845];
}
else {
vErrors.push(err845);
}
errors++;
}
if(data252 < 1 || isNaN(data252)){
const err846 = {instancePath:instancePath+"/inputPreparation/selection/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err846];
}
else {
vErrors.push(err846);
}
errors++;
}
}
}
}
else {
const err847 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err847];
}
else {
vErrors.push(err847);
}
errors++;
}
}
if(data247.backgroundTolerance !== undefined){
let data253 = data247.backgroundTolerance;
const _errs557 = errors;
let valid119 = false;
const _errs558 = errors;
if(data253 !== null){
const err848 = {instancePath:instancePath+"/inputPreparation/selection/backgroundTolerance",schemaPath:"#/properties/inputPreparation/properties/selection/properties/backgroundTolerance/anyOf/0/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err848];
}
else {
vErrors.push(err848);
}
errors++;
}
var _valid9 = _errs558 === errors;
valid119 = valid119 || _valid9;
const _errs560 = errors;
if(!(((typeof data253 == "number") && (!(data253 % 1) && !isNaN(data253))) && (isFinite(data253)))){
const err849 = {instancePath:instancePath+"/inputPreparation/selection/backgroundTolerance",schemaPath:"#/properties/inputPreparation/properties/selection/properties/backgroundTolerance/anyOf/1/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err849];
}
else {
vErrors.push(err849);
}
errors++;
}
if((typeof data253 == "number") && (isFinite(data253))){
if(data253 > 80 || isNaN(data253)){
const err850 = {instancePath:instancePath+"/inputPreparation/selection/backgroundTolerance",schemaPath:"#/properties/inputPreparation/properties/selection/properties/backgroundTolerance/anyOf/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 80},message:"must be <= 80"};
if(vErrors === null){
vErrors = [err850];
}
else {
vErrors.push(err850);
}
errors++;
}
if(data253 < 0 || isNaN(data253)){
const err851 = {instancePath:instancePath+"/inputPreparation/selection/backgroundTolerance",schemaPath:"#/properties/inputPreparation/properties/selection/properties/backgroundTolerance/anyOf/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err851];
}
else {
vErrors.push(err851);
}
errors++;
}
}
var _valid9 = _errs560 === errors;
valid119 = valid119 || _valid9;
if(!valid119){
const err852 = {instancePath:instancePath+"/inputPreparation/selection/backgroundTolerance",schemaPath:"#/properties/inputPreparation/properties/selection/properties/backgroundTolerance/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err852];
}
else {
vErrors.push(err852);
}
errors++;
}
else {
errors = _errs557;
if(vErrors !== null){
if(_errs557){
vErrors.length = _errs557;
}
else {
vErrors = null;
}
}
}
}
if(data247.masks !== undefined){
let data254 = data247.masks;
if(Array.isArray(data254)){
if(data254.length > 64){
const err853 = {instancePath:instancePath+"/inputPreparation/selection/masks",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err853];
}
else {
vErrors.push(err853);
}
errors++;
}
const len32 = data254.length;
for(let i34=0; i34<len32; i34++){
let data255 = data254[i34];
if(data255 && typeof data255 == "object" && !Array.isArray(data255)){
if(data255.mode === undefined){
const err854 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34,schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err854];
}
else {
vErrors.push(err854);
}
errors++;
}
if(data255.rect === undefined){
const err855 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34,schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err855];
}
else {
vErrors.push(err855);
}
errors++;
}
for(const key44 in data255){
if(!((key44 === "mode") || (key44 === "rect"))){
const err856 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34,schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key44},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err856];
}
else {
vErrors.push(err856);
}
errors++;
}
}
if(data255.mode !== undefined){
let data256 = data255.mode;
if(!((data256 === "erase") || (data256 === "restore"))){
const err857 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/mode",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputPreparation.properties.selection.properties.masks.items.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err857];
}
else {
vErrors.push(err857);
}
errors++;
}
}
if(data255.rect !== undefined){
let data257 = data255.rect;
if(data257 && typeof data257 == "object" && !Array.isArray(data257)){
if(data257.x === undefined){
const err858 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err858];
}
else {
vErrors.push(err858);
}
errors++;
}
if(data257.y === undefined){
const err859 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err859];
}
else {
vErrors.push(err859);
}
errors++;
}
if(data257.width === undefined){
const err860 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err860];
}
else {
vErrors.push(err860);
}
errors++;
}
if(data257.height === undefined){
const err861 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err861];
}
else {
vErrors.push(err861);
}
errors++;
}
for(const key45 in data257){
if(!((((key45 === "x") || (key45 === "y")) || (key45 === "width")) || (key45 === "height"))){
const err862 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key45},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err862];
}
else {
vErrors.push(err862);
}
errors++;
}
}
if(data257.x !== undefined){
let data258 = data257.x;
if(!(((typeof data258 == "number") && (!(data258 % 1) && !isNaN(data258))) && (isFinite(data258)))){
const err863 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/x/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err863];
}
else {
vErrors.push(err863);
}
errors++;
}
if((typeof data258 == "number") && (isFinite(data258))){
if(data258 > 4096 || isNaN(data258)){
const err864 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err864];
}
else {
vErrors.push(err864);
}
errors++;
}
if(data258 < 0 || isNaN(data258)){
const err865 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err865];
}
else {
vErrors.push(err865);
}
errors++;
}
}
}
if(data257.y !== undefined){
let data259 = data257.y;
if(!(((typeof data259 == "number") && (!(data259 % 1) && !isNaN(data259))) && (isFinite(data259)))){
const err866 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/y/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err866];
}
else {
vErrors.push(err866);
}
errors++;
}
if((typeof data259 == "number") && (isFinite(data259))){
if(data259 > 4096 || isNaN(data259)){
const err867 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err867];
}
else {
vErrors.push(err867);
}
errors++;
}
if(data259 < 0 || isNaN(data259)){
const err868 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err868];
}
else {
vErrors.push(err868);
}
errors++;
}
}
}
if(data257.width !== undefined){
let data260 = data257.width;
if(!(((typeof data260 == "number") && (!(data260 % 1) && !isNaN(data260))) && (isFinite(data260)))){
const err869 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err869];
}
else {
vErrors.push(err869);
}
errors++;
}
if((typeof data260 == "number") && (isFinite(data260))){
if(data260 > 4096 || isNaN(data260)){
const err870 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err870];
}
else {
vErrors.push(err870);
}
errors++;
}
if(data260 < 1 || isNaN(data260)){
const err871 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err871];
}
else {
vErrors.push(err871);
}
errors++;
}
}
}
if(data257.height !== undefined){
let data261 = data257.height;
if(!(((typeof data261 == "number") && (!(data261 % 1) && !isNaN(data261))) && (isFinite(data261)))){
const err872 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err872];
}
else {
vErrors.push(err872);
}
errors++;
}
if((typeof data261 == "number") && (isFinite(data261))){
if(data261 > 4096 || isNaN(data261)){
const err873 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err873];
}
else {
vErrors.push(err873);
}
errors++;
}
if(data261 < 1 || isNaN(data261)){
const err874 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err874];
}
else {
vErrors.push(err874);
}
errors++;
}
}
}
}
else {
const err875 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err875];
}
else {
vErrors.push(err875);
}
errors++;
}
}
}
else {
const err876 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34,schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err876];
}
else {
vErrors.push(err876);
}
errors++;
}
}
}
else {
const err877 = {instancePath:instancePath+"/inputPreparation/selection/masks",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err877];
}
else {
vErrors.push(err877);
}
errors++;
}
}
if(data247.occluded !== undefined){
if(typeof data247.occluded !== "boolean"){
const err878 = {instancePath:instancePath+"/inputPreparation/selection/occluded",schemaPath:"#/properties/inputPreparation/properties/selection/properties/occluded/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err878];
}
else {
vErrors.push(err878);
}
errors++;
}
}
}
else {
const err879 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err879];
}
else {
vErrors.push(err879);
}
errors++;
}
}
if(data216.analysis !== undefined){
let data263 = data216.analysis;
if(data263 && typeof data263 == "object" && !Array.isArray(data263)){
if(data263.faces === undefined){
const err880 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/required",keyword:"required",params:{missingProperty: "faces"},message:"must have required property '"+"faces"+"'"};
if(vErrors === null){
vErrors = [err880];
}
else {
vErrors.push(err880);
}
errors++;
}
if(data263.warnings === undefined){
const err881 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/required",keyword:"required",params:{missingProperty: "warnings"},message:"must have required property '"+"warnings"+"'"};
if(vErrors === null){
vErrors = [err881];
}
else {
vErrors.push(err881);
}
errors++;
}
if(data263.crop === undefined){
const err882 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/required",keyword:"required",params:{missingProperty: "crop"},message:"must have required property '"+"crop"+"'"};
if(vErrors === null){
vErrors = [err882];
}
else {
vErrors.push(err882);
}
errors++;
}
if(data263.analysisSize === undefined){
const err883 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/required",keyword:"required",params:{missingProperty: "analysisSize"},message:"must have required property '"+"analysisSize"+"'"};
if(vErrors === null){
vErrors = [err883];
}
else {
vErrors.push(err883);
}
errors++;
}
for(const key46 in data263){
if(!((((key46 === "faces") || (key46 === "warnings")) || (key46 === "crop")) || (key46 === "analysisSize"))){
const err884 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key46},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err884];
}
else {
vErrors.push(err884);
}
errors++;
}
}
if(data263.faces !== undefined){
let data264 = data263.faces;
if(Array.isArray(data264)){
if(data264.length > 8){
const err885 = {instancePath:instancePath+"/inputPreparation/analysis/faces",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/maxItems",keyword:"maxItems",params:{limit: 8},message:"must NOT have more than 8 items"};
if(vErrors === null){
vErrors = [err885];
}
else {
vErrors.push(err885);
}
errors++;
}
const len33 = data264.length;
for(let i35=0; i35<len33; i35++){
let data265 = data264[i35];
if(data265 && typeof data265 == "object" && !Array.isArray(data265)){
if(data265.x === undefined){
const err886 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err886];
}
else {
vErrors.push(err886);
}
errors++;
}
if(data265.y === undefined){
const err887 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err887];
}
else {
vErrors.push(err887);
}
errors++;
}
if(data265.width === undefined){
const err888 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err888];
}
else {
vErrors.push(err888);
}
errors++;
}
if(data265.height === undefined){
const err889 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err889];
}
else {
vErrors.push(err889);
}
errors++;
}
for(const key47 in data265){
if(!((((key47 === "x") || (key47 === "y")) || (key47 === "width")) || (key47 === "height"))){
const err890 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key47},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err890];
}
else {
vErrors.push(err890);
}
errors++;
}
}
if(data265.x !== undefined){
let data266 = data265.x;
if((typeof data266 == "number") && (isFinite(data266))){
if(data266 > 1024 || isNaN(data266)){
const err891 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1024},message:"must be <= 1024"};
if(vErrors === null){
vErrors = [err891];
}
else {
vErrors.push(err891);
}
errors++;
}
if(data266 < 0 || isNaN(data266)){
const err892 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err892];
}
else {
vErrors.push(err892);
}
errors++;
}
}
else {
const err893 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err893];
}
else {
vErrors.push(err893);
}
errors++;
}
}
if(data265.y !== undefined){
let data267 = data265.y;
if((typeof data267 == "number") && (isFinite(data267))){
if(data267 > 1024 || isNaN(data267)){
const err894 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1024},message:"must be <= 1024"};
if(vErrors === null){
vErrors = [err894];
}
else {
vErrors.push(err894);
}
errors++;
}
if(data267 < 0 || isNaN(data267)){
const err895 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err895];
}
else {
vErrors.push(err895);
}
errors++;
}
}
else {
const err896 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err896];
}
else {
vErrors.push(err896);
}
errors++;
}
}
if(data265.width !== undefined){
let data268 = data265.width;
if((typeof data268 == "number") && (isFinite(data268))){
if(data268 > 1024 || isNaN(data268)){
const err897 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1024},message:"must be <= 1024"};
if(vErrors === null){
vErrors = [err897];
}
else {
vErrors.push(err897);
}
errors++;
}
if(data268 <= 0 || isNaN(data268)){
const err898 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err898];
}
else {
vErrors.push(err898);
}
errors++;
}
}
else {
const err899 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err899];
}
else {
vErrors.push(err899);
}
errors++;
}
}
if(data265.height !== undefined){
let data269 = data265.height;
if((typeof data269 == "number") && (isFinite(data269))){
if(data269 > 1024 || isNaN(data269)){
const err900 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1024},message:"must be <= 1024"};
if(vErrors === null){
vErrors = [err900];
}
else {
vErrors.push(err900);
}
errors++;
}
if(data269 <= 0 || isNaN(data269)){
const err901 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err901];
}
else {
vErrors.push(err901);
}
errors++;
}
}
else {
const err902 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err902];
}
else {
vErrors.push(err902);
}
errors++;
}
}
}
else {
const err903 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err903];
}
else {
vErrors.push(err903);
}
errors++;
}
}
}
else {
const err904 = {instancePath:instancePath+"/inputPreparation/analysis/faces",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err904];
}
else {
vErrors.push(err904);
}
errors++;
}
}
if(data263.warnings !== undefined){
let data270 = data263.warnings;
if(Array.isArray(data270)){
if(data270.length > 8){
const err905 = {instancePath:instancePath+"/inputPreparation/analysis/warnings",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/warnings/maxItems",keyword:"maxItems",params:{limit: 8},message:"must NOT have more than 8 items"};
if(vErrors === null){
vErrors = [err905];
}
else {
vErrors.push(err905);
}
errors++;
}
const len34 = data270.length;
for(let i36=0; i36<len34; i36++){
let data271 = data270[i36];
if(!(((((data271 === "DETECTOR_UNAVAILABLE") || (data271 === "FACE_UNCONFIRMED")) || (data271 === "SMALL_FACE")) || (data271 === "EDGE_CROPPED_POSSIBLE")) || (data271 === "OCCLUDED_USER_REPORTED"))){
const err906 = {instancePath:instancePath+"/inputPreparation/analysis/warnings/" + i36,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/warnings/items/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputPreparation.properties.analysis.properties.warnings.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err906];
}
else {
vErrors.push(err906);
}
errors++;
}
}
}
else {
const err907 = {instancePath:instancePath+"/inputPreparation/analysis/warnings",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/warnings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err907];
}
else {
vErrors.push(err907);
}
errors++;
}
}
if(data263.crop !== undefined){
let data272 = data263.crop;
if(data272 && typeof data272 == "object" && !Array.isArray(data272)){
if(data272.x === undefined){
const err908 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err908];
}
else {
vErrors.push(err908);
}
errors++;
}
if(data272.y === undefined){
const err909 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err909];
}
else {
vErrors.push(err909);
}
errors++;
}
if(data272.width === undefined){
const err910 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err910];
}
else {
vErrors.push(err910);
}
errors++;
}
if(data272.height === undefined){
const err911 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err911];
}
else {
vErrors.push(err911);
}
errors++;
}
for(const key48 in data272){
if(!((((key48 === "x") || (key48 === "y")) || (key48 === "width")) || (key48 === "height"))){
const err912 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key48},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err912];
}
else {
vErrors.push(err912);
}
errors++;
}
}
if(data272.x !== undefined){
let data273 = data272.x;
if(!(((typeof data273 == "number") && (!(data273 % 1) && !isNaN(data273))) && (isFinite(data273)))){
const err913 = {instancePath:instancePath+"/inputPreparation/analysis/crop/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/x/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err913];
}
else {
vErrors.push(err913);
}
errors++;
}
if((typeof data273 == "number") && (isFinite(data273))){
if(data273 > 4096 || isNaN(data273)){
const err914 = {instancePath:instancePath+"/inputPreparation/analysis/crop/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err914];
}
else {
vErrors.push(err914);
}
errors++;
}
if(data273 < 0 || isNaN(data273)){
const err915 = {instancePath:instancePath+"/inputPreparation/analysis/crop/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err915];
}
else {
vErrors.push(err915);
}
errors++;
}
}
}
if(data272.y !== undefined){
let data274 = data272.y;
if(!(((typeof data274 == "number") && (!(data274 % 1) && !isNaN(data274))) && (isFinite(data274)))){
const err916 = {instancePath:instancePath+"/inputPreparation/analysis/crop/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/y/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err916];
}
else {
vErrors.push(err916);
}
errors++;
}
if((typeof data274 == "number") && (isFinite(data274))){
if(data274 > 4096 || isNaN(data274)){
const err917 = {instancePath:instancePath+"/inputPreparation/analysis/crop/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err917];
}
else {
vErrors.push(err917);
}
errors++;
}
if(data274 < 0 || isNaN(data274)){
const err918 = {instancePath:instancePath+"/inputPreparation/analysis/crop/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err918];
}
else {
vErrors.push(err918);
}
errors++;
}
}
}
if(data272.width !== undefined){
let data275 = data272.width;
if(!(((typeof data275 == "number") && (!(data275 % 1) && !isNaN(data275))) && (isFinite(data275)))){
const err919 = {instancePath:instancePath+"/inputPreparation/analysis/crop/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err919];
}
else {
vErrors.push(err919);
}
errors++;
}
if((typeof data275 == "number") && (isFinite(data275))){
if(data275 > 4096 || isNaN(data275)){
const err920 = {instancePath:instancePath+"/inputPreparation/analysis/crop/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err920];
}
else {
vErrors.push(err920);
}
errors++;
}
if(data275 < 1 || isNaN(data275)){
const err921 = {instancePath:instancePath+"/inputPreparation/analysis/crop/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err921];
}
else {
vErrors.push(err921);
}
errors++;
}
}
}
if(data272.height !== undefined){
let data276 = data272.height;
if(!(((typeof data276 == "number") && (!(data276 % 1) && !isNaN(data276))) && (isFinite(data276)))){
const err922 = {instancePath:instancePath+"/inputPreparation/analysis/crop/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err922];
}
else {
vErrors.push(err922);
}
errors++;
}
if((typeof data276 == "number") && (isFinite(data276))){
if(data276 > 4096 || isNaN(data276)){
const err923 = {instancePath:instancePath+"/inputPreparation/analysis/crop/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err923];
}
else {
vErrors.push(err923);
}
errors++;
}
if(data276 < 1 || isNaN(data276)){
const err924 = {instancePath:instancePath+"/inputPreparation/analysis/crop/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err924];
}
else {
vErrors.push(err924);
}
errors++;
}
}
}
}
else {
const err925 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err925];
}
else {
vErrors.push(err925);
}
errors++;
}
}
if(data263.analysisSize !== undefined){
let data277 = data263.analysisSize;
if(data277 && typeof data277 == "object" && !Array.isArray(data277)){
if(data277.width === undefined){
const err926 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err926];
}
else {
vErrors.push(err926);
}
errors++;
}
if(data277.height === undefined){
const err927 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err927];
}
else {
vErrors.push(err927);
}
errors++;
}
for(const key49 in data277){
if(!((key49 === "width") || (key49 === "height"))){
const err928 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key49},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err928];
}
else {
vErrors.push(err928);
}
errors++;
}
}
if(data277.width !== undefined){
let data278 = data277.width;
if(!(((typeof data278 == "number") && (!(data278 % 1) && !isNaN(data278))) && (isFinite(data278)))){
const err929 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err929];
}
else {
vErrors.push(err929);
}
errors++;
}
if((typeof data278 == "number") && (isFinite(data278))){
if(data278 > 4096 || isNaN(data278)){
const err930 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err930];
}
else {
vErrors.push(err930);
}
errors++;
}
if(data278 < 1 || isNaN(data278)){
const err931 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err931];
}
else {
vErrors.push(err931);
}
errors++;
}
}
}
if(data277.height !== undefined){
let data279 = data277.height;
if(!(((typeof data279 == "number") && (!(data279 % 1) && !isNaN(data279))) && (isFinite(data279)))){
const err932 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err932];
}
else {
vErrors.push(err932);
}
errors++;
}
if((typeof data279 == "number") && (isFinite(data279))){
if(data279 > 4096 || isNaN(data279)){
const err933 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err933];
}
else {
vErrors.push(err933);
}
errors++;
}
if(data279 < 1 || isNaN(data279)){
const err934 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err934];
}
else {
vErrors.push(err934);
}
errors++;
}
}
}
}
else {
const err935 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err935];
}
else {
vErrors.push(err935);
}
errors++;
}
}
}
else {
const err936 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err936];
}
else {
vErrors.push(err936);
}
errors++;
}
}
}
else {
const err937 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err937];
}
else {
vErrors.push(err937);
}
errors++;
}
}
if(data.assembly !== undefined){
let data280 = data.assembly;
if(data280 && typeof data280 == "object" && !Array.isArray(data280)){
if(data280.catalogId === undefined){
const err938 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "catalogId"},message:"must have required property '"+"catalogId"+"'"};
if(vErrors === null){
vErrors = [err938];
}
else {
vErrors.push(err938);
}
errors++;
}
if(data280.version === undefined){
const err939 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err939];
}
else {
vErrors.push(err939);
}
errors++;
}
if(data280.linkedEyes === undefined){
const err940 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "linkedEyes"},message:"must have required property '"+"linkedEyes"+"'"};
if(vErrors === null){
vErrors = [err940];
}
else {
vErrors.push(err940);
}
errors++;
}
if(data280.choices === undefined){
const err941 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "choices"},message:"must have required property '"+"choices"+"'"};
if(vErrors === null){
vErrors = [err941];
}
else {
vErrors.push(err941);
}
errors++;
}
if(data280.adjustments === undefined){
const err942 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "adjustments"},message:"must have required property '"+"adjustments"+"'"};
if(vErrors === null){
vErrors = [err942];
}
else {
vErrors.push(err942);
}
errors++;
}
if(data280.warnings === undefined){
const err943 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "warnings"},message:"must have required property '"+"warnings"+"'"};
if(vErrors === null){
vErrors = [err943];
}
else {
vErrors.push(err943);
}
errors++;
}
for(const key50 in data280){
if(!((((((key50 === "catalogId") || (key50 === "version")) || (key50 === "linkedEyes")) || (key50 === "choices")) || (key50 === "adjustments")) || (key50 === "warnings"))){
const err944 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key50},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err944];
}
else {
vErrors.push(err944);
}
errors++;
}
}
if(data280.catalogId !== undefined){
let data281 = data280.catalogId;
if(typeof data281 === "string"){
if(func2(data281) > 64){
const err945 = {instancePath:instancePath+"/assembly/catalogId",schemaPath:"#/properties/assembly/properties/catalogId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err945];
}
else {
vErrors.push(err945);
}
errors++;
}
if(func2(data281) < 1){
const err946 = {instancePath:instancePath+"/assembly/catalogId",schemaPath:"#/properties/assembly/properties/catalogId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err946];
}
else {
vErrors.push(err946);
}
errors++;
}
if(!pattern4.test(data281)){
const err947 = {instancePath:instancePath+"/assembly/catalogId",schemaPath:"#/properties/assembly/properties/catalogId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err947];
}
else {
vErrors.push(err947);
}
errors++;
}
}
else {
const err948 = {instancePath:instancePath+"/assembly/catalogId",schemaPath:"#/properties/assembly/properties/catalogId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err948];
}
else {
vErrors.push(err948);
}
errors++;
}
}
if(data280.version !== undefined){
let data282 = data280.version;
if(typeof data282 === "string"){
if(func2(data282) > 32){
const err949 = {instancePath:instancePath+"/assembly/version",schemaPath:"#/properties/assembly/properties/version/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err949];
}
else {
vErrors.push(err949);
}
errors++;
}
if(func2(data282) < 1){
const err950 = {instancePath:instancePath+"/assembly/version",schemaPath:"#/properties/assembly/properties/version/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err950];
}
else {
vErrors.push(err950);
}
errors++;
}
if(!pattern12.test(data282)){
const err951 = {instancePath:instancePath+"/assembly/version",schemaPath:"#/properties/assembly/properties/version/pattern",keyword:"pattern",params:{pattern: "^\\d+\\.\\d+\\.\\d+$"},message:"must match pattern \""+"^\\d+\\.\\d+\\.\\d+$"+"\""};
if(vErrors === null){
vErrors = [err951];
}
else {
vErrors.push(err951);
}
errors++;
}
}
else {
const err952 = {instancePath:instancePath+"/assembly/version",schemaPath:"#/properties/assembly/properties/version/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err952];
}
else {
vErrors.push(err952);
}
errors++;
}
}
if(data280.linkedEyes !== undefined){
if(typeof data280.linkedEyes !== "boolean"){
const err953 = {instancePath:instancePath+"/assembly/linkedEyes",schemaPath:"#/properties/assembly/properties/linkedEyes/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err953];
}
else {
vErrors.push(err953);
}
errors++;
}
}
if(data280.choices !== undefined){
let data284 = data280.choices;
if(Array.isArray(data284)){
if(data284.length > 6){
const err954 = {instancePath:instancePath+"/assembly/choices",schemaPath:"#/properties/assembly/properties/choices/maxItems",keyword:"maxItems",params:{limit: 6},message:"must NOT have more than 6 items"};
if(vErrors === null){
vErrors = [err954];
}
else {
vErrors.push(err954);
}
errors++;
}
const len35 = data284.length;
for(let i37=0; i37<len35; i37++){
let data285 = data284[i37];
if(data285 && typeof data285 == "object" && !Array.isArray(data285)){
if(data285.slot === undefined){
const err955 = {instancePath:instancePath+"/assembly/choices/" + i37,schemaPath:"#/properties/assembly/properties/choices/items/required",keyword:"required",params:{missingProperty: "slot"},message:"must have required property '"+"slot"+"'"};
if(vErrors === null){
vErrors = [err955];
}
else {
vErrors.push(err955);
}
errors++;
}
if(data285.itemId === undefined){
const err956 = {instancePath:instancePath+"/assembly/choices/" + i37,schemaPath:"#/properties/assembly/properties/choices/items/required",keyword:"required",params:{missingProperty: "itemId"},message:"must have required property '"+"itemId"+"'"};
if(vErrors === null){
vErrors = [err956];
}
else {
vErrors.push(err956);
}
errors++;
}
if(data285.version === undefined){
const err957 = {instancePath:instancePath+"/assembly/choices/" + i37,schemaPath:"#/properties/assembly/properties/choices/items/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err957];
}
else {
vErrors.push(err957);
}
errors++;
}
for(const key51 in data285){
if(!(((key51 === "slot") || (key51 === "itemId")) || (key51 === "version"))){
const err958 = {instancePath:instancePath+"/assembly/choices/" + i37,schemaPath:"#/properties/assembly/properties/choices/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key51},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err958];
}
else {
vErrors.push(err958);
}
errors++;
}
}
if(data285.slot !== undefined){
let data286 = data285.slot;
if(!((((((data286 === "face") || (data286 === "hair")) || (data286 === "eyes")) || (data286 === "mouth")) || (data286 === "outfit")) || (data286 === "accessory"))){
const err959 = {instancePath:instancePath+"/assembly/choices/" + i37+"/slot",schemaPath:"#/properties/assembly/properties/choices/items/properties/slot/enum",keyword:"enum",params:{allowedValues: schema31.properties.assembly.properties.choices.items.properties.slot.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err959];
}
else {
vErrors.push(err959);
}
errors++;
}
}
if(data285.itemId !== undefined){
let data287 = data285.itemId;
const _errs634 = errors;
let valid136 = false;
const _errs635 = errors;
if(typeof data287 === "string"){
if(func2(data287) > 64){
const err960 = {instancePath:instancePath+"/assembly/choices/" + i37+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err960];
}
else {
vErrors.push(err960);
}
errors++;
}
if(func2(data287) < 1){
const err961 = {instancePath:instancePath+"/assembly/choices/" + i37+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err961];
}
else {
vErrors.push(err961);
}
errors++;
}
if(!pattern4.test(data287)){
const err962 = {instancePath:instancePath+"/assembly/choices/" + i37+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err962];
}
else {
vErrors.push(err962);
}
errors++;
}
}
else {
const err963 = {instancePath:instancePath+"/assembly/choices/" + i37+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err963];
}
else {
vErrors.push(err963);
}
errors++;
}
var _valid10 = _errs635 === errors;
valid136 = valid136 || _valid10;
const _errs637 = errors;
if(data287 !== null){
const err964 = {instancePath:instancePath+"/assembly/choices/" + i37+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err964];
}
else {
vErrors.push(err964);
}
errors++;
}
var _valid10 = _errs637 === errors;
valid136 = valid136 || _valid10;
if(!valid136){
const err965 = {instancePath:instancePath+"/assembly/choices/" + i37+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err965];
}
else {
vErrors.push(err965);
}
errors++;
}
else {
errors = _errs634;
if(vErrors !== null){
if(_errs634){
vErrors.length = _errs634;
}
else {
vErrors = null;
}
}
}
}
if(data285.version !== undefined){
let data288 = data285.version;
if(typeof data288 === "string"){
if(func2(data288) > 32){
const err966 = {instancePath:instancePath+"/assembly/choices/" + i37+"/version",schemaPath:"#/properties/assembly/properties/choices/items/properties/version/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err966];
}
else {
vErrors.push(err966);
}
errors++;
}
if(func2(data288) < 1){
const err967 = {instancePath:instancePath+"/assembly/choices/" + i37+"/version",schemaPath:"#/properties/assembly/properties/choices/items/properties/version/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err967];
}
else {
vErrors.push(err967);
}
errors++;
}
if(!pattern12.test(data288)){
const err968 = {instancePath:instancePath+"/assembly/choices/" + i37+"/version",schemaPath:"#/properties/assembly/properties/choices/items/properties/version/pattern",keyword:"pattern",params:{pattern: "^\\d+\\.\\d+\\.\\d+$"},message:"must match pattern \""+"^\\d+\\.\\d+\\.\\d+$"+"\""};
if(vErrors === null){
vErrors = [err968];
}
else {
vErrors.push(err968);
}
errors++;
}
}
else {
const err969 = {instancePath:instancePath+"/assembly/choices/" + i37+"/version",schemaPath:"#/properties/assembly/properties/choices/items/properties/version/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err969];
}
else {
vErrors.push(err969);
}
errors++;
}
}
}
else {
const err970 = {instancePath:instancePath+"/assembly/choices/" + i37,schemaPath:"#/properties/assembly/properties/choices/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err970];
}
else {
vErrors.push(err970);
}
errors++;
}
}
}
else {
const err971 = {instancePath:instancePath+"/assembly/choices",schemaPath:"#/properties/assembly/properties/choices/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err971];
}
else {
vErrors.push(err971);
}
errors++;
}
}
if(data280.adjustments !== undefined){
let data289 = data280.adjustments;
if(Array.isArray(data289)){
if(data289.length > 16){
const err972 = {instancePath:instancePath+"/assembly/adjustments",schemaPath:"#/properties/assembly/properties/adjustments/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err972];
}
else {
vErrors.push(err972);
}
errors++;
}
const len36 = data289.length;
for(let i38=0; i38<len36; i38++){
let data290 = data289[i38];
if(data290 && typeof data290 == "object" && !Array.isArray(data290)){
if(data290.key === undefined){
const err973 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "key"},message:"must have required property '"+"key"+"'"};
if(vErrors === null){
vErrors = [err973];
}
else {
vErrors.push(err973);
}
errors++;
}
if(data290.x === undefined){
const err974 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err974];
}
else {
vErrors.push(err974);
}
errors++;
}
if(data290.y === undefined){
const err975 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err975];
}
else {
vErrors.push(err975);
}
errors++;
}
if(data290.scale === undefined){
const err976 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "scale"},message:"must have required property '"+"scale"+"'"};
if(vErrors === null){
vErrors = [err976];
}
else {
vErrors.push(err976);
}
errors++;
}
if(data290.rotation === undefined){
const err977 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "rotation"},message:"must have required property '"+"rotation"+"'"};
if(vErrors === null){
vErrors = [err977];
}
else {
vErrors.push(err977);
}
errors++;
}
if(data290.hue === undefined){
const err978 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "hue"},message:"must have required property '"+"hue"+"'"};
if(vErrors === null){
vErrors = [err978];
}
else {
vErrors.push(err978);
}
errors++;
}
for(const key52 in data290){
if(!((((((key52 === "key") || (key52 === "x")) || (key52 === "y")) || (key52 === "scale")) || (key52 === "rotation")) || (key52 === "hue"))){
const err979 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key52},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err979];
}
else {
vErrors.push(err979);
}
errors++;
}
}
if(data290.key !== undefined){
let data291 = data290.key;
if(typeof data291 === "string"){
if(func2(data291) > 64){
const err980 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/key",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/key/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err980];
}
else {
vErrors.push(err980);
}
errors++;
}
if(func2(data291) < 1){
const err981 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/key",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/key/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err981];
}
else {
vErrors.push(err981);
}
errors++;
}
if(!pattern4.test(data291)){
const err982 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/key",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/key/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err982];
}
else {
vErrors.push(err982);
}
errors++;
}
}
else {
const err983 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/key",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/key/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err983];
}
else {
vErrors.push(err983);
}
errors++;
}
}
if(data290.x !== undefined){
let data292 = data290.x;
if((typeof data292 == "number") && (isFinite(data292))){
if(data292 > 6 || isNaN(data292)){
const err984 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/x",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 6},message:"must be <= 6"};
if(vErrors === null){
vErrors = [err984];
}
else {
vErrors.push(err984);
}
errors++;
}
if(data292 < -6 || isNaN(data292)){
const err985 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/x",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: -6},message:"must be >= -6"};
if(vErrors === null){
vErrors = [err985];
}
else {
vErrors.push(err985);
}
errors++;
}
}
else {
const err986 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/x",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err986];
}
else {
vErrors.push(err986);
}
errors++;
}
}
if(data290.y !== undefined){
let data293 = data290.y;
if((typeof data293 == "number") && (isFinite(data293))){
if(data293 > 6 || isNaN(data293)){
const err987 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/y",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 6},message:"must be <= 6"};
if(vErrors === null){
vErrors = [err987];
}
else {
vErrors.push(err987);
}
errors++;
}
if(data293 < -6 || isNaN(data293)){
const err988 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/y",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: -6},message:"must be >= -6"};
if(vErrors === null){
vErrors = [err988];
}
else {
vErrors.push(err988);
}
errors++;
}
}
else {
const err989 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/y",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err989];
}
else {
vErrors.push(err989);
}
errors++;
}
}
if(data290.scale !== undefined){
let data294 = data290.scale;
if((typeof data294 == "number") && (isFinite(data294))){
if(data294 > 1.05 || isNaN(data294)){
const err990 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/scale",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/scale/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1.05},message:"must be <= 1.05"};
if(vErrors === null){
vErrors = [err990];
}
else {
vErrors.push(err990);
}
errors++;
}
if(data294 < 0.95 || isNaN(data294)){
const err991 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/scale",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/scale/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0.95},message:"must be >= 0.95"};
if(vErrors === null){
vErrors = [err991];
}
else {
vErrors.push(err991);
}
errors++;
}
}
else {
const err992 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/scale",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/scale/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err992];
}
else {
vErrors.push(err992);
}
errors++;
}
}
if(data290.rotation !== undefined){
let data295 = data290.rotation;
if((typeof data295 == "number") && (isFinite(data295))){
if(data295 > 2 || isNaN(data295)){
const err993 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/rotation",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/rotation/maximum",keyword:"maximum",params:{comparison: "<=", limit: 2},message:"must be <= 2"};
if(vErrors === null){
vErrors = [err993];
}
else {
vErrors.push(err993);
}
errors++;
}
if(data295 < -2 || isNaN(data295)){
const err994 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/rotation",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/rotation/minimum",keyword:"minimum",params:{comparison: ">=", limit: -2},message:"must be >= -2"};
if(vErrors === null){
vErrors = [err994];
}
else {
vErrors.push(err994);
}
errors++;
}
}
else {
const err995 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/rotation",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/rotation/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err995];
}
else {
vErrors.push(err995);
}
errors++;
}
}
if(data290.hue !== undefined){
let data296 = data290.hue;
if((typeof data296 == "number") && (isFinite(data296))){
if(data296 > 18 || isNaN(data296)){
const err996 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/hue",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/hue/maximum",keyword:"maximum",params:{comparison: "<=", limit: 18},message:"must be <= 18"};
if(vErrors === null){
vErrors = [err996];
}
else {
vErrors.push(err996);
}
errors++;
}
if(data296 < -18 || isNaN(data296)){
const err997 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/hue",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/hue/minimum",keyword:"minimum",params:{comparison: ">=", limit: -18},message:"must be >= -18"};
if(vErrors === null){
vErrors = [err997];
}
else {
vErrors.push(err997);
}
errors++;
}
}
else {
const err998 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/hue",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/hue/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err998];
}
else {
vErrors.push(err998);
}
errors++;
}
}
}
else {
const err999 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err999];
}
else {
vErrors.push(err999);
}
errors++;
}
}
}
else {
const err1000 = {instancePath:instancePath+"/assembly/adjustments",schemaPath:"#/properties/assembly/properties/adjustments/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1000];
}
else {
vErrors.push(err1000);
}
errors++;
}
}
if(data280.warnings !== undefined){
let data297 = data280.warnings;
if(Array.isArray(data297)){
if(data297.length > 16){
const err1001 = {instancePath:instancePath+"/assembly/warnings",schemaPath:"#/properties/assembly/properties/warnings/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err1001];
}
else {
vErrors.push(err1001);
}
errors++;
}
const len37 = data297.length;
for(let i39=0; i39<len37; i39++){
let data298 = data297[i39];
if(typeof data298 === "string"){
if(func2(data298) > 512){
const err1002 = {instancePath:instancePath+"/assembly/warnings/" + i39,schemaPath:"#/properties/assembly/properties/warnings/items/maxLength",keyword:"maxLength",params:{limit: 512},message:"must NOT have more than 512 characters"};
if(vErrors === null){
vErrors = [err1002];
}
else {
vErrors.push(err1002);
}
errors++;
}
if(func2(data298) < 1){
const err1003 = {instancePath:instancePath+"/assembly/warnings/" + i39,schemaPath:"#/properties/assembly/properties/warnings/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1003];
}
else {
vErrors.push(err1003);
}
errors++;
}
}
else {
const err1004 = {instancePath:instancePath+"/assembly/warnings/" + i39,schemaPath:"#/properties/assembly/properties/warnings/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1004];
}
else {
vErrors.push(err1004);
}
errors++;
}
}
}
else {
const err1005 = {instancePath:instancePath+"/assembly/warnings",schemaPath:"#/properties/assembly/properties/warnings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1005];
}
else {
vErrors.push(err1005);
}
errors++;
}
}
}
else {
const err1006 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1006];
}
else {
vErrors.push(err1006);
}
errors++;
}
}
}
else {
const err1007 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1007];
}
else {
vErrors.push(err1007);
}
errors++;
}
validate20.errors = vErrors;
return errors === 0;
}
validate20.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const machineStructure = validate21;
const schema32 = {"$schema":"https://json-schema.org/draft/2020-12/schema","type":"object","additionalProperties":false,"properties":{"schemaVersion":{"const":1},"projectId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"cameraId":{"anyOf":[{"type":"string","minLength":1,"maxLength":512},{"type":"null"}]},"microphoneId":{"anyOf":[{"type":"string","minLength":1,"maxLength":512},{"type":"null"}]},"calibrations":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"bindingId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"inputRange":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2}},"required":["bindingId","inputRange"]},"maxItems":128}},"required":["schemaVersion","projectId","cameraId","microphoneId","calibrations"]};

function validate21(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate21.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schemaVersion === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schemaVersion"},message:"must have required property '"+"schemaVersion"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.projectId === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "projectId"},message:"must have required property '"+"projectId"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.cameraId === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "cameraId"},message:"must have required property '"+"cameraId"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.microphoneId === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "microphoneId"},message:"must have required property '"+"microphoneId"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.calibrations === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "calibrations"},message:"must have required property '"+"calibrations"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
for(const key0 in data){
if(!(((((key0 === "schemaVersion") || (key0 === "projectId")) || (key0 === "cameraId")) || (key0 === "microphoneId")) || (key0 === "calibrations"))){
const err5 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.schemaVersion !== undefined){
if(1 !== data.schemaVersion){
const err6 = {instancePath:instancePath+"/schemaVersion",schemaPath:"#/properties/schemaVersion/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.projectId !== undefined){
let data1 = data.projectId;
if(typeof data1 === "string"){
if(func2(data1) > 64){
const err7 = {instancePath:instancePath+"/projectId",schemaPath:"#/properties/projectId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(func2(data1) < 1){
const err8 = {instancePath:instancePath+"/projectId",schemaPath:"#/properties/projectId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(!pattern4.test(data1)){
const err9 = {instancePath:instancePath+"/projectId",schemaPath:"#/properties/projectId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
else {
const err10 = {instancePath:instancePath+"/projectId",schemaPath:"#/properties/projectId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.cameraId !== undefined){
let data2 = data.cameraId;
const _errs6 = errors;
let valid1 = false;
const _errs7 = errors;
if(typeof data2 === "string"){
if(func2(data2) > 512){
const err11 = {instancePath:instancePath+"/cameraId",schemaPath:"#/properties/cameraId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 512},message:"must NOT have more than 512 characters"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(func2(data2) < 1){
const err12 = {instancePath:instancePath+"/cameraId",schemaPath:"#/properties/cameraId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/cameraId",schemaPath:"#/properties/cameraId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
var _valid0 = _errs7 === errors;
valid1 = valid1 || _valid0;
const _errs9 = errors;
if(data2 !== null){
const err14 = {instancePath:instancePath+"/cameraId",schemaPath:"#/properties/cameraId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
var _valid0 = _errs9 === errors;
valid1 = valid1 || _valid0;
if(!valid1){
const err15 = {instancePath:instancePath+"/cameraId",schemaPath:"#/properties/cameraId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
else {
errors = _errs6;
if(vErrors !== null){
if(_errs6){
vErrors.length = _errs6;
}
else {
vErrors = null;
}
}
}
}
if(data.microphoneId !== undefined){
let data3 = data.microphoneId;
const _errs12 = errors;
let valid2 = false;
const _errs13 = errors;
if(typeof data3 === "string"){
if(func2(data3) > 512){
const err16 = {instancePath:instancePath+"/microphoneId",schemaPath:"#/properties/microphoneId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 512},message:"must NOT have more than 512 characters"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(func2(data3) < 1){
const err17 = {instancePath:instancePath+"/microphoneId",schemaPath:"#/properties/microphoneId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
else {
const err18 = {instancePath:instancePath+"/microphoneId",schemaPath:"#/properties/microphoneId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
var _valid1 = _errs13 === errors;
valid2 = valid2 || _valid1;
const _errs15 = errors;
if(data3 !== null){
const err19 = {instancePath:instancePath+"/microphoneId",schemaPath:"#/properties/microphoneId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
var _valid1 = _errs15 === errors;
valid2 = valid2 || _valid1;
if(!valid2){
const err20 = {instancePath:instancePath+"/microphoneId",schemaPath:"#/properties/microphoneId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
else {
errors = _errs12;
if(vErrors !== null){
if(_errs12){
vErrors.length = _errs12;
}
else {
vErrors = null;
}
}
}
}
if(data.calibrations !== undefined){
let data4 = data.calibrations;
if(Array.isArray(data4)){
if(data4.length > 128){
const err21 = {instancePath:instancePath+"/calibrations",schemaPath:"#/properties/calibrations/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
let data5 = data4[i0];
if(data5 && typeof data5 == "object" && !Array.isArray(data5)){
if(data5.bindingId === undefined){
const err22 = {instancePath:instancePath+"/calibrations/" + i0,schemaPath:"#/properties/calibrations/items/required",keyword:"required",params:{missingProperty: "bindingId"},message:"must have required property '"+"bindingId"+"'"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
if(data5.inputRange === undefined){
const err23 = {instancePath:instancePath+"/calibrations/" + i0,schemaPath:"#/properties/calibrations/items/required",keyword:"required",params:{missingProperty: "inputRange"},message:"must have required property '"+"inputRange"+"'"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
for(const key1 in data5){
if(!((key1 === "bindingId") || (key1 === "inputRange"))){
const err24 = {instancePath:instancePath+"/calibrations/" + i0,schemaPath:"#/properties/calibrations/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data5.bindingId !== undefined){
let data6 = data5.bindingId;
if(typeof data6 === "string"){
if(func2(data6) > 64){
const err25 = {instancePath:instancePath+"/calibrations/" + i0+"/bindingId",schemaPath:"#/properties/calibrations/items/properties/bindingId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
if(func2(data6) < 1){
const err26 = {instancePath:instancePath+"/calibrations/" + i0+"/bindingId",schemaPath:"#/properties/calibrations/items/properties/bindingId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
if(!pattern4.test(data6)){
const err27 = {instancePath:instancePath+"/calibrations/" + i0+"/bindingId",schemaPath:"#/properties/calibrations/items/properties/bindingId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
else {
const err28 = {instancePath:instancePath+"/calibrations/" + i0+"/bindingId",schemaPath:"#/properties/calibrations/items/properties/bindingId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data5.inputRange !== undefined){
let data7 = data5.inputRange;
if(Array.isArray(data7)){
if(data7.length > 2){
const err29 = {instancePath:instancePath+"/calibrations/" + i0+"/inputRange",schemaPath:"#/properties/calibrations/items/properties/inputRange/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
if(data7.length < 2){
const err30 = {instancePath:instancePath+"/calibrations/" + i0+"/inputRange",schemaPath:"#/properties/calibrations/items/properties/inputRange/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
const len1 = data7.length;
for(let i1=0; i1<len1; i1++){
let data8 = data7[i1];
if(!((typeof data8 == "number") && (isFinite(data8)))){
const err31 = {instancePath:instancePath+"/calibrations/" + i0+"/inputRange/" + i1,schemaPath:"#/properties/calibrations/items/properties/inputRange/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
}
else {
const err32 = {instancePath:instancePath+"/calibrations/" + i0+"/inputRange",schemaPath:"#/properties/calibrations/items/properties/inputRange/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
}
else {
const err33 = {instancePath:instancePath+"/calibrations/" + i0,schemaPath:"#/properties/calibrations/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
}
else {
const err34 = {instancePath:instancePath+"/calibrations",schemaPath:"#/properties/calibrations/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
}
else {
const err35 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
validate21.errors = vErrors;
return errors === 0;
}
validate21.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};
