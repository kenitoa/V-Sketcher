// @ts-nocheck -- Generated from schema.ts with locked Ajv; do not edit.
import ucs2lengthModule from "ajv/dist/runtime/ucs2length.js";
const ucs2length = ucs2lengthModule.default ?? ucs2lengthModule;
"use strict";
export const projectStructure = validate20;
const schema31 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://2dsketcher.local/schema/project-1.1","type":"object","additionalProperties":false,"properties":{"projectId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"schemaVersion":{"type":"object","additionalProperties":false,"properties":{"major":{"const":1},"minor":{"enum":[0,1]}},"required":["major","minor"]},"displayName":{"type":"string","minLength":1,"maxLength":120},"sourceType":{"enum":["parts","single-image","split-image"]},"createdAt":{"type":"string","minLength":1,"maxLength":24,"pattern":"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"},"modifiedAt":{"type":"string","minLength":1,"maxLength":24,"pattern":"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"savedRevision":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]},"canvas":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"inputAssetIds":{"type":"array","items":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"maxItems":1024,"uniqueItems":true},"assets":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"kind":{"enum":["original-image","part-texture","supplement-image","edited-image"]},"origin":{"enum":["imported","bundled","auto-preparation","auto-completion","manual-edit","generated"]},"parentAssetIds":{"type":"array","items":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"maxItems":1024,"uniqueItems":true},"storage":{"type":"object","additionalProperties":false,"properties":{"path":{"type":"string","minLength":1,"maxLength":240,"pattern":"^resources/"}},"required":["path"]},"fingerprint":{"type":"object","additionalProperties":false,"properties":{"sha256":{"type":"string","pattern":"^[a-f0-9]{64}$"},"bytes":{"type":"integer","minimum":1,"maximum":536870912}},"required":["sha256","bytes"]},"version":{"type":"integer","minimum":1,"maximum":9007199254740991},"mediaType":{"enum":["image/png","image/jpeg"]},"dimensions":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"sourceRegion":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},"sourceToEdited":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6},"colorSpace":{"enum":["srgb","unknown"]},"alphaMode":{"enum":["straight","premultiplied","opaque"]},"producer":{"type":"object","additionalProperties":false,"properties":{"name":{"type":"string","minLength":1,"maxLength":120},"version":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"}},"required":["name","version"]},"attribution":{"type":"object","additionalProperties":false,"properties":{"creator":{"type":"string","minLength":1,"maxLength":512},"source":{"type":"string","minLength":1,"maxLength":512},"usage":{"type":"string","minLength":1,"maxLength":1024},"status":{"enum":["verified","unverified"]}},"required":["creator","source","usage","status"]}},"required":["id","kind","origin","parentAssetIds","storage","fingerprint","version","mediaType","dimensions","sourceRegion","sourceToEdited","colorSpace","alphaMode","producer","attribution"]},"maxItems":1024},"parts":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"role":{"enum":["base","body","head","hair-front","hair-back","eye","mouth","accessory","custom"]},"side":{"enum":["character-left","character-right","center","none"]},"parentId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"groupId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"textures":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"state":{"type":"string","minLength":1,"maxLength":32,"pattern":"^[a-z][a-z0-9_-]*$"},"assetId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"assetVersion":{"type":"integer","minimum":1,"maximum":9007199254740991},"assetToLocal":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6}},"required":["state","assetId","assetVersion","assetToLocal"]},"maxItems":32},"localTransform":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6},"drawOrder":{"type":"integer","minimum":-100000,"maximum":100000},"visible":{"type":"boolean"},"opacity":{"type":"number","minimum":0,"maximum":1},"correctionOrigin":{"enum":["automatic","user-confirmed","manual"]},"limitations":{"type":"array","items":{"type":"string","minLength":1,"maxLength":512},"maxItems":64}},"required":["id","displayName","role","side","parentId","groupId","textures","localTransform","drawOrder","visible","opacity","correctionOrigin","limitations"]},"maxItems":64},"groups":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"parentGroupId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"visible":{"type":"boolean"}},"required":["id","displayName","parentGroupId","visible"]},"maxItems":128},"parameters":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"semantic":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[a-z][a-z0-9_-]*$"},"unit":{"enum":["ratio","degrees","custom"]},"min":{"type":"number"},"neutral":{"type":"number"},"max":{"type":"number"},"previewKey":{"anyOf":[{"enum":["eye_left","eye_right","mouth","head_yaw","head_roll"]},{"type":"null"}]}},"required":["id","displayName","semantic","unit","min","neutral","max","previewKey"]},"maxItems":128},"partBindings":{"type":"array","items":{"oneOf":[{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"partId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"kind":{"const":"state-blend"},"mapping":{"type":"object","additionalProperties":false,"properties":{"minimumState":{"type":"string","minLength":1,"maxLength":32},"maximumState":{"type":"string","minLength":1,"maxLength":32}},"required":["minimumState","maximumState"]}},"required":["id","parameterId","partId","kind","mapping"]},{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"partId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"kind":{"const":"transform"},"mapping":{"type":"object","additionalProperties":false,"properties":{"component":{"enum":["rotate-degrees","translate-x","translate-y","scale-x","scale-y"]},"outputRange":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2}},"required":["component","outputRange"]}},"required":["id","parameterId","partId","kind","mapping"]}]},"maxItems":256},"inputBindings":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"source":{"enum":["face","microphone","manual"]},"channel":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[a-z][a-z0-9_-]*$"},"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"inputRange":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"invert":{"type":"boolean"},"gain":{"type":"number","minimum":0,"maximum":10},"offset":{"type":"number"},"smoothingMs":{"type":"integer","minimum":0,"maximum":10000},"fallback":{"type":"object","additionalProperties":false,"properties":{"mode":{"enum":["neutral","hold","constant"]},"value":{"type":"number"},"returnMs":{"type":"integer","minimum":0,"maximum":10000}},"required":["mode","value","returnMs"]}},"required":["id","source","channel","parameterId","inputRange","invert","gain","offset","smoothingMs","fallback"]},"maxItems":128},"expressions":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"values":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"value":{"type":"number"},"locked":{"type":"boolean"}},"required":["parameterId","value","locked"]},"maxItems":128},"transitionMs":{"type":"integer","minimum":0,"maximum":10000},"release":{"enum":["live-input","neutral"]}},"required":["id","displayName","values","transitionMs","release"]},"maxItems":64},"runtimeProfile":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"mode":{"enum":["idle","camera","microphone","camera-microphone"]},"mirror":{"type":"boolean"},"fallbackExpressionId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]}},"required":["id","revision","mode","mirror","fallbackExpressionId"]},"broadcastProfiles":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"displayName":{"type":"string","minLength":1,"maxLength":120},"width":{"type":"integer","minimum":1,"maximum":8192},"height":{"type":"integer","minimum":1,"maximum":8192},"fps":{"type":"integer","minimum":1,"maximum":120},"transparent":{"type":"boolean"},"region":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},"fit":{"enum":["contain","cover"]}},"required":["id","revision","displayName","width","height","fps","transparent","region","fit"]},"maxItems":16},"exportProfiles":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"displayName":{"type":"string","minLength":1,"maxLength":120},"target":{"enum":["inochi2d"]},"targetVersion":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"},"format":{"enum":["inp"]},"converterVersion":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"},"parameterMap":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"targetName":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[a-zA-Z][a-zA-Z0-9_]*$"}},"required":["parameterId","targetName"]},"maxItems":128}},"required":["id","revision","displayName","target","targetVersion","format","converterVersion","parameterMap"]},"maxItems":16},"provenance":{"type":"object","additionalProperties":false,"properties":{"preparation":{"type":"string","minLength":1,"maxLength":512},"limitations":{"type":"array","items":{"type":"string","minLength":1,"maxLength":512},"maxItems":128}},"required":["preparation","limitations"]},"derivedProjects":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"projectId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"relation":{"enum":["3d","generated-variant"]}},"required":["projectId","relation"]},"maxItems":32},"motion":{"type":"object","additionalProperties":false,"properties":{"version":{"const":1},"faceWidth":{"type":"number","exclusiveMinimum":0},"maxRollDegrees":{"type":"number","minimum":0,"maximum":6},"secondary":{"const":"disabled"},"settings":{"type":"object","additionalProperties":false,"properties":{"strength":{"type":"number","minimum":0,"maximum":1},"smoothingMs":{"type":"integer","minimum":0,"maximum":1000},"pose":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"value":{"type":"number"}},"required":["parameterId","value"]},"maxItems":128}},"required":["strength","smoothingMs","pose"]},"meshes":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"partId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"pivot":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"yawParameterId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"rollParameterId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"curve":{"enum":["linear","smoothstep"]},"vertices":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"position":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"weight":{"type":"number","minimum":0,"maximum":1},"minimum":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"maximum":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2}},"required":["position","weight","minimum","maximum"]},"maxItems":1024,"minItems":3},"triangles":{"type":"array","items":{"type":"integer","minimum":0,"maximum":1023},"maxItems":6144,"minItems":3}},"required":["partId","pivot","yawParameterId","rollParameterId","curve","vertices","triangles"]},"maxItems":64}},"required":["version","faceWidth","maxRollDegrees","secondary","settings","meshes"]}},"required":["projectId","schemaVersion","displayName","sourceType","createdAt","modifiedAt","revision","savedRevision","canvas","inputAssetIds","assets","parts","groups","parameters","partBindings","inputBindings","expressions","runtimeProfile","broadcastProfiles","exportProfiles","provenance","derivedProjects"]};
const func1 = Object.prototype.hasOwnProperty;
const func2 = ucs2length;
const pattern4 = new RegExp("^[A-Za-z0-9][A-Za-z0-9_-]*$", "u");
const pattern5 = new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$", "u");
const pattern10 = new RegExp("^resources/", "u");
const pattern11 = new RegExp("^[a-f0-9]{64}$", "u");
const pattern12 = new RegExp("^\\d+\\.\\d+\\.\\d+$", "u");
const pattern16 = new RegExp("^[a-z][a-z0-9_-]*$", "u");
const pattern40 = new RegExp("^[a-zA-Z][a-zA-Z0-9_]*$", "u");

