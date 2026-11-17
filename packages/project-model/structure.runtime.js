// Generated from schema.ts with locked Ajv; do not edit.
import ucs2lengthModule from "ajv/dist/runtime/ucs2length.js";
const ucs2length = ucs2lengthModule.default ?? ucs2lengthModule;
"use strict";
export const projectStructure = validate20;
const schema31 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://2dsketcher.local/schema/project-1.7","type":"object","additionalProperties":false,"properties":{"projectId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"schemaVersion":{"type":"object","additionalProperties":false,"properties":{"major":{"const":1},"minor":{"enum":[0,1,2,3,4,5,6,7]}},"required":["major","minor"]},"displayName":{"type":"string","minLength":1,"maxLength":120},"sourceType":{"enum":["parts","single-image","split-image"]},"createdAt":{"type":"string","minLength":1,"maxLength":24,"pattern":"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"},"modifiedAt":{"type":"string","minLength":1,"maxLength":24,"pattern":"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"savedRevision":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]},"canvas":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"inputAssetIds":{"type":"array","items":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"maxItems":1024,"uniqueItems":true},"assets":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"kind":{"enum":["original-image","part-texture","supplement-image","edited-image"]},"origin":{"enum":["imported","bundled","auto-preparation","auto-completion","manual-edit","generated"]},"parentAssetIds":{"type":"array","items":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"maxItems":1024,"uniqueItems":true},"storage":{"type":"object","additionalProperties":false,"properties":{"path":{"type":"string","minLength":1,"maxLength":240,"pattern":"^resources/"}},"required":["path"]},"fingerprint":{"type":"object","additionalProperties":false,"properties":{"sha256":{"type":"string","pattern":"^[a-f0-9]{64}$"},"bytes":{"type":"integer","minimum":1,"maximum":536870912}},"required":["sha256","bytes"]},"version":{"type":"integer","minimum":1,"maximum":9007199254740991},"mediaType":{"enum":["image/png","image/jpeg"]},"dimensions":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"sourceRegion":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},"sourceToEdited":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6},"colorSpace":{"enum":["srgb","unknown"]},"alphaMode":{"enum":["straight","premultiplied","opaque"]},"producer":{"type":"object","additionalProperties":false,"properties":{"name":{"type":"string","minLength":1,"maxLength":120},"version":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"}},"required":["name","version"]},"attribution":{"type":"object","additionalProperties":false,"properties":{"creator":{"type":"string","minLength":1,"maxLength":512},"source":{"type":"string","minLength":1,"maxLength":512},"usage":{"type":"string","minLength":1,"maxLength":1024},"status":{"enum":["verified","unverified"]}},"required":["creator","source","usage","status"]}},"required":["id","kind","origin","parentAssetIds","storage","fingerprint","version","mediaType","dimensions","sourceRegion","sourceToEdited","colorSpace","alphaMode","producer","attribution"]},"maxItems":1024},"parts":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"role":{"enum":["base","body","head","hair-front","hair-back","eye","mouth","accessory","custom"]},"side":{"enum":["character-left","character-right","center","none"]},"parentId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"groupId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"textures":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"state":{"type":"string","minLength":1,"maxLength":32,"pattern":"^[a-z][a-z0-9_-]*$"},"assetId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"assetVersion":{"type":"integer","minimum":1,"maximum":9007199254740991},"assetToLocal":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6}},"required":["state","assetId","assetVersion","assetToLocal"]},"maxItems":32},"localTransform":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6},"drawOrder":{"type":"integer","minimum":-100000,"maximum":100000},"visible":{"type":"boolean"},"opacity":{"type":"number","minimum":0,"maximum":1},"correctionOrigin":{"enum":["automatic","user-confirmed","manual"]},"limitations":{"type":"array","items":{"type":"string","minLength":1,"maxLength":512},"maxItems":64},"library":{"type":"object","additionalProperties":false,"properties":{"catalogId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"itemId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"version":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"},"key":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"}},"required":["catalogId","itemId","version","key"]},"color":{"type":"object","additionalProperties":false,"properties":{"hueDegrees":{"type":"number","minimum":-18,"maximum":18},"minimumHue":{"type":"number","minimum":0,"maximum":1},"maximumHue":{"type":"number","minimum":0,"maximum":1},"minimumSaturation":{"type":"number","minimum":0,"maximum":1}},"required":["hueDegrees","minimumHue","maximumHue","minimumSaturation"]}},"required":["id","displayName","role","side","parentId","groupId","textures","localTransform","drawOrder","visible","opacity","correctionOrigin","limitations"]},"maxItems":64},"groups":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"parentGroupId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"visible":{"type":"boolean"},"opacity":{"type":"number","minimum":0,"maximum":1}},"required":["id","displayName","parentGroupId","visible"]},"maxItems":128},"parameters":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"semantic":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[a-z][a-z0-9_-]*$"},"unit":{"enum":["ratio","degrees","custom"]},"min":{"type":"number"},"neutral":{"type":"number"},"max":{"type":"number"},"previewKey":{"anyOf":[{"enum":["eye_left","eye_right","mouth","head_yaw","head_roll"]},{"type":"null"}]}},"required":["id","displayName","semantic","unit","min","neutral","max","previewKey"]},"maxItems":128},"partBindings":{"type":"array","items":{"oneOf":[{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"partId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"kind":{"const":"state-blend"},"mapping":{"type":"object","additionalProperties":false,"properties":{"minimumState":{"type":"string","minLength":1,"maxLength":32},"maximumState":{"type":"string","minLength":1,"maxLength":32},"middleState":{"type":"string","minLength":1,"maxLength":32}},"required":["minimumState","maximumState"]}},"required":["id","parameterId","partId","kind","mapping"]},{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"partId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"kind":{"const":"transform"},"mapping":{"type":"object","additionalProperties":false,"properties":{"component":{"enum":["rotate-degrees","translate-x","translate-y","scale-x","scale-y"]},"outputRange":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2}},"required":["component","outputRange"]}},"required":["id","parameterId","partId","kind","mapping"]}]},"maxItems":256},"inputBindings":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"source":{"enum":["face","microphone","manual"]},"channel":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[a-z][a-z0-9_-]*$"},"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"inputRange":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"invert":{"type":"boolean"},"gain":{"type":"number","minimum":0,"maximum":10},"offset":{"type":"number"},"smoothingMs":{"type":"integer","minimum":0,"maximum":10000},"fallback":{"type":"object","additionalProperties":false,"properties":{"mode":{"enum":["neutral","hold","constant"]},"value":{"type":"number"},"returnMs":{"type":"integer","minimum":0,"maximum":10000}},"required":["mode","value","returnMs"]}},"required":["id","source","channel","parameterId","inputRange","invert","gain","offset","smoothingMs","fallback"]},"maxItems":128},"expressions":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"values":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"value":{"type":"number"},"locked":{"type":"boolean"}},"required":["parameterId","value","locked"]},"maxItems":128},"transitionMs":{"type":"integer","minimum":0,"maximum":10000},"release":{"enum":["live-input","neutral"]}},"required":["id","displayName","values","transitionMs","release"]},"maxItems":64},"runtimeProfile":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"mode":{"enum":["idle","camera","microphone","camera-microphone"]},"mirror":{"type":"boolean"},"fallbackExpressionId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]}},"required":["id","revision","mode","mirror","fallbackExpressionId"]},"broadcastProfiles":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"displayName":{"type":"string","minLength":1,"maxLength":120},"width":{"type":"integer","minimum":1,"maximum":8192},"height":{"type":"integer","minimum":1,"maximum":8192},"fps":{"type":"integer","minimum":1,"maximum":120},"transparent":{"type":"boolean"},"region":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},"fit":{"enum":["contain","cover"]}},"required":["id","revision","displayName","width","height","fps","transparent","region","fit"]},"maxItems":16},"exportProfiles":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"displayName":{"type":"string","minLength":1,"maxLength":120},"target":{"enum":["inochi2d"]},"targetVersion":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"},"format":{"enum":["inp"]},"converterVersion":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"},"parameterMap":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"targetName":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[a-zA-Z][a-zA-Z0-9_]*$"}},"required":["parameterId","targetName"]},"maxItems":128}},"required":["id","revision","displayName","target","targetVersion","format","converterVersion","parameterMap"]},"maxItems":16},"provenance":{"type":"object","additionalProperties":false,"properties":{"preparation":{"type":"string","minLength":1,"maxLength":512},"limitations":{"type":"array","items":{"type":"string","minLength":1,"maxLength":512},"maxItems":128}},"required":["preparation","limitations"]},"derivedProjects":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"projectId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"relation":{"enum":["3d","generated-variant"]}},"required":["projectId","relation"]},"maxItems":32},"motion":{"type":"object","additionalProperties":false,"properties":{"version":{"const":1},"faceWidth":{"type":"number","exclusiveMinimum":0},"maxRollDegrees":{"type":"number","minimum":0,"maximum":6},"secondary":{"const":"disabled"},"settings":{"type":"object","additionalProperties":false,"properties":{"strength":{"type":"number","minimum":0,"maximum":1},"smoothingMs":{"type":"integer","minimum":0,"maximum":1000},"pose":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"value":{"type":"number"}},"required":["parameterId","value"]},"maxItems":128}},"required":["strength","smoothingMs","pose"]},"meshes":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"partId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"pivot":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"yawParameterId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"rollParameterId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"curve":{"enum":["linear","smoothstep"]},"vertices":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"position":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"weight":{"type":"number","minimum":0,"maximum":1},"minimum":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"maximum":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2}},"required":["position","weight","minimum","maximum"]},"maxItems":1024,"minItems":3},"triangles":{"type":"array","items":{"type":"integer","minimum":0,"maximum":1023},"maxItems":6144,"minItems":3}},"required":["partId","pivot","yawParameterId","rollParameterId","curve","vertices","triangles"]},"maxItems":64}},"required":["version","faceWidth","maxRollDegrees","secondary","settings","meshes"]},"detail":{"type":"object","additionalProperties":false,"properties":{"version":{"const":1},"partOrder":{"type":"array","items":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"maxItems":64,"uniqueItems":true},"meshOrder":{"type":"array","items":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"maxItems":64,"uniqueItems":true},"baselines":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"part":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"role":{"enum":["base","body","head","hair-front","hair-back","eye","mouth","accessory","custom"]},"side":{"enum":["character-left","character-right","center","none"]},"parentId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"groupId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"textures":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"state":{"type":"string","minLength":1,"maxLength":32,"pattern":"^[a-z][a-z0-9_-]*$"},"assetId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"assetVersion":{"type":"integer","minimum":1,"maximum":9007199254740991},"assetToLocal":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6}},"required":["state","assetId","assetVersion","assetToLocal"]},"maxItems":32},"localTransform":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6},"drawOrder":{"type":"integer","minimum":-100000,"maximum":100000},"visible":{"type":"boolean"},"opacity":{"type":"number","minimum":0,"maximum":1},"correctionOrigin":{"enum":["automatic","user-confirmed","manual"]},"limitations":{"type":"array","items":{"type":"string","minLength":1,"maxLength":512},"maxItems":64},"library":{"type":"object","additionalProperties":false,"properties":{"catalogId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"itemId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"version":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"},"key":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"}},"required":["catalogId","itemId","version","key"]},"color":{"type":"object","additionalProperties":false,"properties":{"hueDegrees":{"type":"number","minimum":-18,"maximum":18},"minimumHue":{"type":"number","minimum":0,"maximum":1},"maximumHue":{"type":"number","minimum":0,"maximum":1},"minimumSaturation":{"type":"number","minimum":0,"maximum":1}},"required":["hueDegrees","minimumHue","maximumHue","minimumSaturation"]}},"required":["id","displayName","role","side","parentId","groupId","textures","localTransform","drawOrder","visible","opacity","correctionOrigin","limitations"]},"partIndex":{"type":"integer","minimum":0,"maximum":63},"mesh":{"anyOf":[{"type":"object","additionalProperties":false,"properties":{"partId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"pivot":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"yawParameterId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"rollParameterId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"curve":{"enum":["linear","smoothstep"]},"vertices":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"position":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"weight":{"type":"number","minimum":0,"maximum":1},"minimum":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"maximum":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2}},"required":["position","weight","minimum","maximum"]},"maxItems":1024,"minItems":3},"triangles":{"type":"array","items":{"type":"integer","minimum":0,"maximum":1023},"maxItems":6144,"minItems":3}},"required":["partId","pivot","yawParameterId","rollParameterId","curve","vertices","triangles"]},{"type":"null"}]},"meshIndex":{"type":"integer","minimum":0,"maximum":63},"bindings":{"type":"array","items":{"oneOf":[{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"partId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"kind":{"const":"state-blend"},"mapping":{"type":"object","additionalProperties":false,"properties":{"minimumState":{"type":"string","minLength":1,"maxLength":32},"maximumState":{"type":"string","minLength":1,"maxLength":32},"middleState":{"type":"string","minLength":1,"maxLength":32}},"required":["minimumState","maximumState"]}},"required":["id","parameterId","partId","kind","mapping"]},{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"partId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"kind":{"const":"transform"},"mapping":{"type":"object","additionalProperties":false,"properties":{"component":{"enum":["rotate-degrees","translate-x","translate-y","scale-x","scale-y"]},"outputRange":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2}},"required":["component","outputRange"]}},"required":["id","parameterId","partId","kind","mapping"]}]},"maxItems":256}},"required":["part","partIndex","mesh","meshIndex","bindings"]},"maxItems":64},"groups":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"parentGroupId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"visible":{"type":"boolean"},"opacity":{"type":"number","minimum":0,"maximum":1}},"required":["id","displayName","parentGroupId","visible"]},"maxItems":128}},"required":["version","partOrder","meshOrder","baselines","groups"]},"inputPreparation":{"type":"object","additionalProperties":false,"properties":{"version":{"const":1},"originalAssetId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},"normalizedAssetId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},"selectedAssetId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},"analysisAssetId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},"probe":{"type":"object","additionalProperties":false,"properties":{"detectorAvailable":{"type":"boolean"},"originalSize":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"size":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"orientation":{"type":"integer","minimum":1,"maximum":8},"iccConverted":{"type":"boolean"},"sourceToNormalized":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6},"reduced":{"type":"boolean"},"estimatedWorkingBytes":{"type":"integer","minimum":0,"maximum":402653184},"format":{"enum":["png","jpeg"]},"hasAlpha":{"type":"boolean"},"faceCount":{"type":"integer","minimum":0,"maximum":8},"candidates":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"integer","minimum":0,"maximum":4096},"y":{"type":"integer","minimum":0,"maximum":4096},"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["x","y","width","height"]},"method":{"enum":["alpha","face","manual-required"]}},"required":["rect","method"]},"maxItems":8}},"required":["detectorAvailable","originalSize","size","orientation","iccConverted","sourceToNormalized","reduced","estimatedWorkingBytes","format","hasAlpha","faceCount","candidates"]},"selection":{"type":"object","additionalProperties":false,"properties":{"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"integer","minimum":0,"maximum":4096},"y":{"type":"integer","minimum":0,"maximum":4096},"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["x","y","width","height"]},"backgroundTolerance":{"anyOf":[{"type":"null"},{"type":"integer","minimum":0,"maximum":80}]},"masks":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"mode":{"enum":["erase","restore"]},"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"integer","minimum":0,"maximum":4096},"y":{"type":"integer","minimum":0,"maximum":4096},"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["x","y","width","height"]}},"required":["mode","rect"]},"maxItems":64},"occluded":{"type":"boolean"}},"required":["rect","backgroundTolerance","masks","occluded"]},"analysis":{"type":"object","additionalProperties":false,"properties":{"faces":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number","minimum":0,"maximum":1024},"y":{"type":"number","minimum":0,"maximum":1024},"width":{"type":"number","exclusiveMinimum":0,"maximum":1024},"height":{"type":"number","exclusiveMinimum":0,"maximum":1024}},"required":["x","y","width","height"]},"maxItems":8},"warnings":{"type":"array","items":{"enum":["DETECTOR_UNAVAILABLE","FACE_UNCONFIRMED","SMALL_FACE","EDGE_CROPPED_POSSIBLE","OCCLUDED_USER_REPORTED"]},"maxItems":8},"crop":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"integer","minimum":0,"maximum":4096},"y":{"type":"integer","minimum":0,"maximum":4096},"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["x","y","width","height"]},"analysisSize":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]}},"required":["faces","warnings","crop","analysisSize"]}},"required":["version","originalAssetId","normalizedAssetId","selectedAssetId","analysisAssetId","probe","selection","analysis"]},"assembly":{"type":"object","additionalProperties":false,"properties":{"catalogId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"version":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"},"linkedEyes":{"type":"boolean"},"choices":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"slot":{"enum":["face","hair","eyes","mouth","outfit","accessory"]},"itemId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"version":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"}},"required":["slot","itemId","version"]},"maxItems":6},"adjustments":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"key":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"x":{"type":"number","minimum":-6,"maximum":6},"y":{"type":"number","minimum":-6,"maximum":6},"scale":{"type":"number","minimum":0.95,"maximum":1.05},"rotation":{"type":"number","minimum":-2,"maximum":2},"hue":{"type":"number","minimum":-18,"maximum":18}},"required":["key","x","y","scale","rotation","hue"]},"maxItems":16},"warnings":{"type":"array","items":{"type":"string","minLength":1,"maxLength":512},"maxItems":16}},"required":["catalogId","version","linkedEyes","choices","adjustments","warnings"]},"structure":{"type":"object","additionalProperties":false,"properties":{"version":{"const":1},"inputAssetId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"inputRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"configurationVersion":{"enum":["1.0.0","1.1.0"]},"report":{"type":"object","additionalProperties":false,"properties":{"version":{"const":"1.0.0"},"method":{"const":"mediapipe-landmarks-pixel-evidence"},"status":{"enum":["ready","partial","failed"]},"face":{"anyOf":[{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},{"type":"null"}]},"regions":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"key":{"enum":["eye_left","eye_right","mouth"]},"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},"observed":{"type":"boolean"},"reason":{"type":"string","minLength":1,"maxLength":128},"estimatedStates":{"type":"array","items":{"enum":["open","closed"]},"maxItems":2},"enabled":{"type":"boolean"},"masks":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"mode":{"enum":["erase","restore"]},"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]}},"required":["mode","rect"]},"maxItems":32},"order":{"type":"integer","minimum":5,"maximum":20}},"required":["key","rect","observed","reason","estimatedStates"]},"maxItems":3},"unconfirmed":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128},"maxItems":16},"warnings":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128},"maxItems":16},"headGain":{"type":"number","minimum":0,"maximum":0.65},"maxRollDegrees":{"type":"number","minimum":0,"maximum":3.900000001},"completion":{"enum":["estimated","restrict"]},"files":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128,"pattern":"^structure-(base|eye_(left|right)-(open|closed)|mouth-(open|closed))\\.png$"},"maxItems":7}},"required":["version","method","status","face","regions","unconfirmed","warnings","headGain","maxRollDegrees","completion","files"]},"corrections":{"type":"object","additionalProperties":false,"properties":{"version":{"const":1},"automatic":{"type":"object","additionalProperties":false,"properties":{"version":{"const":"1.0.0"},"method":{"const":"mediapipe-landmarks-pixel-evidence"},"status":{"enum":["ready","partial","failed"]},"face":{"anyOf":[{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},{"type":"null"}]},"regions":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"key":{"enum":["eye_left","eye_right","mouth"]},"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},"observed":{"type":"boolean"},"reason":{"type":"string","minLength":1,"maxLength":128},"estimatedStates":{"type":"array","items":{"enum":["open","closed"]},"maxItems":2},"enabled":{"type":"boolean"},"masks":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"mode":{"enum":["erase","restore"]},"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]}},"required":["mode","rect"]},"maxItems":32},"order":{"type":"integer","minimum":5,"maximum":20}},"required":["key","rect","observed","reason","estimatedStates"]},"maxItems":3},"unconfirmed":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128},"maxItems":16},"warnings":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128},"maxItems":16},"headGain":{"type":"number","minimum":0,"maximum":0.65},"maxRollDegrees":{"type":"number","minimum":0,"maximum":3.900000001},"completion":{"enum":["estimated","restrict"]},"files":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128,"pattern":"^structure-(base|eye_(left|right)-(open|closed)|mouth-(open|closed))\\.png$"},"maxItems":7}},"required":["version","method","status","face","regions","unconfirmed","warnings","headGain","maxRollDegrees","completion","files"]},"entries":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"key":{"enum":["eye_left","eye_right","mouth"]},"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},"masks":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"mode":{"enum":["erase","restore"]},"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]}},"required":["mode","rect"]},"maxItems":32},"order":{"type":"integer","minimum":5,"maximum":20},"decision":{"enum":["confirmed","skip","blocked"]},"occluded":{"type":"boolean"},"protect":{"type":"boolean"}},"required":["key","rect","masks","order","decision","occluded","protect"]},"maxItems":3},"invalidated":{"type":"object","additionalProperties":false,"properties":{"keys":{"type":"array","items":{"enum":["eye_left","eye_right","mouth"]},"maxItems":3},"checks":{"type":"array","items":{"enum":["preview","compatibility","export"]},"maxItems":3}},"required":["keys","checks"]}},"required":["version","automatic","entries","invalidated"]}},"required":["version","inputAssetId","inputRevision","configurationVersion","report"]},"split":{"type":"object","additionalProperties":false,"properties":{"version":{"const":1},"rigSignature":{"type":"string","pattern":"^[a-f0-9]{64}$"},"draft":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"sourceKind":{"enum":["folder","2dparts"]},"sourceHash":{"anyOf":[{"type":"string","pattern":"^[a-f0-9]{64}$"},{"type":"null"}]},"sourceManifest":{"anyOf":[{"type":"string","minLength":1,"maxLength":1048576},{"type":"null"}]},"canvas":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"layout":{"enum":["manifest","common","cropped"]},"layoutConfirmed":{"type":"boolean"},"limitedAccepted":{"type":"boolean"},"omittedAccepted":{"type":"boolean"},"layers":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"name":{"type":"string","minLength":1,"maxLength":120},"origin":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"z":{"type":"integer","minimum":-100000,"maximum":100000},"role":{"enum":["base","body","head","hair-front","hair-back","eye","mouth","accessory","custom"]},"side":{"enum":["character-left","character-right","center","none"]},"visible":{"type":"boolean"},"opacity":{"type":"number","minimum":0,"maximum":1},"parentId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"groupId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"usage":{"enum":["primary","auxiliary","alternative"]},"variantOf":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"state":{"enum":["default","open","closed","middle"]},"positionConfirmed":{"type":"boolean"},"roleConfirmed":{"type":"boolean"},"sourceId":{"type":"string","minLength":1,"maxLength":128},"sourceName":{"type":"string","minLength":1,"maxLength":120},"sourcePath":{"type":"string","minLength":1,"maxLength":240},"sourceZ":{"anyOf":[{"type":"integer","minimum":-100000,"maximum":100000},{"type":"null"}]},"sourceOrigin":{"anyOf":[{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},{"type":"null"}]},"originalAssetId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"imageAssetId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"sourceHash":{"type":"string","pattern":"^[a-f0-9]{64}$"},"imageHash":{"type":"string","pattern":"^[a-f0-9]{64}$"},"image":{"type":"object","additionalProperties":false,"properties":{"key":{"type":"string","pattern":"^[a-f0-9]{64}$"},"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096},"bounds":{"anyOf":[{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},{"type":"null"}]},"empty":{"type":"boolean"},"opaque":{"type":"boolean"},"iccConverted":{"type":"boolean"}},"required":["key","width","height","bounds","empty","opaque","iccConverted"]},"proposal":{"type":"object","additionalProperties":false,"properties":{"role":{"enum":["base","body","head","hair-front","hair-back","eye","mouth","accessory","custom"]},"side":{"enum":["character-left","character-right","center","none"]},"confidence":{"type":"number","minimum":0,"maximum":1},"reasons":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128},"maxItems":8}},"required":["role","side","confidence","reasons"]}},"required":["id","name","origin","z","role","side","visible","opacity","parentId","groupId","usage","variantOf","state","positionConfirmed","roleConfirmed","sourceId","sourceName","sourcePath","sourceZ","sourceOrigin","originalAssetId","imageAssetId","sourceHash","imageHash","image","proposal"]},"maxItems":64,"minItems":1},"groups":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"name":{"type":"string","minLength":1,"maxLength":120},"parentGroupId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"visible":{"type":"boolean"},"opacity":{"type":"number","minimum":0,"maximum":1}},"required":["id","name","parentGroupId","visible","opacity"]},"maxItems":128},"missingProperties":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128},"maxItems":32},"omitted":{"type":"array","items":{"type":"string","minLength":1,"maxLength":240},"maxItems":128}},"required":["id","sourceKind","sourceHash","sourceManifest","canvas","layout","layoutConfirmed","limitedAccepted","omittedAccepted","layers","groups","missingProperties","omitted"]}},"required":["version","rigSignature","draft"]}},"required":["projectId","schemaVersion","displayName","sourceType","createdAt","modifiedAt","revision","savedRevision","canvas","inputAssetIds","assets","parts","groups","parameters","partBindings","inputBindings","expressions","runtimeProfile","broadcastProfiles","exportProfiles","provenance","derivedProjects"]};
const func1 = Object.prototype.hasOwnProperty;
const func2 = ucs2length;
const pattern4 = new RegExp("^[A-Za-z0-9][A-Za-z0-9_-]*$", "u");
const pattern5 = new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$", "u");
const pattern10 = new RegExp("^resources/", "u");
const pattern11 = new RegExp("^[a-f0-9]{64}$", "u");
const pattern12 = new RegExp("^\\d+\\.\\d+\\.\\d+$", "u");
const pattern16 = new RegExp("^[a-z][a-z0-9_-]*$", "u");
const pattern44 = new RegExp("^[a-zA-Z][a-zA-Z0-9_]*$", "u");
const pattern72 = new RegExp("^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$", "u");
const pattern82 = new RegExp("^structure-(base|eye_(left|right)-(open|closed)|mouth-(open|closed))\\.png$", "u");

function validate20(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="https://2dsketcher.local/schema/project-1.7" */;
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
if(!((((((((data3 === 0) || (data3 === 1)) || (data3 === 2)) || (data3 === 3)) || (data3 === 4)) || (data3 === 5)) || (data3 === 6)) || (data3 === 7))){
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
if(!(((((key14 === "id") || (key14 === "displayName")) || (key14 === "parentGroupId")) || (key14 === "visible")) || (key14 === "opacity"))){
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
if(data83.opacity !== undefined){
let data88 = data83.opacity;
if((typeof data88 == "number") && (isFinite(data88))){
if(data88 > 1 || isNaN(data88)){
const err315 = {instancePath:instancePath+"/groups/" + i11+"/opacity",schemaPath:"#/properties/groups/items/properties/opacity/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err315];
}
else {
vErrors.push(err315);
}
errors++;
}
if(data88 < 0 || isNaN(data88)){
const err316 = {instancePath:instancePath+"/groups/" + i11+"/opacity",schemaPath:"#/properties/groups/items/properties/opacity/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err317 = {instancePath:instancePath+"/groups/" + i11+"/opacity",schemaPath:"#/properties/groups/items/properties/opacity/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err317];
}
else {
vErrors.push(err317);
}
errors++;
}
}
}
else {
const err318 = {instancePath:instancePath+"/groups/" + i11,schemaPath:"#/properties/groups/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err318];
}
else {
vErrors.push(err318);
}
errors++;
}
}
}
else {
const err319 = {instancePath:instancePath+"/groups",schemaPath:"#/properties/groups/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err319];
}
else {
vErrors.push(err319);
}
errors++;
}
}
if(data.parameters !== undefined){
let data89 = data.parameters;
if(Array.isArray(data89)){
if(data89.length > 128){
const err320 = {instancePath:instancePath+"/parameters",schemaPath:"#/properties/parameters/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err320];
}
else {
vErrors.push(err320);
}
errors++;
}
const len10 = data89.length;
for(let i12=0; i12<len10; i12++){
let data90 = data89[i12];
if(data90 && typeof data90 == "object" && !Array.isArray(data90)){
if(data90.id === undefined){
const err321 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err321];
}
else {
vErrors.push(err321);
}
errors++;
}
if(data90.displayName === undefined){
const err322 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err322];
}
else {
vErrors.push(err322);
}
errors++;
}
if(data90.semantic === undefined){
const err323 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "semantic"},message:"must have required property '"+"semantic"+"'"};
if(vErrors === null){
vErrors = [err323];
}
else {
vErrors.push(err323);
}
errors++;
}
if(data90.unit === undefined){
const err324 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "unit"},message:"must have required property '"+"unit"+"'"};
if(vErrors === null){
vErrors = [err324];
}
else {
vErrors.push(err324);
}
errors++;
}
if(data90.min === undefined){
const err325 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "min"},message:"must have required property '"+"min"+"'"};
if(vErrors === null){
vErrors = [err325];
}
else {
vErrors.push(err325);
}
errors++;
}
if(data90.neutral === undefined){
const err326 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "neutral"},message:"must have required property '"+"neutral"+"'"};
if(vErrors === null){
vErrors = [err326];
}
else {
vErrors.push(err326);
}
errors++;
}
if(data90.max === undefined){
const err327 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "max"},message:"must have required property '"+"max"+"'"};
if(vErrors === null){
vErrors = [err327];
}
else {
vErrors.push(err327);
}
errors++;
}
if(data90.previewKey === undefined){
const err328 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/required",keyword:"required",params:{missingProperty: "previewKey"},message:"must have required property '"+"previewKey"+"'"};
if(vErrors === null){
vErrors = [err328];
}
else {
vErrors.push(err328);
}
errors++;
}
for(const key15 in data90){
if(!((((((((key15 === "id") || (key15 === "displayName")) || (key15 === "semantic")) || (key15 === "unit")) || (key15 === "min")) || (key15 === "neutral")) || (key15 === "max")) || (key15 === "previewKey"))){
const err329 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key15},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err329];
}
else {
vErrors.push(err329);
}
errors++;
}
}
if(data90.id !== undefined){
let data91 = data90.id;
if(typeof data91 === "string"){
if(func2(data91) > 64){
const err330 = {instancePath:instancePath+"/parameters/" + i12+"/id",schemaPath:"#/properties/parameters/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err330];
}
else {
vErrors.push(err330);
}
errors++;
}
if(func2(data91) < 1){
const err331 = {instancePath:instancePath+"/parameters/" + i12+"/id",schemaPath:"#/properties/parameters/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err331];
}
else {
vErrors.push(err331);
}
errors++;
}
if(!pattern4.test(data91)){
const err332 = {instancePath:instancePath+"/parameters/" + i12+"/id",schemaPath:"#/properties/parameters/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
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
const err333 = {instancePath:instancePath+"/parameters/" + i12+"/id",schemaPath:"#/properties/parameters/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err333];
}
else {
vErrors.push(err333);
}
errors++;
}
}
if(data90.displayName !== undefined){
let data92 = data90.displayName;
if(typeof data92 === "string"){
if(func2(data92) > 120){
const err334 = {instancePath:instancePath+"/parameters/" + i12+"/displayName",schemaPath:"#/properties/parameters/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err334];
}
else {
vErrors.push(err334);
}
errors++;
}
if(func2(data92) < 1){
const err335 = {instancePath:instancePath+"/parameters/" + i12+"/displayName",schemaPath:"#/properties/parameters/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err335];
}
else {
vErrors.push(err335);
}
errors++;
}
}
else {
const err336 = {instancePath:instancePath+"/parameters/" + i12+"/displayName",schemaPath:"#/properties/parameters/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err336];
}
else {
vErrors.push(err336);
}
errors++;
}
}
if(data90.semantic !== undefined){
let data93 = data90.semantic;
if(typeof data93 === "string"){
if(func2(data93) > 64){
const err337 = {instancePath:instancePath+"/parameters/" + i12+"/semantic",schemaPath:"#/properties/parameters/items/properties/semantic/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err337];
}
else {
vErrors.push(err337);
}
errors++;
}
if(func2(data93) < 1){
const err338 = {instancePath:instancePath+"/parameters/" + i12+"/semantic",schemaPath:"#/properties/parameters/items/properties/semantic/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err338];
}
else {
vErrors.push(err338);
}
errors++;
}
if(!pattern16.test(data93)){
const err339 = {instancePath:instancePath+"/parameters/" + i12+"/semantic",schemaPath:"#/properties/parameters/items/properties/semantic/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err339];
}
else {
vErrors.push(err339);
}
errors++;
}
}
else {
const err340 = {instancePath:instancePath+"/parameters/" + i12+"/semantic",schemaPath:"#/properties/parameters/items/properties/semantic/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err340];
}
else {
vErrors.push(err340);
}
errors++;
}
}
if(data90.unit !== undefined){
let data94 = data90.unit;
if(!(((data94 === "ratio") || (data94 === "degrees")) || (data94 === "custom"))){
const err341 = {instancePath:instancePath+"/parameters/" + i12+"/unit",schemaPath:"#/properties/parameters/items/properties/unit/enum",keyword:"enum",params:{allowedValues: schema31.properties.parameters.items.properties.unit.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err341];
}
else {
vErrors.push(err341);
}
errors++;
}
}
if(data90.min !== undefined){
let data95 = data90.min;
if(!((typeof data95 == "number") && (isFinite(data95)))){
const err342 = {instancePath:instancePath+"/parameters/" + i12+"/min",schemaPath:"#/properties/parameters/items/properties/min/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err342];
}
else {
vErrors.push(err342);
}
errors++;
}
}
if(data90.neutral !== undefined){
let data96 = data90.neutral;
if(!((typeof data96 == "number") && (isFinite(data96)))){
const err343 = {instancePath:instancePath+"/parameters/" + i12+"/neutral",schemaPath:"#/properties/parameters/items/properties/neutral/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err343];
}
else {
vErrors.push(err343);
}
errors++;
}
}
if(data90.max !== undefined){
let data97 = data90.max;
if(!((typeof data97 == "number") && (isFinite(data97)))){
const err344 = {instancePath:instancePath+"/parameters/" + i12+"/max",schemaPath:"#/properties/parameters/items/properties/max/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err344];
}
else {
vErrors.push(err344);
}
errors++;
}
}
if(data90.previewKey !== undefined){
let data98 = data90.previewKey;
const _errs217 = errors;
let valid44 = false;
const _errs218 = errors;
if(!(((((data98 === "eye_left") || (data98 === "eye_right")) || (data98 === "mouth")) || (data98 === "head_yaw")) || (data98 === "head_roll"))){
const err345 = {instancePath:instancePath+"/parameters/" + i12+"/previewKey",schemaPath:"#/properties/parameters/items/properties/previewKey/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema31.properties.parameters.items.properties.previewKey.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err345];
}
else {
vErrors.push(err345);
}
errors++;
}
var _valid4 = _errs218 === errors;
valid44 = valid44 || _valid4;
const _errs219 = errors;
if(data98 !== null){
const err346 = {instancePath:instancePath+"/parameters/" + i12+"/previewKey",schemaPath:"#/properties/parameters/items/properties/previewKey/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err346];
}
else {
vErrors.push(err346);
}
errors++;
}
var _valid4 = _errs219 === errors;
valid44 = valid44 || _valid4;
if(!valid44){
const err347 = {instancePath:instancePath+"/parameters/" + i12+"/previewKey",schemaPath:"#/properties/parameters/items/properties/previewKey/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err347];
}
else {
vErrors.push(err347);
}
errors++;
}
else {
errors = _errs217;
if(vErrors !== null){
if(_errs217){
vErrors.length = _errs217;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err348 = {instancePath:instancePath+"/parameters/" + i12,schemaPath:"#/properties/parameters/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err348];
}
else {
vErrors.push(err348);
}
errors++;
}
}
}
else {
const err349 = {instancePath:instancePath+"/parameters",schemaPath:"#/properties/parameters/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err349];
}
else {
vErrors.push(err349);
}
errors++;
}
}
if(data.partBindings !== undefined){
let data99 = data.partBindings;
if(Array.isArray(data99)){
if(data99.length > 256){
const err350 = {instancePath:instancePath+"/partBindings",schemaPath:"#/properties/partBindings/maxItems",keyword:"maxItems",params:{limit: 256},message:"must NOT have more than 256 items"};
if(vErrors === null){
vErrors = [err350];
}
else {
vErrors.push(err350);
}
errors++;
}
const len11 = data99.length;
for(let i13=0; i13<len11; i13++){
let data100 = data99[i13];
const _errs224 = errors;
let valid47 = false;
let passing0 = null;
const _errs225 = errors;
if(data100 && typeof data100 == "object" && !Array.isArray(data100)){
if(data100.id === undefined){
const err351 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err351];
}
else {
vErrors.push(err351);
}
errors++;
}
if(data100.parameterId === undefined){
const err352 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err352];
}
else {
vErrors.push(err352);
}
errors++;
}
if(data100.partId === undefined){
const err353 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "partId"},message:"must have required property '"+"partId"+"'"};
if(vErrors === null){
vErrors = [err353];
}
else {
vErrors.push(err353);
}
errors++;
}
if(data100.kind === undefined){
const err354 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err354];
}
else {
vErrors.push(err354);
}
errors++;
}
if(data100.mapping === undefined){
const err355 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "mapping"},message:"must have required property '"+"mapping"+"'"};
if(vErrors === null){
vErrors = [err355];
}
else {
vErrors.push(err355);
}
errors++;
}
for(const key16 in data100){
if(!(((((key16 === "id") || (key16 === "parameterId")) || (key16 === "partId")) || (key16 === "kind")) || (key16 === "mapping"))){
const err356 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key16},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err356];
}
else {
vErrors.push(err356);
}
errors++;
}
}
if(data100.id !== undefined){
let data101 = data100.id;
if(typeof data101 === "string"){
if(func2(data101) > 64){
const err357 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err357];
}
else {
vErrors.push(err357);
}
errors++;
}
if(func2(data101) < 1){
const err358 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err358];
}
else {
vErrors.push(err358);
}
errors++;
}
if(!pattern4.test(data101)){
const err359 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err359];
}
else {
vErrors.push(err359);
}
errors++;
}
}
else {
const err360 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err360];
}
else {
vErrors.push(err360);
}
errors++;
}
}
if(data100.parameterId !== undefined){
let data102 = data100.parameterId;
if(typeof data102 === "string"){
if(func2(data102) > 64){
const err361 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err361];
}
else {
vErrors.push(err361);
}
errors++;
}
if(func2(data102) < 1){
const err362 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err362];
}
else {
vErrors.push(err362);
}
errors++;
}
if(!pattern4.test(data102)){
const err363 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err363];
}
else {
vErrors.push(err363);
}
errors++;
}
}
else {
const err364 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err364];
}
else {
vErrors.push(err364);
}
errors++;
}
}
if(data100.partId !== undefined){
let data103 = data100.partId;
if(typeof data103 === "string"){
if(func2(data103) > 64){
const err365 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/partId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err365];
}
else {
vErrors.push(err365);
}
errors++;
}
if(func2(data103) < 1){
const err366 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/partId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err366];
}
else {
vErrors.push(err366);
}
errors++;
}
if(!pattern4.test(data103)){
const err367 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/partId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err367];
}
else {
vErrors.push(err367);
}
errors++;
}
}
else {
const err368 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/partId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err368];
}
else {
vErrors.push(err368);
}
errors++;
}
}
if(data100.kind !== undefined){
if("state-blend" !== data100.kind){
const err369 = {instancePath:instancePath+"/partBindings/" + i13+"/kind",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/kind/const",keyword:"const",params:{allowedValue: "state-blend"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err369];
}
else {
vErrors.push(err369);
}
errors++;
}
}
if(data100.mapping !== undefined){
let data105 = data100.mapping;
if(data105 && typeof data105 == "object" && !Array.isArray(data105)){
if(data105.minimumState === undefined){
const err370 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/required",keyword:"required",params:{missingProperty: "minimumState"},message:"must have required property '"+"minimumState"+"'"};
if(vErrors === null){
vErrors = [err370];
}
else {
vErrors.push(err370);
}
errors++;
}
if(data105.maximumState === undefined){
const err371 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/required",keyword:"required",params:{missingProperty: "maximumState"},message:"must have required property '"+"maximumState"+"'"};
if(vErrors === null){
vErrors = [err371];
}
else {
vErrors.push(err371);
}
errors++;
}
for(const key17 in data105){
if(!(((key17 === "minimumState") || (key17 === "maximumState")) || (key17 === "middleState"))){
const err372 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key17},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err372];
}
else {
vErrors.push(err372);
}
errors++;
}
}
if(data105.minimumState !== undefined){
let data106 = data105.minimumState;
if(typeof data106 === "string"){
if(func2(data106) > 32){
const err373 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/minimumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/minimumState/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err373];
}
else {
vErrors.push(err373);
}
errors++;
}
if(func2(data106) < 1){
const err374 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/minimumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/minimumState/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
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
const err375 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/minimumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/minimumState/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err375];
}
else {
vErrors.push(err375);
}
errors++;
}
}
if(data105.maximumState !== undefined){
let data107 = data105.maximumState;
if(typeof data107 === "string"){
if(func2(data107) > 32){
const err376 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/maximumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/maximumState/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err376];
}
else {
vErrors.push(err376);
}
errors++;
}
if(func2(data107) < 1){
const err377 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/maximumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/maximumState/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
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
const err378 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/maximumState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/maximumState/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err378];
}
else {
vErrors.push(err378);
}
errors++;
}
}
if(data105.middleState !== undefined){
let data108 = data105.middleState;
if(typeof data108 === "string"){
if(func2(data108) > 32){
const err379 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/middleState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/middleState/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err379];
}
else {
vErrors.push(err379);
}
errors++;
}
if(func2(data108) < 1){
const err380 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/middleState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/middleState/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err380];
}
else {
vErrors.push(err380);
}
errors++;
}
}
else {
const err381 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/middleState",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/properties/middleState/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err381];
}
else {
vErrors.push(err381);
}
errors++;
}
}
}
else {
const err382 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/0/properties/mapping/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err382];
}
else {
vErrors.push(err382);
}
errors++;
}
}
}
else {
const err383 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err383];
}
else {
vErrors.push(err383);
}
errors++;
}
var _valid5 = _errs225 === errors;
if(_valid5){
valid47 = true;
passing0 = 0;
var props0 = true;
}
const _errs244 = errors;
if(data100 && typeof data100 == "object" && !Array.isArray(data100)){
if(data100.id === undefined){
const err384 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err384];
}
else {
vErrors.push(err384);
}
errors++;
}
if(data100.parameterId === undefined){
const err385 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err385];
}
else {
vErrors.push(err385);
}
errors++;
}
if(data100.partId === undefined){
const err386 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "partId"},message:"must have required property '"+"partId"+"'"};
if(vErrors === null){
vErrors = [err386];
}
else {
vErrors.push(err386);
}
errors++;
}
if(data100.kind === undefined){
const err387 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err387];
}
else {
vErrors.push(err387);
}
errors++;
}
if(data100.mapping === undefined){
const err388 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "mapping"},message:"must have required property '"+"mapping"+"'"};
if(vErrors === null){
vErrors = [err388];
}
else {
vErrors.push(err388);
}
errors++;
}
for(const key18 in data100){
if(!(((((key18 === "id") || (key18 === "parameterId")) || (key18 === "partId")) || (key18 === "kind")) || (key18 === "mapping"))){
const err389 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key18},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err389];
}
else {
vErrors.push(err389);
}
errors++;
}
}
if(data100.id !== undefined){
let data109 = data100.id;
if(typeof data109 === "string"){
if(func2(data109) > 64){
const err390 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err390];
}
else {
vErrors.push(err390);
}
errors++;
}
if(func2(data109) < 1){
const err391 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err391];
}
else {
vErrors.push(err391);
}
errors++;
}
if(!pattern4.test(data109)){
const err392 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
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
const err393 = {instancePath:instancePath+"/partBindings/" + i13+"/id",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err393];
}
else {
vErrors.push(err393);
}
errors++;
}
}
if(data100.parameterId !== undefined){
let data110 = data100.parameterId;
if(typeof data110 === "string"){
if(func2(data110) > 64){
const err394 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err394];
}
else {
vErrors.push(err394);
}
errors++;
}
if(func2(data110) < 1){
const err395 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err395];
}
else {
vErrors.push(err395);
}
errors++;
}
if(!pattern4.test(data110)){
const err396 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err396];
}
else {
vErrors.push(err396);
}
errors++;
}
}
else {
const err397 = {instancePath:instancePath+"/partBindings/" + i13+"/parameterId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err397];
}
else {
vErrors.push(err397);
}
errors++;
}
}
if(data100.partId !== undefined){
let data111 = data100.partId;
if(typeof data111 === "string"){
if(func2(data111) > 64){
const err398 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/partId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err398];
}
else {
vErrors.push(err398);
}
errors++;
}
if(func2(data111) < 1){
const err399 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/partId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err399];
}
else {
vErrors.push(err399);
}
errors++;
}
if(!pattern4.test(data111)){
const err400 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/partId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
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
const err401 = {instancePath:instancePath+"/partBindings/" + i13+"/partId",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/partId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err401];
}
else {
vErrors.push(err401);
}
errors++;
}
}
if(data100.kind !== undefined){
if("transform" !== data100.kind){
const err402 = {instancePath:instancePath+"/partBindings/" + i13+"/kind",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/kind/const",keyword:"const",params:{allowedValue: "transform"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err402];
}
else {
vErrors.push(err402);
}
errors++;
}
}
if(data100.mapping !== undefined){
let data113 = data100.mapping;
if(data113 && typeof data113 == "object" && !Array.isArray(data113)){
if(data113.component === undefined){
const err403 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/required",keyword:"required",params:{missingProperty: "component"},message:"must have required property '"+"component"+"'"};
if(vErrors === null){
vErrors = [err403];
}
else {
vErrors.push(err403);
}
errors++;
}
if(data113.outputRange === undefined){
const err404 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/required",keyword:"required",params:{missingProperty: "outputRange"},message:"must have required property '"+"outputRange"+"'"};
if(vErrors === null){
vErrors = [err404];
}
else {
vErrors.push(err404);
}
errors++;
}
for(const key19 in data113){
if(!((key19 === "component") || (key19 === "outputRange"))){
const err405 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key19},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err405];
}
else {
vErrors.push(err405);
}
errors++;
}
}
if(data113.component !== undefined){
let data114 = data113.component;
if(!(((((data114 === "rotate-degrees") || (data114 === "translate-x")) || (data114 === "translate-y")) || (data114 === "scale-x")) || (data114 === "scale-y"))){
const err406 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/component",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/properties/component/enum",keyword:"enum",params:{allowedValues: schema31.properties.partBindings.items.oneOf[1].properties.mapping.properties.component.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err406];
}
else {
vErrors.push(err406);
}
errors++;
}
}
if(data113.outputRange !== undefined){
let data115 = data113.outputRange;
if(Array.isArray(data115)){
if(data115.length > 2){
const err407 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/outputRange",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/properties/outputRange/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err407];
}
else {
vErrors.push(err407);
}
errors++;
}
if(data115.length < 2){
const err408 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/outputRange",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/properties/outputRange/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err408];
}
else {
vErrors.push(err408);
}
errors++;
}
const len12 = data115.length;
for(let i14=0; i14<len12; i14++){
let data116 = data115[i14];
if(!((typeof data116 == "number") && (isFinite(data116)))){
const err409 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/outputRange/" + i14,schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/properties/outputRange/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err409];
}
else {
vErrors.push(err409);
}
errors++;
}
}
}
else {
const err410 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping/outputRange",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/properties/outputRange/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err410];
}
else {
vErrors.push(err410);
}
errors++;
}
}
}
else {
const err411 = {instancePath:instancePath+"/partBindings/" + i13+"/mapping",schemaPath:"#/properties/partBindings/items/oneOf/1/properties/mapping/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err411];
}
else {
vErrors.push(err411);
}
errors++;
}
}
}
else {
const err412 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf/1/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err412];
}
else {
vErrors.push(err412);
}
errors++;
}
var _valid5 = _errs244 === errors;
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
const err413 = {instancePath:instancePath+"/partBindings/" + i13,schemaPath:"#/properties/partBindings/items/oneOf",keyword:"oneOf",params:{passingSchemas: passing0},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err413];
}
else {
vErrors.push(err413);
}
errors++;
}
else {
errors = _errs224;
if(vErrors !== null){
if(_errs224){
vErrors.length = _errs224;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err414 = {instancePath:instancePath+"/partBindings",schemaPath:"#/properties/partBindings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err414];
}
else {
vErrors.push(err414);
}
errors++;
}
}
if(data.inputBindings !== undefined){
let data117 = data.inputBindings;
if(Array.isArray(data117)){
if(data117.length > 128){
const err415 = {instancePath:instancePath+"/inputBindings",schemaPath:"#/properties/inputBindings/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err415];
}
else {
vErrors.push(err415);
}
errors++;
}
const len13 = data117.length;
for(let i15=0; i15<len13; i15++){
let data118 = data117[i15];
if(data118 && typeof data118 == "object" && !Array.isArray(data118)){
if(data118.id === undefined){
const err416 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err416];
}
else {
vErrors.push(err416);
}
errors++;
}
if(data118.source === undefined){
const err417 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "source"},message:"must have required property '"+"source"+"'"};
if(vErrors === null){
vErrors = [err417];
}
else {
vErrors.push(err417);
}
errors++;
}
if(data118.channel === undefined){
const err418 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "channel"},message:"must have required property '"+"channel"+"'"};
if(vErrors === null){
vErrors = [err418];
}
else {
vErrors.push(err418);
}
errors++;
}
if(data118.parameterId === undefined){
const err419 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err419];
}
else {
vErrors.push(err419);
}
errors++;
}
if(data118.inputRange === undefined){
const err420 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "inputRange"},message:"must have required property '"+"inputRange"+"'"};
if(vErrors === null){
vErrors = [err420];
}
else {
vErrors.push(err420);
}
errors++;
}
if(data118.invert === undefined){
const err421 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "invert"},message:"must have required property '"+"invert"+"'"};
if(vErrors === null){
vErrors = [err421];
}
else {
vErrors.push(err421);
}
errors++;
}
if(data118.gain === undefined){
const err422 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "gain"},message:"must have required property '"+"gain"+"'"};
if(vErrors === null){
vErrors = [err422];
}
else {
vErrors.push(err422);
}
errors++;
}
if(data118.offset === undefined){
const err423 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "offset"},message:"must have required property '"+"offset"+"'"};
if(vErrors === null){
vErrors = [err423];
}
else {
vErrors.push(err423);
}
errors++;
}
if(data118.smoothingMs === undefined){
const err424 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "smoothingMs"},message:"must have required property '"+"smoothingMs"+"'"};
if(vErrors === null){
vErrors = [err424];
}
else {
vErrors.push(err424);
}
errors++;
}
if(data118.fallback === undefined){
const err425 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/required",keyword:"required",params:{missingProperty: "fallback"},message:"must have required property '"+"fallback"+"'"};
if(vErrors === null){
vErrors = [err425];
}
else {
vErrors.push(err425);
}
errors++;
}
for(const key20 in data118){
if(!(func1.call(schema31.properties.inputBindings.items.properties, key20))){
const err426 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key20},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err426];
}
else {
vErrors.push(err426);
}
errors++;
}
}
if(data118.id !== undefined){
let data119 = data118.id;
if(typeof data119 === "string"){
if(func2(data119) > 64){
const err427 = {instancePath:instancePath+"/inputBindings/" + i15+"/id",schemaPath:"#/properties/inputBindings/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err427];
}
else {
vErrors.push(err427);
}
errors++;
}
if(func2(data119) < 1){
const err428 = {instancePath:instancePath+"/inputBindings/" + i15+"/id",schemaPath:"#/properties/inputBindings/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err428];
}
else {
vErrors.push(err428);
}
errors++;
}
if(!pattern4.test(data119)){
const err429 = {instancePath:instancePath+"/inputBindings/" + i15+"/id",schemaPath:"#/properties/inputBindings/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err429];
}
else {
vErrors.push(err429);
}
errors++;
}
}
else {
const err430 = {instancePath:instancePath+"/inputBindings/" + i15+"/id",schemaPath:"#/properties/inputBindings/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err430];
}
else {
vErrors.push(err430);
}
errors++;
}
}
if(data118.source !== undefined){
let data120 = data118.source;
if(!(((data120 === "face") || (data120 === "microphone")) || (data120 === "manual"))){
const err431 = {instancePath:instancePath+"/inputBindings/" + i15+"/source",schemaPath:"#/properties/inputBindings/items/properties/source/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputBindings.items.properties.source.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err431];
}
else {
vErrors.push(err431);
}
errors++;
}
}
if(data118.channel !== undefined){
let data121 = data118.channel;
if(typeof data121 === "string"){
if(func2(data121) > 64){
const err432 = {instancePath:instancePath+"/inputBindings/" + i15+"/channel",schemaPath:"#/properties/inputBindings/items/properties/channel/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err432];
}
else {
vErrors.push(err432);
}
errors++;
}
if(func2(data121) < 1){
const err433 = {instancePath:instancePath+"/inputBindings/" + i15+"/channel",schemaPath:"#/properties/inputBindings/items/properties/channel/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err433];
}
else {
vErrors.push(err433);
}
errors++;
}
if(!pattern16.test(data121)){
const err434 = {instancePath:instancePath+"/inputBindings/" + i15+"/channel",schemaPath:"#/properties/inputBindings/items/properties/channel/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err434];
}
else {
vErrors.push(err434);
}
errors++;
}
}
else {
const err435 = {instancePath:instancePath+"/inputBindings/" + i15+"/channel",schemaPath:"#/properties/inputBindings/items/properties/channel/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err435];
}
else {
vErrors.push(err435);
}
errors++;
}
}
if(data118.parameterId !== undefined){
let data122 = data118.parameterId;
if(typeof data122 === "string"){
if(func2(data122) > 64){
const err436 = {instancePath:instancePath+"/inputBindings/" + i15+"/parameterId",schemaPath:"#/properties/inputBindings/items/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err436];
}
else {
vErrors.push(err436);
}
errors++;
}
if(func2(data122) < 1){
const err437 = {instancePath:instancePath+"/inputBindings/" + i15+"/parameterId",schemaPath:"#/properties/inputBindings/items/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err437];
}
else {
vErrors.push(err437);
}
errors++;
}
if(!pattern4.test(data122)){
const err438 = {instancePath:instancePath+"/inputBindings/" + i15+"/parameterId",schemaPath:"#/properties/inputBindings/items/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err438];
}
else {
vErrors.push(err438);
}
errors++;
}
}
else {
const err439 = {instancePath:instancePath+"/inputBindings/" + i15+"/parameterId",schemaPath:"#/properties/inputBindings/items/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err439];
}
else {
vErrors.push(err439);
}
errors++;
}
}
if(data118.inputRange !== undefined){
let data123 = data118.inputRange;
if(Array.isArray(data123)){
if(data123.length > 2){
const err440 = {instancePath:instancePath+"/inputBindings/" + i15+"/inputRange",schemaPath:"#/properties/inputBindings/items/properties/inputRange/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err440];
}
else {
vErrors.push(err440);
}
errors++;
}
if(data123.length < 2){
const err441 = {instancePath:instancePath+"/inputBindings/" + i15+"/inputRange",schemaPath:"#/properties/inputBindings/items/properties/inputRange/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err441];
}
else {
vErrors.push(err441);
}
errors++;
}
const len14 = data123.length;
for(let i16=0; i16<len14; i16++){
let data124 = data123[i16];
if(!((typeof data124 == "number") && (isFinite(data124)))){
const err442 = {instancePath:instancePath+"/inputBindings/" + i15+"/inputRange/" + i16,schemaPath:"#/properties/inputBindings/items/properties/inputRange/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
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
const err443 = {instancePath:instancePath+"/inputBindings/" + i15+"/inputRange",schemaPath:"#/properties/inputBindings/items/properties/inputRange/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err443];
}
else {
vErrors.push(err443);
}
errors++;
}
}
if(data118.invert !== undefined){
if(typeof data118.invert !== "boolean"){
const err444 = {instancePath:instancePath+"/inputBindings/" + i15+"/invert",schemaPath:"#/properties/inputBindings/items/properties/invert/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err444];
}
else {
vErrors.push(err444);
}
errors++;
}
}
if(data118.gain !== undefined){
let data126 = data118.gain;
if((typeof data126 == "number") && (isFinite(data126))){
if(data126 > 10 || isNaN(data126)){
const err445 = {instancePath:instancePath+"/inputBindings/" + i15+"/gain",schemaPath:"#/properties/inputBindings/items/properties/gain/maximum",keyword:"maximum",params:{comparison: "<=", limit: 10},message:"must be <= 10"};
if(vErrors === null){
vErrors = [err445];
}
else {
vErrors.push(err445);
}
errors++;
}
if(data126 < 0 || isNaN(data126)){
const err446 = {instancePath:instancePath+"/inputBindings/" + i15+"/gain",schemaPath:"#/properties/inputBindings/items/properties/gain/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err446];
}
else {
vErrors.push(err446);
}
errors++;
}
}
else {
const err447 = {instancePath:instancePath+"/inputBindings/" + i15+"/gain",schemaPath:"#/properties/inputBindings/items/properties/gain/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err447];
}
else {
vErrors.push(err447);
}
errors++;
}
}
if(data118.offset !== undefined){
let data127 = data118.offset;
if(!((typeof data127 == "number") && (isFinite(data127)))){
const err448 = {instancePath:instancePath+"/inputBindings/" + i15+"/offset",schemaPath:"#/properties/inputBindings/items/properties/offset/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err448];
}
else {
vErrors.push(err448);
}
errors++;
}
}
if(data118.smoothingMs !== undefined){
let data128 = data118.smoothingMs;
if(!(((typeof data128 == "number") && (!(data128 % 1) && !isNaN(data128))) && (isFinite(data128)))){
const err449 = {instancePath:instancePath+"/inputBindings/" + i15+"/smoothingMs",schemaPath:"#/properties/inputBindings/items/properties/smoothingMs/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err449];
}
else {
vErrors.push(err449);
}
errors++;
}
if((typeof data128 == "number") && (isFinite(data128))){
if(data128 > 10000 || isNaN(data128)){
const err450 = {instancePath:instancePath+"/inputBindings/" + i15+"/smoothingMs",schemaPath:"#/properties/inputBindings/items/properties/smoothingMs/maximum",keyword:"maximum",params:{comparison: "<=", limit: 10000},message:"must be <= 10000"};
if(vErrors === null){
vErrors = [err450];
}
else {
vErrors.push(err450);
}
errors++;
}
if(data128 < 0 || isNaN(data128)){
const err451 = {instancePath:instancePath+"/inputBindings/" + i15+"/smoothingMs",schemaPath:"#/properties/inputBindings/items/properties/smoothingMs/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err451];
}
else {
vErrors.push(err451);
}
errors++;
}
}
}
if(data118.fallback !== undefined){
let data129 = data118.fallback;
if(data129 && typeof data129 == "object" && !Array.isArray(data129)){
if(data129.mode === undefined){
const err452 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback",schemaPath:"#/properties/inputBindings/items/properties/fallback/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err452];
}
else {
vErrors.push(err452);
}
errors++;
}
if(data129.value === undefined){
const err453 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback",schemaPath:"#/properties/inputBindings/items/properties/fallback/required",keyword:"required",params:{missingProperty: "value"},message:"must have required property '"+"value"+"'"};
if(vErrors === null){
vErrors = [err453];
}
else {
vErrors.push(err453);
}
errors++;
}
if(data129.returnMs === undefined){
const err454 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback",schemaPath:"#/properties/inputBindings/items/properties/fallback/required",keyword:"required",params:{missingProperty: "returnMs"},message:"must have required property '"+"returnMs"+"'"};
if(vErrors === null){
vErrors = [err454];
}
else {
vErrors.push(err454);
}
errors++;
}
for(const key21 in data129){
if(!(((key21 === "mode") || (key21 === "value")) || (key21 === "returnMs"))){
const err455 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback",schemaPath:"#/properties/inputBindings/items/properties/fallback/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key21},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err455];
}
else {
vErrors.push(err455);
}
errors++;
}
}
if(data129.mode !== undefined){
let data130 = data129.mode;
if(!(((data130 === "neutral") || (data130 === "hold")) || (data130 === "constant"))){
const err456 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback/mode",schemaPath:"#/properties/inputBindings/items/properties/fallback/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputBindings.items.properties.fallback.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err456];
}
else {
vErrors.push(err456);
}
errors++;
}
}
if(data129.value !== undefined){
let data131 = data129.value;
if(!((typeof data131 == "number") && (isFinite(data131)))){
const err457 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback/value",schemaPath:"#/properties/inputBindings/items/properties/fallback/properties/value/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err457];
}
else {
vErrors.push(err457);
}
errors++;
}
}
if(data129.returnMs !== undefined){
let data132 = data129.returnMs;
if(!(((typeof data132 == "number") && (!(data132 % 1) && !isNaN(data132))) && (isFinite(data132)))){
const err458 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback/returnMs",schemaPath:"#/properties/inputBindings/items/properties/fallback/properties/returnMs/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err458];
}
else {
vErrors.push(err458);
}
errors++;
}
if((typeof data132 == "number") && (isFinite(data132))){
if(data132 > 10000 || isNaN(data132)){
const err459 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback/returnMs",schemaPath:"#/properties/inputBindings/items/properties/fallback/properties/returnMs/maximum",keyword:"maximum",params:{comparison: "<=", limit: 10000},message:"must be <= 10000"};
if(vErrors === null){
vErrors = [err459];
}
else {
vErrors.push(err459);
}
errors++;
}
if(data132 < 0 || isNaN(data132)){
const err460 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback/returnMs",schemaPath:"#/properties/inputBindings/items/properties/fallback/properties/returnMs/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err460];
}
else {
vErrors.push(err460);
}
errors++;
}
}
}
}
else {
const err461 = {instancePath:instancePath+"/inputBindings/" + i15+"/fallback",schemaPath:"#/properties/inputBindings/items/properties/fallback/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err461];
}
else {
vErrors.push(err461);
}
errors++;
}
}
}
else {
const err462 = {instancePath:instancePath+"/inputBindings/" + i15,schemaPath:"#/properties/inputBindings/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err462];
}
else {
vErrors.push(err462);
}
errors++;
}
}
}
else {
const err463 = {instancePath:instancePath+"/inputBindings",schemaPath:"#/properties/inputBindings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err463];
}
else {
vErrors.push(err463);
}
errors++;
}
}
if(data.expressions !== undefined){
let data133 = data.expressions;
if(Array.isArray(data133)){
if(data133.length > 64){
const err464 = {instancePath:instancePath+"/expressions",schemaPath:"#/properties/expressions/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err464];
}
else {
vErrors.push(err464);
}
errors++;
}
const len15 = data133.length;
for(let i17=0; i17<len15; i17++){
let data134 = data133[i17];
if(data134 && typeof data134 == "object" && !Array.isArray(data134)){
if(data134.id === undefined){
const err465 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err465];
}
else {
vErrors.push(err465);
}
errors++;
}
if(data134.displayName === undefined){
const err466 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err466];
}
else {
vErrors.push(err466);
}
errors++;
}
if(data134.values === undefined){
const err467 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/required",keyword:"required",params:{missingProperty: "values"},message:"must have required property '"+"values"+"'"};
if(vErrors === null){
vErrors = [err467];
}
else {
vErrors.push(err467);
}
errors++;
}
if(data134.transitionMs === undefined){
const err468 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/required",keyword:"required",params:{missingProperty: "transitionMs"},message:"must have required property '"+"transitionMs"+"'"};
if(vErrors === null){
vErrors = [err468];
}
else {
vErrors.push(err468);
}
errors++;
}
if(data134.release === undefined){
const err469 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/required",keyword:"required",params:{missingProperty: "release"},message:"must have required property '"+"release"+"'"};
if(vErrors === null){
vErrors = [err469];
}
else {
vErrors.push(err469);
}
errors++;
}
for(const key22 in data134){
if(!(((((key22 === "id") || (key22 === "displayName")) || (key22 === "values")) || (key22 === "transitionMs")) || (key22 === "release"))){
const err470 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key22},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err470];
}
else {
vErrors.push(err470);
}
errors++;
}
}
if(data134.id !== undefined){
let data135 = data134.id;
if(typeof data135 === "string"){
if(func2(data135) > 64){
const err471 = {instancePath:instancePath+"/expressions/" + i17+"/id",schemaPath:"#/properties/expressions/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err471];
}
else {
vErrors.push(err471);
}
errors++;
}
if(func2(data135) < 1){
const err472 = {instancePath:instancePath+"/expressions/" + i17+"/id",schemaPath:"#/properties/expressions/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err472];
}
else {
vErrors.push(err472);
}
errors++;
}
if(!pattern4.test(data135)){
const err473 = {instancePath:instancePath+"/expressions/" + i17+"/id",schemaPath:"#/properties/expressions/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
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
const err474 = {instancePath:instancePath+"/expressions/" + i17+"/id",schemaPath:"#/properties/expressions/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err474];
}
else {
vErrors.push(err474);
}
errors++;
}
}
if(data134.displayName !== undefined){
let data136 = data134.displayName;
if(typeof data136 === "string"){
if(func2(data136) > 120){
const err475 = {instancePath:instancePath+"/expressions/" + i17+"/displayName",schemaPath:"#/properties/expressions/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err475];
}
else {
vErrors.push(err475);
}
errors++;
}
if(func2(data136) < 1){
const err476 = {instancePath:instancePath+"/expressions/" + i17+"/displayName",schemaPath:"#/properties/expressions/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err476];
}
else {
vErrors.push(err476);
}
errors++;
}
}
else {
const err477 = {instancePath:instancePath+"/expressions/" + i17+"/displayName",schemaPath:"#/properties/expressions/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err477];
}
else {
vErrors.push(err477);
}
errors++;
}
}
if(data134.values !== undefined){
let data137 = data134.values;
if(Array.isArray(data137)){
if(data137.length > 128){
const err478 = {instancePath:instancePath+"/expressions/" + i17+"/values",schemaPath:"#/properties/expressions/items/properties/values/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err478];
}
else {
vErrors.push(err478);
}
errors++;
}
const len16 = data137.length;
for(let i18=0; i18<len16; i18++){
let data138 = data137[i18];
if(data138 && typeof data138 == "object" && !Array.isArray(data138)){
if(data138.parameterId === undefined){
const err479 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18,schemaPath:"#/properties/expressions/items/properties/values/items/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err479];
}
else {
vErrors.push(err479);
}
errors++;
}
if(data138.value === undefined){
const err480 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18,schemaPath:"#/properties/expressions/items/properties/values/items/required",keyword:"required",params:{missingProperty: "value"},message:"must have required property '"+"value"+"'"};
if(vErrors === null){
vErrors = [err480];
}
else {
vErrors.push(err480);
}
errors++;
}
if(data138.locked === undefined){
const err481 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18,schemaPath:"#/properties/expressions/items/properties/values/items/required",keyword:"required",params:{missingProperty: "locked"},message:"must have required property '"+"locked"+"'"};
if(vErrors === null){
vErrors = [err481];
}
else {
vErrors.push(err481);
}
errors++;
}
for(const key23 in data138){
if(!(((key23 === "parameterId") || (key23 === "value")) || (key23 === "locked"))){
const err482 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18,schemaPath:"#/properties/expressions/items/properties/values/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key23},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err482];
}
else {
vErrors.push(err482);
}
errors++;
}
}
if(data138.parameterId !== undefined){
let data139 = data138.parameterId;
if(typeof data139 === "string"){
if(func2(data139) > 64){
const err483 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/parameterId",schemaPath:"#/properties/expressions/items/properties/values/items/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err483];
}
else {
vErrors.push(err483);
}
errors++;
}
if(func2(data139) < 1){
const err484 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/parameterId",schemaPath:"#/properties/expressions/items/properties/values/items/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err484];
}
else {
vErrors.push(err484);
}
errors++;
}
if(!pattern4.test(data139)){
const err485 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/parameterId",schemaPath:"#/properties/expressions/items/properties/values/items/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err485];
}
else {
vErrors.push(err485);
}
errors++;
}
}
else {
const err486 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/parameterId",schemaPath:"#/properties/expressions/items/properties/values/items/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err486];
}
else {
vErrors.push(err486);
}
errors++;
}
}
if(data138.value !== undefined){
let data140 = data138.value;
if(!((typeof data140 == "number") && (isFinite(data140)))){
const err487 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/value",schemaPath:"#/properties/expressions/items/properties/values/items/properties/value/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err487];
}
else {
vErrors.push(err487);
}
errors++;
}
}
if(data138.locked !== undefined){
if(typeof data138.locked !== "boolean"){
const err488 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18+"/locked",schemaPath:"#/properties/expressions/items/properties/values/items/properties/locked/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err488];
}
else {
vErrors.push(err488);
}
errors++;
}
}
}
else {
const err489 = {instancePath:instancePath+"/expressions/" + i17+"/values/" + i18,schemaPath:"#/properties/expressions/items/properties/values/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err489];
}
else {
vErrors.push(err489);
}
errors++;
}
}
}
else {
const err490 = {instancePath:instancePath+"/expressions/" + i17+"/values",schemaPath:"#/properties/expressions/items/properties/values/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err490];
}
else {
vErrors.push(err490);
}
errors++;
}
}
if(data134.transitionMs !== undefined){
let data142 = data134.transitionMs;
if(!(((typeof data142 == "number") && (!(data142 % 1) && !isNaN(data142))) && (isFinite(data142)))){
const err491 = {instancePath:instancePath+"/expressions/" + i17+"/transitionMs",schemaPath:"#/properties/expressions/items/properties/transitionMs/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err491];
}
else {
vErrors.push(err491);
}
errors++;
}
if((typeof data142 == "number") && (isFinite(data142))){
if(data142 > 10000 || isNaN(data142)){
const err492 = {instancePath:instancePath+"/expressions/" + i17+"/transitionMs",schemaPath:"#/properties/expressions/items/properties/transitionMs/maximum",keyword:"maximum",params:{comparison: "<=", limit: 10000},message:"must be <= 10000"};
if(vErrors === null){
vErrors = [err492];
}
else {
vErrors.push(err492);
}
errors++;
}
if(data142 < 0 || isNaN(data142)){
const err493 = {instancePath:instancePath+"/expressions/" + i17+"/transitionMs",schemaPath:"#/properties/expressions/items/properties/transitionMs/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err493];
}
else {
vErrors.push(err493);
}
errors++;
}
}
}
if(data134.release !== undefined){
let data143 = data134.release;
if(!((data143 === "live-input") || (data143 === "neutral"))){
const err494 = {instancePath:instancePath+"/expressions/" + i17+"/release",schemaPath:"#/properties/expressions/items/properties/release/enum",keyword:"enum",params:{allowedValues: schema31.properties.expressions.items.properties.release.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err494];
}
else {
vErrors.push(err494);
}
errors++;
}
}
}
else {
const err495 = {instancePath:instancePath+"/expressions/" + i17,schemaPath:"#/properties/expressions/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err495];
}
else {
vErrors.push(err495);
}
errors++;
}
}
}
else {
const err496 = {instancePath:instancePath+"/expressions",schemaPath:"#/properties/expressions/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err496];
}
else {
vErrors.push(err496);
}
errors++;
}
}
if(data.runtimeProfile !== undefined){
let data144 = data.runtimeProfile;
if(data144 && typeof data144 == "object" && !Array.isArray(data144)){
if(data144.id === undefined){
const err497 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err497];
}
else {
vErrors.push(err497);
}
errors++;
}
if(data144.revision === undefined){
const err498 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err498];
}
else {
vErrors.push(err498);
}
errors++;
}
if(data144.mode === undefined){
const err499 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err499];
}
else {
vErrors.push(err499);
}
errors++;
}
if(data144.mirror === undefined){
const err500 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/required",keyword:"required",params:{missingProperty: "mirror"},message:"must have required property '"+"mirror"+"'"};
if(vErrors === null){
vErrors = [err500];
}
else {
vErrors.push(err500);
}
errors++;
}
if(data144.fallbackExpressionId === undefined){
const err501 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/required",keyword:"required",params:{missingProperty: "fallbackExpressionId"},message:"must have required property '"+"fallbackExpressionId"+"'"};
if(vErrors === null){
vErrors = [err501];
}
else {
vErrors.push(err501);
}
errors++;
}
for(const key24 in data144){
if(!(((((key24 === "id") || (key24 === "revision")) || (key24 === "mode")) || (key24 === "mirror")) || (key24 === "fallbackExpressionId"))){
const err502 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key24},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err502];
}
else {
vErrors.push(err502);
}
errors++;
}
}
if(data144.id !== undefined){
let data145 = data144.id;
if(typeof data145 === "string"){
if(func2(data145) > 64){
const err503 = {instancePath:instancePath+"/runtimeProfile/id",schemaPath:"#/properties/runtimeProfile/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err503];
}
else {
vErrors.push(err503);
}
errors++;
}
if(func2(data145) < 1){
const err504 = {instancePath:instancePath+"/runtimeProfile/id",schemaPath:"#/properties/runtimeProfile/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err504];
}
else {
vErrors.push(err504);
}
errors++;
}
if(!pattern4.test(data145)){
const err505 = {instancePath:instancePath+"/runtimeProfile/id",schemaPath:"#/properties/runtimeProfile/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err505];
}
else {
vErrors.push(err505);
}
errors++;
}
}
else {
const err506 = {instancePath:instancePath+"/runtimeProfile/id",schemaPath:"#/properties/runtimeProfile/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err506];
}
else {
vErrors.push(err506);
}
errors++;
}
}
if(data144.revision !== undefined){
let data146 = data144.revision;
if(!(((typeof data146 == "number") && (!(data146 % 1) && !isNaN(data146))) && (isFinite(data146)))){
const err507 = {instancePath:instancePath+"/runtimeProfile/revision",schemaPath:"#/properties/runtimeProfile/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err507];
}
else {
vErrors.push(err507);
}
errors++;
}
if((typeof data146 == "number") && (isFinite(data146))){
if(data146 > 9007199254740991 || isNaN(data146)){
const err508 = {instancePath:instancePath+"/runtimeProfile/revision",schemaPath:"#/properties/runtimeProfile/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err508];
}
else {
vErrors.push(err508);
}
errors++;
}
if(data146 < 0 || isNaN(data146)){
const err509 = {instancePath:instancePath+"/runtimeProfile/revision",schemaPath:"#/properties/runtimeProfile/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err509];
}
else {
vErrors.push(err509);
}
errors++;
}
}
}
if(data144.mode !== undefined){
let data147 = data144.mode;
if(!((((data147 === "idle") || (data147 === "camera")) || (data147 === "microphone")) || (data147 === "camera-microphone"))){
const err510 = {instancePath:instancePath+"/runtimeProfile/mode",schemaPath:"#/properties/runtimeProfile/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.runtimeProfile.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err510];
}
else {
vErrors.push(err510);
}
errors++;
}
}
if(data144.mirror !== undefined){
if(typeof data144.mirror !== "boolean"){
const err511 = {instancePath:instancePath+"/runtimeProfile/mirror",schemaPath:"#/properties/runtimeProfile/properties/mirror/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err511];
}
else {
vErrors.push(err511);
}
errors++;
}
}
if(data144.fallbackExpressionId !== undefined){
let data149 = data144.fallbackExpressionId;
const _errs328 = errors;
let valid67 = false;
const _errs329 = errors;
if(typeof data149 === "string"){
if(func2(data149) > 64){
const err512 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err512];
}
else {
vErrors.push(err512);
}
errors++;
}
if(func2(data149) < 1){
const err513 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err513];
}
else {
vErrors.push(err513);
}
errors++;
}
if(!pattern4.test(data149)){
const err514 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err514];
}
else {
vErrors.push(err514);
}
errors++;
}
}
else {
const err515 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err515];
}
else {
vErrors.push(err515);
}
errors++;
}
var _valid6 = _errs329 === errors;
valid67 = valid67 || _valid6;
const _errs331 = errors;
if(data149 !== null){
const err516 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err516];
}
else {
vErrors.push(err516);
}
errors++;
}
var _valid6 = _errs331 === errors;
valid67 = valid67 || _valid6;
if(!valid67){
const err517 = {instancePath:instancePath+"/runtimeProfile/fallbackExpressionId",schemaPath:"#/properties/runtimeProfile/properties/fallbackExpressionId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err517];
}
else {
vErrors.push(err517);
}
errors++;
}
else {
errors = _errs328;
if(vErrors !== null){
if(_errs328){
vErrors.length = _errs328;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err518 = {instancePath:instancePath+"/runtimeProfile",schemaPath:"#/properties/runtimeProfile/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err518];
}
else {
vErrors.push(err518);
}
errors++;
}
}
if(data.broadcastProfiles !== undefined){
let data150 = data.broadcastProfiles;
if(Array.isArray(data150)){
if(data150.length > 16){
const err519 = {instancePath:instancePath+"/broadcastProfiles",schemaPath:"#/properties/broadcastProfiles/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err519];
}
else {
vErrors.push(err519);
}
errors++;
}
const len17 = data150.length;
for(let i19=0; i19<len17; i19++){
let data151 = data150[i19];
if(data151 && typeof data151 == "object" && !Array.isArray(data151)){
if(data151.id === undefined){
const err520 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err520];
}
else {
vErrors.push(err520);
}
errors++;
}
if(data151.revision === undefined){
const err521 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err521];
}
else {
vErrors.push(err521);
}
errors++;
}
if(data151.displayName === undefined){
const err522 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err522];
}
else {
vErrors.push(err522);
}
errors++;
}
if(data151.width === undefined){
const err523 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err523];
}
else {
vErrors.push(err523);
}
errors++;
}
if(data151.height === undefined){
const err524 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err524];
}
else {
vErrors.push(err524);
}
errors++;
}
if(data151.fps === undefined){
const err525 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "fps"},message:"must have required property '"+"fps"+"'"};
if(vErrors === null){
vErrors = [err525];
}
else {
vErrors.push(err525);
}
errors++;
}
if(data151.transparent === undefined){
const err526 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "transparent"},message:"must have required property '"+"transparent"+"'"};
if(vErrors === null){
vErrors = [err526];
}
else {
vErrors.push(err526);
}
errors++;
}
if(data151.region === undefined){
const err527 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "region"},message:"must have required property '"+"region"+"'"};
if(vErrors === null){
vErrors = [err527];
}
else {
vErrors.push(err527);
}
errors++;
}
if(data151.fit === undefined){
const err528 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/required",keyword:"required",params:{missingProperty: "fit"},message:"must have required property '"+"fit"+"'"};
if(vErrors === null){
vErrors = [err528];
}
else {
vErrors.push(err528);
}
errors++;
}
for(const key25 in data151){
if(!(func1.call(schema31.properties.broadcastProfiles.items.properties, key25))){
const err529 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key25},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err529];
}
else {
vErrors.push(err529);
}
errors++;
}
}
if(data151.id !== undefined){
let data152 = data151.id;
if(typeof data152 === "string"){
if(func2(data152) > 64){
const err530 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/id",schemaPath:"#/properties/broadcastProfiles/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err530];
}
else {
vErrors.push(err530);
}
errors++;
}
if(func2(data152) < 1){
const err531 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/id",schemaPath:"#/properties/broadcastProfiles/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err531];
}
else {
vErrors.push(err531);
}
errors++;
}
if(!pattern4.test(data152)){
const err532 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/id",schemaPath:"#/properties/broadcastProfiles/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err532];
}
else {
vErrors.push(err532);
}
errors++;
}
}
else {
const err533 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/id",schemaPath:"#/properties/broadcastProfiles/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err533];
}
else {
vErrors.push(err533);
}
errors++;
}
}
if(data151.revision !== undefined){
let data153 = data151.revision;
if(!(((typeof data153 == "number") && (!(data153 % 1) && !isNaN(data153))) && (isFinite(data153)))){
const err534 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/revision",schemaPath:"#/properties/broadcastProfiles/items/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err534];
}
else {
vErrors.push(err534);
}
errors++;
}
if((typeof data153 == "number") && (isFinite(data153))){
if(data153 > 9007199254740991 || isNaN(data153)){
const err535 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/revision",schemaPath:"#/properties/broadcastProfiles/items/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err535];
}
else {
vErrors.push(err535);
}
errors++;
}
if(data153 < 0 || isNaN(data153)){
const err536 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/revision",schemaPath:"#/properties/broadcastProfiles/items/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err536];
}
else {
vErrors.push(err536);
}
errors++;
}
}
}
if(data151.displayName !== undefined){
let data154 = data151.displayName;
if(typeof data154 === "string"){
if(func2(data154) > 120){
const err537 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/displayName",schemaPath:"#/properties/broadcastProfiles/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err537];
}
else {
vErrors.push(err537);
}
errors++;
}
if(func2(data154) < 1){
const err538 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/displayName",schemaPath:"#/properties/broadcastProfiles/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err538];
}
else {
vErrors.push(err538);
}
errors++;
}
}
else {
const err539 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/displayName",schemaPath:"#/properties/broadcastProfiles/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err539];
}
else {
vErrors.push(err539);
}
errors++;
}
}
if(data151.width !== undefined){
let data155 = data151.width;
if(!(((typeof data155 == "number") && (!(data155 % 1) && !isNaN(data155))) && (isFinite(data155)))){
const err540 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/width",schemaPath:"#/properties/broadcastProfiles/items/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err541 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/width",schemaPath:"#/properties/broadcastProfiles/items/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 8192},message:"must be <= 8192"};
if(vErrors === null){
vErrors = [err541];
}
else {
vErrors.push(err541);
}
errors++;
}
if(data155 < 1 || isNaN(data155)){
const err542 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/width",schemaPath:"#/properties/broadcastProfiles/items/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
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
if(data151.height !== undefined){
let data156 = data151.height;
if(!(((typeof data156 == "number") && (!(data156 % 1) && !isNaN(data156))) && (isFinite(data156)))){
const err543 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/height",schemaPath:"#/properties/broadcastProfiles/items/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err543];
}
else {
vErrors.push(err543);
}
errors++;
}
if((typeof data156 == "number") && (isFinite(data156))){
if(data156 > 8192 || isNaN(data156)){
const err544 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/height",schemaPath:"#/properties/broadcastProfiles/items/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 8192},message:"must be <= 8192"};
if(vErrors === null){
vErrors = [err544];
}
else {
vErrors.push(err544);
}
errors++;
}
if(data156 < 1 || isNaN(data156)){
const err545 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/height",schemaPath:"#/properties/broadcastProfiles/items/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
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
if(data151.fps !== undefined){
let data157 = data151.fps;
if(!(((typeof data157 == "number") && (!(data157 % 1) && !isNaN(data157))) && (isFinite(data157)))){
const err546 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/fps",schemaPath:"#/properties/broadcastProfiles/items/properties/fps/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err546];
}
else {
vErrors.push(err546);
}
errors++;
}
if((typeof data157 == "number") && (isFinite(data157))){
if(data157 > 120 || isNaN(data157)){
const err547 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/fps",schemaPath:"#/properties/broadcastProfiles/items/properties/fps/maximum",keyword:"maximum",params:{comparison: "<=", limit: 120},message:"must be <= 120"};
if(vErrors === null){
vErrors = [err547];
}
else {
vErrors.push(err547);
}
errors++;
}
if(data157 < 1 || isNaN(data157)){
const err548 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/fps",schemaPath:"#/properties/broadcastProfiles/items/properties/fps/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err548];
}
else {
vErrors.push(err548);
}
errors++;
}
}
}
if(data151.transparent !== undefined){
if(typeof data151.transparent !== "boolean"){
const err549 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/transparent",schemaPath:"#/properties/broadcastProfiles/items/properties/transparent/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err549];
}
else {
vErrors.push(err549);
}
errors++;
}
}
if(data151.region !== undefined){
let data159 = data151.region;
if(data159 && typeof data159 == "object" && !Array.isArray(data159)){
if(data159.x === undefined){
const err550 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err550];
}
else {
vErrors.push(err550);
}
errors++;
}
if(data159.y === undefined){
const err551 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err551];
}
else {
vErrors.push(err551);
}
errors++;
}
if(data159.width === undefined){
const err552 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err552];
}
else {
vErrors.push(err552);
}
errors++;
}
if(data159.height === undefined){
const err553 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err553];
}
else {
vErrors.push(err553);
}
errors++;
}
for(const key26 in data159){
if(!((((key26 === "x") || (key26 === "y")) || (key26 === "width")) || (key26 === "height"))){
const err554 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key26},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err554];
}
else {
vErrors.push(err554);
}
errors++;
}
}
if(data159.x !== undefined){
let data160 = data159.x;
if(!((typeof data160 == "number") && (isFinite(data160)))){
const err555 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/x",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err555];
}
else {
vErrors.push(err555);
}
errors++;
}
}
if(data159.y !== undefined){
let data161 = data159.y;
if(!((typeof data161 == "number") && (isFinite(data161)))){
const err556 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/y",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err556];
}
else {
vErrors.push(err556);
}
errors++;
}
}
if(data159.width !== undefined){
let data162 = data159.width;
if((typeof data162 == "number") && (isFinite(data162))){
if(data162 <= 0 || isNaN(data162)){
const err557 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/width",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err557];
}
else {
vErrors.push(err557);
}
errors++;
}
}
else {
const err558 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/width",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err558];
}
else {
vErrors.push(err558);
}
errors++;
}
}
if(data159.height !== undefined){
let data163 = data159.height;
if((typeof data163 == "number") && (isFinite(data163))){
if(data163 <= 0 || isNaN(data163)){
const err559 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/height",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
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
const err560 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region/height",schemaPath:"#/properties/broadcastProfiles/items/properties/region/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
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
const err561 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/region",schemaPath:"#/properties/broadcastProfiles/items/properties/region/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err561];
}
else {
vErrors.push(err561);
}
errors++;
}
}
if(data151.fit !== undefined){
let data164 = data151.fit;
if(!((data164 === "contain") || (data164 === "cover"))){
const err562 = {instancePath:instancePath+"/broadcastProfiles/" + i19+"/fit",schemaPath:"#/properties/broadcastProfiles/items/properties/fit/enum",keyword:"enum",params:{allowedValues: schema31.properties.broadcastProfiles.items.properties.fit.enum},message:"must be equal to one of the allowed values"};
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
const err563 = {instancePath:instancePath+"/broadcastProfiles/" + i19,schemaPath:"#/properties/broadcastProfiles/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
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
const err564 = {instancePath:instancePath+"/broadcastProfiles",schemaPath:"#/properties/broadcastProfiles/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err564];
}
else {
vErrors.push(err564);
}
errors++;
}
}
if(data.exportProfiles !== undefined){
let data165 = data.exportProfiles;
if(Array.isArray(data165)){
if(data165.length > 16){
const err565 = {instancePath:instancePath+"/exportProfiles",schemaPath:"#/properties/exportProfiles/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err565];
}
else {
vErrors.push(err565);
}
errors++;
}
const len18 = data165.length;
for(let i20=0; i20<len18; i20++){
let data166 = data165[i20];
if(data166 && typeof data166 == "object" && !Array.isArray(data166)){
if(data166.id === undefined){
const err566 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err566];
}
else {
vErrors.push(err566);
}
errors++;
}
if(data166.revision === undefined){
const err567 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err567];
}
else {
vErrors.push(err567);
}
errors++;
}
if(data166.displayName === undefined){
const err568 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err568];
}
else {
vErrors.push(err568);
}
errors++;
}
if(data166.target === undefined){
const err569 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "target"},message:"must have required property '"+"target"+"'"};
if(vErrors === null){
vErrors = [err569];
}
else {
vErrors.push(err569);
}
errors++;
}
if(data166.targetVersion === undefined){
const err570 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "targetVersion"},message:"must have required property '"+"targetVersion"+"'"};
if(vErrors === null){
vErrors = [err570];
}
else {
vErrors.push(err570);
}
errors++;
}
if(data166.format === undefined){
const err571 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "format"},message:"must have required property '"+"format"+"'"};
if(vErrors === null){
vErrors = [err571];
}
else {
vErrors.push(err571);
}
errors++;
}
if(data166.converterVersion === undefined){
const err572 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "converterVersion"},message:"must have required property '"+"converterVersion"+"'"};
if(vErrors === null){
vErrors = [err572];
}
else {
vErrors.push(err572);
}
errors++;
}
if(data166.parameterMap === undefined){
const err573 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/required",keyword:"required",params:{missingProperty: "parameterMap"},message:"must have required property '"+"parameterMap"+"'"};
if(vErrors === null){
vErrors = [err573];
}
else {
vErrors.push(err573);
}
errors++;
}
for(const key27 in data166){
if(!((((((((key27 === "id") || (key27 === "revision")) || (key27 === "displayName")) || (key27 === "target")) || (key27 === "targetVersion")) || (key27 === "format")) || (key27 === "converterVersion")) || (key27 === "parameterMap"))){
const err574 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key27},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err574];
}
else {
vErrors.push(err574);
}
errors++;
}
}
if(data166.id !== undefined){
let data167 = data166.id;
if(typeof data167 === "string"){
if(func2(data167) > 64){
const err575 = {instancePath:instancePath+"/exportProfiles/" + i20+"/id",schemaPath:"#/properties/exportProfiles/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err575];
}
else {
vErrors.push(err575);
}
errors++;
}
if(func2(data167) < 1){
const err576 = {instancePath:instancePath+"/exportProfiles/" + i20+"/id",schemaPath:"#/properties/exportProfiles/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err576];
}
else {
vErrors.push(err576);
}
errors++;
}
if(!pattern4.test(data167)){
const err577 = {instancePath:instancePath+"/exportProfiles/" + i20+"/id",schemaPath:"#/properties/exportProfiles/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err577];
}
else {
vErrors.push(err577);
}
errors++;
}
}
else {
const err578 = {instancePath:instancePath+"/exportProfiles/" + i20+"/id",schemaPath:"#/properties/exportProfiles/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err578];
}
else {
vErrors.push(err578);
}
errors++;
}
}
if(data166.revision !== undefined){
let data168 = data166.revision;
if(!(((typeof data168 == "number") && (!(data168 % 1) && !isNaN(data168))) && (isFinite(data168)))){
const err579 = {instancePath:instancePath+"/exportProfiles/" + i20+"/revision",schemaPath:"#/properties/exportProfiles/items/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err579];
}
else {
vErrors.push(err579);
}
errors++;
}
if((typeof data168 == "number") && (isFinite(data168))){
if(data168 > 9007199254740991 || isNaN(data168)){
const err580 = {instancePath:instancePath+"/exportProfiles/" + i20+"/revision",schemaPath:"#/properties/exportProfiles/items/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err580];
}
else {
vErrors.push(err580);
}
errors++;
}
if(data168 < 0 || isNaN(data168)){
const err581 = {instancePath:instancePath+"/exportProfiles/" + i20+"/revision",schemaPath:"#/properties/exportProfiles/items/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err581];
}
else {
vErrors.push(err581);
}
errors++;
}
}
}
if(data166.displayName !== undefined){
let data169 = data166.displayName;
if(typeof data169 === "string"){
if(func2(data169) > 120){
const err582 = {instancePath:instancePath+"/exportProfiles/" + i20+"/displayName",schemaPath:"#/properties/exportProfiles/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err582];
}
else {
vErrors.push(err582);
}
errors++;
}
if(func2(data169) < 1){
const err583 = {instancePath:instancePath+"/exportProfiles/" + i20+"/displayName",schemaPath:"#/properties/exportProfiles/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
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
const err584 = {instancePath:instancePath+"/exportProfiles/" + i20+"/displayName",schemaPath:"#/properties/exportProfiles/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err584];
}
else {
vErrors.push(err584);
}
errors++;
}
}
if(data166.target !== undefined){
if(!(data166.target === "inochi2d")){
const err585 = {instancePath:instancePath+"/exportProfiles/" + i20+"/target",schemaPath:"#/properties/exportProfiles/items/properties/target/enum",keyword:"enum",params:{allowedValues: schema31.properties.exportProfiles.items.properties.target.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err585];
}
else {
vErrors.push(err585);
}
errors++;
}
}
if(data166.targetVersion !== undefined){
let data171 = data166.targetVersion;
if(typeof data171 === "string"){
if(func2(data171) > 32){
const err586 = {instancePath:instancePath+"/exportProfiles/" + i20+"/targetVersion",schemaPath:"#/properties/exportProfiles/items/properties/targetVersion/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err586];
}
else {
vErrors.push(err586);
}
errors++;
}
if(func2(data171) < 1){
const err587 = {instancePath:instancePath+"/exportProfiles/" + i20+"/targetVersion",schemaPath:"#/properties/exportProfiles/items/properties/targetVersion/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err587];
}
else {
vErrors.push(err587);
}
errors++;
}
if(!pattern12.test(data171)){
const err588 = {instancePath:instancePath+"/exportProfiles/" + i20+"/targetVersion",schemaPath:"#/properties/exportProfiles/items/properties/targetVersion/pattern",keyword:"pattern",params:{pattern: "^\\d+\\.\\d+\\.\\d+$"},message:"must match pattern \""+"^\\d+\\.\\d+\\.\\d+$"+"\""};
if(vErrors === null){
vErrors = [err588];
}
else {
vErrors.push(err588);
}
errors++;
}
}
else {
const err589 = {instancePath:instancePath+"/exportProfiles/" + i20+"/targetVersion",schemaPath:"#/properties/exportProfiles/items/properties/targetVersion/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err589];
}
else {
vErrors.push(err589);
}
errors++;
}
}
if(data166.format !== undefined){
if(!(data166.format === "inp")){
const err590 = {instancePath:instancePath+"/exportProfiles/" + i20+"/format",schemaPath:"#/properties/exportProfiles/items/properties/format/enum",keyword:"enum",params:{allowedValues: schema31.properties.exportProfiles.items.properties.format.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err590];
}
else {
vErrors.push(err590);
}
errors++;
}
}
if(data166.converterVersion !== undefined){
let data173 = data166.converterVersion;
if(typeof data173 === "string"){
if(func2(data173) > 32){
const err591 = {instancePath:instancePath+"/exportProfiles/" + i20+"/converterVersion",schemaPath:"#/properties/exportProfiles/items/properties/converterVersion/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err591];
}
else {
vErrors.push(err591);
}
errors++;
}
if(func2(data173) < 1){
const err592 = {instancePath:instancePath+"/exportProfiles/" + i20+"/converterVersion",schemaPath:"#/properties/exportProfiles/items/properties/converterVersion/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err592];
}
else {
vErrors.push(err592);
}
errors++;
}
if(!pattern12.test(data173)){
const err593 = {instancePath:instancePath+"/exportProfiles/" + i20+"/converterVersion",schemaPath:"#/properties/exportProfiles/items/properties/converterVersion/pattern",keyword:"pattern",params:{pattern: "^\\d+\\.\\d+\\.\\d+$"},message:"must match pattern \""+"^\\d+\\.\\d+\\.\\d+$"+"\""};
if(vErrors === null){
vErrors = [err593];
}
else {
vErrors.push(err593);
}
errors++;
}
}
else {
const err594 = {instancePath:instancePath+"/exportProfiles/" + i20+"/converterVersion",schemaPath:"#/properties/exportProfiles/items/properties/converterVersion/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err594];
}
else {
vErrors.push(err594);
}
errors++;
}
}
if(data166.parameterMap !== undefined){
let data174 = data166.parameterMap;
if(Array.isArray(data174)){
if(data174.length > 128){
const err595 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err595];
}
else {
vErrors.push(err595);
}
errors++;
}
const len19 = data174.length;
for(let i21=0; i21<len19; i21++){
let data175 = data174[i21];
if(data175 && typeof data175 == "object" && !Array.isArray(data175)){
if(data175.parameterId === undefined){
const err596 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21,schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err596];
}
else {
vErrors.push(err596);
}
errors++;
}
if(data175.targetName === undefined){
const err597 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21,schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/required",keyword:"required",params:{missingProperty: "targetName"},message:"must have required property '"+"targetName"+"'"};
if(vErrors === null){
vErrors = [err597];
}
else {
vErrors.push(err597);
}
errors++;
}
for(const key28 in data175){
if(!((key28 === "parameterId") || (key28 === "targetName"))){
const err598 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21,schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key28},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err598];
}
else {
vErrors.push(err598);
}
errors++;
}
}
if(data175.parameterId !== undefined){
let data176 = data175.parameterId;
if(typeof data176 === "string"){
if(func2(data176) > 64){
const err599 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/parameterId",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err599];
}
else {
vErrors.push(err599);
}
errors++;
}
if(func2(data176) < 1){
const err600 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/parameterId",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err600];
}
else {
vErrors.push(err600);
}
errors++;
}
if(!pattern4.test(data176)){
const err601 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/parameterId",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err601];
}
else {
vErrors.push(err601);
}
errors++;
}
}
else {
const err602 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/parameterId",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err602];
}
else {
vErrors.push(err602);
}
errors++;
}
}
if(data175.targetName !== undefined){
let data177 = data175.targetName;
if(typeof data177 === "string"){
if(func2(data177) > 64){
const err603 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/targetName",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/targetName/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err603];
}
else {
vErrors.push(err603);
}
errors++;
}
if(func2(data177) < 1){
const err604 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/targetName",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/targetName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err604];
}
else {
vErrors.push(err604);
}
errors++;
}
if(!pattern44.test(data177)){
const err605 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/targetName",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/targetName/pattern",keyword:"pattern",params:{pattern: "^[a-zA-Z][a-zA-Z0-9_]*$"},message:"must match pattern \""+"^[a-zA-Z][a-zA-Z0-9_]*$"+"\""};
if(vErrors === null){
vErrors = [err605];
}
else {
vErrors.push(err605);
}
errors++;
}
}
else {
const err606 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21+"/targetName",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/properties/targetName/type",keyword:"type",params:{type: "string"},message:"must be string"};
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
const err607 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap/" + i21,schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err607];
}
else {
vErrors.push(err607);
}
errors++;
}
}
}
else {
const err608 = {instancePath:instancePath+"/exportProfiles/" + i20+"/parameterMap",schemaPath:"#/properties/exportProfiles/items/properties/parameterMap/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err608];
}
else {
vErrors.push(err608);
}
errors++;
}
}
}
else {
const err609 = {instancePath:instancePath+"/exportProfiles/" + i20,schemaPath:"#/properties/exportProfiles/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err609];
}
else {
vErrors.push(err609);
}
errors++;
}
}
}
else {
const err610 = {instancePath:instancePath+"/exportProfiles",schemaPath:"#/properties/exportProfiles/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err610];
}
else {
vErrors.push(err610);
}
errors++;
}
}
if(data.provenance !== undefined){
let data178 = data.provenance;
if(data178 && typeof data178 == "object" && !Array.isArray(data178)){
if(data178.preparation === undefined){
const err611 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/required",keyword:"required",params:{missingProperty: "preparation"},message:"must have required property '"+"preparation"+"'"};
if(vErrors === null){
vErrors = [err611];
}
else {
vErrors.push(err611);
}
errors++;
}
if(data178.limitations === undefined){
const err612 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/required",keyword:"required",params:{missingProperty: "limitations"},message:"must have required property '"+"limitations"+"'"};
if(vErrors === null){
vErrors = [err612];
}
else {
vErrors.push(err612);
}
errors++;
}
for(const key29 in data178){
if(!((key29 === "preparation") || (key29 === "limitations"))){
const err613 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key29},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err613];
}
else {
vErrors.push(err613);
}
errors++;
}
}
if(data178.preparation !== undefined){
let data179 = data178.preparation;
if(typeof data179 === "string"){
if(func2(data179) > 512){
const err614 = {instancePath:instancePath+"/provenance/preparation",schemaPath:"#/properties/provenance/properties/preparation/maxLength",keyword:"maxLength",params:{limit: 512},message:"must NOT have more than 512 characters"};
if(vErrors === null){
vErrors = [err614];
}
else {
vErrors.push(err614);
}
errors++;
}
if(func2(data179) < 1){
const err615 = {instancePath:instancePath+"/provenance/preparation",schemaPath:"#/properties/provenance/properties/preparation/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err615];
}
else {
vErrors.push(err615);
}
errors++;
}
}
else {
const err616 = {instancePath:instancePath+"/provenance/preparation",schemaPath:"#/properties/provenance/properties/preparation/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err616];
}
else {
vErrors.push(err616);
}
errors++;
}
}
if(data178.limitations !== undefined){
let data180 = data178.limitations;
if(Array.isArray(data180)){
if(data180.length > 128){
const err617 = {instancePath:instancePath+"/provenance/limitations",schemaPath:"#/properties/provenance/properties/limitations/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err617];
}
else {
vErrors.push(err617);
}
errors++;
}
const len20 = data180.length;
for(let i22=0; i22<len20; i22++){
let data181 = data180[i22];
if(typeof data181 === "string"){
if(func2(data181) > 512){
const err618 = {instancePath:instancePath+"/provenance/limitations/" + i22,schemaPath:"#/properties/provenance/properties/limitations/items/maxLength",keyword:"maxLength",params:{limit: 512},message:"must NOT have more than 512 characters"};
if(vErrors === null){
vErrors = [err618];
}
else {
vErrors.push(err618);
}
errors++;
}
if(func2(data181) < 1){
const err619 = {instancePath:instancePath+"/provenance/limitations/" + i22,schemaPath:"#/properties/provenance/properties/limitations/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err619];
}
else {
vErrors.push(err619);
}
errors++;
}
}
else {
const err620 = {instancePath:instancePath+"/provenance/limitations/" + i22,schemaPath:"#/properties/provenance/properties/limitations/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
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
const err621 = {instancePath:instancePath+"/provenance/limitations",schemaPath:"#/properties/provenance/properties/limitations/type",keyword:"type",params:{type: "array"},message:"must be array"};
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
const err622 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err622];
}
else {
vErrors.push(err622);
}
errors++;
}
}
if(data.derivedProjects !== undefined){
let data182 = data.derivedProjects;
if(Array.isArray(data182)){
if(data182.length > 32){
const err623 = {instancePath:instancePath+"/derivedProjects",schemaPath:"#/properties/derivedProjects/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err623];
}
else {
vErrors.push(err623);
}
errors++;
}
const len21 = data182.length;
for(let i23=0; i23<len21; i23++){
let data183 = data182[i23];
if(data183 && typeof data183 == "object" && !Array.isArray(data183)){
if(data183.projectId === undefined){
const err624 = {instancePath:instancePath+"/derivedProjects/" + i23,schemaPath:"#/properties/derivedProjects/items/required",keyword:"required",params:{missingProperty: "projectId"},message:"must have required property '"+"projectId"+"'"};
if(vErrors === null){
vErrors = [err624];
}
else {
vErrors.push(err624);
}
errors++;
}
if(data183.relation === undefined){
const err625 = {instancePath:instancePath+"/derivedProjects/" + i23,schemaPath:"#/properties/derivedProjects/items/required",keyword:"required",params:{missingProperty: "relation"},message:"must have required property '"+"relation"+"'"};
if(vErrors === null){
vErrors = [err625];
}
else {
vErrors.push(err625);
}
errors++;
}
for(const key30 in data183){
if(!((key30 === "projectId") || (key30 === "relation"))){
const err626 = {instancePath:instancePath+"/derivedProjects/" + i23,schemaPath:"#/properties/derivedProjects/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key30},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err626];
}
else {
vErrors.push(err626);
}
errors++;
}
}
if(data183.projectId !== undefined){
let data184 = data183.projectId;
if(typeof data184 === "string"){
if(func2(data184) > 64){
const err627 = {instancePath:instancePath+"/derivedProjects/" + i23+"/projectId",schemaPath:"#/properties/derivedProjects/items/properties/projectId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err627];
}
else {
vErrors.push(err627);
}
errors++;
}
if(func2(data184) < 1){
const err628 = {instancePath:instancePath+"/derivedProjects/" + i23+"/projectId",schemaPath:"#/properties/derivedProjects/items/properties/projectId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err628];
}
else {
vErrors.push(err628);
}
errors++;
}
if(!pattern4.test(data184)){
const err629 = {instancePath:instancePath+"/derivedProjects/" + i23+"/projectId",schemaPath:"#/properties/derivedProjects/items/properties/projectId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err629];
}
else {
vErrors.push(err629);
}
errors++;
}
}
else {
const err630 = {instancePath:instancePath+"/derivedProjects/" + i23+"/projectId",schemaPath:"#/properties/derivedProjects/items/properties/projectId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err630];
}
else {
vErrors.push(err630);
}
errors++;
}
}
if(data183.relation !== undefined){
let data185 = data183.relation;
if(!((data185 === "3d") || (data185 === "generated-variant"))){
const err631 = {instancePath:instancePath+"/derivedProjects/" + i23+"/relation",schemaPath:"#/properties/derivedProjects/items/properties/relation/enum",keyword:"enum",params:{allowedValues: schema31.properties.derivedProjects.items.properties.relation.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err631];
}
else {
vErrors.push(err631);
}
errors++;
}
}
}
else {
const err632 = {instancePath:instancePath+"/derivedProjects/" + i23,schemaPath:"#/properties/derivedProjects/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err632];
}
else {
vErrors.push(err632);
}
errors++;
}
}
}
else {
const err633 = {instancePath:instancePath+"/derivedProjects",schemaPath:"#/properties/derivedProjects/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err633];
}
else {
vErrors.push(err633);
}
errors++;
}
}
if(data.motion !== undefined){
let data186 = data.motion;
if(data186 && typeof data186 == "object" && !Array.isArray(data186)){
if(data186.version === undefined){
const err634 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err634];
}
else {
vErrors.push(err634);
}
errors++;
}
if(data186.faceWidth === undefined){
const err635 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "faceWidth"},message:"must have required property '"+"faceWidth"+"'"};
if(vErrors === null){
vErrors = [err635];
}
else {
vErrors.push(err635);
}
errors++;
}
if(data186.maxRollDegrees === undefined){
const err636 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "maxRollDegrees"},message:"must have required property '"+"maxRollDegrees"+"'"};
if(vErrors === null){
vErrors = [err636];
}
else {
vErrors.push(err636);
}
errors++;
}
if(data186.secondary === undefined){
const err637 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "secondary"},message:"must have required property '"+"secondary"+"'"};
if(vErrors === null){
vErrors = [err637];
}
else {
vErrors.push(err637);
}
errors++;
}
if(data186.settings === undefined){
const err638 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "settings"},message:"must have required property '"+"settings"+"'"};
if(vErrors === null){
vErrors = [err638];
}
else {
vErrors.push(err638);
}
errors++;
}
if(data186.meshes === undefined){
const err639 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/required",keyword:"required",params:{missingProperty: "meshes"},message:"must have required property '"+"meshes"+"'"};
if(vErrors === null){
vErrors = [err639];
}
else {
vErrors.push(err639);
}
errors++;
}
for(const key31 in data186){
if(!((((((key31 === "version") || (key31 === "faceWidth")) || (key31 === "maxRollDegrees")) || (key31 === "secondary")) || (key31 === "settings")) || (key31 === "meshes"))){
const err640 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key31},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err640];
}
else {
vErrors.push(err640);
}
errors++;
}
}
if(data186.version !== undefined){
if(1 !== data186.version){
const err641 = {instancePath:instancePath+"/motion/version",schemaPath:"#/properties/motion/properties/version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err641];
}
else {
vErrors.push(err641);
}
errors++;
}
}
if(data186.faceWidth !== undefined){
let data188 = data186.faceWidth;
if((typeof data188 == "number") && (isFinite(data188))){
if(data188 <= 0 || isNaN(data188)){
const err642 = {instancePath:instancePath+"/motion/faceWidth",schemaPath:"#/properties/motion/properties/faceWidth/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
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
const err643 = {instancePath:instancePath+"/motion/faceWidth",schemaPath:"#/properties/motion/properties/faceWidth/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err643];
}
else {
vErrors.push(err643);
}
errors++;
}
}
if(data186.maxRollDegrees !== undefined){
let data189 = data186.maxRollDegrees;
if((typeof data189 == "number") && (isFinite(data189))){
if(data189 > 6 || isNaN(data189)){
const err644 = {instancePath:instancePath+"/motion/maxRollDegrees",schemaPath:"#/properties/motion/properties/maxRollDegrees/maximum",keyword:"maximum",params:{comparison: "<=", limit: 6},message:"must be <= 6"};
if(vErrors === null){
vErrors = [err644];
}
else {
vErrors.push(err644);
}
errors++;
}
if(data189 < 0 || isNaN(data189)){
const err645 = {instancePath:instancePath+"/motion/maxRollDegrees",schemaPath:"#/properties/motion/properties/maxRollDegrees/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err645];
}
else {
vErrors.push(err645);
}
errors++;
}
}
else {
const err646 = {instancePath:instancePath+"/motion/maxRollDegrees",schemaPath:"#/properties/motion/properties/maxRollDegrees/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err646];
}
else {
vErrors.push(err646);
}
errors++;
}
}
if(data186.secondary !== undefined){
if("disabled" !== data186.secondary){
const err647 = {instancePath:instancePath+"/motion/secondary",schemaPath:"#/properties/motion/properties/secondary/const",keyword:"const",params:{allowedValue: "disabled"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err647];
}
else {
vErrors.push(err647);
}
errors++;
}
}
if(data186.settings !== undefined){
let data191 = data186.settings;
if(data191 && typeof data191 == "object" && !Array.isArray(data191)){
if(data191.strength === undefined){
const err648 = {instancePath:instancePath+"/motion/settings",schemaPath:"#/properties/motion/properties/settings/required",keyword:"required",params:{missingProperty: "strength"},message:"must have required property '"+"strength"+"'"};
if(vErrors === null){
vErrors = [err648];
}
else {
vErrors.push(err648);
}
errors++;
}
if(data191.smoothingMs === undefined){
const err649 = {instancePath:instancePath+"/motion/settings",schemaPath:"#/properties/motion/properties/settings/required",keyword:"required",params:{missingProperty: "smoothingMs"},message:"must have required property '"+"smoothingMs"+"'"};
if(vErrors === null){
vErrors = [err649];
}
else {
vErrors.push(err649);
}
errors++;
}
if(data191.pose === undefined){
const err650 = {instancePath:instancePath+"/motion/settings",schemaPath:"#/properties/motion/properties/settings/required",keyword:"required",params:{missingProperty: "pose"},message:"must have required property '"+"pose"+"'"};
if(vErrors === null){
vErrors = [err650];
}
else {
vErrors.push(err650);
}
errors++;
}
for(const key32 in data191){
if(!(((key32 === "strength") || (key32 === "smoothingMs")) || (key32 === "pose"))){
const err651 = {instancePath:instancePath+"/motion/settings",schemaPath:"#/properties/motion/properties/settings/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key32},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err651];
}
else {
vErrors.push(err651);
}
errors++;
}
}
if(data191.strength !== undefined){
let data192 = data191.strength;
if((typeof data192 == "number") && (isFinite(data192))){
if(data192 > 1 || isNaN(data192)){
const err652 = {instancePath:instancePath+"/motion/settings/strength",schemaPath:"#/properties/motion/properties/settings/properties/strength/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err652];
}
else {
vErrors.push(err652);
}
errors++;
}
if(data192 < 0 || isNaN(data192)){
const err653 = {instancePath:instancePath+"/motion/settings/strength",schemaPath:"#/properties/motion/properties/settings/properties/strength/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err653];
}
else {
vErrors.push(err653);
}
errors++;
}
}
else {
const err654 = {instancePath:instancePath+"/motion/settings/strength",schemaPath:"#/properties/motion/properties/settings/properties/strength/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err654];
}
else {
vErrors.push(err654);
}
errors++;
}
}
if(data191.smoothingMs !== undefined){
let data193 = data191.smoothingMs;
if(!(((typeof data193 == "number") && (!(data193 % 1) && !isNaN(data193))) && (isFinite(data193)))){
const err655 = {instancePath:instancePath+"/motion/settings/smoothingMs",schemaPath:"#/properties/motion/properties/settings/properties/smoothingMs/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err655];
}
else {
vErrors.push(err655);
}
errors++;
}
if((typeof data193 == "number") && (isFinite(data193))){
if(data193 > 1000 || isNaN(data193)){
const err656 = {instancePath:instancePath+"/motion/settings/smoothingMs",schemaPath:"#/properties/motion/properties/settings/properties/smoothingMs/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1000},message:"must be <= 1000"};
if(vErrors === null){
vErrors = [err656];
}
else {
vErrors.push(err656);
}
errors++;
}
if(data193 < 0 || isNaN(data193)){
const err657 = {instancePath:instancePath+"/motion/settings/smoothingMs",schemaPath:"#/properties/motion/properties/settings/properties/smoothingMs/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err657];
}
else {
vErrors.push(err657);
}
errors++;
}
}
}
if(data191.pose !== undefined){
let data194 = data191.pose;
if(Array.isArray(data194)){
if(data194.length > 128){
const err658 = {instancePath:instancePath+"/motion/settings/pose",schemaPath:"#/properties/motion/properties/settings/properties/pose/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err658];
}
else {
vErrors.push(err658);
}
errors++;
}
const len22 = data194.length;
for(let i24=0; i24<len22; i24++){
let data195 = data194[i24];
if(data195 && typeof data195 == "object" && !Array.isArray(data195)){
if(data195.parameterId === undefined){
const err659 = {instancePath:instancePath+"/motion/settings/pose/" + i24,schemaPath:"#/properties/motion/properties/settings/properties/pose/items/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err659];
}
else {
vErrors.push(err659);
}
errors++;
}
if(data195.value === undefined){
const err660 = {instancePath:instancePath+"/motion/settings/pose/" + i24,schemaPath:"#/properties/motion/properties/settings/properties/pose/items/required",keyword:"required",params:{missingProperty: "value"},message:"must have required property '"+"value"+"'"};
if(vErrors === null){
vErrors = [err660];
}
else {
vErrors.push(err660);
}
errors++;
}
for(const key33 in data195){
if(!((key33 === "parameterId") || (key33 === "value"))){
const err661 = {instancePath:instancePath+"/motion/settings/pose/" + i24,schemaPath:"#/properties/motion/properties/settings/properties/pose/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key33},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err661];
}
else {
vErrors.push(err661);
}
errors++;
}
}
if(data195.parameterId !== undefined){
let data196 = data195.parameterId;
if(typeof data196 === "string"){
if(func2(data196) > 64){
const err662 = {instancePath:instancePath+"/motion/settings/pose/" + i24+"/parameterId",schemaPath:"#/properties/motion/properties/settings/properties/pose/items/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err662];
}
else {
vErrors.push(err662);
}
errors++;
}
if(func2(data196) < 1){
const err663 = {instancePath:instancePath+"/motion/settings/pose/" + i24+"/parameterId",schemaPath:"#/properties/motion/properties/settings/properties/pose/items/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err663];
}
else {
vErrors.push(err663);
}
errors++;
}
if(!pattern4.test(data196)){
const err664 = {instancePath:instancePath+"/motion/settings/pose/" + i24+"/parameterId",schemaPath:"#/properties/motion/properties/settings/properties/pose/items/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err664];
}
else {
vErrors.push(err664);
}
errors++;
}
}
else {
const err665 = {instancePath:instancePath+"/motion/settings/pose/" + i24+"/parameterId",schemaPath:"#/properties/motion/properties/settings/properties/pose/items/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err665];
}
else {
vErrors.push(err665);
}
errors++;
}
}
if(data195.value !== undefined){
let data197 = data195.value;
if(!((typeof data197 == "number") && (isFinite(data197)))){
const err666 = {instancePath:instancePath+"/motion/settings/pose/" + i24+"/value",schemaPath:"#/properties/motion/properties/settings/properties/pose/items/properties/value/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err666];
}
else {
vErrors.push(err666);
}
errors++;
}
}
}
else {
const err667 = {instancePath:instancePath+"/motion/settings/pose/" + i24,schemaPath:"#/properties/motion/properties/settings/properties/pose/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err667];
}
else {
vErrors.push(err667);
}
errors++;
}
}
}
else {
const err668 = {instancePath:instancePath+"/motion/settings/pose",schemaPath:"#/properties/motion/properties/settings/properties/pose/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err668];
}
else {
vErrors.push(err668);
}
errors++;
}
}
}
else {
const err669 = {instancePath:instancePath+"/motion/settings",schemaPath:"#/properties/motion/properties/settings/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err669];
}
else {
vErrors.push(err669);
}
errors++;
}
}
if(data186.meshes !== undefined){
let data198 = data186.meshes;
if(Array.isArray(data198)){
if(data198.length > 64){
const err670 = {instancePath:instancePath+"/motion/meshes",schemaPath:"#/properties/motion/properties/meshes/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err670];
}
else {
vErrors.push(err670);
}
errors++;
}
const len23 = data198.length;
for(let i25=0; i25<len23; i25++){
let data199 = data198[i25];
if(data199 && typeof data199 == "object" && !Array.isArray(data199)){
if(data199.partId === undefined){
const err671 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "partId"},message:"must have required property '"+"partId"+"'"};
if(vErrors === null){
vErrors = [err671];
}
else {
vErrors.push(err671);
}
errors++;
}
if(data199.pivot === undefined){
const err672 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "pivot"},message:"must have required property '"+"pivot"+"'"};
if(vErrors === null){
vErrors = [err672];
}
else {
vErrors.push(err672);
}
errors++;
}
if(data199.yawParameterId === undefined){
const err673 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "yawParameterId"},message:"must have required property '"+"yawParameterId"+"'"};
if(vErrors === null){
vErrors = [err673];
}
else {
vErrors.push(err673);
}
errors++;
}
if(data199.rollParameterId === undefined){
const err674 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "rollParameterId"},message:"must have required property '"+"rollParameterId"+"'"};
if(vErrors === null){
vErrors = [err674];
}
else {
vErrors.push(err674);
}
errors++;
}
if(data199.curve === undefined){
const err675 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "curve"},message:"must have required property '"+"curve"+"'"};
if(vErrors === null){
vErrors = [err675];
}
else {
vErrors.push(err675);
}
errors++;
}
if(data199.vertices === undefined){
const err676 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "vertices"},message:"must have required property '"+"vertices"+"'"};
if(vErrors === null){
vErrors = [err676];
}
else {
vErrors.push(err676);
}
errors++;
}
if(data199.triangles === undefined){
const err677 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/required",keyword:"required",params:{missingProperty: "triangles"},message:"must have required property '"+"triangles"+"'"};
if(vErrors === null){
vErrors = [err677];
}
else {
vErrors.push(err677);
}
errors++;
}
for(const key34 in data199){
if(!(((((((key34 === "partId") || (key34 === "pivot")) || (key34 === "yawParameterId")) || (key34 === "rollParameterId")) || (key34 === "curve")) || (key34 === "vertices")) || (key34 === "triangles"))){
const err678 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key34},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err678];
}
else {
vErrors.push(err678);
}
errors++;
}
}
if(data199.partId !== undefined){
let data200 = data199.partId;
if(typeof data200 === "string"){
if(func2(data200) > 64){
const err679 = {instancePath:instancePath+"/motion/meshes/" + i25+"/partId",schemaPath:"#/properties/motion/properties/meshes/items/properties/partId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err679];
}
else {
vErrors.push(err679);
}
errors++;
}
if(func2(data200) < 1){
const err680 = {instancePath:instancePath+"/motion/meshes/" + i25+"/partId",schemaPath:"#/properties/motion/properties/meshes/items/properties/partId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err680];
}
else {
vErrors.push(err680);
}
errors++;
}
if(!pattern4.test(data200)){
const err681 = {instancePath:instancePath+"/motion/meshes/" + i25+"/partId",schemaPath:"#/properties/motion/properties/meshes/items/properties/partId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err681];
}
else {
vErrors.push(err681);
}
errors++;
}
}
else {
const err682 = {instancePath:instancePath+"/motion/meshes/" + i25+"/partId",schemaPath:"#/properties/motion/properties/meshes/items/properties/partId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err682];
}
else {
vErrors.push(err682);
}
errors++;
}
}
if(data199.pivot !== undefined){
let data201 = data199.pivot;
if(Array.isArray(data201)){
if(data201.length > 2){
const err683 = {instancePath:instancePath+"/motion/meshes/" + i25+"/pivot",schemaPath:"#/properties/motion/properties/meshes/items/properties/pivot/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err683];
}
else {
vErrors.push(err683);
}
errors++;
}
if(data201.length < 2){
const err684 = {instancePath:instancePath+"/motion/meshes/" + i25+"/pivot",schemaPath:"#/properties/motion/properties/meshes/items/properties/pivot/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err684];
}
else {
vErrors.push(err684);
}
errors++;
}
const len24 = data201.length;
for(let i26=0; i26<len24; i26++){
let data202 = data201[i26];
if(!((typeof data202 == "number") && (isFinite(data202)))){
const err685 = {instancePath:instancePath+"/motion/meshes/" + i25+"/pivot/" + i26,schemaPath:"#/properties/motion/properties/meshes/items/properties/pivot/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
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
const err686 = {instancePath:instancePath+"/motion/meshes/" + i25+"/pivot",schemaPath:"#/properties/motion/properties/meshes/items/properties/pivot/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err686];
}
else {
vErrors.push(err686);
}
errors++;
}
}
if(data199.yawParameterId !== undefined){
let data203 = data199.yawParameterId;
const _errs444 = errors;
let valid94 = false;
const _errs445 = errors;
if(typeof data203 === "string"){
if(func2(data203) > 64){
const err687 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err687];
}
else {
vErrors.push(err687);
}
errors++;
}
if(func2(data203) < 1){
const err688 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err688];
}
else {
vErrors.push(err688);
}
errors++;
}
if(!pattern4.test(data203)){
const err689 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err689];
}
else {
vErrors.push(err689);
}
errors++;
}
}
else {
const err690 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err690];
}
else {
vErrors.push(err690);
}
errors++;
}
var _valid7 = _errs445 === errors;
valid94 = valid94 || _valid7;
const _errs447 = errors;
if(data203 !== null){
const err691 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err691];
}
else {
vErrors.push(err691);
}
errors++;
}
var _valid7 = _errs447 === errors;
valid94 = valid94 || _valid7;
if(!valid94){
const err692 = {instancePath:instancePath+"/motion/meshes/" + i25+"/yawParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/yawParameterId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err692];
}
else {
vErrors.push(err692);
}
errors++;
}
else {
errors = _errs444;
if(vErrors !== null){
if(_errs444){
vErrors.length = _errs444;
}
else {
vErrors = null;
}
}
}
}
if(data199.rollParameterId !== undefined){
let data204 = data199.rollParameterId;
const _errs450 = errors;
let valid95 = false;
const _errs451 = errors;
if(typeof data204 === "string"){
if(func2(data204) > 64){
const err693 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err693];
}
else {
vErrors.push(err693);
}
errors++;
}
if(func2(data204) < 1){
const err694 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err694];
}
else {
vErrors.push(err694);
}
errors++;
}
if(!pattern4.test(data204)){
const err695 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err695];
}
else {
vErrors.push(err695);
}
errors++;
}
}
else {
const err696 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err696];
}
else {
vErrors.push(err696);
}
errors++;
}
var _valid8 = _errs451 === errors;
valid95 = valid95 || _valid8;
const _errs453 = errors;
if(data204 !== null){
const err697 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err697];
}
else {
vErrors.push(err697);
}
errors++;
}
var _valid8 = _errs453 === errors;
valid95 = valid95 || _valid8;
if(!valid95){
const err698 = {instancePath:instancePath+"/motion/meshes/" + i25+"/rollParameterId",schemaPath:"#/properties/motion/properties/meshes/items/properties/rollParameterId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err698];
}
else {
vErrors.push(err698);
}
errors++;
}
else {
errors = _errs450;
if(vErrors !== null){
if(_errs450){
vErrors.length = _errs450;
}
else {
vErrors = null;
}
}
}
}
if(data199.curve !== undefined){
let data205 = data199.curve;
if(!((data205 === "linear") || (data205 === "smoothstep"))){
const err699 = {instancePath:instancePath+"/motion/meshes/" + i25+"/curve",schemaPath:"#/properties/motion/properties/meshes/items/properties/curve/enum",keyword:"enum",params:{allowedValues: schema31.properties.motion.properties.meshes.items.properties.curve.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err699];
}
else {
vErrors.push(err699);
}
errors++;
}
}
if(data199.vertices !== undefined){
let data206 = data199.vertices;
if(Array.isArray(data206)){
if(data206.length > 1024){
const err700 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/maxItems",keyword:"maxItems",params:{limit: 1024},message:"must NOT have more than 1024 items"};
if(vErrors === null){
vErrors = [err700];
}
else {
vErrors.push(err700);
}
errors++;
}
if(data206.length < 3){
const err701 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/minItems",keyword:"minItems",params:{limit: 3},message:"must NOT have fewer than 3 items"};
if(vErrors === null){
vErrors = [err701];
}
else {
vErrors.push(err701);
}
errors++;
}
const len25 = data206.length;
for(let i27=0; i27<len25; i27++){
let data207 = data206[i27];
if(data207 && typeof data207 == "object" && !Array.isArray(data207)){
if(data207.position === undefined){
const err702 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/required",keyword:"required",params:{missingProperty: "position"},message:"must have required property '"+"position"+"'"};
if(vErrors === null){
vErrors = [err702];
}
else {
vErrors.push(err702);
}
errors++;
}
if(data207.weight === undefined){
const err703 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/required",keyword:"required",params:{missingProperty: "weight"},message:"must have required property '"+"weight"+"'"};
if(vErrors === null){
vErrors = [err703];
}
else {
vErrors.push(err703);
}
errors++;
}
if(data207.minimum === undefined){
const err704 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/required",keyword:"required",params:{missingProperty: "minimum"},message:"must have required property '"+"minimum"+"'"};
if(vErrors === null){
vErrors = [err704];
}
else {
vErrors.push(err704);
}
errors++;
}
if(data207.maximum === undefined){
const err705 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/required",keyword:"required",params:{missingProperty: "maximum"},message:"must have required property '"+"maximum"+"'"};
if(vErrors === null){
vErrors = [err705];
}
else {
vErrors.push(err705);
}
errors++;
}
for(const key35 in data207){
if(!((((key35 === "position") || (key35 === "weight")) || (key35 === "minimum")) || (key35 === "maximum"))){
const err706 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key35},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err706];
}
else {
vErrors.push(err706);
}
errors++;
}
}
if(data207.position !== undefined){
let data208 = data207.position;
if(Array.isArray(data208)){
if(data208.length > 2){
const err707 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/position",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/position/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err707];
}
else {
vErrors.push(err707);
}
errors++;
}
if(data208.length < 2){
const err708 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/position",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/position/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err708];
}
else {
vErrors.push(err708);
}
errors++;
}
const len26 = data208.length;
for(let i28=0; i28<len26; i28++){
let data209 = data208[i28];
if(!((typeof data209 == "number") && (isFinite(data209)))){
const err709 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/position/" + i28,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/position/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err709];
}
else {
vErrors.push(err709);
}
errors++;
}
}
}
else {
const err710 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/position",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/position/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err710];
}
else {
vErrors.push(err710);
}
errors++;
}
}
if(data207.weight !== undefined){
let data210 = data207.weight;
if((typeof data210 == "number") && (isFinite(data210))){
if(data210 > 1 || isNaN(data210)){
const err711 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/weight",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/weight/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err711];
}
else {
vErrors.push(err711);
}
errors++;
}
if(data210 < 0 || isNaN(data210)){
const err712 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/weight",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/weight/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err712];
}
else {
vErrors.push(err712);
}
errors++;
}
}
else {
const err713 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/weight",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/weight/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err713];
}
else {
vErrors.push(err713);
}
errors++;
}
}
if(data207.minimum !== undefined){
let data211 = data207.minimum;
if(Array.isArray(data211)){
if(data211.length > 2){
const err714 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/minimum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/minimum/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err714];
}
else {
vErrors.push(err714);
}
errors++;
}
if(data211.length < 2){
const err715 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/minimum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/minimum/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err715];
}
else {
vErrors.push(err715);
}
errors++;
}
const len27 = data211.length;
for(let i29=0; i29<len27; i29++){
let data212 = data211[i29];
if(!((typeof data212 == "number") && (isFinite(data212)))){
const err716 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/minimum/" + i29,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/minimum/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err716];
}
else {
vErrors.push(err716);
}
errors++;
}
}
}
else {
const err717 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/minimum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/minimum/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err717];
}
else {
vErrors.push(err717);
}
errors++;
}
}
if(data207.maximum !== undefined){
let data213 = data207.maximum;
if(Array.isArray(data213)){
if(data213.length > 2){
const err718 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/maximum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/maximum/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err718];
}
else {
vErrors.push(err718);
}
errors++;
}
if(data213.length < 2){
const err719 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/maximum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/maximum/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err719];
}
else {
vErrors.push(err719);
}
errors++;
}
const len28 = data213.length;
for(let i30=0; i30<len28; i30++){
let data214 = data213[i30];
if(!((typeof data214 == "number") && (isFinite(data214)))){
const err720 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/maximum/" + i30,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/maximum/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err720];
}
else {
vErrors.push(err720);
}
errors++;
}
}
}
else {
const err721 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27+"/maximum",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/properties/maximum/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err721];
}
else {
vErrors.push(err721);
}
errors++;
}
}
}
else {
const err722 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices/" + i27,schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err722];
}
else {
vErrors.push(err722);
}
errors++;
}
}
}
else {
const err723 = {instancePath:instancePath+"/motion/meshes/" + i25+"/vertices",schemaPath:"#/properties/motion/properties/meshes/items/properties/vertices/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err723];
}
else {
vErrors.push(err723);
}
errors++;
}
}
if(data199.triangles !== undefined){
let data215 = data199.triangles;
if(Array.isArray(data215)){
if(data215.length > 6144){
const err724 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles",schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/maxItems",keyword:"maxItems",params:{limit: 6144},message:"must NOT have more than 6144 items"};
if(vErrors === null){
vErrors = [err724];
}
else {
vErrors.push(err724);
}
errors++;
}
if(data215.length < 3){
const err725 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles",schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/minItems",keyword:"minItems",params:{limit: 3},message:"must NOT have fewer than 3 items"};
if(vErrors === null){
vErrors = [err725];
}
else {
vErrors.push(err725);
}
errors++;
}
const len29 = data215.length;
for(let i31=0; i31<len29; i31++){
let data216 = data215[i31];
if(!(((typeof data216 == "number") && (!(data216 % 1) && !isNaN(data216))) && (isFinite(data216)))){
const err726 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles/" + i31,schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/items/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err726];
}
else {
vErrors.push(err726);
}
errors++;
}
if((typeof data216 == "number") && (isFinite(data216))){
if(data216 > 1023 || isNaN(data216)){
const err727 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles/" + i31,schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/items/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1023},message:"must be <= 1023"};
if(vErrors === null){
vErrors = [err727];
}
else {
vErrors.push(err727);
}
errors++;
}
if(data216 < 0 || isNaN(data216)){
const err728 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles/" + i31,schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/items/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
}
else {
const err729 = {instancePath:instancePath+"/motion/meshes/" + i25+"/triangles",schemaPath:"#/properties/motion/properties/meshes/items/properties/triangles/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err729];
}
else {
vErrors.push(err729);
}
errors++;
}
}
}
else {
const err730 = {instancePath:instancePath+"/motion/meshes/" + i25,schemaPath:"#/properties/motion/properties/meshes/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err730];
}
else {
vErrors.push(err730);
}
errors++;
}
}
}
else {
const err731 = {instancePath:instancePath+"/motion/meshes",schemaPath:"#/properties/motion/properties/meshes/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err731];
}
else {
vErrors.push(err731);
}
errors++;
}
}
}
else {
const err732 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err732];
}
else {
vErrors.push(err732);
}
errors++;
}
}
if(data.detail !== undefined){
let data217 = data.detail;
if(data217 && typeof data217 == "object" && !Array.isArray(data217)){
if(data217.version === undefined){
const err733 = {instancePath:instancePath+"/detail",schemaPath:"#/properties/detail/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err733];
}
else {
vErrors.push(err733);
}
errors++;
}
if(data217.partOrder === undefined){
const err734 = {instancePath:instancePath+"/detail",schemaPath:"#/properties/detail/required",keyword:"required",params:{missingProperty: "partOrder"},message:"must have required property '"+"partOrder"+"'"};
if(vErrors === null){
vErrors = [err734];
}
else {
vErrors.push(err734);
}
errors++;
}
if(data217.meshOrder === undefined){
const err735 = {instancePath:instancePath+"/detail",schemaPath:"#/properties/detail/required",keyword:"required",params:{missingProperty: "meshOrder"},message:"must have required property '"+"meshOrder"+"'"};
if(vErrors === null){
vErrors = [err735];
}
else {
vErrors.push(err735);
}
errors++;
}
if(data217.baselines === undefined){
const err736 = {instancePath:instancePath+"/detail",schemaPath:"#/properties/detail/required",keyword:"required",params:{missingProperty: "baselines"},message:"must have required property '"+"baselines"+"'"};
if(vErrors === null){
vErrors = [err736];
}
else {
vErrors.push(err736);
}
errors++;
}
if(data217.groups === undefined){
const err737 = {instancePath:instancePath+"/detail",schemaPath:"#/properties/detail/required",keyword:"required",params:{missingProperty: "groups"},message:"must have required property '"+"groups"+"'"};
if(vErrors === null){
vErrors = [err737];
}
else {
vErrors.push(err737);
}
errors++;
}
for(const key36 in data217){
if(!(((((key36 === "version") || (key36 === "partOrder")) || (key36 === "meshOrder")) || (key36 === "baselines")) || (key36 === "groups"))){
const err738 = {instancePath:instancePath+"/detail",schemaPath:"#/properties/detail/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key36},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err738];
}
else {
vErrors.push(err738);
}
errors++;
}
}
if(data217.version !== undefined){
if(1 !== data217.version){
const err739 = {instancePath:instancePath+"/detail/version",schemaPath:"#/properties/detail/properties/version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err739];
}
else {
vErrors.push(err739);
}
errors++;
}
}
if(data217.partOrder !== undefined){
let data219 = data217.partOrder;
if(Array.isArray(data219)){
if(data219.length > 64){
const err740 = {instancePath:instancePath+"/detail/partOrder",schemaPath:"#/properties/detail/properties/partOrder/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err740];
}
else {
vErrors.push(err740);
}
errors++;
}
const len30 = data219.length;
for(let i32=0; i32<len30; i32++){
let data220 = data219[i32];
if(typeof data220 === "string"){
if(func2(data220) > 64){
const err741 = {instancePath:instancePath+"/detail/partOrder/" + i32,schemaPath:"#/properties/detail/properties/partOrder/items/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err741];
}
else {
vErrors.push(err741);
}
errors++;
}
if(func2(data220) < 1){
const err742 = {instancePath:instancePath+"/detail/partOrder/" + i32,schemaPath:"#/properties/detail/properties/partOrder/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err742];
}
else {
vErrors.push(err742);
}
errors++;
}
if(!pattern4.test(data220)){
const err743 = {instancePath:instancePath+"/detail/partOrder/" + i32,schemaPath:"#/properties/detail/properties/partOrder/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err743];
}
else {
vErrors.push(err743);
}
errors++;
}
}
else {
const err744 = {instancePath:instancePath+"/detail/partOrder/" + i32,schemaPath:"#/properties/detail/properties/partOrder/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err744];
}
else {
vErrors.push(err744);
}
errors++;
}
}
let i33 = data219.length;
let j2;
if(i33 > 1){
const indices2 = {};
for(;i33--;){
let item2 = data219[i33];
if(typeof item2 !== "string"){
continue;
}
if(typeof indices2[item2] == "number"){
j2 = indices2[item2];
const err745 = {instancePath:instancePath+"/detail/partOrder",schemaPath:"#/properties/detail/properties/partOrder/uniqueItems",keyword:"uniqueItems",params:{i: i33, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i33+" are identical)"};
if(vErrors === null){
vErrors = [err745];
}
else {
vErrors.push(err745);
}
errors++;
break;
}
indices2[item2] = i33;
}
}
}
else {
const err746 = {instancePath:instancePath+"/detail/partOrder",schemaPath:"#/properties/detail/properties/partOrder/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err746];
}
else {
vErrors.push(err746);
}
errors++;
}
}
if(data217.meshOrder !== undefined){
let data221 = data217.meshOrder;
if(Array.isArray(data221)){
if(data221.length > 64){
const err747 = {instancePath:instancePath+"/detail/meshOrder",schemaPath:"#/properties/detail/properties/meshOrder/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err747];
}
else {
vErrors.push(err747);
}
errors++;
}
const len31 = data221.length;
for(let i34=0; i34<len31; i34++){
let data222 = data221[i34];
if(typeof data222 === "string"){
if(func2(data222) > 64){
const err748 = {instancePath:instancePath+"/detail/meshOrder/" + i34,schemaPath:"#/properties/detail/properties/meshOrder/items/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err748];
}
else {
vErrors.push(err748);
}
errors++;
}
if(func2(data222) < 1){
const err749 = {instancePath:instancePath+"/detail/meshOrder/" + i34,schemaPath:"#/properties/detail/properties/meshOrder/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err749];
}
else {
vErrors.push(err749);
}
errors++;
}
if(!pattern4.test(data222)){
const err750 = {instancePath:instancePath+"/detail/meshOrder/" + i34,schemaPath:"#/properties/detail/properties/meshOrder/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err750];
}
else {
vErrors.push(err750);
}
errors++;
}
}
else {
const err751 = {instancePath:instancePath+"/detail/meshOrder/" + i34,schemaPath:"#/properties/detail/properties/meshOrder/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err751];
}
else {
vErrors.push(err751);
}
errors++;
}
}
let i35 = data221.length;
let j3;
if(i35 > 1){
const indices3 = {};
for(;i35--;){
let item3 = data221[i35];
if(typeof item3 !== "string"){
continue;
}
if(typeof indices3[item3] == "number"){
j3 = indices3[item3];
const err752 = {instancePath:instancePath+"/detail/meshOrder",schemaPath:"#/properties/detail/properties/meshOrder/uniqueItems",keyword:"uniqueItems",params:{i: i35, j: j3},message:"must NOT have duplicate items (items ## "+j3+" and "+i35+" are identical)"};
if(vErrors === null){
vErrors = [err752];
}
else {
vErrors.push(err752);
}
errors++;
break;
}
indices3[item3] = i35;
}
}
}
else {
const err753 = {instancePath:instancePath+"/detail/meshOrder",schemaPath:"#/properties/detail/properties/meshOrder/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err753];
}
else {
vErrors.push(err753);
}
errors++;
}
}
if(data217.baselines !== undefined){
let data223 = data217.baselines;
if(Array.isArray(data223)){
if(data223.length > 64){
const err754 = {instancePath:instancePath+"/detail/baselines",schemaPath:"#/properties/detail/properties/baselines/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err754];
}
else {
vErrors.push(err754);
}
errors++;
}
const len32 = data223.length;
for(let i36=0; i36<len32; i36++){
let data224 = data223[i36];
if(data224 && typeof data224 == "object" && !Array.isArray(data224)){
if(data224.part === undefined){
const err755 = {instancePath:instancePath+"/detail/baselines/" + i36,schemaPath:"#/properties/detail/properties/baselines/items/required",keyword:"required",params:{missingProperty: "part"},message:"must have required property '"+"part"+"'"};
if(vErrors === null){
vErrors = [err755];
}
else {
vErrors.push(err755);
}
errors++;
}
if(data224.partIndex === undefined){
const err756 = {instancePath:instancePath+"/detail/baselines/" + i36,schemaPath:"#/properties/detail/properties/baselines/items/required",keyword:"required",params:{missingProperty: "partIndex"},message:"must have required property '"+"partIndex"+"'"};
if(vErrors === null){
vErrors = [err756];
}
else {
vErrors.push(err756);
}
errors++;
}
if(data224.mesh === undefined){
const err757 = {instancePath:instancePath+"/detail/baselines/" + i36,schemaPath:"#/properties/detail/properties/baselines/items/required",keyword:"required",params:{missingProperty: "mesh"},message:"must have required property '"+"mesh"+"'"};
if(vErrors === null){
vErrors = [err757];
}
else {
vErrors.push(err757);
}
errors++;
}
if(data224.meshIndex === undefined){
const err758 = {instancePath:instancePath+"/detail/baselines/" + i36,schemaPath:"#/properties/detail/properties/baselines/items/required",keyword:"required",params:{missingProperty: "meshIndex"},message:"must have required property '"+"meshIndex"+"'"};
if(vErrors === null){
vErrors = [err758];
}
else {
vErrors.push(err758);
}
errors++;
}
if(data224.bindings === undefined){
const err759 = {instancePath:instancePath+"/detail/baselines/" + i36,schemaPath:"#/properties/detail/properties/baselines/items/required",keyword:"required",params:{missingProperty: "bindings"},message:"must have required property '"+"bindings"+"'"};
if(vErrors === null){
vErrors = [err759];
}
else {
vErrors.push(err759);
}
errors++;
}
for(const key37 in data224){
if(!(((((key37 === "part") || (key37 === "partIndex")) || (key37 === "mesh")) || (key37 === "meshIndex")) || (key37 === "bindings"))){
const err760 = {instancePath:instancePath+"/detail/baselines/" + i36,schemaPath:"#/properties/detail/properties/baselines/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key37},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err760];
}
else {
vErrors.push(err760);
}
errors++;
}
}
if(data224.part !== undefined){
let data225 = data224.part;
if(data225 && typeof data225 == "object" && !Array.isArray(data225)){
if(data225.id === undefined){
const err761 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err761];
}
else {
vErrors.push(err761);
}
errors++;
}
if(data225.displayName === undefined){
const err762 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err762];
}
else {
vErrors.push(err762);
}
errors++;
}
if(data225.role === undefined){
const err763 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/required",keyword:"required",params:{missingProperty: "role"},message:"must have required property '"+"role"+"'"};
if(vErrors === null){
vErrors = [err763];
}
else {
vErrors.push(err763);
}
errors++;
}
if(data225.side === undefined){
const err764 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/required",keyword:"required",params:{missingProperty: "side"},message:"must have required property '"+"side"+"'"};
if(vErrors === null){
vErrors = [err764];
}
else {
vErrors.push(err764);
}
errors++;
}
if(data225.parentId === undefined){
const err765 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/required",keyword:"required",params:{missingProperty: "parentId"},message:"must have required property '"+"parentId"+"'"};
if(vErrors === null){
vErrors = [err765];
}
else {
vErrors.push(err765);
}
errors++;
}
if(data225.groupId === undefined){
const err766 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/required",keyword:"required",params:{missingProperty: "groupId"},message:"must have required property '"+"groupId"+"'"};
if(vErrors === null){
vErrors = [err766];
}
else {
vErrors.push(err766);
}
errors++;
}
if(data225.textures === undefined){
const err767 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/required",keyword:"required",params:{missingProperty: "textures"},message:"must have required property '"+"textures"+"'"};
if(vErrors === null){
vErrors = [err767];
}
else {
vErrors.push(err767);
}
errors++;
}
if(data225.localTransform === undefined){
const err768 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/required",keyword:"required",params:{missingProperty: "localTransform"},message:"must have required property '"+"localTransform"+"'"};
if(vErrors === null){
vErrors = [err768];
}
else {
vErrors.push(err768);
}
errors++;
}
if(data225.drawOrder === undefined){
const err769 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/required",keyword:"required",params:{missingProperty: "drawOrder"},message:"must have required property '"+"drawOrder"+"'"};
if(vErrors === null){
vErrors = [err769];
}
else {
vErrors.push(err769);
}
errors++;
}
if(data225.visible === undefined){
const err770 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/required",keyword:"required",params:{missingProperty: "visible"},message:"must have required property '"+"visible"+"'"};
if(vErrors === null){
vErrors = [err770];
}
else {
vErrors.push(err770);
}
errors++;
}
if(data225.opacity === undefined){
const err771 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/required",keyword:"required",params:{missingProperty: "opacity"},message:"must have required property '"+"opacity"+"'"};
if(vErrors === null){
vErrors = [err771];
}
else {
vErrors.push(err771);
}
errors++;
}
if(data225.correctionOrigin === undefined){
const err772 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/required",keyword:"required",params:{missingProperty: "correctionOrigin"},message:"must have required property '"+"correctionOrigin"+"'"};
if(vErrors === null){
vErrors = [err772];
}
else {
vErrors.push(err772);
}
errors++;
}
if(data225.limitations === undefined){
const err773 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/required",keyword:"required",params:{missingProperty: "limitations"},message:"must have required property '"+"limitations"+"'"};
if(vErrors === null){
vErrors = [err773];
}
else {
vErrors.push(err773);
}
errors++;
}
for(const key38 in data225){
if(!(func1.call(schema31.properties.detail.properties.baselines.items.properties.part.properties, key38))){
const err774 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key38},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err774];
}
else {
vErrors.push(err774);
}
errors++;
}
}
if(data225.id !== undefined){
let data226 = data225.id;
if(typeof data226 === "string"){
if(func2(data226) > 64){
const err775 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/id",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err775];
}
else {
vErrors.push(err775);
}
errors++;
}
if(func2(data226) < 1){
const err776 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/id",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err776];
}
else {
vErrors.push(err776);
}
errors++;
}
if(!pattern4.test(data226)){
const err777 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/id",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err777];
}
else {
vErrors.push(err777);
}
errors++;
}
}
else {
const err778 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/id",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err778];
}
else {
vErrors.push(err778);
}
errors++;
}
}
if(data225.displayName !== undefined){
let data227 = data225.displayName;
if(typeof data227 === "string"){
if(func2(data227) > 120){
const err779 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/displayName",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err779];
}
else {
vErrors.push(err779);
}
errors++;
}
if(func2(data227) < 1){
const err780 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/displayName",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err780];
}
else {
vErrors.push(err780);
}
errors++;
}
}
else {
const err781 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/displayName",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err781];
}
else {
vErrors.push(err781);
}
errors++;
}
}
if(data225.role !== undefined){
let data228 = data225.role;
if(!(((((((((data228 === "base") || (data228 === "body")) || (data228 === "head")) || (data228 === "hair-front")) || (data228 === "hair-back")) || (data228 === "eye")) || (data228 === "mouth")) || (data228 === "accessory")) || (data228 === "custom"))){
const err782 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/role",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/role/enum",keyword:"enum",params:{allowedValues: schema31.properties.detail.properties.baselines.items.properties.part.properties.role.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err782];
}
else {
vErrors.push(err782);
}
errors++;
}
}
if(data225.side !== undefined){
let data229 = data225.side;
if(!((((data229 === "character-left") || (data229 === "character-right")) || (data229 === "center")) || (data229 === "none"))){
const err783 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/side",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/side/enum",keyword:"enum",params:{allowedValues: schema31.properties.detail.properties.baselines.items.properties.part.properties.side.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err783];
}
else {
vErrors.push(err783);
}
errors++;
}
}
if(data225.parentId !== undefined){
let data230 = data225.parentId;
const _errs506 = errors;
let valid118 = false;
const _errs507 = errors;
if(typeof data230 === "string"){
if(func2(data230) > 64){
const err784 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/parentId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/parentId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err784];
}
else {
vErrors.push(err784);
}
errors++;
}
if(func2(data230) < 1){
const err785 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/parentId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/parentId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err785];
}
else {
vErrors.push(err785);
}
errors++;
}
if(!pattern4.test(data230)){
const err786 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/parentId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/parentId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err786];
}
else {
vErrors.push(err786);
}
errors++;
}
}
else {
const err787 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/parentId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/parentId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err787];
}
else {
vErrors.push(err787);
}
errors++;
}
var _valid9 = _errs507 === errors;
valid118 = valid118 || _valid9;
const _errs509 = errors;
if(data230 !== null){
const err788 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/parentId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/parentId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err788];
}
else {
vErrors.push(err788);
}
errors++;
}
var _valid9 = _errs509 === errors;
valid118 = valid118 || _valid9;
if(!valid118){
const err789 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/parentId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/parentId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err789];
}
else {
vErrors.push(err789);
}
errors++;
}
else {
errors = _errs506;
if(vErrors !== null){
if(_errs506){
vErrors.length = _errs506;
}
else {
vErrors = null;
}
}
}
}
if(data225.groupId !== undefined){
let data231 = data225.groupId;
const _errs512 = errors;
let valid119 = false;
const _errs513 = errors;
if(typeof data231 === "string"){
if(func2(data231) > 64){
const err790 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/groupId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/groupId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err790];
}
else {
vErrors.push(err790);
}
errors++;
}
if(func2(data231) < 1){
const err791 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/groupId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/groupId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err791];
}
else {
vErrors.push(err791);
}
errors++;
}
if(!pattern4.test(data231)){
const err792 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/groupId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/groupId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err792];
}
else {
vErrors.push(err792);
}
errors++;
}
}
else {
const err793 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/groupId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/groupId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err793];
}
else {
vErrors.push(err793);
}
errors++;
}
var _valid10 = _errs513 === errors;
valid119 = valid119 || _valid10;
const _errs515 = errors;
if(data231 !== null){
const err794 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/groupId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/groupId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err794];
}
else {
vErrors.push(err794);
}
errors++;
}
var _valid10 = _errs515 === errors;
valid119 = valid119 || _valid10;
if(!valid119){
const err795 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/groupId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/groupId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err795];
}
else {
vErrors.push(err795);
}
errors++;
}
else {
errors = _errs512;
if(vErrors !== null){
if(_errs512){
vErrors.length = _errs512;
}
else {
vErrors = null;
}
}
}
}
if(data225.textures !== undefined){
let data232 = data225.textures;
if(Array.isArray(data232)){
if(data232.length > 32){
const err796 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err796];
}
else {
vErrors.push(err796);
}
errors++;
}
const len33 = data232.length;
for(let i37=0; i37<len33; i37++){
let data233 = data232[i37];
if(data233 && typeof data233 == "object" && !Array.isArray(data233)){
if(data233.state === undefined){
const err797 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37,schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/required",keyword:"required",params:{missingProperty: "state"},message:"must have required property '"+"state"+"'"};
if(vErrors === null){
vErrors = [err797];
}
else {
vErrors.push(err797);
}
errors++;
}
if(data233.assetId === undefined){
const err798 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37,schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/required",keyword:"required",params:{missingProperty: "assetId"},message:"must have required property '"+"assetId"+"'"};
if(vErrors === null){
vErrors = [err798];
}
else {
vErrors.push(err798);
}
errors++;
}
if(data233.assetVersion === undefined){
const err799 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37,schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/required",keyword:"required",params:{missingProperty: "assetVersion"},message:"must have required property '"+"assetVersion"+"'"};
if(vErrors === null){
vErrors = [err799];
}
else {
vErrors.push(err799);
}
errors++;
}
if(data233.assetToLocal === undefined){
const err800 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37,schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/required",keyword:"required",params:{missingProperty: "assetToLocal"},message:"must have required property '"+"assetToLocal"+"'"};
if(vErrors === null){
vErrors = [err800];
}
else {
vErrors.push(err800);
}
errors++;
}
for(const key39 in data233){
if(!((((key39 === "state") || (key39 === "assetId")) || (key39 === "assetVersion")) || (key39 === "assetToLocal"))){
const err801 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37,schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key39},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err801];
}
else {
vErrors.push(err801);
}
errors++;
}
}
if(data233.state !== undefined){
let data234 = data233.state;
if(typeof data234 === "string"){
if(func2(data234) > 32){
const err802 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37+"/state",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/properties/state/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err802];
}
else {
vErrors.push(err802);
}
errors++;
}
if(func2(data234) < 1){
const err803 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37+"/state",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/properties/state/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err803];
}
else {
vErrors.push(err803);
}
errors++;
}
if(!pattern16.test(data234)){
const err804 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37+"/state",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/properties/state/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err804];
}
else {
vErrors.push(err804);
}
errors++;
}
}
else {
const err805 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37+"/state",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/properties/state/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err805];
}
else {
vErrors.push(err805);
}
errors++;
}
}
if(data233.assetId !== undefined){
let data235 = data233.assetId;
if(typeof data235 === "string"){
if(func2(data235) > 64){
const err806 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37+"/assetId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/properties/assetId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err806];
}
else {
vErrors.push(err806);
}
errors++;
}
if(func2(data235) < 1){
const err807 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37+"/assetId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/properties/assetId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err807];
}
else {
vErrors.push(err807);
}
errors++;
}
if(!pattern4.test(data235)){
const err808 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37+"/assetId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/properties/assetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err808];
}
else {
vErrors.push(err808);
}
errors++;
}
}
else {
const err809 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37+"/assetId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/properties/assetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err809];
}
else {
vErrors.push(err809);
}
errors++;
}
}
if(data233.assetVersion !== undefined){
let data236 = data233.assetVersion;
if(!(((typeof data236 == "number") && (!(data236 % 1) && !isNaN(data236))) && (isFinite(data236)))){
const err810 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37+"/assetVersion",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/properties/assetVersion/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err810];
}
else {
vErrors.push(err810);
}
errors++;
}
if((typeof data236 == "number") && (isFinite(data236))){
if(data236 > 9007199254740991 || isNaN(data236)){
const err811 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37+"/assetVersion",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/properties/assetVersion/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err811];
}
else {
vErrors.push(err811);
}
errors++;
}
if(data236 < 1 || isNaN(data236)){
const err812 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37+"/assetVersion",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/properties/assetVersion/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err812];
}
else {
vErrors.push(err812);
}
errors++;
}
}
}
if(data233.assetToLocal !== undefined){
let data237 = data233.assetToLocal;
if(Array.isArray(data237)){
if(data237.length > 6){
const err813 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37+"/assetToLocal",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/properties/assetToLocal/maxItems",keyword:"maxItems",params:{limit: 6},message:"must NOT have more than 6 items"};
if(vErrors === null){
vErrors = [err813];
}
else {
vErrors.push(err813);
}
errors++;
}
if(data237.length < 6){
const err814 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37+"/assetToLocal",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/properties/assetToLocal/minItems",keyword:"minItems",params:{limit: 6},message:"must NOT have fewer than 6 items"};
if(vErrors === null){
vErrors = [err814];
}
else {
vErrors.push(err814);
}
errors++;
}
const len34 = data237.length;
for(let i38=0; i38<len34; i38++){
let data238 = data237[i38];
if(!((typeof data238 == "number") && (isFinite(data238)))){
const err815 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37+"/assetToLocal/" + i38,schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/properties/assetToLocal/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err815];
}
else {
vErrors.push(err815);
}
errors++;
}
}
}
else {
const err816 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37+"/assetToLocal",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/properties/assetToLocal/type",keyword:"type",params:{type: "array"},message:"must be array"};
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
else {
const err817 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures/" + i37,schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err817];
}
else {
vErrors.push(err817);
}
errors++;
}
}
}
else {
const err818 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/textures",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/textures/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err818];
}
else {
vErrors.push(err818);
}
errors++;
}
}
if(data225.localTransform !== undefined){
let data239 = data225.localTransform;
if(Array.isArray(data239)){
if(data239.length > 6){
const err819 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/localTransform",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/localTransform/maxItems",keyword:"maxItems",params:{limit: 6},message:"must NOT have more than 6 items"};
if(vErrors === null){
vErrors = [err819];
}
else {
vErrors.push(err819);
}
errors++;
}
if(data239.length < 6){
const err820 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/localTransform",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/localTransform/minItems",keyword:"minItems",params:{limit: 6},message:"must NOT have fewer than 6 items"};
if(vErrors === null){
vErrors = [err820];
}
else {
vErrors.push(err820);
}
errors++;
}
const len35 = data239.length;
for(let i39=0; i39<len35; i39++){
let data240 = data239[i39];
if(!((typeof data240 == "number") && (isFinite(data240)))){
const err821 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/localTransform/" + i39,schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/localTransform/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
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
const err822 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/localTransform",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/localTransform/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err822];
}
else {
vErrors.push(err822);
}
errors++;
}
}
if(data225.drawOrder !== undefined){
let data241 = data225.drawOrder;
if(!(((typeof data241 == "number") && (!(data241 % 1) && !isNaN(data241))) && (isFinite(data241)))){
const err823 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/drawOrder",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/drawOrder/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err823];
}
else {
vErrors.push(err823);
}
errors++;
}
if((typeof data241 == "number") && (isFinite(data241))){
if(data241 > 100000 || isNaN(data241)){
const err824 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/drawOrder",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/drawOrder/maximum",keyword:"maximum",params:{comparison: "<=", limit: 100000},message:"must be <= 100000"};
if(vErrors === null){
vErrors = [err824];
}
else {
vErrors.push(err824);
}
errors++;
}
if(data241 < -100000 || isNaN(data241)){
const err825 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/drawOrder",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/drawOrder/minimum",keyword:"minimum",params:{comparison: ">=", limit: -100000},message:"must be >= -100000"};
if(vErrors === null){
vErrors = [err825];
}
else {
vErrors.push(err825);
}
errors++;
}
}
}
if(data225.visible !== undefined){
if(typeof data225.visible !== "boolean"){
const err826 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/visible",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/visible/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err826];
}
else {
vErrors.push(err826);
}
errors++;
}
}
if(data225.opacity !== undefined){
let data243 = data225.opacity;
if((typeof data243 == "number") && (isFinite(data243))){
if(data243 > 1 || isNaN(data243)){
const err827 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/opacity",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/opacity/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err827];
}
else {
vErrors.push(err827);
}
errors++;
}
if(data243 < 0 || isNaN(data243)){
const err828 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/opacity",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/opacity/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err828];
}
else {
vErrors.push(err828);
}
errors++;
}
}
else {
const err829 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/opacity",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/opacity/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err829];
}
else {
vErrors.push(err829);
}
errors++;
}
}
if(data225.correctionOrigin !== undefined){
let data244 = data225.correctionOrigin;
if(!(((data244 === "automatic") || (data244 === "user-confirmed")) || (data244 === "manual"))){
const err830 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/correctionOrigin",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/correctionOrigin/enum",keyword:"enum",params:{allowedValues: schema31.properties.detail.properties.baselines.items.properties.part.properties.correctionOrigin.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err830];
}
else {
vErrors.push(err830);
}
errors++;
}
}
if(data225.limitations !== undefined){
let data245 = data225.limitations;
if(Array.isArray(data245)){
if(data245.length > 64){
const err831 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/limitations",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/limitations/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err831];
}
else {
vErrors.push(err831);
}
errors++;
}
const len36 = data245.length;
for(let i40=0; i40<len36; i40++){
let data246 = data245[i40];
if(typeof data246 === "string"){
if(func2(data246) > 512){
const err832 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/limitations/" + i40,schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/limitations/items/maxLength",keyword:"maxLength",params:{limit: 512},message:"must NOT have more than 512 characters"};
if(vErrors === null){
vErrors = [err832];
}
else {
vErrors.push(err832);
}
errors++;
}
if(func2(data246) < 1){
const err833 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/limitations/" + i40,schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/limitations/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err833];
}
else {
vErrors.push(err833);
}
errors++;
}
}
else {
const err834 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/limitations/" + i40,schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/limitations/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err834];
}
else {
vErrors.push(err834);
}
errors++;
}
}
}
else {
const err835 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/limitations",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/limitations/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err835];
}
else {
vErrors.push(err835);
}
errors++;
}
}
if(data225.library !== undefined){
let data247 = data225.library;
if(data247 && typeof data247 == "object" && !Array.isArray(data247)){
if(data247.catalogId === undefined){
const err836 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/required",keyword:"required",params:{missingProperty: "catalogId"},message:"must have required property '"+"catalogId"+"'"};
if(vErrors === null){
vErrors = [err836];
}
else {
vErrors.push(err836);
}
errors++;
}
if(data247.itemId === undefined){
const err837 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/required",keyword:"required",params:{missingProperty: "itemId"},message:"must have required property '"+"itemId"+"'"};
if(vErrors === null){
vErrors = [err837];
}
else {
vErrors.push(err837);
}
errors++;
}
if(data247.version === undefined){
const err838 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err838];
}
else {
vErrors.push(err838);
}
errors++;
}
if(data247.key === undefined){
const err839 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/required",keyword:"required",params:{missingProperty: "key"},message:"must have required property '"+"key"+"'"};
if(vErrors === null){
vErrors = [err839];
}
else {
vErrors.push(err839);
}
errors++;
}
for(const key40 in data247){
if(!((((key40 === "catalogId") || (key40 === "itemId")) || (key40 === "version")) || (key40 === "key"))){
const err840 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key40},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err840];
}
else {
vErrors.push(err840);
}
errors++;
}
}
if(data247.catalogId !== undefined){
let data248 = data247.catalogId;
if(typeof data248 === "string"){
if(func2(data248) > 64){
const err841 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/catalogId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/catalogId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err841];
}
else {
vErrors.push(err841);
}
errors++;
}
if(func2(data248) < 1){
const err842 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/catalogId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/catalogId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err842];
}
else {
vErrors.push(err842);
}
errors++;
}
if(!pattern4.test(data248)){
const err843 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/catalogId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/catalogId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err843];
}
else {
vErrors.push(err843);
}
errors++;
}
}
else {
const err844 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/catalogId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/catalogId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err844];
}
else {
vErrors.push(err844);
}
errors++;
}
}
if(data247.itemId !== undefined){
let data249 = data247.itemId;
if(typeof data249 === "string"){
if(func2(data249) > 64){
const err845 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/itemId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/itemId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err845];
}
else {
vErrors.push(err845);
}
errors++;
}
if(func2(data249) < 1){
const err846 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/itemId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/itemId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err846];
}
else {
vErrors.push(err846);
}
errors++;
}
if(!pattern4.test(data249)){
const err847 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/itemId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/itemId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err847];
}
else {
vErrors.push(err847);
}
errors++;
}
}
else {
const err848 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/itemId",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/itemId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err848];
}
else {
vErrors.push(err848);
}
errors++;
}
}
if(data247.version !== undefined){
let data250 = data247.version;
if(typeof data250 === "string"){
if(func2(data250) > 32){
const err849 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/version",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/version/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err849];
}
else {
vErrors.push(err849);
}
errors++;
}
if(func2(data250) < 1){
const err850 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/version",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/version/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err850];
}
else {
vErrors.push(err850);
}
errors++;
}
if(!pattern12.test(data250)){
const err851 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/version",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/version/pattern",keyword:"pattern",params:{pattern: "^\\d+\\.\\d+\\.\\d+$"},message:"must match pattern \""+"^\\d+\\.\\d+\\.\\d+$"+"\""};
if(vErrors === null){
vErrors = [err851];
}
else {
vErrors.push(err851);
}
errors++;
}
}
else {
const err852 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/version",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/version/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err852];
}
else {
vErrors.push(err852);
}
errors++;
}
}
if(data247.key !== undefined){
let data251 = data247.key;
if(typeof data251 === "string"){
if(func2(data251) > 64){
const err853 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/key",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/key/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err853];
}
else {
vErrors.push(err853);
}
errors++;
}
if(func2(data251) < 1){
const err854 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/key",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/key/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err854];
}
else {
vErrors.push(err854);
}
errors++;
}
if(!pattern4.test(data251)){
const err855 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/key",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/key/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err855];
}
else {
vErrors.push(err855);
}
errors++;
}
}
else {
const err856 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library/key",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/properties/key/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err856];
}
else {
vErrors.push(err856);
}
errors++;
}
}
}
else {
const err857 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/library",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/library/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err857];
}
else {
vErrors.push(err857);
}
errors++;
}
}
if(data225.color !== undefined){
let data252 = data225.color;
if(data252 && typeof data252 == "object" && !Array.isArray(data252)){
if(data252.hueDegrees === undefined){
const err858 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/required",keyword:"required",params:{missingProperty: "hueDegrees"},message:"must have required property '"+"hueDegrees"+"'"};
if(vErrors === null){
vErrors = [err858];
}
else {
vErrors.push(err858);
}
errors++;
}
if(data252.minimumHue === undefined){
const err859 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/required",keyword:"required",params:{missingProperty: "minimumHue"},message:"must have required property '"+"minimumHue"+"'"};
if(vErrors === null){
vErrors = [err859];
}
else {
vErrors.push(err859);
}
errors++;
}
if(data252.maximumHue === undefined){
const err860 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/required",keyword:"required",params:{missingProperty: "maximumHue"},message:"must have required property '"+"maximumHue"+"'"};
if(vErrors === null){
vErrors = [err860];
}
else {
vErrors.push(err860);
}
errors++;
}
if(data252.minimumSaturation === undefined){
const err861 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/required",keyword:"required",params:{missingProperty: "minimumSaturation"},message:"must have required property '"+"minimumSaturation"+"'"};
if(vErrors === null){
vErrors = [err861];
}
else {
vErrors.push(err861);
}
errors++;
}
for(const key41 in data252){
if(!((((key41 === "hueDegrees") || (key41 === "minimumHue")) || (key41 === "maximumHue")) || (key41 === "minimumSaturation"))){
const err862 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key41},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err862];
}
else {
vErrors.push(err862);
}
errors++;
}
}
if(data252.hueDegrees !== undefined){
let data253 = data252.hueDegrees;
if((typeof data253 == "number") && (isFinite(data253))){
if(data253 > 18 || isNaN(data253)){
const err863 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color/hueDegrees",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/properties/hueDegrees/maximum",keyword:"maximum",params:{comparison: "<=", limit: 18},message:"must be <= 18"};
if(vErrors === null){
vErrors = [err863];
}
else {
vErrors.push(err863);
}
errors++;
}
if(data253 < -18 || isNaN(data253)){
const err864 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color/hueDegrees",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/properties/hueDegrees/minimum",keyword:"minimum",params:{comparison: ">=", limit: -18},message:"must be >= -18"};
if(vErrors === null){
vErrors = [err864];
}
else {
vErrors.push(err864);
}
errors++;
}
}
else {
const err865 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color/hueDegrees",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/properties/hueDegrees/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err865];
}
else {
vErrors.push(err865);
}
errors++;
}
}
if(data252.minimumHue !== undefined){
let data254 = data252.minimumHue;
if((typeof data254 == "number") && (isFinite(data254))){
if(data254 > 1 || isNaN(data254)){
const err866 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color/minimumHue",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/properties/minimumHue/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err866];
}
else {
vErrors.push(err866);
}
errors++;
}
if(data254 < 0 || isNaN(data254)){
const err867 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color/minimumHue",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/properties/minimumHue/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err867];
}
else {
vErrors.push(err867);
}
errors++;
}
}
else {
const err868 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color/minimumHue",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/properties/minimumHue/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err868];
}
else {
vErrors.push(err868);
}
errors++;
}
}
if(data252.maximumHue !== undefined){
let data255 = data252.maximumHue;
if((typeof data255 == "number") && (isFinite(data255))){
if(data255 > 1 || isNaN(data255)){
const err869 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color/maximumHue",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/properties/maximumHue/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err869];
}
else {
vErrors.push(err869);
}
errors++;
}
if(data255 < 0 || isNaN(data255)){
const err870 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color/maximumHue",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/properties/maximumHue/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err870];
}
else {
vErrors.push(err870);
}
errors++;
}
}
else {
const err871 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color/maximumHue",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/properties/maximumHue/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err871];
}
else {
vErrors.push(err871);
}
errors++;
}
}
if(data252.minimumSaturation !== undefined){
let data256 = data252.minimumSaturation;
if((typeof data256 == "number") && (isFinite(data256))){
if(data256 > 1 || isNaN(data256)){
const err872 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color/minimumSaturation",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/properties/minimumSaturation/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err872];
}
else {
vErrors.push(err872);
}
errors++;
}
if(data256 < 0 || isNaN(data256)){
const err873 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color/minimumSaturation",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/properties/minimumSaturation/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err873];
}
else {
vErrors.push(err873);
}
errors++;
}
}
else {
const err874 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color/minimumSaturation",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/properties/minimumSaturation/type",keyword:"type",params:{type: "number"},message:"must be number"};
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
else {
const err875 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part/color",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/properties/color/type",keyword:"type",params:{type: "object"},message:"must be object"};
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
const err876 = {instancePath:instancePath+"/detail/baselines/" + i36+"/part",schemaPath:"#/properties/detail/properties/baselines/items/properties/part/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err876];
}
else {
vErrors.push(err876);
}
errors++;
}
}
if(data224.partIndex !== undefined){
let data257 = data224.partIndex;
if(!(((typeof data257 == "number") && (!(data257 % 1) && !isNaN(data257))) && (isFinite(data257)))){
const err877 = {instancePath:instancePath+"/detail/baselines/" + i36+"/partIndex",schemaPath:"#/properties/detail/properties/baselines/items/properties/partIndex/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err877];
}
else {
vErrors.push(err877);
}
errors++;
}
if((typeof data257 == "number") && (isFinite(data257))){
if(data257 > 63 || isNaN(data257)){
const err878 = {instancePath:instancePath+"/detail/baselines/" + i36+"/partIndex",schemaPath:"#/properties/detail/properties/baselines/items/properties/partIndex/maximum",keyword:"maximum",params:{comparison: "<=", limit: 63},message:"must be <= 63"};
if(vErrors === null){
vErrors = [err878];
}
else {
vErrors.push(err878);
}
errors++;
}
if(data257 < 0 || isNaN(data257)){
const err879 = {instancePath:instancePath+"/detail/baselines/" + i36+"/partIndex",schemaPath:"#/properties/detail/properties/baselines/items/properties/partIndex/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err879];
}
else {
vErrors.push(err879);
}
errors++;
}
}
}
if(data224.mesh !== undefined){
let data258 = data224.mesh;
const _errs572 = errors;
let valid131 = false;
const _errs573 = errors;
if(data258 && typeof data258 == "object" && !Array.isArray(data258)){
if(data258.partId === undefined){
const err880 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/required",keyword:"required",params:{missingProperty: "partId"},message:"must have required property '"+"partId"+"'"};
if(vErrors === null){
vErrors = [err880];
}
else {
vErrors.push(err880);
}
errors++;
}
if(data258.pivot === undefined){
const err881 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/required",keyword:"required",params:{missingProperty: "pivot"},message:"must have required property '"+"pivot"+"'"};
if(vErrors === null){
vErrors = [err881];
}
else {
vErrors.push(err881);
}
errors++;
}
if(data258.yawParameterId === undefined){
const err882 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/required",keyword:"required",params:{missingProperty: "yawParameterId"},message:"must have required property '"+"yawParameterId"+"'"};
if(vErrors === null){
vErrors = [err882];
}
else {
vErrors.push(err882);
}
errors++;
}
if(data258.rollParameterId === undefined){
const err883 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/required",keyword:"required",params:{missingProperty: "rollParameterId"},message:"must have required property '"+"rollParameterId"+"'"};
if(vErrors === null){
vErrors = [err883];
}
else {
vErrors.push(err883);
}
errors++;
}
if(data258.curve === undefined){
const err884 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/required",keyword:"required",params:{missingProperty: "curve"},message:"must have required property '"+"curve"+"'"};
if(vErrors === null){
vErrors = [err884];
}
else {
vErrors.push(err884);
}
errors++;
}
if(data258.vertices === undefined){
const err885 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/required",keyword:"required",params:{missingProperty: "vertices"},message:"must have required property '"+"vertices"+"'"};
if(vErrors === null){
vErrors = [err885];
}
else {
vErrors.push(err885);
}
errors++;
}
if(data258.triangles === undefined){
const err886 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/required",keyword:"required",params:{missingProperty: "triangles"},message:"must have required property '"+"triangles"+"'"};
if(vErrors === null){
vErrors = [err886];
}
else {
vErrors.push(err886);
}
errors++;
}
for(const key42 in data258){
if(!(((((((key42 === "partId") || (key42 === "pivot")) || (key42 === "yawParameterId")) || (key42 === "rollParameterId")) || (key42 === "curve")) || (key42 === "vertices")) || (key42 === "triangles"))){
const err887 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key42},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err887];
}
else {
vErrors.push(err887);
}
errors++;
}
}
if(data258.partId !== undefined){
let data259 = data258.partId;
if(typeof data259 === "string"){
if(func2(data259) > 64){
const err888 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/partId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/partId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err888];
}
else {
vErrors.push(err888);
}
errors++;
}
if(func2(data259) < 1){
const err889 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/partId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/partId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err889];
}
else {
vErrors.push(err889);
}
errors++;
}
if(!pattern4.test(data259)){
const err890 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/partId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/partId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err890];
}
else {
vErrors.push(err890);
}
errors++;
}
}
else {
const err891 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/partId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/partId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err891];
}
else {
vErrors.push(err891);
}
errors++;
}
}
if(data258.pivot !== undefined){
let data260 = data258.pivot;
if(Array.isArray(data260)){
if(data260.length > 2){
const err892 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/pivot",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/pivot/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err892];
}
else {
vErrors.push(err892);
}
errors++;
}
if(data260.length < 2){
const err893 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/pivot",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/pivot/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err893];
}
else {
vErrors.push(err893);
}
errors++;
}
const len37 = data260.length;
for(let i41=0; i41<len37; i41++){
let data261 = data260[i41];
if(!((typeof data261 == "number") && (isFinite(data261)))){
const err894 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/pivot/" + i41,schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/pivot/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err894];
}
else {
vErrors.push(err894);
}
errors++;
}
}
}
else {
const err895 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/pivot",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/pivot/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err895];
}
else {
vErrors.push(err895);
}
errors++;
}
}
if(data258.yawParameterId !== undefined){
let data262 = data258.yawParameterId;
const _errs583 = errors;
let valid135 = false;
const _errs584 = errors;
if(typeof data262 === "string"){
if(func2(data262) > 64){
const err896 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/yawParameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/yawParameterId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err896];
}
else {
vErrors.push(err896);
}
errors++;
}
if(func2(data262) < 1){
const err897 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/yawParameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/yawParameterId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err897];
}
else {
vErrors.push(err897);
}
errors++;
}
if(!pattern4.test(data262)){
const err898 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/yawParameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/yawParameterId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
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
const err899 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/yawParameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/yawParameterId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err899];
}
else {
vErrors.push(err899);
}
errors++;
}
var _valid12 = _errs584 === errors;
valid135 = valid135 || _valid12;
const _errs586 = errors;
if(data262 !== null){
const err900 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/yawParameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/yawParameterId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err900];
}
else {
vErrors.push(err900);
}
errors++;
}
var _valid12 = _errs586 === errors;
valid135 = valid135 || _valid12;
if(!valid135){
const err901 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/yawParameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/yawParameterId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err901];
}
else {
vErrors.push(err901);
}
errors++;
}
else {
errors = _errs583;
if(vErrors !== null){
if(_errs583){
vErrors.length = _errs583;
}
else {
vErrors = null;
}
}
}
}
if(data258.rollParameterId !== undefined){
let data263 = data258.rollParameterId;
const _errs589 = errors;
let valid136 = false;
const _errs590 = errors;
if(typeof data263 === "string"){
if(func2(data263) > 64){
const err902 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/rollParameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/rollParameterId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err902];
}
else {
vErrors.push(err902);
}
errors++;
}
if(func2(data263) < 1){
const err903 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/rollParameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/rollParameterId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err903];
}
else {
vErrors.push(err903);
}
errors++;
}
if(!pattern4.test(data263)){
const err904 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/rollParameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/rollParameterId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err904];
}
else {
vErrors.push(err904);
}
errors++;
}
}
else {
const err905 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/rollParameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/rollParameterId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err905];
}
else {
vErrors.push(err905);
}
errors++;
}
var _valid13 = _errs590 === errors;
valid136 = valid136 || _valid13;
const _errs592 = errors;
if(data263 !== null){
const err906 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/rollParameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/rollParameterId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err906];
}
else {
vErrors.push(err906);
}
errors++;
}
var _valid13 = _errs592 === errors;
valid136 = valid136 || _valid13;
if(!valid136){
const err907 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/rollParameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/rollParameterId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err907];
}
else {
vErrors.push(err907);
}
errors++;
}
else {
errors = _errs589;
if(vErrors !== null){
if(_errs589){
vErrors.length = _errs589;
}
else {
vErrors = null;
}
}
}
}
if(data258.curve !== undefined){
let data264 = data258.curve;
if(!((data264 === "linear") || (data264 === "smoothstep"))){
const err908 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/curve",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/curve/enum",keyword:"enum",params:{allowedValues: schema31.properties.detail.properties.baselines.items.properties.mesh.anyOf[0].properties.curve.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err908];
}
else {
vErrors.push(err908);
}
errors++;
}
}
if(data258.vertices !== undefined){
let data265 = data258.vertices;
if(Array.isArray(data265)){
if(data265.length > 1024){
const err909 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/maxItems",keyword:"maxItems",params:{limit: 1024},message:"must NOT have more than 1024 items"};
if(vErrors === null){
vErrors = [err909];
}
else {
vErrors.push(err909);
}
errors++;
}
if(data265.length < 3){
const err910 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/minItems",keyword:"minItems",params:{limit: 3},message:"must NOT have fewer than 3 items"};
if(vErrors === null){
vErrors = [err910];
}
else {
vErrors.push(err910);
}
errors++;
}
const len38 = data265.length;
for(let i42=0; i42<len38; i42++){
let data266 = data265[i42];
if(data266 && typeof data266 == "object" && !Array.isArray(data266)){
if(data266.position === undefined){
const err911 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42,schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/required",keyword:"required",params:{missingProperty: "position"},message:"must have required property '"+"position"+"'"};
if(vErrors === null){
vErrors = [err911];
}
else {
vErrors.push(err911);
}
errors++;
}
if(data266.weight === undefined){
const err912 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42,schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/required",keyword:"required",params:{missingProperty: "weight"},message:"must have required property '"+"weight"+"'"};
if(vErrors === null){
vErrors = [err912];
}
else {
vErrors.push(err912);
}
errors++;
}
if(data266.minimum === undefined){
const err913 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42,schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/required",keyword:"required",params:{missingProperty: "minimum"},message:"must have required property '"+"minimum"+"'"};
if(vErrors === null){
vErrors = [err913];
}
else {
vErrors.push(err913);
}
errors++;
}
if(data266.maximum === undefined){
const err914 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42,schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/required",keyword:"required",params:{missingProperty: "maximum"},message:"must have required property '"+"maximum"+"'"};
if(vErrors === null){
vErrors = [err914];
}
else {
vErrors.push(err914);
}
errors++;
}
for(const key43 in data266){
if(!((((key43 === "position") || (key43 === "weight")) || (key43 === "minimum")) || (key43 === "maximum"))){
const err915 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42,schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key43},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err915];
}
else {
vErrors.push(err915);
}
errors++;
}
}
if(data266.position !== undefined){
let data267 = data266.position;
if(Array.isArray(data267)){
if(data267.length > 2){
const err916 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42+"/position",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/properties/position/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err916];
}
else {
vErrors.push(err916);
}
errors++;
}
if(data267.length < 2){
const err917 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42+"/position",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/properties/position/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err917];
}
else {
vErrors.push(err917);
}
errors++;
}
const len39 = data267.length;
for(let i43=0; i43<len39; i43++){
let data268 = data267[i43];
if(!((typeof data268 == "number") && (isFinite(data268)))){
const err918 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42+"/position/" + i43,schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/properties/position/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
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
else {
const err919 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42+"/position",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/properties/position/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err919];
}
else {
vErrors.push(err919);
}
errors++;
}
}
if(data266.weight !== undefined){
let data269 = data266.weight;
if((typeof data269 == "number") && (isFinite(data269))){
if(data269 > 1 || isNaN(data269)){
const err920 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42+"/weight",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/properties/weight/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err920];
}
else {
vErrors.push(err920);
}
errors++;
}
if(data269 < 0 || isNaN(data269)){
const err921 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42+"/weight",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/properties/weight/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err921];
}
else {
vErrors.push(err921);
}
errors++;
}
}
else {
const err922 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42+"/weight",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/properties/weight/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err922];
}
else {
vErrors.push(err922);
}
errors++;
}
}
if(data266.minimum !== undefined){
let data270 = data266.minimum;
if(Array.isArray(data270)){
if(data270.length > 2){
const err923 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42+"/minimum",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/properties/minimum/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err923];
}
else {
vErrors.push(err923);
}
errors++;
}
if(data270.length < 2){
const err924 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42+"/minimum",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/properties/minimum/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err924];
}
else {
vErrors.push(err924);
}
errors++;
}
const len40 = data270.length;
for(let i44=0; i44<len40; i44++){
let data271 = data270[i44];
if(!((typeof data271 == "number") && (isFinite(data271)))){
const err925 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42+"/minimum/" + i44,schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/properties/minimum/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err925];
}
else {
vErrors.push(err925);
}
errors++;
}
}
}
else {
const err926 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42+"/minimum",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/properties/minimum/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err926];
}
else {
vErrors.push(err926);
}
errors++;
}
}
if(data266.maximum !== undefined){
let data272 = data266.maximum;
if(Array.isArray(data272)){
if(data272.length > 2){
const err927 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42+"/maximum",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/properties/maximum/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err927];
}
else {
vErrors.push(err927);
}
errors++;
}
if(data272.length < 2){
const err928 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42+"/maximum",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/properties/maximum/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err928];
}
else {
vErrors.push(err928);
}
errors++;
}
const len41 = data272.length;
for(let i45=0; i45<len41; i45++){
let data273 = data272[i45];
if(!((typeof data273 == "number") && (isFinite(data273)))){
const err929 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42+"/maximum/" + i45,schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/properties/maximum/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err929];
}
else {
vErrors.push(err929);
}
errors++;
}
}
}
else {
const err930 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42+"/maximum",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/properties/maximum/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err930];
}
else {
vErrors.push(err930);
}
errors++;
}
}
}
else {
const err931 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices/" + i42,schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
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
else {
const err932 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/vertices",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/vertices/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err932];
}
else {
vErrors.push(err932);
}
errors++;
}
}
if(data258.triangles !== undefined){
let data274 = data258.triangles;
if(Array.isArray(data274)){
if(data274.length > 6144){
const err933 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/triangles",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/triangles/maxItems",keyword:"maxItems",params:{limit: 6144},message:"must NOT have more than 6144 items"};
if(vErrors === null){
vErrors = [err933];
}
else {
vErrors.push(err933);
}
errors++;
}
if(data274.length < 3){
const err934 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/triangles",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/triangles/minItems",keyword:"minItems",params:{limit: 3},message:"must NOT have fewer than 3 items"};
if(vErrors === null){
vErrors = [err934];
}
else {
vErrors.push(err934);
}
errors++;
}
const len42 = data274.length;
for(let i46=0; i46<len42; i46++){
let data275 = data274[i46];
if(!(((typeof data275 == "number") && (!(data275 % 1) && !isNaN(data275))) && (isFinite(data275)))){
const err935 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/triangles/" + i46,schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/triangles/items/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err935];
}
else {
vErrors.push(err935);
}
errors++;
}
if((typeof data275 == "number") && (isFinite(data275))){
if(data275 > 1023 || isNaN(data275)){
const err936 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/triangles/" + i46,schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/triangles/items/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1023},message:"must be <= 1023"};
if(vErrors === null){
vErrors = [err936];
}
else {
vErrors.push(err936);
}
errors++;
}
if(data275 < 0 || isNaN(data275)){
const err937 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/triangles/" + i46,schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/triangles/items/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err937];
}
else {
vErrors.push(err937);
}
errors++;
}
}
}
}
else {
const err938 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh/triangles",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/properties/triangles/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err938];
}
else {
vErrors.push(err938);
}
errors++;
}
}
}
else {
const err939 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err939];
}
else {
vErrors.push(err939);
}
errors++;
}
var _valid11 = _errs573 === errors;
valid131 = valid131 || _valid11;
const _errs618 = errors;
if(data258 !== null){
const err940 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err940];
}
else {
vErrors.push(err940);
}
errors++;
}
var _valid11 = _errs618 === errors;
valid131 = valid131 || _valid11;
if(!valid131){
const err941 = {instancePath:instancePath+"/detail/baselines/" + i36+"/mesh",schemaPath:"#/properties/detail/properties/baselines/items/properties/mesh/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err941];
}
else {
vErrors.push(err941);
}
errors++;
}
else {
errors = _errs572;
if(vErrors !== null){
if(_errs572){
vErrors.length = _errs572;
}
else {
vErrors = null;
}
}
}
}
if(data224.meshIndex !== undefined){
let data276 = data224.meshIndex;
if(!(((typeof data276 == "number") && (!(data276 % 1) && !isNaN(data276))) && (isFinite(data276)))){
const err942 = {instancePath:instancePath+"/detail/baselines/" + i36+"/meshIndex",schemaPath:"#/properties/detail/properties/baselines/items/properties/meshIndex/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err942];
}
else {
vErrors.push(err942);
}
errors++;
}
if((typeof data276 == "number") && (isFinite(data276))){
if(data276 > 63 || isNaN(data276)){
const err943 = {instancePath:instancePath+"/detail/baselines/" + i36+"/meshIndex",schemaPath:"#/properties/detail/properties/baselines/items/properties/meshIndex/maximum",keyword:"maximum",params:{comparison: "<=", limit: 63},message:"must be <= 63"};
if(vErrors === null){
vErrors = [err943];
}
else {
vErrors.push(err943);
}
errors++;
}
if(data276 < 0 || isNaN(data276)){
const err944 = {instancePath:instancePath+"/detail/baselines/" + i36+"/meshIndex",schemaPath:"#/properties/detail/properties/baselines/items/properties/meshIndex/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err944];
}
else {
vErrors.push(err944);
}
errors++;
}
}
}
if(data224.bindings !== undefined){
let data277 = data224.bindings;
if(Array.isArray(data277)){
if(data277.length > 256){
const err945 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/maxItems",keyword:"maxItems",params:{limit: 256},message:"must NOT have more than 256 items"};
if(vErrors === null){
vErrors = [err945];
}
else {
vErrors.push(err945);
}
errors++;
}
const len43 = data277.length;
for(let i47=0; i47<len43; i47++){
let data278 = data277[i47];
const _errs625 = errors;
let valid150 = false;
let passing1 = null;
const _errs626 = errors;
if(data278 && typeof data278 == "object" && !Array.isArray(data278)){
if(data278.id === undefined){
const err946 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err946];
}
else {
vErrors.push(err946);
}
errors++;
}
if(data278.parameterId === undefined){
const err947 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err947];
}
else {
vErrors.push(err947);
}
errors++;
}
if(data278.partId === undefined){
const err948 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "partId"},message:"must have required property '"+"partId"+"'"};
if(vErrors === null){
vErrors = [err948];
}
else {
vErrors.push(err948);
}
errors++;
}
if(data278.kind === undefined){
const err949 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err949];
}
else {
vErrors.push(err949);
}
errors++;
}
if(data278.mapping === undefined){
const err950 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/required",keyword:"required",params:{missingProperty: "mapping"},message:"must have required property '"+"mapping"+"'"};
if(vErrors === null){
vErrors = [err950];
}
else {
vErrors.push(err950);
}
errors++;
}
for(const key44 in data278){
if(!(((((key44 === "id") || (key44 === "parameterId")) || (key44 === "partId")) || (key44 === "kind")) || (key44 === "mapping"))){
const err951 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key44},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err951];
}
else {
vErrors.push(err951);
}
errors++;
}
}
if(data278.id !== undefined){
let data279 = data278.id;
if(typeof data279 === "string"){
if(func2(data279) > 64){
const err952 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/id",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err952];
}
else {
vErrors.push(err952);
}
errors++;
}
if(func2(data279) < 1){
const err953 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/id",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err953];
}
else {
vErrors.push(err953);
}
errors++;
}
if(!pattern4.test(data279)){
const err954 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/id",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err954];
}
else {
vErrors.push(err954);
}
errors++;
}
}
else {
const err955 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/id",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err955];
}
else {
vErrors.push(err955);
}
errors++;
}
}
if(data278.parameterId !== undefined){
let data280 = data278.parameterId;
if(typeof data280 === "string"){
if(func2(data280) > 64){
const err956 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/parameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err956];
}
else {
vErrors.push(err956);
}
errors++;
}
if(func2(data280) < 1){
const err957 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/parameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err957];
}
else {
vErrors.push(err957);
}
errors++;
}
if(!pattern4.test(data280)){
const err958 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/parameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err958];
}
else {
vErrors.push(err958);
}
errors++;
}
}
else {
const err959 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/parameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err959];
}
else {
vErrors.push(err959);
}
errors++;
}
}
if(data278.partId !== undefined){
let data281 = data278.partId;
if(typeof data281 === "string"){
if(func2(data281) > 64){
const err960 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/partId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/partId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err960];
}
else {
vErrors.push(err960);
}
errors++;
}
if(func2(data281) < 1){
const err961 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/partId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/partId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err961];
}
else {
vErrors.push(err961);
}
errors++;
}
if(!pattern4.test(data281)){
const err962 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/partId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/partId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
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
const err963 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/partId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/partId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err963];
}
else {
vErrors.push(err963);
}
errors++;
}
}
if(data278.kind !== undefined){
if("state-blend" !== data278.kind){
const err964 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/kind",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/kind/const",keyword:"const",params:{allowedValue: "state-blend"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err964];
}
else {
vErrors.push(err964);
}
errors++;
}
}
if(data278.mapping !== undefined){
let data283 = data278.mapping;
if(data283 && typeof data283 == "object" && !Array.isArray(data283)){
if(data283.minimumState === undefined){
const err965 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/mapping/required",keyword:"required",params:{missingProperty: "minimumState"},message:"must have required property '"+"minimumState"+"'"};
if(vErrors === null){
vErrors = [err965];
}
else {
vErrors.push(err965);
}
errors++;
}
if(data283.maximumState === undefined){
const err966 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/mapping/required",keyword:"required",params:{missingProperty: "maximumState"},message:"must have required property '"+"maximumState"+"'"};
if(vErrors === null){
vErrors = [err966];
}
else {
vErrors.push(err966);
}
errors++;
}
for(const key45 in data283){
if(!(((key45 === "minimumState") || (key45 === "maximumState")) || (key45 === "middleState"))){
const err967 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/mapping/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key45},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err967];
}
else {
vErrors.push(err967);
}
errors++;
}
}
if(data283.minimumState !== undefined){
let data284 = data283.minimumState;
if(typeof data284 === "string"){
if(func2(data284) > 32){
const err968 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping/minimumState",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/mapping/properties/minimumState/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err968];
}
else {
vErrors.push(err968);
}
errors++;
}
if(func2(data284) < 1){
const err969 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping/minimumState",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/mapping/properties/minimumState/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err969];
}
else {
vErrors.push(err969);
}
errors++;
}
}
else {
const err970 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping/minimumState",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/mapping/properties/minimumState/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err970];
}
else {
vErrors.push(err970);
}
errors++;
}
}
if(data283.maximumState !== undefined){
let data285 = data283.maximumState;
if(typeof data285 === "string"){
if(func2(data285) > 32){
const err971 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping/maximumState",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/mapping/properties/maximumState/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err971];
}
else {
vErrors.push(err971);
}
errors++;
}
if(func2(data285) < 1){
const err972 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping/maximumState",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/mapping/properties/maximumState/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err972];
}
else {
vErrors.push(err972);
}
errors++;
}
}
else {
const err973 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping/maximumState",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/mapping/properties/maximumState/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err973];
}
else {
vErrors.push(err973);
}
errors++;
}
}
if(data283.middleState !== undefined){
let data286 = data283.middleState;
if(typeof data286 === "string"){
if(func2(data286) > 32){
const err974 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping/middleState",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/mapping/properties/middleState/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err974];
}
else {
vErrors.push(err974);
}
errors++;
}
if(func2(data286) < 1){
const err975 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping/middleState",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/mapping/properties/middleState/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err975];
}
else {
vErrors.push(err975);
}
errors++;
}
}
else {
const err976 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping/middleState",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/mapping/properties/middleState/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err976];
}
else {
vErrors.push(err976);
}
errors++;
}
}
}
else {
const err977 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/properties/mapping/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err977];
}
else {
vErrors.push(err977);
}
errors++;
}
}
}
else {
const err978 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err978];
}
else {
vErrors.push(err978);
}
errors++;
}
var _valid14 = _errs626 === errors;
if(_valid14){
valid150 = true;
passing1 = 0;
var props2 = true;
}
const _errs645 = errors;
if(data278 && typeof data278 == "object" && !Array.isArray(data278)){
if(data278.id === undefined){
const err979 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err979];
}
else {
vErrors.push(err979);
}
errors++;
}
if(data278.parameterId === undefined){
const err980 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "parameterId"},message:"must have required property '"+"parameterId"+"'"};
if(vErrors === null){
vErrors = [err980];
}
else {
vErrors.push(err980);
}
errors++;
}
if(data278.partId === undefined){
const err981 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "partId"},message:"must have required property '"+"partId"+"'"};
if(vErrors === null){
vErrors = [err981];
}
else {
vErrors.push(err981);
}
errors++;
}
if(data278.kind === undefined){
const err982 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err982];
}
else {
vErrors.push(err982);
}
errors++;
}
if(data278.mapping === undefined){
const err983 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/required",keyword:"required",params:{missingProperty: "mapping"},message:"must have required property '"+"mapping"+"'"};
if(vErrors === null){
vErrors = [err983];
}
else {
vErrors.push(err983);
}
errors++;
}
for(const key46 in data278){
if(!(((((key46 === "id") || (key46 === "parameterId")) || (key46 === "partId")) || (key46 === "kind")) || (key46 === "mapping"))){
const err984 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key46},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err984];
}
else {
vErrors.push(err984);
}
errors++;
}
}
if(data278.id !== undefined){
let data287 = data278.id;
if(typeof data287 === "string"){
if(func2(data287) > 64){
const err985 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/id",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err985];
}
else {
vErrors.push(err985);
}
errors++;
}
if(func2(data287) < 1){
const err986 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/id",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err986];
}
else {
vErrors.push(err986);
}
errors++;
}
if(!pattern4.test(data287)){
const err987 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/id",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err987];
}
else {
vErrors.push(err987);
}
errors++;
}
}
else {
const err988 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/id",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err988];
}
else {
vErrors.push(err988);
}
errors++;
}
}
if(data278.parameterId !== undefined){
let data288 = data278.parameterId;
if(typeof data288 === "string"){
if(func2(data288) > 64){
const err989 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/parameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/parameterId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err989];
}
else {
vErrors.push(err989);
}
errors++;
}
if(func2(data288) < 1){
const err990 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/parameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/parameterId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err990];
}
else {
vErrors.push(err990);
}
errors++;
}
if(!pattern4.test(data288)){
const err991 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/parameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/parameterId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
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
const err992 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/parameterId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/parameterId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err992];
}
else {
vErrors.push(err992);
}
errors++;
}
}
if(data278.partId !== undefined){
let data289 = data278.partId;
if(typeof data289 === "string"){
if(func2(data289) > 64){
const err993 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/partId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/partId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err993];
}
else {
vErrors.push(err993);
}
errors++;
}
if(func2(data289) < 1){
const err994 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/partId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/partId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err994];
}
else {
vErrors.push(err994);
}
errors++;
}
if(!pattern4.test(data289)){
const err995 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/partId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/partId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err995];
}
else {
vErrors.push(err995);
}
errors++;
}
}
else {
const err996 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/partId",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/partId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err996];
}
else {
vErrors.push(err996);
}
errors++;
}
}
if(data278.kind !== undefined){
if("transform" !== data278.kind){
const err997 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/kind",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/kind/const",keyword:"const",params:{allowedValue: "transform"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err997];
}
else {
vErrors.push(err997);
}
errors++;
}
}
if(data278.mapping !== undefined){
let data291 = data278.mapping;
if(data291 && typeof data291 == "object" && !Array.isArray(data291)){
if(data291.component === undefined){
const err998 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/mapping/required",keyword:"required",params:{missingProperty: "component"},message:"must have required property '"+"component"+"'"};
if(vErrors === null){
vErrors = [err998];
}
else {
vErrors.push(err998);
}
errors++;
}
if(data291.outputRange === undefined){
const err999 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/mapping/required",keyword:"required",params:{missingProperty: "outputRange"},message:"must have required property '"+"outputRange"+"'"};
if(vErrors === null){
vErrors = [err999];
}
else {
vErrors.push(err999);
}
errors++;
}
for(const key47 in data291){
if(!((key47 === "component") || (key47 === "outputRange"))){
const err1000 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/mapping/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key47},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1000];
}
else {
vErrors.push(err1000);
}
errors++;
}
}
if(data291.component !== undefined){
let data292 = data291.component;
if(!(((((data292 === "rotate-degrees") || (data292 === "translate-x")) || (data292 === "translate-y")) || (data292 === "scale-x")) || (data292 === "scale-y"))){
const err1001 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping/component",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/mapping/properties/component/enum",keyword:"enum",params:{allowedValues: schema31.properties.detail.properties.baselines.items.properties.bindings.items.oneOf[1].properties.mapping.properties.component.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1001];
}
else {
vErrors.push(err1001);
}
errors++;
}
}
if(data291.outputRange !== undefined){
let data293 = data291.outputRange;
if(Array.isArray(data293)){
if(data293.length > 2){
const err1002 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping/outputRange",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/mapping/properties/outputRange/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err1002];
}
else {
vErrors.push(err1002);
}
errors++;
}
if(data293.length < 2){
const err1003 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping/outputRange",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/mapping/properties/outputRange/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err1003];
}
else {
vErrors.push(err1003);
}
errors++;
}
const len44 = data293.length;
for(let i48=0; i48<len44; i48++){
let data294 = data293[i48];
if(!((typeof data294 == "number") && (isFinite(data294)))){
const err1004 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping/outputRange/" + i48,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/mapping/properties/outputRange/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
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
const err1005 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping/outputRange",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/mapping/properties/outputRange/type",keyword:"type",params:{type: "array"},message:"must be array"};
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
const err1006 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47+"/mapping",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/properties/mapping/type",keyword:"type",params:{type: "object"},message:"must be object"};
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
const err1007 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf/1/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1007];
}
else {
vErrors.push(err1007);
}
errors++;
}
var _valid14 = _errs645 === errors;
if(_valid14 && valid150){
valid150 = false;
passing1 = [passing1, 1];
}
else {
if(_valid14){
valid150 = true;
passing1 = 1;
if(props2 !== true){
props2 = true;
}
}
}
if(!valid150){
const err1008 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings/" + i47,schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/items/oneOf",keyword:"oneOf",params:{passingSchemas: passing1},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err1008];
}
else {
vErrors.push(err1008);
}
errors++;
}
else {
errors = _errs625;
if(vErrors !== null){
if(_errs625){
vErrors.length = _errs625;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err1009 = {instancePath:instancePath+"/detail/baselines/" + i36+"/bindings",schemaPath:"#/properties/detail/properties/baselines/items/properties/bindings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1009];
}
else {
vErrors.push(err1009);
}
errors++;
}
}
}
else {
const err1010 = {instancePath:instancePath+"/detail/baselines/" + i36,schemaPath:"#/properties/detail/properties/baselines/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1010];
}
else {
vErrors.push(err1010);
}
errors++;
}
}
}
else {
const err1011 = {instancePath:instancePath+"/detail/baselines",schemaPath:"#/properties/detail/properties/baselines/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1011];
}
else {
vErrors.push(err1011);
}
errors++;
}
}
if(data217.groups !== undefined){
let data295 = data217.groups;
if(Array.isArray(data295)){
if(data295.length > 128){
const err1012 = {instancePath:instancePath+"/detail/groups",schemaPath:"#/properties/detail/properties/groups/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err1012];
}
else {
vErrors.push(err1012);
}
errors++;
}
const len45 = data295.length;
for(let i49=0; i49<len45; i49++){
let data296 = data295[i49];
if(data296 && typeof data296 == "object" && !Array.isArray(data296)){
if(data296.id === undefined){
const err1013 = {instancePath:instancePath+"/detail/groups/" + i49,schemaPath:"#/properties/detail/properties/groups/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err1013];
}
else {
vErrors.push(err1013);
}
errors++;
}
if(data296.displayName === undefined){
const err1014 = {instancePath:instancePath+"/detail/groups/" + i49,schemaPath:"#/properties/detail/properties/groups/items/required",keyword:"required",params:{missingProperty: "displayName"},message:"must have required property '"+"displayName"+"'"};
if(vErrors === null){
vErrors = [err1014];
}
else {
vErrors.push(err1014);
}
errors++;
}
if(data296.parentGroupId === undefined){
const err1015 = {instancePath:instancePath+"/detail/groups/" + i49,schemaPath:"#/properties/detail/properties/groups/items/required",keyword:"required",params:{missingProperty: "parentGroupId"},message:"must have required property '"+"parentGroupId"+"'"};
if(vErrors === null){
vErrors = [err1015];
}
else {
vErrors.push(err1015);
}
errors++;
}
if(data296.visible === undefined){
const err1016 = {instancePath:instancePath+"/detail/groups/" + i49,schemaPath:"#/properties/detail/properties/groups/items/required",keyword:"required",params:{missingProperty: "visible"},message:"must have required property '"+"visible"+"'"};
if(vErrors === null){
vErrors = [err1016];
}
else {
vErrors.push(err1016);
}
errors++;
}
for(const key48 in data296){
if(!(((((key48 === "id") || (key48 === "displayName")) || (key48 === "parentGroupId")) || (key48 === "visible")) || (key48 === "opacity"))){
const err1017 = {instancePath:instancePath+"/detail/groups/" + i49,schemaPath:"#/properties/detail/properties/groups/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key48},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1017];
}
else {
vErrors.push(err1017);
}
errors++;
}
}
if(data296.id !== undefined){
let data297 = data296.id;
if(typeof data297 === "string"){
if(func2(data297) > 64){
const err1018 = {instancePath:instancePath+"/detail/groups/" + i49+"/id",schemaPath:"#/properties/detail/properties/groups/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1018];
}
else {
vErrors.push(err1018);
}
errors++;
}
if(func2(data297) < 1){
const err1019 = {instancePath:instancePath+"/detail/groups/" + i49+"/id",schemaPath:"#/properties/detail/properties/groups/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1019];
}
else {
vErrors.push(err1019);
}
errors++;
}
if(!pattern4.test(data297)){
const err1020 = {instancePath:instancePath+"/detail/groups/" + i49+"/id",schemaPath:"#/properties/detail/properties/groups/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1020];
}
else {
vErrors.push(err1020);
}
errors++;
}
}
else {
const err1021 = {instancePath:instancePath+"/detail/groups/" + i49+"/id",schemaPath:"#/properties/detail/properties/groups/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1021];
}
else {
vErrors.push(err1021);
}
errors++;
}
}
if(data296.displayName !== undefined){
let data298 = data296.displayName;
if(typeof data298 === "string"){
if(func2(data298) > 120){
const err1022 = {instancePath:instancePath+"/detail/groups/" + i49+"/displayName",schemaPath:"#/properties/detail/properties/groups/items/properties/displayName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err1022];
}
else {
vErrors.push(err1022);
}
errors++;
}
if(func2(data298) < 1){
const err1023 = {instancePath:instancePath+"/detail/groups/" + i49+"/displayName",schemaPath:"#/properties/detail/properties/groups/items/properties/displayName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1023];
}
else {
vErrors.push(err1023);
}
errors++;
}
}
else {
const err1024 = {instancePath:instancePath+"/detail/groups/" + i49+"/displayName",schemaPath:"#/properties/detail/properties/groups/items/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1024];
}
else {
vErrors.push(err1024);
}
errors++;
}
}
if(data296.parentGroupId !== undefined){
let data299 = data296.parentGroupId;
const _errs673 = errors;
let valid160 = false;
const _errs674 = errors;
if(typeof data299 === "string"){
if(func2(data299) > 64){
const err1025 = {instancePath:instancePath+"/detail/groups/" + i49+"/parentGroupId",schemaPath:"#/properties/detail/properties/groups/items/properties/parentGroupId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1025];
}
else {
vErrors.push(err1025);
}
errors++;
}
if(func2(data299) < 1){
const err1026 = {instancePath:instancePath+"/detail/groups/" + i49+"/parentGroupId",schemaPath:"#/properties/detail/properties/groups/items/properties/parentGroupId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1026];
}
else {
vErrors.push(err1026);
}
errors++;
}
if(!pattern4.test(data299)){
const err1027 = {instancePath:instancePath+"/detail/groups/" + i49+"/parentGroupId",schemaPath:"#/properties/detail/properties/groups/items/properties/parentGroupId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1027];
}
else {
vErrors.push(err1027);
}
errors++;
}
}
else {
const err1028 = {instancePath:instancePath+"/detail/groups/" + i49+"/parentGroupId",schemaPath:"#/properties/detail/properties/groups/items/properties/parentGroupId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1028];
}
else {
vErrors.push(err1028);
}
errors++;
}
var _valid15 = _errs674 === errors;
valid160 = valid160 || _valid15;
const _errs676 = errors;
if(data299 !== null){
const err1029 = {instancePath:instancePath+"/detail/groups/" + i49+"/parentGroupId",schemaPath:"#/properties/detail/properties/groups/items/properties/parentGroupId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1029];
}
else {
vErrors.push(err1029);
}
errors++;
}
var _valid15 = _errs676 === errors;
valid160 = valid160 || _valid15;
if(!valid160){
const err1030 = {instancePath:instancePath+"/detail/groups/" + i49+"/parentGroupId",schemaPath:"#/properties/detail/properties/groups/items/properties/parentGroupId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1030];
}
else {
vErrors.push(err1030);
}
errors++;
}
else {
errors = _errs673;
if(vErrors !== null){
if(_errs673){
vErrors.length = _errs673;
}
else {
vErrors = null;
}
}
}
}
if(data296.visible !== undefined){
if(typeof data296.visible !== "boolean"){
const err1031 = {instancePath:instancePath+"/detail/groups/" + i49+"/visible",schemaPath:"#/properties/detail/properties/groups/items/properties/visible/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1031];
}
else {
vErrors.push(err1031);
}
errors++;
}
}
if(data296.opacity !== undefined){
let data301 = data296.opacity;
if((typeof data301 == "number") && (isFinite(data301))){
if(data301 > 1 || isNaN(data301)){
const err1032 = {instancePath:instancePath+"/detail/groups/" + i49+"/opacity",schemaPath:"#/properties/detail/properties/groups/items/properties/opacity/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err1032];
}
else {
vErrors.push(err1032);
}
errors++;
}
if(data301 < 0 || isNaN(data301)){
const err1033 = {instancePath:instancePath+"/detail/groups/" + i49+"/opacity",schemaPath:"#/properties/detail/properties/groups/items/properties/opacity/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1033];
}
else {
vErrors.push(err1033);
}
errors++;
}
}
else {
const err1034 = {instancePath:instancePath+"/detail/groups/" + i49+"/opacity",schemaPath:"#/properties/detail/properties/groups/items/properties/opacity/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1034];
}
else {
vErrors.push(err1034);
}
errors++;
}
}
}
else {
const err1035 = {instancePath:instancePath+"/detail/groups/" + i49,schemaPath:"#/properties/detail/properties/groups/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1035];
}
else {
vErrors.push(err1035);
}
errors++;
}
}
}
else {
const err1036 = {instancePath:instancePath+"/detail/groups",schemaPath:"#/properties/detail/properties/groups/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1036];
}
else {
vErrors.push(err1036);
}
errors++;
}
}
}
else {
const err1037 = {instancePath:instancePath+"/detail",schemaPath:"#/properties/detail/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1037];
}
else {
vErrors.push(err1037);
}
errors++;
}
}
if(data.inputPreparation !== undefined){
let data302 = data.inputPreparation;
if(data302 && typeof data302 == "object" && !Array.isArray(data302)){
if(data302.version === undefined){
const err1038 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err1038];
}
else {
vErrors.push(err1038);
}
errors++;
}
if(data302.originalAssetId === undefined){
const err1039 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "originalAssetId"},message:"must have required property '"+"originalAssetId"+"'"};
if(vErrors === null){
vErrors = [err1039];
}
else {
vErrors.push(err1039);
}
errors++;
}
if(data302.normalizedAssetId === undefined){
const err1040 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "normalizedAssetId"},message:"must have required property '"+"normalizedAssetId"+"'"};
if(vErrors === null){
vErrors = [err1040];
}
else {
vErrors.push(err1040);
}
errors++;
}
if(data302.selectedAssetId === undefined){
const err1041 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "selectedAssetId"},message:"must have required property '"+"selectedAssetId"+"'"};
if(vErrors === null){
vErrors = [err1041];
}
else {
vErrors.push(err1041);
}
errors++;
}
if(data302.analysisAssetId === undefined){
const err1042 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "analysisAssetId"},message:"must have required property '"+"analysisAssetId"+"'"};
if(vErrors === null){
vErrors = [err1042];
}
else {
vErrors.push(err1042);
}
errors++;
}
if(data302.probe === undefined){
const err1043 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "probe"},message:"must have required property '"+"probe"+"'"};
if(vErrors === null){
vErrors = [err1043];
}
else {
vErrors.push(err1043);
}
errors++;
}
if(data302.selection === undefined){
const err1044 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "selection"},message:"must have required property '"+"selection"+"'"};
if(vErrors === null){
vErrors = [err1044];
}
else {
vErrors.push(err1044);
}
errors++;
}
if(data302.analysis === undefined){
const err1045 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "analysis"},message:"must have required property '"+"analysis"+"'"};
if(vErrors === null){
vErrors = [err1045];
}
else {
vErrors.push(err1045);
}
errors++;
}
for(const key49 in data302){
if(!((((((((key49 === "version") || (key49 === "originalAssetId")) || (key49 === "normalizedAssetId")) || (key49 === "selectedAssetId")) || (key49 === "analysisAssetId")) || (key49 === "probe")) || (key49 === "selection")) || (key49 === "analysis"))){
const err1046 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key49},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1046];
}
else {
vErrors.push(err1046);
}
errors++;
}
}
if(data302.version !== undefined){
if(1 !== data302.version){
const err1047 = {instancePath:instancePath+"/inputPreparation/version",schemaPath:"#/properties/inputPreparation/properties/version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err1047];
}
else {
vErrors.push(err1047);
}
errors++;
}
}
if(data302.originalAssetId !== undefined){
let data304 = data302.originalAssetId;
if(typeof data304 === "string"){
if(!pattern72.test(data304)){
const err1048 = {instancePath:instancePath+"/inputPreparation/originalAssetId",schemaPath:"#/properties/inputPreparation/properties/originalAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"+"\""};
if(vErrors === null){
vErrors = [err1048];
}
else {
vErrors.push(err1048);
}
errors++;
}
}
else {
const err1049 = {instancePath:instancePath+"/inputPreparation/originalAssetId",schemaPath:"#/properties/inputPreparation/properties/originalAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1049];
}
else {
vErrors.push(err1049);
}
errors++;
}
}
if(data302.normalizedAssetId !== undefined){
let data305 = data302.normalizedAssetId;
if(typeof data305 === "string"){
if(!pattern72.test(data305)){
const err1050 = {instancePath:instancePath+"/inputPreparation/normalizedAssetId",schemaPath:"#/properties/inputPreparation/properties/normalizedAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"+"\""};
if(vErrors === null){
vErrors = [err1050];
}
else {
vErrors.push(err1050);
}
errors++;
}
}
else {
const err1051 = {instancePath:instancePath+"/inputPreparation/normalizedAssetId",schemaPath:"#/properties/inputPreparation/properties/normalizedAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1051];
}
else {
vErrors.push(err1051);
}
errors++;
}
}
if(data302.selectedAssetId !== undefined){
let data306 = data302.selectedAssetId;
if(typeof data306 === "string"){
if(!pattern72.test(data306)){
const err1052 = {instancePath:instancePath+"/inputPreparation/selectedAssetId",schemaPath:"#/properties/inputPreparation/properties/selectedAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"+"\""};
if(vErrors === null){
vErrors = [err1052];
}
else {
vErrors.push(err1052);
}
errors++;
}
}
else {
const err1053 = {instancePath:instancePath+"/inputPreparation/selectedAssetId",schemaPath:"#/properties/inputPreparation/properties/selectedAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1053];
}
else {
vErrors.push(err1053);
}
errors++;
}
}
if(data302.analysisAssetId !== undefined){
let data307 = data302.analysisAssetId;
if(typeof data307 === "string"){
if(!pattern72.test(data307)){
const err1054 = {instancePath:instancePath+"/inputPreparation/analysisAssetId",schemaPath:"#/properties/inputPreparation/properties/analysisAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"+"\""};
if(vErrors === null){
vErrors = [err1054];
}
else {
vErrors.push(err1054);
}
errors++;
}
}
else {
const err1055 = {instancePath:instancePath+"/inputPreparation/analysisAssetId",schemaPath:"#/properties/inputPreparation/properties/analysisAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1055];
}
else {
vErrors.push(err1055);
}
errors++;
}
}
if(data302.probe !== undefined){
let data308 = data302.probe;
if(data308 && typeof data308 == "object" && !Array.isArray(data308)){
if(data308.detectorAvailable === undefined){
const err1056 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "detectorAvailable"},message:"must have required property '"+"detectorAvailable"+"'"};
if(vErrors === null){
vErrors = [err1056];
}
else {
vErrors.push(err1056);
}
errors++;
}
if(data308.originalSize === undefined){
const err1057 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "originalSize"},message:"must have required property '"+"originalSize"+"'"};
if(vErrors === null){
vErrors = [err1057];
}
else {
vErrors.push(err1057);
}
errors++;
}
if(data308.size === undefined){
const err1058 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "size"},message:"must have required property '"+"size"+"'"};
if(vErrors === null){
vErrors = [err1058];
}
else {
vErrors.push(err1058);
}
errors++;
}
if(data308.orientation === undefined){
const err1059 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "orientation"},message:"must have required property '"+"orientation"+"'"};
if(vErrors === null){
vErrors = [err1059];
}
else {
vErrors.push(err1059);
}
errors++;
}
if(data308.iccConverted === undefined){
const err1060 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "iccConverted"},message:"must have required property '"+"iccConverted"+"'"};
if(vErrors === null){
vErrors = [err1060];
}
else {
vErrors.push(err1060);
}
errors++;
}
if(data308.sourceToNormalized === undefined){
const err1061 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "sourceToNormalized"},message:"must have required property '"+"sourceToNormalized"+"'"};
if(vErrors === null){
vErrors = [err1061];
}
else {
vErrors.push(err1061);
}
errors++;
}
if(data308.reduced === undefined){
const err1062 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "reduced"},message:"must have required property '"+"reduced"+"'"};
if(vErrors === null){
vErrors = [err1062];
}
else {
vErrors.push(err1062);
}
errors++;
}
if(data308.estimatedWorkingBytes === undefined){
const err1063 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "estimatedWorkingBytes"},message:"must have required property '"+"estimatedWorkingBytes"+"'"};
if(vErrors === null){
vErrors = [err1063];
}
else {
vErrors.push(err1063);
}
errors++;
}
if(data308.format === undefined){
const err1064 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "format"},message:"must have required property '"+"format"+"'"};
if(vErrors === null){
vErrors = [err1064];
}
else {
vErrors.push(err1064);
}
errors++;
}
if(data308.hasAlpha === undefined){
const err1065 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "hasAlpha"},message:"must have required property '"+"hasAlpha"+"'"};
if(vErrors === null){
vErrors = [err1065];
}
else {
vErrors.push(err1065);
}
errors++;
}
if(data308.faceCount === undefined){
const err1066 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "faceCount"},message:"must have required property '"+"faceCount"+"'"};
if(vErrors === null){
vErrors = [err1066];
}
else {
vErrors.push(err1066);
}
errors++;
}
if(data308.candidates === undefined){
const err1067 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "candidates"},message:"must have required property '"+"candidates"+"'"};
if(vErrors === null){
vErrors = [err1067];
}
else {
vErrors.push(err1067);
}
errors++;
}
for(const key50 in data308){
if(!(func1.call(schema31.properties.inputPreparation.properties.probe.properties, key50))){
const err1068 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key50},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1068];
}
else {
vErrors.push(err1068);
}
errors++;
}
}
if(data308.detectorAvailable !== undefined){
if(typeof data308.detectorAvailable !== "boolean"){
const err1069 = {instancePath:instancePath+"/inputPreparation/probe/detectorAvailable",schemaPath:"#/properties/inputPreparation/properties/probe/properties/detectorAvailable/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1069];
}
else {
vErrors.push(err1069);
}
errors++;
}
}
if(data308.originalSize !== undefined){
let data310 = data308.originalSize;
if(data310 && typeof data310 == "object" && !Array.isArray(data310)){
if(data310.width === undefined){
const err1070 = {instancePath:instancePath+"/inputPreparation/probe/originalSize",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1070];
}
else {
vErrors.push(err1070);
}
errors++;
}
if(data310.height === undefined){
const err1071 = {instancePath:instancePath+"/inputPreparation/probe/originalSize",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1071];
}
else {
vErrors.push(err1071);
}
errors++;
}
for(const key51 in data310){
if(!((key51 === "width") || (key51 === "height"))){
const err1072 = {instancePath:instancePath+"/inputPreparation/probe/originalSize",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key51},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1072];
}
else {
vErrors.push(err1072);
}
errors++;
}
}
if(data310.width !== undefined){
let data311 = data310.width;
if(!(((typeof data311 == "number") && (!(data311 % 1) && !isNaN(data311))) && (isFinite(data311)))){
const err1073 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1073];
}
else {
vErrors.push(err1073);
}
errors++;
}
if((typeof data311 == "number") && (isFinite(data311))){
if(data311 > 4096 || isNaN(data311)){
const err1074 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1074];
}
else {
vErrors.push(err1074);
}
errors++;
}
if(data311 < 1 || isNaN(data311)){
const err1075 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1075];
}
else {
vErrors.push(err1075);
}
errors++;
}
}
}
if(data310.height !== undefined){
let data312 = data310.height;
if(!(((typeof data312 == "number") && (!(data312 % 1) && !isNaN(data312))) && (isFinite(data312)))){
const err1076 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1076];
}
else {
vErrors.push(err1076);
}
errors++;
}
if((typeof data312 == "number") && (isFinite(data312))){
if(data312 > 4096 || isNaN(data312)){
const err1077 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1077];
}
else {
vErrors.push(err1077);
}
errors++;
}
if(data312 < 1 || isNaN(data312)){
const err1078 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1078];
}
else {
vErrors.push(err1078);
}
errors++;
}
}
}
}
else {
const err1079 = {instancePath:instancePath+"/inputPreparation/probe/originalSize",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1079];
}
else {
vErrors.push(err1079);
}
errors++;
}
}
if(data308.size !== undefined){
let data313 = data308.size;
if(data313 && typeof data313 == "object" && !Array.isArray(data313)){
if(data313.width === undefined){
const err1080 = {instancePath:instancePath+"/inputPreparation/probe/size",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1080];
}
else {
vErrors.push(err1080);
}
errors++;
}
if(data313.height === undefined){
const err1081 = {instancePath:instancePath+"/inputPreparation/probe/size",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1081];
}
else {
vErrors.push(err1081);
}
errors++;
}
for(const key52 in data313){
if(!((key52 === "width") || (key52 === "height"))){
const err1082 = {instancePath:instancePath+"/inputPreparation/probe/size",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key52},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1082];
}
else {
vErrors.push(err1082);
}
errors++;
}
}
if(data313.width !== undefined){
let data314 = data313.width;
if(!(((typeof data314 == "number") && (!(data314 % 1) && !isNaN(data314))) && (isFinite(data314)))){
const err1083 = {instancePath:instancePath+"/inputPreparation/probe/size/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1083];
}
else {
vErrors.push(err1083);
}
errors++;
}
if((typeof data314 == "number") && (isFinite(data314))){
if(data314 > 4096 || isNaN(data314)){
const err1084 = {instancePath:instancePath+"/inputPreparation/probe/size/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1084];
}
else {
vErrors.push(err1084);
}
errors++;
}
if(data314 < 1 || isNaN(data314)){
const err1085 = {instancePath:instancePath+"/inputPreparation/probe/size/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1085];
}
else {
vErrors.push(err1085);
}
errors++;
}
}
}
if(data313.height !== undefined){
let data315 = data313.height;
if(!(((typeof data315 == "number") && (!(data315 % 1) && !isNaN(data315))) && (isFinite(data315)))){
const err1086 = {instancePath:instancePath+"/inputPreparation/probe/size/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1086];
}
else {
vErrors.push(err1086);
}
errors++;
}
if((typeof data315 == "number") && (isFinite(data315))){
if(data315 > 4096 || isNaN(data315)){
const err1087 = {instancePath:instancePath+"/inputPreparation/probe/size/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1087];
}
else {
vErrors.push(err1087);
}
errors++;
}
if(data315 < 1 || isNaN(data315)){
const err1088 = {instancePath:instancePath+"/inputPreparation/probe/size/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1088];
}
else {
vErrors.push(err1088);
}
errors++;
}
}
}
}
else {
const err1089 = {instancePath:instancePath+"/inputPreparation/probe/size",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1089];
}
else {
vErrors.push(err1089);
}
errors++;
}
}
if(data308.orientation !== undefined){
let data316 = data308.orientation;
if(!(((typeof data316 == "number") && (!(data316 % 1) && !isNaN(data316))) && (isFinite(data316)))){
const err1090 = {instancePath:instancePath+"/inputPreparation/probe/orientation",schemaPath:"#/properties/inputPreparation/properties/probe/properties/orientation/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1090];
}
else {
vErrors.push(err1090);
}
errors++;
}
if((typeof data316 == "number") && (isFinite(data316))){
if(data316 > 8 || isNaN(data316)){
const err1091 = {instancePath:instancePath+"/inputPreparation/probe/orientation",schemaPath:"#/properties/inputPreparation/properties/probe/properties/orientation/maximum",keyword:"maximum",params:{comparison: "<=", limit: 8},message:"must be <= 8"};
if(vErrors === null){
vErrors = [err1091];
}
else {
vErrors.push(err1091);
}
errors++;
}
if(data316 < 1 || isNaN(data316)){
const err1092 = {instancePath:instancePath+"/inputPreparation/probe/orientation",schemaPath:"#/properties/inputPreparation/properties/probe/properties/orientation/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1092];
}
else {
vErrors.push(err1092);
}
errors++;
}
}
}
if(data308.iccConverted !== undefined){
if(typeof data308.iccConverted !== "boolean"){
const err1093 = {instancePath:instancePath+"/inputPreparation/probe/iccConverted",schemaPath:"#/properties/inputPreparation/properties/probe/properties/iccConverted/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1093];
}
else {
vErrors.push(err1093);
}
errors++;
}
}
if(data308.sourceToNormalized !== undefined){
let data318 = data308.sourceToNormalized;
if(Array.isArray(data318)){
if(data318.length > 6){
const err1094 = {instancePath:instancePath+"/inputPreparation/probe/sourceToNormalized",schemaPath:"#/properties/inputPreparation/properties/probe/properties/sourceToNormalized/maxItems",keyword:"maxItems",params:{limit: 6},message:"must NOT have more than 6 items"};
if(vErrors === null){
vErrors = [err1094];
}
else {
vErrors.push(err1094);
}
errors++;
}
if(data318.length < 6){
const err1095 = {instancePath:instancePath+"/inputPreparation/probe/sourceToNormalized",schemaPath:"#/properties/inputPreparation/properties/probe/properties/sourceToNormalized/minItems",keyword:"minItems",params:{limit: 6},message:"must NOT have fewer than 6 items"};
if(vErrors === null){
vErrors = [err1095];
}
else {
vErrors.push(err1095);
}
errors++;
}
const len46 = data318.length;
for(let i50=0; i50<len46; i50++){
let data319 = data318[i50];
if(!((typeof data319 == "number") && (isFinite(data319)))){
const err1096 = {instancePath:instancePath+"/inputPreparation/probe/sourceToNormalized/" + i50,schemaPath:"#/properties/inputPreparation/properties/probe/properties/sourceToNormalized/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1096];
}
else {
vErrors.push(err1096);
}
errors++;
}
}
}
else {
const err1097 = {instancePath:instancePath+"/inputPreparation/probe/sourceToNormalized",schemaPath:"#/properties/inputPreparation/properties/probe/properties/sourceToNormalized/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1097];
}
else {
vErrors.push(err1097);
}
errors++;
}
}
if(data308.reduced !== undefined){
if(typeof data308.reduced !== "boolean"){
const err1098 = {instancePath:instancePath+"/inputPreparation/probe/reduced",schemaPath:"#/properties/inputPreparation/properties/probe/properties/reduced/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1098];
}
else {
vErrors.push(err1098);
}
errors++;
}
}
if(data308.estimatedWorkingBytes !== undefined){
let data321 = data308.estimatedWorkingBytes;
if(!(((typeof data321 == "number") && (!(data321 % 1) && !isNaN(data321))) && (isFinite(data321)))){
const err1099 = {instancePath:instancePath+"/inputPreparation/probe/estimatedWorkingBytes",schemaPath:"#/properties/inputPreparation/properties/probe/properties/estimatedWorkingBytes/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1099];
}
else {
vErrors.push(err1099);
}
errors++;
}
if((typeof data321 == "number") && (isFinite(data321))){
if(data321 > 402653184 || isNaN(data321)){
const err1100 = {instancePath:instancePath+"/inputPreparation/probe/estimatedWorkingBytes",schemaPath:"#/properties/inputPreparation/properties/probe/properties/estimatedWorkingBytes/maximum",keyword:"maximum",params:{comparison: "<=", limit: 402653184},message:"must be <= 402653184"};
if(vErrors === null){
vErrors = [err1100];
}
else {
vErrors.push(err1100);
}
errors++;
}
if(data321 < 0 || isNaN(data321)){
const err1101 = {instancePath:instancePath+"/inputPreparation/probe/estimatedWorkingBytes",schemaPath:"#/properties/inputPreparation/properties/probe/properties/estimatedWorkingBytes/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1101];
}
else {
vErrors.push(err1101);
}
errors++;
}
}
}
if(data308.format !== undefined){
let data322 = data308.format;
if(!((data322 === "png") || (data322 === "jpeg"))){
const err1102 = {instancePath:instancePath+"/inputPreparation/probe/format",schemaPath:"#/properties/inputPreparation/properties/probe/properties/format/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputPreparation.properties.probe.properties.format.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1102];
}
else {
vErrors.push(err1102);
}
errors++;
}
}
if(data308.hasAlpha !== undefined){
if(typeof data308.hasAlpha !== "boolean"){
const err1103 = {instancePath:instancePath+"/inputPreparation/probe/hasAlpha",schemaPath:"#/properties/inputPreparation/properties/probe/properties/hasAlpha/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1103];
}
else {
vErrors.push(err1103);
}
errors++;
}
}
if(data308.faceCount !== undefined){
let data324 = data308.faceCount;
if(!(((typeof data324 == "number") && (!(data324 % 1) && !isNaN(data324))) && (isFinite(data324)))){
const err1104 = {instancePath:instancePath+"/inputPreparation/probe/faceCount",schemaPath:"#/properties/inputPreparation/properties/probe/properties/faceCount/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1104];
}
else {
vErrors.push(err1104);
}
errors++;
}
if((typeof data324 == "number") && (isFinite(data324))){
if(data324 > 8 || isNaN(data324)){
const err1105 = {instancePath:instancePath+"/inputPreparation/probe/faceCount",schemaPath:"#/properties/inputPreparation/properties/probe/properties/faceCount/maximum",keyword:"maximum",params:{comparison: "<=", limit: 8},message:"must be <= 8"};
if(vErrors === null){
vErrors = [err1105];
}
else {
vErrors.push(err1105);
}
errors++;
}
if(data324 < 0 || isNaN(data324)){
const err1106 = {instancePath:instancePath+"/inputPreparation/probe/faceCount",schemaPath:"#/properties/inputPreparation/properties/probe/properties/faceCount/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1106];
}
else {
vErrors.push(err1106);
}
errors++;
}
}
}
if(data308.candidates !== undefined){
let data325 = data308.candidates;
if(Array.isArray(data325)){
if(data325.length > 8){
const err1107 = {instancePath:instancePath+"/inputPreparation/probe/candidates",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/maxItems",keyword:"maxItems",params:{limit: 8},message:"must NOT have more than 8 items"};
if(vErrors === null){
vErrors = [err1107];
}
else {
vErrors.push(err1107);
}
errors++;
}
const len47 = data325.length;
for(let i51=0; i51<len47; i51++){
let data326 = data325[i51];
if(data326 && typeof data326 == "object" && !Array.isArray(data326)){
if(data326.rect === undefined){
const err1108 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51,schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err1108];
}
else {
vErrors.push(err1108);
}
errors++;
}
if(data326.method === undefined){
const err1109 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51,schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/required",keyword:"required",params:{missingProperty: "method"},message:"must have required property '"+"method"+"'"};
if(vErrors === null){
vErrors = [err1109];
}
else {
vErrors.push(err1109);
}
errors++;
}
for(const key53 in data326){
if(!((key53 === "rect") || (key53 === "method"))){
const err1110 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51,schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key53},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1110];
}
else {
vErrors.push(err1110);
}
errors++;
}
}
if(data326.rect !== undefined){
let data327 = data326.rect;
if(data327 && typeof data327 == "object" && !Array.isArray(data327)){
if(data327.x === undefined){
const err1111 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1111];
}
else {
vErrors.push(err1111);
}
errors++;
}
if(data327.y === undefined){
const err1112 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1112];
}
else {
vErrors.push(err1112);
}
errors++;
}
if(data327.width === undefined){
const err1113 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1113];
}
else {
vErrors.push(err1113);
}
errors++;
}
if(data327.height === undefined){
const err1114 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1114];
}
else {
vErrors.push(err1114);
}
errors++;
}
for(const key54 in data327){
if(!((((key54 === "x") || (key54 === "y")) || (key54 === "width")) || (key54 === "height"))){
const err1115 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key54},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1115];
}
else {
vErrors.push(err1115);
}
errors++;
}
}
if(data327.x !== undefined){
let data328 = data327.x;
if(!(((typeof data328 == "number") && (!(data328 % 1) && !isNaN(data328))) && (isFinite(data328)))){
const err1116 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/x/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1116];
}
else {
vErrors.push(err1116);
}
errors++;
}
if((typeof data328 == "number") && (isFinite(data328))){
if(data328 > 4096 || isNaN(data328)){
const err1117 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1117];
}
else {
vErrors.push(err1117);
}
errors++;
}
if(data328 < 0 || isNaN(data328)){
const err1118 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1118];
}
else {
vErrors.push(err1118);
}
errors++;
}
}
}
if(data327.y !== undefined){
let data329 = data327.y;
if(!(((typeof data329 == "number") && (!(data329 % 1) && !isNaN(data329))) && (isFinite(data329)))){
const err1119 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/y/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1119];
}
else {
vErrors.push(err1119);
}
errors++;
}
if((typeof data329 == "number") && (isFinite(data329))){
if(data329 > 4096 || isNaN(data329)){
const err1120 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1120];
}
else {
vErrors.push(err1120);
}
errors++;
}
if(data329 < 0 || isNaN(data329)){
const err1121 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1121];
}
else {
vErrors.push(err1121);
}
errors++;
}
}
}
if(data327.width !== undefined){
let data330 = data327.width;
if(!(((typeof data330 == "number") && (!(data330 % 1) && !isNaN(data330))) && (isFinite(data330)))){
const err1122 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1122];
}
else {
vErrors.push(err1122);
}
errors++;
}
if((typeof data330 == "number") && (isFinite(data330))){
if(data330 > 4096 || isNaN(data330)){
const err1123 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1123];
}
else {
vErrors.push(err1123);
}
errors++;
}
if(data330 < 1 || isNaN(data330)){
const err1124 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1124];
}
else {
vErrors.push(err1124);
}
errors++;
}
}
}
if(data327.height !== undefined){
let data331 = data327.height;
if(!(((typeof data331 == "number") && (!(data331 % 1) && !isNaN(data331))) && (isFinite(data331)))){
const err1125 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1125];
}
else {
vErrors.push(err1125);
}
errors++;
}
if((typeof data331 == "number") && (isFinite(data331))){
if(data331 > 4096 || isNaN(data331)){
const err1126 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1126];
}
else {
vErrors.push(err1126);
}
errors++;
}
if(data331 < 1 || isNaN(data331)){
const err1127 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1127];
}
else {
vErrors.push(err1127);
}
errors++;
}
}
}
}
else {
const err1128 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1128];
}
else {
vErrors.push(err1128);
}
errors++;
}
}
if(data326.method !== undefined){
let data332 = data326.method;
if(!(((data332 === "alpha") || (data332 === "face")) || (data332 === "manual-required"))){
const err1129 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51+"/method",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/method/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputPreparation.properties.probe.properties.candidates.items.properties.method.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1129];
}
else {
vErrors.push(err1129);
}
errors++;
}
}
}
else {
const err1130 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i51,schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1130];
}
else {
vErrors.push(err1130);
}
errors++;
}
}
}
else {
const err1131 = {instancePath:instancePath+"/inputPreparation/probe/candidates",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1131];
}
else {
vErrors.push(err1131);
}
errors++;
}
}
}
else {
const err1132 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1132];
}
else {
vErrors.push(err1132);
}
errors++;
}
}
if(data302.selection !== undefined){
let data333 = data302.selection;
if(data333 && typeof data333 == "object" && !Array.isArray(data333)){
if(data333.rect === undefined){
const err1133 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err1133];
}
else {
vErrors.push(err1133);
}
errors++;
}
if(data333.backgroundTolerance === undefined){
const err1134 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/required",keyword:"required",params:{missingProperty: "backgroundTolerance"},message:"must have required property '"+"backgroundTolerance"+"'"};
if(vErrors === null){
vErrors = [err1134];
}
else {
vErrors.push(err1134);
}
errors++;
}
if(data333.masks === undefined){
const err1135 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/required",keyword:"required",params:{missingProperty: "masks"},message:"must have required property '"+"masks"+"'"};
if(vErrors === null){
vErrors = [err1135];
}
else {
vErrors.push(err1135);
}
errors++;
}
if(data333.occluded === undefined){
const err1136 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/required",keyword:"required",params:{missingProperty: "occluded"},message:"must have required property '"+"occluded"+"'"};
if(vErrors === null){
vErrors = [err1136];
}
else {
vErrors.push(err1136);
}
errors++;
}
for(const key55 in data333){
if(!((((key55 === "rect") || (key55 === "backgroundTolerance")) || (key55 === "masks")) || (key55 === "occluded"))){
const err1137 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key55},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1137];
}
else {
vErrors.push(err1137);
}
errors++;
}
}
if(data333.rect !== undefined){
let data334 = data333.rect;
if(data334 && typeof data334 == "object" && !Array.isArray(data334)){
if(data334.x === undefined){
const err1138 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1138];
}
else {
vErrors.push(err1138);
}
errors++;
}
if(data334.y === undefined){
const err1139 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1139];
}
else {
vErrors.push(err1139);
}
errors++;
}
if(data334.width === undefined){
const err1140 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1140];
}
else {
vErrors.push(err1140);
}
errors++;
}
if(data334.height === undefined){
const err1141 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1141];
}
else {
vErrors.push(err1141);
}
errors++;
}
for(const key56 in data334){
if(!((((key56 === "x") || (key56 === "y")) || (key56 === "width")) || (key56 === "height"))){
const err1142 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key56},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1142];
}
else {
vErrors.push(err1142);
}
errors++;
}
}
if(data334.x !== undefined){
let data335 = data334.x;
if(!(((typeof data335 == "number") && (!(data335 % 1) && !isNaN(data335))) && (isFinite(data335)))){
const err1143 = {instancePath:instancePath+"/inputPreparation/selection/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/x/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1143];
}
else {
vErrors.push(err1143);
}
errors++;
}
if((typeof data335 == "number") && (isFinite(data335))){
if(data335 > 4096 || isNaN(data335)){
const err1144 = {instancePath:instancePath+"/inputPreparation/selection/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1144];
}
else {
vErrors.push(err1144);
}
errors++;
}
if(data335 < 0 || isNaN(data335)){
const err1145 = {instancePath:instancePath+"/inputPreparation/selection/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1145];
}
else {
vErrors.push(err1145);
}
errors++;
}
}
}
if(data334.y !== undefined){
let data336 = data334.y;
if(!(((typeof data336 == "number") && (!(data336 % 1) && !isNaN(data336))) && (isFinite(data336)))){
const err1146 = {instancePath:instancePath+"/inputPreparation/selection/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/y/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1146];
}
else {
vErrors.push(err1146);
}
errors++;
}
if((typeof data336 == "number") && (isFinite(data336))){
if(data336 > 4096 || isNaN(data336)){
const err1147 = {instancePath:instancePath+"/inputPreparation/selection/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1147];
}
else {
vErrors.push(err1147);
}
errors++;
}
if(data336 < 0 || isNaN(data336)){
const err1148 = {instancePath:instancePath+"/inputPreparation/selection/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1148];
}
else {
vErrors.push(err1148);
}
errors++;
}
}
}
if(data334.width !== undefined){
let data337 = data334.width;
if(!(((typeof data337 == "number") && (!(data337 % 1) && !isNaN(data337))) && (isFinite(data337)))){
const err1149 = {instancePath:instancePath+"/inputPreparation/selection/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1149];
}
else {
vErrors.push(err1149);
}
errors++;
}
if((typeof data337 == "number") && (isFinite(data337))){
if(data337 > 4096 || isNaN(data337)){
const err1150 = {instancePath:instancePath+"/inputPreparation/selection/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1150];
}
else {
vErrors.push(err1150);
}
errors++;
}
if(data337 < 1 || isNaN(data337)){
const err1151 = {instancePath:instancePath+"/inputPreparation/selection/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1151];
}
else {
vErrors.push(err1151);
}
errors++;
}
}
}
if(data334.height !== undefined){
let data338 = data334.height;
if(!(((typeof data338 == "number") && (!(data338 % 1) && !isNaN(data338))) && (isFinite(data338)))){
const err1152 = {instancePath:instancePath+"/inputPreparation/selection/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1152];
}
else {
vErrors.push(err1152);
}
errors++;
}
if((typeof data338 == "number") && (isFinite(data338))){
if(data338 > 4096 || isNaN(data338)){
const err1153 = {instancePath:instancePath+"/inputPreparation/selection/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1153];
}
else {
vErrors.push(err1153);
}
errors++;
}
if(data338 < 1 || isNaN(data338)){
const err1154 = {instancePath:instancePath+"/inputPreparation/selection/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1154];
}
else {
vErrors.push(err1154);
}
errors++;
}
}
}
}
else {
const err1155 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1155];
}
else {
vErrors.push(err1155);
}
errors++;
}
}
if(data333.backgroundTolerance !== undefined){
let data339 = data333.backgroundTolerance;
const _errs762 = errors;
let valid173 = false;
const _errs763 = errors;
if(data339 !== null){
const err1156 = {instancePath:instancePath+"/inputPreparation/selection/backgroundTolerance",schemaPath:"#/properties/inputPreparation/properties/selection/properties/backgroundTolerance/anyOf/0/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1156];
}
else {
vErrors.push(err1156);
}
errors++;
}
var _valid16 = _errs763 === errors;
valid173 = valid173 || _valid16;
const _errs765 = errors;
if(!(((typeof data339 == "number") && (!(data339 % 1) && !isNaN(data339))) && (isFinite(data339)))){
const err1157 = {instancePath:instancePath+"/inputPreparation/selection/backgroundTolerance",schemaPath:"#/properties/inputPreparation/properties/selection/properties/backgroundTolerance/anyOf/1/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1157];
}
else {
vErrors.push(err1157);
}
errors++;
}
if((typeof data339 == "number") && (isFinite(data339))){
if(data339 > 80 || isNaN(data339)){
const err1158 = {instancePath:instancePath+"/inputPreparation/selection/backgroundTolerance",schemaPath:"#/properties/inputPreparation/properties/selection/properties/backgroundTolerance/anyOf/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 80},message:"must be <= 80"};
if(vErrors === null){
vErrors = [err1158];
}
else {
vErrors.push(err1158);
}
errors++;
}
if(data339 < 0 || isNaN(data339)){
const err1159 = {instancePath:instancePath+"/inputPreparation/selection/backgroundTolerance",schemaPath:"#/properties/inputPreparation/properties/selection/properties/backgroundTolerance/anyOf/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1159];
}
else {
vErrors.push(err1159);
}
errors++;
}
}
var _valid16 = _errs765 === errors;
valid173 = valid173 || _valid16;
if(!valid173){
const err1160 = {instancePath:instancePath+"/inputPreparation/selection/backgroundTolerance",schemaPath:"#/properties/inputPreparation/properties/selection/properties/backgroundTolerance/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1160];
}
else {
vErrors.push(err1160);
}
errors++;
}
else {
errors = _errs762;
if(vErrors !== null){
if(_errs762){
vErrors.length = _errs762;
}
else {
vErrors = null;
}
}
}
}
if(data333.masks !== undefined){
let data340 = data333.masks;
if(Array.isArray(data340)){
if(data340.length > 64){
const err1161 = {instancePath:instancePath+"/inputPreparation/selection/masks",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err1161];
}
else {
vErrors.push(err1161);
}
errors++;
}
const len48 = data340.length;
for(let i52=0; i52<len48; i52++){
let data341 = data340[i52];
if(data341 && typeof data341 == "object" && !Array.isArray(data341)){
if(data341.mode === undefined){
const err1162 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52,schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err1162];
}
else {
vErrors.push(err1162);
}
errors++;
}
if(data341.rect === undefined){
const err1163 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52,schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err1163];
}
else {
vErrors.push(err1163);
}
errors++;
}
for(const key57 in data341){
if(!((key57 === "mode") || (key57 === "rect"))){
const err1164 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52,schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key57},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1164];
}
else {
vErrors.push(err1164);
}
errors++;
}
}
if(data341.mode !== undefined){
let data342 = data341.mode;
if(!((data342 === "erase") || (data342 === "restore"))){
const err1165 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/mode",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputPreparation.properties.selection.properties.masks.items.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1165];
}
else {
vErrors.push(err1165);
}
errors++;
}
}
if(data341.rect !== undefined){
let data343 = data341.rect;
if(data343 && typeof data343 == "object" && !Array.isArray(data343)){
if(data343.x === undefined){
const err1166 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1166];
}
else {
vErrors.push(err1166);
}
errors++;
}
if(data343.y === undefined){
const err1167 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1167];
}
else {
vErrors.push(err1167);
}
errors++;
}
if(data343.width === undefined){
const err1168 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1168];
}
else {
vErrors.push(err1168);
}
errors++;
}
if(data343.height === undefined){
const err1169 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1169];
}
else {
vErrors.push(err1169);
}
errors++;
}
for(const key58 in data343){
if(!((((key58 === "x") || (key58 === "y")) || (key58 === "width")) || (key58 === "height"))){
const err1170 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key58},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1170];
}
else {
vErrors.push(err1170);
}
errors++;
}
}
if(data343.x !== undefined){
let data344 = data343.x;
if(!(((typeof data344 == "number") && (!(data344 % 1) && !isNaN(data344))) && (isFinite(data344)))){
const err1171 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/x/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1171];
}
else {
vErrors.push(err1171);
}
errors++;
}
if((typeof data344 == "number") && (isFinite(data344))){
if(data344 > 4096 || isNaN(data344)){
const err1172 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1172];
}
else {
vErrors.push(err1172);
}
errors++;
}
if(data344 < 0 || isNaN(data344)){
const err1173 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1173];
}
else {
vErrors.push(err1173);
}
errors++;
}
}
}
if(data343.y !== undefined){
let data345 = data343.y;
if(!(((typeof data345 == "number") && (!(data345 % 1) && !isNaN(data345))) && (isFinite(data345)))){
const err1174 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/y/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1174];
}
else {
vErrors.push(err1174);
}
errors++;
}
if((typeof data345 == "number") && (isFinite(data345))){
if(data345 > 4096 || isNaN(data345)){
const err1175 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1175];
}
else {
vErrors.push(err1175);
}
errors++;
}
if(data345 < 0 || isNaN(data345)){
const err1176 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1176];
}
else {
vErrors.push(err1176);
}
errors++;
}
}
}
if(data343.width !== undefined){
let data346 = data343.width;
if(!(((typeof data346 == "number") && (!(data346 % 1) && !isNaN(data346))) && (isFinite(data346)))){
const err1177 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1177];
}
else {
vErrors.push(err1177);
}
errors++;
}
if((typeof data346 == "number") && (isFinite(data346))){
if(data346 > 4096 || isNaN(data346)){
const err1178 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1178];
}
else {
vErrors.push(err1178);
}
errors++;
}
if(data346 < 1 || isNaN(data346)){
const err1179 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1179];
}
else {
vErrors.push(err1179);
}
errors++;
}
}
}
if(data343.height !== undefined){
let data347 = data343.height;
if(!(((typeof data347 == "number") && (!(data347 % 1) && !isNaN(data347))) && (isFinite(data347)))){
const err1180 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1180];
}
else {
vErrors.push(err1180);
}
errors++;
}
if((typeof data347 == "number") && (isFinite(data347))){
if(data347 > 4096 || isNaN(data347)){
const err1181 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1181];
}
else {
vErrors.push(err1181);
}
errors++;
}
if(data347 < 1 || isNaN(data347)){
const err1182 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1182];
}
else {
vErrors.push(err1182);
}
errors++;
}
}
}
}
else {
const err1183 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1183];
}
else {
vErrors.push(err1183);
}
errors++;
}
}
}
else {
const err1184 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i52,schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1184];
}
else {
vErrors.push(err1184);
}
errors++;
}
}
}
else {
const err1185 = {instancePath:instancePath+"/inputPreparation/selection/masks",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1185];
}
else {
vErrors.push(err1185);
}
errors++;
}
}
if(data333.occluded !== undefined){
if(typeof data333.occluded !== "boolean"){
const err1186 = {instancePath:instancePath+"/inputPreparation/selection/occluded",schemaPath:"#/properties/inputPreparation/properties/selection/properties/occluded/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1186];
}
else {
vErrors.push(err1186);
}
errors++;
}
}
}
else {
const err1187 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1187];
}
else {
vErrors.push(err1187);
}
errors++;
}
}
if(data302.analysis !== undefined){
let data349 = data302.analysis;
if(data349 && typeof data349 == "object" && !Array.isArray(data349)){
if(data349.faces === undefined){
const err1188 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/required",keyword:"required",params:{missingProperty: "faces"},message:"must have required property '"+"faces"+"'"};
if(vErrors === null){
vErrors = [err1188];
}
else {
vErrors.push(err1188);
}
errors++;
}
if(data349.warnings === undefined){
const err1189 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/required",keyword:"required",params:{missingProperty: "warnings"},message:"must have required property '"+"warnings"+"'"};
if(vErrors === null){
vErrors = [err1189];
}
else {
vErrors.push(err1189);
}
errors++;
}
if(data349.crop === undefined){
const err1190 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/required",keyword:"required",params:{missingProperty: "crop"},message:"must have required property '"+"crop"+"'"};
if(vErrors === null){
vErrors = [err1190];
}
else {
vErrors.push(err1190);
}
errors++;
}
if(data349.analysisSize === undefined){
const err1191 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/required",keyword:"required",params:{missingProperty: "analysisSize"},message:"must have required property '"+"analysisSize"+"'"};
if(vErrors === null){
vErrors = [err1191];
}
else {
vErrors.push(err1191);
}
errors++;
}
for(const key59 in data349){
if(!((((key59 === "faces") || (key59 === "warnings")) || (key59 === "crop")) || (key59 === "analysisSize"))){
const err1192 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key59},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1192];
}
else {
vErrors.push(err1192);
}
errors++;
}
}
if(data349.faces !== undefined){
let data350 = data349.faces;
if(Array.isArray(data350)){
if(data350.length > 8){
const err1193 = {instancePath:instancePath+"/inputPreparation/analysis/faces",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/maxItems",keyword:"maxItems",params:{limit: 8},message:"must NOT have more than 8 items"};
if(vErrors === null){
vErrors = [err1193];
}
else {
vErrors.push(err1193);
}
errors++;
}
const len49 = data350.length;
for(let i53=0; i53<len49; i53++){
let data351 = data350[i53];
if(data351 && typeof data351 == "object" && !Array.isArray(data351)){
if(data351.x === undefined){
const err1194 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1194];
}
else {
vErrors.push(err1194);
}
errors++;
}
if(data351.y === undefined){
const err1195 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1195];
}
else {
vErrors.push(err1195);
}
errors++;
}
if(data351.width === undefined){
const err1196 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1196];
}
else {
vErrors.push(err1196);
}
errors++;
}
if(data351.height === undefined){
const err1197 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1197];
}
else {
vErrors.push(err1197);
}
errors++;
}
for(const key60 in data351){
if(!((((key60 === "x") || (key60 === "y")) || (key60 === "width")) || (key60 === "height"))){
const err1198 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key60},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1198];
}
else {
vErrors.push(err1198);
}
errors++;
}
}
if(data351.x !== undefined){
let data352 = data351.x;
if((typeof data352 == "number") && (isFinite(data352))){
if(data352 > 1024 || isNaN(data352)){
const err1199 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53+"/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1024},message:"must be <= 1024"};
if(vErrors === null){
vErrors = [err1199];
}
else {
vErrors.push(err1199);
}
errors++;
}
if(data352 < 0 || isNaN(data352)){
const err1200 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53+"/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1200];
}
else {
vErrors.push(err1200);
}
errors++;
}
}
else {
const err1201 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53+"/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1201];
}
else {
vErrors.push(err1201);
}
errors++;
}
}
if(data351.y !== undefined){
let data353 = data351.y;
if((typeof data353 == "number") && (isFinite(data353))){
if(data353 > 1024 || isNaN(data353)){
const err1202 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53+"/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1024},message:"must be <= 1024"};
if(vErrors === null){
vErrors = [err1202];
}
else {
vErrors.push(err1202);
}
errors++;
}
if(data353 < 0 || isNaN(data353)){
const err1203 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53+"/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1203];
}
else {
vErrors.push(err1203);
}
errors++;
}
}
else {
const err1204 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53+"/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1204];
}
else {
vErrors.push(err1204);
}
errors++;
}
}
if(data351.width !== undefined){
let data354 = data351.width;
if((typeof data354 == "number") && (isFinite(data354))){
if(data354 > 1024 || isNaN(data354)){
const err1205 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53+"/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1024},message:"must be <= 1024"};
if(vErrors === null){
vErrors = [err1205];
}
else {
vErrors.push(err1205);
}
errors++;
}
if(data354 <= 0 || isNaN(data354)){
const err1206 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53+"/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1206];
}
else {
vErrors.push(err1206);
}
errors++;
}
}
else {
const err1207 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53+"/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1207];
}
else {
vErrors.push(err1207);
}
errors++;
}
}
if(data351.height !== undefined){
let data355 = data351.height;
if((typeof data355 == "number") && (isFinite(data355))){
if(data355 > 1024 || isNaN(data355)){
const err1208 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53+"/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1024},message:"must be <= 1024"};
if(vErrors === null){
vErrors = [err1208];
}
else {
vErrors.push(err1208);
}
errors++;
}
if(data355 <= 0 || isNaN(data355)){
const err1209 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53+"/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1209];
}
else {
vErrors.push(err1209);
}
errors++;
}
}
else {
const err1210 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53+"/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1210];
}
else {
vErrors.push(err1210);
}
errors++;
}
}
}
else {
const err1211 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i53,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1211];
}
else {
vErrors.push(err1211);
}
errors++;
}
}
}
else {
const err1212 = {instancePath:instancePath+"/inputPreparation/analysis/faces",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1212];
}
else {
vErrors.push(err1212);
}
errors++;
}
}
if(data349.warnings !== undefined){
let data356 = data349.warnings;
if(Array.isArray(data356)){
if(data356.length > 8){
const err1213 = {instancePath:instancePath+"/inputPreparation/analysis/warnings",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/warnings/maxItems",keyword:"maxItems",params:{limit: 8},message:"must NOT have more than 8 items"};
if(vErrors === null){
vErrors = [err1213];
}
else {
vErrors.push(err1213);
}
errors++;
}
const len50 = data356.length;
for(let i54=0; i54<len50; i54++){
let data357 = data356[i54];
if(!(((((data357 === "DETECTOR_UNAVAILABLE") || (data357 === "FACE_UNCONFIRMED")) || (data357 === "SMALL_FACE")) || (data357 === "EDGE_CROPPED_POSSIBLE")) || (data357 === "OCCLUDED_USER_REPORTED"))){
const err1214 = {instancePath:instancePath+"/inputPreparation/analysis/warnings/" + i54,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/warnings/items/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputPreparation.properties.analysis.properties.warnings.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1214];
}
else {
vErrors.push(err1214);
}
errors++;
}
}
}
else {
const err1215 = {instancePath:instancePath+"/inputPreparation/analysis/warnings",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/warnings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1215];
}
else {
vErrors.push(err1215);
}
errors++;
}
}
if(data349.crop !== undefined){
let data358 = data349.crop;
if(data358 && typeof data358 == "object" && !Array.isArray(data358)){
if(data358.x === undefined){
const err1216 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1216];
}
else {
vErrors.push(err1216);
}
errors++;
}
if(data358.y === undefined){
const err1217 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1217];
}
else {
vErrors.push(err1217);
}
errors++;
}
if(data358.width === undefined){
const err1218 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1218];
}
else {
vErrors.push(err1218);
}
errors++;
}
if(data358.height === undefined){
const err1219 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1219];
}
else {
vErrors.push(err1219);
}
errors++;
}
for(const key61 in data358){
if(!((((key61 === "x") || (key61 === "y")) || (key61 === "width")) || (key61 === "height"))){
const err1220 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key61},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1220];
}
else {
vErrors.push(err1220);
}
errors++;
}
}
if(data358.x !== undefined){
let data359 = data358.x;
if(!(((typeof data359 == "number") && (!(data359 % 1) && !isNaN(data359))) && (isFinite(data359)))){
const err1221 = {instancePath:instancePath+"/inputPreparation/analysis/crop/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/x/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1221];
}
else {
vErrors.push(err1221);
}
errors++;
}
if((typeof data359 == "number") && (isFinite(data359))){
if(data359 > 4096 || isNaN(data359)){
const err1222 = {instancePath:instancePath+"/inputPreparation/analysis/crop/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1222];
}
else {
vErrors.push(err1222);
}
errors++;
}
if(data359 < 0 || isNaN(data359)){
const err1223 = {instancePath:instancePath+"/inputPreparation/analysis/crop/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1223];
}
else {
vErrors.push(err1223);
}
errors++;
}
}
}
if(data358.y !== undefined){
let data360 = data358.y;
if(!(((typeof data360 == "number") && (!(data360 % 1) && !isNaN(data360))) && (isFinite(data360)))){
const err1224 = {instancePath:instancePath+"/inputPreparation/analysis/crop/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/y/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1224];
}
else {
vErrors.push(err1224);
}
errors++;
}
if((typeof data360 == "number") && (isFinite(data360))){
if(data360 > 4096 || isNaN(data360)){
const err1225 = {instancePath:instancePath+"/inputPreparation/analysis/crop/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1225];
}
else {
vErrors.push(err1225);
}
errors++;
}
if(data360 < 0 || isNaN(data360)){
const err1226 = {instancePath:instancePath+"/inputPreparation/analysis/crop/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1226];
}
else {
vErrors.push(err1226);
}
errors++;
}
}
}
if(data358.width !== undefined){
let data361 = data358.width;
if(!(((typeof data361 == "number") && (!(data361 % 1) && !isNaN(data361))) && (isFinite(data361)))){
const err1227 = {instancePath:instancePath+"/inputPreparation/analysis/crop/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1227];
}
else {
vErrors.push(err1227);
}
errors++;
}
if((typeof data361 == "number") && (isFinite(data361))){
if(data361 > 4096 || isNaN(data361)){
const err1228 = {instancePath:instancePath+"/inputPreparation/analysis/crop/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1228];
}
else {
vErrors.push(err1228);
}
errors++;
}
if(data361 < 1 || isNaN(data361)){
const err1229 = {instancePath:instancePath+"/inputPreparation/analysis/crop/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1229];
}
else {
vErrors.push(err1229);
}
errors++;
}
}
}
if(data358.height !== undefined){
let data362 = data358.height;
if(!(((typeof data362 == "number") && (!(data362 % 1) && !isNaN(data362))) && (isFinite(data362)))){
const err1230 = {instancePath:instancePath+"/inputPreparation/analysis/crop/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1230];
}
else {
vErrors.push(err1230);
}
errors++;
}
if((typeof data362 == "number") && (isFinite(data362))){
if(data362 > 4096 || isNaN(data362)){
const err1231 = {instancePath:instancePath+"/inputPreparation/analysis/crop/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1231];
}
else {
vErrors.push(err1231);
}
errors++;
}
if(data362 < 1 || isNaN(data362)){
const err1232 = {instancePath:instancePath+"/inputPreparation/analysis/crop/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1232];
}
else {
vErrors.push(err1232);
}
errors++;
}
}
}
}
else {
const err1233 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1233];
}
else {
vErrors.push(err1233);
}
errors++;
}
}
if(data349.analysisSize !== undefined){
let data363 = data349.analysisSize;
if(data363 && typeof data363 == "object" && !Array.isArray(data363)){
if(data363.width === undefined){
const err1234 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1234];
}
else {
vErrors.push(err1234);
}
errors++;
}
if(data363.height === undefined){
const err1235 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1235];
}
else {
vErrors.push(err1235);
}
errors++;
}
for(const key62 in data363){
if(!((key62 === "width") || (key62 === "height"))){
const err1236 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key62},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1236];
}
else {
vErrors.push(err1236);
}
errors++;
}
}
if(data363.width !== undefined){
let data364 = data363.width;
if(!(((typeof data364 == "number") && (!(data364 % 1) && !isNaN(data364))) && (isFinite(data364)))){
const err1237 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1237];
}
else {
vErrors.push(err1237);
}
errors++;
}
if((typeof data364 == "number") && (isFinite(data364))){
if(data364 > 4096 || isNaN(data364)){
const err1238 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1238];
}
else {
vErrors.push(err1238);
}
errors++;
}
if(data364 < 1 || isNaN(data364)){
const err1239 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1239];
}
else {
vErrors.push(err1239);
}
errors++;
}
}
}
if(data363.height !== undefined){
let data365 = data363.height;
if(!(((typeof data365 == "number") && (!(data365 % 1) && !isNaN(data365))) && (isFinite(data365)))){
const err1240 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1240];
}
else {
vErrors.push(err1240);
}
errors++;
}
if((typeof data365 == "number") && (isFinite(data365))){
if(data365 > 4096 || isNaN(data365)){
const err1241 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1241];
}
else {
vErrors.push(err1241);
}
errors++;
}
if(data365 < 1 || isNaN(data365)){
const err1242 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1242];
}
else {
vErrors.push(err1242);
}
errors++;
}
}
}
}
else {
const err1243 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1243];
}
else {
vErrors.push(err1243);
}
errors++;
}
}
}
else {
const err1244 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1244];
}
else {
vErrors.push(err1244);
}
errors++;
}
}
}
else {
const err1245 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1245];
}
else {
vErrors.push(err1245);
}
errors++;
}
}
if(data.assembly !== undefined){
let data366 = data.assembly;
if(data366 && typeof data366 == "object" && !Array.isArray(data366)){
if(data366.catalogId === undefined){
const err1246 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "catalogId"},message:"must have required property '"+"catalogId"+"'"};
if(vErrors === null){
vErrors = [err1246];
}
else {
vErrors.push(err1246);
}
errors++;
}
if(data366.version === undefined){
const err1247 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err1247];
}
else {
vErrors.push(err1247);
}
errors++;
}
if(data366.linkedEyes === undefined){
const err1248 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "linkedEyes"},message:"must have required property '"+"linkedEyes"+"'"};
if(vErrors === null){
vErrors = [err1248];
}
else {
vErrors.push(err1248);
}
errors++;
}
if(data366.choices === undefined){
const err1249 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "choices"},message:"must have required property '"+"choices"+"'"};
if(vErrors === null){
vErrors = [err1249];
}
else {
vErrors.push(err1249);
}
errors++;
}
if(data366.adjustments === undefined){
const err1250 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "adjustments"},message:"must have required property '"+"adjustments"+"'"};
if(vErrors === null){
vErrors = [err1250];
}
else {
vErrors.push(err1250);
}
errors++;
}
if(data366.warnings === undefined){
const err1251 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "warnings"},message:"must have required property '"+"warnings"+"'"};
if(vErrors === null){
vErrors = [err1251];
}
else {
vErrors.push(err1251);
}
errors++;
}
for(const key63 in data366){
if(!((((((key63 === "catalogId") || (key63 === "version")) || (key63 === "linkedEyes")) || (key63 === "choices")) || (key63 === "adjustments")) || (key63 === "warnings"))){
const err1252 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key63},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1252];
}
else {
vErrors.push(err1252);
}
errors++;
}
}
if(data366.catalogId !== undefined){
let data367 = data366.catalogId;
if(typeof data367 === "string"){
if(func2(data367) > 64){
const err1253 = {instancePath:instancePath+"/assembly/catalogId",schemaPath:"#/properties/assembly/properties/catalogId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1253];
}
else {
vErrors.push(err1253);
}
errors++;
}
if(func2(data367) < 1){
const err1254 = {instancePath:instancePath+"/assembly/catalogId",schemaPath:"#/properties/assembly/properties/catalogId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1254];
}
else {
vErrors.push(err1254);
}
errors++;
}
if(!pattern4.test(data367)){
const err1255 = {instancePath:instancePath+"/assembly/catalogId",schemaPath:"#/properties/assembly/properties/catalogId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1255];
}
else {
vErrors.push(err1255);
}
errors++;
}
}
else {
const err1256 = {instancePath:instancePath+"/assembly/catalogId",schemaPath:"#/properties/assembly/properties/catalogId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1256];
}
else {
vErrors.push(err1256);
}
errors++;
}
}
if(data366.version !== undefined){
let data368 = data366.version;
if(typeof data368 === "string"){
if(func2(data368) > 32){
const err1257 = {instancePath:instancePath+"/assembly/version",schemaPath:"#/properties/assembly/properties/version/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err1257];
}
else {
vErrors.push(err1257);
}
errors++;
}
if(func2(data368) < 1){
const err1258 = {instancePath:instancePath+"/assembly/version",schemaPath:"#/properties/assembly/properties/version/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1258];
}
else {
vErrors.push(err1258);
}
errors++;
}
if(!pattern12.test(data368)){
const err1259 = {instancePath:instancePath+"/assembly/version",schemaPath:"#/properties/assembly/properties/version/pattern",keyword:"pattern",params:{pattern: "^\\d+\\.\\d+\\.\\d+$"},message:"must match pattern \""+"^\\d+\\.\\d+\\.\\d+$"+"\""};
if(vErrors === null){
vErrors = [err1259];
}
else {
vErrors.push(err1259);
}
errors++;
}
}
else {
const err1260 = {instancePath:instancePath+"/assembly/version",schemaPath:"#/properties/assembly/properties/version/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1260];
}
else {
vErrors.push(err1260);
}
errors++;
}
}
if(data366.linkedEyes !== undefined){
if(typeof data366.linkedEyes !== "boolean"){
const err1261 = {instancePath:instancePath+"/assembly/linkedEyes",schemaPath:"#/properties/assembly/properties/linkedEyes/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1261];
}
else {
vErrors.push(err1261);
}
errors++;
}
}
if(data366.choices !== undefined){
let data370 = data366.choices;
if(Array.isArray(data370)){
if(data370.length > 6){
const err1262 = {instancePath:instancePath+"/assembly/choices",schemaPath:"#/properties/assembly/properties/choices/maxItems",keyword:"maxItems",params:{limit: 6},message:"must NOT have more than 6 items"};
if(vErrors === null){
vErrors = [err1262];
}
else {
vErrors.push(err1262);
}
errors++;
}
const len51 = data370.length;
for(let i55=0; i55<len51; i55++){
let data371 = data370[i55];
if(data371 && typeof data371 == "object" && !Array.isArray(data371)){
if(data371.slot === undefined){
const err1263 = {instancePath:instancePath+"/assembly/choices/" + i55,schemaPath:"#/properties/assembly/properties/choices/items/required",keyword:"required",params:{missingProperty: "slot"},message:"must have required property '"+"slot"+"'"};
if(vErrors === null){
vErrors = [err1263];
}
else {
vErrors.push(err1263);
}
errors++;
}
if(data371.itemId === undefined){
const err1264 = {instancePath:instancePath+"/assembly/choices/" + i55,schemaPath:"#/properties/assembly/properties/choices/items/required",keyword:"required",params:{missingProperty: "itemId"},message:"must have required property '"+"itemId"+"'"};
if(vErrors === null){
vErrors = [err1264];
}
else {
vErrors.push(err1264);
}
errors++;
}
if(data371.version === undefined){
const err1265 = {instancePath:instancePath+"/assembly/choices/" + i55,schemaPath:"#/properties/assembly/properties/choices/items/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err1265];
}
else {
vErrors.push(err1265);
}
errors++;
}
for(const key64 in data371){
if(!(((key64 === "slot") || (key64 === "itemId")) || (key64 === "version"))){
const err1266 = {instancePath:instancePath+"/assembly/choices/" + i55,schemaPath:"#/properties/assembly/properties/choices/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key64},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1266];
}
else {
vErrors.push(err1266);
}
errors++;
}
}
if(data371.slot !== undefined){
let data372 = data371.slot;
if(!((((((data372 === "face") || (data372 === "hair")) || (data372 === "eyes")) || (data372 === "mouth")) || (data372 === "outfit")) || (data372 === "accessory"))){
const err1267 = {instancePath:instancePath+"/assembly/choices/" + i55+"/slot",schemaPath:"#/properties/assembly/properties/choices/items/properties/slot/enum",keyword:"enum",params:{allowedValues: schema31.properties.assembly.properties.choices.items.properties.slot.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1267];
}
else {
vErrors.push(err1267);
}
errors++;
}
}
if(data371.itemId !== undefined){
let data373 = data371.itemId;
const _errs839 = errors;
let valid190 = false;
const _errs840 = errors;
if(typeof data373 === "string"){
if(func2(data373) > 64){
const err1268 = {instancePath:instancePath+"/assembly/choices/" + i55+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1268];
}
else {
vErrors.push(err1268);
}
errors++;
}
if(func2(data373) < 1){
const err1269 = {instancePath:instancePath+"/assembly/choices/" + i55+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1269];
}
else {
vErrors.push(err1269);
}
errors++;
}
if(!pattern4.test(data373)){
const err1270 = {instancePath:instancePath+"/assembly/choices/" + i55+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1270];
}
else {
vErrors.push(err1270);
}
errors++;
}
}
else {
const err1271 = {instancePath:instancePath+"/assembly/choices/" + i55+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1271];
}
else {
vErrors.push(err1271);
}
errors++;
}
var _valid17 = _errs840 === errors;
valid190 = valid190 || _valid17;
const _errs842 = errors;
if(data373 !== null){
const err1272 = {instancePath:instancePath+"/assembly/choices/" + i55+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1272];
}
else {
vErrors.push(err1272);
}
errors++;
}
var _valid17 = _errs842 === errors;
valid190 = valid190 || _valid17;
if(!valid190){
const err1273 = {instancePath:instancePath+"/assembly/choices/" + i55+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1273];
}
else {
vErrors.push(err1273);
}
errors++;
}
else {
errors = _errs839;
if(vErrors !== null){
if(_errs839){
vErrors.length = _errs839;
}
else {
vErrors = null;
}
}
}
}
if(data371.version !== undefined){
let data374 = data371.version;
if(typeof data374 === "string"){
if(func2(data374) > 32){
const err1274 = {instancePath:instancePath+"/assembly/choices/" + i55+"/version",schemaPath:"#/properties/assembly/properties/choices/items/properties/version/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err1274];
}
else {
vErrors.push(err1274);
}
errors++;
}
if(func2(data374) < 1){
const err1275 = {instancePath:instancePath+"/assembly/choices/" + i55+"/version",schemaPath:"#/properties/assembly/properties/choices/items/properties/version/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1275];
}
else {
vErrors.push(err1275);
}
errors++;
}
if(!pattern12.test(data374)){
const err1276 = {instancePath:instancePath+"/assembly/choices/" + i55+"/version",schemaPath:"#/properties/assembly/properties/choices/items/properties/version/pattern",keyword:"pattern",params:{pattern: "^\\d+\\.\\d+\\.\\d+$"},message:"must match pattern \""+"^\\d+\\.\\d+\\.\\d+$"+"\""};
if(vErrors === null){
vErrors = [err1276];
}
else {
vErrors.push(err1276);
}
errors++;
}
}
else {
const err1277 = {instancePath:instancePath+"/assembly/choices/" + i55+"/version",schemaPath:"#/properties/assembly/properties/choices/items/properties/version/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1277];
}
else {
vErrors.push(err1277);
}
errors++;
}
}
}
else {
const err1278 = {instancePath:instancePath+"/assembly/choices/" + i55,schemaPath:"#/properties/assembly/properties/choices/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1278];
}
else {
vErrors.push(err1278);
}
errors++;
}
}
}
else {
const err1279 = {instancePath:instancePath+"/assembly/choices",schemaPath:"#/properties/assembly/properties/choices/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1279];
}
else {
vErrors.push(err1279);
}
errors++;
}
}
if(data366.adjustments !== undefined){
let data375 = data366.adjustments;
if(Array.isArray(data375)){
if(data375.length > 16){
const err1280 = {instancePath:instancePath+"/assembly/adjustments",schemaPath:"#/properties/assembly/properties/adjustments/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err1280];
}
else {
vErrors.push(err1280);
}
errors++;
}
const len52 = data375.length;
for(let i56=0; i56<len52; i56++){
let data376 = data375[i56];
if(data376 && typeof data376 == "object" && !Array.isArray(data376)){
if(data376.key === undefined){
const err1281 = {instancePath:instancePath+"/assembly/adjustments/" + i56,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "key"},message:"must have required property '"+"key"+"'"};
if(vErrors === null){
vErrors = [err1281];
}
else {
vErrors.push(err1281);
}
errors++;
}
if(data376.x === undefined){
const err1282 = {instancePath:instancePath+"/assembly/adjustments/" + i56,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1282];
}
else {
vErrors.push(err1282);
}
errors++;
}
if(data376.y === undefined){
const err1283 = {instancePath:instancePath+"/assembly/adjustments/" + i56,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1283];
}
else {
vErrors.push(err1283);
}
errors++;
}
if(data376.scale === undefined){
const err1284 = {instancePath:instancePath+"/assembly/adjustments/" + i56,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "scale"},message:"must have required property '"+"scale"+"'"};
if(vErrors === null){
vErrors = [err1284];
}
else {
vErrors.push(err1284);
}
errors++;
}
if(data376.rotation === undefined){
const err1285 = {instancePath:instancePath+"/assembly/adjustments/" + i56,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "rotation"},message:"must have required property '"+"rotation"+"'"};
if(vErrors === null){
vErrors = [err1285];
}
else {
vErrors.push(err1285);
}
errors++;
}
if(data376.hue === undefined){
const err1286 = {instancePath:instancePath+"/assembly/adjustments/" + i56,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "hue"},message:"must have required property '"+"hue"+"'"};
if(vErrors === null){
vErrors = [err1286];
}
else {
vErrors.push(err1286);
}
errors++;
}
for(const key65 in data376){
if(!((((((key65 === "key") || (key65 === "x")) || (key65 === "y")) || (key65 === "scale")) || (key65 === "rotation")) || (key65 === "hue"))){
const err1287 = {instancePath:instancePath+"/assembly/adjustments/" + i56,schemaPath:"#/properties/assembly/properties/adjustments/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key65},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1287];
}
else {
vErrors.push(err1287);
}
errors++;
}
}
if(data376.key !== undefined){
let data377 = data376.key;
if(typeof data377 === "string"){
if(func2(data377) > 64){
const err1288 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/key",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/key/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1288];
}
else {
vErrors.push(err1288);
}
errors++;
}
if(func2(data377) < 1){
const err1289 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/key",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/key/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1289];
}
else {
vErrors.push(err1289);
}
errors++;
}
if(!pattern4.test(data377)){
const err1290 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/key",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/key/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1290];
}
else {
vErrors.push(err1290);
}
errors++;
}
}
else {
const err1291 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/key",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/key/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1291];
}
else {
vErrors.push(err1291);
}
errors++;
}
}
if(data376.x !== undefined){
let data378 = data376.x;
if((typeof data378 == "number") && (isFinite(data378))){
if(data378 > 6 || isNaN(data378)){
const err1292 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/x",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 6},message:"must be <= 6"};
if(vErrors === null){
vErrors = [err1292];
}
else {
vErrors.push(err1292);
}
errors++;
}
if(data378 < -6 || isNaN(data378)){
const err1293 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/x",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: -6},message:"must be >= -6"};
if(vErrors === null){
vErrors = [err1293];
}
else {
vErrors.push(err1293);
}
errors++;
}
}
else {
const err1294 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/x",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1294];
}
else {
vErrors.push(err1294);
}
errors++;
}
}
if(data376.y !== undefined){
let data379 = data376.y;
if((typeof data379 == "number") && (isFinite(data379))){
if(data379 > 6 || isNaN(data379)){
const err1295 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/y",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 6},message:"must be <= 6"};
if(vErrors === null){
vErrors = [err1295];
}
else {
vErrors.push(err1295);
}
errors++;
}
if(data379 < -6 || isNaN(data379)){
const err1296 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/y",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: -6},message:"must be >= -6"};
if(vErrors === null){
vErrors = [err1296];
}
else {
vErrors.push(err1296);
}
errors++;
}
}
else {
const err1297 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/y",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1297];
}
else {
vErrors.push(err1297);
}
errors++;
}
}
if(data376.scale !== undefined){
let data380 = data376.scale;
if((typeof data380 == "number") && (isFinite(data380))){
if(data380 > 1.05 || isNaN(data380)){
const err1298 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/scale",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/scale/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1.05},message:"must be <= 1.05"};
if(vErrors === null){
vErrors = [err1298];
}
else {
vErrors.push(err1298);
}
errors++;
}
if(data380 < 0.95 || isNaN(data380)){
const err1299 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/scale",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/scale/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0.95},message:"must be >= 0.95"};
if(vErrors === null){
vErrors = [err1299];
}
else {
vErrors.push(err1299);
}
errors++;
}
}
else {
const err1300 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/scale",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/scale/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1300];
}
else {
vErrors.push(err1300);
}
errors++;
}
}
if(data376.rotation !== undefined){
let data381 = data376.rotation;
if((typeof data381 == "number") && (isFinite(data381))){
if(data381 > 2 || isNaN(data381)){
const err1301 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/rotation",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/rotation/maximum",keyword:"maximum",params:{comparison: "<=", limit: 2},message:"must be <= 2"};
if(vErrors === null){
vErrors = [err1301];
}
else {
vErrors.push(err1301);
}
errors++;
}
if(data381 < -2 || isNaN(data381)){
const err1302 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/rotation",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/rotation/minimum",keyword:"minimum",params:{comparison: ">=", limit: -2},message:"must be >= -2"};
if(vErrors === null){
vErrors = [err1302];
}
else {
vErrors.push(err1302);
}
errors++;
}
}
else {
const err1303 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/rotation",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/rotation/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1303];
}
else {
vErrors.push(err1303);
}
errors++;
}
}
if(data376.hue !== undefined){
let data382 = data376.hue;
if((typeof data382 == "number") && (isFinite(data382))){
if(data382 > 18 || isNaN(data382)){
const err1304 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/hue",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/hue/maximum",keyword:"maximum",params:{comparison: "<=", limit: 18},message:"must be <= 18"};
if(vErrors === null){
vErrors = [err1304];
}
else {
vErrors.push(err1304);
}
errors++;
}
if(data382 < -18 || isNaN(data382)){
const err1305 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/hue",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/hue/minimum",keyword:"minimum",params:{comparison: ">=", limit: -18},message:"must be >= -18"};
if(vErrors === null){
vErrors = [err1305];
}
else {
vErrors.push(err1305);
}
errors++;
}
}
else {
const err1306 = {instancePath:instancePath+"/assembly/adjustments/" + i56+"/hue",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/hue/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1306];
}
else {
vErrors.push(err1306);
}
errors++;
}
}
}
else {
const err1307 = {instancePath:instancePath+"/assembly/adjustments/" + i56,schemaPath:"#/properties/assembly/properties/adjustments/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1307];
}
else {
vErrors.push(err1307);
}
errors++;
}
}
}
else {
const err1308 = {instancePath:instancePath+"/assembly/adjustments",schemaPath:"#/properties/assembly/properties/adjustments/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1308];
}
else {
vErrors.push(err1308);
}
errors++;
}
}
if(data366.warnings !== undefined){
let data383 = data366.warnings;
if(Array.isArray(data383)){
if(data383.length > 16){
const err1309 = {instancePath:instancePath+"/assembly/warnings",schemaPath:"#/properties/assembly/properties/warnings/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err1309];
}
else {
vErrors.push(err1309);
}
errors++;
}
const len53 = data383.length;
for(let i57=0; i57<len53; i57++){
let data384 = data383[i57];
if(typeof data384 === "string"){
if(func2(data384) > 512){
const err1310 = {instancePath:instancePath+"/assembly/warnings/" + i57,schemaPath:"#/properties/assembly/properties/warnings/items/maxLength",keyword:"maxLength",params:{limit: 512},message:"must NOT have more than 512 characters"};
if(vErrors === null){
vErrors = [err1310];
}
else {
vErrors.push(err1310);
}
errors++;
}
if(func2(data384) < 1){
const err1311 = {instancePath:instancePath+"/assembly/warnings/" + i57,schemaPath:"#/properties/assembly/properties/warnings/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1311];
}
else {
vErrors.push(err1311);
}
errors++;
}
}
else {
const err1312 = {instancePath:instancePath+"/assembly/warnings/" + i57,schemaPath:"#/properties/assembly/properties/warnings/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1312];
}
else {
vErrors.push(err1312);
}
errors++;
}
}
}
else {
const err1313 = {instancePath:instancePath+"/assembly/warnings",schemaPath:"#/properties/assembly/properties/warnings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1313];
}
else {
vErrors.push(err1313);
}
errors++;
}
}
}
else {
const err1314 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1314];
}
else {
vErrors.push(err1314);
}
errors++;
}
}
if(data.structure !== undefined){
let data385 = data.structure;
if(data385 && typeof data385 == "object" && !Array.isArray(data385)){
if(data385.version === undefined){
const err1315 = {instancePath:instancePath+"/structure",schemaPath:"#/properties/structure/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err1315];
}
else {
vErrors.push(err1315);
}
errors++;
}
if(data385.inputAssetId === undefined){
const err1316 = {instancePath:instancePath+"/structure",schemaPath:"#/properties/structure/required",keyword:"required",params:{missingProperty: "inputAssetId"},message:"must have required property '"+"inputAssetId"+"'"};
if(vErrors === null){
vErrors = [err1316];
}
else {
vErrors.push(err1316);
}
errors++;
}
if(data385.inputRevision === undefined){
const err1317 = {instancePath:instancePath+"/structure",schemaPath:"#/properties/structure/required",keyword:"required",params:{missingProperty: "inputRevision"},message:"must have required property '"+"inputRevision"+"'"};
if(vErrors === null){
vErrors = [err1317];
}
else {
vErrors.push(err1317);
}
errors++;
}
if(data385.configurationVersion === undefined){
const err1318 = {instancePath:instancePath+"/structure",schemaPath:"#/properties/structure/required",keyword:"required",params:{missingProperty: "configurationVersion"},message:"must have required property '"+"configurationVersion"+"'"};
if(vErrors === null){
vErrors = [err1318];
}
else {
vErrors.push(err1318);
}
errors++;
}
if(data385.report === undefined){
const err1319 = {instancePath:instancePath+"/structure",schemaPath:"#/properties/structure/required",keyword:"required",params:{missingProperty: "report"},message:"must have required property '"+"report"+"'"};
if(vErrors === null){
vErrors = [err1319];
}
else {
vErrors.push(err1319);
}
errors++;
}
for(const key66 in data385){
if(!((((((key66 === "version") || (key66 === "inputAssetId")) || (key66 === "inputRevision")) || (key66 === "configurationVersion")) || (key66 === "report")) || (key66 === "corrections"))){
const err1320 = {instancePath:instancePath+"/structure",schemaPath:"#/properties/structure/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key66},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1320];
}
else {
vErrors.push(err1320);
}
errors++;
}
}
if(data385.version !== undefined){
if(1 !== data385.version){
const err1321 = {instancePath:instancePath+"/structure/version",schemaPath:"#/properties/structure/properties/version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err1321];
}
else {
vErrors.push(err1321);
}
errors++;
}
}
if(data385.inputAssetId !== undefined){
let data387 = data385.inputAssetId;
if(typeof data387 === "string"){
if(func2(data387) > 64){
const err1322 = {instancePath:instancePath+"/structure/inputAssetId",schemaPath:"#/properties/structure/properties/inputAssetId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1322];
}
else {
vErrors.push(err1322);
}
errors++;
}
if(func2(data387) < 1){
const err1323 = {instancePath:instancePath+"/structure/inputAssetId",schemaPath:"#/properties/structure/properties/inputAssetId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1323];
}
else {
vErrors.push(err1323);
}
errors++;
}
if(!pattern4.test(data387)){
const err1324 = {instancePath:instancePath+"/structure/inputAssetId",schemaPath:"#/properties/structure/properties/inputAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1324];
}
else {
vErrors.push(err1324);
}
errors++;
}
}
else {
const err1325 = {instancePath:instancePath+"/structure/inputAssetId",schemaPath:"#/properties/structure/properties/inputAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1325];
}
else {
vErrors.push(err1325);
}
errors++;
}
}
if(data385.inputRevision !== undefined){
let data388 = data385.inputRevision;
if(!(((typeof data388 == "number") && (!(data388 % 1) && !isNaN(data388))) && (isFinite(data388)))){
const err1326 = {instancePath:instancePath+"/structure/inputRevision",schemaPath:"#/properties/structure/properties/inputRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1326];
}
else {
vErrors.push(err1326);
}
errors++;
}
if((typeof data388 == "number") && (isFinite(data388))){
if(data388 > 9007199254740991 || isNaN(data388)){
const err1327 = {instancePath:instancePath+"/structure/inputRevision",schemaPath:"#/properties/structure/properties/inputRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err1327];
}
else {
vErrors.push(err1327);
}
errors++;
}
if(data388 < 0 || isNaN(data388)){
const err1328 = {instancePath:instancePath+"/structure/inputRevision",schemaPath:"#/properties/structure/properties/inputRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1328];
}
else {
vErrors.push(err1328);
}
errors++;
}
}
}
if(data385.configurationVersion !== undefined){
let data389 = data385.configurationVersion;
if(!((data389 === "1.0.0") || (data389 === "1.1.0"))){
const err1329 = {instancePath:instancePath+"/structure/configurationVersion",schemaPath:"#/properties/structure/properties/configurationVersion/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.configurationVersion.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1329];
}
else {
vErrors.push(err1329);
}
errors++;
}
}
if(data385.report !== undefined){
let data390 = data385.report;
if(data390 && typeof data390 == "object" && !Array.isArray(data390)){
if(data390.version === undefined){
const err1330 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err1330];
}
else {
vErrors.push(err1330);
}
errors++;
}
if(data390.method === undefined){
const err1331 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "method"},message:"must have required property '"+"method"+"'"};
if(vErrors === null){
vErrors = [err1331];
}
else {
vErrors.push(err1331);
}
errors++;
}
if(data390.status === undefined){
const err1332 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err1332];
}
else {
vErrors.push(err1332);
}
errors++;
}
if(data390.face === undefined){
const err1333 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "face"},message:"must have required property '"+"face"+"'"};
if(vErrors === null){
vErrors = [err1333];
}
else {
vErrors.push(err1333);
}
errors++;
}
if(data390.regions === undefined){
const err1334 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "regions"},message:"must have required property '"+"regions"+"'"};
if(vErrors === null){
vErrors = [err1334];
}
else {
vErrors.push(err1334);
}
errors++;
}
if(data390.unconfirmed === undefined){
const err1335 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "unconfirmed"},message:"must have required property '"+"unconfirmed"+"'"};
if(vErrors === null){
vErrors = [err1335];
}
else {
vErrors.push(err1335);
}
errors++;
}
if(data390.warnings === undefined){
const err1336 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "warnings"},message:"must have required property '"+"warnings"+"'"};
if(vErrors === null){
vErrors = [err1336];
}
else {
vErrors.push(err1336);
}
errors++;
}
if(data390.headGain === undefined){
const err1337 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "headGain"},message:"must have required property '"+"headGain"+"'"};
if(vErrors === null){
vErrors = [err1337];
}
else {
vErrors.push(err1337);
}
errors++;
}
if(data390.maxRollDegrees === undefined){
const err1338 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "maxRollDegrees"},message:"must have required property '"+"maxRollDegrees"+"'"};
if(vErrors === null){
vErrors = [err1338];
}
else {
vErrors.push(err1338);
}
errors++;
}
if(data390.completion === undefined){
const err1339 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "completion"},message:"must have required property '"+"completion"+"'"};
if(vErrors === null){
vErrors = [err1339];
}
else {
vErrors.push(err1339);
}
errors++;
}
if(data390.files === undefined){
const err1340 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "files"},message:"must have required property '"+"files"+"'"};
if(vErrors === null){
vErrors = [err1340];
}
else {
vErrors.push(err1340);
}
errors++;
}
for(const key67 in data390){
if(!(func1.call(schema31.properties.structure.properties.report.properties, key67))){
const err1341 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key67},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1341];
}
else {
vErrors.push(err1341);
}
errors++;
}
}
if(data390.version !== undefined){
if("1.0.0" !== data390.version){
const err1342 = {instancePath:instancePath+"/structure/report/version",schemaPath:"#/properties/structure/properties/report/properties/version/const",keyword:"const",params:{allowedValue: "1.0.0"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err1342];
}
else {
vErrors.push(err1342);
}
errors++;
}
}
if(data390.method !== undefined){
if("mediapipe-landmarks-pixel-evidence" !== data390.method){
const err1343 = {instancePath:instancePath+"/structure/report/method",schemaPath:"#/properties/structure/properties/report/properties/method/const",keyword:"const",params:{allowedValue: "mediapipe-landmarks-pixel-evidence"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err1343];
}
else {
vErrors.push(err1343);
}
errors++;
}
}
if(data390.status !== undefined){
let data393 = data390.status;
if(!(((data393 === "ready") || (data393 === "partial")) || (data393 === "failed"))){
const err1344 = {instancePath:instancePath+"/structure/report/status",schemaPath:"#/properties/structure/properties/report/properties/status/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.report.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1344];
}
else {
vErrors.push(err1344);
}
errors++;
}
}
if(data390.face !== undefined){
let data394 = data390.face;
const _errs883 = errors;
let valid198 = false;
const _errs884 = errors;
if(data394 && typeof data394 == "object" && !Array.isArray(data394)){
if(data394.x === undefined){
const err1345 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1345];
}
else {
vErrors.push(err1345);
}
errors++;
}
if(data394.y === undefined){
const err1346 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1346];
}
else {
vErrors.push(err1346);
}
errors++;
}
if(data394.width === undefined){
const err1347 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1347];
}
else {
vErrors.push(err1347);
}
errors++;
}
if(data394.height === undefined){
const err1348 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1348];
}
else {
vErrors.push(err1348);
}
errors++;
}
for(const key68 in data394){
if(!((((key68 === "x") || (key68 === "y")) || (key68 === "width")) || (key68 === "height"))){
const err1349 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key68},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1349];
}
else {
vErrors.push(err1349);
}
errors++;
}
}
if(data394.x !== undefined){
let data395 = data394.x;
if(!((typeof data395 == "number") && (isFinite(data395)))){
const err1350 = {instancePath:instancePath+"/structure/report/face/x",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1350];
}
else {
vErrors.push(err1350);
}
errors++;
}
}
if(data394.y !== undefined){
let data396 = data394.y;
if(!((typeof data396 == "number") && (isFinite(data396)))){
const err1351 = {instancePath:instancePath+"/structure/report/face/y",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1351];
}
else {
vErrors.push(err1351);
}
errors++;
}
}
if(data394.width !== undefined){
let data397 = data394.width;
if((typeof data397 == "number") && (isFinite(data397))){
if(data397 <= 0 || isNaN(data397)){
const err1352 = {instancePath:instancePath+"/structure/report/face/width",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1352];
}
else {
vErrors.push(err1352);
}
errors++;
}
}
else {
const err1353 = {instancePath:instancePath+"/structure/report/face/width",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1353];
}
else {
vErrors.push(err1353);
}
errors++;
}
}
if(data394.height !== undefined){
let data398 = data394.height;
if((typeof data398 == "number") && (isFinite(data398))){
if(data398 <= 0 || isNaN(data398)){
const err1354 = {instancePath:instancePath+"/structure/report/face/height",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1354];
}
else {
vErrors.push(err1354);
}
errors++;
}
}
else {
const err1355 = {instancePath:instancePath+"/structure/report/face/height",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1355];
}
else {
vErrors.push(err1355);
}
errors++;
}
}
}
else {
const err1356 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1356];
}
else {
vErrors.push(err1356);
}
errors++;
}
var _valid18 = _errs884 === errors;
valid198 = valid198 || _valid18;
const _errs895 = errors;
if(data394 !== null){
const err1357 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1357];
}
else {
vErrors.push(err1357);
}
errors++;
}
var _valid18 = _errs895 === errors;
valid198 = valid198 || _valid18;
if(!valid198){
const err1358 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1358];
}
else {
vErrors.push(err1358);
}
errors++;
}
else {
errors = _errs883;
if(vErrors !== null){
if(_errs883){
vErrors.length = _errs883;
}
else {
vErrors = null;
}
}
}
}
if(data390.regions !== undefined){
let data399 = data390.regions;
if(Array.isArray(data399)){
if(data399.length > 3){
const err1359 = {instancePath:instancePath+"/structure/report/regions",schemaPath:"#/properties/structure/properties/report/properties/regions/maxItems",keyword:"maxItems",params:{limit: 3},message:"must NOT have more than 3 items"};
if(vErrors === null){
vErrors = [err1359];
}
else {
vErrors.push(err1359);
}
errors++;
}
const len54 = data399.length;
for(let i58=0; i58<len54; i58++){
let data400 = data399[i58];
if(data400 && typeof data400 == "object" && !Array.isArray(data400)){
if(data400.key === undefined){
const err1360 = {instancePath:instancePath+"/structure/report/regions/" + i58,schemaPath:"#/properties/structure/properties/report/properties/regions/items/required",keyword:"required",params:{missingProperty: "key"},message:"must have required property '"+"key"+"'"};
if(vErrors === null){
vErrors = [err1360];
}
else {
vErrors.push(err1360);
}
errors++;
}
if(data400.rect === undefined){
const err1361 = {instancePath:instancePath+"/structure/report/regions/" + i58,schemaPath:"#/properties/structure/properties/report/properties/regions/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err1361];
}
else {
vErrors.push(err1361);
}
errors++;
}
if(data400.observed === undefined){
const err1362 = {instancePath:instancePath+"/structure/report/regions/" + i58,schemaPath:"#/properties/structure/properties/report/properties/regions/items/required",keyword:"required",params:{missingProperty: "observed"},message:"must have required property '"+"observed"+"'"};
if(vErrors === null){
vErrors = [err1362];
}
else {
vErrors.push(err1362);
}
errors++;
}
if(data400.reason === undefined){
const err1363 = {instancePath:instancePath+"/structure/report/regions/" + i58,schemaPath:"#/properties/structure/properties/report/properties/regions/items/required",keyword:"required",params:{missingProperty: "reason"},message:"must have required property '"+"reason"+"'"};
if(vErrors === null){
vErrors = [err1363];
}
else {
vErrors.push(err1363);
}
errors++;
}
if(data400.estimatedStates === undefined){
const err1364 = {instancePath:instancePath+"/structure/report/regions/" + i58,schemaPath:"#/properties/structure/properties/report/properties/regions/items/required",keyword:"required",params:{missingProperty: "estimatedStates"},message:"must have required property '"+"estimatedStates"+"'"};
if(vErrors === null){
vErrors = [err1364];
}
else {
vErrors.push(err1364);
}
errors++;
}
for(const key69 in data400){
if(!((((((((key69 === "key") || (key69 === "rect")) || (key69 === "observed")) || (key69 === "reason")) || (key69 === "estimatedStates")) || (key69 === "enabled")) || (key69 === "masks")) || (key69 === "order"))){
const err1365 = {instancePath:instancePath+"/structure/report/regions/" + i58,schemaPath:"#/properties/structure/properties/report/properties/regions/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key69},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1365];
}
else {
vErrors.push(err1365);
}
errors++;
}
}
if(data400.key !== undefined){
let data401 = data400.key;
if(!(((data401 === "eye_left") || (data401 === "eye_right")) || (data401 === "mouth"))){
const err1366 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/key",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/key/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.report.properties.regions.items.properties.key.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1366];
}
else {
vErrors.push(err1366);
}
errors++;
}
}
if(data400.rect !== undefined){
let data402 = data400.rect;
if(data402 && typeof data402 == "object" && !Array.isArray(data402)){
if(data402.x === undefined){
const err1367 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1367];
}
else {
vErrors.push(err1367);
}
errors++;
}
if(data402.y === undefined){
const err1368 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1368];
}
else {
vErrors.push(err1368);
}
errors++;
}
if(data402.width === undefined){
const err1369 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1369];
}
else {
vErrors.push(err1369);
}
errors++;
}
if(data402.height === undefined){
const err1370 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1370];
}
else {
vErrors.push(err1370);
}
errors++;
}
for(const key70 in data402){
if(!((((key70 === "x") || (key70 === "y")) || (key70 === "width")) || (key70 === "height"))){
const err1371 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key70},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1371];
}
else {
vErrors.push(err1371);
}
errors++;
}
}
if(data402.x !== undefined){
let data403 = data402.x;
if(!((typeof data403 == "number") && (isFinite(data403)))){
const err1372 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/rect/x",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1372];
}
else {
vErrors.push(err1372);
}
errors++;
}
}
if(data402.y !== undefined){
let data404 = data402.y;
if(!((typeof data404 == "number") && (isFinite(data404)))){
const err1373 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/rect/y",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1373];
}
else {
vErrors.push(err1373);
}
errors++;
}
}
if(data402.width !== undefined){
let data405 = data402.width;
if((typeof data405 == "number") && (isFinite(data405))){
if(data405 <= 0 || isNaN(data405)){
const err1374 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/rect/width",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1374];
}
else {
vErrors.push(err1374);
}
errors++;
}
}
else {
const err1375 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/rect/width",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1375];
}
else {
vErrors.push(err1375);
}
errors++;
}
}
if(data402.height !== undefined){
let data406 = data402.height;
if((typeof data406 == "number") && (isFinite(data406))){
if(data406 <= 0 || isNaN(data406)){
const err1376 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/rect/height",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1376];
}
else {
vErrors.push(err1376);
}
errors++;
}
}
else {
const err1377 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/rect/height",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1377];
}
else {
vErrors.push(err1377);
}
errors++;
}
}
}
else {
const err1378 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1378];
}
else {
vErrors.push(err1378);
}
errors++;
}
}
if(data400.observed !== undefined){
if(typeof data400.observed !== "boolean"){
const err1379 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/observed",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/observed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1379];
}
else {
vErrors.push(err1379);
}
errors++;
}
}
if(data400.reason !== undefined){
let data408 = data400.reason;
if(typeof data408 === "string"){
if(func2(data408) > 128){
const err1380 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/reason",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/reason/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1380];
}
else {
vErrors.push(err1380);
}
errors++;
}
if(func2(data408) < 1){
const err1381 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/reason",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/reason/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1381];
}
else {
vErrors.push(err1381);
}
errors++;
}
}
else {
const err1382 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/reason",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/reason/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1382];
}
else {
vErrors.push(err1382);
}
errors++;
}
}
if(data400.estimatedStates !== undefined){
let data409 = data400.estimatedStates;
if(Array.isArray(data409)){
if(data409.length > 2){
const err1383 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/estimatedStates",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/estimatedStates/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err1383];
}
else {
vErrors.push(err1383);
}
errors++;
}
const len55 = data409.length;
for(let i59=0; i59<len55; i59++){
let data410 = data409[i59];
if(!((data410 === "open") || (data410 === "closed"))){
const err1384 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/estimatedStates/" + i59,schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/estimatedStates/items/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.report.properties.regions.items.properties.estimatedStates.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1384];
}
else {
vErrors.push(err1384);
}
errors++;
}
}
}
else {
const err1385 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/estimatedStates",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/estimatedStates/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1385];
}
else {
vErrors.push(err1385);
}
errors++;
}
}
if(data400.enabled !== undefined){
if(typeof data400.enabled !== "boolean"){
const err1386 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/enabled",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/enabled/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1386];
}
else {
vErrors.push(err1386);
}
errors++;
}
}
if(data400.masks !== undefined){
let data412 = data400.masks;
if(Array.isArray(data412)){
if(data412.length > 32){
const err1387 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err1387];
}
else {
vErrors.push(err1387);
}
errors++;
}
const len56 = data412.length;
for(let i60=0; i60<len56; i60++){
let data413 = data412[i60];
if(data413 && typeof data413 == "object" && !Array.isArray(data413)){
if(data413.mode === undefined){
const err1388 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60,schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err1388];
}
else {
vErrors.push(err1388);
}
errors++;
}
if(data413.rect === undefined){
const err1389 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60,schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err1389];
}
else {
vErrors.push(err1389);
}
errors++;
}
for(const key71 in data413){
if(!((key71 === "mode") || (key71 === "rect"))){
const err1390 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60,schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key71},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1390];
}
else {
vErrors.push(err1390);
}
errors++;
}
}
if(data413.mode !== undefined){
let data414 = data413.mode;
if(!((data414 === "erase") || (data414 === "restore"))){
const err1391 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60+"/mode",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.report.properties.regions.items.properties.masks.items.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1391];
}
else {
vErrors.push(err1391);
}
errors++;
}
}
if(data413.rect !== undefined){
let data415 = data413.rect;
if(data415 && typeof data415 == "object" && !Array.isArray(data415)){
if(data415.x === undefined){
const err1392 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1392];
}
else {
vErrors.push(err1392);
}
errors++;
}
if(data415.y === undefined){
const err1393 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1393];
}
else {
vErrors.push(err1393);
}
errors++;
}
if(data415.width === undefined){
const err1394 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1394];
}
else {
vErrors.push(err1394);
}
errors++;
}
if(data415.height === undefined){
const err1395 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1395];
}
else {
vErrors.push(err1395);
}
errors++;
}
for(const key72 in data415){
if(!((((key72 === "x") || (key72 === "y")) || (key72 === "width")) || (key72 === "height"))){
const err1396 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key72},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1396];
}
else {
vErrors.push(err1396);
}
errors++;
}
}
if(data415.x !== undefined){
let data416 = data415.x;
if(!((typeof data416 == "number") && (isFinite(data416)))){
const err1397 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60+"/rect/x",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1397];
}
else {
vErrors.push(err1397);
}
errors++;
}
}
if(data415.y !== undefined){
let data417 = data415.y;
if(!((typeof data417 == "number") && (isFinite(data417)))){
const err1398 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60+"/rect/y",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1398];
}
else {
vErrors.push(err1398);
}
errors++;
}
}
if(data415.width !== undefined){
let data418 = data415.width;
if((typeof data418 == "number") && (isFinite(data418))){
if(data418 <= 0 || isNaN(data418)){
const err1399 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60+"/rect/width",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1399];
}
else {
vErrors.push(err1399);
}
errors++;
}
}
else {
const err1400 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60+"/rect/width",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1400];
}
else {
vErrors.push(err1400);
}
errors++;
}
}
if(data415.height !== undefined){
let data419 = data415.height;
if((typeof data419 == "number") && (isFinite(data419))){
if(data419 <= 0 || isNaN(data419)){
const err1401 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60+"/rect/height",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1401];
}
else {
vErrors.push(err1401);
}
errors++;
}
}
else {
const err1402 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60+"/rect/height",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1402];
}
else {
vErrors.push(err1402);
}
errors++;
}
}
}
else {
const err1403 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1403];
}
else {
vErrors.push(err1403);
}
errors++;
}
}
}
else {
const err1404 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks/" + i60,schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1404];
}
else {
vErrors.push(err1404);
}
errors++;
}
}
}
else {
const err1405 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/masks",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1405];
}
else {
vErrors.push(err1405);
}
errors++;
}
}
if(data400.order !== undefined){
let data420 = data400.order;
if(!(((typeof data420 == "number") && (!(data420 % 1) && !isNaN(data420))) && (isFinite(data420)))){
const err1406 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/order",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/order/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1406];
}
else {
vErrors.push(err1406);
}
errors++;
}
if((typeof data420 == "number") && (isFinite(data420))){
if(data420 > 20 || isNaN(data420)){
const err1407 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/order",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/order/maximum",keyword:"maximum",params:{comparison: "<=", limit: 20},message:"must be <= 20"};
if(vErrors === null){
vErrors = [err1407];
}
else {
vErrors.push(err1407);
}
errors++;
}
if(data420 < 5 || isNaN(data420)){
const err1408 = {instancePath:instancePath+"/structure/report/regions/" + i58+"/order",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/order/minimum",keyword:"minimum",params:{comparison: ">=", limit: 5},message:"must be >= 5"};
if(vErrors === null){
vErrors = [err1408];
}
else {
vErrors.push(err1408);
}
errors++;
}
}
}
}
else {
const err1409 = {instancePath:instancePath+"/structure/report/regions/" + i58,schemaPath:"#/properties/structure/properties/report/properties/regions/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1409];
}
else {
vErrors.push(err1409);
}
errors++;
}
}
}
else {
const err1410 = {instancePath:instancePath+"/structure/report/regions",schemaPath:"#/properties/structure/properties/report/properties/regions/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1410];
}
else {
vErrors.push(err1410);
}
errors++;
}
}
if(data390.unconfirmed !== undefined){
let data421 = data390.unconfirmed;
if(Array.isArray(data421)){
if(data421.length > 16){
const err1411 = {instancePath:instancePath+"/structure/report/unconfirmed",schemaPath:"#/properties/structure/properties/report/properties/unconfirmed/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err1411];
}
else {
vErrors.push(err1411);
}
errors++;
}
const len57 = data421.length;
for(let i61=0; i61<len57; i61++){
let data422 = data421[i61];
if(typeof data422 === "string"){
if(func2(data422) > 128){
const err1412 = {instancePath:instancePath+"/structure/report/unconfirmed/" + i61,schemaPath:"#/properties/structure/properties/report/properties/unconfirmed/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1412];
}
else {
vErrors.push(err1412);
}
errors++;
}
if(func2(data422) < 1){
const err1413 = {instancePath:instancePath+"/structure/report/unconfirmed/" + i61,schemaPath:"#/properties/structure/properties/report/properties/unconfirmed/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1413];
}
else {
vErrors.push(err1413);
}
errors++;
}
}
else {
const err1414 = {instancePath:instancePath+"/structure/report/unconfirmed/" + i61,schemaPath:"#/properties/structure/properties/report/properties/unconfirmed/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1414];
}
else {
vErrors.push(err1414);
}
errors++;
}
}
}
else {
const err1415 = {instancePath:instancePath+"/structure/report/unconfirmed",schemaPath:"#/properties/structure/properties/report/properties/unconfirmed/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1415];
}
else {
vErrors.push(err1415);
}
errors++;
}
}
if(data390.warnings !== undefined){
let data423 = data390.warnings;
if(Array.isArray(data423)){
if(data423.length > 16){
const err1416 = {instancePath:instancePath+"/structure/report/warnings",schemaPath:"#/properties/structure/properties/report/properties/warnings/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err1416];
}
else {
vErrors.push(err1416);
}
errors++;
}
const len58 = data423.length;
for(let i62=0; i62<len58; i62++){
let data424 = data423[i62];
if(typeof data424 === "string"){
if(func2(data424) > 128){
const err1417 = {instancePath:instancePath+"/structure/report/warnings/" + i62,schemaPath:"#/properties/structure/properties/report/properties/warnings/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1417];
}
else {
vErrors.push(err1417);
}
errors++;
}
if(func2(data424) < 1){
const err1418 = {instancePath:instancePath+"/structure/report/warnings/" + i62,schemaPath:"#/properties/structure/properties/report/properties/warnings/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1418];
}
else {
vErrors.push(err1418);
}
errors++;
}
}
else {
const err1419 = {instancePath:instancePath+"/structure/report/warnings/" + i62,schemaPath:"#/properties/structure/properties/report/properties/warnings/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1419];
}
else {
vErrors.push(err1419);
}
errors++;
}
}
}
else {
const err1420 = {instancePath:instancePath+"/structure/report/warnings",schemaPath:"#/properties/structure/properties/report/properties/warnings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1420];
}
else {
vErrors.push(err1420);
}
errors++;
}
}
if(data390.headGain !== undefined){
let data425 = data390.headGain;
if((typeof data425 == "number") && (isFinite(data425))){
if(data425 > 0.65 || isNaN(data425)){
const err1421 = {instancePath:instancePath+"/structure/report/headGain",schemaPath:"#/properties/structure/properties/report/properties/headGain/maximum",keyword:"maximum",params:{comparison: "<=", limit: 0.65},message:"must be <= 0.65"};
if(vErrors === null){
vErrors = [err1421];
}
else {
vErrors.push(err1421);
}
errors++;
}
if(data425 < 0 || isNaN(data425)){
const err1422 = {instancePath:instancePath+"/structure/report/headGain",schemaPath:"#/properties/structure/properties/report/properties/headGain/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1422];
}
else {
vErrors.push(err1422);
}
errors++;
}
}
else {
const err1423 = {instancePath:instancePath+"/structure/report/headGain",schemaPath:"#/properties/structure/properties/report/properties/headGain/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1423];
}
else {
vErrors.push(err1423);
}
errors++;
}
}
if(data390.maxRollDegrees !== undefined){
let data426 = data390.maxRollDegrees;
if((typeof data426 == "number") && (isFinite(data426))){
if(data426 > 3.900000001 || isNaN(data426)){
const err1424 = {instancePath:instancePath+"/structure/report/maxRollDegrees",schemaPath:"#/properties/structure/properties/report/properties/maxRollDegrees/maximum",keyword:"maximum",params:{comparison: "<=", limit: 3.900000001},message:"must be <= 3.900000001"};
if(vErrors === null){
vErrors = [err1424];
}
else {
vErrors.push(err1424);
}
errors++;
}
if(data426 < 0 || isNaN(data426)){
const err1425 = {instancePath:instancePath+"/structure/report/maxRollDegrees",schemaPath:"#/properties/structure/properties/report/properties/maxRollDegrees/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1425];
}
else {
vErrors.push(err1425);
}
errors++;
}
}
else {
const err1426 = {instancePath:instancePath+"/structure/report/maxRollDegrees",schemaPath:"#/properties/structure/properties/report/properties/maxRollDegrees/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1426];
}
else {
vErrors.push(err1426);
}
errors++;
}
}
if(data390.completion !== undefined){
let data427 = data390.completion;
if(!((data427 === "estimated") || (data427 === "restrict"))){
const err1427 = {instancePath:instancePath+"/structure/report/completion",schemaPath:"#/properties/structure/properties/report/properties/completion/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.report.properties.completion.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1427];
}
else {
vErrors.push(err1427);
}
errors++;
}
}
if(data390.files !== undefined){
let data428 = data390.files;
if(Array.isArray(data428)){
if(data428.length > 7){
const err1428 = {instancePath:instancePath+"/structure/report/files",schemaPath:"#/properties/structure/properties/report/properties/files/maxItems",keyword:"maxItems",params:{limit: 7},message:"must NOT have more than 7 items"};
if(vErrors === null){
vErrors = [err1428];
}
else {
vErrors.push(err1428);
}
errors++;
}
const len59 = data428.length;
for(let i63=0; i63<len59; i63++){
let data429 = data428[i63];
if(typeof data429 === "string"){
if(func2(data429) > 128){
const err1429 = {instancePath:instancePath+"/structure/report/files/" + i63,schemaPath:"#/properties/structure/properties/report/properties/files/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1429];
}
else {
vErrors.push(err1429);
}
errors++;
}
if(func2(data429) < 1){
const err1430 = {instancePath:instancePath+"/structure/report/files/" + i63,schemaPath:"#/properties/structure/properties/report/properties/files/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1430];
}
else {
vErrors.push(err1430);
}
errors++;
}
if(!pattern82.test(data429)){
const err1431 = {instancePath:instancePath+"/structure/report/files/" + i63,schemaPath:"#/properties/structure/properties/report/properties/files/items/pattern",keyword:"pattern",params:{pattern: "^structure-(base|eye_(left|right)-(open|closed)|mouth-(open|closed))\\.png$"},message:"must match pattern \""+"^structure-(base|eye_(left|right)-(open|closed)|mouth-(open|closed))\\.png$"+"\""};
if(vErrors === null){
vErrors = [err1431];
}
else {
vErrors.push(err1431);
}
errors++;
}
}
else {
const err1432 = {instancePath:instancePath+"/structure/report/files/" + i63,schemaPath:"#/properties/structure/properties/report/properties/files/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1432];
}
else {
vErrors.push(err1432);
}
errors++;
}
}
}
else {
const err1433 = {instancePath:instancePath+"/structure/report/files",schemaPath:"#/properties/structure/properties/report/properties/files/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1433];
}
else {
vErrors.push(err1433);
}
errors++;
}
}
}
else {
const err1434 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1434];
}
else {
vErrors.push(err1434);
}
errors++;
}
}
if(data385.corrections !== undefined){
let data430 = data385.corrections;
if(data430 && typeof data430 == "object" && !Array.isArray(data430)){
if(data430.version === undefined){
const err1435 = {instancePath:instancePath+"/structure/corrections",schemaPath:"#/properties/structure/properties/corrections/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err1435];
}
else {
vErrors.push(err1435);
}
errors++;
}
if(data430.automatic === undefined){
const err1436 = {instancePath:instancePath+"/structure/corrections",schemaPath:"#/properties/structure/properties/corrections/required",keyword:"required",params:{missingProperty: "automatic"},message:"must have required property '"+"automatic"+"'"};
if(vErrors === null){
vErrors = [err1436];
}
else {
vErrors.push(err1436);
}
errors++;
}
if(data430.entries === undefined){
const err1437 = {instancePath:instancePath+"/structure/corrections",schemaPath:"#/properties/structure/properties/corrections/required",keyword:"required",params:{missingProperty: "entries"},message:"must have required property '"+"entries"+"'"};
if(vErrors === null){
vErrors = [err1437];
}
else {
vErrors.push(err1437);
}
errors++;
}
if(data430.invalidated === undefined){
const err1438 = {instancePath:instancePath+"/structure/corrections",schemaPath:"#/properties/structure/properties/corrections/required",keyword:"required",params:{missingProperty: "invalidated"},message:"must have required property '"+"invalidated"+"'"};
if(vErrors === null){
vErrors = [err1438];
}
else {
vErrors.push(err1438);
}
errors++;
}
for(const key73 in data430){
if(!((((key73 === "version") || (key73 === "automatic")) || (key73 === "entries")) || (key73 === "invalidated"))){
const err1439 = {instancePath:instancePath+"/structure/corrections",schemaPath:"#/properties/structure/properties/corrections/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key73},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1439];
}
else {
vErrors.push(err1439);
}
errors++;
}
}
if(data430.version !== undefined){
if(1 !== data430.version){
const err1440 = {instancePath:instancePath+"/structure/corrections/version",schemaPath:"#/properties/structure/properties/corrections/properties/version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err1440];
}
else {
vErrors.push(err1440);
}
errors++;
}
}
if(data430.automatic !== undefined){
let data432 = data430.automatic;
if(data432 && typeof data432 == "object" && !Array.isArray(data432)){
if(data432.version === undefined){
const err1441 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err1441];
}
else {
vErrors.push(err1441);
}
errors++;
}
if(data432.method === undefined){
const err1442 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "method"},message:"must have required property '"+"method"+"'"};
if(vErrors === null){
vErrors = [err1442];
}
else {
vErrors.push(err1442);
}
errors++;
}
if(data432.status === undefined){
const err1443 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err1443];
}
else {
vErrors.push(err1443);
}
errors++;
}
if(data432.face === undefined){
const err1444 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "face"},message:"must have required property '"+"face"+"'"};
if(vErrors === null){
vErrors = [err1444];
}
else {
vErrors.push(err1444);
}
errors++;
}
if(data432.regions === undefined){
const err1445 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "regions"},message:"must have required property '"+"regions"+"'"};
if(vErrors === null){
vErrors = [err1445];
}
else {
vErrors.push(err1445);
}
errors++;
}
if(data432.unconfirmed === undefined){
const err1446 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "unconfirmed"},message:"must have required property '"+"unconfirmed"+"'"};
if(vErrors === null){
vErrors = [err1446];
}
else {
vErrors.push(err1446);
}
errors++;
}
if(data432.warnings === undefined){
const err1447 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "warnings"},message:"must have required property '"+"warnings"+"'"};
if(vErrors === null){
vErrors = [err1447];
}
else {
vErrors.push(err1447);
}
errors++;
}
if(data432.headGain === undefined){
const err1448 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "headGain"},message:"must have required property '"+"headGain"+"'"};
if(vErrors === null){
vErrors = [err1448];
}
else {
vErrors.push(err1448);
}
errors++;
}
if(data432.maxRollDegrees === undefined){
const err1449 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "maxRollDegrees"},message:"must have required property '"+"maxRollDegrees"+"'"};
if(vErrors === null){
vErrors = [err1449];
}
else {
vErrors.push(err1449);
}
errors++;
}
if(data432.completion === undefined){
const err1450 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "completion"},message:"must have required property '"+"completion"+"'"};
if(vErrors === null){
vErrors = [err1450];
}
else {
vErrors.push(err1450);
}
errors++;
}
if(data432.files === undefined){
const err1451 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "files"},message:"must have required property '"+"files"+"'"};
if(vErrors === null){
vErrors = [err1451];
}
else {
vErrors.push(err1451);
}
errors++;
}
for(const key74 in data432){
if(!(func1.call(schema31.properties.structure.properties.corrections.properties.automatic.properties, key74))){
const err1452 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key74},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1452];
}
else {
vErrors.push(err1452);
}
errors++;
}
}
if(data432.version !== undefined){
if("1.0.0" !== data432.version){
const err1453 = {instancePath:instancePath+"/structure/corrections/automatic/version",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/version/const",keyword:"const",params:{allowedValue: "1.0.0"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err1453];
}
else {
vErrors.push(err1453);
}
errors++;
}
}
if(data432.method !== undefined){
if("mediapipe-landmarks-pixel-evidence" !== data432.method){
const err1454 = {instancePath:instancePath+"/structure/corrections/automatic/method",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/method/const",keyword:"const",params:{allowedValue: "mediapipe-landmarks-pixel-evidence"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err1454];
}
else {
vErrors.push(err1454);
}
errors++;
}
}
if(data432.status !== undefined){
let data435 = data432.status;
if(!(((data435 === "ready") || (data435 === "partial")) || (data435 === "failed"))){
const err1455 = {instancePath:instancePath+"/structure/corrections/automatic/status",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/status/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.automatic.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1455];
}
else {
vErrors.push(err1455);
}
errors++;
}
}
if(data432.face !== undefined){
let data436 = data432.face;
const _errs970 = errors;
let valid218 = false;
const _errs971 = errors;
if(data436 && typeof data436 == "object" && !Array.isArray(data436)){
if(data436.x === undefined){
const err1456 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1456];
}
else {
vErrors.push(err1456);
}
errors++;
}
if(data436.y === undefined){
const err1457 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1457];
}
else {
vErrors.push(err1457);
}
errors++;
}
if(data436.width === undefined){
const err1458 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1458];
}
else {
vErrors.push(err1458);
}
errors++;
}
if(data436.height === undefined){
const err1459 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1459];
}
else {
vErrors.push(err1459);
}
errors++;
}
for(const key75 in data436){
if(!((((key75 === "x") || (key75 === "y")) || (key75 === "width")) || (key75 === "height"))){
const err1460 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key75},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1460];
}
else {
vErrors.push(err1460);
}
errors++;
}
}
if(data436.x !== undefined){
let data437 = data436.x;
if(!((typeof data437 == "number") && (isFinite(data437)))){
const err1461 = {instancePath:instancePath+"/structure/corrections/automatic/face/x",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1461];
}
else {
vErrors.push(err1461);
}
errors++;
}
}
if(data436.y !== undefined){
let data438 = data436.y;
if(!((typeof data438 == "number") && (isFinite(data438)))){
const err1462 = {instancePath:instancePath+"/structure/corrections/automatic/face/y",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1462];
}
else {
vErrors.push(err1462);
}
errors++;
}
}
if(data436.width !== undefined){
let data439 = data436.width;
if((typeof data439 == "number") && (isFinite(data439))){
if(data439 <= 0 || isNaN(data439)){
const err1463 = {instancePath:instancePath+"/structure/corrections/automatic/face/width",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1463];
}
else {
vErrors.push(err1463);
}
errors++;
}
}
else {
const err1464 = {instancePath:instancePath+"/structure/corrections/automatic/face/width",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1464];
}
else {
vErrors.push(err1464);
}
errors++;
}
}
if(data436.height !== undefined){
let data440 = data436.height;
if((typeof data440 == "number") && (isFinite(data440))){
if(data440 <= 0 || isNaN(data440)){
const err1465 = {instancePath:instancePath+"/structure/corrections/automatic/face/height",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1465];
}
else {
vErrors.push(err1465);
}
errors++;
}
}
else {
const err1466 = {instancePath:instancePath+"/structure/corrections/automatic/face/height",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1466];
}
else {
vErrors.push(err1466);
}
errors++;
}
}
}
else {
const err1467 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1467];
}
else {
vErrors.push(err1467);
}
errors++;
}
var _valid19 = _errs971 === errors;
valid218 = valid218 || _valid19;
const _errs982 = errors;
if(data436 !== null){
const err1468 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1468];
}
else {
vErrors.push(err1468);
}
errors++;
}
var _valid19 = _errs982 === errors;
valid218 = valid218 || _valid19;
if(!valid218){
const err1469 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1469];
}
else {
vErrors.push(err1469);
}
errors++;
}
else {
errors = _errs970;
if(vErrors !== null){
if(_errs970){
vErrors.length = _errs970;
}
else {
vErrors = null;
}
}
}
}
if(data432.regions !== undefined){
let data441 = data432.regions;
if(Array.isArray(data441)){
if(data441.length > 3){
const err1470 = {instancePath:instancePath+"/structure/corrections/automatic/regions",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/maxItems",keyword:"maxItems",params:{limit: 3},message:"must NOT have more than 3 items"};
if(vErrors === null){
vErrors = [err1470];
}
else {
vErrors.push(err1470);
}
errors++;
}
const len60 = data441.length;
for(let i64=0; i64<len60; i64++){
let data442 = data441[i64];
if(data442 && typeof data442 == "object" && !Array.isArray(data442)){
if(data442.key === undefined){
const err1471 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/required",keyword:"required",params:{missingProperty: "key"},message:"must have required property '"+"key"+"'"};
if(vErrors === null){
vErrors = [err1471];
}
else {
vErrors.push(err1471);
}
errors++;
}
if(data442.rect === undefined){
const err1472 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err1472];
}
else {
vErrors.push(err1472);
}
errors++;
}
if(data442.observed === undefined){
const err1473 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/required",keyword:"required",params:{missingProperty: "observed"},message:"must have required property '"+"observed"+"'"};
if(vErrors === null){
vErrors = [err1473];
}
else {
vErrors.push(err1473);
}
errors++;
}
if(data442.reason === undefined){
const err1474 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/required",keyword:"required",params:{missingProperty: "reason"},message:"must have required property '"+"reason"+"'"};
if(vErrors === null){
vErrors = [err1474];
}
else {
vErrors.push(err1474);
}
errors++;
}
if(data442.estimatedStates === undefined){
const err1475 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/required",keyword:"required",params:{missingProperty: "estimatedStates"},message:"must have required property '"+"estimatedStates"+"'"};
if(vErrors === null){
vErrors = [err1475];
}
else {
vErrors.push(err1475);
}
errors++;
}
for(const key76 in data442){
if(!((((((((key76 === "key") || (key76 === "rect")) || (key76 === "observed")) || (key76 === "reason")) || (key76 === "estimatedStates")) || (key76 === "enabled")) || (key76 === "masks")) || (key76 === "order"))){
const err1476 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key76},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1476];
}
else {
vErrors.push(err1476);
}
errors++;
}
}
if(data442.key !== undefined){
let data443 = data442.key;
if(!(((data443 === "eye_left") || (data443 === "eye_right")) || (data443 === "mouth"))){
const err1477 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/key",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/key/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.automatic.properties.regions.items.properties.key.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1477];
}
else {
vErrors.push(err1477);
}
errors++;
}
}
if(data442.rect !== undefined){
let data444 = data442.rect;
if(data444 && typeof data444 == "object" && !Array.isArray(data444)){
if(data444.x === undefined){
const err1478 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1478];
}
else {
vErrors.push(err1478);
}
errors++;
}
if(data444.y === undefined){
const err1479 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1479];
}
else {
vErrors.push(err1479);
}
errors++;
}
if(data444.width === undefined){
const err1480 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1480];
}
else {
vErrors.push(err1480);
}
errors++;
}
if(data444.height === undefined){
const err1481 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1481];
}
else {
vErrors.push(err1481);
}
errors++;
}
for(const key77 in data444){
if(!((((key77 === "x") || (key77 === "y")) || (key77 === "width")) || (key77 === "height"))){
const err1482 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key77},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1482];
}
else {
vErrors.push(err1482);
}
errors++;
}
}
if(data444.x !== undefined){
let data445 = data444.x;
if(!((typeof data445 == "number") && (isFinite(data445)))){
const err1483 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/rect/x",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1483];
}
else {
vErrors.push(err1483);
}
errors++;
}
}
if(data444.y !== undefined){
let data446 = data444.y;
if(!((typeof data446 == "number") && (isFinite(data446)))){
const err1484 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/rect/y",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1484];
}
else {
vErrors.push(err1484);
}
errors++;
}
}
if(data444.width !== undefined){
let data447 = data444.width;
if((typeof data447 == "number") && (isFinite(data447))){
if(data447 <= 0 || isNaN(data447)){
const err1485 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1485];
}
else {
vErrors.push(err1485);
}
errors++;
}
}
else {
const err1486 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1486];
}
else {
vErrors.push(err1486);
}
errors++;
}
}
if(data444.height !== undefined){
let data448 = data444.height;
if((typeof data448 == "number") && (isFinite(data448))){
if(data448 <= 0 || isNaN(data448)){
const err1487 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1487];
}
else {
vErrors.push(err1487);
}
errors++;
}
}
else {
const err1488 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1488];
}
else {
vErrors.push(err1488);
}
errors++;
}
}
}
else {
const err1489 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1489];
}
else {
vErrors.push(err1489);
}
errors++;
}
}
if(data442.observed !== undefined){
if(typeof data442.observed !== "boolean"){
const err1490 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/observed",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/observed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1490];
}
else {
vErrors.push(err1490);
}
errors++;
}
}
if(data442.reason !== undefined){
let data450 = data442.reason;
if(typeof data450 === "string"){
if(func2(data450) > 128){
const err1491 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/reason",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/reason/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1491];
}
else {
vErrors.push(err1491);
}
errors++;
}
if(func2(data450) < 1){
const err1492 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/reason",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/reason/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1492];
}
else {
vErrors.push(err1492);
}
errors++;
}
}
else {
const err1493 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/reason",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/reason/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1493];
}
else {
vErrors.push(err1493);
}
errors++;
}
}
if(data442.estimatedStates !== undefined){
let data451 = data442.estimatedStates;
if(Array.isArray(data451)){
if(data451.length > 2){
const err1494 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/estimatedStates",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/estimatedStates/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err1494];
}
else {
vErrors.push(err1494);
}
errors++;
}
const len61 = data451.length;
for(let i65=0; i65<len61; i65++){
let data452 = data451[i65];
if(!((data452 === "open") || (data452 === "closed"))){
const err1495 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/estimatedStates/" + i65,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/estimatedStates/items/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.automatic.properties.regions.items.properties.estimatedStates.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1495];
}
else {
vErrors.push(err1495);
}
errors++;
}
}
}
else {
const err1496 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/estimatedStates",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/estimatedStates/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1496];
}
else {
vErrors.push(err1496);
}
errors++;
}
}
if(data442.enabled !== undefined){
if(typeof data442.enabled !== "boolean"){
const err1497 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/enabled",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/enabled/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1497];
}
else {
vErrors.push(err1497);
}
errors++;
}
}
if(data442.masks !== undefined){
let data454 = data442.masks;
if(Array.isArray(data454)){
if(data454.length > 32){
const err1498 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err1498];
}
else {
vErrors.push(err1498);
}
errors++;
}
const len62 = data454.length;
for(let i66=0; i66<len62; i66++){
let data455 = data454[i66];
if(data455 && typeof data455 == "object" && !Array.isArray(data455)){
if(data455.mode === undefined){
const err1499 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err1499];
}
else {
vErrors.push(err1499);
}
errors++;
}
if(data455.rect === undefined){
const err1500 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err1500];
}
else {
vErrors.push(err1500);
}
errors++;
}
for(const key78 in data455){
if(!((key78 === "mode") || (key78 === "rect"))){
const err1501 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key78},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1501];
}
else {
vErrors.push(err1501);
}
errors++;
}
}
if(data455.mode !== undefined){
let data456 = data455.mode;
if(!((data456 === "erase") || (data456 === "restore"))){
const err1502 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66+"/mode",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.automatic.properties.regions.items.properties.masks.items.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1502];
}
else {
vErrors.push(err1502);
}
errors++;
}
}
if(data455.rect !== undefined){
let data457 = data455.rect;
if(data457 && typeof data457 == "object" && !Array.isArray(data457)){
if(data457.x === undefined){
const err1503 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1503];
}
else {
vErrors.push(err1503);
}
errors++;
}
if(data457.y === undefined){
const err1504 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1504];
}
else {
vErrors.push(err1504);
}
errors++;
}
if(data457.width === undefined){
const err1505 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1505];
}
else {
vErrors.push(err1505);
}
errors++;
}
if(data457.height === undefined){
const err1506 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1506];
}
else {
vErrors.push(err1506);
}
errors++;
}
for(const key79 in data457){
if(!((((key79 === "x") || (key79 === "y")) || (key79 === "width")) || (key79 === "height"))){
const err1507 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key79},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1507];
}
else {
vErrors.push(err1507);
}
errors++;
}
}
if(data457.x !== undefined){
let data458 = data457.x;
if(!((typeof data458 == "number") && (isFinite(data458)))){
const err1508 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66+"/rect/x",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1508];
}
else {
vErrors.push(err1508);
}
errors++;
}
}
if(data457.y !== undefined){
let data459 = data457.y;
if(!((typeof data459 == "number") && (isFinite(data459)))){
const err1509 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66+"/rect/y",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1509];
}
else {
vErrors.push(err1509);
}
errors++;
}
}
if(data457.width !== undefined){
let data460 = data457.width;
if((typeof data460 == "number") && (isFinite(data460))){
if(data460 <= 0 || isNaN(data460)){
const err1510 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1510];
}
else {
vErrors.push(err1510);
}
errors++;
}
}
else {
const err1511 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1511];
}
else {
vErrors.push(err1511);
}
errors++;
}
}
if(data457.height !== undefined){
let data461 = data457.height;
if((typeof data461 == "number") && (isFinite(data461))){
if(data461 <= 0 || isNaN(data461)){
const err1512 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1512];
}
else {
vErrors.push(err1512);
}
errors++;
}
}
else {
const err1513 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1513];
}
else {
vErrors.push(err1513);
}
errors++;
}
}
}
else {
const err1514 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1514];
}
else {
vErrors.push(err1514);
}
errors++;
}
}
}
else {
const err1515 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks/" + i66,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1515];
}
else {
vErrors.push(err1515);
}
errors++;
}
}
}
else {
const err1516 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/masks",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1516];
}
else {
vErrors.push(err1516);
}
errors++;
}
}
if(data442.order !== undefined){
let data462 = data442.order;
if(!(((typeof data462 == "number") && (!(data462 % 1) && !isNaN(data462))) && (isFinite(data462)))){
const err1517 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/order",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/order/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1517];
}
else {
vErrors.push(err1517);
}
errors++;
}
if((typeof data462 == "number") && (isFinite(data462))){
if(data462 > 20 || isNaN(data462)){
const err1518 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/order",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/order/maximum",keyword:"maximum",params:{comparison: "<=", limit: 20},message:"must be <= 20"};
if(vErrors === null){
vErrors = [err1518];
}
else {
vErrors.push(err1518);
}
errors++;
}
if(data462 < 5 || isNaN(data462)){
const err1519 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64+"/order",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/order/minimum",keyword:"minimum",params:{comparison: ">=", limit: 5},message:"must be >= 5"};
if(vErrors === null){
vErrors = [err1519];
}
else {
vErrors.push(err1519);
}
errors++;
}
}
}
}
else {
const err1520 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i64,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1520];
}
else {
vErrors.push(err1520);
}
errors++;
}
}
}
else {
const err1521 = {instancePath:instancePath+"/structure/corrections/automatic/regions",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1521];
}
else {
vErrors.push(err1521);
}
errors++;
}
}
if(data432.unconfirmed !== undefined){
let data463 = data432.unconfirmed;
if(Array.isArray(data463)){
if(data463.length > 16){
const err1522 = {instancePath:instancePath+"/structure/corrections/automatic/unconfirmed",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/unconfirmed/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err1522];
}
else {
vErrors.push(err1522);
}
errors++;
}
const len63 = data463.length;
for(let i67=0; i67<len63; i67++){
let data464 = data463[i67];
if(typeof data464 === "string"){
if(func2(data464) > 128){
const err1523 = {instancePath:instancePath+"/structure/corrections/automatic/unconfirmed/" + i67,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/unconfirmed/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1523];
}
else {
vErrors.push(err1523);
}
errors++;
}
if(func2(data464) < 1){
const err1524 = {instancePath:instancePath+"/structure/corrections/automatic/unconfirmed/" + i67,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/unconfirmed/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1524];
}
else {
vErrors.push(err1524);
}
errors++;
}
}
else {
const err1525 = {instancePath:instancePath+"/structure/corrections/automatic/unconfirmed/" + i67,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/unconfirmed/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1525];
}
else {
vErrors.push(err1525);
}
errors++;
}
}
}
else {
const err1526 = {instancePath:instancePath+"/structure/corrections/automatic/unconfirmed",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/unconfirmed/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1526];
}
else {
vErrors.push(err1526);
}
errors++;
}
}
if(data432.warnings !== undefined){
let data465 = data432.warnings;
if(Array.isArray(data465)){
if(data465.length > 16){
const err1527 = {instancePath:instancePath+"/structure/corrections/automatic/warnings",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/warnings/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err1527];
}
else {
vErrors.push(err1527);
}
errors++;
}
const len64 = data465.length;
for(let i68=0; i68<len64; i68++){
let data466 = data465[i68];
if(typeof data466 === "string"){
if(func2(data466) > 128){
const err1528 = {instancePath:instancePath+"/structure/corrections/automatic/warnings/" + i68,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/warnings/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1528];
}
else {
vErrors.push(err1528);
}
errors++;
}
if(func2(data466) < 1){
const err1529 = {instancePath:instancePath+"/structure/corrections/automatic/warnings/" + i68,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/warnings/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1529];
}
else {
vErrors.push(err1529);
}
errors++;
}
}
else {
const err1530 = {instancePath:instancePath+"/structure/corrections/automatic/warnings/" + i68,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/warnings/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1530];
}
else {
vErrors.push(err1530);
}
errors++;
}
}
}
else {
const err1531 = {instancePath:instancePath+"/structure/corrections/automatic/warnings",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/warnings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1531];
}
else {
vErrors.push(err1531);
}
errors++;
}
}
if(data432.headGain !== undefined){
let data467 = data432.headGain;
if((typeof data467 == "number") && (isFinite(data467))){
if(data467 > 0.65 || isNaN(data467)){
const err1532 = {instancePath:instancePath+"/structure/corrections/automatic/headGain",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/headGain/maximum",keyword:"maximum",params:{comparison: "<=", limit: 0.65},message:"must be <= 0.65"};
if(vErrors === null){
vErrors = [err1532];
}
else {
vErrors.push(err1532);
}
errors++;
}
if(data467 < 0 || isNaN(data467)){
const err1533 = {instancePath:instancePath+"/structure/corrections/automatic/headGain",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/headGain/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1533];
}
else {
vErrors.push(err1533);
}
errors++;
}
}
else {
const err1534 = {instancePath:instancePath+"/structure/corrections/automatic/headGain",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/headGain/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1534];
}
else {
vErrors.push(err1534);
}
errors++;
}
}
if(data432.maxRollDegrees !== undefined){
let data468 = data432.maxRollDegrees;
if((typeof data468 == "number") && (isFinite(data468))){
if(data468 > 3.900000001 || isNaN(data468)){
const err1535 = {instancePath:instancePath+"/structure/corrections/automatic/maxRollDegrees",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/maxRollDegrees/maximum",keyword:"maximum",params:{comparison: "<=", limit: 3.900000001},message:"must be <= 3.900000001"};
if(vErrors === null){
vErrors = [err1535];
}
else {
vErrors.push(err1535);
}
errors++;
}
if(data468 < 0 || isNaN(data468)){
const err1536 = {instancePath:instancePath+"/structure/corrections/automatic/maxRollDegrees",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/maxRollDegrees/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1536];
}
else {
vErrors.push(err1536);
}
errors++;
}
}
else {
const err1537 = {instancePath:instancePath+"/structure/corrections/automatic/maxRollDegrees",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/maxRollDegrees/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1537];
}
else {
vErrors.push(err1537);
}
errors++;
}
}
if(data432.completion !== undefined){
let data469 = data432.completion;
if(!((data469 === "estimated") || (data469 === "restrict"))){
const err1538 = {instancePath:instancePath+"/structure/corrections/automatic/completion",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/completion/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.automatic.properties.completion.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1538];
}
else {
vErrors.push(err1538);
}
errors++;
}
}
if(data432.files !== undefined){
let data470 = data432.files;
if(Array.isArray(data470)){
if(data470.length > 7){
const err1539 = {instancePath:instancePath+"/structure/corrections/automatic/files",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/files/maxItems",keyword:"maxItems",params:{limit: 7},message:"must NOT have more than 7 items"};
if(vErrors === null){
vErrors = [err1539];
}
else {
vErrors.push(err1539);
}
errors++;
}
const len65 = data470.length;
for(let i69=0; i69<len65; i69++){
let data471 = data470[i69];
if(typeof data471 === "string"){
if(func2(data471) > 128){
const err1540 = {instancePath:instancePath+"/structure/corrections/automatic/files/" + i69,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/files/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1540];
}
else {
vErrors.push(err1540);
}
errors++;
}
if(func2(data471) < 1){
const err1541 = {instancePath:instancePath+"/structure/corrections/automatic/files/" + i69,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/files/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1541];
}
else {
vErrors.push(err1541);
}
errors++;
}
if(!pattern82.test(data471)){
const err1542 = {instancePath:instancePath+"/structure/corrections/automatic/files/" + i69,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/files/items/pattern",keyword:"pattern",params:{pattern: "^structure-(base|eye_(left|right)-(open|closed)|mouth-(open|closed))\\.png$"},message:"must match pattern \""+"^structure-(base|eye_(left|right)-(open|closed)|mouth-(open|closed))\\.png$"+"\""};
if(vErrors === null){
vErrors = [err1542];
}
else {
vErrors.push(err1542);
}
errors++;
}
}
else {
const err1543 = {instancePath:instancePath+"/structure/corrections/automatic/files/" + i69,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/files/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1543];
}
else {
vErrors.push(err1543);
}
errors++;
}
}
}
else {
const err1544 = {instancePath:instancePath+"/structure/corrections/automatic/files",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/files/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1544];
}
else {
vErrors.push(err1544);
}
errors++;
}
}
}
else {
const err1545 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1545];
}
else {
vErrors.push(err1545);
}
errors++;
}
}
if(data430.entries !== undefined){
let data472 = data430.entries;
if(Array.isArray(data472)){
if(data472.length > 3){
const err1546 = {instancePath:instancePath+"/structure/corrections/entries",schemaPath:"#/properties/structure/properties/corrections/properties/entries/maxItems",keyword:"maxItems",params:{limit: 3},message:"must NOT have more than 3 items"};
if(vErrors === null){
vErrors = [err1546];
}
else {
vErrors.push(err1546);
}
errors++;
}
const len66 = data472.length;
for(let i70=0; i70<len66; i70++){
let data473 = data472[i70];
if(data473 && typeof data473 == "object" && !Array.isArray(data473)){
if(data473.key === undefined){
const err1547 = {instancePath:instancePath+"/structure/corrections/entries/" + i70,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/required",keyword:"required",params:{missingProperty: "key"},message:"must have required property '"+"key"+"'"};
if(vErrors === null){
vErrors = [err1547];
}
else {
vErrors.push(err1547);
}
errors++;
}
if(data473.rect === undefined){
const err1548 = {instancePath:instancePath+"/structure/corrections/entries/" + i70,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err1548];
}
else {
vErrors.push(err1548);
}
errors++;
}
if(data473.masks === undefined){
const err1549 = {instancePath:instancePath+"/structure/corrections/entries/" + i70,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/required",keyword:"required",params:{missingProperty: "masks"},message:"must have required property '"+"masks"+"'"};
if(vErrors === null){
vErrors = [err1549];
}
else {
vErrors.push(err1549);
}
errors++;
}
if(data473.order === undefined){
const err1550 = {instancePath:instancePath+"/structure/corrections/entries/" + i70,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/required",keyword:"required",params:{missingProperty: "order"},message:"must have required property '"+"order"+"'"};
if(vErrors === null){
vErrors = [err1550];
}
else {
vErrors.push(err1550);
}
errors++;
}
if(data473.decision === undefined){
const err1551 = {instancePath:instancePath+"/structure/corrections/entries/" + i70,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/required",keyword:"required",params:{missingProperty: "decision"},message:"must have required property '"+"decision"+"'"};
if(vErrors === null){
vErrors = [err1551];
}
else {
vErrors.push(err1551);
}
errors++;
}
if(data473.occluded === undefined){
const err1552 = {instancePath:instancePath+"/structure/corrections/entries/" + i70,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/required",keyword:"required",params:{missingProperty: "occluded"},message:"must have required property '"+"occluded"+"'"};
if(vErrors === null){
vErrors = [err1552];
}
else {
vErrors.push(err1552);
}
errors++;
}
if(data473.protect === undefined){
const err1553 = {instancePath:instancePath+"/structure/corrections/entries/" + i70,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/required",keyword:"required",params:{missingProperty: "protect"},message:"must have required property '"+"protect"+"'"};
if(vErrors === null){
vErrors = [err1553];
}
else {
vErrors.push(err1553);
}
errors++;
}
for(const key80 in data473){
if(!(((((((key80 === "key") || (key80 === "rect")) || (key80 === "masks")) || (key80 === "order")) || (key80 === "decision")) || (key80 === "occluded")) || (key80 === "protect"))){
const err1554 = {instancePath:instancePath+"/structure/corrections/entries/" + i70,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key80},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1554];
}
else {
vErrors.push(err1554);
}
errors++;
}
}
if(data473.key !== undefined){
let data474 = data473.key;
if(!(((data474 === "eye_left") || (data474 === "eye_right")) || (data474 === "mouth"))){
const err1555 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/key",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/key/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.entries.items.properties.key.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1555];
}
else {
vErrors.push(err1555);
}
errors++;
}
}
if(data473.rect !== undefined){
let data475 = data473.rect;
if(data475 && typeof data475 == "object" && !Array.isArray(data475)){
if(data475.x === undefined){
const err1556 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1556];
}
else {
vErrors.push(err1556);
}
errors++;
}
if(data475.y === undefined){
const err1557 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1557];
}
else {
vErrors.push(err1557);
}
errors++;
}
if(data475.width === undefined){
const err1558 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1558];
}
else {
vErrors.push(err1558);
}
errors++;
}
if(data475.height === undefined){
const err1559 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1559];
}
else {
vErrors.push(err1559);
}
errors++;
}
for(const key81 in data475){
if(!((((key81 === "x") || (key81 === "y")) || (key81 === "width")) || (key81 === "height"))){
const err1560 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key81},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1560];
}
else {
vErrors.push(err1560);
}
errors++;
}
}
if(data475.x !== undefined){
let data476 = data475.x;
if(!((typeof data476 == "number") && (isFinite(data476)))){
const err1561 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/rect/x",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1561];
}
else {
vErrors.push(err1561);
}
errors++;
}
}
if(data475.y !== undefined){
let data477 = data475.y;
if(!((typeof data477 == "number") && (isFinite(data477)))){
const err1562 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/rect/y",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1562];
}
else {
vErrors.push(err1562);
}
errors++;
}
}
if(data475.width !== undefined){
let data478 = data475.width;
if((typeof data478 == "number") && (isFinite(data478))){
if(data478 <= 0 || isNaN(data478)){
const err1563 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1563];
}
else {
vErrors.push(err1563);
}
errors++;
}
}
else {
const err1564 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1564];
}
else {
vErrors.push(err1564);
}
errors++;
}
}
if(data475.height !== undefined){
let data479 = data475.height;
if((typeof data479 == "number") && (isFinite(data479))){
if(data479 <= 0 || isNaN(data479)){
const err1565 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1565];
}
else {
vErrors.push(err1565);
}
errors++;
}
}
else {
const err1566 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1566];
}
else {
vErrors.push(err1566);
}
errors++;
}
}
}
else {
const err1567 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1567];
}
else {
vErrors.push(err1567);
}
errors++;
}
}
if(data473.masks !== undefined){
let data480 = data473.masks;
if(Array.isArray(data480)){
if(data480.length > 32){
const err1568 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err1568];
}
else {
vErrors.push(err1568);
}
errors++;
}
const len67 = data480.length;
for(let i71=0; i71<len67; i71++){
let data481 = data480[i71];
if(data481 && typeof data481 == "object" && !Array.isArray(data481)){
if(data481.mode === undefined){
const err1569 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err1569];
}
else {
vErrors.push(err1569);
}
errors++;
}
if(data481.rect === undefined){
const err1570 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err1570];
}
else {
vErrors.push(err1570);
}
errors++;
}
for(const key82 in data481){
if(!((key82 === "mode") || (key82 === "rect"))){
const err1571 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key82},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1571];
}
else {
vErrors.push(err1571);
}
errors++;
}
}
if(data481.mode !== undefined){
let data482 = data481.mode;
if(!((data482 === "erase") || (data482 === "restore"))){
const err1572 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71+"/mode",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.entries.items.properties.masks.items.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1572];
}
else {
vErrors.push(err1572);
}
errors++;
}
}
if(data481.rect !== undefined){
let data483 = data481.rect;
if(data483 && typeof data483 == "object" && !Array.isArray(data483)){
if(data483.x === undefined){
const err1573 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1573];
}
else {
vErrors.push(err1573);
}
errors++;
}
if(data483.y === undefined){
const err1574 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1574];
}
else {
vErrors.push(err1574);
}
errors++;
}
if(data483.width === undefined){
const err1575 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1575];
}
else {
vErrors.push(err1575);
}
errors++;
}
if(data483.height === undefined){
const err1576 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1576];
}
else {
vErrors.push(err1576);
}
errors++;
}
for(const key83 in data483){
if(!((((key83 === "x") || (key83 === "y")) || (key83 === "width")) || (key83 === "height"))){
const err1577 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key83},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1577];
}
else {
vErrors.push(err1577);
}
errors++;
}
}
if(data483.x !== undefined){
let data484 = data483.x;
if(!((typeof data484 == "number") && (isFinite(data484)))){
const err1578 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71+"/rect/x",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1578];
}
else {
vErrors.push(err1578);
}
errors++;
}
}
if(data483.y !== undefined){
let data485 = data483.y;
if(!((typeof data485 == "number") && (isFinite(data485)))){
const err1579 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71+"/rect/y",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1579];
}
else {
vErrors.push(err1579);
}
errors++;
}
}
if(data483.width !== undefined){
let data486 = data483.width;
if((typeof data486 == "number") && (isFinite(data486))){
if(data486 <= 0 || isNaN(data486)){
const err1580 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1580];
}
else {
vErrors.push(err1580);
}
errors++;
}
}
else {
const err1581 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1581];
}
else {
vErrors.push(err1581);
}
errors++;
}
}
if(data483.height !== undefined){
let data487 = data483.height;
if((typeof data487 == "number") && (isFinite(data487))){
if(data487 <= 0 || isNaN(data487)){
const err1582 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1582];
}
else {
vErrors.push(err1582);
}
errors++;
}
}
else {
const err1583 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1583];
}
else {
vErrors.push(err1583);
}
errors++;
}
}
}
else {
const err1584 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1584];
}
else {
vErrors.push(err1584);
}
errors++;
}
}
}
else {
const err1585 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks/" + i71,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1585];
}
else {
vErrors.push(err1585);
}
errors++;
}
}
}
else {
const err1586 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/masks",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1586];
}
else {
vErrors.push(err1586);
}
errors++;
}
}
if(data473.order !== undefined){
let data488 = data473.order;
if(!(((typeof data488 == "number") && (!(data488 % 1) && !isNaN(data488))) && (isFinite(data488)))){
const err1587 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/order",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/order/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1587];
}
else {
vErrors.push(err1587);
}
errors++;
}
if((typeof data488 == "number") && (isFinite(data488))){
if(data488 > 20 || isNaN(data488)){
const err1588 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/order",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/order/maximum",keyword:"maximum",params:{comparison: "<=", limit: 20},message:"must be <= 20"};
if(vErrors === null){
vErrors = [err1588];
}
else {
vErrors.push(err1588);
}
errors++;
}
if(data488 < 5 || isNaN(data488)){
const err1589 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/order",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/order/minimum",keyword:"minimum",params:{comparison: ">=", limit: 5},message:"must be >= 5"};
if(vErrors === null){
vErrors = [err1589];
}
else {
vErrors.push(err1589);
}
errors++;
}
}
}
if(data473.decision !== undefined){
let data489 = data473.decision;
if(!(((data489 === "confirmed") || (data489 === "skip")) || (data489 === "blocked"))){
const err1590 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/decision",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/decision/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.entries.items.properties.decision.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1590];
}
else {
vErrors.push(err1590);
}
errors++;
}
}
if(data473.occluded !== undefined){
if(typeof data473.occluded !== "boolean"){
const err1591 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/occluded",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/occluded/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1591];
}
else {
vErrors.push(err1591);
}
errors++;
}
}
if(data473.protect !== undefined){
if(typeof data473.protect !== "boolean"){
const err1592 = {instancePath:instancePath+"/structure/corrections/entries/" + i70+"/protect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/protect/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1592];
}
else {
vErrors.push(err1592);
}
errors++;
}
}
}
else {
const err1593 = {instancePath:instancePath+"/structure/corrections/entries/" + i70,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1593];
}
else {
vErrors.push(err1593);
}
errors++;
}
}
}
else {
const err1594 = {instancePath:instancePath+"/structure/corrections/entries",schemaPath:"#/properties/structure/properties/corrections/properties/entries/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1594];
}
else {
vErrors.push(err1594);
}
errors++;
}
}
if(data430.invalidated !== undefined){
let data492 = data430.invalidated;
if(data492 && typeof data492 == "object" && !Array.isArray(data492)){
if(data492.keys === undefined){
const err1595 = {instancePath:instancePath+"/structure/corrections/invalidated",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/required",keyword:"required",params:{missingProperty: "keys"},message:"must have required property '"+"keys"+"'"};
if(vErrors === null){
vErrors = [err1595];
}
else {
vErrors.push(err1595);
}
errors++;
}
if(data492.checks === undefined){
const err1596 = {instancePath:instancePath+"/structure/corrections/invalidated",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/required",keyword:"required",params:{missingProperty: "checks"},message:"must have required property '"+"checks"+"'"};
if(vErrors === null){
vErrors = [err1596];
}
else {
vErrors.push(err1596);
}
errors++;
}
for(const key84 in data492){
if(!((key84 === "keys") || (key84 === "checks"))){
const err1597 = {instancePath:instancePath+"/structure/corrections/invalidated",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key84},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1597];
}
else {
vErrors.push(err1597);
}
errors++;
}
}
if(data492.keys !== undefined){
let data493 = data492.keys;
if(Array.isArray(data493)){
if(data493.length > 3){
const err1598 = {instancePath:instancePath+"/structure/corrections/invalidated/keys",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/properties/keys/maxItems",keyword:"maxItems",params:{limit: 3},message:"must NOT have more than 3 items"};
if(vErrors === null){
vErrors = [err1598];
}
else {
vErrors.push(err1598);
}
errors++;
}
const len68 = data493.length;
for(let i72=0; i72<len68; i72++){
let data494 = data493[i72];
if(!(((data494 === "eye_left") || (data494 === "eye_right")) || (data494 === "mouth"))){
const err1599 = {instancePath:instancePath+"/structure/corrections/invalidated/keys/" + i72,schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/properties/keys/items/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.invalidated.properties.keys.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1599];
}
else {
vErrors.push(err1599);
}
errors++;
}
}
}
else {
const err1600 = {instancePath:instancePath+"/structure/corrections/invalidated/keys",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/properties/keys/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1600];
}
else {
vErrors.push(err1600);
}
errors++;
}
}
if(data492.checks !== undefined){
let data495 = data492.checks;
if(Array.isArray(data495)){
if(data495.length > 3){
const err1601 = {instancePath:instancePath+"/structure/corrections/invalidated/checks",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/properties/checks/maxItems",keyword:"maxItems",params:{limit: 3},message:"must NOT have more than 3 items"};
if(vErrors === null){
vErrors = [err1601];
}
else {
vErrors.push(err1601);
}
errors++;
}
const len69 = data495.length;
for(let i73=0; i73<len69; i73++){
let data496 = data495[i73];
if(!(((data496 === "preview") || (data496 === "compatibility")) || (data496 === "export"))){
const err1602 = {instancePath:instancePath+"/structure/corrections/invalidated/checks/" + i73,schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/properties/checks/items/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.invalidated.properties.checks.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1602];
}
else {
vErrors.push(err1602);
}
errors++;
}
}
}
else {
const err1603 = {instancePath:instancePath+"/structure/corrections/invalidated/checks",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/properties/checks/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1603];
}
else {
vErrors.push(err1603);
}
errors++;
}
}
}
else {
const err1604 = {instancePath:instancePath+"/structure/corrections/invalidated",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1604];
}
else {
vErrors.push(err1604);
}
errors++;
}
}
}
else {
const err1605 = {instancePath:instancePath+"/structure/corrections",schemaPath:"#/properties/structure/properties/corrections/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1605];
}
else {
vErrors.push(err1605);
}
errors++;
}
}
}
else {
const err1606 = {instancePath:instancePath+"/structure",schemaPath:"#/properties/structure/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1606];
}
else {
vErrors.push(err1606);
}
errors++;
}
}
if(data.split !== undefined){
let data497 = data.split;
if(data497 && typeof data497 == "object" && !Array.isArray(data497)){
if(data497.version === undefined){
const err1607 = {instancePath:instancePath+"/split",schemaPath:"#/properties/split/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err1607];
}
else {
vErrors.push(err1607);
}
errors++;
}
if(data497.rigSignature === undefined){
const err1608 = {instancePath:instancePath+"/split",schemaPath:"#/properties/split/required",keyword:"required",params:{missingProperty: "rigSignature"},message:"must have required property '"+"rigSignature"+"'"};
if(vErrors === null){
vErrors = [err1608];
}
else {
vErrors.push(err1608);
}
errors++;
}
if(data497.draft === undefined){
const err1609 = {instancePath:instancePath+"/split",schemaPath:"#/properties/split/required",keyword:"required",params:{missingProperty: "draft"},message:"must have required property '"+"draft"+"'"};
if(vErrors === null){
vErrors = [err1609];
}
else {
vErrors.push(err1609);
}
errors++;
}
for(const key85 in data497){
if(!(((key85 === "version") || (key85 === "rigSignature")) || (key85 === "draft"))){
const err1610 = {instancePath:instancePath+"/split",schemaPath:"#/properties/split/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key85},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1610];
}
else {
vErrors.push(err1610);
}
errors++;
}
}
if(data497.version !== undefined){
if(1 !== data497.version){
const err1611 = {instancePath:instancePath+"/split/version",schemaPath:"#/properties/split/properties/version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err1611];
}
else {
vErrors.push(err1611);
}
errors++;
}
}
if(data497.rigSignature !== undefined){
let data499 = data497.rigSignature;
if(typeof data499 === "string"){
if(!pattern11.test(data499)){
const err1612 = {instancePath:instancePath+"/split/rigSignature",schemaPath:"#/properties/split/properties/rigSignature/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""};
if(vErrors === null){
vErrors = [err1612];
}
else {
vErrors.push(err1612);
}
errors++;
}
}
else {
const err1613 = {instancePath:instancePath+"/split/rigSignature",schemaPath:"#/properties/split/properties/rigSignature/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1613];
}
else {
vErrors.push(err1613);
}
errors++;
}
}
if(data497.draft !== undefined){
let data500 = data497.draft;
if(data500 && typeof data500 == "object" && !Array.isArray(data500)){
if(data500.id === undefined){
const err1614 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err1614];
}
else {
vErrors.push(err1614);
}
errors++;
}
if(data500.sourceKind === undefined){
const err1615 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "sourceKind"},message:"must have required property '"+"sourceKind"+"'"};
if(vErrors === null){
vErrors = [err1615];
}
else {
vErrors.push(err1615);
}
errors++;
}
if(data500.sourceHash === undefined){
const err1616 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "sourceHash"},message:"must have required property '"+"sourceHash"+"'"};
if(vErrors === null){
vErrors = [err1616];
}
else {
vErrors.push(err1616);
}
errors++;
}
if(data500.sourceManifest === undefined){
const err1617 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "sourceManifest"},message:"must have required property '"+"sourceManifest"+"'"};
if(vErrors === null){
vErrors = [err1617];
}
else {
vErrors.push(err1617);
}
errors++;
}
if(data500.canvas === undefined){
const err1618 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "canvas"},message:"must have required property '"+"canvas"+"'"};
if(vErrors === null){
vErrors = [err1618];
}
else {
vErrors.push(err1618);
}
errors++;
}
if(data500.layout === undefined){
const err1619 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "layout"},message:"must have required property '"+"layout"+"'"};
if(vErrors === null){
vErrors = [err1619];
}
else {
vErrors.push(err1619);
}
errors++;
}
if(data500.layoutConfirmed === undefined){
const err1620 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "layoutConfirmed"},message:"must have required property '"+"layoutConfirmed"+"'"};
if(vErrors === null){
vErrors = [err1620];
}
else {
vErrors.push(err1620);
}
errors++;
}
if(data500.limitedAccepted === undefined){
const err1621 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "limitedAccepted"},message:"must have required property '"+"limitedAccepted"+"'"};
if(vErrors === null){
vErrors = [err1621];
}
else {
vErrors.push(err1621);
}
errors++;
}
if(data500.omittedAccepted === undefined){
const err1622 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "omittedAccepted"},message:"must have required property '"+"omittedAccepted"+"'"};
if(vErrors === null){
vErrors = [err1622];
}
else {
vErrors.push(err1622);
}
errors++;
}
if(data500.layers === undefined){
const err1623 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "layers"},message:"must have required property '"+"layers"+"'"};
if(vErrors === null){
vErrors = [err1623];
}
else {
vErrors.push(err1623);
}
errors++;
}
if(data500.groups === undefined){
const err1624 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "groups"},message:"must have required property '"+"groups"+"'"};
if(vErrors === null){
vErrors = [err1624];
}
else {
vErrors.push(err1624);
}
errors++;
}
if(data500.missingProperties === undefined){
const err1625 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "missingProperties"},message:"must have required property '"+"missingProperties"+"'"};
if(vErrors === null){
vErrors = [err1625];
}
else {
vErrors.push(err1625);
}
errors++;
}
if(data500.omitted === undefined){
const err1626 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "omitted"},message:"must have required property '"+"omitted"+"'"};
if(vErrors === null){
vErrors = [err1626];
}
else {
vErrors.push(err1626);
}
errors++;
}
for(const key86 in data500){
if(!(func1.call(schema31.properties.split.properties.draft.properties, key86))){
const err1627 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key86},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1627];
}
else {
vErrors.push(err1627);
}
errors++;
}
}
if(data500.id !== undefined){
let data501 = data500.id;
if(typeof data501 === "string"){
if(func2(data501) > 64){
const err1628 = {instancePath:instancePath+"/split/draft/id",schemaPath:"#/properties/split/properties/draft/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1628];
}
else {
vErrors.push(err1628);
}
errors++;
}
if(func2(data501) < 1){
const err1629 = {instancePath:instancePath+"/split/draft/id",schemaPath:"#/properties/split/properties/draft/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1629];
}
else {
vErrors.push(err1629);
}
errors++;
}
if(!pattern4.test(data501)){
const err1630 = {instancePath:instancePath+"/split/draft/id",schemaPath:"#/properties/split/properties/draft/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1630];
}
else {
vErrors.push(err1630);
}
errors++;
}
}
else {
const err1631 = {instancePath:instancePath+"/split/draft/id",schemaPath:"#/properties/split/properties/draft/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1631];
}
else {
vErrors.push(err1631);
}
errors++;
}
}
if(data500.sourceKind !== undefined){
let data502 = data500.sourceKind;
if(!((data502 === "folder") || (data502 === "2dparts"))){
const err1632 = {instancePath:instancePath+"/split/draft/sourceKind",schemaPath:"#/properties/split/properties/draft/properties/sourceKind/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.sourceKind.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1632];
}
else {
vErrors.push(err1632);
}
errors++;
}
}
if(data500.sourceHash !== undefined){
let data503 = data500.sourceHash;
const _errs1109 = errors;
let valid251 = false;
const _errs1110 = errors;
if(typeof data503 === "string"){
if(!pattern11.test(data503)){
const err1633 = {instancePath:instancePath+"/split/draft/sourceHash",schemaPath:"#/properties/split/properties/draft/properties/sourceHash/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""};
if(vErrors === null){
vErrors = [err1633];
}
else {
vErrors.push(err1633);
}
errors++;
}
}
else {
const err1634 = {instancePath:instancePath+"/split/draft/sourceHash",schemaPath:"#/properties/split/properties/draft/properties/sourceHash/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1634];
}
else {
vErrors.push(err1634);
}
errors++;
}
var _valid20 = _errs1110 === errors;
valid251 = valid251 || _valid20;
const _errs1112 = errors;
if(data503 !== null){
const err1635 = {instancePath:instancePath+"/split/draft/sourceHash",schemaPath:"#/properties/split/properties/draft/properties/sourceHash/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1635];
}
else {
vErrors.push(err1635);
}
errors++;
}
var _valid20 = _errs1112 === errors;
valid251 = valid251 || _valid20;
if(!valid251){
const err1636 = {instancePath:instancePath+"/split/draft/sourceHash",schemaPath:"#/properties/split/properties/draft/properties/sourceHash/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1636];
}
else {
vErrors.push(err1636);
}
errors++;
}
else {
errors = _errs1109;
if(vErrors !== null){
if(_errs1109){
vErrors.length = _errs1109;
}
else {
vErrors = null;
}
}
}
}
if(data500.sourceManifest !== undefined){
let data504 = data500.sourceManifest;
const _errs1115 = errors;
let valid252 = false;
const _errs1116 = errors;
if(typeof data504 === "string"){
if(func2(data504) > 1048576){
const err1637 = {instancePath:instancePath+"/split/draft/sourceManifest",schemaPath:"#/properties/split/properties/draft/properties/sourceManifest/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 1048576},message:"must NOT have more than 1048576 characters"};
if(vErrors === null){
vErrors = [err1637];
}
else {
vErrors.push(err1637);
}
errors++;
}
if(func2(data504) < 1){
const err1638 = {instancePath:instancePath+"/split/draft/sourceManifest",schemaPath:"#/properties/split/properties/draft/properties/sourceManifest/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1638];
}
else {
vErrors.push(err1638);
}
errors++;
}
}
else {
const err1639 = {instancePath:instancePath+"/split/draft/sourceManifest",schemaPath:"#/properties/split/properties/draft/properties/sourceManifest/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1639];
}
else {
vErrors.push(err1639);
}
errors++;
}
var _valid21 = _errs1116 === errors;
valid252 = valid252 || _valid21;
const _errs1118 = errors;
if(data504 !== null){
const err1640 = {instancePath:instancePath+"/split/draft/sourceManifest",schemaPath:"#/properties/split/properties/draft/properties/sourceManifest/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1640];
}
else {
vErrors.push(err1640);
}
errors++;
}
var _valid21 = _errs1118 === errors;
valid252 = valid252 || _valid21;
if(!valid252){
const err1641 = {instancePath:instancePath+"/split/draft/sourceManifest",schemaPath:"#/properties/split/properties/draft/properties/sourceManifest/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1641];
}
else {
vErrors.push(err1641);
}
errors++;
}
else {
errors = _errs1115;
if(vErrors !== null){
if(_errs1115){
vErrors.length = _errs1115;
}
else {
vErrors = null;
}
}
}
}
if(data500.canvas !== undefined){
let data505 = data500.canvas;
if(data505 && typeof data505 == "object" && !Array.isArray(data505)){
if(data505.width === undefined){
const err1642 = {instancePath:instancePath+"/split/draft/canvas",schemaPath:"#/properties/split/properties/draft/properties/canvas/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1642];
}
else {
vErrors.push(err1642);
}
errors++;
}
if(data505.height === undefined){
const err1643 = {instancePath:instancePath+"/split/draft/canvas",schemaPath:"#/properties/split/properties/draft/properties/canvas/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1643];
}
else {
vErrors.push(err1643);
}
errors++;
}
for(const key87 in data505){
if(!((key87 === "width") || (key87 === "height"))){
const err1644 = {instancePath:instancePath+"/split/draft/canvas",schemaPath:"#/properties/split/properties/draft/properties/canvas/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key87},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1644];
}
else {
vErrors.push(err1644);
}
errors++;
}
}
if(data505.width !== undefined){
let data506 = data505.width;
if(!(((typeof data506 == "number") && (!(data506 % 1) && !isNaN(data506))) && (isFinite(data506)))){
const err1645 = {instancePath:instancePath+"/split/draft/canvas/width",schemaPath:"#/properties/split/properties/draft/properties/canvas/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1645];
}
else {
vErrors.push(err1645);
}
errors++;
}
if((typeof data506 == "number") && (isFinite(data506))){
if(data506 > 4096 || isNaN(data506)){
const err1646 = {instancePath:instancePath+"/split/draft/canvas/width",schemaPath:"#/properties/split/properties/draft/properties/canvas/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1646];
}
else {
vErrors.push(err1646);
}
errors++;
}
if(data506 < 1 || isNaN(data506)){
const err1647 = {instancePath:instancePath+"/split/draft/canvas/width",schemaPath:"#/properties/split/properties/draft/properties/canvas/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1647];
}
else {
vErrors.push(err1647);
}
errors++;
}
}
}
if(data505.height !== undefined){
let data507 = data505.height;
if(!(((typeof data507 == "number") && (!(data507 % 1) && !isNaN(data507))) && (isFinite(data507)))){
const err1648 = {instancePath:instancePath+"/split/draft/canvas/height",schemaPath:"#/properties/split/properties/draft/properties/canvas/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1648];
}
else {
vErrors.push(err1648);
}
errors++;
}
if((typeof data507 == "number") && (isFinite(data507))){
if(data507 > 4096 || isNaN(data507)){
const err1649 = {instancePath:instancePath+"/split/draft/canvas/height",schemaPath:"#/properties/split/properties/draft/properties/canvas/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1649];
}
else {
vErrors.push(err1649);
}
errors++;
}
if(data507 < 1 || isNaN(data507)){
const err1650 = {instancePath:instancePath+"/split/draft/canvas/height",schemaPath:"#/properties/split/properties/draft/properties/canvas/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1650];
}
else {
vErrors.push(err1650);
}
errors++;
}
}
}
}
else {
const err1651 = {instancePath:instancePath+"/split/draft/canvas",schemaPath:"#/properties/split/properties/draft/properties/canvas/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1651];
}
else {
vErrors.push(err1651);
}
errors++;
}
}
if(data500.layout !== undefined){
let data508 = data500.layout;
if(!(((data508 === "manifest") || (data508 === "common")) || (data508 === "cropped"))){
const err1652 = {instancePath:instancePath+"/split/draft/layout",schemaPath:"#/properties/split/properties/draft/properties/layout/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.layout.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1652];
}
else {
vErrors.push(err1652);
}
errors++;
}
}
if(data500.layoutConfirmed !== undefined){
if(typeof data500.layoutConfirmed !== "boolean"){
const err1653 = {instancePath:instancePath+"/split/draft/layoutConfirmed",schemaPath:"#/properties/split/properties/draft/properties/layoutConfirmed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1653];
}
else {
vErrors.push(err1653);
}
errors++;
}
}
if(data500.limitedAccepted !== undefined){
if(typeof data500.limitedAccepted !== "boolean"){
const err1654 = {instancePath:instancePath+"/split/draft/limitedAccepted",schemaPath:"#/properties/split/properties/draft/properties/limitedAccepted/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1654];
}
else {
vErrors.push(err1654);
}
errors++;
}
}
if(data500.omittedAccepted !== undefined){
if(typeof data500.omittedAccepted !== "boolean"){
const err1655 = {instancePath:instancePath+"/split/draft/omittedAccepted",schemaPath:"#/properties/split/properties/draft/properties/omittedAccepted/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1655];
}
else {
vErrors.push(err1655);
}
errors++;
}
}
if(data500.layers !== undefined){
let data512 = data500.layers;
if(Array.isArray(data512)){
if(data512.length > 64){
const err1656 = {instancePath:instancePath+"/split/draft/layers",schemaPath:"#/properties/split/properties/draft/properties/layers/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err1656];
}
else {
vErrors.push(err1656);
}
errors++;
}
if(data512.length < 1){
const err1657 = {instancePath:instancePath+"/split/draft/layers",schemaPath:"#/properties/split/properties/draft/properties/layers/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"};
if(vErrors === null){
vErrors = [err1657];
}
else {
vErrors.push(err1657);
}
errors++;
}
const len70 = data512.length;
for(let i74=0; i74<len70; i74++){
let data513 = data512[i74];
if(data513 && typeof data513 == "object" && !Array.isArray(data513)){
if(data513.id === undefined){
const err1658 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err1658];
}
else {
vErrors.push(err1658);
}
errors++;
}
if(data513.name === undefined){
const err1659 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "name"},message:"must have required property '"+"name"+"'"};
if(vErrors === null){
vErrors = [err1659];
}
else {
vErrors.push(err1659);
}
errors++;
}
if(data513.origin === undefined){
const err1660 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "origin"},message:"must have required property '"+"origin"+"'"};
if(vErrors === null){
vErrors = [err1660];
}
else {
vErrors.push(err1660);
}
errors++;
}
if(data513.z === undefined){
const err1661 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "z"},message:"must have required property '"+"z"+"'"};
if(vErrors === null){
vErrors = [err1661];
}
else {
vErrors.push(err1661);
}
errors++;
}
if(data513.role === undefined){
const err1662 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "role"},message:"must have required property '"+"role"+"'"};
if(vErrors === null){
vErrors = [err1662];
}
else {
vErrors.push(err1662);
}
errors++;
}
if(data513.side === undefined){
const err1663 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "side"},message:"must have required property '"+"side"+"'"};
if(vErrors === null){
vErrors = [err1663];
}
else {
vErrors.push(err1663);
}
errors++;
}
if(data513.visible === undefined){
const err1664 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "visible"},message:"must have required property '"+"visible"+"'"};
if(vErrors === null){
vErrors = [err1664];
}
else {
vErrors.push(err1664);
}
errors++;
}
if(data513.opacity === undefined){
const err1665 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "opacity"},message:"must have required property '"+"opacity"+"'"};
if(vErrors === null){
vErrors = [err1665];
}
else {
vErrors.push(err1665);
}
errors++;
}
if(data513.parentId === undefined){
const err1666 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "parentId"},message:"must have required property '"+"parentId"+"'"};
if(vErrors === null){
vErrors = [err1666];
}
else {
vErrors.push(err1666);
}
errors++;
}
if(data513.groupId === undefined){
const err1667 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "groupId"},message:"must have required property '"+"groupId"+"'"};
if(vErrors === null){
vErrors = [err1667];
}
else {
vErrors.push(err1667);
}
errors++;
}
if(data513.usage === undefined){
const err1668 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "usage"},message:"must have required property '"+"usage"+"'"};
if(vErrors === null){
vErrors = [err1668];
}
else {
vErrors.push(err1668);
}
errors++;
}
if(data513.variantOf === undefined){
const err1669 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "variantOf"},message:"must have required property '"+"variantOf"+"'"};
if(vErrors === null){
vErrors = [err1669];
}
else {
vErrors.push(err1669);
}
errors++;
}
if(data513.state === undefined){
const err1670 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "state"},message:"must have required property '"+"state"+"'"};
if(vErrors === null){
vErrors = [err1670];
}
else {
vErrors.push(err1670);
}
errors++;
}
if(data513.positionConfirmed === undefined){
const err1671 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "positionConfirmed"},message:"must have required property '"+"positionConfirmed"+"'"};
if(vErrors === null){
vErrors = [err1671];
}
else {
vErrors.push(err1671);
}
errors++;
}
if(data513.roleConfirmed === undefined){
const err1672 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "roleConfirmed"},message:"must have required property '"+"roleConfirmed"+"'"};
if(vErrors === null){
vErrors = [err1672];
}
else {
vErrors.push(err1672);
}
errors++;
}
if(data513.sourceId === undefined){
const err1673 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "sourceId"},message:"must have required property '"+"sourceId"+"'"};
if(vErrors === null){
vErrors = [err1673];
}
else {
vErrors.push(err1673);
}
errors++;
}
if(data513.sourceName === undefined){
const err1674 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "sourceName"},message:"must have required property '"+"sourceName"+"'"};
if(vErrors === null){
vErrors = [err1674];
}
else {
vErrors.push(err1674);
}
errors++;
}
if(data513.sourcePath === undefined){
const err1675 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "sourcePath"},message:"must have required property '"+"sourcePath"+"'"};
if(vErrors === null){
vErrors = [err1675];
}
else {
vErrors.push(err1675);
}
errors++;
}
if(data513.sourceZ === undefined){
const err1676 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "sourceZ"},message:"must have required property '"+"sourceZ"+"'"};
if(vErrors === null){
vErrors = [err1676];
}
else {
vErrors.push(err1676);
}
errors++;
}
if(data513.sourceOrigin === undefined){
const err1677 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "sourceOrigin"},message:"must have required property '"+"sourceOrigin"+"'"};
if(vErrors === null){
vErrors = [err1677];
}
else {
vErrors.push(err1677);
}
errors++;
}
if(data513.originalAssetId === undefined){
const err1678 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "originalAssetId"},message:"must have required property '"+"originalAssetId"+"'"};
if(vErrors === null){
vErrors = [err1678];
}
else {
vErrors.push(err1678);
}
errors++;
}
if(data513.imageAssetId === undefined){
const err1679 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "imageAssetId"},message:"must have required property '"+"imageAssetId"+"'"};
if(vErrors === null){
vErrors = [err1679];
}
else {
vErrors.push(err1679);
}
errors++;
}
if(data513.sourceHash === undefined){
const err1680 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "sourceHash"},message:"must have required property '"+"sourceHash"+"'"};
if(vErrors === null){
vErrors = [err1680];
}
else {
vErrors.push(err1680);
}
errors++;
}
if(data513.imageHash === undefined){
const err1681 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "imageHash"},message:"must have required property '"+"imageHash"+"'"};
if(vErrors === null){
vErrors = [err1681];
}
else {
vErrors.push(err1681);
}
errors++;
}
if(data513.image === undefined){
const err1682 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "image"},message:"must have required property '"+"image"+"'"};
if(vErrors === null){
vErrors = [err1682];
}
else {
vErrors.push(err1682);
}
errors++;
}
if(data513.proposal === undefined){
const err1683 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "proposal"},message:"must have required property '"+"proposal"+"'"};
if(vErrors === null){
vErrors = [err1683];
}
else {
vErrors.push(err1683);
}
errors++;
}
for(const key88 in data513){
if(!(func1.call(schema31.properties.split.properties.draft.properties.layers.items.properties, key88))){
const err1684 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key88},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1684];
}
else {
vErrors.push(err1684);
}
errors++;
}
}
if(data513.id !== undefined){
let data514 = data513.id;
if(typeof data514 === "string"){
if(func2(data514) > 64){
const err1685 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/id",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1685];
}
else {
vErrors.push(err1685);
}
errors++;
}
if(func2(data514) < 1){
const err1686 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/id",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1686];
}
else {
vErrors.push(err1686);
}
errors++;
}
if(!pattern4.test(data514)){
const err1687 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/id",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1687];
}
else {
vErrors.push(err1687);
}
errors++;
}
}
else {
const err1688 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/id",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1688];
}
else {
vErrors.push(err1688);
}
errors++;
}
}
if(data513.name !== undefined){
let data515 = data513.name;
if(typeof data515 === "string"){
if(func2(data515) > 120){
const err1689 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/name",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/name/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err1689];
}
else {
vErrors.push(err1689);
}
errors++;
}
if(func2(data515) < 1){
const err1690 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/name",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1690];
}
else {
vErrors.push(err1690);
}
errors++;
}
}
else {
const err1691 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/name",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1691];
}
else {
vErrors.push(err1691);
}
errors++;
}
}
if(data513.origin !== undefined){
let data516 = data513.origin;
if(Array.isArray(data516)){
if(data516.length > 2){
const err1692 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/origin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/origin/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err1692];
}
else {
vErrors.push(err1692);
}
errors++;
}
if(data516.length < 2){
const err1693 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/origin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/origin/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err1693];
}
else {
vErrors.push(err1693);
}
errors++;
}
const len71 = data516.length;
for(let i75=0; i75<len71; i75++){
let data517 = data516[i75];
if(!((typeof data517 == "number") && (isFinite(data517)))){
const err1694 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/origin/" + i75,schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/origin/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1694];
}
else {
vErrors.push(err1694);
}
errors++;
}
}
}
else {
const err1695 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/origin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/origin/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1695];
}
else {
vErrors.push(err1695);
}
errors++;
}
}
if(data513.z !== undefined){
let data518 = data513.z;
if(!(((typeof data518 == "number") && (!(data518 % 1) && !isNaN(data518))) && (isFinite(data518)))){
const err1696 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/z",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/z/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1696];
}
else {
vErrors.push(err1696);
}
errors++;
}
if((typeof data518 == "number") && (isFinite(data518))){
if(data518 > 100000 || isNaN(data518)){
const err1697 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/z",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/z/maximum",keyword:"maximum",params:{comparison: "<=", limit: 100000},message:"must be <= 100000"};
if(vErrors === null){
vErrors = [err1697];
}
else {
vErrors.push(err1697);
}
errors++;
}
if(data518 < -100000 || isNaN(data518)){
const err1698 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/z",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/z/minimum",keyword:"minimum",params:{comparison: ">=", limit: -100000},message:"must be >= -100000"};
if(vErrors === null){
vErrors = [err1698];
}
else {
vErrors.push(err1698);
}
errors++;
}
}
}
if(data513.role !== undefined){
let data519 = data513.role;
if(!(((((((((data519 === "base") || (data519 === "body")) || (data519 === "head")) || (data519 === "hair-front")) || (data519 === "hair-back")) || (data519 === "eye")) || (data519 === "mouth")) || (data519 === "accessory")) || (data519 === "custom"))){
const err1699 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/role",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/role/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.layers.items.properties.role.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1699];
}
else {
vErrors.push(err1699);
}
errors++;
}
}
if(data513.side !== undefined){
let data520 = data513.side;
if(!((((data520 === "character-left") || (data520 === "character-right")) || (data520 === "center")) || (data520 === "none"))){
const err1700 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/side",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/side/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.layers.items.properties.side.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1700];
}
else {
vErrors.push(err1700);
}
errors++;
}
}
if(data513.visible !== undefined){
if(typeof data513.visible !== "boolean"){
const err1701 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/visible",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/visible/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1701];
}
else {
vErrors.push(err1701);
}
errors++;
}
}
if(data513.opacity !== undefined){
let data522 = data513.opacity;
if((typeof data522 == "number") && (isFinite(data522))){
if(data522 > 1 || isNaN(data522)){
const err1702 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/opacity",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/opacity/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err1702];
}
else {
vErrors.push(err1702);
}
errors++;
}
if(data522 < 0 || isNaN(data522)){
const err1703 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/opacity",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/opacity/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1703];
}
else {
vErrors.push(err1703);
}
errors++;
}
}
else {
const err1704 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/opacity",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/opacity/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1704];
}
else {
vErrors.push(err1704);
}
errors++;
}
}
if(data513.parentId !== undefined){
let data523 = data513.parentId;
const _errs1156 = errors;
let valid259 = false;
const _errs1157 = errors;
if(typeof data523 === "string"){
if(func2(data523) > 64){
const err1705 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/parentId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/parentId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1705];
}
else {
vErrors.push(err1705);
}
errors++;
}
if(func2(data523) < 1){
const err1706 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/parentId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/parentId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1706];
}
else {
vErrors.push(err1706);
}
errors++;
}
if(!pattern4.test(data523)){
const err1707 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/parentId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/parentId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1707];
}
else {
vErrors.push(err1707);
}
errors++;
}
}
else {
const err1708 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/parentId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/parentId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1708];
}
else {
vErrors.push(err1708);
}
errors++;
}
var _valid22 = _errs1157 === errors;
valid259 = valid259 || _valid22;
const _errs1159 = errors;
if(data523 !== null){
const err1709 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/parentId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/parentId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1709];
}
else {
vErrors.push(err1709);
}
errors++;
}
var _valid22 = _errs1159 === errors;
valid259 = valid259 || _valid22;
if(!valid259){
const err1710 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/parentId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/parentId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1710];
}
else {
vErrors.push(err1710);
}
errors++;
}
else {
errors = _errs1156;
if(vErrors !== null){
if(_errs1156){
vErrors.length = _errs1156;
}
else {
vErrors = null;
}
}
}
}
if(data513.groupId !== undefined){
let data524 = data513.groupId;
const _errs1162 = errors;
let valid260 = false;
const _errs1163 = errors;
if(typeof data524 === "string"){
if(func2(data524) > 64){
const err1711 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/groupId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/groupId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1711];
}
else {
vErrors.push(err1711);
}
errors++;
}
if(func2(data524) < 1){
const err1712 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/groupId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/groupId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1712];
}
else {
vErrors.push(err1712);
}
errors++;
}
if(!pattern4.test(data524)){
const err1713 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/groupId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/groupId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1713];
}
else {
vErrors.push(err1713);
}
errors++;
}
}
else {
const err1714 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/groupId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/groupId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1714];
}
else {
vErrors.push(err1714);
}
errors++;
}
var _valid23 = _errs1163 === errors;
valid260 = valid260 || _valid23;
const _errs1165 = errors;
if(data524 !== null){
const err1715 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/groupId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/groupId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1715];
}
else {
vErrors.push(err1715);
}
errors++;
}
var _valid23 = _errs1165 === errors;
valid260 = valid260 || _valid23;
if(!valid260){
const err1716 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/groupId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/groupId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1716];
}
else {
vErrors.push(err1716);
}
errors++;
}
else {
errors = _errs1162;
if(vErrors !== null){
if(_errs1162){
vErrors.length = _errs1162;
}
else {
vErrors = null;
}
}
}
}
if(data513.usage !== undefined){
let data525 = data513.usage;
if(!(((data525 === "primary") || (data525 === "auxiliary")) || (data525 === "alternative"))){
const err1717 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/usage",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/usage/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.layers.items.properties.usage.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1717];
}
else {
vErrors.push(err1717);
}
errors++;
}
}
if(data513.variantOf !== undefined){
let data526 = data513.variantOf;
const _errs1169 = errors;
let valid261 = false;
const _errs1170 = errors;
if(typeof data526 === "string"){
if(func2(data526) > 64){
const err1718 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/variantOf",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/variantOf/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1718];
}
else {
vErrors.push(err1718);
}
errors++;
}
if(func2(data526) < 1){
const err1719 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/variantOf",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/variantOf/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1719];
}
else {
vErrors.push(err1719);
}
errors++;
}
if(!pattern4.test(data526)){
const err1720 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/variantOf",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/variantOf/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1720];
}
else {
vErrors.push(err1720);
}
errors++;
}
}
else {
const err1721 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/variantOf",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/variantOf/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1721];
}
else {
vErrors.push(err1721);
}
errors++;
}
var _valid24 = _errs1170 === errors;
valid261 = valid261 || _valid24;
const _errs1172 = errors;
if(data526 !== null){
const err1722 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/variantOf",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/variantOf/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1722];
}
else {
vErrors.push(err1722);
}
errors++;
}
var _valid24 = _errs1172 === errors;
valid261 = valid261 || _valid24;
if(!valid261){
const err1723 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/variantOf",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/variantOf/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1723];
}
else {
vErrors.push(err1723);
}
errors++;
}
else {
errors = _errs1169;
if(vErrors !== null){
if(_errs1169){
vErrors.length = _errs1169;
}
else {
vErrors = null;
}
}
}
}
if(data513.state !== undefined){
let data527 = data513.state;
if(!((((data527 === "default") || (data527 === "open")) || (data527 === "closed")) || (data527 === "middle"))){
const err1724 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/state",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/state/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.layers.items.properties.state.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1724];
}
else {
vErrors.push(err1724);
}
errors++;
}
}
if(data513.positionConfirmed !== undefined){
if(typeof data513.positionConfirmed !== "boolean"){
const err1725 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/positionConfirmed",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/positionConfirmed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1725];
}
else {
vErrors.push(err1725);
}
errors++;
}
}
if(data513.roleConfirmed !== undefined){
if(typeof data513.roleConfirmed !== "boolean"){
const err1726 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/roleConfirmed",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/roleConfirmed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1726];
}
else {
vErrors.push(err1726);
}
errors++;
}
}
if(data513.sourceId !== undefined){
let data530 = data513.sourceId;
if(typeof data530 === "string"){
if(func2(data530) > 128){
const err1727 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceId/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1727];
}
else {
vErrors.push(err1727);
}
errors++;
}
if(func2(data530) < 1){
const err1728 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1728];
}
else {
vErrors.push(err1728);
}
errors++;
}
}
else {
const err1729 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1729];
}
else {
vErrors.push(err1729);
}
errors++;
}
}
if(data513.sourceName !== undefined){
let data531 = data513.sourceName;
if(typeof data531 === "string"){
if(func2(data531) > 120){
const err1730 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceName",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err1730];
}
else {
vErrors.push(err1730);
}
errors++;
}
if(func2(data531) < 1){
const err1731 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceName",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1731];
}
else {
vErrors.push(err1731);
}
errors++;
}
}
else {
const err1732 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceName",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1732];
}
else {
vErrors.push(err1732);
}
errors++;
}
}
if(data513.sourcePath !== undefined){
let data532 = data513.sourcePath;
if(typeof data532 === "string"){
if(func2(data532) > 240){
const err1733 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourcePath",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourcePath/maxLength",keyword:"maxLength",params:{limit: 240},message:"must NOT have more than 240 characters"};
if(vErrors === null){
vErrors = [err1733];
}
else {
vErrors.push(err1733);
}
errors++;
}
if(func2(data532) < 1){
const err1734 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourcePath",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourcePath/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1734];
}
else {
vErrors.push(err1734);
}
errors++;
}
}
else {
const err1735 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourcePath",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourcePath/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1735];
}
else {
vErrors.push(err1735);
}
errors++;
}
}
if(data513.sourceZ !== undefined){
let data533 = data513.sourceZ;
const _errs1186 = errors;
let valid262 = false;
const _errs1187 = errors;
if(!(((typeof data533 == "number") && (!(data533 % 1) && !isNaN(data533))) && (isFinite(data533)))){
const err1736 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceZ",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceZ/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1736];
}
else {
vErrors.push(err1736);
}
errors++;
}
if((typeof data533 == "number") && (isFinite(data533))){
if(data533 > 100000 || isNaN(data533)){
const err1737 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceZ",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceZ/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 100000},message:"must be <= 100000"};
if(vErrors === null){
vErrors = [err1737];
}
else {
vErrors.push(err1737);
}
errors++;
}
if(data533 < -100000 || isNaN(data533)){
const err1738 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceZ",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceZ/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: -100000},message:"must be >= -100000"};
if(vErrors === null){
vErrors = [err1738];
}
else {
vErrors.push(err1738);
}
errors++;
}
}
var _valid25 = _errs1187 === errors;
valid262 = valid262 || _valid25;
const _errs1189 = errors;
if(data533 !== null){
const err1739 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceZ",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceZ/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1739];
}
else {
vErrors.push(err1739);
}
errors++;
}
var _valid25 = _errs1189 === errors;
valid262 = valid262 || _valid25;
if(!valid262){
const err1740 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceZ",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceZ/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1740];
}
else {
vErrors.push(err1740);
}
errors++;
}
else {
errors = _errs1186;
if(vErrors !== null){
if(_errs1186){
vErrors.length = _errs1186;
}
else {
vErrors = null;
}
}
}
}
if(data513.sourceOrigin !== undefined){
let data534 = data513.sourceOrigin;
const _errs1192 = errors;
let valid263 = false;
const _errs1193 = errors;
if(Array.isArray(data534)){
if(data534.length > 2){
const err1741 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceOrigin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceOrigin/anyOf/0/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err1741];
}
else {
vErrors.push(err1741);
}
errors++;
}
if(data534.length < 2){
const err1742 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceOrigin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceOrigin/anyOf/0/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err1742];
}
else {
vErrors.push(err1742);
}
errors++;
}
const len72 = data534.length;
for(let i76=0; i76<len72; i76++){
let data535 = data534[i76];
if(!((typeof data535 == "number") && (isFinite(data535)))){
const err1743 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceOrigin/" + i76,schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceOrigin/anyOf/0/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1743];
}
else {
vErrors.push(err1743);
}
errors++;
}
}
}
else {
const err1744 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceOrigin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceOrigin/anyOf/0/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1744];
}
else {
vErrors.push(err1744);
}
errors++;
}
var _valid26 = _errs1193 === errors;
valid263 = valid263 || _valid26;
const _errs1197 = errors;
if(data534 !== null){
const err1745 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceOrigin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceOrigin/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1745];
}
else {
vErrors.push(err1745);
}
errors++;
}
var _valid26 = _errs1197 === errors;
valid263 = valid263 || _valid26;
if(!valid263){
const err1746 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceOrigin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceOrigin/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1746];
}
else {
vErrors.push(err1746);
}
errors++;
}
else {
errors = _errs1192;
if(vErrors !== null){
if(_errs1192){
vErrors.length = _errs1192;
}
else {
vErrors = null;
}
}
}
}
if(data513.originalAssetId !== undefined){
let data536 = data513.originalAssetId;
if(typeof data536 === "string"){
if(func2(data536) > 64){
const err1747 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/originalAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/originalAssetId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1747];
}
else {
vErrors.push(err1747);
}
errors++;
}
if(func2(data536) < 1){
const err1748 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/originalAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/originalAssetId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1748];
}
else {
vErrors.push(err1748);
}
errors++;
}
if(!pattern4.test(data536)){
const err1749 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/originalAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/originalAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1749];
}
else {
vErrors.push(err1749);
}
errors++;
}
}
else {
const err1750 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/originalAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/originalAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1750];
}
else {
vErrors.push(err1750);
}
errors++;
}
}
if(data513.imageAssetId !== undefined){
let data537 = data513.imageAssetId;
if(typeof data537 === "string"){
if(func2(data537) > 64){
const err1751 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/imageAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/imageAssetId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1751];
}
else {
vErrors.push(err1751);
}
errors++;
}
if(func2(data537) < 1){
const err1752 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/imageAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/imageAssetId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1752];
}
else {
vErrors.push(err1752);
}
errors++;
}
if(!pattern4.test(data537)){
const err1753 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/imageAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/imageAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1753];
}
else {
vErrors.push(err1753);
}
errors++;
}
}
else {
const err1754 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/imageAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/imageAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1754];
}
else {
vErrors.push(err1754);
}
errors++;
}
}
if(data513.sourceHash !== undefined){
let data538 = data513.sourceHash;
if(typeof data538 === "string"){
if(!pattern11.test(data538)){
const err1755 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceHash",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceHash/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""};
if(vErrors === null){
vErrors = [err1755];
}
else {
vErrors.push(err1755);
}
errors++;
}
}
else {
const err1756 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/sourceHash",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceHash/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1756];
}
else {
vErrors.push(err1756);
}
errors++;
}
}
if(data513.imageHash !== undefined){
let data539 = data513.imageHash;
if(typeof data539 === "string"){
if(!pattern11.test(data539)){
const err1757 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/imageHash",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/imageHash/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""};
if(vErrors === null){
vErrors = [err1757];
}
else {
vErrors.push(err1757);
}
errors++;
}
}
else {
const err1758 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/imageHash",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/imageHash/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1758];
}
else {
vErrors.push(err1758);
}
errors++;
}
}
if(data513.image !== undefined){
let data540 = data513.image;
if(data540 && typeof data540 == "object" && !Array.isArray(data540)){
if(data540.key === undefined){
const err1759 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/required",keyword:"required",params:{missingProperty: "key"},message:"must have required property '"+"key"+"'"};
if(vErrors === null){
vErrors = [err1759];
}
else {
vErrors.push(err1759);
}
errors++;
}
if(data540.width === undefined){
const err1760 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1760];
}
else {
vErrors.push(err1760);
}
errors++;
}
if(data540.height === undefined){
const err1761 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1761];
}
else {
vErrors.push(err1761);
}
errors++;
}
if(data540.bounds === undefined){
const err1762 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/required",keyword:"required",params:{missingProperty: "bounds"},message:"must have required property '"+"bounds"+"'"};
if(vErrors === null){
vErrors = [err1762];
}
else {
vErrors.push(err1762);
}
errors++;
}
if(data540.empty === undefined){
const err1763 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/required",keyword:"required",params:{missingProperty: "empty"},message:"must have required property '"+"empty"+"'"};
if(vErrors === null){
vErrors = [err1763];
}
else {
vErrors.push(err1763);
}
errors++;
}
if(data540.opaque === undefined){
const err1764 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/required",keyword:"required",params:{missingProperty: "opaque"},message:"must have required property '"+"opaque"+"'"};
if(vErrors === null){
vErrors = [err1764];
}
else {
vErrors.push(err1764);
}
errors++;
}
if(data540.iccConverted === undefined){
const err1765 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/required",keyword:"required",params:{missingProperty: "iccConverted"},message:"must have required property '"+"iccConverted"+"'"};
if(vErrors === null){
vErrors = [err1765];
}
else {
vErrors.push(err1765);
}
errors++;
}
for(const key89 in data540){
if(!(((((((key89 === "key") || (key89 === "width")) || (key89 === "height")) || (key89 === "bounds")) || (key89 === "empty")) || (key89 === "opaque")) || (key89 === "iccConverted"))){
const err1766 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key89},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1766];
}
else {
vErrors.push(err1766);
}
errors++;
}
}
if(data540.key !== undefined){
let data541 = data540.key;
if(typeof data541 === "string"){
if(!pattern11.test(data541)){
const err1767 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/key",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/key/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""};
if(vErrors === null){
vErrors = [err1767];
}
else {
vErrors.push(err1767);
}
errors++;
}
}
else {
const err1768 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/key",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/key/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1768];
}
else {
vErrors.push(err1768);
}
errors++;
}
}
if(data540.width !== undefined){
let data542 = data540.width;
if(!(((typeof data542 == "number") && (!(data542 % 1) && !isNaN(data542))) && (isFinite(data542)))){
const err1769 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/width",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1769];
}
else {
vErrors.push(err1769);
}
errors++;
}
if((typeof data542 == "number") && (isFinite(data542))){
if(data542 > 4096 || isNaN(data542)){
const err1770 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/width",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1770];
}
else {
vErrors.push(err1770);
}
errors++;
}
if(data542 < 1 || isNaN(data542)){
const err1771 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/width",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1771];
}
else {
vErrors.push(err1771);
}
errors++;
}
}
}
if(data540.height !== undefined){
let data543 = data540.height;
if(!(((typeof data543 == "number") && (!(data543 % 1) && !isNaN(data543))) && (isFinite(data543)))){
const err1772 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/height",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1772];
}
else {
vErrors.push(err1772);
}
errors++;
}
if((typeof data543 == "number") && (isFinite(data543))){
if(data543 > 4096 || isNaN(data543)){
const err1773 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/height",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1773];
}
else {
vErrors.push(err1773);
}
errors++;
}
if(data543 < 1 || isNaN(data543)){
const err1774 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/height",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1774];
}
else {
vErrors.push(err1774);
}
errors++;
}
}
}
if(data540.bounds !== undefined){
let data544 = data540.bounds;
const _errs1217 = errors;
let valid267 = false;
const _errs1218 = errors;
if(data544 && typeof data544 == "object" && !Array.isArray(data544)){
if(data544.x === undefined){
const err1775 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1775];
}
else {
vErrors.push(err1775);
}
errors++;
}
if(data544.y === undefined){
const err1776 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1776];
}
else {
vErrors.push(err1776);
}
errors++;
}
if(data544.width === undefined){
const err1777 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1777];
}
else {
vErrors.push(err1777);
}
errors++;
}
if(data544.height === undefined){
const err1778 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1778];
}
else {
vErrors.push(err1778);
}
errors++;
}
for(const key90 in data544){
if(!((((key90 === "x") || (key90 === "y")) || (key90 === "width")) || (key90 === "height"))){
const err1779 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key90},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1779];
}
else {
vErrors.push(err1779);
}
errors++;
}
}
if(data544.x !== undefined){
let data545 = data544.x;
if(!((typeof data545 == "number") && (isFinite(data545)))){
const err1780 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/bounds/x",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1780];
}
else {
vErrors.push(err1780);
}
errors++;
}
}
if(data544.y !== undefined){
let data546 = data544.y;
if(!((typeof data546 == "number") && (isFinite(data546)))){
const err1781 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/bounds/y",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1781];
}
else {
vErrors.push(err1781);
}
errors++;
}
}
if(data544.width !== undefined){
let data547 = data544.width;
if((typeof data547 == "number") && (isFinite(data547))){
if(data547 <= 0 || isNaN(data547)){
const err1782 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/bounds/width",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1782];
}
else {
vErrors.push(err1782);
}
errors++;
}
}
else {
const err1783 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/bounds/width",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1783];
}
else {
vErrors.push(err1783);
}
errors++;
}
}
if(data544.height !== undefined){
let data548 = data544.height;
if((typeof data548 == "number") && (isFinite(data548))){
if(data548 <= 0 || isNaN(data548)){
const err1784 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/bounds/height",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1784];
}
else {
vErrors.push(err1784);
}
errors++;
}
}
else {
const err1785 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/bounds/height",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1785];
}
else {
vErrors.push(err1785);
}
errors++;
}
}
}
else {
const err1786 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1786];
}
else {
vErrors.push(err1786);
}
errors++;
}
var _valid27 = _errs1218 === errors;
valid267 = valid267 || _valid27;
const _errs1229 = errors;
if(data544 !== null){
const err1787 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1787];
}
else {
vErrors.push(err1787);
}
errors++;
}
var _valid27 = _errs1229 === errors;
valid267 = valid267 || _valid27;
if(!valid267){
const err1788 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1788];
}
else {
vErrors.push(err1788);
}
errors++;
}
else {
errors = _errs1217;
if(vErrors !== null){
if(_errs1217){
vErrors.length = _errs1217;
}
else {
vErrors = null;
}
}
}
}
if(data540.empty !== undefined){
if(typeof data540.empty !== "boolean"){
const err1789 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/empty",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/empty/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1789];
}
else {
vErrors.push(err1789);
}
errors++;
}
}
if(data540.opaque !== undefined){
if(typeof data540.opaque !== "boolean"){
const err1790 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/opaque",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/opaque/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1790];
}
else {
vErrors.push(err1790);
}
errors++;
}
}
if(data540.iccConverted !== undefined){
if(typeof data540.iccConverted !== "boolean"){
const err1791 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image/iccConverted",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/iccConverted/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1791];
}
else {
vErrors.push(err1791);
}
errors++;
}
}
}
else {
const err1792 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1792];
}
else {
vErrors.push(err1792);
}
errors++;
}
}
if(data513.proposal !== undefined){
let data552 = data513.proposal;
if(data552 && typeof data552 == "object" && !Array.isArray(data552)){
if(data552.role === undefined){
const err1793 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/required",keyword:"required",params:{missingProperty: "role"},message:"must have required property '"+"role"+"'"};
if(vErrors === null){
vErrors = [err1793];
}
else {
vErrors.push(err1793);
}
errors++;
}
if(data552.side === undefined){
const err1794 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/required",keyword:"required",params:{missingProperty: "side"},message:"must have required property '"+"side"+"'"};
if(vErrors === null){
vErrors = [err1794];
}
else {
vErrors.push(err1794);
}
errors++;
}
if(data552.confidence === undefined){
const err1795 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/required",keyword:"required",params:{missingProperty: "confidence"},message:"must have required property '"+"confidence"+"'"};
if(vErrors === null){
vErrors = [err1795];
}
else {
vErrors.push(err1795);
}
errors++;
}
if(data552.reasons === undefined){
const err1796 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/required",keyword:"required",params:{missingProperty: "reasons"},message:"must have required property '"+"reasons"+"'"};
if(vErrors === null){
vErrors = [err1796];
}
else {
vErrors.push(err1796);
}
errors++;
}
for(const key91 in data552){
if(!((((key91 === "role") || (key91 === "side")) || (key91 === "confidence")) || (key91 === "reasons"))){
const err1797 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key91},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1797];
}
else {
vErrors.push(err1797);
}
errors++;
}
}
if(data552.role !== undefined){
let data553 = data552.role;
if(!(((((((((data553 === "base") || (data553 === "body")) || (data553 === "head")) || (data553 === "hair-front")) || (data553 === "hair-back")) || (data553 === "eye")) || (data553 === "mouth")) || (data553 === "accessory")) || (data553 === "custom"))){
const err1798 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal/role",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/role/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.layers.items.properties.proposal.properties.role.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1798];
}
else {
vErrors.push(err1798);
}
errors++;
}
}
if(data552.side !== undefined){
let data554 = data552.side;
if(!((((data554 === "character-left") || (data554 === "character-right")) || (data554 === "center")) || (data554 === "none"))){
const err1799 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal/side",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/side/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.layers.items.properties.proposal.properties.side.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1799];
}
else {
vErrors.push(err1799);
}
errors++;
}
}
if(data552.confidence !== undefined){
let data555 = data552.confidence;
if((typeof data555 == "number") && (isFinite(data555))){
if(data555 > 1 || isNaN(data555)){
const err1800 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal/confidence",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/confidence/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err1800];
}
else {
vErrors.push(err1800);
}
errors++;
}
if(data555 < 0 || isNaN(data555)){
const err1801 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal/confidence",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/confidence/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1801];
}
else {
vErrors.push(err1801);
}
errors++;
}
}
else {
const err1802 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal/confidence",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/confidence/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1802];
}
else {
vErrors.push(err1802);
}
errors++;
}
}
if(data552.reasons !== undefined){
let data556 = data552.reasons;
if(Array.isArray(data556)){
if(data556.length > 8){
const err1803 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal/reasons",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/reasons/maxItems",keyword:"maxItems",params:{limit: 8},message:"must NOT have more than 8 items"};
if(vErrors === null){
vErrors = [err1803];
}
else {
vErrors.push(err1803);
}
errors++;
}
const len73 = data556.length;
for(let i77=0; i77<len73; i77++){
let data557 = data556[i77];
if(typeof data557 === "string"){
if(func2(data557) > 128){
const err1804 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal/reasons/" + i77,schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/reasons/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1804];
}
else {
vErrors.push(err1804);
}
errors++;
}
if(func2(data557) < 1){
const err1805 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal/reasons/" + i77,schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/reasons/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1805];
}
else {
vErrors.push(err1805);
}
errors++;
}
}
else {
const err1806 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal/reasons/" + i77,schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/reasons/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1806];
}
else {
vErrors.push(err1806);
}
errors++;
}
}
}
else {
const err1807 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal/reasons",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/reasons/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1807];
}
else {
vErrors.push(err1807);
}
errors++;
}
}
}
else {
const err1808 = {instancePath:instancePath+"/split/draft/layers/" + i74+"/proposal",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1808];
}
else {
vErrors.push(err1808);
}
errors++;
}
}
}
else {
const err1809 = {instancePath:instancePath+"/split/draft/layers/" + i74,schemaPath:"#/properties/split/properties/draft/properties/layers/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1809];
}
else {
vErrors.push(err1809);
}
errors++;
}
}
}
else {
const err1810 = {instancePath:instancePath+"/split/draft/layers",schemaPath:"#/properties/split/properties/draft/properties/layers/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1810];
}
else {
vErrors.push(err1810);
}
errors++;
}
}
if(data500.groups !== undefined){
let data558 = data500.groups;
if(Array.isArray(data558)){
if(data558.length > 128){
const err1811 = {instancePath:instancePath+"/split/draft/groups",schemaPath:"#/properties/split/properties/draft/properties/groups/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err1811];
}
else {
vErrors.push(err1811);
}
errors++;
}
const len74 = data558.length;
for(let i78=0; i78<len74; i78++){
let data559 = data558[i78];
if(data559 && typeof data559 == "object" && !Array.isArray(data559)){
if(data559.id === undefined){
const err1812 = {instancePath:instancePath+"/split/draft/groups/" + i78,schemaPath:"#/properties/split/properties/draft/properties/groups/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err1812];
}
else {
vErrors.push(err1812);
}
errors++;
}
if(data559.name === undefined){
const err1813 = {instancePath:instancePath+"/split/draft/groups/" + i78,schemaPath:"#/properties/split/properties/draft/properties/groups/items/required",keyword:"required",params:{missingProperty: "name"},message:"must have required property '"+"name"+"'"};
if(vErrors === null){
vErrors = [err1813];
}
else {
vErrors.push(err1813);
}
errors++;
}
if(data559.parentGroupId === undefined){
const err1814 = {instancePath:instancePath+"/split/draft/groups/" + i78,schemaPath:"#/properties/split/properties/draft/properties/groups/items/required",keyword:"required",params:{missingProperty: "parentGroupId"},message:"must have required property '"+"parentGroupId"+"'"};
if(vErrors === null){
vErrors = [err1814];
}
else {
vErrors.push(err1814);
}
errors++;
}
if(data559.visible === undefined){
const err1815 = {instancePath:instancePath+"/split/draft/groups/" + i78,schemaPath:"#/properties/split/properties/draft/properties/groups/items/required",keyword:"required",params:{missingProperty: "visible"},message:"must have required property '"+"visible"+"'"};
if(vErrors === null){
vErrors = [err1815];
}
else {
vErrors.push(err1815);
}
errors++;
}
if(data559.opacity === undefined){
const err1816 = {instancePath:instancePath+"/split/draft/groups/" + i78,schemaPath:"#/properties/split/properties/draft/properties/groups/items/required",keyword:"required",params:{missingProperty: "opacity"},message:"must have required property '"+"opacity"+"'"};
if(vErrors === null){
vErrors = [err1816];
}
else {
vErrors.push(err1816);
}
errors++;
}
for(const key92 in data559){
if(!(((((key92 === "id") || (key92 === "name")) || (key92 === "parentGroupId")) || (key92 === "visible")) || (key92 === "opacity"))){
const err1817 = {instancePath:instancePath+"/split/draft/groups/" + i78,schemaPath:"#/properties/split/properties/draft/properties/groups/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key92},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1817];
}
else {
vErrors.push(err1817);
}
errors++;
}
}
if(data559.id !== undefined){
let data560 = data559.id;
if(typeof data560 === "string"){
if(func2(data560) > 64){
const err1818 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/id",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1818];
}
else {
vErrors.push(err1818);
}
errors++;
}
if(func2(data560) < 1){
const err1819 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/id",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1819];
}
else {
vErrors.push(err1819);
}
errors++;
}
if(!pattern4.test(data560)){
const err1820 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/id",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1820];
}
else {
vErrors.push(err1820);
}
errors++;
}
}
else {
const err1821 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/id",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1821];
}
else {
vErrors.push(err1821);
}
errors++;
}
}
if(data559.name !== undefined){
let data561 = data559.name;
if(typeof data561 === "string"){
if(func2(data561) > 120){
const err1822 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/name",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/name/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err1822];
}
else {
vErrors.push(err1822);
}
errors++;
}
if(func2(data561) < 1){
const err1823 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/name",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1823];
}
else {
vErrors.push(err1823);
}
errors++;
}
}
else {
const err1824 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/name",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1824];
}
else {
vErrors.push(err1824);
}
errors++;
}
}
if(data559.parentGroupId !== undefined){
let data562 = data559.parentGroupId;
const _errs1258 = errors;
let valid275 = false;
const _errs1259 = errors;
if(typeof data562 === "string"){
if(func2(data562) > 64){
const err1825 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/parentGroupId",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/parentGroupId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1825];
}
else {
vErrors.push(err1825);
}
errors++;
}
if(func2(data562) < 1){
const err1826 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/parentGroupId",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/parentGroupId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1826];
}
else {
vErrors.push(err1826);
}
errors++;
}
if(!pattern4.test(data562)){
const err1827 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/parentGroupId",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/parentGroupId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1827];
}
else {
vErrors.push(err1827);
}
errors++;
}
}
else {
const err1828 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/parentGroupId",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/parentGroupId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1828];
}
else {
vErrors.push(err1828);
}
errors++;
}
var _valid28 = _errs1259 === errors;
valid275 = valid275 || _valid28;
const _errs1261 = errors;
if(data562 !== null){
const err1829 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/parentGroupId",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/parentGroupId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1829];
}
else {
vErrors.push(err1829);
}
errors++;
}
var _valid28 = _errs1261 === errors;
valid275 = valid275 || _valid28;
if(!valid275){
const err1830 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/parentGroupId",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/parentGroupId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1830];
}
else {
vErrors.push(err1830);
}
errors++;
}
else {
errors = _errs1258;
if(vErrors !== null){
if(_errs1258){
vErrors.length = _errs1258;
}
else {
vErrors = null;
}
}
}
}
if(data559.visible !== undefined){
if(typeof data559.visible !== "boolean"){
const err1831 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/visible",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/visible/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1831];
}
else {
vErrors.push(err1831);
}
errors++;
}
}
if(data559.opacity !== undefined){
let data564 = data559.opacity;
if((typeof data564 == "number") && (isFinite(data564))){
if(data564 > 1 || isNaN(data564)){
const err1832 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/opacity",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/opacity/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err1832];
}
else {
vErrors.push(err1832);
}
errors++;
}
if(data564 < 0 || isNaN(data564)){
const err1833 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/opacity",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/opacity/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1833];
}
else {
vErrors.push(err1833);
}
errors++;
}
}
else {
const err1834 = {instancePath:instancePath+"/split/draft/groups/" + i78+"/opacity",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/opacity/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1834];
}
else {
vErrors.push(err1834);
}
errors++;
}
}
}
else {
const err1835 = {instancePath:instancePath+"/split/draft/groups/" + i78,schemaPath:"#/properties/split/properties/draft/properties/groups/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1835];
}
else {
vErrors.push(err1835);
}
errors++;
}
}
}
else {
const err1836 = {instancePath:instancePath+"/split/draft/groups",schemaPath:"#/properties/split/properties/draft/properties/groups/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1836];
}
else {
vErrors.push(err1836);
}
errors++;
}
}
if(data500.missingProperties !== undefined){
let data565 = data500.missingProperties;
if(Array.isArray(data565)){
if(data565.length > 32){
const err1837 = {instancePath:instancePath+"/split/draft/missingProperties",schemaPath:"#/properties/split/properties/draft/properties/missingProperties/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err1837];
}
else {
vErrors.push(err1837);
}
errors++;
}
const len75 = data565.length;
for(let i79=0; i79<len75; i79++){
let data566 = data565[i79];
if(typeof data566 === "string"){
if(func2(data566) > 128){
const err1838 = {instancePath:instancePath+"/split/draft/missingProperties/" + i79,schemaPath:"#/properties/split/properties/draft/properties/missingProperties/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1838];
}
else {
vErrors.push(err1838);
}
errors++;
}
if(func2(data566) < 1){
const err1839 = {instancePath:instancePath+"/split/draft/missingProperties/" + i79,schemaPath:"#/properties/split/properties/draft/properties/missingProperties/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1839];
}
else {
vErrors.push(err1839);
}
errors++;
}
}
else {
const err1840 = {instancePath:instancePath+"/split/draft/missingProperties/" + i79,schemaPath:"#/properties/split/properties/draft/properties/missingProperties/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1840];
}
else {
vErrors.push(err1840);
}
errors++;
}
}
}
else {
const err1841 = {instancePath:instancePath+"/split/draft/missingProperties",schemaPath:"#/properties/split/properties/draft/properties/missingProperties/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1841];
}
else {
vErrors.push(err1841);
}
errors++;
}
}
if(data500.omitted !== undefined){
let data567 = data500.omitted;
if(Array.isArray(data567)){
if(data567.length > 128){
const err1842 = {instancePath:instancePath+"/split/draft/omitted",schemaPath:"#/properties/split/properties/draft/properties/omitted/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err1842];
}
else {
vErrors.push(err1842);
}
errors++;
}
const len76 = data567.length;
for(let i80=0; i80<len76; i80++){
let data568 = data567[i80];
if(typeof data568 === "string"){
if(func2(data568) > 240){
const err1843 = {instancePath:instancePath+"/split/draft/omitted/" + i80,schemaPath:"#/properties/split/properties/draft/properties/omitted/items/maxLength",keyword:"maxLength",params:{limit: 240},message:"must NOT have more than 240 characters"};
if(vErrors === null){
vErrors = [err1843];
}
else {
vErrors.push(err1843);
}
errors++;
}
if(func2(data568) < 1){
const err1844 = {instancePath:instancePath+"/split/draft/omitted/" + i80,schemaPath:"#/properties/split/properties/draft/properties/omitted/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1844];
}
else {
vErrors.push(err1844);
}
errors++;
}
}
else {
const err1845 = {instancePath:instancePath+"/split/draft/omitted/" + i80,schemaPath:"#/properties/split/properties/draft/properties/omitted/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1845];
}
else {
vErrors.push(err1845);
}
errors++;
}
}
}
else {
const err1846 = {instancePath:instancePath+"/split/draft/omitted",schemaPath:"#/properties/split/properties/draft/properties/omitted/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1846];
}
else {
vErrors.push(err1846);
}
errors++;
}
}
}
else {
const err1847 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1847];
}
else {
vErrors.push(err1847);
}
errors++;
}
}
}
else {
const err1848 = {instancePath:instancePath+"/split",schemaPath:"#/properties/split/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1848];
}
else {
vErrors.push(err1848);
}
errors++;
}
}
}
else {
const err1849 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1849];
}
else {
vErrors.push(err1849);
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