function validate20(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="https://2dsketcher.local/schema/project-1.1" */;
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
if(!((data3 === 0) || (data3 === 1))){
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
}
else {
const err253 = {instancePath:instancePath+"/parts/" + i6,schemaPath:"#/properties/parts/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err253];
}
else {
vErrors.push(err253);
}
errors++;
}
}
}
else {
const err254 = {instancePath:instancePath+"/parts",schemaPath:"#/properties/parts/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err254];
}
else {
vErrors.push(err254);
}
errors++;
}
}
if(data.groups !== undefined){
let data72 = data.groups;
if(Array.isArray(data72)){
if(data72.length > 128){
const err255 = {instancePath:instancePath+"/groups",schemaPath:"#/properties/groups/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err255];
}
else {
vErrors.push(err255);
}
errors++;
}
const len9 = data72.length;
for(let i11=0; i11<len9; i11++){
let data73 = data72[i11];
if(data73 && typeof data73 == "object" && !Array.isArray(data73)){
if(data73.id === undefined){
const err256 = {instancePath:instancePath+"/groups/" + i11,schemaPath:"#/properties/groups/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err256];
}
else {
vErrors.push(err256);
}
errors++;
}
if(data73.displayName === undefined){
const err257 = {instancePath:instancePath+"/groups/" + i11,schemaPath:"#/properties/groups/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err257];
}
else {
vErrors.push(err257);
}
errors++;
}
if(data73.parentGroupId === undefined){
const err258 = {instancePath:instancePath+"/groups/" + i11,schemaPath:"#/properties/groups/items/required",keyword:"required",params:{missingProperty: "parentGroupId"},message:"must have required property '"+"parentGroupId"+"'"};
if(vErrors === null){
vErrors = [err258];
}
else {
vErrors.push(err258);
}
errors++;
}
if(data73.visible === undefined){
const err259 = {instancePath:instancePath+"/groups/" + i11,schemaPath:"#/properties/groups/items/required",keyword:"required",params:{missingProperty: "visible"},message:"must have required property '"+"visible"+"'"};
if(vErrors === null){
vErrors = [err259];
}
else {
vErrors.push(err259);
}
errors++;
}
for(const key12 in data73){
if(!((((key12 === "id") || (key12 === "displayName")) || (key12 === "parentGroupId")) || (key12 === "visible"))){
const err260 = {instancePath:instancePath+"/groups/" + i11,schemaPath:"#/properties/groups/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key12},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err260];
}
else {
vErrors.push(err260);
}
errors++;
}
}
if(data73.id !== undefined){
let data74 = data73.id;
if(typeof data74 === "string"){
if(func2(data74) > 64){
const err261 = {instancePath:instancePath+"/groups/" + i11+"/id",schemaPath:"#/properties/groups/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err261];
}
else {
vErrors.push(err261);
}
errors++;
}
if(func2(data74) < 1){
const err262 = {instancePath:instancePath+"/groups/" + i11+"/id",schemaPath:"#/properties/groups/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err262];
}
else {
vErrors.push(err262);
}
errors++;
}
if(!pattern4.test(data74)){
const err263 = {instancePath:instancePath+"/groups/" + i11+"/id",schemaPath:"#/properties/groups/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err263];
}
else {
vErrors.push(err263);
}
errors++;
}
}
else {
const err264 = {instancePath:instancePath+"/groups/" + i11+"/id",schemaPath:"#/properties/groups/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err264];
}
else {
vErrors.push(err264);
}
errors++;
}
}
if(data73.displayName !== undefined){
let data75 = data73.displayName;
if(typeof data75 === "string"){
if(func2(data75) > 120){
const err265 = {instancePath:instancePath+"/groups/" + i11+"/displayName",schemaPath:"#/properties/groups/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err265];
}
else {
vErrors.push(err265);
}
errors++;
}
if(func2(data75) < 1){
const err266 = {instancePath:instancePath+"/groups/" + i11+"/displayName",schemaPath:"#/properties/groups/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err266];
}
else {
vErrors.push(err266);
}
errors++;
}
}
else {
const err267 = {instancePath:instancePath+"/groups/" + i11+"/displayName",schemaPath:"#/properties/groups/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err267];
}
else {
vErrors.push(err267);
}
errors++;
}
}
if(data73.parentGroupId !== undefined){
let data76 = data73.parentGroupId;
const _errs167 = errors;
let valid38 = false;
const _errs168 = errors;
if(typeof data76 === "string"){
if(func2(data76) > 64){
const err268 = {instancePath:instancePath+"/groups/" + i11+"/parentGroupId",schemaPath:"#/properties/groups/items/properties/parentGroupId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err268];
}
else {
vErrors.push(err268);
}
errors++;
}
if(func2(data76) < 1){
const err269 = {instancePath:instancePath+"/groups/" + i11+"/parentGroupId",schemaPath:"#/properties/groups/items/properties/parentGroupId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err269];
}
else {
vErrors.push(err269);
}
errors++;
}
if(!pattern4.test(data76)){
const err270 = {instancePath:instancePath+"/groups/" + i11+"/parentGroupId",schemaPath:"#/properties/groups/items/properties/parentGroupId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err270];
}
else {
vErrors.push(err270);
}
errors++;
}
}
else {
const err271 = {instancePath:instancePath+"/groups/" + i11+"/parentGroupId",schemaPath:"#/properties/groups/items/properties/parentGroupId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err271];
}
else {
vErrors.push(err271);
}
errors++;
}
var _valid3 = _errs168 === errors;
valid38 = valid38 || _valid3;
const _errs170 = errors;
if(data76 !== null){
const err272 = {instancePath:instancePath+"/groups/" + i11+"/parentGroupId",schemaPath:"#/properties/groups/items/properties/parentGroupId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err272];
}
else {
vErrors.push(err272);
}
errors++;
}
var _valid3 = _errs170 === errors;
valid38 = valid38 || _valid3;
if(!valid38){
const err273 = {instancePath:instancePath+"/groups/" + i11+"/parentGroupId",schemaPath:"#/properties/groups/items/properties/parentGroupId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err273];
}
else {
vErrors.push(err273);
}
errors++;
}
else {
errors = _errs167;
if(vErrors !== null){
if(_errs167){
vErrors.length = _errs167;
}
else {
vErrors = null;
}
}
}
}
if(data73.visible !== undefined){
if(typeof data73.visible !== "boolean"){
const err274 = {instancePath:instancePath+"/groups/" + i11+"/visible",schemaPath:"#/properties/groups/items/properties/visible/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err274];
}
else {
vErrors.push(err274);
}
errors++;
}
}
}
else {
const err275 = {instancePath:instancePath+"/groups/" + i11,schemaPath:"#/properties/groups/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err275];
}
else {
vErrors.push(err275);
}
errors++;
}
}
}
else {
const err276 = {instancePath:instancePath+"/groups",schemaPath:"#/properties/groups/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err276];
}
else {
vErrors.push(err276);
}
errors++;
}
}
if(data.parameters !== undefined){
let data78 = data.parameters;
if(Array.isArray(data78)){
if(data78.length > 128){
const err277 = {instancePath:instancePath+"/parameters",schemaPath:"#/properties/parameters/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err277];
}
else {
vErrors.push(err277);
}
errors++;
}
const len10 = data78.length;
for(let i12=0; i12<len10; i12++){
let data79 = data78[i12];
if(data79 && typeof data79 == "object" && !Array.isArray(data79)){
if(data79.id === undefined){
const err278 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err278];
}
else {
vErrors.push(err278);
}
errors++;
}
if(data79.displayName === undefined){
const err279 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err279];
}
else {
vErrors.push(err279);
}
errors++;
}
if(data79.semantic === undefined){
const err280 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "semantic"},message:"must have required property '"+"semantic"+"'"};
if(vErrors === null){
vErrors = [err280];
}
else {
vErrors.push(err280);
}
errors++;
}
if(data79.unit === undefined){
const err281 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "unit"},message:"must have required property '"+"unit"+"'"};
if(vErrors === null){
vErrors = [err281];
}
else {
vErrors.push(err281);
}
errors++;
}
if(data79.min === undefined){
const err282 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "min"},message:"must have required property '"+"min"+"'"};
if(vErrors === null){
vErrors = [err282];
}
else {
vErrors.push(err282);
}
errors++;
}
if(data79.neutral === undefined){
const err283 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "neutral"},message:"must have required property '"+"neutral"+"'"};
if(vErrors === null){
vErrors = [err283];
}
else {
vErrors.push(err283);
}
errors++;
}
if(data79.max === undefined){
const err284 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "max"},message:"must have required property '"+"max"+"'"};
if(vErrors === null){
vErrors = [err284];
}
else {
vErrors.push(err284);
}
errors++;
}
if(data79.previewKey === undefined){
const err285 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "previewKey"},message:"must have required property '"+"previewKey"+"'"};
if(vErrors === null){
vErrors = [err285];
}
else {
vErrors.push(err285);
}
errors++;
}
for(const key13 in data79){
if(!((((((((key13 === "id") || (key13 === "displayName")) || (key13 === "semantic")) || (key13 === "unit")) || (key13 === "min")) || (key13 === "neutral")) || (key13 === "max")) || (key13 === "previewKey"))){
const err286 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key13},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err286];
}
else {
vErrors.push(err286);
}
errors++;
}
}
if(data79.id !== undefined){
let data80 = data79.id;
if(typeof data80 === "string"){
if(func2(data80) > 64){
const err287 = {instancePath:instancePath+"/parameters/" + i12+"/id",schemaPath:"#/properties/parameters/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err287];
}
else {
vErrors.push(err287);
}
errors++;
}
if(func2(data80) < 1){
const err288 = {instancePath:instancePath+"/parameters/" + i12+"/id",schemaPath:"#/properties/parameters/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err288];
}
else {
vErrors.push(err288);
}
errors++;
}
if(!pattern4.test(data80)){
const err289 = {instancePath:instancePath+"/parameters/" + i12+"/id",schemaPath:"#/properties/parameters/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err289];
}
else {
vErrors.push(err289);
}
errors++;
}
}
else {
const err290 = {instancePath:instancePath+"/parameters/" + i12+"/id",schemaPath:"#/properties/parameters/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err290];
}
else {
vErrors.push(err290);
}
errors++;
}
}
if(data79.displayName !== undefined){
let data81 = data79.displayName;
if(typeof data81 === "string"){
if(func2(data81) > 120){
const err291 = {instancePath:instancePath+"/parameters/" + i12+"/displayName",schemaPath:"#/properties/parameters/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err291];
}
else {
vErrors.push(err291);
}
errors++;
}
if(func2(data81) < 1){
const err292 = {instancePath:instancePath+"/parameters/" + i12+"/displayName",schemaPath:"#/properties/parameters/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err292];
}
else {
vErrors.push(err292);
}
errors++;
}
}
else {
const err293 = {instancePath:instancePath+"/parameters/" + i12+"/displayName",schemaPath:"#/properties/parameters/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err293];
}
else {
vErrors.push(err293);
}
errors++;
}
}
if(data79.semantic !== undefined){
let data82 = data79.semantic;
if(typeof data82 === "string"){
if(func2(data82) > 64){
const err294 = {instancePath:instancePath+"/parameters/" + i12+"/semantic",schemaPath:"#/properties/parameters/items/properties/semantic/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err294];
}
else {
vErrors.push(err294);
}
errors++;
}
if(func2(data82) < 1){
const err295 = {instancePath:instancePath+"/parameters/" + i12+"/semantic",schemaPath:"#/properties/parameters/items/properties/semantic/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err295];
}
else {
vErrors.push(err295);
}
errors++;
}
if(!pattern16.test(data82)){
const err296 = {instancePath:instancePath+"/parameters/" + i12+"/semantic",schemaPath:"#/properties/parameters/items/properties/semantic/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err296];
}
else {
vErrors.push(err296);
}
errors++;
}
}
else {
const err297 = {instancePath:instancePath+"/parameters/" + i12+"/semantic",schemaPath:"#/properties/parameters/items/properties/semantic/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err297];
}
else {
vErrors.push(err297);
}
errors++;
}
}
if(data79.unit !== undefined){
let data83 = data79.unit;
if(!(((data83 === "ratio") || (data83 === "degrees")) || (data83 === "custom"))){
const err298 = {instancePath:instancePath+"/parameters/" + i12+"/unit",schemaPath:"#/properties/parameters/items/properties/unit/enum",keyword:"enum",params:{allowedValues: schema31.properties.parameters.items.properties.unit.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err298];
}
else {
vErrors.push(err298);
}
errors++;
}
}
if(data79.min !== undefined){
let data84 = data79.min;
if(!((typeof data84 == "number") && (isFinite(data84)))){
const err299 = {instancePath:instancePath+"/parameters/" + i12+"/min",schemaPath:"#/properties/parameters/items/properties/min/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err299];
}
else {
vErrors.push(err299);
}
errors++;
}
}
if(data79.neutral !== undefined){
let data85 = data79.neutral;
if(!((typeof data85 == "number") && (isFinite(data85)))){
const err300 = {instancePath:instancePath+"/parameters/" + i12+"/neutral",schemaPath:"#/properties/parameters/items/properties/neutral/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err300];
}
else {
vErrors.push(err300);
}
errors++;
}
}
if(data79.max !== undefined){
let data86 = data79.max;
if(!((typeof data86 == "number") && (isFinite(data86)))){
const err301 = {instancePath:instancePath+"/parameters/" + i12+"/max",schemaPath:"#/properties/parameters/items/properties/max/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err301];
}
else {
vErrors.push(err301);
}
errors++;
}
}
if(data79.previewKey !== undefined){
let data87 = data79.previewKey;
const _errs193 = errors;
let valid42 = false;
const _errs194 = errors;
if(!(((((data87 === "eye_left") || (data87 === "eye_right")) || (data87 === "mouth")) || (data87 === "head_yaw")) || (data87 === "head_roll"))){
const err302 = {instancePath:instancePath+"/parameters/" + i12+"/previewKey",schemaPath:"#/properties/parameters/items/properties/previewKey/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema31.properties.parameters.items.properties.previewKey.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err302];
}
else {
vErrors.push(err302);
}
errors++;
}
var _valid4 = _errs194 === errors;
valid42 = valid42 || _valid4;
const _errs195 = errors;
if(data87 !== null){
const err303 = {instancePath:instancePath+"/parameters/" + i12+"/previewKey",schemaPath:"#/properties/parameters/items/properties/previewKey/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err303];
}
else {
vErrors.push(err303);
}
errors++;
}
var _valid4 = _errs195 === errors;
valid42 = valid42 || _valid4;
if(!valid42){
const err304 = {instancePath:instancePath+"/parameters/" + i12+"/previewKey",schemaPath:"#/properties/parameters/items/properties/previewKey/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err304];
}
else {
vErrors.push(err304);
}
errors++;
}
else {
errors = _errs193;
if(vErrors !== null){
if(_errs193){
vErrors.length = _errs193;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err305 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err305];
}
else {
vErrors.push(err305);
}
errors++;
}
}
}
else {
const err306 = {instancePath:instancePath+"/parameters",schemaPath:"#/properties/parameters/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err306];
}
else {
vErrors.push(err306);
}
errors++;
}
}
if(data.partBindings !== undefined){
let data88 = data.partBindings;
if(Array.isArray(data88)){
if(data88.length > 256){
const err307 = {instancePath:instancePath+"/partBindings",schemaPath:"#/properties/partBindings/maxItems",keyword:"maxItems",params:{limit: 256},message:"must NOT have more than 256 items"};
if(vErrors === null){
vErrors = [err307];
}
else {
vErrors.push(err307);
}
errors++;
}
const len11 = data88.length;
for(let i13=0; i13<len11; i13++){
let data89 = data88[i13];
const _errs200 = errors;
let valid45 = false;
let passing0 = null;
const _errs201 = errors;
if(data89 && typeof data89 == "object" && !Array.isArray(data89)){
if(data89.id === undefined){
const err308 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err308];
}
else {
vErrors.push(err308);
}
errors++;
}
if(data89.parameterId === undefined){
const err309 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err309];
}
else {
vErrors.push(err309);
}
errors++;
}
if(data89.partId === undefined){
const err310 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "partId"},message:"must have required property '"+"partId"+"'"};
if(vErrors === null){
vErrors = [err310];
}
else {
vErrors.push(err310);
}
errors++;
}
if(data89.kind === undefined){
const err311 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err311];
}
else {
vErrors.push(err311);
}
errors++;
}
if(data89.mapping === undefined){
const err312 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "mapping"},message:"must have required property '"+"mapping"+"'"};
if(vErrors === null){
vErrors = [err312];
}
else {
vErrors.push(err312);
}
errors++;
}
for(const key14 in data89){
if(!(((((key14 === "id") || (key14 === "parameterId")) || (key14 === "partId")) || (key14 === "kind")) || (key14 === "mapping"))){
const err313 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key14},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err313];
}
else {
vErrors.push(err313);
}
errors++;
}
}
if(data89.id !== undefined){
let data90 = data89.id;
if(typeof data90 === "string"){
if(func2(data90) > 64){
const err314 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err314];
}
else {
vErrors.push(err314);
}
errors++;
}
if(func2(data90) < 1){
const err315 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err315];
}
else {
vErrors.push(err315);
}
errors++;
}
if(!pattern4.test(data90)){
const err316 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err316];
}
else {
vErrors.push(err316);
}
errors++;
}
}
else {
const err317 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err317];
}
else {
vErrors.push(err317);
}
errors++;
}
}
if(data89.parameterId !== undefined){
let data91 = data89.parameterId;
if(typeof data91 === "string"){
if(func2(data91) > 64){
const err318 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err318];
}
else {
vErrors.push(err318);
}
errors++;
}
if(func2(data91) < 1){
const err319 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err319];
}
else {
vErrors.push(err319);
}
errors++;
}
if(!pattern4.test(data91)){
const err320 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err320];
}
else {
vErrors.push(err320);
}
errors++;
}
}
else {
const err321 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err321];
}
else {
vErrors.push(err321);
}
errors++;
}
}
if(data89.partId !== undefined){
let data92 = data89.partId;
if(typeof data92 === "string"){
if(func2(data92) > 64){
const err322 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/partId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err322];
}
else {
vErrors.push(err322);
}
errors++;
}
if(func2(data92) < 1){
const err323 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/partId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err323];
}
else {
vErrors.push(err323);
}
errors++;
}
if(!pattern4.test(data92)){
const err324 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/partId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err324];
}
else {
vErrors.push(err324);
}
errors++;
}
}
else {
const err325 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/partId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err325];
}
else {
vErrors.push(err325);
}
errors++;
}
}
if(data89.kind !== undefined){
if("state-blend" !== data89.kind){
const err326 = {instancePath:instancePath+"/partBindings/" + i13+"/kind",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/kind/const",keyword:"const",params:{allowedValue: "state-blend"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err326];
}
else {
vErrors.push(err326);
}
errors++;
}
}
if(data89.mapping !== undefined){
let data94 = data89.mapping;
if(data94 && typeof data94 == "object" && !Array.isArray(data94)){
if(data94.minimumState === undefined){
const err327 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/required",keyword:"required",params:{missingProperty: "minimumState"},message:"must have required property '"+"minimumState"+"'"};
if(vErrors === null){
vErrors = [err327];
}
else {
vErrors.push(err327);
}
errors++;
}
if(data94.maximumState === undefined){
const err328 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/required",keyword:"required",params:{missingProperty: "maximumState"},message:"must have required property '"+"maximumState"+"'"};
if(vErrors === null){
vErrors = [err328];
}
else {
vErrors.push(err328);
}
errors++;
}
for(const key15 in data94){
if(!((key15 === "minimumState") || (key15 === "maximumState"))){
const err329 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key15},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err329];
}
else {
vErrors.push(err329);
}
errors++;
}
}
if(data94.minimumState !== undefined){
let data95 = data94.minimumState;
if(typeof data95 === "string"){
if(func2(data95) > 32){
const err330 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/minimumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/minimumState/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err330];
}
else {
vErrors.push(err330);
}
errors++;
}
if(func2(data95) < 1){
const err331 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/minimumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/minimumState/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err331];
}
else {
vErrors.push(err331);
}
errors++;
}
}
else {
const err332 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/minimumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/minimumState/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err332];
}
else {
vErrors.push(err332);
}
errors++;
}
}
if(data94.maximumState !== undefined){
let data96 = data94.maximumState;
if(typeof data96 === "string"){
if(func2(data96) > 32){
const err333 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/maximumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/maximumState/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err333];
}
else {
vErrors.push(err333);
}
errors++;
}
if(func2(data96) < 1){
const err334 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/maximumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/maximumState/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err334];
}
else {
vErrors.push(err334);
}
errors++;
}
}
else {
const err335 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/maximumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/maximumState/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err335];
}
else {
vErrors.push(err335);
}
errors++;
}
}
}
else {
const err336 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err336];
}
else {
vErrors.push(err336);
}
errors++;
}
}
}
else {
const err337 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err337];
}
else {
vErrors.push(err337);
}
errors++;
}
var _valid5 = _errs201 === errors;
if(_valid5){
valid45 = true;
passing0 = 0;
var props0 = true;
}
const _errs218 = errors;
if(data89 && typeof data89 == "object" && !Array.isArray(data89)){
if(data89.id === undefined){
const err338 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err338];
}
else {
vErrors.push(err338);
}
errors++;
}
if(data89.parameterId === undefined){
const err339 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err339];
}
else {
vErrors.push(err339);
}
errors++;
}
if(data89.partId === undefined){
const err340 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "partId"},message:"must have required property '"+"partId"+"'"};
if(vErrors === null){
vErrors = [err340];
}
else {
vErrors.push(err340);
}
errors++;
}
if(data89.kind === undefined){
const err341 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err341];
}
else {
vErrors.push(err341);
}
errors++;
}
if(data89.mapping === undefined){
const err342 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "mapping"},message:"must have required property '"+"mapping"+"'"};
if(vErrors === null){
vErrors = [err342];
}
else {
vErrors.push(err342);
}
errors++;
}
for(const key16 in data89){
if(!(((((key16 === "id") || (key16 === "parameterId")) || (key16 === "partId")) || (key16 === "kind")) || (key16 === "mapping"))){
const err343 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key16},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err343];
}
else {
vErrors.push(err343);
}
errors++;
}
}
if(data89.id !== undefined){
let data97 = data89.id;
if(typeof data97 === "string"){
if(func2(data97) > 64){
const err344 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err344];
}
else {
vErrors.push(err344);
}
errors++;
}
if(func2(data97) < 1){
const err345 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err345];
}
else {
vErrors.push(err345);
}
errors++;
}
if(!pattern4.test(data97)){
const err346 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err346];
}
else {
vErrors.push(err346);
}
errors++;
}
}
else {
const err347 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err347];
}
else {
vErrors.push(err347);
}
errors++;
}
}
if(data89.parameterId !== undefined){
let data98 = data89.parameterId;
if(typeof data98 === "string"){
if(func2(data98) > 64){
const err348 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err348];
}
else {
vErrors.push(err348);
}
errors++;
}
if(func2(data98) < 1){
const err349 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err349];
}
else {
vErrors.push(err349);
}
errors++;
}
if(!pattern4.test(data98)){
const err350 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err350];
}
else {
vErrors.push(err350);
}
errors++;
}
}
else {
const err351 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err351];
}
else {
vErrors.push(err351);
}
errors++;
}
}
if(data89.partId !== undefined){
let data99 = data89.partId;
if(typeof data99 === "string"){
if(func2(data99) > 64){
const err352 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/partId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err352];
}
else {
vErrors.push(err352);
}
errors++;
}
if(func2(data99) < 1){
const err353 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/partId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err353];
}
else {
vErrors.push(err353);
}
errors++;
}
if(!pattern4.test(data99)){
const err354 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/partId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err354];
}
else {
vErrors.push(err354);
}
errors++;
}
}
else {
const err355 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/partId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err355];
}
else {
vErrors.push(err355);
}
errors++;
}
}
if(data89.kind !== undefined){
if("transform" !== data89.kind){
const err356 = {instancePath:instancePath+"/partBindings/" + i13+"/kind",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/kind/const",keyword:"const",params:{allowedValue: "transform"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err356];
}
else {
vErrors.push(err356);
}
errors++;
}
}
if(data89.mapping !== undefined){
let data101 = data89.mapping;
if(data101 && typeof data101 == "object" && !Array.isArray(data101)){
if(data101.component === undefined){
const err357 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/required",keyword:"required",params:{missingProperty: "component"},message:"must have required property '"+"component"+"'"};
if(vErrors === null){
vErrors = [err357];
}
else {
vErrors.push(err357);
}
errors++;
}
if(data101.outputRange === undefined){
const err358 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/required",keyword:"required",params:{missingProperty: "outputRange"},message:"must have required property '"+"outputRange"+"'"};
if(vErrors === null){
vErrors = [err358];
}
else {
vErrors.push(err358);
}
errors++;
}
for(const key17 in data101){
if(!((key17 === "component") || (key17 === "outputRange"))){
const err359 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key17},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err359];
}
else {
vErrors.push(err359);
}
errors++;
}
}
if(data101.component !== undefined){
let data102 = data101.component;
if(!(((((data102 === "rotate-degrees") || (data102 === "translate-x")) || (data102 === "translate-y")) || (data102 === "scale-x")) || (data102 === "scale-y"))){
const err360 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/component",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/properties/component/enum",keyword:"enum",params:{allowedValues: schema31.properties.partBindings.items.oneOf[1].properties.mapping.properties.component.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err360];
}
else {
vErrors.push(err360);
}
errors++;
}
}
if(data101.outputRange !== undefined){
let data103 = data101.outputRange;
if(Array.isArray(data103)){
if(data103.length > 2){
const err361 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/outputRange",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/properties/outputRange/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err361];
}
else {
vErrors.push(err361);
}
errors++;
}
if(data103.length < 2){
const err362 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/outputRange",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/properties/outputRange/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err362];
}
else {
vErrors.push(err362);
}
errors++;
}
const len12 = data103.length;
for(let i14=0; i14<len12; i14++){
let data104 = data103[i14];
if(!((typeof data104 == "number") && (isFinite(data104)))){
const err363 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/outputRange/" + i14,schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/properties/outputRange/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err363];
}
else {
vErrors.push(err363);
}
errors++;
}
}
}
else {
const err364 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/outputRange",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/properties/outputRange/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err364];
}
else {
vErrors.push(err364);
}
errors++;
}
}
}
else {
const err365 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err365];
}
else {
vErrors.push(err365);
}
errors++;
}
}
}
else {
const err366 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err366];
}
else {
vErrors.push(err366);
}
errors++;
}
var _valid5 = _errs218 === errors;
if(_valid5 && valid45){
valid45 = false;
passing0 = [passing0, 1];
}
else {
if(_valid5){
valid45 = true;
passing0 = 1;
if(props0 !== true){
props0 = true;
}
}
}
if(!valid45){
const err367 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf",keyword:"oneOf",params:{passingSchemas: passing0},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err367];
}
else {
vErrors.push(err367);
}
errors++;
}
else {
errors = _errs200;
if(vErrors !== null){
if(_errs200){
vErrors.length = _errs200;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err368 = {instancePath:instancePath+"/partBindings",schemaPath:"#/properties/partBindings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err368];
}
else {
vErrors.push(err368);
}
errors++;
}
}
if(data.inputBindings !== undefined){
let data105 = data.inputBindings;
if(Array.isArray(data105)){
if(data105.length > 128){
const err369 = {instancePath:instancePath+"/inputBindings",schemaPath:"#/properties/inputBindings/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err369];
}
else {
vErrors.push(err369);
}
errors++;
}
const len13 = data105.length;
for(let i15=0; i15<len13; i15++){
let data106 = data105[i15];
if(data106 && typeof data106 == "object" && !Array.isArray(data106)){
if(data106.id === undefined){
const err370 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err370];
}
else {
vErrors.push(err370);
}
errors++;
}
if(data106.source === undefined){
const err371 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "source"},message:"must have required property '"+"source"+"'"};
if(vErrors === null){
vErrors = [err371];
}
else {
vErrors.push(err371);
}
errors++;
}
if(data106.channel === undefined){
const err372 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "channel"},message:"must have required property '"+"channel"+"'"};
if(vErrors === null){
vErrors = [err372];
}
else {
vErrors.push(err372);
}
errors++;
}
if(data106.parameterId === undefined){
const err373 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err373];
}
else {
vErrors.push(err373);
}
errors++;
}
if(data106.inputRange === undefined){
const err374 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "inputRange"},message:"must have required property '"+"inputRange"+"'"};
if(vErrors === null){
vErrors = [err374];
}
else {
vErrors.push(err374);
}
errors++;
}
if(data106.invert === undefined){
const err375 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "invert"},message:"must have required property '"+"invert"+"'"};
if(vErrors === null){
vErrors = [err375];
}
else {
vErrors.push(err375);
}
errors++;
}
if(data106.gain === undefined){
const err376 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "gain"},message:"must have required property '"+"gain"+"'"};
if(vErrors === null){
vErrors = [err376];
}
else {
vErrors.push(err376);
}
errors++;
}
if(data106.offset === undefined){
const err377 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "offset"},message:"must have required property '"+"offset"+"'"};
if(vErrors === null){
vErrors = [err377];
}
else {
vErrors.push(err377);
}
errors++;
}
if(data106.smoothingMs === undefined){
const err378 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "smoothingMs"},message:"must have required property '"+"smoothingMs"+"'"};
if(vErrors === null){
vErrors = [err378];
}
else {
vErrors.push(err378);
}
errors++;
}
if(data106.fallback === undefined){
const err379 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "fallback"},message:"must have required property '"+"fallback"+"'"};
if(vErrors === null){
vErrors = [err379];
}
else {
vErrors.push(err379);
}
errors++;
}
for(const key18 in data106){
if(!(func1.call(schema31.properties.inputBindings.items.properties, key18))){
const err380 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key18},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err380];
}
else {
vErrors.push(err380);
}
errors++;
}
}
if(data106.id !== undefined){
let data107 = data106.id;
if(typeof data107 === "string"){
if(func2(data107) > 64){
const err381 = {instancePath:instancePath+"/inputBindings/" + i15+"/id",schemaPath:"#/properties/inputBindings/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err381];
}
else {
vErrors.push(err381);
}
errors++;
}
if(func2(data107) < 1){
const err382 = {instancePath:instancePath+"/inputBindings/" + i15+"/id",schemaPath:"#/properties/inputBindings/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err382];
}
else {
vErrors.push(err382);
}
errors++;
}
if(!pattern4.test(data107)){
const err383 = {instancePath:instancePath+"/inputBindings/" + i15+"/id",schemaPath:"#/properties/inputBindings/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err383];
}
else {
vErrors.push(err383);
}
errors++;
}
}
else {
const err384 = {instancePath:instancePath+"/inputBindings/" + i15+"/id",schemaPath:"#/properties/inputBindings/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err384];
}
else {
vErrors.push(err384);
}
errors++;
}
}
if(data106.source !== undefined){
let data108 = data106.source;
if(!(((data108 === "face") || (data108 === "microphone")) || (data108 === "manual"))){
const err385 = {instancePath:instancePath+"/inputBindings/" + i15+"/source",schemaPath:"#/properties/inputBindings/items/properties/source/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputBindings.items.properties.source.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err385];
}
else {
vErrors.push(err385);
}
errors++;
}
}
if(data106.channel !== undefined){
let data109 = data106.channel;
if(typeof data109 === "string"){
if(func2(data109) > 64){
const err386 = {instancePath:instancePath+"/inputBindings/" + i15+"/channel",schemaPath:"#/properties/inputBindings/items/properties/channel/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err386];
}
else {
vErrors.push(err386);
}
errors++;
}
if(func2(data109) < 1){
const err387 = {instancePath:instancePath+"/inputBindings/" + i15+"/channel",schemaPath:"#/properties/inputBindings/items/properties/channel/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err387];
}
else {
vErrors.push(err387);
}
errors++;
}
if(!pattern16.test(data109)){
const err388 = {instancePath:instancePath+"/inputBindings/" + i15+"/channel",schemaPath:"#/properties/inputBindings/items/properties/channel/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err388];
}
else {
vErrors.push(err388);
}
errors++;
}
}
else {
const err389 = {instancePath:instancePath+"/inputBindings/" + i15+"/channel",schemaPath:"#/properties/inputBindings/items/properties/channel/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err389];
}
else {
vErrors.push(err389);
}
errors++;
}
}
if(data106.parameterId !== undefined){
let data110 = data106.parameterId;
if(typeof data110 === "string"){
if(func2(data110) > 64){
const err390 = {instancePath:instancePath+"/inputBindings/" + i15+"/parameterId",schemaPath:"#/properties/inputBindings/items/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err390];
}
else {
vErrors.push(err390);
}
errors++;
}
if(func2(data110) < 1){
const err391 = {instancePath:instancePath+"/inputBindings/" + i15+"/parameterId",schemaPath:"#/properties/inputBindings/items/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err391];
}
else {
vErrors.push(err391);
}
errors++;
}
if(!pattern4.test(data110)){
const err392 = {instancePath:instancePath+"/inputBindings/" + i15+"/parameterId",schemaPath:"#/properties/inputBindings/items/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err392];
}
else {
vErrors.push(err392);
}
errors++;
}
}
else {
const err393 = {instancePath:instancePath+"/inputBindings/" + i15+"/parameterId",schemaPath:"#/properties/inputBindings/items/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err393];
}
else {
vErrors.push(err393);
}
errors++;
}
}
if(data106.inputRange !== undefined){
let data111 = data106.inputRange;
if(Array.isArray(data111)){
if(data111.length > 2){
const err394 = {instancePath:instancePath+"/inputBindings/" + i15+"/inputRange",schemaPath:"#/properties/inputBindings/items/properties/inputRange/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err394];
}
else {
vErrors.push(err394);
}
errors++;
}
if(data111.length < 2){
const err395 = {instancePath:instancePath+"/inputBindings/" + i15+"/inputRange",schemaPath:"#/properties/inputBindings/items/properties/inputRange/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err395];
}
else {
vErrors.push(err395);
}
errors++;
}
const len14 = data111.length;
for(let i16=0; i16<len14; i16++){
let data112 = data111[i16];
if(!((typeof data112 == "number") && (isFinite(data112)))){
const err396 = {instancePath:instancePath+"/inputBindings/" + i15+"/inputRange/" + i16,schemaPath:"#/properties/inputBindings/items/properties/inputRange/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err396];
}
else {
vErrors.push(err396);
}
errors++;
}
}
}
else {
const err397 = {instancePath:instancePath+"/inputBindings/" + i15+"/inputRange",schemaPath:"#/properties/inputBindings/items/properties/inputRange/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err397];
}
else {
vErrors.push(err397);
}
errors++;
}
}
if(data106.invert !== undefined){
if(typeof data106.invert !== "boolean"){
const err398 = {instancePath:instancePath+"/inputBindings/" + i15+"/invert",schemaPath:"#/properties/inputBindings/items/properties/invert/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err398];
}
else {
vErrors.push(err398);
}
errors++;
}
}
if(data106.gain !== undefined){
let data114 = data106.gain;
if((typeof data114 == "number") && (isFinite(data114))){
if(data114 > 10 || isNaN(data114)){
const err399 = {instancePath:instancePath+"/inputBindings/" + i15+"/gain",schemaPath:"#/properties/inputBindings/items/properties/gain/maximum",keyword:"maximum",params:{comparison: "<=", limit: 10},message:"must be <= 10"};
if(vErrors === null){
vErrors = [err399];
}
else {
vErrors.push(err399);
}
errors++;
}
if(data114 < 0 || isNaN(data114)){
const err400 = {instancePath:instancePath+"/inputBindings/" + i15+"/gain",schemaPath:"#/properties/inputBindings/items/properties/gain/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err400];
}
else {
vErrors.push(err400);
}
errors++;
}
}
else {
const err401 = {instancePath:instancePath+"/inputBindings/" + i15+"/gain",schemaPath:"#/properties/inputBindings/items/properties/gain/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err401];
}
else {
vErrors.push(err401);
}
errors++;
}
}
if(data106.offset !== undefined){
let data115 = data106.offset;
if(!((typeof data115 == "number") && (isFinite(data115)))){
const err402 = {instancePath:instancePath+"/inputBindings/" + i15+"/offset",schemaPath:"#/properties/inputBindings/items/properties/offset/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err402];
}
else {
vErrors.push(err402);
}
errors++;
}
}
if(data106.smoothingMs !== undefined){
let data116 = data106.smoothingMs;
if(!(((typeof data116 == "number") && (!(data116 % 1) && !isNaN(data116))) && (isFinite(data116)))){
const err403 = {instancePath:instancePath+"/inputBindings/" + i15+"/smoothingMs",schemaPath:"#/properties/inputBindings/items/properties/smoothingMs/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err403];
}
else {
vErrors.push(err403);
}
errors++;
}
if((typeof data116 == "number") && (isFinite(data116))){
if(data116 > 10000 || isNaN(data116)){
const err404 = {instancePath:instancePath+"/inputBindings/" + i15+"/smoothingMs",schemaPath:"#/properties/inputBindings/items/properties/smoothingMs/maximum",keyword:"maximum",params:{comparison: "<=", limit: 10000},message:"must be <= 10000"};
if(vErrors === null){
vErrors = [err404];
}
else {
vErrors.push(err404);
}
errors++;
}
if(data116 < 0 || isNaN(data116)){
const err405 = {instancePath:instancePath+"/inputBindings/" + i15+"/smoothingMs",schemaPath:"#/properties/inputBindings/items/properties/smoothingMs/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err405];
}
else {
vErrors.push(err405);
}
errors++;
}
}
}
if(data106.fallback !== undefined){
let data117 = data106.fallback;
if(data117 && typeof data117 == "object" && !Array.isArray(data117)){
if(data117.mode === undefined){
const err406 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback",schemaPath:"#/properties/inputBindings/items/properties/fallback/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err406];
}
else {
vErrors.push(err406);
}
errors++;
}
if(data117.value === undefined){
const err407 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback",schemaPath:"#/properties/inputBindings/items/properties/fallback/required",keyword:"required",params:{missingProperty: "value"},message:"must have required property '"+"value"+"'"};
if(vErrors === null){
vErrors = [err407];
}
else {
vErrors.push(err407);
}
errors++;
}
if(data117.returnMs === undefined){
const err408 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback",schemaPath:"#/properties/inputBindings/items/properties/fallback/required",keyword:"required",params:{missingProperty: "returnMs"},message:"must have required property '"+"returnMs"+"'"};
if(vErrors === null){
vErrors = [err408];
}
else {
vErrors.push(err408);
}
errors++;
}
for(const key19 in data117){
if(!(((key19 === "mode") || (key19 === "value")) || (key19 === "returnMs"))){
const err409 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback",schemaPath:"#/properties/inputBindings/items/properties/fallback/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key19},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err409];
}
else {
vErrors.push(err409);
}
errors++;
}
}
if(data117.mode !== undefined){
let data118 = data117.mode;
if(!(((data118 === "neutral") || (data118 === "hold")) || (data118 === "constant"))){
const err410 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback/mode",schemaPath:"#/properties/inputBindings/items/properties/fallback/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputBindings.items.properties.fallback.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err410];
}
else {
vErrors.push(err410);
}
errors++;
}
}
if(data117.value !== undefined){
let data119 = data117.value;
if(!((typeof data119 == "number") && (isFinite(data119)))){
const err411 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback/value",schemaPath:"#/properties/inputBindings/items/properties/fallback/properties/value/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err411];
}
else {
vErrors.push(err411);
}
errors++;
}
}
if(data117.returnMs !== undefined){
let data120 = data117.returnMs;
if(!(((typeof data120 == "number") && (!(data120 % 1) && !isNaN(data120))) && (isFinite(data120)))){
const err412 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback/returnMs",schemaPath:"#/properties/inputBindings/items/properties/fallback/properties/returnMs/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err412];
}
else {
vErrors.push(err412);
}
errors++;
}
if((typeof data120 == "number") && (isFinite(data120))){
if(data120 > 10000 || isNaN(data120)){
const err413 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback/returnMs",schemaPath:"#/properties/inputBindings/items/properties/fallback/properties/returnMs/maximum",keyword:"maximum",params:{comparison: "<=", limit: 10000},message:"must be <= 10000"};
if(vErrors === null){
vErrors = [err413];
}
else {
vErrors.push(err413);
}
errors++;
}
if(data120 < 0 || isNaN(data120)){
const err414 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback/returnMs",schemaPath:"#/properties/inputBindings/items/properties/fallback/properties/returnMs/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err414];
}
else {
vErrors.push(err414);
}
errors++;
}
}
}
}
else {
const err415 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback",schemaPath:"#/properties/inputBindings/items/properties/fallback/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err415];
}
else {
vErrors.push(err415);
}
errors++;
}
}
}
else {
const err416 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err416];
}
else {
vErrors.push(err416);
}
errors++;
}
}
}
else {
const err417 = {instancePath:instancePath+"/inputBindings",schemaPath:"#/properties/inputBindings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err417];
}
else {
vErrors.push(err417);
}
errors++;
}
}
if(data.expressions !== undefined){
let data121 = data.expressions;
if(Array.isArray(data121)){
if(data121.length > 64){
const err418 = {instancePath:instancePath+"/expressions",schemaPath:"#/properties/expressions/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err418];
}
else {
vErrors.push(err418);
}
errors++;
}
const len15 = data121.length;
for(let i17=0; i17<len15; i17++){
let data122 = data121[i17];
if(data122 && typeof data122 == "object" && !Array.isArray(data122)){
if(data122.id === undefined){
const err419 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err419];
}
else {
vErrors.push(err419);
}
errors++;
}
if(data122.displayName === undefined){
const err420 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err420];
}
else {
vErrors.push(err420);
}
errors++;
}
if(data122.values === undefined){
const err421 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/required",keyword:"required",params:{missingProperty: "values"},message:"must have required property '"+"values"+"'"};
if(vErrors === null){
vErrors = [err421];
}
else {
vErrors.push(err421);
}
errors++;
}
if(data122.transitionMs === undefined){
const err422 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/required",keyword:"required",params:{missingProperty: "transitionMs"},message:"must have required property '"+"transitionMs"+"'"};
if(vErrors === null){
vErrors = [err422];
}
else {
vErrors.push(err422);
}
errors++;
}
if(data122.release === undefined){
const err423 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/required",keyword:"required",params:{missingProperty: "release"},message:"must have required property '"+"release"+"'"};
if(vErrors === null){
vErrors = [err423];
}
else {
vErrors.push(err423);
}
errors++;
}
for(const key20 in data122){
if(!(((((key20 === "id") || (key20 === "displayName")) || (key20 === "values")) || (key20 === "transitionMs")) || (key20 === "release"))){
const err424 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key20},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err424];
}
else {
vErrors.push(err424);
}
errors++;
}
}
if(data122.id !== undefined){
let data123 = data122.id;
if(typeof data123 === "string"){
if(func2(data123) > 64){
const err425 = {instancePath:instancePath+"/expressions/" + i17+"/id",schemaPath:"#/properties/expressions/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err425];
}
else {
vErrors.push(err425);
}
errors++;
}
if(func2(data123) < 1){
const err426 = {instancePath:instancePath+"/expressions/" + i17+"/id",schemaPath:"#/properties/expressions/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err426];
}
else {
vErrors.push(err426);
}
errors++;
}
if(!pattern4.test(data123)){
const err427 = {instancePath:instancePath+"/expressions/" + i17+"/id",schemaPath:"#/properties/expressions/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err427];
}
else {
vErrors.push(err427);
}
errors++;
}
}
else {
const err428 = {instancePath:instancePath+"/expressions/" + i17+"/id",schemaPath:"#/properties/expressions/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err428];
}
else {
vErrors.push(err428);
}
errors++;
}
}
if(data122.displayName !== undefined){
let data124 = data122.displayName;
if(typeof data124 === "string"){
if(func2(data124) > 120){
const err429 = {instancePath:instancePath+"/expressions/" + i17+"/displayName",schemaPath:"#/properties/expressions/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err429];
}
else {
vErrors.push(err429);
}
errors++;
}
if(func2(data124) < 1){
const err430 = {instancePath:instancePath+"/expressions/" + i17+"/displayName",schemaPath:"#/properties/expressions/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err430];
}
else {
vErrors.push(err430);
}
errors++;
}
}
else {
const err431 = {instancePath:instancePath+"/expressions/" + i17+"/displayName",schemaPath:"#/properties/expressions/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err431];
}
else {
vErrors.push(err431);
}
errors++;
}
}
if(data122.values !== undefined){
let data125 = data122.values;
if(Array.isArray(data125)){
if(data125.length > 128){
const err432 = {instancePath:instancePath+"/expressions/" + i17+"/values",schemaPath:"#/properties/expressions/items/properties/values/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err432];
}
else {
vErrors.push(err432);
}
errors++;
}
const len16 = data125.length;
for(let i18=0; i18<len16; i18++){
let data126 = data125[i18];
if(data126 && typeof data126 == "object" && !Array.isArray(data126)){
if(data126.parameterId === undefined){
const err433 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18,schemaPath:"#/properties/expressions/items/properties/values/items/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err433];
}
else {
vErrors.push(err433);
}
errors++;
}
if(data126.value === undefined){
const err434 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18,schemaPath:"#/properties/expressions/items/properties/values/items/required",keyword:"required",params:{missingProperty: "value"},message:"must have required property '"+"value"+"'"};
if(vErrors === null){
vErrors = [err434];
}
else {
vErrors.push(err434);
}
errors++;
}
if(data126.locked === undefined){
const err435 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18,schemaPath:"#/properties/expressions/items/properties/values/items/required",keyword:"required",params:{missingProperty: "locked"},message:"must have required property '"+"locked"+"'"};
if(vErrors === null){
vErrors = [err435];
}
else {
vErrors.push(err435);
}
errors++;
}
for(const key21 in data126){
if(!(((key21 === "parameterId") || (key21 === "value")) || (key21 === "locked"))){
const err436 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18,schemaPath:"#/properties/expressions/items/properties/values/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key21},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err436];
}
else {
vErrors.push(err436);
}
errors++;
}
}
if(data126.parameterId !== undefined){
let data127 = data126.parameterId;
if(typeof data127 === "string"){
if(func2(data127) > 64){
const err437 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/parameterId",schemaPath:"#/properties/expressions/items/properties/values/items/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err437];
}
else {
vErrors.push(err437);
}
errors++;
}
if(func2(data127) < 1){
const err438 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/parameterId",schemaPath:"#/properties/expressions/items/properties/values/items/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err438];
}
else {
vErrors.push(err438);
}
errors++;
}
if(!pattern4.test(data127)){
const err439 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/parameterId",schemaPath:"#/properties/expressions/items/properties/values/items/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err439];
}
else {
vErrors.push(err439);
}
errors++;
}
}
else {
const err440 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/parameterId",schemaPath:"#/properties/expressions/items/properties/values/items/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err440];
}
else {
vErrors.push(err440);
}
errors++;
}
}
if(data126.value !== undefined){
let data128 = data126.value;
if(!((typeof data128 == "number") && (isFinite(data128)))){
const err441 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/value",schemaPath:"#/properties/expressions/items/properties/values/items/properties/value/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err441];
}
else {
vErrors.push(err441);
}
errors++;
}
}
if(data126.locked !== undefined){
if(typeof data126.locked !== "boolean"){
const err442 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/locked",schemaPath:"#/properties/expressions/items/properties/values/items/properties/locked/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err442];
}
else {
vErrors.push(err442);
}
errors++;
}
}
}
else {
const err443 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18,schemaPath:"#/properties/expressions/items/properties/values/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err443];
}
else {
vErrors.push(err443);
}
errors++;
}
}
}
else {
const err444 = {instancePath:instancePath+"/expressions/" + i17+"/values",schemaPath:"#/properties/expressions/items/properties/values/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err444];
}
else {
vErrors.push(err444);
}
errors++;
}
}
if(data122.transitionMs !== undefined){
let data130 = data122.transitionMs;
if(!(((typeof data130 == "number") && (!(data130 % 1) && !isNaN(data130))) && (isFinite(data130)))){
const err445 = {instancePath:instancePath+"/expressions/" + i17+"/transitionMs",schemaPath:"#/properties/expressions/items/properties/transitionMs/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err445];
}
else {
vErrors.push(err445);
}
errors++;
}
if((typeof data130 == "number") && (isFinite(data130))){
if(data130 > 10000 || isNaN(data130)){
const err446 = {instancePath:instancePath+"/expressions/" + i17+"/transitionMs",schemaPath:"#/properties/expressions/items/properties/transitionMs/maximum",keyword:"maximum",params:{comparison: "<=", limit: 10000},message:"must be <= 10000"};
if(vErrors === null){
vErrors = [err446];
}
else {
vErrors.push(err446);
}
errors++;
}
if(data130 < 0 || isNaN(data130)){
const err447 = {instancePath:instancePath+"/expressions/" + i17+"/transitionMs",schemaPath:"#/properties/expressions/items/properties/transitionMs/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err447];
}
else {
vErrors.push(err447);
}
errors++;
}
}
}
if(data122.release !== undefined){
let data131 = data122.release;
if(!((data131 === "live-input") || (data131 === "neutral"))){
const err448 = {instancePath:instancePath+"/expressions/" + i17+"/release",schemaPath:"#/properties/expressions/items/properties/release/enum",keyword:"enum",params:{allowedValues: schema31.properties.expressions.items.properties.release.enum},message:"must be equal to one of the allowed values"};
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
else {
const err449 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err449];
}
else {
vErrors.push(err449);
}
errors++;
}
}
}
else {
const err450 = {instancePath:instancePath+"/expressions",schemaPath:"#/properties/expressions/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err450];
}
else {
vErrors.push(err450);
}
errors++;
}
}
if(data.runtimeProfile !== undefined){
let data132 = data.runtimeProfile;
if(data132 && typeof data132 == "object" && !Array.isArray(data132)){
if(data132.id === undefined){
const err451 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err451];
}
else {
vErrors.push(err451);
}
errors++;
}
if(data132.revision === undefined){
const err452 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err452];
}
else {
vErrors.push(err452);
}
errors++;
}
if(data132.mode === undefined){
const err453 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err453];
}
else {
vErrors.push(err453);
}
errors++;
}
if(data132.mirror === undefined){
const err454 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/required",keyword:"required",params:{missingProperty: "mirror"},message:"must have required property '"+"mirror"+"'"};
if(vErrors === null){
vErrors = [err454];
}
else {
vErrors.push(err454);
}
errors++;
}
if(data132.fallbackExpressionId === undefined){
const err455 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/required",keyword:"required",params:{missingProperty: "fallbackExpressionId"},message:"must have required property '"+"fallbackExpressionId"+"'"};
if(vErrors === null){
vErrors = [err455];
}
else {
vErrors.push(err455);
}
errors++;
}
for(const key22 in data132){
if(!(((((key22 === "id") || (key22 === "revision")) || (key22 === "mode")) || (key22 === "mirror")) || (key22 === "fallbackExpressionId"))){
const err456 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key22},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err456];
}
else {
vErrors.push(err456);
}
errors++;
}
}
if(data132.id !== undefined){
let data133 = data132.id;
if(typeof data133 === "string"){
if(func2(data133) > 64){
const err457 = {instancePath:instancePath+"/runtimeProfile/id",schemaPath:"#/properties/runtimeProfile/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err457];
}
else {
vErrors.push(err457);
}
errors++;
}
if(func2(data133) < 1){
const err458 = {instancePath:instancePath+"/runtimeProfile/id",schemaPath:"#/properties/runtimeProfile/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err458];
}
else {
vErrors.push(err458);
}
errors++;
}
if(!pattern4.test(data133)){
const err459 = {instancePath:instancePath+"/runtimeProfile/id",schemaPath:"#/properties/runtimeProfile/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err459];
}
else {
vErrors.push(err459);
}
errors++;
}
}
else {
const err460 = {instancePath:instancePath+"/runtimeProfile/id",schemaPath:"#/properties/runtimeProfile/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err460];
}
else {
vErrors.push(err460);
}
errors++;
}
}
if(data132.revision !== undefined){
let data134 = data132.revision;
if(!(((typeof data134 == "number") && (!(data134 % 1) && !isNaN(data134))) && (isFinite(data134)))){
const err461 = {instancePath:instancePath+"/runtimeProfile/revision",schemaPath:"#/properties/runtimeProfile/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err461];
}
else {
vErrors.push(err461);
}
errors++;
}
if((typeof data134 == "number") && (isFinite(data134))){
if(data134 > 9007199254740991 || isNaN(data134)){
const err462 = {instancePath:instancePath+"/runtimeProfile/revision",schemaPath:"#/properties/runtimeProfile/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err462];
}
else {
vErrors.push(err462);
}
errors++;
}
if(data134 < 0 || isNaN(data134)){
const err463 = {instancePath:instancePath+"/runtimeProfile/revision",schemaPath:"#/properties/runtimeProfile/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err463];
}
else {
vErrors.push(err463);
}
errors++;
}
}
}
if(data132.mode !== undefined){
let data135 = data132.mode;
if(!((((data135 === "idle") || (data135 === "camera")) || (data135 === "microphone")) || (data135 === "camera-microphone"))){
const err464 = {instancePath:instancePath+"/runtimeProfile/mode",schemaPath:"#/properties/runtimeProfile/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.runtimeProfile.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err464];
}
else {
vErrors.push(err464);
}
errors++;
}
}
if(data132.mirror !== undefined){
if(typeof data132.mirror !== "boolean"){
const err465 = {instancePath:instancePath+"/runtimeProfile/mirror",schemaPath:"#/properties/runtimeProfile/properties/mirror/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err465];
}
else {
vErrors.push(err465);
}
errors++;
}
}
if(data132.fallbackExpressionId !== undefined){
let data137 = data132.fallbackExpressionId;
const _errs302 = errors;
let valid65 = false;
const _errs303 = errors;
if(typeof data137 === "string"){
if(func2(data137) > 64){
const err466 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err466];
}
else {
vErrors.push(err466);
}
errors++;
}
if(func2(data137) < 1){
const err467 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err467];
}
else {
vErrors.push(err467);
}
errors++;
}
if(!pattern4.test(data137)){
const err468 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err468];
}
else {
vErrors.push(err468);
}
errors++;
}
}
else {
const err469 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err469];
}
else {
vErrors.push(err469);
}
errors++;
}
var _valid6 = _errs303 === errors;
valid65 = valid65 || _valid6;
const _errs305 = errors;
if(data137 !== null){
const err470 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err470];
}
else {
vErrors.push(err470);
}
errors++;
}
var _valid6 = _errs305 === errors;
valid65 = valid65 || _valid6;
if(!valid65){
const err471 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err471];
}
else {
vErrors.push(err471);
}
errors++;
}
else {
errors = _errs302;
if(vErrors !== null){
if(_errs302){
vErrors.length = _errs302;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err472 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err472];
}
else {
vErrors.push(err472);
}
errors++;
}
}
if(data.broadcastProfiles !== undefined){
let data138 = data.broadcastProfiles;
if(Array.isArray(data138)){
if(data138.length > 16){
const err473 = {instancePath:instancePath+"/broadcastProfiles",schemaPath:"#/properties/broadcastProfiles/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err473];
}
else {
vErrors.push(err473);
}
errors++;
}
const len17 = data138.length;
for(let i19=0; i19<len17; i19++){
let data139 = data138[i19];
if(data139 && typeof data139 == "object" && !Array.isArray(data139)){
if(data139.id === undefined){
const err474 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err474];
}
else {
vErrors.push(err474);
}
errors++;
}
if(data139.revision === undefined){
const err475 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err475];
}
else {
vErrors.push(err475);
}
errors++;
}
if(data139.displayName === undefined){
const err476 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err476];
}
else {
vErrors.push(err476);
}
errors++;
}
if(data139.width === undefined){
const err477 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err477];
}
else {
vErrors.push(err477);
}
errors++;
}
if(data139.height === undefined){
const err478 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err478];
}
else {
vErrors.push(err478);
}
errors++;
}
if(data139.fps === undefined){
const err479 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "fps"},message:"must have required property '"+"fps"+"'"};
if(vErrors === null){
vErrors = [err479];
}
else {
vErrors.push(err479);
}
errors++;
}
if(data139.transparent === undefined){
const err480 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "transparent"},message:"must have required property '"+"transparent"+"'"};
if(vErrors === null){
vErrors = [err480];
}
else {
vErrors.push(err480);
}
errors++;
}
if(data139.region === undefined){
const err481 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "region"},message:"must have required property '"+"region"+"'"};
if(vErrors === null){
vErrors = [err481];
}
else {
vErrors.push(err481);
}
errors++;
}
if(data139.fit === undefined){
const err482 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "fit"},message:"must have required property '"+"fit"+"'"};
if(vErrors === null){
vErrors = [err482];
}
else {
vErrors.push(err482);
}
errors++;
}
for(const key23 in data139){
if(!(func1.call(schema31.properties.broadcastProfiles.items.properties, key23))){
const err483 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key23},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err483];
}
else {
vErrors.push(err483);
}
errors++;
}
}
if(data139.id !== undefined){
let data140 = data139.id;
if(typeof data140 === "string"){
if(func2(data140) > 64){
const err484 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/id",schemaPath:"#/properties/broadcastProfiles/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err484];
}
else {
vErrors.push(err484);
}
errors++;
}
if(func2(data140) < 1){
const err485 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/id",schemaPath:"#/properties/broadcastProfiles/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err485];
}
else {
vErrors.push(err485);
}
errors++;
}
if(!pattern4.test(data140)){
const err486 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/id",schemaPath:"#/properties/broadcastProfiles/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err486];
}
else {
vErrors.push(err486);
}
errors++;
}
}
else {
const err487 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/id",schemaPath:"#/properties/broadcastProfiles/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err487];
}
else {
vErrors.push(err487);
}
errors++;
}
}
if(data139.revision !== undefined){
let data141 = data139.revision;
if(!(((typeof data141 == "number") && (!(data141 % 1) && !isNaN(data141))) && (isFinite(data141)))){
const err488 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/revision",schemaPath:"#/properties/broadcastProfiles/items/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err488];
}
else {
vErrors.push(err488);
}
errors++;
}
if((typeof data141 == "number") && (isFinite(data141))){
if(data141 > 9007199254740991 || isNaN(data141)){
const err489 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/revision",schemaPath:"#/properties/broadcastProfiles/items/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err489];
}
else {
vErrors.push(err489);
}
errors++;
}
if(data141 < 0 || isNaN(data141)){
const err490 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/revision",schemaPath:"#/properties/broadcastProfiles/items/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(data139.displayName !== undefined){
let data142 = data139.displayName;
if(typeof data142 === "string"){
if(func2(data142) > 120){
const err491 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/displayName",schemaPath:"#/properties/broadcastProfiles/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err491];
}
else {
vErrors.push(err491);
}
errors++;
}
if(func2(data142) < 1){
const err492 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/displayName",schemaPath:"#/properties/broadcastProfiles/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err492];
}
else {
vErrors.push(err492);
}
errors++;
}
}
else {
const err493 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/displayName",schemaPath:"#/properties/broadcastProfiles/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err493];
}
else {
vErrors.push(err493);
}
errors++;
}
}
if(data139.width !== undefined){
let data143 = data139.width;
if(!(((typeof data143 == "number") && (!(data143 % 1) && !isNaN(data143))) && (isFinite(data143)))){
const err494 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/width",schemaPath:"#/properties/broadcastProfiles/items/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err494];
}
else {
vErrors.push(err494);
}
errors++;
}
if((typeof data143 == "number") && (isFinite(data143))){
if(data143 > 8192 || isNaN(data143)){
const err495 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/width",schemaPath:"#/properties/broadcastProfiles/items/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 8192},message:"must be <= 8192"};
if(vErrors === null){
vErrors = [err495];
}
else {
vErrors.push(err495);
}
errors++;
}
if(data143 < 1 || isNaN(data143)){
const err496 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/width",schemaPath:"#/properties/broadcastProfiles/items/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err496];
}
else {
vErrors.push(err496);
}
errors++;
}
}
}
if(data139.height !== undefined){
let data144 = data139.height;
if(!(((typeof data144 == "number") && (!(data144 % 1) && !isNaN(data144))) && (isFinite(data144)))){
const err497 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/height",schemaPath:"#/properties/broadcastProfiles/items/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err497];
}
else {
vErrors.push(err497);
}
errors++;
}
if((typeof data144 == "number") && (isFinite(data144))){
if(data144 > 8192 || isNaN(data144)){
const err498 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/height",schemaPath:"#/properties/broadcastProfiles/items/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 8192},message:"must be <= 8192"};
if(vErrors === null){
vErrors = [err498];
}
else {
vErrors.push(err498);
}
errors++;
}
if(data144 < 1 || isNaN(data144)){
const err499 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/height",schemaPath:"#/properties/broadcastProfiles/items/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err499];
}
else {
vErrors.push(err499);
}
errors++;
}
}
}
if(data139.fps !== undefined){
let data145 = data139.fps;
if(!(((typeof data145 == "number") && (!(data145 % 1) && !isNaN(data145))) && (isFinite(data145)))){
const err500 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/fps",schemaPath:"#/properties/broadcastProfiles/items/properties/fps/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err500];
}
else {
vErrors.push(err500);
}
errors++;
}
if((typeof data145 == "number") && (isFinite(data145))){
if(data145 > 120 || isNaN(data145)){
const err501 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/fps",schemaPath:"#/properties/broadcastProfiles/items/properties/fps/maximum",keyword:"maximum",params:{comparison: "<=", limit: 120},message:"must be <= 120"};
if(vErrors === null){
vErrors = [err501];
}
else {
vErrors.push(err501);
}
errors++;
}
if(data145 < 1 || isNaN(data145)){
const err502 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/fps",schemaPath:"#/properties/broadcastProfiles/items/properties/fps/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err502];
}
else {
vErrors.push(err502);
}
errors++;
}
}
}
if(data139.transparent !== undefined){
if(typeof data139.transparent !== "boolean"){
const err503 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/transparent",schemaPath:"#/properties/broadcastProfiles/items/properties/transparent/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err503];
}
else {
vErrors.push(err503);
}
errors++;
}
}
if(data139.region !== undefined){
let data147 = data139.region;
if(data147 && typeof data147 == "object" && !Array.isArray(data147)){
if(data147.x === undefined){
const err504 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err504];
}
else {
vErrors.push(err504);
}
errors++;
}
if(data147.y === undefined){
const err505 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err505];
}
else {
vErrors.push(err505);
}
errors++;
}
if(data147.width === undefined){
const err506 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err506];
}
else {
vErrors.push(err506);
}
errors++;
}
if(data147.height === undefined){
const err507 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err507];
}
else {
vErrors.push(err507);
}
errors++;
}
for(const key24 in data147){
if(!((((key24 === "x") || (key24 === "y")) || (key24 === "width")) || (key24 === "height"))){
const err508 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key24},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err508];
}
else {
vErrors.push(err508);
}
errors++;
}
}
if(data147.x !== undefined){
let data148 = data147.x;
if(!((typeof data148 == "number") && (isFinite(data148)))){
const err509 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/x",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err509];
}
else {
vErrors.push(err509);
}
errors++;
}
}
if(data147.y !== undefined){
let data149 = data147.y;
if(!((typeof data149 == "number") && (isFinite(data149)))){
const err510 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/y",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err510];
}
else {
vErrors.push(err510);
}
errors++;
}
}
if(data147.width !== undefined){
let data150 = data147.width;
if((typeof data150 == "number") && (isFinite(data150))){
if(data150 <= 0 || isNaN(data150)){
const err511 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/width",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
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
const err512 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/width",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err512];
}
else {
vErrors.push(err512);
}
errors++;
}
}
if(data147.height !== undefined){
let data151 = data147.height;
if((typeof data151 == "number") && (isFinite(data151))){
if(data151 <= 0 || isNaN(data151)){
const err513 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/height",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err513];
}
else {
vErrors.push(err513);
}
errors++;
}
}
else {
const err514 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/height",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err514];
}
else {
vErrors.push(err514);
}
errors++;
}
}
}
else {
const err515 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err515];
}
else {
vErrors.push(err515);
}
errors++;
}
}
if(data139.fit !== undefined){
let data152 = data139.fit;
if(!((data152 === "contain") || (data152 === "cover"))){
const err516 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/fit",schemaPath:"#/properties/broadcastProfiles/items/properties/fit/enum",keyword:"enum",params:{allowedValues: schema31.properties.broadcastProfiles.items.properties.fit.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err516];
}
else {
vErrors.push(err516);
}
errors++;
}
}
}
else {
const err517 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err517];
}
else {
vErrors.push(err517);
}
errors++;
}
}
}
else {
const err518 = {instancePath:instancePath+"/broadcastProfiles",schemaPath:"#/properties/broadcastProfiles/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err518];
}
else {
vErrors.push(err518);
}
errors++;
}
}
if(data.exportProfiles !== undefined){
let data153 = data.exportProfiles;
if(Array.isArray(data153)){
if(data153.length > 16){
const err519 = {instancePath:instancePath+"/exportProfiles",schemaPath:"#/properties/exportProfiles/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err519];
}
else {
vErrors.push(err519);
}
errors++;
}
const len18 = data153.length;
for(let i20=0; i20<len18; i20++){
let data154 = data153[i20];
if(data154 && typeof data154 == "object" && !Array.isArray(data154)){
if(data154.id === undefined){
const err520 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err520];
}
else {
vErrors.push(err520);
}
errors++;
}
if(data154.revision === undefined){
const err521 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err521];
}
else {
vErrors.push(err521);
}
errors++;
}
if(data154.displayName === undefined){
const err522 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err522];
}
else {
vErrors.push(err522);
}
errors++;
}
if(data154.target === undefined){
const err523 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "target"},message:"must have required property '"+"target"+"'"};
if(vErrors === null){
vErrors = [err523];
}
else {
vErrors.push(err523);
}
errors++;
}
if(data154.targetVersion === undefined){
const err524 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "targetVersion"},message:"must have required property '"+"targetVersion"+"'"};
if(vErrors === null){
vErrors = [err524];
}
else {
vErrors.push(err524);
}
errors++;
}
if(data154.format === undefined){
const err525 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "format"},message:"must have required property '"+"format"+"'"};
if(vErrors === null){
vErrors = [err525];
}
else {
vErrors.push(err525);
}
errors++;
}
if(data154.converterVersion === undefined){
const err526 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "converterVersion"},message:"must have required property '"+"converterVersion"+"'"};
if(vErrors === null){
vErrors = [err526];
}
else {
vErrors.push(err526);
}
errors++;
}
if(data154.parameterMap === undefined){
const err527 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "parameterMap"},message:"must have required property '"+"parameterMap"+"'"};
if(vErrors === null){
vErrors = [err527];
}
else {
vErrors.push(err527);
}
errors++;
}
for(const key25 in data154){
if(!((((((((key25 === "id") || (key25 === "revision")) || (key25 === "displayName")) || (key25 === "target")) || (key25 === "targetVersion")) || (key25 === "format")) || (key25 === "converterVersion")) || (key25 === "parameterMap"))){
const err528 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key25},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err528];
}
else {
vErrors.push(err528);
}
errors++;
}
}
if(data154.id !== undefined){
let data155 = data154.id;
if(typeof data155 === "string"){
if(func2(data155) > 64){
const err529 = {instancePath:instancePath+"/exportProfiles/" + i20+"/id",schemaPath:"#/properties/exportProfiles/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err529];
}
else {
vErrors.push(err529);
}
errors++;
}
if(func2(data155) < 1){
const err530 = {instancePath:instancePath+"/exportProfiles/" + i20+"/id",schemaPath:"#/properties/exportProfiles/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err530];
}
else {
vErrors.push(err530);
}
errors++;
}
if(!pattern4.test(data155)){
const err531 = {instancePath:instancePath+"/exportProfiles/" + i20+"/id",schemaPath:"#/properties/exportProfiles/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err531];
}
else {
vErrors.push(err531);
}
errors++;
}
}
else {
const err532 = {instancePath:instancePath+"/exportProfiles/" + i20+"/id",schemaPath:"#/properties/exportProfiles/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err532];
}
else {
vErrors.push(err532);
}
errors++;
}
}
if(data154.revision !== undefined){
let data156 = data154.revision;
if(!(((typeof data156 == "number") && (!(data156 % 1) && !isNaN(data156))) && (isFinite(data156)))){
const err533 = {instancePath:instancePath+"/exportProfiles/" + i20+"/revision",schemaPath:"#/properties/exportProfiles/items/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err533];
}
else {
vErrors.push(err533);
}
errors++;
}
if((typeof data156 == "number") && (isFinite(data156))){
if(data156 > 9007199254740991 || isNaN(data156)){
const err534 = {instancePath:instancePath+"/exportProfiles/" + i20+"/revision",schemaPath:"#/properties/exportProfiles/items/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err534];
}
else {
vErrors.push(err534);
}
errors++;
}
if(data156 < 0 || isNaN(data156)){
const err535 = {instancePath:instancePath+"/exportProfiles/" + i20+"/revision",schemaPath:"#/properties/exportProfiles/items/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err535];
}
else {
vErrors.push(err535);
}
errors++;
}
}
}
if(data154.displayName !== undefined){
let data157 = data154.displayName;
if(typeof data157 === "string"){
if(func2(data157) > 120){
const err536 = {instancePath:instancePath+"/exportProfiles/" + i20+"/displayName",schemaPath:"#/properties/exportProfiles/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err536];
}
else {
vErrors.push(err536);
}
errors++;
}
if(func2(data157) < 1){
const err537 = {instancePath:instancePath+"/exportProfiles/" + i20+"/displayName",schemaPath:"#/properties/exportProfiles/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err537];
}
else {
vErrors.push(err537);
}
errors++;
}
}
else {
const err538 = {instancePath:instancePath+"/exportProfiles/" + i20+"/displayName",schemaPath:"#/properties/exportProfiles/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err538];
}
else {
vErrors.push(err538);
}
errors++;
}
}
if(data154.target !== undefined){
if(!(data154.target === "inochi2d")){
const err539 = {instancePath:instancePath+"/exportProfiles/" + i20+"/target",schemaPath:"#/properties/exportProfiles/items/properties/target/enum",keyword:"enum",params:{allowedValues: schema31.properties.exportProfiles.items.properties.target.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err539];
}
else {
vErrors.push(err539);
}
errors++;
}
}
if(data154.targetVersion !== undefined){
let data159 = data154.targetVersion;
if(typeof data159 === "string"){
if(func2(data159) > 32){
const err540 = {instancePath:instancePath+"/exportProfiles/" + i20+"/targetVersion",schemaPath:"#/properties/exportProfiles/items/properties/targetVersion/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err540];
}
else {
vErrors.push(err540);
}
errors++;
}
if(func2(data159) < 1){
const err541 = {instancePath:instancePath+"/exportProfiles/" + i20+"/targetVersion",schemaPath:"#/properties/exportProfiles/items/properties/targetVersion/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err541];
}
else {
vErrors.push(err541);
}
errors++;
}
if(!pattern12.test(data159)){
const err542 = {instancePath:instancePath+"/exportProfiles/" + i20+"/targetVersion",schemaPath:"#/properties/exportProfiles/items/properties/targetVersion/pattern",keyword:"pattern",params:{pattern: "^\\d+\\.\\d+\\.\\d+$"},message:"must match pattern \""+"^\\d+\\.\\d+\\.\\d+$"+"\""};
if(vErrors === null){
vErrors = [err542];
}
else {
vErrors.push(err542);
}
errors++;
}
}
else {
const err543 = {instancePath:instancePath+"/exportProfiles/" + i20+"/targetVersion",schemaPath:"#/properties/exportProfiles/items/properties/targetVersion/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err543];
}
else {
vErrors.push(err543);
}
errors++;
}
}
if(data154.format !== undefined){
if(!(data154.format === "inp")){
const err544 = {instancePath:instancePath+"/exportProfiles/" + i20+"/format",schemaPath:"#/properties/exportProfiles/items/properties/format/enum",keyword:"enum",params:{allowedValues: schema31.properties.exportProfiles.items.properties.format.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err544];
}
else {
vErrors.push(err544);
}
errors++;
}
}
if(data154.converterVersion !== undefined){
let data161 = data154.converterVersion;
if(typeof data161 === "string"){
if(func2(data161) > 32){
const err545 = {instancePath:instancePath+"/exportProfiles/" + i20+"/converterVersion",schemaPath:"#/properties/exportProfiles/items/properties/converterVersion/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err545];
}
else {
vErrors.push(err545);
}
errors++;
}
if(func2(data161) < 1){
const err546 = {instancePath:instancePath+"/exportProfiles/" + i20+"/converterVersion",schemaPath:"#/properties/exportProfiles/items/properties/converterVersion/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err546];
}
else {
vErrors.push(err546);
}
errors++;
}
if(!pattern12.test(data161)){
const err547 = {instancePath:instancePath+"/exportProfiles/" + i20+"/converterVersion",schemaPath:"#/properties/exportProfiles/items/properties/converterVersion/pattern",keyword:"pattern",params:{pattern: "^\\d+\\.\\d+\\.\\d+$"},message:"must match pattern \""+"^\\d+\\.\\d+\\.\\d+$"+"\""};
if(vErrors === null){
vErrors = [err547];
}
else {
vErrors.push(err547);
}
errors++;
}
}
else {
const err548 = {instancePath:instancePath+"/exportProfiles/" + i20+"/converterVersion",schemaPath:"#/properties/exportProfiles/items/properties/converterVersion/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err548];
}
else {
vErrors.push(err548);
}
errors++;
}
}
if(data154.parameterMap !== undefined){
let data162 = data154.parameterMap;
if(Array.isArray(data162)){
if(data162.length > 128){
const err549 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err549];
}
else {
vErrors.push(err549);
}
errors++;
}
const len19 = data162.length;
for(let i21=0; i21<len19; i21++){
let data163 = data162[i21];
if(data163 && typeof data163 == "object" && !Array.isArray(data163)){
if(data163.parameterId === undefined){
const err550 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21,schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err550];
}
else {
vErrors.push(err550);
}
errors++;
}
if(data163.targetName === undefined){
const err551 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21,schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/required",keyword:"required",params:{missingProperty: "targetName"},message:"must have required property '"+"targetName"+"'"};
if(vErrors === null){
vErrors = [err551];
}
else {
vErrors.push(err551);
}
errors++;
}
for(const key26 in data163){
if(!((key26 === "parameterId") || (key26 === "targetName"))){
const err552 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21,schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key26},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err552];
}
else {
vErrors.push(err552);
}
errors++;
}
}
if(data163.parameterId !== undefined){
let data164 = data163.parameterId;
if(typeof data164 === "string"){
if(func2(data164) > 64){
const err553 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/parameterId",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err553];
}
else {
vErrors.push(err553);
}
errors++;
}
if(func2(data164) < 1){
const err554 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/parameterId",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err554];
}
else {
vErrors.push(err554);
}
errors++;
}
if(!pattern4.test(data164)){
const err555 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/parameterId",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err555];
}
else {
vErrors.push(err555);
}
errors++;
}
}
else {
const err556 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/parameterId",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err556];
}
else {
vErrors.push(err556);
}
errors++;
}
}
if(data163.targetName !== undefined){
let data165 = data163.targetName;
if(typeof data165 === "string"){
if(func2(data165) > 64){
const err557 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/targetName",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/targetName/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err557];
}
else {
vErrors.push(err557);
}
errors++;
}
if(func2(data165) < 1){
const err558 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/targetName",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/targetName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err558];
}
else {
vErrors.push(err558);
}
errors++;
}
if(!pattern40.test(data165)){
const err559 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/targetName",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/targetName/pattern",keyword:"pattern",params:{pattern: "^[a-zA-Z][a-zA-Z0-9_]*$"},message:"must match pattern \""+"^[a-zA-Z][a-zA-Z0-9_]*$"+"\""};
if(vErrors === null){
vErrors = [err559];
}
else {
vErrors.push(err559);
}
errors++;
}
}
else {
const err560 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/targetName",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/targetName/type",keyword:"type",params:{type: "string"},message:"must be string"};
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
const err561 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21,schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err561];
}
else {
vErrors.push(err561);
}
errors++;
}
}
}
else {
const err562 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err562];
}
else {
vErrors.push(err562);
}
errors++;
}
}
}
else {
const err563 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err563];
}
else {
vErrors.push(err563);
}
errors++;
}
}
}
else {
const err564 = {instancePath:instancePath+"/exportProfiles",schemaPath:"#/properties/exportProfiles/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err564];
}
else {
vErrors.push(err564);
}
errors++;
}
}
if(data.provenance !== undefined){
let data166 = data.provenance;
if(data166 && typeof data166 == "object" && !Array.isArray(data166)){
if(data166.preparation === undefined){
const err565 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/required",keyword:"required",params:{missingProperty: "preparation"},message:"must have required property '"+"preparation"+"'"};
if(vErrors === null){
vErrors = [err565];
}
else {
vErrors.push(err565);
}
errors++;
}
if(data166.limitations === undefined){
const err566 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/required",keyword:"required",params:{missingProperty: "limitations"},message:"must have required property '"+"limitations"+"'"};
if(vErrors === null){
vErrors = [err566];
}
else {
vErrors.push(err566);
}
errors++;
}
for(const key27 in data166){
if(!((key27 === "preparation") || (key27 === "limitations"))){
const err567 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key27},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err567];
}
else {
vErrors.push(err567);
}
errors++;
}
}
if(data166.preparation !== undefined){
let data167 = data166.preparation;
if(typeof data167 === "string"){
if(func2(data167) > 512){
const err568 = {instancePath:instancePath+"/provenance/preparation",schemaPath:"#/properties/provenance/properties/preparation/maxLength",keyword:"maxLength",params:{limit: 512},message:"must NOT have more than 512 characters"};
if(vErrors === null){
vErrors = [err568];
}
else {
vErrors.push(err568);
}
errors++;
}
if(func2(data167) < 1){
const err569 = {instancePath:instancePath+"/provenance/preparation",schemaPath:"#/properties/provenance/properties/preparation/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err569];
}
else {
vErrors.push(err569);
}
errors++;
}
}
else {
const err570 = {instancePath:instancePath+"/provenance/preparation",schemaPath:"#/properties/provenance/properties/preparation/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err570];
}
else {
vErrors.push(err570);
}
errors++;
}
}
if(data166.limitations !== undefined){
let data168 = data166.limitations;
if(Array.isArray(data168)){
if(data168.length > 128){
const err571 = {instancePath:instancePath+"/provenance/limitations",schemaPath:"#/properties/provenance/properties/limitations/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err571];
}
else {
vErrors.push(err571);
}
errors++;
}
const len20 = data168.length;
for(let i22=0; i22<len20; i22++){
let data169 = data168[i22];
if(typeof data169 === "string"){
if(func2(data169) > 512){
const err572 = {instancePath:instancePath+"/provenance/limitations/" + i22,schemaPath:"#/properties/provenance/properties/limitations/items/maxLength",keyword:"maxLength",params:{limit: 512},message:"must NOT have more than 512 characters"};
if(vErrors === null){
vErrors = [err572];
}
else {
vErrors.push(err572);
}
errors++;
}
if(func2(data169) < 1){
const err573 = {instancePath:instancePath+"/provenance/limitations/" + i22,schemaPath:"#/properties/provenance/properties/limitations/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err573];
}
else {
vErrors.push(err573);
}
errors++;
}
}
else {
const err574 = {instancePath:instancePath+"/provenance/limitations/" + i22,schemaPath:"#/properties/provenance/properties/limitations/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err574];
}
else {
vErrors.push(err574);
}
errors++;
}
}
}
else {
const err575 = {instancePath:instancePath+"/provenance/limitations",schemaPath:"#/properties/provenance/properties/limitations/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err575];
}
else {
vErrors.push(err575);
}
errors++;
}
}
}
else {
const err576 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err576];
}
else {
vErrors.push(err576);
}
errors++;
}
}
if(data.derivedProjects !== undefined){
let data170 = data.derivedProjects;
if(Array.isArray(data170)){
if(data170.length > 32){
const err577 = {instancePath:instancePath+"/derivedProjects",schemaPath:"#/properties/derivedProjects/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err577];
}
else {
vErrors.push(err577);
}
errors++;
}
const len21 = data170.length;
for(let i23=0; i23<len21; i23++){
let data171 = data170[i23];
if(data171 && typeof data171 == "object" && !Array.isArray(data171)){
if(data171.projectId === undefined){
const err578 = {instancePath:instancePath+"/derivedProjects/" + i23,schemaPath:"#/properties/derivedProjects/items/required",keyword:"required",params:{missingProperty: "projectId"},message:"must have required property '"+"projectId"+"'"};
if(vErrors === null){
vErrors = [err578];
}
else {
vErrors.push(err578);
}
errors++;
}
if(data171.relation === undefined){
const err579 = {instancePath:instancePath+"/derivedProjects/" + i23,schemaPath:"#/properties/derivedProjects/items/required",keyword:"required",params:{missingProperty: "relation"},message:"must have required property '"+"relation"+"'"};
if(vErrors === null){
vErrors = [err579];
}
else {
vErrors.push(err579);
}
errors++;
}
for(const key28 in data171){
if(!((key28 === "projectId") || (key28 === "relation"))){
const err580 = {instancePath:instancePath+"/derivedProjects/" + i23,schemaPath:"#/properties/derivedProjects/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key28},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err580];
}
else {
vErrors.push(err580);
}
errors++;
}
}
if(data171.projectId !== undefined){
let data172 = data171.projectId;
if(typeof data172 === "string"){
if(func2(data172) > 64){
const err581 = {instancePath:instancePath+"/derivedProjects/" + i23+"/projectId",schemaPath:"#/properties/derivedProjects/items/properties/projectId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err581];
}
else {
vErrors.push(err581);
}
errors++;
}
if(func2(data172) < 1){
const err582 = {instancePath:instancePath+"/derivedProjects/" + i23+"/projectId",schemaPath:"#/properties/derivedProjects/items/properties/projectId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err582];
}
else {
vErrors.push(err582);
}
errors++;
}
if(!pattern4.test(data172)){
const err583 = {instancePath:instancePath+"/derivedProjects/" + i23+"/projectId",schemaPath:"#/properties/derivedProjects/items/properties/projectId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err583];
}
else {
vErrors.push(err583);
}
errors++;
}
}
else {
const err584 = {instancePath:instancePath+"/derivedProjects/" + i23+"/projectId",schemaPath:"#/properties/derivedProjects/items/properties/projectId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err584];
}
else {
vErrors.push(err584);
}
errors++;
}
}
if(data171.relation !== undefined){
let data173 = data171.relation;
if(!((data173 === "3d") || (data173 === "generated-variant"))){
const err585 = {instancePath:instancePath+"/derivedProjects/" + i23+"/relation",schemaPath:"#/properties/derivedProjects/items/properties/relation/enum",keyword:"enum",params:{allowedValues: schema31.properties.derivedProjects.items.properties.relation.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err585];
}
else {
vErrors.push(err585);
}
errors++;
}
}
}
else {
const err586 = {instancePath:instancePath+"/derivedProjects/" + i23,schemaPath:"#/properties/derivedProjects/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err586];
}
else {
vErrors.push(err586);
}
errors++;
}
}
}
else {
const err587 = {instancePath:instancePath+"/derivedProjects",schemaPath:"#/properties/derivedProjects/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err587];
}
else {
vErrors.push(err587);
}
errors++;
}
}
if(data.motion !== undefined){
let data174 = data.motion;
if(data174 && typeof data174 == "object" && !Array.isArray(data174)){
if(data174.version === undefined){
const err588 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err588];
}
else {
vErrors.push(err588);
}
errors++;
}
if(data174.faceWidth === undefined){
const err589 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "faceWidth"},message:"must have required property '"+"faceWidth"+"'"};
if(vErrors === null){
vErrors = [err589];
}
else {
vErrors.push(err589);
}
errors++;
}
if(data174.maxRollDegrees === undefined){
const err590 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "maxRollDegrees"},message:"must have required property '"+"maxRollDegrees"+"'"};
if(vErrors === null){
vErrors = [err590];
}
else {
vErrors.push(err590);
}
errors++;
}
if(data174.secondary === undefined){
const err591 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "secondary"},message:"must have required property '"+"secondary"+"'"};
if(vErrors === null){
vErrors = [err591];
}
else {
vErrors.push(err591);
}
errors++;
}
if(data174.settings === undefined){
const err592 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "settings"},message:"must have required property '"+"settings"+"'"};
if(vErrors === null){
vErrors = [err592];
}
else {
vErrors.push(err592);
}
errors++;
}
if(data174.meshes === undefined){
const err593 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "meshes"},message:"must have required property '"+"meshes"+"'"};
if(vErrors === null){
vErrors = [err593];
}
else {
vErrors.push(err593);
}
errors++;
}
for(const key29 in data174){
if(!((((((key29 === "version") || (key29 === "faceWidth")) || (key29 === "maxRollDegrees")) || (key29 === "secondary")) || (key29 === "settings")) || (key29 === "meshes"))){
const err594 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key29},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err594];
}
else {
vErrors.push(err594);
}
errors++;
}
}
if(data174.version !== undefined){
if(1 !== data174.version){
const err595 = {instancePath:instancePath+"/motion/version",schemaPath:"#/properties/motion/properties/version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err595];
}
else {
vErrors.push(err595);
}
errors++;
}
}
if(data174.faceWidth !== undefined){
let data176 = data174.faceWidth;
if((typeof data176 == "number") && (isFinite(data176))){
if(data176 <= 0 || isNaN(data176)){
const err596 = {instancePath:instancePath+"/motion/faceWidth",schemaPath:"#/properties/motion/properties/faceWidth/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err596];
}
else {
vErrors.push(err596);
}
errors++;
}
}
else {
const err597 = {instancePath:instancePath+"/motion/faceWidth",schemaPath:"#/properties/motion/properties/faceWidth/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err597];
}
else {
vErrors.push(err597);
}
errors++;
}
}
if(data174.maxRollDegrees !== undefined){
let data177 = data174.maxRollDegrees;
if((typeof data177 == "number") && (isFinite(data177))){
if(data177 > 6 || isNaN(data177)){
const err598 = {instancePath:instancePath+"/motion/maxRollDegrees",schemaPath:"#/properties/motion/properties/maxRollDegrees/maximum",keyword:"maximum",params:{comparison: "<=", limit: 6},message:"must be <= 6"};
if(vErrors === null){
vErrors = [err598];
}
else {
vErrors.push(err598);
}
errors++;
}
if(data177 < 0 || isNaN(data177)){
const err599 = {instancePath:instancePath+"/motion/maxRollDegrees",schemaPath:"#/properties/motion/properties/maxRollDegrees/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err599];
}
else {
vErrors.push(err599);
}
errors++;
}
}
else {
const err600 = {instancePath:instancePath+"/motion/maxRollDegrees",schemaPath:"#/properties/motion/properties/maxRollDegrees/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err600];
}
else {
vErrors.push(err600);
}
errors++;
}
}
if(data174.secondary !== undefined){
if("disabled" !== data174.secondary){
const err601 = {instancePath:instancePath+"/motion/secondary",schemaPath:"#/properties/motion/properties/secondary/const",keyword:"const",params:{allowedValue: "disabled"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err601];
}
else {
vErrors.push(err601);
}
errors++;
}
}
if(data174.settings !== undefined){
let data179 = data174.settings;
if(data179 && typeof data179 == "object" && !Array.isArray(data179)){
if(data179.strength === undefined){
const err602 = {instancePath:instancePath+"/motion/settings",schemaPath:"#/properties/motion/properties/settings/required",keyword:"required",params:{missingProperty: "strength"},message:"must have required property '"+"strength"+"'"};
if(vErrors === null){
vErrors = [err602];
}
else {
vErrors.push(err602);
}
errors++;
}
if(data179.smoothingMs === undefined){
const err603 = {instancePath:instancePath+"/motion/settings",schemaPath:"#/properties/motion/properties/settings/required",keyword:"required",params:{missingProperty: "smoothingMs"},message:"must have required property '"+"smoothingMs"+"'"};
if(vErrors === null){
vErrors = [err603];
}
else {
vErrors.push(err603);
}
errors++;
}
if(data179.pose === undefined){
const err604 = {instancePath:instancePath+"/motion/settings",schemaPath:"#/properties/motion/properties/settings/required",keyword:"required",params:{missingProperty: "pose"},message:"must have required property '"+"pose"+"'"};
if(vErrors === null){
vErrors = [err604];
}
else {
vErrors.push(err604);
}
errors++;
}
for(const key30 in data179){
if(!(((key30 === "strength") || (key30 === "smoothingMs")) || (key30 === "pose"))){
const err605 = {instancePath:instancePath+"/motion/settings",schemaPath:"#/properties/motion/properties/settings/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key30},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err605];
}
else {
vErrors.push(err605);
}
errors++;
}
}
if(data179.strength !== undefined){
let data180 = data179.strength;
if((typeof data180 == "number") && (isFinite(data180))){
if(data180 > 1 || isNaN(data180)){
const err606 = {instancePath:instancePath+"/motion/settings/strength",schemaPath:"#/properties/motion/properties/settings/properties/strength/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err606];
}
else {
vErrors.push(err606);
}
errors++;
}
if(data180 < 0 || isNaN(data180)){
const err607 = {instancePath:instancePath+"/motion/settings/strength",schemaPath:"#/properties/motion/properties/settings/properties/strength/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err607];
}
else {
vErrors.push(err607);
}
errors++;
}
}
else {
const err608 = {instancePath:instancePath+"/motion/settings/strength",schemaPath:"#/properties/motion/properties/settings/properties/strength/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err608];
}
else {
vErrors.push(err608);
}
errors++;
}
}
if(data179.smoothingMs !== undefined){
let data181 = data179.smoothingMs;
if(!(((typeof data181 == "number") && (!(data181 % 1) && !isNaN(data181))) && (isFinite(data181)))){
const err609 = {instancePath:instancePath+"/motion/settings/smoothingMs",schemaPath:"#/properties/motion/properties/settings/properties/smoothingMs/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err609];
}
else {
vErrors.push(err609);
}
errors++;
}
if((typeof data181 == "number") && (isFinite(data181))){
if(data181 > 1000 || isNaN(data181)){
const err610 = {instancePath:instancePath+"/motion/settings/smoothingMs",schemaPath:"#/properties/motion/properties/settings/properties/smoothingMs/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1000},message:"must be <= 1000"};
if(vErrors === null){
vErrors = [err610];
}
else {
vErrors.push(err610);
}
errors++;
}
if(data181 < 0 || isNaN(data181)){
const err611 = {instancePath:instancePath+"/motion/settings/smoothingMs",schemaPath:"#/properties/motion/properties/settings/properties/smoothingMs/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err611];
}
else {
vErrors.push(err611);
}
errors++;
}
}
}
if(data179.pose !== undefined){
let data182 = data179.pose;
if(Array.isArray(data182)){
if(data182.length > 128){
const err612 = {instancePath:instancePath+"/motion/settings/pose",schemaPath:"#/properties/motion/properties/settings/properties/pose/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err612];
}
else {
vErrors.push(err612);
}
errors++;
}
const len22 = data182.length;
for(let i24=0; i24<len22; i24++){
let data183 = data182[i24];
if(data183 && typeof data183 == "object" && !Array.isArray(data183)){
if(data183.parameterId === undefined){
const err613 = {instancePath:instancePath+"/motion/settings/pose/" + i24,schemaPath:"#/properties/motion/properties/settings/properties/pose/items/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err613];
}
else {
vErrors.push(err613);
}
errors++;
}
if(data183.value === undefined){
const err614 = {instancePath:instancePath+"/motion/settings/pose/" + i24,schemaPath:"#/properties/motion/properties/settings/properties/pose/items/required",keyword:"required",params:{missingProperty: "value"},message:"must have required property '"+"value"+"'"};
if(vErrors === null){
vErrors = [err614];
}
else {
vErrors.push(err614);
}
errors++;
}
for(const key31 in data183){
if(!((key31 === "parameterId") || (key31 === "value"))){
const err615 = {instancePath:instancePath+"/motion/settings/pose/" + i24,schemaPath:"#/properties/motion/properties/settings/properties/pose/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key31},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err615];
}
else {
vErrors.push(err615);
}
errors++;
}
}
if(data183.parameterId !== undefined){
let data184 = data183.parameterId;
if(typeof data184 === "string"){
if(func2(data184) > 64){
const err616 = {instancePath:instancePath+"/motion/settings/pose/" + i24+"/parameterId",schemaPath:"#/properties/motion/properties/settings/properties/pose/items/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err616];
}
else {
vErrors.push(err616);
}
errors++;
}
if(func2(data184) < 1){
const err617 = {instancePath:instancePath+"/motion/settings/pose/" + i24+"/parameterId",schemaPath:"#/properties/motion/properties/settings/properties/pose/items/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err617];
}
else {
vErrors.push(err617);
}
errors++;
}
if(!pattern4.test(data184)){
const err618 = {instancePath:instancePath+"/motion/settings/pose/" + i24+"/parameterId",schemaPath:"#/properties/motion/properties/settings/properties/pose/items/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err618];
}
else {
vErrors.push(err618);
}
errors++;
}
}
else {
const err619 = {instancePath:instancePath+"/motion/settings/pose/" + i24+"/parameterId",schemaPath:"#/properties/motion/properties/settings/properties/pose/items/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err619];
}
else {
vErrors.push(err619);
}
errors++;
}
}
if(data183.value !== undefined){
let data185 = data183.value;
if(!((typeof data185 == "number") && (isFinite(data185)))){
const err620 = {instancePath:instancePath+"/motion/settings/pose/" + i24+"/value",schemaPath:"#/properties/motion/properties/settings/properties/pose/items/properties/value/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err620];
}
else {
vErrors.push(err620);
}
errors++;
}
}
}
else {
const err621 = {instancePath:instancePath+"/motion/settings/pose/" + i24,schemaPath:"#/properties/motion/properties/settings/properties/pose/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err621];
}
else {
vErrors.push(err621);
}
errors++;
}
}
}
else {
const err622 = {instancePath:instancePath+"/motion/settings/pose",schemaPath:"#/properties/motion/properties/settings/properties/pose/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err622];
}
else {
vErrors.push(err622);
}
errors++;
}
}
}
else {
const err623 = {instancePath:instancePath+"/motion/settings",schemaPath:"#/properties/motion/properties/settings/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err623];
}
else {
vErrors.push(err623);
}
errors++;
}
}
if(data174.meshes !== undefined){
let data186 = data174.meshes;
if(Array.isArray(data186)){
if(data186.length > 64){
const err624 = {instancePath:instancePath+"/motion/meshes",schemaPath:"#/properties/motion/properties/meshes/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err624];
}
else {
vErrors.push(err624);
}
errors++;
}
const len23 = data186.length;
for(let i25=0; i25<len23; i25++){
let data187 = data186[i25];
if(data187 && typeof data187 == "object" && !Array.isArray(data187)){
if(data187.partId === undefined){
const err625 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "partId"},message:"must have required property '"+"partId"+"'"};
if(vErrors === null){
vErrors = [err625];
}
else {
vErrors.push(err625);
}
errors++;
}
if(data187.pivot === undefined){
const err626 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "pivot"},message:"must have required property '"+"pivot"+"'"};
if(vErrors === null){
vErrors = [err626];
}
else {
vErrors.push(err626);
}
errors++;
}
if(data187.yawParameterId === undefined){
const err627 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "yawParameterId"},message:"must have required property '"+"yawParameterId"+"'"};
if(vErrors === null){
vErrors = [err627];
}
else {
vErrors.push(err627);
}
errors++;
}
if(data187.rollParameterId === undefined){
const err628 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "rollParameterId"},message:"must have required property '"+"rollParameterId"+"'"};
if(vErrors === null){
vErrors = [err628];
}
else {
vErrors.push(err628);
}
errors++;
}
if(data187.curve === undefined){
const err629 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "curve"},message:"must have required property '"+"curve"+"'"};
if(vErrors === null){
vErrors = [err629];
}
else {
vErrors.push(err629);
}
errors++;
}
if(data187.vertices === undefined){
const err630 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "vertices"},message:"must have required property '"+"vertices"+"'"};
if(vErrors === null){
vErrors = [err630];
}
else {
vErrors.push(err630);
}
errors++;
}
if(data187.triangles === undefined){
const err631 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "triangles"},message:"must have required property '"+"triangles"+"'"};
if(vErrors === null){
vErrors = [err631];
}
else {
vErrors.push(err631);
}
errors++;
}
for(const key32 in data187){
if(!(((((((key32 === "partId") || (key32 === "pivot")) || (key32 === "yawParameterId")) || (key32 === "rollParameterId")) || (key32 === "curve")) || (key32 === "vertices")) || (key32 === "triangles"))){
const err632 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key32},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err632];
}
else {
vErrors.push(err632);
}
errors++;
}
}
if(data187.partId !== undefined){
let data188 = data187.partId;
if(typeof data188 === "string"){
if(func2(data188) > 64){
const err633 = {instancePath:instancePath+"/motion/meshes/" + i25+"/partId",schemaPath:"#/properties/motion/properties/meshes/items/properties/partId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err633];
}
else {
vErrors.push(err633);
}
errors++;
}
if(func2(data188) < 1){
const err634 = {instancePath:instancePath+"/motion/meshes/" + i25+"/partId",schemaPath:"#/properties/motion/properties/meshes/items/properties/partId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err634];
}
else {
vErrors.push(err634);
}
errors++;
}
if(!pattern4.test(data188)){
const err635 = {instancePath:instancePath+"/motion/meshes/" + i25+"/partId",schemaPath:"#/properties/motion/properties/meshes/items/properties/partId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err635];
}
else {
vErrors.push(err635);
}
errors++;
}
}
else {
const err636 = {instancePath:instancePath+"/motion/meshes/" + i25+"/partId",schemaPath:"#/properties/motion/properties/meshes/items/properties/partId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err636];
}
else {
vErrors.push(err636);
}
errors++;
}
}
if(data187.pivot !== undefined){
let data189 = data187.pivot;
if(Array.isArray(data189)){
if(data189.length > 2){
const err637 = {instancePath:instancePath+"/motion/meshes/" + i25+"/pivot",schemaPath:"#/properties/motion/properties/meshes/items/properties/pivot/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err637];
}
else {
vErrors.push(err637);
}
errors++;
}
if(data189.length < 2){
const err638 = {instancePath:instancePath+"/motion/meshes/" + i25+"/pivot",schemaPath:"#/properties/motion/properties/meshes/items/properties/pivot/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err638];
}
else {
vErrors.push(err638);
}
errors++;
}
const len24 = data189.length;
for(let i26=0; i26<len24; i26++){
let data190 = data189[i26];
if(!((typeof data190 == "number") && (isFinite(data190)))){
const err639 = {instancePath:instancePath+"/motion/meshes/" + i25+"/pivot/" + i26,schemaPath:"#/properties/motion/properties/meshes/items/properties/pivot/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err639];
}
else {
vErrors.push(err639);
}
errors++;
}
}
}
else {
const err640 = {instancePath:instancePath+"/motion/meshes/" + i25+"/pivot",schemaPath:"#/properties/motion/properties/meshes/items/properties/pivot/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err640];
}
else {
vErrors.push(err640);
}
errors++;
}
}
if(data187.yawParameterId !== undefined){
let data191 = data187.yawParameterId;
const _errs418 = errors;
let valid92 = false;
const _errs419 = errors;
if(typeof data191 === "string"){
if(func2(data191) > 64){
const err641 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err641];
}
else {
vErrors.push(err641);
}
errors++;
}
if(func2(data191) < 1){
const err642 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err642];
}
else {
vErrors.push(err642);
}
errors++;
}
if(!pattern4.test(data191)){
const err643 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err643];
}
else {
vErrors.push(err643);
}
errors++;
}
}
else {
const err644 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err644];
}
else {
vErrors.push(err644);
}
errors++;
}
var _valid7 = _errs419 === errors;
valid92 = valid92 || _valid7;
const _errs421 = errors;
if(data191 !== null){
const err645 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err645];
}
else {
vErrors.push(err645);
}
errors++;
}
var _valid7 = _errs421 === errors;
valid92 = valid92 || _valid7;
if(!valid92){
const err646 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err646];
}
else {
vErrors.push(err646);
}
errors++;
}
else {
errors = _errs418;
if(vErrors !== null){
if(_errs418){
vErrors.length = _errs418;
}
else {
vErrors = null;
}
}
}
}
if(data187.rollParameterId !== undefined){
let data192 = data187.rollParameterId;
const _errs424 = errors;
let valid93 = false;
const _errs425 = errors;
if(typeof data192 === "string"){
if(func2(data192) > 64){
const err647 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err647];
}
else {
vErrors.push(err647);
}
errors++;
}
if(func2(data192) < 1){
const err648 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err648];
}
else {
vErrors.push(err648);
}
errors++;
}
if(!pattern4.test(data192)){
const err649 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err649];
}
else {
vErrors.push(err649);
}
errors++;
}
}
else {
const err650 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err650];
}
else {
vErrors.push(err650);
}
errors++;
}
var _valid8 = _errs425 === errors;
valid93 = valid93 || _valid8;
const _errs427 = errors;
if(data192 !== null){
const err651 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err651];
}
else {
vErrors.push(err651);
}
errors++;
}
var _valid8 = _errs427 === errors;
valid93 = valid93 || _valid8;
if(!valid93){
const err652 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err652];
}
else {
vErrors.push(err652);
}
errors++;
}
else {
errors = _errs424;
if(vErrors !== null){
if(_errs424){
vErrors.length = _errs424;
}
else {
vErrors = null;
}
}
}
}
if(data187.curve !== undefined){
let data193 = data187.curve;
if(!((data193 === "linear") || (data193 === "smoothstep"))){
const err653 = {instancePath:instancePath+"/motion/meshes/" + i25+"/curve",schemaPath:"#/properties/motion/properties/meshes/items/properties/curve/enum",keyword:"enum",params:{allowedValues: schema31.properties.motion.properties.meshes.items.properties.curve.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err653];
}
else {
vErrors.push(err653);
}
errors++;
}
}
if(data187.vertices !== undefined){
let data194 = data187.vertices;
if(Array.isArray(data194)){
if(data194.length > 1024){
const err654 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/maxItems",keyword:"maxItems",params:{limit: 1024},message:"must NOT have more than 1024 items"};
if(vErrors === null){
vErrors = [err654];
}
else {
vErrors.push(err654);
}
errors++;
}
if(data194.length < 3){
const err655 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/minItems",keyword:"minItems",params:{limit: 3},message:"must NOT have fewer than 3 items"};
if(vErrors === null){
vErrors = [err655];
}
else {
vErrors.push(err655);
}
errors++;
}
const len25 = data194.length;
for(let i27=0; i27<len25; i27++){
let data195 = data194[i27];
if(data195 && typeof data195 == "object" && !Array.isArray(data195)){
if(data195.position === undefined){
const err656 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/required",keyword:"required",params:{missingProperty: "position"},message:"must have required property '"+"position"+"'"};
if(vErrors === null){
vErrors = [err656];
}
else {
vErrors.push(err656);
}
errors++;
}
if(data195.weight === undefined){
const err657 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/required",keyword:"required",params:{missingProperty: "weight"},message:"must have required property '"+"weight"+"'"};
if(vErrors === null){
vErrors = [err657];
}
else {
vErrors.push(err657);
}
errors++;
}
if(data195.minimum === undefined){
const err658 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/required",keyword:"required",params:{missingProperty: "minimum"},message:"must have required property '"+"minimum"+"'"};
if(vErrors === null){
vErrors = [err658];
}
else {
vErrors.push(err658);
}
errors++;
}
if(data195.maximum === undefined){
const err659 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/required",keyword:"required",params:{missingProperty: "maximum"},message:"must have required property '"+"maximum"+"'"};
if(vErrors === null){
vErrors = [err659];
}
else {
vErrors.push(err659);
}
errors++;
}
for(const key33 in data195){
if(!((((key33 === "position") || (key33 === "weight")) || (key33 === "minimum")) || (key33 === "maximum"))){
const err660 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key33},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err660];
}
else {
vErrors.push(err660);
}
errors++;
}
}
if(data195.position !== undefined){
let data196 = data195.position;
if(Array.isArray(data196)){
if(data196.length > 2){
const err661 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/position",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/position/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err661];
}
else {
vErrors.push(err661);
}
errors++;
}
if(data196.length < 2){
const err662 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/position",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/position/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err662];
}
else {
vErrors.push(err662);
}
errors++;
}
const len26 = data196.length;
for(let i28=0; i28<len26; i28++){
let data197 = data196[i28];
if(!((typeof data197 == "number") && (isFinite(data197)))){
const err663 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/position/" + i28,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/position/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
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
const err664 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/position",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/position/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err664];
}
else {
vErrors.push(err664);
}
errors++;
}
}
if(data195.weight !== undefined){
let data198 = data195.weight;
if((typeof data198 == "number") && (isFinite(data198))){
if(data198 > 1 || isNaN(data198)){
const err665 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/weight",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/weight/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err665];
}
else {
vErrors.push(err665);
}
errors++;
}
if(data198 < 0 || isNaN(data198)){
const err666 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/weight",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/weight/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err666];
}
else {
vErrors.push(err666);
}
errors++;
}
}
else {
const err667 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/weight",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/weight/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err667];
}
else {
vErrors.push(err667);
}
errors++;
}
}
if(data195.minimum !== undefined){
let data199 = data195.minimum;
if(Array.isArray(data199)){
if(data199.length > 2){
const err668 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/minimum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/minimum/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err668];
}
else {
vErrors.push(err668);
}
errors++;
}
if(data199.length < 2){
const err669 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/minimum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/minimum/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err669];
}
else {
vErrors.push(err669);
}
errors++;
}
const len27 = data199.length;
for(let i29=0; i29<len27; i29++){
let data200 = data199[i29];
if(!((typeof data200 == "number") && (isFinite(data200)))){
const err670 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/minimum/" + i29,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/minimum/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err670];
}
else {
vErrors.push(err670);
}
errors++;
}
}
}
else {
const err671 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/minimum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/minimum/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err671];
}
else {
vErrors.push(err671);
}
errors++;
}
}
if(data195.maximum !== undefined){
let data201 = data195.maximum;
if(Array.isArray(data201)){
if(data201.length > 2){
const err672 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/maximum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/maximum/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err672];
}
else {
vErrors.push(err672);
}
errors++;
}
if(data201.length < 2){
const err673 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/maximum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/maximum/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err673];
}
else {
vErrors.push(err673);
}
errors++;
}
const len28 = data201.length;
for(let i30=0; i30<len28; i30++){
let data202 = data201[i30];
if(!((typeof data202 == "number") && (isFinite(data202)))){
const err674 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/maximum/" + i30,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/maximum/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err674];
}
else {
vErrors.push(err674);
}
errors++;
}
}
}
else {
const err675 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/maximum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/maximum/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err675];
}
else {
vErrors.push(err675);
}
errors++;
}
}
}
else {
const err676 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err676];
}
else {
vErrors.push(err676);
}
errors++;
}
}
}
else {
const err677 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err677];
}
else {
vErrors.push(err677);
}
errors++;
}
}
if(data187.triangles !== undefined){
let data203 = data187.triangles;
if(Array.isArray(data203)){
if(data203.length > 6144){
const err678 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles",schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/maxItems",keyword:"maxItems",params:{limit: 6144},message:"must NOT have more than 6144 items"};
if(vErrors === null){
vErrors = [err678];
}
else {
vErrors.push(err678);
}
errors++;
}
if(data203.length < 3){
const err679 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles",schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/minItems",keyword:"minItems",params:{limit: 3},message:"must NOT have fewer than 3 items"};
if(vErrors === null){
vErrors = [err679];
}
else {
vErrors.push(err679);
}
errors++;
}
const len29 = data203.length;
for(let i31=0; i31<len29; i31++){
let data204 = data203[i31];
if(!(((typeof data204 == "number") && (!(data204 % 1) && !isNaN(data204))) && (isFinite(data204)))){
const err680 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles/" + i31,schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/items/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err680];
}
else {
vErrors.push(err680);
}
errors++;
}
if((typeof data204 == "number") && (isFinite(data204))){
if(data204 > 1023 || isNaN(data204)){
const err681 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles/" + i31,schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/items/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1023},message:"must be <= 1023"};
if(vErrors === null){
vErrors = [err681];
}
else {
vErrors.push(err681);
}
errors++;
}
if(data204 < 0 || isNaN(data204)){
const err682 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles/" + i31,schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/items/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
}
else {
const err683 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles",schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err683];
}
else {
vErrors.push(err683);
}
errors++;
}
}
}
else {
const err684 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err684];
}
else {
vErrors.push(err684);
}
errors++;
}
}
}
else {
const err685 = {instancePath:instancePath+"/motion/meshes",schemaPath:"#/properties/motion/properties/meshes/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err685];
}
else {
vErrors.push(err685);
}
errors++;
}
}
}
else {
const err686 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err686];
}
else {
vErrors.push(err686);
}
errors++;
}
}
}
else {
const err687 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err687];
}
else {
vErrors.push(err687);
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
