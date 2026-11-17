// Generated from schema.ts with locked Ajv; do not edit.
import ucs2lengthModule from "ajv/dist/runtime/ucs2length.js";
const ucs2length = ucs2lengthModule.default ?? ucs2lengthModule;
"use strict";
export const projectStructure = validate20;
const schema31 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://2dsketcher.local/schema/project-1.6","type":"object","additionalProperties":false,"properties":{"projectId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"schemaVersion":{"type":"object","additionalProperties":false,"properties":{"major":{"const":1},"minor":{"enum":[0,1,2,3,4,5,6]}},"required":["major","minor"]},"displayName":{"type":"string","minLength":1,"maxLength":120},"sourceType":{"enum":["parts","single-image","split-image"]},"createdAt":{"type":"string","minLength":1,"maxLength":24,"pattern":"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"},"modifiedAt":{"type":"string","minLength":1,"maxLength":24,"pattern":"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"savedRevision":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]},"canvas":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"inputAssetIds":{"type":"array","items":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"maxItems":1024,"uniqueItems":true},"assets":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"kind":{"enum":["original-image","part-texture","supplement-image","edited-image"]},"origin":{"enum":["imported","bundled","auto-preparation","auto-completion","manual-edit","generated"]},"parentAssetIds":{"type":"array","items":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"maxItems":1024,"uniqueItems":true},"storage":{"type":"object","additionalProperties":false,"properties":{"path":{"type":"string","minLength":1,"maxLength":240,"pattern":"^resources/"}},"required":["path"]},"fingerprint":{"type":"object","additionalProperties":false,"properties":{"sha256":{"type":"string","pattern":"^[a-f0-9]{64}$"},"bytes":{"type":"integer","minimum":1,"maximum":536870912}},"required":["sha256","bytes"]},"version":{"type":"integer","minimum":1,"maximum":9007199254740991},"mediaType":{"enum":["image/png","image/jpeg"]},"dimensions":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"sourceRegion":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},"sourceToEdited":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6},"colorSpace":{"enum":["srgb","unknown"]},"alphaMode":{"enum":["straight","premultiplied","opaque"]},"producer":{"type":"object","additionalProperties":false,"properties":{"name":{"type":"string","minLength":1,"maxLength":120},"version":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"}},"required":["name","version"]},"attribution":{"type":"object","additionalProperties":false,"properties":{"creator":{"type":"string","minLength":1,"maxLength":512},"source":{"type":"string","minLength":1,"maxLength":512},"usage":{"type":"string","minLength":1,"maxLength":1024},"status":{"enum":["verified","unverified"]}},"required":["creator","source","usage","status"]}},"required":["id","kind","origin","parentAssetIds","storage","fingerprint","version","mediaType","dimensions","sourceRegion","sourceToEdited","colorSpace","alphaMode","producer","attribution"]},"maxItems":1024},"parts":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"role":{"enum":["base","body","head","hair-front","hair-back","eye","mouth","accessory","custom"]},"side":{"enum":["character-left","character-right","center","none"]},"parentId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"groupId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"textures":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"state":{"type":"string","minLength":1,"maxLength":32,"pattern":"^[a-z][a-z0-9_-]*$"},"assetId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"assetVersion":{"type":"integer","minimum":1,"maximum":9007199254740991},"assetToLocal":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6}},"required":["state","assetId","assetVersion","assetToLocal"]},"maxItems":32},"localTransform":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6},"drawOrder":{"type":"integer","minimum":-100000,"maximum":100000},"visible":{"type":"boolean"},"opacity":{"type":"number","minimum":0,"maximum":1},"correctionOrigin":{"enum":["automatic","user-confirmed","manual"]},"limitations":{"type":"array","items":{"type":"string","minLength":1,"maxLength":512},"maxItems":64},"library":{"type":"object","additionalProperties":false,"properties":{"catalogId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"itemId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"version":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"},"key":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"}},"required":["catalogId","itemId","version","key"]},"color":{"type":"object","additionalProperties":false,"properties":{"hueDegrees":{"type":"number","minimum":-18,"maximum":18},"minimumHue":{"type":"number","minimum":0,"maximum":1},"maximumHue":{"type":"number","minimum":0,"maximum":1},"minimumSaturation":{"type":"number","minimum":0,"maximum":1}},"required":["hueDegrees","minimumHue","maximumHue","minimumSaturation"]}},"required":["id","displayName","role","side","parentId","groupId","textures","localTransform","drawOrder","visible","opacity","correctionOrigin","limitations"]},"maxItems":64},"groups":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"parentGroupId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"visible":{"type":"boolean"},"opacity":{"type":"number","minimum":0,"maximum":1}},"required":["id","displayName","parentGroupId","visible"]},"maxItems":128},"parameters":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"semantic":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[a-z][a-z0-9_-]*$"},"unit":{"enum":["ratio","degrees","custom"]},"min":{"type":"number"},"neutral":{"type":"number"},"max":{"type":"number"},"previewKey":{"anyOf":[{"enum":["eye_left","eye_right","mouth","head_yaw","head_roll"]},{"type":"null"}]}},"required":["id","displayName","semantic","unit","min","neutral","max","previewKey"]},"maxItems":128},"partBindings":{"type":"array","items":{"oneOf":[{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"partId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"kind":{"const":"state-blend"},"mapping":{"type":"object","additionalProperties":false,"properties":{"minimumState":{"type":"string","minLength":1,"maxLength":32},"maximumState":{"type":"string","minLength":1,"maxLength":32},"middleState":{"type":"string","minLength":1,"maxLength":32}},"required":["minimumState","maximumState"]}},"required":["id","parameterId","partId","kind","mapping"]},{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"partId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"kind":{"const":"transform"},"mapping":{"type":"object","additionalProperties":false,"properties":{"component":{"enum":["rotate-degrees","translate-x","translate-y","scale-x","scale-y"]},"outputRange":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2}},"required":["component","outputRange"]}},"required":["id","parameterId","partId","kind","mapping"]}]},"maxItems":256},"inputBindings":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"source":{"enum":["face","microphone","manual"]},"channel":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[a-z][a-z0-9_-]*$"},"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"inputRange":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"invert":{"type":"boolean"},"gain":{"type":"number","minimum":0,"maximum":10},"offset":{"type":"number"},"smoothingMs":{"type":"integer","minimum":0,"maximum":10000},"fallback":{"type":"object","additionalProperties":false,"properties":{"mode":{"enum":["neutral","hold","constant"]},"value":{"type":"number"},"returnMs":{"type":"integer","minimum":0,"maximum":10000}},"required":["mode","value","returnMs"]}},"required":["id","source","channel","parameterId","inputRange","invert","gain","offset","smoothingMs","fallback"]},"maxItems":128},"expressions":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"displayName":{"type":"string","minLength":1,"maxLength":120},"values":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"value":{"type":"number"},"locked":{"type":"boolean"}},"required":["parameterId","value","locked"]},"maxItems":128},"transitionMs":{"type":"integer","minimum":0,"maximum":10000},"release":{"enum":["live-input","neutral"]}},"required":["id","displayName","values","transitionMs","release"]},"maxItems":64},"runtimeProfile":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"mode":{"enum":["idle","camera","microphone","camera-microphone"]},"mirror":{"type":"boolean"},"fallbackExpressionId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]}},"required":["id","revision","mode","mirror","fallbackExpressionId"]},"broadcastProfiles":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"displayName":{"type":"string","minLength":1,"maxLength":120},"width":{"type":"integer","minimum":1,"maximum":8192},"height":{"type":"integer","minimum":1,"maximum":8192},"fps":{"type":"integer","minimum":1,"maximum":120},"transparent":{"type":"boolean"},"region":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},"fit":{"enum":["contain","cover"]}},"required":["id","revision","displayName","width","height","fps","transparent","region","fit"]},"maxItems":16},"exportProfiles":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"displayName":{"type":"string","minLength":1,"maxLength":120},"target":{"enum":["inochi2d"]},"targetVersion":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"},"format":{"enum":["inp"]},"converterVersion":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"},"parameterMap":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"targetName":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[a-zA-Z][a-zA-Z0-9_]*$"}},"required":["parameterId","targetName"]},"maxItems":128}},"required":["id","revision","displayName","target","targetVersion","format","converterVersion","parameterMap"]},"maxItems":16},"provenance":{"type":"object","additionalProperties":false,"properties":{"preparation":{"type":"string","minLength":1,"maxLength":512},"limitations":{"type":"array","items":{"type":"string","minLength":1,"maxLength":512},"maxItems":128}},"required":["preparation","limitations"]},"derivedProjects":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"projectId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"relation":{"enum":["3d","generated-variant"]}},"required":["projectId","relation"]},"maxItems":32},"motion":{"type":"object","additionalProperties":false,"properties":{"version":{"const":1},"faceWidth":{"type":"number","exclusiveMinimum":0},"maxRollDegrees":{"type":"number","minimum":0,"maximum":6},"secondary":{"const":"disabled"},"settings":{"type":"object","additionalProperties":false,"properties":{"strength":{"type":"number","minimum":0,"maximum":1},"smoothingMs":{"type":"integer","minimum":0,"maximum":1000},"pose":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"parameterId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"value":{"type":"number"}},"required":["parameterId","value"]},"maxItems":128}},"required":["strength","smoothingMs","pose"]},"meshes":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"partId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"pivot":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"yawParameterId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"rollParameterId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"curve":{"enum":["linear","smoothstep"]},"vertices":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"position":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"weight":{"type":"number","minimum":0,"maximum":1},"minimum":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"maximum":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2}},"required":["position","weight","minimum","maximum"]},"maxItems":1024,"minItems":3},"triangles":{"type":"array","items":{"type":"integer","minimum":0,"maximum":1023},"maxItems":6144,"minItems":3}},"required":["partId","pivot","yawParameterId","rollParameterId","curve","vertices","triangles"]},"maxItems":64}},"required":["version","faceWidth","maxRollDegrees","secondary","settings","meshes"]},"inputPreparation":{"type":"object","additionalProperties":false,"properties":{"version":{"const":1},"originalAssetId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},"normalizedAssetId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},"selectedAssetId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},"analysisAssetId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},"probe":{"type":"object","additionalProperties":false,"properties":{"detectorAvailable":{"type":"boolean"},"originalSize":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"size":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"orientation":{"type":"integer","minimum":1,"maximum":8},"iccConverted":{"type":"boolean"},"sourceToNormalized":{"type":"array","items":{"type":"number"},"minItems":6,"maxItems":6},"reduced":{"type":"boolean"},"estimatedWorkingBytes":{"type":"integer","minimum":0,"maximum":402653184},"format":{"enum":["png","jpeg"]},"hasAlpha":{"type":"boolean"},"faceCount":{"type":"integer","minimum":0,"maximum":8},"candidates":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"integer","minimum":0,"maximum":4096},"y":{"type":"integer","minimum":0,"maximum":4096},"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["x","y","width","height"]},"method":{"enum":["alpha","face","manual-required"]}},"required":["rect","method"]},"maxItems":8}},"required":["detectorAvailable","originalSize","size","orientation","iccConverted","sourceToNormalized","reduced","estimatedWorkingBytes","format","hasAlpha","faceCount","candidates"]},"selection":{"type":"object","additionalProperties":false,"properties":{"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"integer","minimum":0,"maximum":4096},"y":{"type":"integer","minimum":0,"maximum":4096},"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["x","y","width","height"]},"backgroundTolerance":{"anyOf":[{"type":"null"},{"type":"integer","minimum":0,"maximum":80}]},"masks":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"mode":{"enum":["erase","restore"]},"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"integer","minimum":0,"maximum":4096},"y":{"type":"integer","minimum":0,"maximum":4096},"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["x","y","width","height"]}},"required":["mode","rect"]},"maxItems":64},"occluded":{"type":"boolean"}},"required":["rect","backgroundTolerance","masks","occluded"]},"analysis":{"type":"object","additionalProperties":false,"properties":{"faces":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number","minimum":0,"maximum":1024},"y":{"type":"number","minimum":0,"maximum":1024},"width":{"type":"number","exclusiveMinimum":0,"maximum":1024},"height":{"type":"number","exclusiveMinimum":0,"maximum":1024}},"required":["x","y","width","height"]},"maxItems":8},"warnings":{"type":"array","items":{"enum":["DETECTOR_UNAVAILABLE","FACE_UNCONFIRMED","SMALL_FACE","EDGE_CROPPED_POSSIBLE","OCCLUDED_USER_REPORTED"]},"maxItems":8},"crop":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"integer","minimum":0,"maximum":4096},"y":{"type":"integer","minimum":0,"maximum":4096},"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["x","y","width","height"]},"analysisSize":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]}},"required":["faces","warnings","crop","analysisSize"]}},"required":["version","originalAssetId","normalizedAssetId","selectedAssetId","analysisAssetId","probe","selection","analysis"]},"assembly":{"type":"object","additionalProperties":false,"properties":{"catalogId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"version":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"},"linkedEyes":{"type":"boolean"},"choices":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"slot":{"enum":["face","hair","eyes","mouth","outfit","accessory"]},"itemId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"version":{"type":"string","minLength":1,"maxLength":32,"pattern":"^\\d+\\.\\d+\\.\\d+$"}},"required":["slot","itemId","version"]},"maxItems":6},"adjustments":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"key":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"x":{"type":"number","minimum":-6,"maximum":6},"y":{"type":"number","minimum":-6,"maximum":6},"scale":{"type":"number","minimum":0.95,"maximum":1.05},"rotation":{"type":"number","minimum":-2,"maximum":2},"hue":{"type":"number","minimum":-18,"maximum":18}},"required":["key","x","y","scale","rotation","hue"]},"maxItems":16},"warnings":{"type":"array","items":{"type":"string","minLength":1,"maxLength":512},"maxItems":16}},"required":["catalogId","version","linkedEyes","choices","adjustments","warnings"]},"structure":{"type":"object","additionalProperties":false,"properties":{"version":{"const":1},"inputAssetId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"inputRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"configurationVersion":{"enum":["1.0.0","1.1.0"]},"report":{"type":"object","additionalProperties":false,"properties":{"version":{"const":"1.0.0"},"method":{"const":"mediapipe-landmarks-pixel-evidence"},"status":{"enum":["ready","partial","failed"]},"face":{"anyOf":[{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},{"type":"null"}]},"regions":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"key":{"enum":["eye_left","eye_right","mouth"]},"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},"observed":{"type":"boolean"},"reason":{"type":"string","minLength":1,"maxLength":128},"estimatedStates":{"type":"array","items":{"enum":["open","closed"]},"maxItems":2},"enabled":{"type":"boolean"},"masks":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"mode":{"enum":["erase","restore"]},"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]}},"required":["mode","rect"]},"maxItems":32},"order":{"type":"integer","minimum":5,"maximum":20}},"required":["key","rect","observed","reason","estimatedStates"]},"maxItems":3},"unconfirmed":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128},"maxItems":16},"warnings":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128},"maxItems":16},"headGain":{"type":"number","minimum":0,"maximum":0.65},"maxRollDegrees":{"type":"number","minimum":0,"maximum":3.900000001},"completion":{"enum":["estimated","restrict"]},"files":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128,"pattern":"^structure-(base|eye_(left|right)-(open|closed)|mouth-(open|closed))\\.png$"},"maxItems":7}},"required":["version","method","status","face","regions","unconfirmed","warnings","headGain","maxRollDegrees","completion","files"]},"corrections":{"type":"object","additionalProperties":false,"properties":{"version":{"const":1},"automatic":{"type":"object","additionalProperties":false,"properties":{"version":{"const":"1.0.0"},"method":{"const":"mediapipe-landmarks-pixel-evidence"},"status":{"enum":["ready","partial","failed"]},"face":{"anyOf":[{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},{"type":"null"}]},"regions":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"key":{"enum":["eye_left","eye_right","mouth"]},"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},"observed":{"type":"boolean"},"reason":{"type":"string","minLength":1,"maxLength":128},"estimatedStates":{"type":"array","items":{"enum":["open","closed"]},"maxItems":2},"enabled":{"type":"boolean"},"masks":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"mode":{"enum":["erase","restore"]},"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]}},"required":["mode","rect"]},"maxItems":32},"order":{"type":"integer","minimum":5,"maximum":20}},"required":["key","rect","observed","reason","estimatedStates"]},"maxItems":3},"unconfirmed":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128},"maxItems":16},"warnings":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128},"maxItems":16},"headGain":{"type":"number","minimum":0,"maximum":0.65},"maxRollDegrees":{"type":"number","minimum":0,"maximum":3.900000001},"completion":{"enum":["estimated","restrict"]},"files":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128,"pattern":"^structure-(base|eye_(left|right)-(open|closed)|mouth-(open|closed))\\.png$"},"maxItems":7}},"required":["version","method","status","face","regions","unconfirmed","warnings","headGain","maxRollDegrees","completion","files"]},"entries":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"key":{"enum":["eye_left","eye_right","mouth"]},"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},"masks":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"mode":{"enum":["erase","restore"]},"rect":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]}},"required":["mode","rect"]},"maxItems":32},"order":{"type":"integer","minimum":5,"maximum":20},"decision":{"enum":["confirmed","skip","blocked"]},"occluded":{"type":"boolean"},"protect":{"type":"boolean"}},"required":["key","rect","masks","order","decision","occluded","protect"]},"maxItems":3},"invalidated":{"type":"object","additionalProperties":false,"properties":{"keys":{"type":"array","items":{"enum":["eye_left","eye_right","mouth"]},"maxItems":3},"checks":{"type":"array","items":{"enum":["preview","compatibility","export"]},"maxItems":3}},"required":["keys","checks"]}},"required":["version","automatic","entries","invalidated"]}},"required":["version","inputAssetId","inputRevision","configurationVersion","report"]},"split":{"type":"object","additionalProperties":false,"properties":{"version":{"const":1},"rigSignature":{"type":"string","pattern":"^[a-f0-9]{64}$"},"draft":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"sourceKind":{"enum":["folder","2dparts"]},"sourceHash":{"anyOf":[{"type":"string","pattern":"^[a-f0-9]{64}$"},{"type":"null"}]},"sourceManifest":{"anyOf":[{"type":"string","minLength":1,"maxLength":1048576},{"type":"null"}]},"canvas":{"type":"object","additionalProperties":false,"properties":{"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096}},"required":["width","height"]},"layout":{"enum":["manifest","common","cropped"]},"layoutConfirmed":{"type":"boolean"},"limitedAccepted":{"type":"boolean"},"omittedAccepted":{"type":"boolean"},"layers":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"name":{"type":"string","minLength":1,"maxLength":120},"origin":{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},"z":{"type":"integer","minimum":-100000,"maximum":100000},"role":{"enum":["base","body","head","hair-front","hair-back","eye","mouth","accessory","custom"]},"side":{"enum":["character-left","character-right","center","none"]},"visible":{"type":"boolean"},"opacity":{"type":"number","minimum":0,"maximum":1},"parentId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"groupId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"usage":{"enum":["primary","auxiliary","alternative"]},"variantOf":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"state":{"enum":["default","open","closed","middle"]},"positionConfirmed":{"type":"boolean"},"roleConfirmed":{"type":"boolean"},"sourceId":{"type":"string","minLength":1,"maxLength":128},"sourceName":{"type":"string","minLength":1,"maxLength":120},"sourcePath":{"type":"string","minLength":1,"maxLength":240},"sourceZ":{"anyOf":[{"type":"integer","minimum":-100000,"maximum":100000},{"type":"null"}]},"sourceOrigin":{"anyOf":[{"type":"array","items":{"type":"number"},"minItems":2,"maxItems":2},{"type":"null"}]},"originalAssetId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"imageAssetId":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"sourceHash":{"type":"string","pattern":"^[a-f0-9]{64}$"},"imageHash":{"type":"string","pattern":"^[a-f0-9]{64}$"},"image":{"type":"object","additionalProperties":false,"properties":{"key":{"type":"string","pattern":"^[a-f0-9]{64}$"},"width":{"type":"integer","minimum":1,"maximum":4096},"height":{"type":"integer","minimum":1,"maximum":4096},"bounds":{"anyOf":[{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","exclusiveMinimum":0},"height":{"type":"number","exclusiveMinimum":0}},"required":["x","y","width","height"]},{"type":"null"}]},"empty":{"type":"boolean"},"opaque":{"type":"boolean"},"iccConverted":{"type":"boolean"}},"required":["key","width","height","bounds","empty","opaque","iccConverted"]},"proposal":{"type":"object","additionalProperties":false,"properties":{"role":{"enum":["base","body","head","hair-front","hair-back","eye","mouth","accessory","custom"]},"side":{"enum":["character-left","character-right","center","none"]},"confidence":{"type":"number","minimum":0,"maximum":1},"reasons":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128},"maxItems":8}},"required":["role","side","confidence","reasons"]}},"required":["id","name","origin","z","role","side","visible","opacity","parentId","groupId","usage","variantOf","state","positionConfirmed","roleConfirmed","sourceId","sourceName","sourcePath","sourceZ","sourceOrigin","originalAssetId","imageAssetId","sourceHash","imageHash","image","proposal"]},"maxItems":64,"minItems":1},"groups":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},"name":{"type":"string","minLength":1,"maxLength":120},"parentGroupId":{"anyOf":[{"type":"string","minLength":1,"maxLength":64,"pattern":"^[A-Za-z0-9][A-Za-z0-9_-]*$"},{"type":"null"}]},"visible":{"type":"boolean"},"opacity":{"type":"number","minimum":0,"maximum":1}},"required":["id","name","parentGroupId","visible","opacity"]},"maxItems":128},"missingProperties":{"type":"array","items":{"type":"string","minLength":1,"maxLength":128},"maxItems":32},"omitted":{"type":"array","items":{"type":"string","minLength":1,"maxLength":240},"maxItems":128}},"required":["id","sourceKind","sourceHash","sourceManifest","canvas","layout","layoutConfirmed","limitedAccepted","omittedAccepted","layers","groups","missingProperties","omitted"]}},"required":["version","rigSignature","draft"]}},"required":["projectId","schemaVersion","displayName","sourceType","createdAt","modifiedAt","revision","savedRevision","canvas","inputAssetIds","assets","parts","groups","parameters","partBindings","inputBindings","expressions","runtimeProfile","broadcastProfiles","exportProfiles","provenance","derivedProjects"]};
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
const pattern60 = new RegExp("^structure-(base|eye_(left|right)-(open|closed)|mouth-(open|closed))\\.png$", "u");

function validate20(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="https://2dsketcher.local/schema/project-1.6" */;
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
if(!(((((((data3 === 0) || (data3 === 1)) || (data3 === 2)) || (data3 === 3)) || (data3 === 4)) || (data3 === 5)) || (data3 === 6))){
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
if(data.inputPreparation !== undefined){
let data217 = data.inputPreparation;
if(data217 && typeof data217 == "object" && !Array.isArray(data217)){
if(data217.version === undefined){
const err733 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err733];
}
else {
vErrors.push(err733);
}
errors++;
}
if(data217.originalAssetId === undefined){
const err734 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "originalAssetId"},message:"must have required property '"+"originalAssetId"+"'"};
if(vErrors === null){
vErrors = [err734];
}
else {
vErrors.push(err734);
}
errors++;
}
if(data217.normalizedAssetId === undefined){
const err735 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "normalizedAssetId"},message:"must have required property '"+"normalizedAssetId"+"'"};
if(vErrors === null){
vErrors = [err735];
}
else {
vErrors.push(err735);
}
errors++;
}
if(data217.selectedAssetId === undefined){
const err736 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "selectedAssetId"},message:"must have required property '"+"selectedAssetId"+"'"};
if(vErrors === null){
vErrors = [err736];
}
else {
vErrors.push(err736);
}
errors++;
}
if(data217.analysisAssetId === undefined){
const err737 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "analysisAssetId"},message:"must have required property '"+"analysisAssetId"+"'"};
if(vErrors === null){
vErrors = [err737];
}
else {
vErrors.push(err737);
}
errors++;
}
if(data217.probe === undefined){
const err738 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "probe"},message:"must have required property '"+"probe"+"'"};
if(vErrors === null){
vErrors = [err738];
}
else {
vErrors.push(err738);
}
errors++;
}
if(data217.selection === undefined){
const err739 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "selection"},message:"must have required property '"+"selection"+"'"};
if(vErrors === null){
vErrors = [err739];
}
else {
vErrors.push(err739);
}
errors++;
}
if(data217.analysis === undefined){
const err740 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/required",keyword:"required",params:{missingProperty: "analysis"},message:"must have required property '"+"analysis"+"'"};
if(vErrors === null){
vErrors = [err740];
}
else {
vErrors.push(err740);
}
errors++;
}
for(const key36 in data217){
if(!((((((((key36 === "version") || (key36 === "originalAssetId")) || (key36 === "normalizedAssetId")) || (key36 === "selectedAssetId")) || (key36 === "analysisAssetId")) || (key36 === "probe")) || (key36 === "selection")) || (key36 === "analysis"))){
const err741 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key36},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err741];
}
else {
vErrors.push(err741);
}
errors++;
}
}
if(data217.version !== undefined){
if(1 !== data217.version){
const err742 = {instancePath:instancePath+"/inputPreparation/version",schemaPath:"#/properties/inputPreparation/properties/version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err742];
}
else {
vErrors.push(err742);
}
errors++;
}
}
if(data217.originalAssetId !== undefined){
let data219 = data217.originalAssetId;
if(typeof data219 === "string"){
if(!pattern50.test(data219)){
const err743 = {instancePath:instancePath+"/inputPreparation/originalAssetId",schemaPath:"#/properties/inputPreparation/properties/originalAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"+"\""};
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
const err744 = {instancePath:instancePath+"/inputPreparation/originalAssetId",schemaPath:"#/properties/inputPreparation/properties/originalAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err744];
}
else {
vErrors.push(err744);
}
errors++;
}
}
if(data217.normalizedAssetId !== undefined){
let data220 = data217.normalizedAssetId;
if(typeof data220 === "string"){
if(!pattern50.test(data220)){
const err745 = {instancePath:instancePath+"/inputPreparation/normalizedAssetId",schemaPath:"#/properties/inputPreparation/properties/normalizedAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"+"\""};
if(vErrors === null){
vErrors = [err745];
}
else {
vErrors.push(err745);
}
errors++;
}
}
else {
const err746 = {instancePath:instancePath+"/inputPreparation/normalizedAssetId",schemaPath:"#/properties/inputPreparation/properties/normalizedAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err746];
}
else {
vErrors.push(err746);
}
errors++;
}
}
if(data217.selectedAssetId !== undefined){
let data221 = data217.selectedAssetId;
if(typeof data221 === "string"){
if(!pattern50.test(data221)){
const err747 = {instancePath:instancePath+"/inputPreparation/selectedAssetId",schemaPath:"#/properties/inputPreparation/properties/selectedAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"+"\""};
if(vErrors === null){
vErrors = [err747];
}
else {
vErrors.push(err747);
}
errors++;
}
}
else {
const err748 = {instancePath:instancePath+"/inputPreparation/selectedAssetId",schemaPath:"#/properties/inputPreparation/properties/selectedAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err748];
}
else {
vErrors.push(err748);
}
errors++;
}
}
if(data217.analysisAssetId !== undefined){
let data222 = data217.analysisAssetId;
if(typeof data222 === "string"){
if(!pattern50.test(data222)){
const err749 = {instancePath:instancePath+"/inputPreparation/analysisAssetId",schemaPath:"#/properties/inputPreparation/properties/analysisAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"+"\""};
if(vErrors === null){
vErrors = [err749];
}
else {
vErrors.push(err749);
}
errors++;
}
}
else {
const err750 = {instancePath:instancePath+"/inputPreparation/analysisAssetId",schemaPath:"#/properties/inputPreparation/properties/analysisAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err750];
}
else {
vErrors.push(err750);
}
errors++;
}
}
if(data217.probe !== undefined){
let data223 = data217.probe;
if(data223 && typeof data223 == "object" && !Array.isArray(data223)){
if(data223.detectorAvailable === undefined){
const err751 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "detectorAvailable"},message:"must have required property '"+"detectorAvailable"+"'"};
if(vErrors === null){
vErrors = [err751];
}
else {
vErrors.push(err751);
}
errors++;
}
if(data223.originalSize === undefined){
const err752 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "originalSize"},message:"must have required property '"+"originalSize"+"'"};
if(vErrors === null){
vErrors = [err752];
}
else {
vErrors.push(err752);
}
errors++;
}
if(data223.size === undefined){
const err753 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "size"},message:"must have required property '"+"size"+"'"};
if(vErrors === null){
vErrors = [err753];
}
else {
vErrors.push(err753);
}
errors++;
}
if(data223.orientation === undefined){
const err754 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "orientation"},message:"must have required property '"+"orientation"+"'"};
if(vErrors === null){
vErrors = [err754];
}
else {
vErrors.push(err754);
}
errors++;
}
if(data223.iccConverted === undefined){
const err755 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "iccConverted"},message:"must have required property '"+"iccConverted"+"'"};
if(vErrors === null){
vErrors = [err755];
}
else {
vErrors.push(err755);
}
errors++;
}
if(data223.sourceToNormalized === undefined){
const err756 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "sourceToNormalized"},message:"must have required property '"+"sourceToNormalized"+"'"};
if(vErrors === null){
vErrors = [err756];
}
else {
vErrors.push(err756);
}
errors++;
}
if(data223.reduced === undefined){
const err757 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "reduced"},message:"must have required property '"+"reduced"+"'"};
if(vErrors === null){
vErrors = [err757];
}
else {
vErrors.push(err757);
}
errors++;
}
if(data223.estimatedWorkingBytes === undefined){
const err758 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "estimatedWorkingBytes"},message:"must have required property '"+"estimatedWorkingBytes"+"'"};
if(vErrors === null){
vErrors = [err758];
}
else {
vErrors.push(err758);
}
errors++;
}
if(data223.format === undefined){
const err759 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "format"},message:"must have required property '"+"format"+"'"};
if(vErrors === null){
vErrors = [err759];
}
else {
vErrors.push(err759);
}
errors++;
}
if(data223.hasAlpha === undefined){
const err760 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "hasAlpha"},message:"must have required property '"+"hasAlpha"+"'"};
if(vErrors === null){
vErrors = [err760];
}
else {
vErrors.push(err760);
}
errors++;
}
if(data223.faceCount === undefined){
const err761 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "faceCount"},message:"must have required property '"+"faceCount"+"'"};
if(vErrors === null){
vErrors = [err761];
}
else {
vErrors.push(err761);
}
errors++;
}
if(data223.candidates === undefined){
const err762 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/required",keyword:"required",params:{missingProperty: "candidates"},message:"must have required property '"+"candidates"+"'"};
if(vErrors === null){
vErrors = [err762];
}
else {
vErrors.push(err762);
}
errors++;
}
for(const key37 in data223){
if(!(func1.call(schema31.properties.inputPreparation.properties.probe.properties, key37))){
const err763 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key37},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err763];
}
else {
vErrors.push(err763);
}
errors++;
}
}
if(data223.detectorAvailable !== undefined){
if(typeof data223.detectorAvailable !== "boolean"){
const err764 = {instancePath:instancePath+"/inputPreparation/probe/detectorAvailable",schemaPath:"#/properties/inputPreparation/properties/probe/properties/detectorAvailable/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err764];
}
else {
vErrors.push(err764);
}
errors++;
}
}
if(data223.originalSize !== undefined){
let data225 = data223.originalSize;
if(data225 && typeof data225 == "object" && !Array.isArray(data225)){
if(data225.width === undefined){
const err765 = {instancePath:instancePath+"/inputPreparation/probe/originalSize",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err765];
}
else {
vErrors.push(err765);
}
errors++;
}
if(data225.height === undefined){
const err766 = {instancePath:instancePath+"/inputPreparation/probe/originalSize",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err766];
}
else {
vErrors.push(err766);
}
errors++;
}
for(const key38 in data225){
if(!((key38 === "width") || (key38 === "height"))){
const err767 = {instancePath:instancePath+"/inputPreparation/probe/originalSize",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key38},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err767];
}
else {
vErrors.push(err767);
}
errors++;
}
}
if(data225.width !== undefined){
let data226 = data225.width;
if(!(((typeof data226 == "number") && (!(data226 % 1) && !isNaN(data226))) && (isFinite(data226)))){
const err768 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err769 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err769];
}
else {
vErrors.push(err769);
}
errors++;
}
if(data226 < 1 || isNaN(data226)){
const err770 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
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
if(data225.height !== undefined){
let data227 = data225.height;
if(!(((typeof data227 == "number") && (!(data227 % 1) && !isNaN(data227))) && (isFinite(data227)))){
const err771 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err771];
}
else {
vErrors.push(err771);
}
errors++;
}
if((typeof data227 == "number") && (isFinite(data227))){
if(data227 > 4096 || isNaN(data227)){
const err772 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err772];
}
else {
vErrors.push(err772);
}
errors++;
}
if(data227 < 1 || isNaN(data227)){
const err773 = {instancePath:instancePath+"/inputPreparation/probe/originalSize/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err773];
}
else {
vErrors.push(err773);
}
errors++;
}
}
}
}
else {
const err774 = {instancePath:instancePath+"/inputPreparation/probe/originalSize",schemaPath:"#/properties/inputPreparation/properties/probe/properties/originalSize/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err774];
}
else {
vErrors.push(err774);
}
errors++;
}
}
if(data223.size !== undefined){
let data228 = data223.size;
if(data228 && typeof data228 == "object" && !Array.isArray(data228)){
if(data228.width === undefined){
const err775 = {instancePath:instancePath+"/inputPreparation/probe/size",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err775];
}
else {
vErrors.push(err775);
}
errors++;
}
if(data228.height === undefined){
const err776 = {instancePath:instancePath+"/inputPreparation/probe/size",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err776];
}
else {
vErrors.push(err776);
}
errors++;
}
for(const key39 in data228){
if(!((key39 === "width") || (key39 === "height"))){
const err777 = {instancePath:instancePath+"/inputPreparation/probe/size",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key39},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err777];
}
else {
vErrors.push(err777);
}
errors++;
}
}
if(data228.width !== undefined){
let data229 = data228.width;
if(!(((typeof data229 == "number") && (!(data229 % 1) && !isNaN(data229))) && (isFinite(data229)))){
const err778 = {instancePath:instancePath+"/inputPreparation/probe/size/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err779 = {instancePath:instancePath+"/inputPreparation/probe/size/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err779];
}
else {
vErrors.push(err779);
}
errors++;
}
if(data229 < 1 || isNaN(data229)){
const err780 = {instancePath:instancePath+"/inputPreparation/probe/size/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
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
if(data228.height !== undefined){
let data230 = data228.height;
if(!(((typeof data230 == "number") && (!(data230 % 1) && !isNaN(data230))) && (isFinite(data230)))){
const err781 = {instancePath:instancePath+"/inputPreparation/probe/size/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err781];
}
else {
vErrors.push(err781);
}
errors++;
}
if((typeof data230 == "number") && (isFinite(data230))){
if(data230 > 4096 || isNaN(data230)){
const err782 = {instancePath:instancePath+"/inputPreparation/probe/size/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err782];
}
else {
vErrors.push(err782);
}
errors++;
}
if(data230 < 1 || isNaN(data230)){
const err783 = {instancePath:instancePath+"/inputPreparation/probe/size/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err783];
}
else {
vErrors.push(err783);
}
errors++;
}
}
}
}
else {
const err784 = {instancePath:instancePath+"/inputPreparation/probe/size",schemaPath:"#/properties/inputPreparation/properties/probe/properties/size/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err784];
}
else {
vErrors.push(err784);
}
errors++;
}
}
if(data223.orientation !== undefined){
let data231 = data223.orientation;
if(!(((typeof data231 == "number") && (!(data231 % 1) && !isNaN(data231))) && (isFinite(data231)))){
const err785 = {instancePath:instancePath+"/inputPreparation/probe/orientation",schemaPath:"#/properties/inputPreparation/properties/probe/properties/orientation/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err785];
}
else {
vErrors.push(err785);
}
errors++;
}
if((typeof data231 == "number") && (isFinite(data231))){
if(data231 > 8 || isNaN(data231)){
const err786 = {instancePath:instancePath+"/inputPreparation/probe/orientation",schemaPath:"#/properties/inputPreparation/properties/probe/properties/orientation/maximum",keyword:"maximum",params:{comparison: "<=", limit: 8},message:"must be <= 8"};
if(vErrors === null){
vErrors = [err786];
}
else {
vErrors.push(err786);
}
errors++;
}
if(data231 < 1 || isNaN(data231)){
const err787 = {instancePath:instancePath+"/inputPreparation/probe/orientation",schemaPath:"#/properties/inputPreparation/properties/probe/properties/orientation/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err787];
}
else {
vErrors.push(err787);
}
errors++;
}
}
}
if(data223.iccConverted !== undefined){
if(typeof data223.iccConverted !== "boolean"){
const err788 = {instancePath:instancePath+"/inputPreparation/probe/iccConverted",schemaPath:"#/properties/inputPreparation/properties/probe/properties/iccConverted/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err788];
}
else {
vErrors.push(err788);
}
errors++;
}
}
if(data223.sourceToNormalized !== undefined){
let data233 = data223.sourceToNormalized;
if(Array.isArray(data233)){
if(data233.length > 6){
const err789 = {instancePath:instancePath+"/inputPreparation/probe/sourceToNormalized",schemaPath:"#/properties/inputPreparation/properties/probe/properties/sourceToNormalized/maxItems",keyword:"maxItems",params:{limit: 6},message:"must NOT have more than 6 items"};
if(vErrors === null){
vErrors = [err789];
}
else {
vErrors.push(err789);
}
errors++;
}
if(data233.length < 6){
const err790 = {instancePath:instancePath+"/inputPreparation/probe/sourceToNormalized",schemaPath:"#/properties/inputPreparation/properties/probe/properties/sourceToNormalized/minItems",keyword:"minItems",params:{limit: 6},message:"must NOT have fewer than 6 items"};
if(vErrors === null){
vErrors = [err790];
}
else {
vErrors.push(err790);
}
errors++;
}
const len30 = data233.length;
for(let i32=0; i32<len30; i32++){
let data234 = data233[i32];
if(!((typeof data234 == "number") && (isFinite(data234)))){
const err791 = {instancePath:instancePath+"/inputPreparation/probe/sourceToNormalized/" + i32,schemaPath:"#/properties/inputPreparation/properties/probe/properties/sourceToNormalized/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err791];
}
else {
vErrors.push(err791);
}
errors++;
}
}
}
else {
const err792 = {instancePath:instancePath+"/inputPreparation/probe/sourceToNormalized",schemaPath:"#/properties/inputPreparation/properties/probe/properties/sourceToNormalized/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err792];
}
else {
vErrors.push(err792);
}
errors++;
}
}
if(data223.reduced !== undefined){
if(typeof data223.reduced !== "boolean"){
const err793 = {instancePath:instancePath+"/inputPreparation/probe/reduced",schemaPath:"#/properties/inputPreparation/properties/probe/properties/reduced/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err793];
}
else {
vErrors.push(err793);
}
errors++;
}
}
if(data223.estimatedWorkingBytes !== undefined){
let data236 = data223.estimatedWorkingBytes;
if(!(((typeof data236 == "number") && (!(data236 % 1) && !isNaN(data236))) && (isFinite(data236)))){
const err794 = {instancePath:instancePath+"/inputPreparation/probe/estimatedWorkingBytes",schemaPath:"#/properties/inputPreparation/properties/probe/properties/estimatedWorkingBytes/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err794];
}
else {
vErrors.push(err794);
}
errors++;
}
if((typeof data236 == "number") && (isFinite(data236))){
if(data236 > 402653184 || isNaN(data236)){
const err795 = {instancePath:instancePath+"/inputPreparation/probe/estimatedWorkingBytes",schemaPath:"#/properties/inputPreparation/properties/probe/properties/estimatedWorkingBytes/maximum",keyword:"maximum",params:{comparison: "<=", limit: 402653184},message:"must be <= 402653184"};
if(vErrors === null){
vErrors = [err795];
}
else {
vErrors.push(err795);
}
errors++;
}
if(data236 < 0 || isNaN(data236)){
const err796 = {instancePath:instancePath+"/inputPreparation/probe/estimatedWorkingBytes",schemaPath:"#/properties/inputPreparation/properties/probe/properties/estimatedWorkingBytes/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err796];
}
else {
vErrors.push(err796);
}
errors++;
}
}
}
if(data223.format !== undefined){
let data237 = data223.format;
if(!((data237 === "png") || (data237 === "jpeg"))){
const err797 = {instancePath:instancePath+"/inputPreparation/probe/format",schemaPath:"#/properties/inputPreparation/properties/probe/properties/format/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputPreparation.properties.probe.properties.format.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err797];
}
else {
vErrors.push(err797);
}
errors++;
}
}
if(data223.hasAlpha !== undefined){
if(typeof data223.hasAlpha !== "boolean"){
const err798 = {instancePath:instancePath+"/inputPreparation/probe/hasAlpha",schemaPath:"#/properties/inputPreparation/properties/probe/properties/hasAlpha/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err798];
}
else {
vErrors.push(err798);
}
errors++;
}
}
if(data223.faceCount !== undefined){
let data239 = data223.faceCount;
if(!(((typeof data239 == "number") && (!(data239 % 1) && !isNaN(data239))) && (isFinite(data239)))){
const err799 = {instancePath:instancePath+"/inputPreparation/probe/faceCount",schemaPath:"#/properties/inputPreparation/properties/probe/properties/faceCount/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err799];
}
else {
vErrors.push(err799);
}
errors++;
}
if((typeof data239 == "number") && (isFinite(data239))){
if(data239 > 8 || isNaN(data239)){
const err800 = {instancePath:instancePath+"/inputPreparation/probe/faceCount",schemaPath:"#/properties/inputPreparation/properties/probe/properties/faceCount/maximum",keyword:"maximum",params:{comparison: "<=", limit: 8},message:"must be <= 8"};
if(vErrors === null){
vErrors = [err800];
}
else {
vErrors.push(err800);
}
errors++;
}
if(data239 < 0 || isNaN(data239)){
const err801 = {instancePath:instancePath+"/inputPreparation/probe/faceCount",schemaPath:"#/properties/inputPreparation/properties/probe/properties/faceCount/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err801];
}
else {
vErrors.push(err801);
}
errors++;
}
}
}
if(data223.candidates !== undefined){
let data240 = data223.candidates;
if(Array.isArray(data240)){
if(data240.length > 8){
const err802 = {instancePath:instancePath+"/inputPreparation/probe/candidates",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/maxItems",keyword:"maxItems",params:{limit: 8},message:"must NOT have more than 8 items"};
if(vErrors === null){
vErrors = [err802];
}
else {
vErrors.push(err802);
}
errors++;
}
const len31 = data240.length;
for(let i33=0; i33<len31; i33++){
let data241 = data240[i33];
if(data241 && typeof data241 == "object" && !Array.isArray(data241)){
if(data241.rect === undefined){
const err803 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33,schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err803];
}
else {
vErrors.push(err803);
}
errors++;
}
if(data241.method === undefined){
const err804 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33,schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/required",keyword:"required",params:{missingProperty: "method"},message:"must have required property '"+"method"+"'"};
if(vErrors === null){
vErrors = [err804];
}
else {
vErrors.push(err804);
}
errors++;
}
for(const key40 in data241){
if(!((key40 === "rect") || (key40 === "method"))){
const err805 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33,schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key40},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err805];
}
else {
vErrors.push(err805);
}
errors++;
}
}
if(data241.rect !== undefined){
let data242 = data241.rect;
if(data242 && typeof data242 == "object" && !Array.isArray(data242)){
if(data242.x === undefined){
const err806 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err806];
}
else {
vErrors.push(err806);
}
errors++;
}
if(data242.y === undefined){
const err807 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err807];
}
else {
vErrors.push(err807);
}
errors++;
}
if(data242.width === undefined){
const err808 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err808];
}
else {
vErrors.push(err808);
}
errors++;
}
if(data242.height === undefined){
const err809 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err809];
}
else {
vErrors.push(err809);
}
errors++;
}
for(const key41 in data242){
if(!((((key41 === "x") || (key41 === "y")) || (key41 === "width")) || (key41 === "height"))){
const err810 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key41},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err810];
}
else {
vErrors.push(err810);
}
errors++;
}
}
if(data242.x !== undefined){
let data243 = data242.x;
if(!(((typeof data243 == "number") && (!(data243 % 1) && !isNaN(data243))) && (isFinite(data243)))){
const err811 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/x/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err812 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err812];
}
else {
vErrors.push(err812);
}
errors++;
}
if(data243 < 0 || isNaN(data243)){
const err813 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(data242.y !== undefined){
let data244 = data242.y;
if(!(((typeof data244 == "number") && (!(data244 % 1) && !isNaN(data244))) && (isFinite(data244)))){
const err814 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/y/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err815 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err815];
}
else {
vErrors.push(err815);
}
errors++;
}
if(data244 < 0 || isNaN(data244)){
const err816 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(data242.width !== undefined){
let data245 = data242.width;
if(!(((typeof data245 == "number") && (!(data245 % 1) && !isNaN(data245))) && (isFinite(data245)))){
const err817 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err818 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err818];
}
else {
vErrors.push(err818);
}
errors++;
}
if(data245 < 1 || isNaN(data245)){
const err819 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
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
if(data242.height !== undefined){
let data246 = data242.height;
if(!(((typeof data246 == "number") && (!(data246 % 1) && !isNaN(data246))) && (isFinite(data246)))){
const err820 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err820];
}
else {
vErrors.push(err820);
}
errors++;
}
if((typeof data246 == "number") && (isFinite(data246))){
if(data246 > 4096 || isNaN(data246)){
const err821 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err821];
}
else {
vErrors.push(err821);
}
errors++;
}
if(data246 < 1 || isNaN(data246)){
const err822 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
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
}
else {
const err823 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/rect",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err823];
}
else {
vErrors.push(err823);
}
errors++;
}
}
if(data241.method !== undefined){
let data247 = data241.method;
if(!(((data247 === "alpha") || (data247 === "face")) || (data247 === "manual-required"))){
const err824 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33+"/method",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/properties/method/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputPreparation.properties.probe.properties.candidates.items.properties.method.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err824];
}
else {
vErrors.push(err824);
}
errors++;
}
}
}
else {
const err825 = {instancePath:instancePath+"/inputPreparation/probe/candidates/" + i33,schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
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
else {
const err826 = {instancePath:instancePath+"/inputPreparation/probe/candidates",schemaPath:"#/properties/inputPreparation/properties/probe/properties/candidates/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err826];
}
else {
vErrors.push(err826);
}
errors++;
}
}
}
else {
const err827 = {instancePath:instancePath+"/inputPreparation/probe",schemaPath:"#/properties/inputPreparation/properties/probe/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err827];
}
else {
vErrors.push(err827);
}
errors++;
}
}
if(data217.selection !== undefined){
let data248 = data217.selection;
if(data248 && typeof data248 == "object" && !Array.isArray(data248)){
if(data248.rect === undefined){
const err828 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err828];
}
else {
vErrors.push(err828);
}
errors++;
}
if(data248.backgroundTolerance === undefined){
const err829 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/required",keyword:"required",params:{missingProperty: "backgroundTolerance"},message:"must have required property '"+"backgroundTolerance"+"'"};
if(vErrors === null){
vErrors = [err829];
}
else {
vErrors.push(err829);
}
errors++;
}
if(data248.masks === undefined){
const err830 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/required",keyword:"required",params:{missingProperty: "masks"},message:"must have required property '"+"masks"+"'"};
if(vErrors === null){
vErrors = [err830];
}
else {
vErrors.push(err830);
}
errors++;
}
if(data248.occluded === undefined){
const err831 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/required",keyword:"required",params:{missingProperty: "occluded"},message:"must have required property '"+"occluded"+"'"};
if(vErrors === null){
vErrors = [err831];
}
else {
vErrors.push(err831);
}
errors++;
}
for(const key42 in data248){
if(!((((key42 === "rect") || (key42 === "backgroundTolerance")) || (key42 === "masks")) || (key42 === "occluded"))){
const err832 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key42},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err832];
}
else {
vErrors.push(err832);
}
errors++;
}
}
if(data248.rect !== undefined){
let data249 = data248.rect;
if(data249 && typeof data249 == "object" && !Array.isArray(data249)){
if(data249.x === undefined){
const err833 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err833];
}
else {
vErrors.push(err833);
}
errors++;
}
if(data249.y === undefined){
const err834 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err834];
}
else {
vErrors.push(err834);
}
errors++;
}
if(data249.width === undefined){
const err835 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err835];
}
else {
vErrors.push(err835);
}
errors++;
}
if(data249.height === undefined){
const err836 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err836];
}
else {
vErrors.push(err836);
}
errors++;
}
for(const key43 in data249){
if(!((((key43 === "x") || (key43 === "y")) || (key43 === "width")) || (key43 === "height"))){
const err837 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key43},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err837];
}
else {
vErrors.push(err837);
}
errors++;
}
}
if(data249.x !== undefined){
let data250 = data249.x;
if(!(((typeof data250 == "number") && (!(data250 % 1) && !isNaN(data250))) && (isFinite(data250)))){
const err838 = {instancePath:instancePath+"/inputPreparation/selection/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/x/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err839 = {instancePath:instancePath+"/inputPreparation/selection/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err839];
}
else {
vErrors.push(err839);
}
errors++;
}
if(data250 < 0 || isNaN(data250)){
const err840 = {instancePath:instancePath+"/inputPreparation/selection/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(data249.y !== undefined){
let data251 = data249.y;
if(!(((typeof data251 == "number") && (!(data251 % 1) && !isNaN(data251))) && (isFinite(data251)))){
const err841 = {instancePath:instancePath+"/inputPreparation/selection/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/y/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err842 = {instancePath:instancePath+"/inputPreparation/selection/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err842];
}
else {
vErrors.push(err842);
}
errors++;
}
if(data251 < 0 || isNaN(data251)){
const err843 = {instancePath:instancePath+"/inputPreparation/selection/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(data249.width !== undefined){
let data252 = data249.width;
if(!(((typeof data252 == "number") && (!(data252 % 1) && !isNaN(data252))) && (isFinite(data252)))){
const err844 = {instancePath:instancePath+"/inputPreparation/selection/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err845 = {instancePath:instancePath+"/inputPreparation/selection/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err845];
}
else {
vErrors.push(err845);
}
errors++;
}
if(data252 < 1 || isNaN(data252)){
const err846 = {instancePath:instancePath+"/inputPreparation/selection/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
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
if(data249.height !== undefined){
let data253 = data249.height;
if(!(((typeof data253 == "number") && (!(data253 % 1) && !isNaN(data253))) && (isFinite(data253)))){
const err847 = {instancePath:instancePath+"/inputPreparation/selection/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err847];
}
else {
vErrors.push(err847);
}
errors++;
}
if((typeof data253 == "number") && (isFinite(data253))){
if(data253 > 4096 || isNaN(data253)){
const err848 = {instancePath:instancePath+"/inputPreparation/selection/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err848];
}
else {
vErrors.push(err848);
}
errors++;
}
if(data253 < 1 || isNaN(data253)){
const err849 = {instancePath:instancePath+"/inputPreparation/selection/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err849];
}
else {
vErrors.push(err849);
}
errors++;
}
}
}
}
else {
const err850 = {instancePath:instancePath+"/inputPreparation/selection/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err850];
}
else {
vErrors.push(err850);
}
errors++;
}
}
if(data248.backgroundTolerance !== undefined){
let data254 = data248.backgroundTolerance;
const _errs559 = errors;
let valid119 = false;
const _errs560 = errors;
if(data254 !== null){
const err851 = {instancePath:instancePath+"/inputPreparation/selection/backgroundTolerance",schemaPath:"#/properties/inputPreparation/properties/selection/properties/backgroundTolerance/anyOf/0/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err851];
}
else {
vErrors.push(err851);
}
errors++;
}
var _valid9 = _errs560 === errors;
valid119 = valid119 || _valid9;
const _errs562 = errors;
if(!(((typeof data254 == "number") && (!(data254 % 1) && !isNaN(data254))) && (isFinite(data254)))){
const err852 = {instancePath:instancePath+"/inputPreparation/selection/backgroundTolerance",schemaPath:"#/properties/inputPreparation/properties/selection/properties/backgroundTolerance/anyOf/1/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err852];
}
else {
vErrors.push(err852);
}
errors++;
}
if((typeof data254 == "number") && (isFinite(data254))){
if(data254 > 80 || isNaN(data254)){
const err853 = {instancePath:instancePath+"/inputPreparation/selection/backgroundTolerance",schemaPath:"#/properties/inputPreparation/properties/selection/properties/backgroundTolerance/anyOf/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 80},message:"must be <= 80"};
if(vErrors === null){
vErrors = [err853];
}
else {
vErrors.push(err853);
}
errors++;
}
if(data254 < 0 || isNaN(data254)){
const err854 = {instancePath:instancePath+"/inputPreparation/selection/backgroundTolerance",schemaPath:"#/properties/inputPreparation/properties/selection/properties/backgroundTolerance/anyOf/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err854];
}
else {
vErrors.push(err854);
}
errors++;
}
}
var _valid9 = _errs562 === errors;
valid119 = valid119 || _valid9;
if(!valid119){
const err855 = {instancePath:instancePath+"/inputPreparation/selection/backgroundTolerance",schemaPath:"#/properties/inputPreparation/properties/selection/properties/backgroundTolerance/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err855];
}
else {
vErrors.push(err855);
}
errors++;
}
else {
errors = _errs559;
if(vErrors !== null){
if(_errs559){
vErrors.length = _errs559;
}
else {
vErrors = null;
}
}
}
}
if(data248.masks !== undefined){
let data255 = data248.masks;
if(Array.isArray(data255)){
if(data255.length > 64){
const err856 = {instancePath:instancePath+"/inputPreparation/selection/masks",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err856];
}
else {
vErrors.push(err856);
}
errors++;
}
const len32 = data255.length;
for(let i34=0; i34<len32; i34++){
let data256 = data255[i34];
if(data256 && typeof data256 == "object" && !Array.isArray(data256)){
if(data256.mode === undefined){
const err857 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34,schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err857];
}
else {
vErrors.push(err857);
}
errors++;
}
if(data256.rect === undefined){
const err858 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34,schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err858];
}
else {
vErrors.push(err858);
}
errors++;
}
for(const key44 in data256){
if(!((key44 === "mode") || (key44 === "rect"))){
const err859 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34,schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key44},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err859];
}
else {
vErrors.push(err859);
}
errors++;
}
}
if(data256.mode !== undefined){
let data257 = data256.mode;
if(!((data257 === "erase") || (data257 === "restore"))){
const err860 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/mode",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputPreparation.properties.selection.properties.masks.items.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err860];
}
else {
vErrors.push(err860);
}
errors++;
}
}
if(data256.rect !== undefined){
let data258 = data256.rect;
if(data258 && typeof data258 == "object" && !Array.isArray(data258)){
if(data258.x === undefined){
const err861 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err861];
}
else {
vErrors.push(err861);
}
errors++;
}
if(data258.y === undefined){
const err862 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err862];
}
else {
vErrors.push(err862);
}
errors++;
}
if(data258.width === undefined){
const err863 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err863];
}
else {
vErrors.push(err863);
}
errors++;
}
if(data258.height === undefined){
const err864 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err864];
}
else {
vErrors.push(err864);
}
errors++;
}
for(const key45 in data258){
if(!((((key45 === "x") || (key45 === "y")) || (key45 === "width")) || (key45 === "height"))){
const err865 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key45},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err865];
}
else {
vErrors.push(err865);
}
errors++;
}
}
if(data258.x !== undefined){
let data259 = data258.x;
if(!(((typeof data259 == "number") && (!(data259 % 1) && !isNaN(data259))) && (isFinite(data259)))){
const err866 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/x/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err867 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err867];
}
else {
vErrors.push(err867);
}
errors++;
}
if(data259 < 0 || isNaN(data259)){
const err868 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/x",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(data258.y !== undefined){
let data260 = data258.y;
if(!(((typeof data260 == "number") && (!(data260 % 1) && !isNaN(data260))) && (isFinite(data260)))){
const err869 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/y/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err870 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err870];
}
else {
vErrors.push(err870);
}
errors++;
}
if(data260 < 0 || isNaN(data260)){
const err871 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/y",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(data258.width !== undefined){
let data261 = data258.width;
if(!(((typeof data261 == "number") && (!(data261 % 1) && !isNaN(data261))) && (isFinite(data261)))){
const err872 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err873 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err873];
}
else {
vErrors.push(err873);
}
errors++;
}
if(data261 < 1 || isNaN(data261)){
const err874 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/width",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
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
if(data258.height !== undefined){
let data262 = data258.height;
if(!(((typeof data262 == "number") && (!(data262 % 1) && !isNaN(data262))) && (isFinite(data262)))){
const err875 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err875];
}
else {
vErrors.push(err875);
}
errors++;
}
if((typeof data262 == "number") && (isFinite(data262))){
if(data262 > 4096 || isNaN(data262)){
const err876 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err876];
}
else {
vErrors.push(err876);
}
errors++;
}
if(data262 < 1 || isNaN(data262)){
const err877 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect/height",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err877];
}
else {
vErrors.push(err877);
}
errors++;
}
}
}
}
else {
const err878 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34+"/rect",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
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
const err879 = {instancePath:instancePath+"/inputPreparation/selection/masks/" + i34,schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
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
else {
const err880 = {instancePath:instancePath+"/inputPreparation/selection/masks",schemaPath:"#/properties/inputPreparation/properties/selection/properties/masks/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err880];
}
else {
vErrors.push(err880);
}
errors++;
}
}
if(data248.occluded !== undefined){
if(typeof data248.occluded !== "boolean"){
const err881 = {instancePath:instancePath+"/inputPreparation/selection/occluded",schemaPath:"#/properties/inputPreparation/properties/selection/properties/occluded/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err881];
}
else {
vErrors.push(err881);
}
errors++;
}
}
}
else {
const err882 = {instancePath:instancePath+"/inputPreparation/selection",schemaPath:"#/properties/inputPreparation/properties/selection/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err882];
}
else {
vErrors.push(err882);
}
errors++;
}
}
if(data217.analysis !== undefined){
let data264 = data217.analysis;
if(data264 && typeof data264 == "object" && !Array.isArray(data264)){
if(data264.faces === undefined){
const err883 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/required",keyword:"required",params:{missingProperty: "faces"},message:"must have required property '"+"faces"+"'"};
if(vErrors === null){
vErrors = [err883];
}
else {
vErrors.push(err883);
}
errors++;
}
if(data264.warnings === undefined){
const err884 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/required",keyword:"required",params:{missingProperty: "warnings"},message:"must have required property '"+"warnings"+"'"};
if(vErrors === null){
vErrors = [err884];
}
else {
vErrors.push(err884);
}
errors++;
}
if(data264.crop === undefined){
const err885 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/required",keyword:"required",params:{missingProperty: "crop"},message:"must have required property '"+"crop"+"'"};
if(vErrors === null){
vErrors = [err885];
}
else {
vErrors.push(err885);
}
errors++;
}
if(data264.analysisSize === undefined){
const err886 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/required",keyword:"required",params:{missingProperty: "analysisSize"},message:"must have required property '"+"analysisSize"+"'"};
if(vErrors === null){
vErrors = [err886];
}
else {
vErrors.push(err886);
}
errors++;
}
for(const key46 in data264){
if(!((((key46 === "faces") || (key46 === "warnings")) || (key46 === "crop")) || (key46 === "analysisSize"))){
const err887 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key46},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err887];
}
else {
vErrors.push(err887);
}
errors++;
}
}
if(data264.faces !== undefined){
let data265 = data264.faces;
if(Array.isArray(data265)){
if(data265.length > 8){
const err888 = {instancePath:instancePath+"/inputPreparation/analysis/faces",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/maxItems",keyword:"maxItems",params:{limit: 8},message:"must NOT have more than 8 items"};
if(vErrors === null){
vErrors = [err888];
}
else {
vErrors.push(err888);
}
errors++;
}
const len33 = data265.length;
for(let i35=0; i35<len33; i35++){
let data266 = data265[i35];
if(data266 && typeof data266 == "object" && !Array.isArray(data266)){
if(data266.x === undefined){
const err889 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err889];
}
else {
vErrors.push(err889);
}
errors++;
}
if(data266.y === undefined){
const err890 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err890];
}
else {
vErrors.push(err890);
}
errors++;
}
if(data266.width === undefined){
const err891 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err891];
}
else {
vErrors.push(err891);
}
errors++;
}
if(data266.height === undefined){
const err892 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err892];
}
else {
vErrors.push(err892);
}
errors++;
}
for(const key47 in data266){
if(!((((key47 === "x") || (key47 === "y")) || (key47 === "width")) || (key47 === "height"))){
const err893 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key47},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err893];
}
else {
vErrors.push(err893);
}
errors++;
}
}
if(data266.x !== undefined){
let data267 = data266.x;
if((typeof data267 == "number") && (isFinite(data267))){
if(data267 > 1024 || isNaN(data267)){
const err894 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1024},message:"must be <= 1024"};
if(vErrors === null){
vErrors = [err894];
}
else {
vErrors.push(err894);
}
errors++;
}
if(data267 < 0 || isNaN(data267)){
const err895 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err896 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err896];
}
else {
vErrors.push(err896);
}
errors++;
}
}
if(data266.y !== undefined){
let data268 = data266.y;
if((typeof data268 == "number") && (isFinite(data268))){
if(data268 > 1024 || isNaN(data268)){
const err897 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1024},message:"must be <= 1024"};
if(vErrors === null){
vErrors = [err897];
}
else {
vErrors.push(err897);
}
errors++;
}
if(data268 < 0 || isNaN(data268)){
const err898 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err899 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err899];
}
else {
vErrors.push(err899);
}
errors++;
}
}
if(data266.width !== undefined){
let data269 = data266.width;
if((typeof data269 == "number") && (isFinite(data269))){
if(data269 > 1024 || isNaN(data269)){
const err900 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1024},message:"must be <= 1024"};
if(vErrors === null){
vErrors = [err900];
}
else {
vErrors.push(err900);
}
errors++;
}
if(data269 <= 0 || isNaN(data269)){
const err901 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
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
const err902 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err902];
}
else {
vErrors.push(err902);
}
errors++;
}
}
if(data266.height !== undefined){
let data270 = data266.height;
if((typeof data270 == "number") && (isFinite(data270))){
if(data270 > 1024 || isNaN(data270)){
const err903 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1024},message:"must be <= 1024"};
if(vErrors === null){
vErrors = [err903];
}
else {
vErrors.push(err903);
}
errors++;
}
if(data270 <= 0 || isNaN(data270)){
const err904 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
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
const err905 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35+"/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err905];
}
else {
vErrors.push(err905);
}
errors++;
}
}
}
else {
const err906 = {instancePath:instancePath+"/inputPreparation/analysis/faces/" + i35,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
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
const err907 = {instancePath:instancePath+"/inputPreparation/analysis/faces",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/faces/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err907];
}
else {
vErrors.push(err907);
}
errors++;
}
}
if(data264.warnings !== undefined){
let data271 = data264.warnings;
if(Array.isArray(data271)){
if(data271.length > 8){
const err908 = {instancePath:instancePath+"/inputPreparation/analysis/warnings",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/warnings/maxItems",keyword:"maxItems",params:{limit: 8},message:"must NOT have more than 8 items"};
if(vErrors === null){
vErrors = [err908];
}
else {
vErrors.push(err908);
}
errors++;
}
const len34 = data271.length;
for(let i36=0; i36<len34; i36++){
let data272 = data271[i36];
if(!(((((data272 === "DETECTOR_UNAVAILABLE") || (data272 === "FACE_UNCONFIRMED")) || (data272 === "SMALL_FACE")) || (data272 === "EDGE_CROPPED_POSSIBLE")) || (data272 === "OCCLUDED_USER_REPORTED"))){
const err909 = {instancePath:instancePath+"/inputPreparation/analysis/warnings/" + i36,schemaPath:"#/properties/inputPreparation/properties/analysis/properties/warnings/items/enum",keyword:"enum",params:{allowedValues: schema31.properties.inputPreparation.properties.analysis.properties.warnings.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err909];
}
else {
vErrors.push(err909);
}
errors++;
}
}
}
else {
const err910 = {instancePath:instancePath+"/inputPreparation/analysis/warnings",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/warnings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err910];
}
else {
vErrors.push(err910);
}
errors++;
}
}
if(data264.crop !== undefined){
let data273 = data264.crop;
if(data273 && typeof data273 == "object" && !Array.isArray(data273)){
if(data273.x === undefined){
const err911 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err911];
}
else {
vErrors.push(err911);
}
errors++;
}
if(data273.y === undefined){
const err912 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err912];
}
else {
vErrors.push(err912);
}
errors++;
}
if(data273.width === undefined){
const err913 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err913];
}
else {
vErrors.push(err913);
}
errors++;
}
if(data273.height === undefined){
const err914 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err914];
}
else {
vErrors.push(err914);
}
errors++;
}
for(const key48 in data273){
if(!((((key48 === "x") || (key48 === "y")) || (key48 === "width")) || (key48 === "height"))){
const err915 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key48},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err915];
}
else {
vErrors.push(err915);
}
errors++;
}
}
if(data273.x !== undefined){
let data274 = data273.x;
if(!(((typeof data274 == "number") && (!(data274 % 1) && !isNaN(data274))) && (isFinite(data274)))){
const err916 = {instancePath:instancePath+"/inputPreparation/analysis/crop/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/x/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err917 = {instancePath:instancePath+"/inputPreparation/analysis/crop/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err917];
}
else {
vErrors.push(err917);
}
errors++;
}
if(data274 < 0 || isNaN(data274)){
const err918 = {instancePath:instancePath+"/inputPreparation/analysis/crop/x",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(data273.y !== undefined){
let data275 = data273.y;
if(!(((typeof data275 == "number") && (!(data275 % 1) && !isNaN(data275))) && (isFinite(data275)))){
const err919 = {instancePath:instancePath+"/inputPreparation/analysis/crop/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/y/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err920 = {instancePath:instancePath+"/inputPreparation/analysis/crop/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err920];
}
else {
vErrors.push(err920);
}
errors++;
}
if(data275 < 0 || isNaN(data275)){
const err921 = {instancePath:instancePath+"/inputPreparation/analysis/crop/y",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(data273.width !== undefined){
let data276 = data273.width;
if(!(((typeof data276 == "number") && (!(data276 % 1) && !isNaN(data276))) && (isFinite(data276)))){
const err922 = {instancePath:instancePath+"/inputPreparation/analysis/crop/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err923 = {instancePath:instancePath+"/inputPreparation/analysis/crop/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err923];
}
else {
vErrors.push(err923);
}
errors++;
}
if(data276 < 1 || isNaN(data276)){
const err924 = {instancePath:instancePath+"/inputPreparation/analysis/crop/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
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
if(data273.height !== undefined){
let data277 = data273.height;
if(!(((typeof data277 == "number") && (!(data277 % 1) && !isNaN(data277))) && (isFinite(data277)))){
const err925 = {instancePath:instancePath+"/inputPreparation/analysis/crop/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err925];
}
else {
vErrors.push(err925);
}
errors++;
}
if((typeof data277 == "number") && (isFinite(data277))){
if(data277 > 4096 || isNaN(data277)){
const err926 = {instancePath:instancePath+"/inputPreparation/analysis/crop/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err926];
}
else {
vErrors.push(err926);
}
errors++;
}
if(data277 < 1 || isNaN(data277)){
const err927 = {instancePath:instancePath+"/inputPreparation/analysis/crop/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err927];
}
else {
vErrors.push(err927);
}
errors++;
}
}
}
}
else {
const err928 = {instancePath:instancePath+"/inputPreparation/analysis/crop",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/crop/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err928];
}
else {
vErrors.push(err928);
}
errors++;
}
}
if(data264.analysisSize !== undefined){
let data278 = data264.analysisSize;
if(data278 && typeof data278 == "object" && !Array.isArray(data278)){
if(data278.width === undefined){
const err929 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err929];
}
else {
vErrors.push(err929);
}
errors++;
}
if(data278.height === undefined){
const err930 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err930];
}
else {
vErrors.push(err930);
}
errors++;
}
for(const key49 in data278){
if(!((key49 === "width") || (key49 === "height"))){
const err931 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key49},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err931];
}
else {
vErrors.push(err931);
}
errors++;
}
}
if(data278.width !== undefined){
let data279 = data278.width;
if(!(((typeof data279 == "number") && (!(data279 % 1) && !isNaN(data279))) && (isFinite(data279)))){
const err932 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err933 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err933];
}
else {
vErrors.push(err933);
}
errors++;
}
if(data279 < 1 || isNaN(data279)){
const err934 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/width",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
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
if(data278.height !== undefined){
let data280 = data278.height;
if(!(((typeof data280 == "number") && (!(data280 % 1) && !isNaN(data280))) && (isFinite(data280)))){
const err935 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err935];
}
else {
vErrors.push(err935);
}
errors++;
}
if((typeof data280 == "number") && (isFinite(data280))){
if(data280 > 4096 || isNaN(data280)){
const err936 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err936];
}
else {
vErrors.push(err936);
}
errors++;
}
if(data280 < 1 || isNaN(data280)){
const err937 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize/height",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
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
const err938 = {instancePath:instancePath+"/inputPreparation/analysis/analysisSize",schemaPath:"#/properties/inputPreparation/properties/analysis/properties/analysisSize/type",keyword:"type",params:{type: "object"},message:"must be object"};
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
const err939 = {instancePath:instancePath+"/inputPreparation/analysis",schemaPath:"#/properties/inputPreparation/properties/analysis/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err939];
}
else {
vErrors.push(err939);
}
errors++;
}
}
}
else {
const err940 = {instancePath:instancePath+"/inputPreparation",schemaPath:"#/properties/inputPreparation/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err940];
}
else {
vErrors.push(err940);
}
errors++;
}
}
if(data.assembly !== undefined){
let data281 = data.assembly;
if(data281 && typeof data281 == "object" && !Array.isArray(data281)){
if(data281.catalogId === undefined){
const err941 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "catalogId"},message:"must have required property '"+"catalogId"+"'"};
if(vErrors === null){
vErrors = [err941];
}
else {
vErrors.push(err941);
}
errors++;
}
if(data281.version === undefined){
const err942 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err942];
}
else {
vErrors.push(err942);
}
errors++;
}
if(data281.linkedEyes === undefined){
const err943 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "linkedEyes"},message:"must have required property '"+"linkedEyes"+"'"};
if(vErrors === null){
vErrors = [err943];
}
else {
vErrors.push(err943);
}
errors++;
}
if(data281.choices === undefined){
const err944 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "choices"},message:"must have required property '"+"choices"+"'"};
if(vErrors === null){
vErrors = [err944];
}
else {
vErrors.push(err944);
}
errors++;
}
if(data281.adjustments === undefined){
const err945 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "adjustments"},message:"must have required property '"+"adjustments"+"'"};
if(vErrors === null){
vErrors = [err945];
}
else {
vErrors.push(err945);
}
errors++;
}
if(data281.warnings === undefined){
const err946 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/required",keyword:"required",params:{missingProperty: "warnings"},message:"must have required property '"+"warnings"+"'"};
if(vErrors === null){
vErrors = [err946];
}
else {
vErrors.push(err946);
}
errors++;
}
for(const key50 in data281){
if(!((((((key50 === "catalogId") || (key50 === "version")) || (key50 === "linkedEyes")) || (key50 === "choices")) || (key50 === "adjustments")) || (key50 === "warnings"))){
const err947 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key50},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err947];
}
else {
vErrors.push(err947);
}
errors++;
}
}
if(data281.catalogId !== undefined){
let data282 = data281.catalogId;
if(typeof data282 === "string"){
if(func2(data282) > 64){
const err948 = {instancePath:instancePath+"/assembly/catalogId",schemaPath:"#/properties/assembly/properties/catalogId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err948];
}
else {
vErrors.push(err948);
}
errors++;
}
if(func2(data282) < 1){
const err949 = {instancePath:instancePath+"/assembly/catalogId",schemaPath:"#/properties/assembly/properties/catalogId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err949];
}
else {
vErrors.push(err949);
}
errors++;
}
if(!pattern4.test(data282)){
const err950 = {instancePath:instancePath+"/assembly/catalogId",schemaPath:"#/properties/assembly/properties/catalogId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err950];
}
else {
vErrors.push(err950);
}
errors++;
}
}
else {
const err951 = {instancePath:instancePath+"/assembly/catalogId",schemaPath:"#/properties/assembly/properties/catalogId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err951];
}
else {
vErrors.push(err951);
}
errors++;
}
}
if(data281.version !== undefined){
let data283 = data281.version;
if(typeof data283 === "string"){
if(func2(data283) > 32){
const err952 = {instancePath:instancePath+"/assembly/version",schemaPath:"#/properties/assembly/properties/version/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err952];
}
else {
vErrors.push(err952);
}
errors++;
}
if(func2(data283) < 1){
const err953 = {instancePath:instancePath+"/assembly/version",schemaPath:"#/properties/assembly/properties/version/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err953];
}
else {
vErrors.push(err953);
}
errors++;
}
if(!pattern12.test(data283)){
const err954 = {instancePath:instancePath+"/assembly/version",schemaPath:"#/properties/assembly/properties/version/pattern",keyword:"pattern",params:{pattern: "^\\d+\\.\\d+\\.\\d+$"},message:"must match pattern \""+"^\\d+\\.\\d+\\.\\d+$"+"\""};
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
const err955 = {instancePath:instancePath+"/assembly/version",schemaPath:"#/properties/assembly/properties/version/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err955];
}
else {
vErrors.push(err955);
}
errors++;
}
}
if(data281.linkedEyes !== undefined){
if(typeof data281.linkedEyes !== "boolean"){
const err956 = {instancePath:instancePath+"/assembly/linkedEyes",schemaPath:"#/properties/assembly/properties/linkedEyes/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err956];
}
else {
vErrors.push(err956);
}
errors++;
}
}
if(data281.choices !== undefined){
let data285 = data281.choices;
if(Array.isArray(data285)){
if(data285.length > 6){
const err957 = {instancePath:instancePath+"/assembly/choices",schemaPath:"#/properties/assembly/properties/choices/maxItems",keyword:"maxItems",params:{limit: 6},message:"must NOT have more than 6 items"};
if(vErrors === null){
vErrors = [err957];
}
else {
vErrors.push(err957);
}
errors++;
}
const len35 = data285.length;
for(let i37=0; i37<len35; i37++){
let data286 = data285[i37];
if(data286 && typeof data286 == "object" && !Array.isArray(data286)){
if(data286.slot === undefined){
const err958 = {instancePath:instancePath+"/assembly/choices/" + i37,schemaPath:"#/properties/assembly/properties/choices/items/required",keyword:"required",params:{missingProperty: "slot"},message:"must have required property '"+"slot"+"'"};
if(vErrors === null){
vErrors = [err958];
}
else {
vErrors.push(err958);
}
errors++;
}
if(data286.itemId === undefined){
const err959 = {instancePath:instancePath+"/assembly/choices/" + i37,schemaPath:"#/properties/assembly/properties/choices/items/required",keyword:"required",params:{missingProperty: "itemId"},message:"must have required property '"+"itemId"+"'"};
if(vErrors === null){
vErrors = [err959];
}
else {
vErrors.push(err959);
}
errors++;
}
if(data286.version === undefined){
const err960 = {instancePath:instancePath+"/assembly/choices/" + i37,schemaPath:"#/properties/assembly/properties/choices/items/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err960];
}
else {
vErrors.push(err960);
}
errors++;
}
for(const key51 in data286){
if(!(((key51 === "slot") || (key51 === "itemId")) || (key51 === "version"))){
const err961 = {instancePath:instancePath+"/assembly/choices/" + i37,schemaPath:"#/properties/assembly/properties/choices/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key51},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err961];
}
else {
vErrors.push(err961);
}
errors++;
}
}
if(data286.slot !== undefined){
let data287 = data286.slot;
if(!((((((data287 === "face") || (data287 === "hair")) || (data287 === "eyes")) || (data287 === "mouth")) || (data287 === "outfit")) || (data287 === "accessory"))){
const err962 = {instancePath:instancePath+"/assembly/choices/" + i37+"/slot",schemaPath:"#/properties/assembly/properties/choices/items/properties/slot/enum",keyword:"enum",params:{allowedValues: schema31.properties.assembly.properties.choices.items.properties.slot.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err962];
}
else {
vErrors.push(err962);
}
errors++;
}
}
if(data286.itemId !== undefined){
let data288 = data286.itemId;
const _errs636 = errors;
let valid136 = false;
const _errs637 = errors;
if(typeof data288 === "string"){
if(func2(data288) > 64){
const err963 = {instancePath:instancePath+"/assembly/choices/" + i37+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err963];
}
else {
vErrors.push(err963);
}
errors++;
}
if(func2(data288) < 1){
const err964 = {instancePath:instancePath+"/assembly/choices/" + i37+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err964];
}
else {
vErrors.push(err964);
}
errors++;
}
if(!pattern4.test(data288)){
const err965 = {instancePath:instancePath+"/assembly/choices/" + i37+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err965];
}
else {
vErrors.push(err965);
}
errors++;
}
}
else {
const err966 = {instancePath:instancePath+"/assembly/choices/" + i37+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err966];
}
else {
vErrors.push(err966);
}
errors++;
}
var _valid10 = _errs637 === errors;
valid136 = valid136 || _valid10;
const _errs639 = errors;
if(data288 !== null){
const err967 = {instancePath:instancePath+"/assembly/choices/" + i37+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err967];
}
else {
vErrors.push(err967);
}
errors++;
}
var _valid10 = _errs639 === errors;
valid136 = valid136 || _valid10;
if(!valid136){
const err968 = {instancePath:instancePath+"/assembly/choices/" + i37+"/itemId",schemaPath:"#/properties/assembly/properties/choices/items/properties/itemId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err968];
}
else {
vErrors.push(err968);
}
errors++;
}
else {
errors = _errs636;
if(vErrors !== null){
if(_errs636){
vErrors.length = _errs636;
}
else {
vErrors = null;
}
}
}
}
if(data286.version !== undefined){
let data289 = data286.version;
if(typeof data289 === "string"){
if(func2(data289) > 32){
const err969 = {instancePath:instancePath+"/assembly/choices/" + i37+"/version",schemaPath:"#/properties/assembly/properties/choices/items/properties/version/maxLength",keyword:"maxLength",params:{limit: 32},message:"must NOT have more than 32 characters"};
if(vErrors === null){
vErrors = [err969];
}
else {
vErrors.push(err969);
}
errors++;
}
if(func2(data289) < 1){
const err970 = {instancePath:instancePath+"/assembly/choices/" + i37+"/version",schemaPath:"#/properties/assembly/properties/choices/items/properties/version/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err970];
}
else {
vErrors.push(err970);
}
errors++;
}
if(!pattern12.test(data289)){
const err971 = {instancePath:instancePath+"/assembly/choices/" + i37+"/version",schemaPath:"#/properties/assembly/properties/choices/items/properties/version/pattern",keyword:"pattern",params:{pattern: "^\\d+\\.\\d+\\.\\d+$"},message:"must match pattern \""+"^\\d+\\.\\d+\\.\\d+$"+"\""};
if(vErrors === null){
vErrors = [err971];
}
else {
vErrors.push(err971);
}
errors++;
}
}
else {
const err972 = {instancePath:instancePath+"/assembly/choices/" + i37+"/version",schemaPath:"#/properties/assembly/properties/choices/items/properties/version/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err972];
}
else {
vErrors.push(err972);
}
errors++;
}
}
}
else {
const err973 = {instancePath:instancePath+"/assembly/choices/" + i37,schemaPath:"#/properties/assembly/properties/choices/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err973];
}
else {
vErrors.push(err973);
}
errors++;
}
}
}
else {
const err974 = {instancePath:instancePath+"/assembly/choices",schemaPath:"#/properties/assembly/properties/choices/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err974];
}
else {
vErrors.push(err974);
}
errors++;
}
}
if(data281.adjustments !== undefined){
let data290 = data281.adjustments;
if(Array.isArray(data290)){
if(data290.length > 16){
const err975 = {instancePath:instancePath+"/assembly/adjustments",schemaPath:"#/properties/assembly/properties/adjustments/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err975];
}
else {
vErrors.push(err975);
}
errors++;
}
const len36 = data290.length;
for(let i38=0; i38<len36; i38++){
let data291 = data290[i38];
if(data291 && typeof data291 == "object" && !Array.isArray(data291)){
if(data291.key === undefined){
const err976 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "key"},message:"must have required property '"+"key"+"'"};
if(vErrors === null){
vErrors = [err976];
}
else {
vErrors.push(err976);
}
errors++;
}
if(data291.x === undefined){
const err977 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err977];
}
else {
vErrors.push(err977);
}
errors++;
}
if(data291.y === undefined){
const err978 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err978];
}
else {
vErrors.push(err978);
}
errors++;
}
if(data291.scale === undefined){
const err979 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "scale"},message:"must have required property '"+"scale"+"'"};
if(vErrors === null){
vErrors = [err979];
}
else {
vErrors.push(err979);
}
errors++;
}
if(data291.rotation === undefined){
const err980 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "rotation"},message:"must have required property '"+"rotation"+"'"};
if(vErrors === null){
vErrors = [err980];
}
else {
vErrors.push(err980);
}
errors++;
}
if(data291.hue === undefined){
const err981 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/required",keyword:"required",params:{missingProperty: "hue"},message:"must have required property '"+"hue"+"'"};
if(vErrors === null){
vErrors = [err981];
}
else {
vErrors.push(err981);
}
errors++;
}
for(const key52 in data291){
if(!((((((key52 === "key") || (key52 === "x")) || (key52 === "y")) || (key52 === "scale")) || (key52 === "rotation")) || (key52 === "hue"))){
const err982 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key52},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err982];
}
else {
vErrors.push(err982);
}
errors++;
}
}
if(data291.key !== undefined){
let data292 = data291.key;
if(typeof data292 === "string"){
if(func2(data292) > 64){
const err983 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/key",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/key/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err983];
}
else {
vErrors.push(err983);
}
errors++;
}
if(func2(data292) < 1){
const err984 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/key",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/key/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err984];
}
else {
vErrors.push(err984);
}
errors++;
}
if(!pattern4.test(data292)){
const err985 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/key",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/key/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
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
const err986 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/key",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/key/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err986];
}
else {
vErrors.push(err986);
}
errors++;
}
}
if(data291.x !== undefined){
let data293 = data291.x;
if((typeof data293 == "number") && (isFinite(data293))){
if(data293 > 6 || isNaN(data293)){
const err987 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/x",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/x/maximum",keyword:"maximum",params:{comparison: "<=", limit: 6},message:"must be <= 6"};
if(vErrors === null){
vErrors = [err987];
}
else {
vErrors.push(err987);
}
errors++;
}
if(data293 < -6 || isNaN(data293)){
const err988 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/x",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/x/minimum",keyword:"minimum",params:{comparison: ">=", limit: -6},message:"must be >= -6"};
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
const err989 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/x",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err989];
}
else {
vErrors.push(err989);
}
errors++;
}
}
if(data291.y !== undefined){
let data294 = data291.y;
if((typeof data294 == "number") && (isFinite(data294))){
if(data294 > 6 || isNaN(data294)){
const err990 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/y",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/y/maximum",keyword:"maximum",params:{comparison: "<=", limit: 6},message:"must be <= 6"};
if(vErrors === null){
vErrors = [err990];
}
else {
vErrors.push(err990);
}
errors++;
}
if(data294 < -6 || isNaN(data294)){
const err991 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/y",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/y/minimum",keyword:"minimum",params:{comparison: ">=", limit: -6},message:"must be >= -6"};
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
const err992 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/y",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err992];
}
else {
vErrors.push(err992);
}
errors++;
}
}
if(data291.scale !== undefined){
let data295 = data291.scale;
if((typeof data295 == "number") && (isFinite(data295))){
if(data295 > 1.05 || isNaN(data295)){
const err993 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/scale",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/scale/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1.05},message:"must be <= 1.05"};
if(vErrors === null){
vErrors = [err993];
}
else {
vErrors.push(err993);
}
errors++;
}
if(data295 < 0.95 || isNaN(data295)){
const err994 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/scale",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/scale/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0.95},message:"must be >= 0.95"};
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
const err995 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/scale",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/scale/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err995];
}
else {
vErrors.push(err995);
}
errors++;
}
}
if(data291.rotation !== undefined){
let data296 = data291.rotation;
if((typeof data296 == "number") && (isFinite(data296))){
if(data296 > 2 || isNaN(data296)){
const err996 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/rotation",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/rotation/maximum",keyword:"maximum",params:{comparison: "<=", limit: 2},message:"must be <= 2"};
if(vErrors === null){
vErrors = [err996];
}
else {
vErrors.push(err996);
}
errors++;
}
if(data296 < -2 || isNaN(data296)){
const err997 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/rotation",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/rotation/minimum",keyword:"minimum",params:{comparison: ">=", limit: -2},message:"must be >= -2"};
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
const err998 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/rotation",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/rotation/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err998];
}
else {
vErrors.push(err998);
}
errors++;
}
}
if(data291.hue !== undefined){
let data297 = data291.hue;
if((typeof data297 == "number") && (isFinite(data297))){
if(data297 > 18 || isNaN(data297)){
const err999 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/hue",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/hue/maximum",keyword:"maximum",params:{comparison: "<=", limit: 18},message:"must be <= 18"};
if(vErrors === null){
vErrors = [err999];
}
else {
vErrors.push(err999);
}
errors++;
}
if(data297 < -18 || isNaN(data297)){
const err1000 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/hue",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/hue/minimum",keyword:"minimum",params:{comparison: ">=", limit: -18},message:"must be >= -18"};
if(vErrors === null){
vErrors = [err1000];
}
else {
vErrors.push(err1000);
}
errors++;
}
}
else {
const err1001 = {instancePath:instancePath+"/assembly/adjustments/" + i38+"/hue",schemaPath:"#/properties/assembly/properties/adjustments/items/properties/hue/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1001];
}
else {
vErrors.push(err1001);
}
errors++;
}
}
}
else {
const err1002 = {instancePath:instancePath+"/assembly/adjustments/" + i38,schemaPath:"#/properties/assembly/properties/adjustments/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1002];
}
else {
vErrors.push(err1002);
}
errors++;
}
}
}
else {
const err1003 = {instancePath:instancePath+"/assembly/adjustments",schemaPath:"#/properties/assembly/properties/adjustments/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1003];
}
else {
vErrors.push(err1003);
}
errors++;
}
}
if(data281.warnings !== undefined){
let data298 = data281.warnings;
if(Array.isArray(data298)){
if(data298.length > 16){
const err1004 = {instancePath:instancePath+"/assembly/warnings",schemaPath:"#/properties/assembly/properties/warnings/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err1004];
}
else {
vErrors.push(err1004);
}
errors++;
}
const len37 = data298.length;
for(let i39=0; i39<len37; i39++){
let data299 = data298[i39];
if(typeof data299 === "string"){
if(func2(data299) > 512){
const err1005 = {instancePath:instancePath+"/assembly/warnings/" + i39,schemaPath:"#/properties/assembly/properties/warnings/items/maxLength",keyword:"maxLength",params:{limit: 512},message:"must NOT have more than 512 characters"};
if(vErrors === null){
vErrors = [err1005];
}
else {
vErrors.push(err1005);
}
errors++;
}
if(func2(data299) < 1){
const err1006 = {instancePath:instancePath+"/assembly/warnings/" + i39,schemaPath:"#/properties/assembly/properties/warnings/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1006];
}
else {
vErrors.push(err1006);
}
errors++;
}
}
else {
const err1007 = {instancePath:instancePath+"/assembly/warnings/" + i39,schemaPath:"#/properties/assembly/properties/warnings/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1007];
}
else {
vErrors.push(err1007);
}
errors++;
}
}
}
else {
const err1008 = {instancePath:instancePath+"/assembly/warnings",schemaPath:"#/properties/assembly/properties/warnings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1008];
}
else {
vErrors.push(err1008);
}
errors++;
}
}
}
else {
const err1009 = {instancePath:instancePath+"/assembly",schemaPath:"#/properties/assembly/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1009];
}
else {
vErrors.push(err1009);
}
errors++;
}
}
if(data.structure !== undefined){
let data300 = data.structure;
if(data300 && typeof data300 == "object" && !Array.isArray(data300)){
if(data300.version === undefined){
const err1010 = {instancePath:instancePath+"/structure",schemaPath:"#/properties/structure/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err1010];
}
else {
vErrors.push(err1010);
}
errors++;
}
if(data300.inputAssetId === undefined){
const err1011 = {instancePath:instancePath+"/structure",schemaPath:"#/properties/structure/required",keyword:"required",params:{missingProperty: "inputAssetId"},message:"must have required property '"+"inputAssetId"+"'"};
if(vErrors === null){
vErrors = [err1011];
}
else {
vErrors.push(err1011);
}
errors++;
}
if(data300.inputRevision === undefined){
const err1012 = {instancePath:instancePath+"/structure",schemaPath:"#/properties/structure/required",keyword:"required",params:{missingProperty: "inputRevision"},message:"must have required property '"+"inputRevision"+"'"};
if(vErrors === null){
vErrors = [err1012];
}
else {
vErrors.push(err1012);
}
errors++;
}
if(data300.configurationVersion === undefined){
const err1013 = {instancePath:instancePath+"/structure",schemaPath:"#/properties/structure/required",keyword:"required",params:{missingProperty: "configurationVersion"},message:"must have required property '"+"configurationVersion"+"'"};
if(vErrors === null){
vErrors = [err1013];
}
else {
vErrors.push(err1013);
}
errors++;
}
if(data300.report === undefined){
const err1014 = {instancePath:instancePath+"/structure",schemaPath:"#/properties/structure/required",keyword:"required",params:{missingProperty: "report"},message:"must have required property '"+"report"+"'"};
if(vErrors === null){
vErrors = [err1014];
}
else {
vErrors.push(err1014);
}
errors++;
}
for(const key53 in data300){
if(!((((((key53 === "version") || (key53 === "inputAssetId")) || (key53 === "inputRevision")) || (key53 === "configurationVersion")) || (key53 === "report")) || (key53 === "corrections"))){
const err1015 = {instancePath:instancePath+"/structure",schemaPath:"#/properties/structure/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key53},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1015];
}
else {
vErrors.push(err1015);
}
errors++;
}
}
if(data300.version !== undefined){
if(1 !== data300.version){
const err1016 = {instancePath:instancePath+"/structure/version",schemaPath:"#/properties/structure/properties/version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err1016];
}
else {
vErrors.push(err1016);
}
errors++;
}
}
if(data300.inputAssetId !== undefined){
let data302 = data300.inputAssetId;
if(typeof data302 === "string"){
if(func2(data302) > 64){
const err1017 = {instancePath:instancePath+"/structure/inputAssetId",schemaPath:"#/properties/structure/properties/inputAssetId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1017];
}
else {
vErrors.push(err1017);
}
errors++;
}
if(func2(data302) < 1){
const err1018 = {instancePath:instancePath+"/structure/inputAssetId",schemaPath:"#/properties/structure/properties/inputAssetId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1018];
}
else {
vErrors.push(err1018);
}
errors++;
}
if(!pattern4.test(data302)){
const err1019 = {instancePath:instancePath+"/structure/inputAssetId",schemaPath:"#/properties/structure/properties/inputAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1019];
}
else {
vErrors.push(err1019);
}
errors++;
}
}
else {
const err1020 = {instancePath:instancePath+"/structure/inputAssetId",schemaPath:"#/properties/structure/properties/inputAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1020];
}
else {
vErrors.push(err1020);
}
errors++;
}
}
if(data300.inputRevision !== undefined){
let data303 = data300.inputRevision;
if(!(((typeof data303 == "number") && (!(data303 % 1) && !isNaN(data303))) && (isFinite(data303)))){
const err1021 = {instancePath:instancePath+"/structure/inputRevision",schemaPath:"#/properties/structure/properties/inputRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1021];
}
else {
vErrors.push(err1021);
}
errors++;
}
if((typeof data303 == "number") && (isFinite(data303))){
if(data303 > 9007199254740991 || isNaN(data303)){
const err1022 = {instancePath:instancePath+"/structure/inputRevision",schemaPath:"#/properties/structure/properties/inputRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err1022];
}
else {
vErrors.push(err1022);
}
errors++;
}
if(data303 < 0 || isNaN(data303)){
const err1023 = {instancePath:instancePath+"/structure/inputRevision",schemaPath:"#/properties/structure/properties/inputRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1023];
}
else {
vErrors.push(err1023);
}
errors++;
}
}
}
if(data300.configurationVersion !== undefined){
let data304 = data300.configurationVersion;
if(!((data304 === "1.0.0") || (data304 === "1.1.0"))){
const err1024 = {instancePath:instancePath+"/structure/configurationVersion",schemaPath:"#/properties/structure/properties/configurationVersion/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.configurationVersion.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1024];
}
else {
vErrors.push(err1024);
}
errors++;
}
}
if(data300.report !== undefined){
let data305 = data300.report;
if(data305 && typeof data305 == "object" && !Array.isArray(data305)){
if(data305.version === undefined){
const err1025 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err1025];
}
else {
vErrors.push(err1025);
}
errors++;
}
if(data305.method === undefined){
const err1026 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "method"},message:"must have required property '"+"method"+"'"};
if(vErrors === null){
vErrors = [err1026];
}
else {
vErrors.push(err1026);
}
errors++;
}
if(data305.status === undefined){
const err1027 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err1027];
}
else {
vErrors.push(err1027);
}
errors++;
}
if(data305.face === undefined){
const err1028 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "face"},message:"must have required property '"+"face"+"'"};
if(vErrors === null){
vErrors = [err1028];
}
else {
vErrors.push(err1028);
}
errors++;
}
if(data305.regions === undefined){
const err1029 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "regions"},message:"must have required property '"+"regions"+"'"};
if(vErrors === null){
vErrors = [err1029];
}
else {
vErrors.push(err1029);
}
errors++;
}
if(data305.unconfirmed === undefined){
const err1030 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "unconfirmed"},message:"must have required property '"+"unconfirmed"+"'"};
if(vErrors === null){
vErrors = [err1030];
}
else {
vErrors.push(err1030);
}
errors++;
}
if(data305.warnings === undefined){
const err1031 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "warnings"},message:"must have required property '"+"warnings"+"'"};
if(vErrors === null){
vErrors = [err1031];
}
else {
vErrors.push(err1031);
}
errors++;
}
if(data305.headGain === undefined){
const err1032 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "headGain"},message:"must have required property '"+"headGain"+"'"};
if(vErrors === null){
vErrors = [err1032];
}
else {
vErrors.push(err1032);
}
errors++;
}
if(data305.maxRollDegrees === undefined){
const err1033 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "maxRollDegrees"},message:"must have required property '"+"maxRollDegrees"+"'"};
if(vErrors === null){
vErrors = [err1033];
}
else {
vErrors.push(err1033);
}
errors++;
}
if(data305.completion === undefined){
const err1034 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "completion"},message:"must have required property '"+"completion"+"'"};
if(vErrors === null){
vErrors = [err1034];
}
else {
vErrors.push(err1034);
}
errors++;
}
if(data305.files === undefined){
const err1035 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/required",keyword:"required",params:{missingProperty: "files"},message:"must have required property '"+"files"+"'"};
if(vErrors === null){
vErrors = [err1035];
}
else {
vErrors.push(err1035);
}
errors++;
}
for(const key54 in data305){
if(!(func1.call(schema31.properties.structure.properties.report.properties, key54))){
const err1036 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key54},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1036];
}
else {
vErrors.push(err1036);
}
errors++;
}
}
if(data305.version !== undefined){
if("1.0.0" !== data305.version){
const err1037 = {instancePath:instancePath+"/structure/report/version",schemaPath:"#/properties/structure/properties/report/properties/version/const",keyword:"const",params:{allowedValue: "1.0.0"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err1037];
}
else {
vErrors.push(err1037);
}
errors++;
}
}
if(data305.method !== undefined){
if("mediapipe-landmarks-pixel-evidence" !== data305.method){
const err1038 = {instancePath:instancePath+"/structure/report/method",schemaPath:"#/properties/structure/properties/report/properties/method/const",keyword:"const",params:{allowedValue: "mediapipe-landmarks-pixel-evidence"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err1038];
}
else {
vErrors.push(err1038);
}
errors++;
}
}
if(data305.status !== undefined){
let data308 = data305.status;
if(!(((data308 === "ready") || (data308 === "partial")) || (data308 === "failed"))){
const err1039 = {instancePath:instancePath+"/structure/report/status",schemaPath:"#/properties/structure/properties/report/properties/status/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.report.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1039];
}
else {
vErrors.push(err1039);
}
errors++;
}
}
if(data305.face !== undefined){
let data309 = data305.face;
const _errs680 = errors;
let valid144 = false;
const _errs681 = errors;
if(data309 && typeof data309 == "object" && !Array.isArray(data309)){
if(data309.x === undefined){
const err1040 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1040];
}
else {
vErrors.push(err1040);
}
errors++;
}
if(data309.y === undefined){
const err1041 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1041];
}
else {
vErrors.push(err1041);
}
errors++;
}
if(data309.width === undefined){
const err1042 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1042];
}
else {
vErrors.push(err1042);
}
errors++;
}
if(data309.height === undefined){
const err1043 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1043];
}
else {
vErrors.push(err1043);
}
errors++;
}
for(const key55 in data309){
if(!((((key55 === "x") || (key55 === "y")) || (key55 === "width")) || (key55 === "height"))){
const err1044 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key55},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1044];
}
else {
vErrors.push(err1044);
}
errors++;
}
}
if(data309.x !== undefined){
let data310 = data309.x;
if(!((typeof data310 == "number") && (isFinite(data310)))){
const err1045 = {instancePath:instancePath+"/structure/report/face/x",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1045];
}
else {
vErrors.push(err1045);
}
errors++;
}
}
if(data309.y !== undefined){
let data311 = data309.y;
if(!((typeof data311 == "number") && (isFinite(data311)))){
const err1046 = {instancePath:instancePath+"/structure/report/face/y",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1046];
}
else {
vErrors.push(err1046);
}
errors++;
}
}
if(data309.width !== undefined){
let data312 = data309.width;
if((typeof data312 == "number") && (isFinite(data312))){
if(data312 <= 0 || isNaN(data312)){
const err1047 = {instancePath:instancePath+"/structure/report/face/width",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1047];
}
else {
vErrors.push(err1047);
}
errors++;
}
}
else {
const err1048 = {instancePath:instancePath+"/structure/report/face/width",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1048];
}
else {
vErrors.push(err1048);
}
errors++;
}
}
if(data309.height !== undefined){
let data313 = data309.height;
if((typeof data313 == "number") && (isFinite(data313))){
if(data313 <= 0 || isNaN(data313)){
const err1049 = {instancePath:instancePath+"/structure/report/face/height",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1049];
}
else {
vErrors.push(err1049);
}
errors++;
}
}
else {
const err1050 = {instancePath:instancePath+"/structure/report/face/height",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1050];
}
else {
vErrors.push(err1050);
}
errors++;
}
}
}
else {
const err1051 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1051];
}
else {
vErrors.push(err1051);
}
errors++;
}
var _valid11 = _errs681 === errors;
valid144 = valid144 || _valid11;
const _errs692 = errors;
if(data309 !== null){
const err1052 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1052];
}
else {
vErrors.push(err1052);
}
errors++;
}
var _valid11 = _errs692 === errors;
valid144 = valid144 || _valid11;
if(!valid144){
const err1053 = {instancePath:instancePath+"/structure/report/face",schemaPath:"#/properties/structure/properties/report/properties/face/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1053];
}
else {
vErrors.push(err1053);
}
errors++;
}
else {
errors = _errs680;
if(vErrors !== null){
if(_errs680){
vErrors.length = _errs680;
}
else {
vErrors = null;
}
}
}
}
if(data305.regions !== undefined){
let data314 = data305.regions;
if(Array.isArray(data314)){
if(data314.length > 3){
const err1054 = {instancePath:instancePath+"/structure/report/regions",schemaPath:"#/properties/structure/properties/report/properties/regions/maxItems",keyword:"maxItems",params:{limit: 3},message:"must NOT have more than 3 items"};
if(vErrors === null){
vErrors = [err1054];
}
else {
vErrors.push(err1054);
}
errors++;
}
const len38 = data314.length;
for(let i40=0; i40<len38; i40++){
let data315 = data314[i40];
if(data315 && typeof data315 == "object" && !Array.isArray(data315)){
if(data315.key === undefined){
const err1055 = {instancePath:instancePath+"/structure/report/regions/" + i40,schemaPath:"#/properties/structure/properties/report/properties/regions/items/required",keyword:"required",params:{missingProperty: "key"},message:"must have required property '"+"key"+"'"};
if(vErrors === null){
vErrors = [err1055];
}
else {
vErrors.push(err1055);
}
errors++;
}
if(data315.rect === undefined){
const err1056 = {instancePath:instancePath+"/structure/report/regions/" + i40,schemaPath:"#/properties/structure/properties/report/properties/regions/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err1056];
}
else {
vErrors.push(err1056);
}
errors++;
}
if(data315.observed === undefined){
const err1057 = {instancePath:instancePath+"/structure/report/regions/" + i40,schemaPath:"#/properties/structure/properties/report/properties/regions/items/required",keyword:"required",params:{missingProperty: "observed"},message:"must have required property '"+"observed"+"'"};
if(vErrors === null){
vErrors = [err1057];
}
else {
vErrors.push(err1057);
}
errors++;
}
if(data315.reason === undefined){
const err1058 = {instancePath:instancePath+"/structure/report/regions/" + i40,schemaPath:"#/properties/structure/properties/report/properties/regions/items/required",keyword:"required",params:{missingProperty: "reason"},message:"must have required property '"+"reason"+"'"};
if(vErrors === null){
vErrors = [err1058];
}
else {
vErrors.push(err1058);
}
errors++;
}
if(data315.estimatedStates === undefined){
const err1059 = {instancePath:instancePath+"/structure/report/regions/" + i40,schemaPath:"#/properties/structure/properties/report/properties/regions/items/required",keyword:"required",params:{missingProperty: "estimatedStates"},message:"must have required property '"+"estimatedStates"+"'"};
if(vErrors === null){
vErrors = [err1059];
}
else {
vErrors.push(err1059);
}
errors++;
}
for(const key56 in data315){
if(!((((((((key56 === "key") || (key56 === "rect")) || (key56 === "observed")) || (key56 === "reason")) || (key56 === "estimatedStates")) || (key56 === "enabled")) || (key56 === "masks")) || (key56 === "order"))){
const err1060 = {instancePath:instancePath+"/structure/report/regions/" + i40,schemaPath:"#/properties/structure/properties/report/properties/regions/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key56},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1060];
}
else {
vErrors.push(err1060);
}
errors++;
}
}
if(data315.key !== undefined){
let data316 = data315.key;
if(!(((data316 === "eye_left") || (data316 === "eye_right")) || (data316 === "mouth"))){
const err1061 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/key",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/key/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.report.properties.regions.items.properties.key.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1061];
}
else {
vErrors.push(err1061);
}
errors++;
}
}
if(data315.rect !== undefined){
let data317 = data315.rect;
if(data317 && typeof data317 == "object" && !Array.isArray(data317)){
if(data317.x === undefined){
const err1062 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1062];
}
else {
vErrors.push(err1062);
}
errors++;
}
if(data317.y === undefined){
const err1063 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1063];
}
else {
vErrors.push(err1063);
}
errors++;
}
if(data317.width === undefined){
const err1064 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1064];
}
else {
vErrors.push(err1064);
}
errors++;
}
if(data317.height === undefined){
const err1065 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1065];
}
else {
vErrors.push(err1065);
}
errors++;
}
for(const key57 in data317){
if(!((((key57 === "x") || (key57 === "y")) || (key57 === "width")) || (key57 === "height"))){
const err1066 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key57},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1066];
}
else {
vErrors.push(err1066);
}
errors++;
}
}
if(data317.x !== undefined){
let data318 = data317.x;
if(!((typeof data318 == "number") && (isFinite(data318)))){
const err1067 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/rect/x",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1067];
}
else {
vErrors.push(err1067);
}
errors++;
}
}
if(data317.y !== undefined){
let data319 = data317.y;
if(!((typeof data319 == "number") && (isFinite(data319)))){
const err1068 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/rect/y",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1068];
}
else {
vErrors.push(err1068);
}
errors++;
}
}
if(data317.width !== undefined){
let data320 = data317.width;
if((typeof data320 == "number") && (isFinite(data320))){
if(data320 <= 0 || isNaN(data320)){
const err1069 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/rect/width",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1069];
}
else {
vErrors.push(err1069);
}
errors++;
}
}
else {
const err1070 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/rect/width",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1070];
}
else {
vErrors.push(err1070);
}
errors++;
}
}
if(data317.height !== undefined){
let data321 = data317.height;
if((typeof data321 == "number") && (isFinite(data321))){
if(data321 <= 0 || isNaN(data321)){
const err1071 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/rect/height",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1071];
}
else {
vErrors.push(err1071);
}
errors++;
}
}
else {
const err1072 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/rect/height",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1072];
}
else {
vErrors.push(err1072);
}
errors++;
}
}
}
else {
const err1073 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1073];
}
else {
vErrors.push(err1073);
}
errors++;
}
}
if(data315.observed !== undefined){
if(typeof data315.observed !== "boolean"){
const err1074 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/observed",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/observed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1074];
}
else {
vErrors.push(err1074);
}
errors++;
}
}
if(data315.reason !== undefined){
let data323 = data315.reason;
if(typeof data323 === "string"){
if(func2(data323) > 128){
const err1075 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/reason",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/reason/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1075];
}
else {
vErrors.push(err1075);
}
errors++;
}
if(func2(data323) < 1){
const err1076 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/reason",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/reason/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1076];
}
else {
vErrors.push(err1076);
}
errors++;
}
}
else {
const err1077 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/reason",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/reason/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1077];
}
else {
vErrors.push(err1077);
}
errors++;
}
}
if(data315.estimatedStates !== undefined){
let data324 = data315.estimatedStates;
if(Array.isArray(data324)){
if(data324.length > 2){
const err1078 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/estimatedStates",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/estimatedStates/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err1078];
}
else {
vErrors.push(err1078);
}
errors++;
}
const len39 = data324.length;
for(let i41=0; i41<len39; i41++){
let data325 = data324[i41];
if(!((data325 === "open") || (data325 === "closed"))){
const err1079 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/estimatedStates/" + i41,schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/estimatedStates/items/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.report.properties.regions.items.properties.estimatedStates.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1079];
}
else {
vErrors.push(err1079);
}
errors++;
}
}
}
else {
const err1080 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/estimatedStates",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/estimatedStates/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1080];
}
else {
vErrors.push(err1080);
}
errors++;
}
}
if(data315.enabled !== undefined){
if(typeof data315.enabled !== "boolean"){
const err1081 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/enabled",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/enabled/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1081];
}
else {
vErrors.push(err1081);
}
errors++;
}
}
if(data315.masks !== undefined){
let data327 = data315.masks;
if(Array.isArray(data327)){
if(data327.length > 32){
const err1082 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err1082];
}
else {
vErrors.push(err1082);
}
errors++;
}
const len40 = data327.length;
for(let i42=0; i42<len40; i42++){
let data328 = data327[i42];
if(data328 && typeof data328 == "object" && !Array.isArray(data328)){
if(data328.mode === undefined){
const err1083 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42,schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err1083];
}
else {
vErrors.push(err1083);
}
errors++;
}
if(data328.rect === undefined){
const err1084 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42,schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err1084];
}
else {
vErrors.push(err1084);
}
errors++;
}
for(const key58 in data328){
if(!((key58 === "mode") || (key58 === "rect"))){
const err1085 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42,schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key58},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1085];
}
else {
vErrors.push(err1085);
}
errors++;
}
}
if(data328.mode !== undefined){
let data329 = data328.mode;
if(!((data329 === "erase") || (data329 === "restore"))){
const err1086 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42+"/mode",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.report.properties.regions.items.properties.masks.items.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1086];
}
else {
vErrors.push(err1086);
}
errors++;
}
}
if(data328.rect !== undefined){
let data330 = data328.rect;
if(data330 && typeof data330 == "object" && !Array.isArray(data330)){
if(data330.x === undefined){
const err1087 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1087];
}
else {
vErrors.push(err1087);
}
errors++;
}
if(data330.y === undefined){
const err1088 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1088];
}
else {
vErrors.push(err1088);
}
errors++;
}
if(data330.width === undefined){
const err1089 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1089];
}
else {
vErrors.push(err1089);
}
errors++;
}
if(data330.height === undefined){
const err1090 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1090];
}
else {
vErrors.push(err1090);
}
errors++;
}
for(const key59 in data330){
if(!((((key59 === "x") || (key59 === "y")) || (key59 === "width")) || (key59 === "height"))){
const err1091 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key59},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1091];
}
else {
vErrors.push(err1091);
}
errors++;
}
}
if(data330.x !== undefined){
let data331 = data330.x;
if(!((typeof data331 == "number") && (isFinite(data331)))){
const err1092 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42+"/rect/x",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1092];
}
else {
vErrors.push(err1092);
}
errors++;
}
}
if(data330.y !== undefined){
let data332 = data330.y;
if(!((typeof data332 == "number") && (isFinite(data332)))){
const err1093 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42+"/rect/y",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1093];
}
else {
vErrors.push(err1093);
}
errors++;
}
}
if(data330.width !== undefined){
let data333 = data330.width;
if((typeof data333 == "number") && (isFinite(data333))){
if(data333 <= 0 || isNaN(data333)){
const err1094 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42+"/rect/width",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1094];
}
else {
vErrors.push(err1094);
}
errors++;
}
}
else {
const err1095 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42+"/rect/width",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1095];
}
else {
vErrors.push(err1095);
}
errors++;
}
}
if(data330.height !== undefined){
let data334 = data330.height;
if((typeof data334 == "number") && (isFinite(data334))){
if(data334 <= 0 || isNaN(data334)){
const err1096 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42+"/rect/height",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1096];
}
else {
vErrors.push(err1096);
}
errors++;
}
}
else {
const err1097 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42+"/rect/height",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1097];
}
else {
vErrors.push(err1097);
}
errors++;
}
}
}
else {
const err1098 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42+"/rect",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1098];
}
else {
vErrors.push(err1098);
}
errors++;
}
}
}
else {
const err1099 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks/" + i42,schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1099];
}
else {
vErrors.push(err1099);
}
errors++;
}
}
}
else {
const err1100 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/masks",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/masks/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1100];
}
else {
vErrors.push(err1100);
}
errors++;
}
}
if(data315.order !== undefined){
let data335 = data315.order;
if(!(((typeof data335 == "number") && (!(data335 % 1) && !isNaN(data335))) && (isFinite(data335)))){
const err1101 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/order",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/order/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1101];
}
else {
vErrors.push(err1101);
}
errors++;
}
if((typeof data335 == "number") && (isFinite(data335))){
if(data335 > 20 || isNaN(data335)){
const err1102 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/order",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/order/maximum",keyword:"maximum",params:{comparison: "<=", limit: 20},message:"must be <= 20"};
if(vErrors === null){
vErrors = [err1102];
}
else {
vErrors.push(err1102);
}
errors++;
}
if(data335 < 5 || isNaN(data335)){
const err1103 = {instancePath:instancePath+"/structure/report/regions/" + i40+"/order",schemaPath:"#/properties/structure/properties/report/properties/regions/items/properties/order/minimum",keyword:"minimum",params:{comparison: ">=", limit: 5},message:"must be >= 5"};
if(vErrors === null){
vErrors = [err1103];
}
else {
vErrors.push(err1103);
}
errors++;
}
}
}
}
else {
const err1104 = {instancePath:instancePath+"/structure/report/regions/" + i40,schemaPath:"#/properties/structure/properties/report/properties/regions/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1104];
}
else {
vErrors.push(err1104);
}
errors++;
}
}
}
else {
const err1105 = {instancePath:instancePath+"/structure/report/regions",schemaPath:"#/properties/structure/properties/report/properties/regions/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1105];
}
else {
vErrors.push(err1105);
}
errors++;
}
}
if(data305.unconfirmed !== undefined){
let data336 = data305.unconfirmed;
if(Array.isArray(data336)){
if(data336.length > 16){
const err1106 = {instancePath:instancePath+"/structure/report/unconfirmed",schemaPath:"#/properties/structure/properties/report/properties/unconfirmed/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err1106];
}
else {
vErrors.push(err1106);
}
errors++;
}
const len41 = data336.length;
for(let i43=0; i43<len41; i43++){
let data337 = data336[i43];
if(typeof data337 === "string"){
if(func2(data337) > 128){
const err1107 = {instancePath:instancePath+"/structure/report/unconfirmed/" + i43,schemaPath:"#/properties/structure/properties/report/properties/unconfirmed/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1107];
}
else {
vErrors.push(err1107);
}
errors++;
}
if(func2(data337) < 1){
const err1108 = {instancePath:instancePath+"/structure/report/unconfirmed/" + i43,schemaPath:"#/properties/structure/properties/report/properties/unconfirmed/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1108];
}
else {
vErrors.push(err1108);
}
errors++;
}
}
else {
const err1109 = {instancePath:instancePath+"/structure/report/unconfirmed/" + i43,schemaPath:"#/properties/structure/properties/report/properties/unconfirmed/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1109];
}
else {
vErrors.push(err1109);
}
errors++;
}
}
}
else {
const err1110 = {instancePath:instancePath+"/structure/report/unconfirmed",schemaPath:"#/properties/structure/properties/report/properties/unconfirmed/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1110];
}
else {
vErrors.push(err1110);
}
errors++;
}
}
if(data305.warnings !== undefined){
let data338 = data305.warnings;
if(Array.isArray(data338)){
if(data338.length > 16){
const err1111 = {instancePath:instancePath+"/structure/report/warnings",schemaPath:"#/properties/structure/properties/report/properties/warnings/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err1111];
}
else {
vErrors.push(err1111);
}
errors++;
}
const len42 = data338.length;
for(let i44=0; i44<len42; i44++){
let data339 = data338[i44];
if(typeof data339 === "string"){
if(func2(data339) > 128){
const err1112 = {instancePath:instancePath+"/structure/report/warnings/" + i44,schemaPath:"#/properties/structure/properties/report/properties/warnings/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1112];
}
else {
vErrors.push(err1112);
}
errors++;
}
if(func2(data339) < 1){
const err1113 = {instancePath:instancePath+"/structure/report/warnings/" + i44,schemaPath:"#/properties/structure/properties/report/properties/warnings/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1113];
}
else {
vErrors.push(err1113);
}
errors++;
}
}
else {
const err1114 = {instancePath:instancePath+"/structure/report/warnings/" + i44,schemaPath:"#/properties/structure/properties/report/properties/warnings/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1114];
}
else {
vErrors.push(err1114);
}
errors++;
}
}
}
else {
const err1115 = {instancePath:instancePath+"/structure/report/warnings",schemaPath:"#/properties/structure/properties/report/properties/warnings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1115];
}
else {
vErrors.push(err1115);
}
errors++;
}
}
if(data305.headGain !== undefined){
let data340 = data305.headGain;
if((typeof data340 == "number") && (isFinite(data340))){
if(data340 > 0.65 || isNaN(data340)){
const err1116 = {instancePath:instancePath+"/structure/report/headGain",schemaPath:"#/properties/structure/properties/report/properties/headGain/maximum",keyword:"maximum",params:{comparison: "<=", limit: 0.65},message:"must be <= 0.65"};
if(vErrors === null){
vErrors = [err1116];
}
else {
vErrors.push(err1116);
}
errors++;
}
if(data340 < 0 || isNaN(data340)){
const err1117 = {instancePath:instancePath+"/structure/report/headGain",schemaPath:"#/properties/structure/properties/report/properties/headGain/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1117];
}
else {
vErrors.push(err1117);
}
errors++;
}
}
else {
const err1118 = {instancePath:instancePath+"/structure/report/headGain",schemaPath:"#/properties/structure/properties/report/properties/headGain/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1118];
}
else {
vErrors.push(err1118);
}
errors++;
}
}
if(data305.maxRollDegrees !== undefined){
let data341 = data305.maxRollDegrees;
if((typeof data341 == "number") && (isFinite(data341))){
if(data341 > 3.900000001 || isNaN(data341)){
const err1119 = {instancePath:instancePath+"/structure/report/maxRollDegrees",schemaPath:"#/properties/structure/properties/report/properties/maxRollDegrees/maximum",keyword:"maximum",params:{comparison: "<=", limit: 3.900000001},message:"must be <= 3.900000001"};
if(vErrors === null){
vErrors = [err1119];
}
else {
vErrors.push(err1119);
}
errors++;
}
if(data341 < 0 || isNaN(data341)){
const err1120 = {instancePath:instancePath+"/structure/report/maxRollDegrees",schemaPath:"#/properties/structure/properties/report/properties/maxRollDegrees/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1120];
}
else {
vErrors.push(err1120);
}
errors++;
}
}
else {
const err1121 = {instancePath:instancePath+"/structure/report/maxRollDegrees",schemaPath:"#/properties/structure/properties/report/properties/maxRollDegrees/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1121];
}
else {
vErrors.push(err1121);
}
errors++;
}
}
if(data305.completion !== undefined){
let data342 = data305.completion;
if(!((data342 === "estimated") || (data342 === "restrict"))){
const err1122 = {instancePath:instancePath+"/structure/report/completion",schemaPath:"#/properties/structure/properties/report/properties/completion/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.report.properties.completion.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1122];
}
else {
vErrors.push(err1122);
}
errors++;
}
}
if(data305.files !== undefined){
let data343 = data305.files;
if(Array.isArray(data343)){
if(data343.length > 7){
const err1123 = {instancePath:instancePath+"/structure/report/files",schemaPath:"#/properties/structure/properties/report/properties/files/maxItems",keyword:"maxItems",params:{limit: 7},message:"must NOT have more than 7 items"};
if(vErrors === null){
vErrors = [err1123];
}
else {
vErrors.push(err1123);
}
errors++;
}
const len43 = data343.length;
for(let i45=0; i45<len43; i45++){
let data344 = data343[i45];
if(typeof data344 === "string"){
if(func2(data344) > 128){
const err1124 = {instancePath:instancePath+"/structure/report/files/" + i45,schemaPath:"#/properties/structure/properties/report/properties/files/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1124];
}
else {
vErrors.push(err1124);
}
errors++;
}
if(func2(data344) < 1){
const err1125 = {instancePath:instancePath+"/structure/report/files/" + i45,schemaPath:"#/properties/structure/properties/report/properties/files/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1125];
}
else {
vErrors.push(err1125);
}
errors++;
}
if(!pattern60.test(data344)){
const err1126 = {instancePath:instancePath+"/structure/report/files/" + i45,schemaPath:"#/properties/structure/properties/report/properties/files/items/pattern",keyword:"pattern",params:{pattern: "^structure-(base|eye_(left|right)-(open|closed)|mouth-(open|closed))\\.png$"},message:"must match pattern \""+"^structure-(base|eye_(left|right)-(open|closed)|mouth-(open|closed))\\.png$"+"\""};
if(vErrors === null){
vErrors = [err1126];
}
else {
vErrors.push(err1126);
}
errors++;
}
}
else {
const err1127 = {instancePath:instancePath+"/structure/report/files/" + i45,schemaPath:"#/properties/structure/properties/report/properties/files/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
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
else {
const err1128 = {instancePath:instancePath+"/structure/report/files",schemaPath:"#/properties/structure/properties/report/properties/files/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1128];
}
else {
vErrors.push(err1128);
}
errors++;
}
}
}
else {
const err1129 = {instancePath:instancePath+"/structure/report",schemaPath:"#/properties/structure/properties/report/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1129];
}
else {
vErrors.push(err1129);
}
errors++;
}
}
if(data300.corrections !== undefined){
let data345 = data300.corrections;
if(data345 && typeof data345 == "object" && !Array.isArray(data345)){
if(data345.version === undefined){
const err1130 = {instancePath:instancePath+"/structure/corrections",schemaPath:"#/properties/structure/properties/corrections/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err1130];
}
else {
vErrors.push(err1130);
}
errors++;
}
if(data345.automatic === undefined){
const err1131 = {instancePath:instancePath+"/structure/corrections",schemaPath:"#/properties/structure/properties/corrections/required",keyword:"required",params:{missingProperty: "automatic"},message:"must have required property '"+"automatic"+"'"};
if(vErrors === null){
vErrors = [err1131];
}
else {
vErrors.push(err1131);
}
errors++;
}
if(data345.entries === undefined){
const err1132 = {instancePath:instancePath+"/structure/corrections",schemaPath:"#/properties/structure/properties/corrections/required",keyword:"required",params:{missingProperty: "entries"},message:"must have required property '"+"entries"+"'"};
if(vErrors === null){
vErrors = [err1132];
}
else {
vErrors.push(err1132);
}
errors++;
}
if(data345.invalidated === undefined){
const err1133 = {instancePath:instancePath+"/structure/corrections",schemaPath:"#/properties/structure/properties/corrections/required",keyword:"required",params:{missingProperty: "invalidated"},message:"must have required property '"+"invalidated"+"'"};
if(vErrors === null){
vErrors = [err1133];
}
else {
vErrors.push(err1133);
}
errors++;
}
for(const key60 in data345){
if(!((((key60 === "version") || (key60 === "automatic")) || (key60 === "entries")) || (key60 === "invalidated"))){
const err1134 = {instancePath:instancePath+"/structure/corrections",schemaPath:"#/properties/structure/properties/corrections/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key60},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1134];
}
else {
vErrors.push(err1134);
}
errors++;
}
}
if(data345.version !== undefined){
if(1 !== data345.version){
const err1135 = {instancePath:instancePath+"/structure/corrections/version",schemaPath:"#/properties/structure/properties/corrections/properties/version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err1135];
}
else {
vErrors.push(err1135);
}
errors++;
}
}
if(data345.automatic !== undefined){
let data347 = data345.automatic;
if(data347 && typeof data347 == "object" && !Array.isArray(data347)){
if(data347.version === undefined){
const err1136 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err1136];
}
else {
vErrors.push(err1136);
}
errors++;
}
if(data347.method === undefined){
const err1137 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "method"},message:"must have required property '"+"method"+"'"};
if(vErrors === null){
vErrors = [err1137];
}
else {
vErrors.push(err1137);
}
errors++;
}
if(data347.status === undefined){
const err1138 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err1138];
}
else {
vErrors.push(err1138);
}
errors++;
}
if(data347.face === undefined){
const err1139 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "face"},message:"must have required property '"+"face"+"'"};
if(vErrors === null){
vErrors = [err1139];
}
else {
vErrors.push(err1139);
}
errors++;
}
if(data347.regions === undefined){
const err1140 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "regions"},message:"must have required property '"+"regions"+"'"};
if(vErrors === null){
vErrors = [err1140];
}
else {
vErrors.push(err1140);
}
errors++;
}
if(data347.unconfirmed === undefined){
const err1141 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "unconfirmed"},message:"must have required property '"+"unconfirmed"+"'"};
if(vErrors === null){
vErrors = [err1141];
}
else {
vErrors.push(err1141);
}
errors++;
}
if(data347.warnings === undefined){
const err1142 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "warnings"},message:"must have required property '"+"warnings"+"'"};
if(vErrors === null){
vErrors = [err1142];
}
else {
vErrors.push(err1142);
}
errors++;
}
if(data347.headGain === undefined){
const err1143 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "headGain"},message:"must have required property '"+"headGain"+"'"};
if(vErrors === null){
vErrors = [err1143];
}
else {
vErrors.push(err1143);
}
errors++;
}
if(data347.maxRollDegrees === undefined){
const err1144 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "maxRollDegrees"},message:"must have required property '"+"maxRollDegrees"+"'"};
if(vErrors === null){
vErrors = [err1144];
}
else {
vErrors.push(err1144);
}
errors++;
}
if(data347.completion === undefined){
const err1145 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "completion"},message:"must have required property '"+"completion"+"'"};
if(vErrors === null){
vErrors = [err1145];
}
else {
vErrors.push(err1145);
}
errors++;
}
if(data347.files === undefined){
const err1146 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/required",keyword:"required",params:{missingProperty: "files"},message:"must have required property '"+"files"+"'"};
if(vErrors === null){
vErrors = [err1146];
}
else {
vErrors.push(err1146);
}
errors++;
}
for(const key61 in data347){
if(!(func1.call(schema31.properties.structure.properties.corrections.properties.automatic.properties, key61))){
const err1147 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key61},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1147];
}
else {
vErrors.push(err1147);
}
errors++;
}
}
if(data347.version !== undefined){
if("1.0.0" !== data347.version){
const err1148 = {instancePath:instancePath+"/structure/corrections/automatic/version",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/version/const",keyword:"const",params:{allowedValue: "1.0.0"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err1148];
}
else {
vErrors.push(err1148);
}
errors++;
}
}
if(data347.method !== undefined){
if("mediapipe-landmarks-pixel-evidence" !== data347.method){
const err1149 = {instancePath:instancePath+"/structure/corrections/automatic/method",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/method/const",keyword:"const",params:{allowedValue: "mediapipe-landmarks-pixel-evidence"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err1149];
}
else {
vErrors.push(err1149);
}
errors++;
}
}
if(data347.status !== undefined){
let data350 = data347.status;
if(!(((data350 === "ready") || (data350 === "partial")) || (data350 === "failed"))){
const err1150 = {instancePath:instancePath+"/structure/corrections/automatic/status",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/status/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.automatic.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1150];
}
else {
vErrors.push(err1150);
}
errors++;
}
}
if(data347.face !== undefined){
let data351 = data347.face;
const _errs767 = errors;
let valid164 = false;
const _errs768 = errors;
if(data351 && typeof data351 == "object" && !Array.isArray(data351)){
if(data351.x === undefined){
const err1151 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1151];
}
else {
vErrors.push(err1151);
}
errors++;
}
if(data351.y === undefined){
const err1152 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1152];
}
else {
vErrors.push(err1152);
}
errors++;
}
if(data351.width === undefined){
const err1153 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1153];
}
else {
vErrors.push(err1153);
}
errors++;
}
if(data351.height === undefined){
const err1154 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1154];
}
else {
vErrors.push(err1154);
}
errors++;
}
for(const key62 in data351){
if(!((((key62 === "x") || (key62 === "y")) || (key62 === "width")) || (key62 === "height"))){
const err1155 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key62},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1155];
}
else {
vErrors.push(err1155);
}
errors++;
}
}
if(data351.x !== undefined){
let data352 = data351.x;
if(!((typeof data352 == "number") && (isFinite(data352)))){
const err1156 = {instancePath:instancePath+"/structure/corrections/automatic/face/x",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1156];
}
else {
vErrors.push(err1156);
}
errors++;
}
}
if(data351.y !== undefined){
let data353 = data351.y;
if(!((typeof data353 == "number") && (isFinite(data353)))){
const err1157 = {instancePath:instancePath+"/structure/corrections/automatic/face/y",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1157];
}
else {
vErrors.push(err1157);
}
errors++;
}
}
if(data351.width !== undefined){
let data354 = data351.width;
if((typeof data354 == "number") && (isFinite(data354))){
if(data354 <= 0 || isNaN(data354)){
const err1158 = {instancePath:instancePath+"/structure/corrections/automatic/face/width",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1158];
}
else {
vErrors.push(err1158);
}
errors++;
}
}
else {
const err1159 = {instancePath:instancePath+"/structure/corrections/automatic/face/width",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1159];
}
else {
vErrors.push(err1159);
}
errors++;
}
}
if(data351.height !== undefined){
let data355 = data351.height;
if((typeof data355 == "number") && (isFinite(data355))){
if(data355 <= 0 || isNaN(data355)){
const err1160 = {instancePath:instancePath+"/structure/corrections/automatic/face/height",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1160];
}
else {
vErrors.push(err1160);
}
errors++;
}
}
else {
const err1161 = {instancePath:instancePath+"/structure/corrections/automatic/face/height",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1161];
}
else {
vErrors.push(err1161);
}
errors++;
}
}
}
else {
const err1162 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1162];
}
else {
vErrors.push(err1162);
}
errors++;
}
var _valid12 = _errs768 === errors;
valid164 = valid164 || _valid12;
const _errs779 = errors;
if(data351 !== null){
const err1163 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1163];
}
else {
vErrors.push(err1163);
}
errors++;
}
var _valid12 = _errs779 === errors;
valid164 = valid164 || _valid12;
if(!valid164){
const err1164 = {instancePath:instancePath+"/structure/corrections/automatic/face",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/face/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1164];
}
else {
vErrors.push(err1164);
}
errors++;
}
else {
errors = _errs767;
if(vErrors !== null){
if(_errs767){
vErrors.length = _errs767;
}
else {
vErrors = null;
}
}
}
}
if(data347.regions !== undefined){
let data356 = data347.regions;
if(Array.isArray(data356)){
if(data356.length > 3){
const err1165 = {instancePath:instancePath+"/structure/corrections/automatic/regions",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/maxItems",keyword:"maxItems",params:{limit: 3},message:"must NOT have more than 3 items"};
if(vErrors === null){
vErrors = [err1165];
}
else {
vErrors.push(err1165);
}
errors++;
}
const len44 = data356.length;
for(let i46=0; i46<len44; i46++){
let data357 = data356[i46];
if(data357 && typeof data357 == "object" && !Array.isArray(data357)){
if(data357.key === undefined){
const err1166 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/required",keyword:"required",params:{missingProperty: "key"},message:"must have required property '"+"key"+"'"};
if(vErrors === null){
vErrors = [err1166];
}
else {
vErrors.push(err1166);
}
errors++;
}
if(data357.rect === undefined){
const err1167 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err1167];
}
else {
vErrors.push(err1167);
}
errors++;
}
if(data357.observed === undefined){
const err1168 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/required",keyword:"required",params:{missingProperty: "observed"},message:"must have required property '"+"observed"+"'"};
if(vErrors === null){
vErrors = [err1168];
}
else {
vErrors.push(err1168);
}
errors++;
}
if(data357.reason === undefined){
const err1169 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/required",keyword:"required",params:{missingProperty: "reason"},message:"must have required property '"+"reason"+"'"};
if(vErrors === null){
vErrors = [err1169];
}
else {
vErrors.push(err1169);
}
errors++;
}
if(data357.estimatedStates === undefined){
const err1170 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/required",keyword:"required",params:{missingProperty: "estimatedStates"},message:"must have required property '"+"estimatedStates"+"'"};
if(vErrors === null){
vErrors = [err1170];
}
else {
vErrors.push(err1170);
}
errors++;
}
for(const key63 in data357){
if(!((((((((key63 === "key") || (key63 === "rect")) || (key63 === "observed")) || (key63 === "reason")) || (key63 === "estimatedStates")) || (key63 === "enabled")) || (key63 === "masks")) || (key63 === "order"))){
const err1171 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key63},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1171];
}
else {
vErrors.push(err1171);
}
errors++;
}
}
if(data357.key !== undefined){
let data358 = data357.key;
if(!(((data358 === "eye_left") || (data358 === "eye_right")) || (data358 === "mouth"))){
const err1172 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/key",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/key/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.automatic.properties.regions.items.properties.key.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1172];
}
else {
vErrors.push(err1172);
}
errors++;
}
}
if(data357.rect !== undefined){
let data359 = data357.rect;
if(data359 && typeof data359 == "object" && !Array.isArray(data359)){
if(data359.x === undefined){
const err1173 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1173];
}
else {
vErrors.push(err1173);
}
errors++;
}
if(data359.y === undefined){
const err1174 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1174];
}
else {
vErrors.push(err1174);
}
errors++;
}
if(data359.width === undefined){
const err1175 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1175];
}
else {
vErrors.push(err1175);
}
errors++;
}
if(data359.height === undefined){
const err1176 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1176];
}
else {
vErrors.push(err1176);
}
errors++;
}
for(const key64 in data359){
if(!((((key64 === "x") || (key64 === "y")) || (key64 === "width")) || (key64 === "height"))){
const err1177 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key64},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1177];
}
else {
vErrors.push(err1177);
}
errors++;
}
}
if(data359.x !== undefined){
let data360 = data359.x;
if(!((typeof data360 == "number") && (isFinite(data360)))){
const err1178 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/rect/x",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1178];
}
else {
vErrors.push(err1178);
}
errors++;
}
}
if(data359.y !== undefined){
let data361 = data359.y;
if(!((typeof data361 == "number") && (isFinite(data361)))){
const err1179 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/rect/y",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1179];
}
else {
vErrors.push(err1179);
}
errors++;
}
}
if(data359.width !== undefined){
let data362 = data359.width;
if((typeof data362 == "number") && (isFinite(data362))){
if(data362 <= 0 || isNaN(data362)){
const err1180 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1180];
}
else {
vErrors.push(err1180);
}
errors++;
}
}
else {
const err1181 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1181];
}
else {
vErrors.push(err1181);
}
errors++;
}
}
if(data359.height !== undefined){
let data363 = data359.height;
if((typeof data363 == "number") && (isFinite(data363))){
if(data363 <= 0 || isNaN(data363)){
const err1182 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1182];
}
else {
vErrors.push(err1182);
}
errors++;
}
}
else {
const err1183 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
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
const err1184 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1184];
}
else {
vErrors.push(err1184);
}
errors++;
}
}
if(data357.observed !== undefined){
if(typeof data357.observed !== "boolean"){
const err1185 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/observed",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/observed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1185];
}
else {
vErrors.push(err1185);
}
errors++;
}
}
if(data357.reason !== undefined){
let data365 = data357.reason;
if(typeof data365 === "string"){
if(func2(data365) > 128){
const err1186 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/reason",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/reason/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1186];
}
else {
vErrors.push(err1186);
}
errors++;
}
if(func2(data365) < 1){
const err1187 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/reason",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/reason/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1187];
}
else {
vErrors.push(err1187);
}
errors++;
}
}
else {
const err1188 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/reason",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/reason/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1188];
}
else {
vErrors.push(err1188);
}
errors++;
}
}
if(data357.estimatedStates !== undefined){
let data366 = data357.estimatedStates;
if(Array.isArray(data366)){
if(data366.length > 2){
const err1189 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/estimatedStates",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/estimatedStates/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err1189];
}
else {
vErrors.push(err1189);
}
errors++;
}
const len45 = data366.length;
for(let i47=0; i47<len45; i47++){
let data367 = data366[i47];
if(!((data367 === "open") || (data367 === "closed"))){
const err1190 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/estimatedStates/" + i47,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/estimatedStates/items/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.automatic.properties.regions.items.properties.estimatedStates.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1190];
}
else {
vErrors.push(err1190);
}
errors++;
}
}
}
else {
const err1191 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/estimatedStates",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/estimatedStates/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1191];
}
else {
vErrors.push(err1191);
}
errors++;
}
}
if(data357.enabled !== undefined){
if(typeof data357.enabled !== "boolean"){
const err1192 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/enabled",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/enabled/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1192];
}
else {
vErrors.push(err1192);
}
errors++;
}
}
if(data357.masks !== undefined){
let data369 = data357.masks;
if(Array.isArray(data369)){
if(data369.length > 32){
const err1193 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err1193];
}
else {
vErrors.push(err1193);
}
errors++;
}
const len46 = data369.length;
for(let i48=0; i48<len46; i48++){
let data370 = data369[i48];
if(data370 && typeof data370 == "object" && !Array.isArray(data370)){
if(data370.mode === undefined){
const err1194 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err1194];
}
else {
vErrors.push(err1194);
}
errors++;
}
if(data370.rect === undefined){
const err1195 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err1195];
}
else {
vErrors.push(err1195);
}
errors++;
}
for(const key65 in data370){
if(!((key65 === "mode") || (key65 === "rect"))){
const err1196 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key65},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1196];
}
else {
vErrors.push(err1196);
}
errors++;
}
}
if(data370.mode !== undefined){
let data371 = data370.mode;
if(!((data371 === "erase") || (data371 === "restore"))){
const err1197 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48+"/mode",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.automatic.properties.regions.items.properties.masks.items.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1197];
}
else {
vErrors.push(err1197);
}
errors++;
}
}
if(data370.rect !== undefined){
let data372 = data370.rect;
if(data372 && typeof data372 == "object" && !Array.isArray(data372)){
if(data372.x === undefined){
const err1198 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1198];
}
else {
vErrors.push(err1198);
}
errors++;
}
if(data372.y === undefined){
const err1199 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1199];
}
else {
vErrors.push(err1199);
}
errors++;
}
if(data372.width === undefined){
const err1200 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1200];
}
else {
vErrors.push(err1200);
}
errors++;
}
if(data372.height === undefined){
const err1201 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1201];
}
else {
vErrors.push(err1201);
}
errors++;
}
for(const key66 in data372){
if(!((((key66 === "x") || (key66 === "y")) || (key66 === "width")) || (key66 === "height"))){
const err1202 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key66},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1202];
}
else {
vErrors.push(err1202);
}
errors++;
}
}
if(data372.x !== undefined){
let data373 = data372.x;
if(!((typeof data373 == "number") && (isFinite(data373)))){
const err1203 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48+"/rect/x",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1203];
}
else {
vErrors.push(err1203);
}
errors++;
}
}
if(data372.y !== undefined){
let data374 = data372.y;
if(!((typeof data374 == "number") && (isFinite(data374)))){
const err1204 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48+"/rect/y",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1204];
}
else {
vErrors.push(err1204);
}
errors++;
}
}
if(data372.width !== undefined){
let data375 = data372.width;
if((typeof data375 == "number") && (isFinite(data375))){
if(data375 <= 0 || isNaN(data375)){
const err1205 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1205];
}
else {
vErrors.push(err1205);
}
errors++;
}
}
else {
const err1206 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1206];
}
else {
vErrors.push(err1206);
}
errors++;
}
}
if(data372.height !== undefined){
let data376 = data372.height;
if((typeof data376 == "number") && (isFinite(data376))){
if(data376 <= 0 || isNaN(data376)){
const err1207 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1207];
}
else {
vErrors.push(err1207);
}
errors++;
}
}
else {
const err1208 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1208];
}
else {
vErrors.push(err1208);
}
errors++;
}
}
}
else {
const err1209 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1209];
}
else {
vErrors.push(err1209);
}
errors++;
}
}
}
else {
const err1210 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks/" + i48,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
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
const err1211 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/masks",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/masks/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1211];
}
else {
vErrors.push(err1211);
}
errors++;
}
}
if(data357.order !== undefined){
let data377 = data357.order;
if(!(((typeof data377 == "number") && (!(data377 % 1) && !isNaN(data377))) && (isFinite(data377)))){
const err1212 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/order",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/order/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1212];
}
else {
vErrors.push(err1212);
}
errors++;
}
if((typeof data377 == "number") && (isFinite(data377))){
if(data377 > 20 || isNaN(data377)){
const err1213 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/order",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/order/maximum",keyword:"maximum",params:{comparison: "<=", limit: 20},message:"must be <= 20"};
if(vErrors === null){
vErrors = [err1213];
}
else {
vErrors.push(err1213);
}
errors++;
}
if(data377 < 5 || isNaN(data377)){
const err1214 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46+"/order",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/properties/order/minimum",keyword:"minimum",params:{comparison: ">=", limit: 5},message:"must be >= 5"};
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
}
else {
const err1215 = {instancePath:instancePath+"/structure/corrections/automatic/regions/" + i46,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1215];
}
else {
vErrors.push(err1215);
}
errors++;
}
}
}
else {
const err1216 = {instancePath:instancePath+"/structure/corrections/automatic/regions",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/regions/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1216];
}
else {
vErrors.push(err1216);
}
errors++;
}
}
if(data347.unconfirmed !== undefined){
let data378 = data347.unconfirmed;
if(Array.isArray(data378)){
if(data378.length > 16){
const err1217 = {instancePath:instancePath+"/structure/corrections/automatic/unconfirmed",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/unconfirmed/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err1217];
}
else {
vErrors.push(err1217);
}
errors++;
}
const len47 = data378.length;
for(let i49=0; i49<len47; i49++){
let data379 = data378[i49];
if(typeof data379 === "string"){
if(func2(data379) > 128){
const err1218 = {instancePath:instancePath+"/structure/corrections/automatic/unconfirmed/" + i49,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/unconfirmed/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1218];
}
else {
vErrors.push(err1218);
}
errors++;
}
if(func2(data379) < 1){
const err1219 = {instancePath:instancePath+"/structure/corrections/automatic/unconfirmed/" + i49,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/unconfirmed/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1219];
}
else {
vErrors.push(err1219);
}
errors++;
}
}
else {
const err1220 = {instancePath:instancePath+"/structure/corrections/automatic/unconfirmed/" + i49,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/unconfirmed/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1220];
}
else {
vErrors.push(err1220);
}
errors++;
}
}
}
else {
const err1221 = {instancePath:instancePath+"/structure/corrections/automatic/unconfirmed",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/unconfirmed/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1221];
}
else {
vErrors.push(err1221);
}
errors++;
}
}
if(data347.warnings !== undefined){
let data380 = data347.warnings;
if(Array.isArray(data380)){
if(data380.length > 16){
const err1222 = {instancePath:instancePath+"/structure/corrections/automatic/warnings",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/warnings/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err1222];
}
else {
vErrors.push(err1222);
}
errors++;
}
const len48 = data380.length;
for(let i50=0; i50<len48; i50++){
let data381 = data380[i50];
if(typeof data381 === "string"){
if(func2(data381) > 128){
const err1223 = {instancePath:instancePath+"/structure/corrections/automatic/warnings/" + i50,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/warnings/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1223];
}
else {
vErrors.push(err1223);
}
errors++;
}
if(func2(data381) < 1){
const err1224 = {instancePath:instancePath+"/structure/corrections/automatic/warnings/" + i50,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/warnings/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1224];
}
else {
vErrors.push(err1224);
}
errors++;
}
}
else {
const err1225 = {instancePath:instancePath+"/structure/corrections/automatic/warnings/" + i50,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/warnings/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1225];
}
else {
vErrors.push(err1225);
}
errors++;
}
}
}
else {
const err1226 = {instancePath:instancePath+"/structure/corrections/automatic/warnings",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/warnings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1226];
}
else {
vErrors.push(err1226);
}
errors++;
}
}
if(data347.headGain !== undefined){
let data382 = data347.headGain;
if((typeof data382 == "number") && (isFinite(data382))){
if(data382 > 0.65 || isNaN(data382)){
const err1227 = {instancePath:instancePath+"/structure/corrections/automatic/headGain",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/headGain/maximum",keyword:"maximum",params:{comparison: "<=", limit: 0.65},message:"must be <= 0.65"};
if(vErrors === null){
vErrors = [err1227];
}
else {
vErrors.push(err1227);
}
errors++;
}
if(data382 < 0 || isNaN(data382)){
const err1228 = {instancePath:instancePath+"/structure/corrections/automatic/headGain",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/headGain/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1228];
}
else {
vErrors.push(err1228);
}
errors++;
}
}
else {
const err1229 = {instancePath:instancePath+"/structure/corrections/automatic/headGain",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/headGain/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1229];
}
else {
vErrors.push(err1229);
}
errors++;
}
}
if(data347.maxRollDegrees !== undefined){
let data383 = data347.maxRollDegrees;
if((typeof data383 == "number") && (isFinite(data383))){
if(data383 > 3.900000001 || isNaN(data383)){
const err1230 = {instancePath:instancePath+"/structure/corrections/automatic/maxRollDegrees",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/maxRollDegrees/maximum",keyword:"maximum",params:{comparison: "<=", limit: 3.900000001},message:"must be <= 3.900000001"};
if(vErrors === null){
vErrors = [err1230];
}
else {
vErrors.push(err1230);
}
errors++;
}
if(data383 < 0 || isNaN(data383)){
const err1231 = {instancePath:instancePath+"/structure/corrections/automatic/maxRollDegrees",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/maxRollDegrees/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1231];
}
else {
vErrors.push(err1231);
}
errors++;
}
}
else {
const err1232 = {instancePath:instancePath+"/structure/corrections/automatic/maxRollDegrees",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/maxRollDegrees/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1232];
}
else {
vErrors.push(err1232);
}
errors++;
}
}
if(data347.completion !== undefined){
let data384 = data347.completion;
if(!((data384 === "estimated") || (data384 === "restrict"))){
const err1233 = {instancePath:instancePath+"/structure/corrections/automatic/completion",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/completion/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.automatic.properties.completion.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1233];
}
else {
vErrors.push(err1233);
}
errors++;
}
}
if(data347.files !== undefined){
let data385 = data347.files;
if(Array.isArray(data385)){
if(data385.length > 7){
const err1234 = {instancePath:instancePath+"/structure/corrections/automatic/files",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/files/maxItems",keyword:"maxItems",params:{limit: 7},message:"must NOT have more than 7 items"};
if(vErrors === null){
vErrors = [err1234];
}
else {
vErrors.push(err1234);
}
errors++;
}
const len49 = data385.length;
for(let i51=0; i51<len49; i51++){
let data386 = data385[i51];
if(typeof data386 === "string"){
if(func2(data386) > 128){
const err1235 = {instancePath:instancePath+"/structure/corrections/automatic/files/" + i51,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/files/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1235];
}
else {
vErrors.push(err1235);
}
errors++;
}
if(func2(data386) < 1){
const err1236 = {instancePath:instancePath+"/structure/corrections/automatic/files/" + i51,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/files/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1236];
}
else {
vErrors.push(err1236);
}
errors++;
}
if(!pattern60.test(data386)){
const err1237 = {instancePath:instancePath+"/structure/corrections/automatic/files/" + i51,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/files/items/pattern",keyword:"pattern",params:{pattern: "^structure-(base|eye_(left|right)-(open|closed)|mouth-(open|closed))\\.png$"},message:"must match pattern \""+"^structure-(base|eye_(left|right)-(open|closed)|mouth-(open|closed))\\.png$"+"\""};
if(vErrors === null){
vErrors = [err1237];
}
else {
vErrors.push(err1237);
}
errors++;
}
}
else {
const err1238 = {instancePath:instancePath+"/structure/corrections/automatic/files/" + i51,schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/files/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1238];
}
else {
vErrors.push(err1238);
}
errors++;
}
}
}
else {
const err1239 = {instancePath:instancePath+"/structure/corrections/automatic/files",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/properties/files/type",keyword:"type",params:{type: "array"},message:"must be array"};
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
else {
const err1240 = {instancePath:instancePath+"/structure/corrections/automatic",schemaPath:"#/properties/structure/properties/corrections/properties/automatic/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1240];
}
else {
vErrors.push(err1240);
}
errors++;
}
}
if(data345.entries !== undefined){
let data387 = data345.entries;
if(Array.isArray(data387)){
if(data387.length > 3){
const err1241 = {instancePath:instancePath+"/structure/corrections/entries",schemaPath:"#/properties/structure/properties/corrections/properties/entries/maxItems",keyword:"maxItems",params:{limit: 3},message:"must NOT have more than 3 items"};
if(vErrors === null){
vErrors = [err1241];
}
else {
vErrors.push(err1241);
}
errors++;
}
const len50 = data387.length;
for(let i52=0; i52<len50; i52++){
let data388 = data387[i52];
if(data388 && typeof data388 == "object" && !Array.isArray(data388)){
if(data388.key === undefined){
const err1242 = {instancePath:instancePath+"/structure/corrections/entries/" + i52,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/required",keyword:"required",params:{missingProperty: "key"},message:"must have required property '"+"key"+"'"};
if(vErrors === null){
vErrors = [err1242];
}
else {
vErrors.push(err1242);
}
errors++;
}
if(data388.rect === undefined){
const err1243 = {instancePath:instancePath+"/structure/corrections/entries/" + i52,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err1243];
}
else {
vErrors.push(err1243);
}
errors++;
}
if(data388.masks === undefined){
const err1244 = {instancePath:instancePath+"/structure/corrections/entries/" + i52,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/required",keyword:"required",params:{missingProperty: "masks"},message:"must have required property '"+"masks"+"'"};
if(vErrors === null){
vErrors = [err1244];
}
else {
vErrors.push(err1244);
}
errors++;
}
if(data388.order === undefined){
const err1245 = {instancePath:instancePath+"/structure/corrections/entries/" + i52,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/required",keyword:"required",params:{missingProperty: "order"},message:"must have required property '"+"order"+"'"};
if(vErrors === null){
vErrors = [err1245];
}
else {
vErrors.push(err1245);
}
errors++;
}
if(data388.decision === undefined){
const err1246 = {instancePath:instancePath+"/structure/corrections/entries/" + i52,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/required",keyword:"required",params:{missingProperty: "decision"},message:"must have required property '"+"decision"+"'"};
if(vErrors === null){
vErrors = [err1246];
}
else {
vErrors.push(err1246);
}
errors++;
}
if(data388.occluded === undefined){
const err1247 = {instancePath:instancePath+"/structure/corrections/entries/" + i52,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/required",keyword:"required",params:{missingProperty: "occluded"},message:"must have required property '"+"occluded"+"'"};
if(vErrors === null){
vErrors = [err1247];
}
else {
vErrors.push(err1247);
}
errors++;
}
if(data388.protect === undefined){
const err1248 = {instancePath:instancePath+"/structure/corrections/entries/" + i52,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/required",keyword:"required",params:{missingProperty: "protect"},message:"must have required property '"+"protect"+"'"};
if(vErrors === null){
vErrors = [err1248];
}
else {
vErrors.push(err1248);
}
errors++;
}
for(const key67 in data388){
if(!(((((((key67 === "key") || (key67 === "rect")) || (key67 === "masks")) || (key67 === "order")) || (key67 === "decision")) || (key67 === "occluded")) || (key67 === "protect"))){
const err1249 = {instancePath:instancePath+"/structure/corrections/entries/" + i52,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key67},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1249];
}
else {
vErrors.push(err1249);
}
errors++;
}
}
if(data388.key !== undefined){
let data389 = data388.key;
if(!(((data389 === "eye_left") || (data389 === "eye_right")) || (data389 === "mouth"))){
const err1250 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/key",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/key/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.entries.items.properties.key.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1250];
}
else {
vErrors.push(err1250);
}
errors++;
}
}
if(data388.rect !== undefined){
let data390 = data388.rect;
if(data390 && typeof data390 == "object" && !Array.isArray(data390)){
if(data390.x === undefined){
const err1251 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1251];
}
else {
vErrors.push(err1251);
}
errors++;
}
if(data390.y === undefined){
const err1252 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1252];
}
else {
vErrors.push(err1252);
}
errors++;
}
if(data390.width === undefined){
const err1253 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1253];
}
else {
vErrors.push(err1253);
}
errors++;
}
if(data390.height === undefined){
const err1254 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1254];
}
else {
vErrors.push(err1254);
}
errors++;
}
for(const key68 in data390){
if(!((((key68 === "x") || (key68 === "y")) || (key68 === "width")) || (key68 === "height"))){
const err1255 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key68},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1255];
}
else {
vErrors.push(err1255);
}
errors++;
}
}
if(data390.x !== undefined){
let data391 = data390.x;
if(!((typeof data391 == "number") && (isFinite(data391)))){
const err1256 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/rect/x",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1256];
}
else {
vErrors.push(err1256);
}
errors++;
}
}
if(data390.y !== undefined){
let data392 = data390.y;
if(!((typeof data392 == "number") && (isFinite(data392)))){
const err1257 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/rect/y",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1257];
}
else {
vErrors.push(err1257);
}
errors++;
}
}
if(data390.width !== undefined){
let data393 = data390.width;
if((typeof data393 == "number") && (isFinite(data393))){
if(data393 <= 0 || isNaN(data393)){
const err1258 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1258];
}
else {
vErrors.push(err1258);
}
errors++;
}
}
else {
const err1259 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1259];
}
else {
vErrors.push(err1259);
}
errors++;
}
}
if(data390.height !== undefined){
let data394 = data390.height;
if((typeof data394 == "number") && (isFinite(data394))){
if(data394 <= 0 || isNaN(data394)){
const err1260 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1260];
}
else {
vErrors.push(err1260);
}
errors++;
}
}
else {
const err1261 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1261];
}
else {
vErrors.push(err1261);
}
errors++;
}
}
}
else {
const err1262 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1262];
}
else {
vErrors.push(err1262);
}
errors++;
}
}
if(data388.masks !== undefined){
let data395 = data388.masks;
if(Array.isArray(data395)){
if(data395.length > 32){
const err1263 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err1263];
}
else {
vErrors.push(err1263);
}
errors++;
}
const len51 = data395.length;
for(let i53=0; i53<len51; i53++){
let data396 = data395[i53];
if(data396 && typeof data396 == "object" && !Array.isArray(data396)){
if(data396.mode === undefined){
const err1264 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err1264];
}
else {
vErrors.push(err1264);
}
errors++;
}
if(data396.rect === undefined){
const err1265 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err1265];
}
else {
vErrors.push(err1265);
}
errors++;
}
for(const key69 in data396){
if(!((key69 === "mode") || (key69 === "rect"))){
const err1266 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key69},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1266];
}
else {
vErrors.push(err1266);
}
errors++;
}
}
if(data396.mode !== undefined){
let data397 = data396.mode;
if(!((data397 === "erase") || (data397 === "restore"))){
const err1267 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53+"/mode",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.entries.items.properties.masks.items.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1267];
}
else {
vErrors.push(err1267);
}
errors++;
}
}
if(data396.rect !== undefined){
let data398 = data396.rect;
if(data398 && typeof data398 == "object" && !Array.isArray(data398)){
if(data398.x === undefined){
const err1268 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1268];
}
else {
vErrors.push(err1268);
}
errors++;
}
if(data398.y === undefined){
const err1269 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1269];
}
else {
vErrors.push(err1269);
}
errors++;
}
if(data398.width === undefined){
const err1270 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1270];
}
else {
vErrors.push(err1270);
}
errors++;
}
if(data398.height === undefined){
const err1271 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1271];
}
else {
vErrors.push(err1271);
}
errors++;
}
for(const key70 in data398){
if(!((((key70 === "x") || (key70 === "y")) || (key70 === "width")) || (key70 === "height"))){
const err1272 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key70},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1272];
}
else {
vErrors.push(err1272);
}
errors++;
}
}
if(data398.x !== undefined){
let data399 = data398.x;
if(!((typeof data399 == "number") && (isFinite(data399)))){
const err1273 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53+"/rect/x",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1273];
}
else {
vErrors.push(err1273);
}
errors++;
}
}
if(data398.y !== undefined){
let data400 = data398.y;
if(!((typeof data400 == "number") && (isFinite(data400)))){
const err1274 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53+"/rect/y",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1274];
}
else {
vErrors.push(err1274);
}
errors++;
}
}
if(data398.width !== undefined){
let data401 = data398.width;
if((typeof data401 == "number") && (isFinite(data401))){
if(data401 <= 0 || isNaN(data401)){
const err1275 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1275];
}
else {
vErrors.push(err1275);
}
errors++;
}
}
else {
const err1276 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53+"/rect/width",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1276];
}
else {
vErrors.push(err1276);
}
errors++;
}
}
if(data398.height !== undefined){
let data402 = data398.height;
if((typeof data402 == "number") && (isFinite(data402))){
if(data402 <= 0 || isNaN(data402)){
const err1277 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1277];
}
else {
vErrors.push(err1277);
}
errors++;
}
}
else {
const err1278 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53+"/rect/height",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
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
const err1279 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53+"/rect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/properties/rect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1279];
}
else {
vErrors.push(err1279);
}
errors++;
}
}
}
else {
const err1280 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks/" + i53,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1280];
}
else {
vErrors.push(err1280);
}
errors++;
}
}
}
else {
const err1281 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/masks",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/masks/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1281];
}
else {
vErrors.push(err1281);
}
errors++;
}
}
if(data388.order !== undefined){
let data403 = data388.order;
if(!(((typeof data403 == "number") && (!(data403 % 1) && !isNaN(data403))) && (isFinite(data403)))){
const err1282 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/order",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/order/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1282];
}
else {
vErrors.push(err1282);
}
errors++;
}
if((typeof data403 == "number") && (isFinite(data403))){
if(data403 > 20 || isNaN(data403)){
const err1283 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/order",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/order/maximum",keyword:"maximum",params:{comparison: "<=", limit: 20},message:"must be <= 20"};
if(vErrors === null){
vErrors = [err1283];
}
else {
vErrors.push(err1283);
}
errors++;
}
if(data403 < 5 || isNaN(data403)){
const err1284 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/order",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/order/minimum",keyword:"minimum",params:{comparison: ">=", limit: 5},message:"must be >= 5"};
if(vErrors === null){
vErrors = [err1284];
}
else {
vErrors.push(err1284);
}
errors++;
}
}
}
if(data388.decision !== undefined){
let data404 = data388.decision;
if(!(((data404 === "confirmed") || (data404 === "skip")) || (data404 === "blocked"))){
const err1285 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/decision",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/decision/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.entries.items.properties.decision.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1285];
}
else {
vErrors.push(err1285);
}
errors++;
}
}
if(data388.occluded !== undefined){
if(typeof data388.occluded !== "boolean"){
const err1286 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/occluded",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/occluded/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1286];
}
else {
vErrors.push(err1286);
}
errors++;
}
}
if(data388.protect !== undefined){
if(typeof data388.protect !== "boolean"){
const err1287 = {instancePath:instancePath+"/structure/corrections/entries/" + i52+"/protect",schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/properties/protect/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1287];
}
else {
vErrors.push(err1287);
}
errors++;
}
}
}
else {
const err1288 = {instancePath:instancePath+"/structure/corrections/entries/" + i52,schemaPath:"#/properties/structure/properties/corrections/properties/entries/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1288];
}
else {
vErrors.push(err1288);
}
errors++;
}
}
}
else {
const err1289 = {instancePath:instancePath+"/structure/corrections/entries",schemaPath:"#/properties/structure/properties/corrections/properties/entries/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1289];
}
else {
vErrors.push(err1289);
}
errors++;
}
}
if(data345.invalidated !== undefined){
let data407 = data345.invalidated;
if(data407 && typeof data407 == "object" && !Array.isArray(data407)){
if(data407.keys === undefined){
const err1290 = {instancePath:instancePath+"/structure/corrections/invalidated",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/required",keyword:"required",params:{missingProperty: "keys"},message:"must have required property '"+"keys"+"'"};
if(vErrors === null){
vErrors = [err1290];
}
else {
vErrors.push(err1290);
}
errors++;
}
if(data407.checks === undefined){
const err1291 = {instancePath:instancePath+"/structure/corrections/invalidated",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/required",keyword:"required",params:{missingProperty: "checks"},message:"must have required property '"+"checks"+"'"};
if(vErrors === null){
vErrors = [err1291];
}
else {
vErrors.push(err1291);
}
errors++;
}
for(const key71 in data407){
if(!((key71 === "keys") || (key71 === "checks"))){
const err1292 = {instancePath:instancePath+"/structure/corrections/invalidated",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key71},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1292];
}
else {
vErrors.push(err1292);
}
errors++;
}
}
if(data407.keys !== undefined){
let data408 = data407.keys;
if(Array.isArray(data408)){
if(data408.length > 3){
const err1293 = {instancePath:instancePath+"/structure/corrections/invalidated/keys",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/properties/keys/maxItems",keyword:"maxItems",params:{limit: 3},message:"must NOT have more than 3 items"};
if(vErrors === null){
vErrors = [err1293];
}
else {
vErrors.push(err1293);
}
errors++;
}
const len52 = data408.length;
for(let i54=0; i54<len52; i54++){
let data409 = data408[i54];
if(!(((data409 === "eye_left") || (data409 === "eye_right")) || (data409 === "mouth"))){
const err1294 = {instancePath:instancePath+"/structure/corrections/invalidated/keys/" + i54,schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/properties/keys/items/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.invalidated.properties.keys.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1294];
}
else {
vErrors.push(err1294);
}
errors++;
}
}
}
else {
const err1295 = {instancePath:instancePath+"/structure/corrections/invalidated/keys",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/properties/keys/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1295];
}
else {
vErrors.push(err1295);
}
errors++;
}
}
if(data407.checks !== undefined){
let data410 = data407.checks;
if(Array.isArray(data410)){
if(data410.length > 3){
const err1296 = {instancePath:instancePath+"/structure/corrections/invalidated/checks",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/properties/checks/maxItems",keyword:"maxItems",params:{limit: 3},message:"must NOT have more than 3 items"};
if(vErrors === null){
vErrors = [err1296];
}
else {
vErrors.push(err1296);
}
errors++;
}
const len53 = data410.length;
for(let i55=0; i55<len53; i55++){
let data411 = data410[i55];
if(!(((data411 === "preview") || (data411 === "compatibility")) || (data411 === "export"))){
const err1297 = {instancePath:instancePath+"/structure/corrections/invalidated/checks/" + i55,schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/properties/checks/items/enum",keyword:"enum",params:{allowedValues: schema31.properties.structure.properties.corrections.properties.invalidated.properties.checks.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1297];
}
else {
vErrors.push(err1297);
}
errors++;
}
}
}
else {
const err1298 = {instancePath:instancePath+"/structure/corrections/invalidated/checks",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/properties/checks/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1298];
}
else {
vErrors.push(err1298);
}
errors++;
}
}
}
else {
const err1299 = {instancePath:instancePath+"/structure/corrections/invalidated",schemaPath:"#/properties/structure/properties/corrections/properties/invalidated/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1299];
}
else {
vErrors.push(err1299);
}
errors++;
}
}
}
else {
const err1300 = {instancePath:instancePath+"/structure/corrections",schemaPath:"#/properties/structure/properties/corrections/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1300];
}
else {
vErrors.push(err1300);
}
errors++;
}
}
}
else {
const err1301 = {instancePath:instancePath+"/structure",schemaPath:"#/properties/structure/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1301];
}
else {
vErrors.push(err1301);
}
errors++;
}
}
if(data.split !== undefined){
let data412 = data.split;
if(data412 && typeof data412 == "object" && !Array.isArray(data412)){
if(data412.version === undefined){
const err1302 = {instancePath:instancePath+"/split",schemaPath:"#/properties/split/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err1302];
}
else {
vErrors.push(err1302);
}
errors++;
}
if(data412.rigSignature === undefined){
const err1303 = {instancePath:instancePath+"/split",schemaPath:"#/properties/split/required",keyword:"required",params:{missingProperty: "rigSignature"},message:"must have required property '"+"rigSignature"+"'"};
if(vErrors === null){
vErrors = [err1303];
}
else {
vErrors.push(err1303);
}
errors++;
}
if(data412.draft === undefined){
const err1304 = {instancePath:instancePath+"/split",schemaPath:"#/properties/split/required",keyword:"required",params:{missingProperty: "draft"},message:"must have required property '"+"draft"+"'"};
if(vErrors === null){
vErrors = [err1304];
}
else {
vErrors.push(err1304);
}
errors++;
}
for(const key72 in data412){
if(!(((key72 === "version") || (key72 === "rigSignature")) || (key72 === "draft"))){
const err1305 = {instancePath:instancePath+"/split",schemaPath:"#/properties/split/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key72},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1305];
}
else {
vErrors.push(err1305);
}
errors++;
}
}
if(data412.version !== undefined){
if(1 !== data412.version){
const err1306 = {instancePath:instancePath+"/split/version",schemaPath:"#/properties/split/properties/version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err1306];
}
else {
vErrors.push(err1306);
}
errors++;
}
}
if(data412.rigSignature !== undefined){
let data414 = data412.rigSignature;
if(typeof data414 === "string"){
if(!pattern11.test(data414)){
const err1307 = {instancePath:instancePath+"/split/rigSignature",schemaPath:"#/properties/split/properties/rigSignature/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""};
if(vErrors === null){
vErrors = [err1307];
}
else {
vErrors.push(err1307);
}
errors++;
}
}
else {
const err1308 = {instancePath:instancePath+"/split/rigSignature",schemaPath:"#/properties/split/properties/rigSignature/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1308];
}
else {
vErrors.push(err1308);
}
errors++;
}
}
if(data412.draft !== undefined){
let data415 = data412.draft;
if(data415 && typeof data415 == "object" && !Array.isArray(data415)){
if(data415.id === undefined){
const err1309 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err1309];
}
else {
vErrors.push(err1309);
}
errors++;
}
if(data415.sourceKind === undefined){
const err1310 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "sourceKind"},message:"must have required property '"+"sourceKind"+"'"};
if(vErrors === null){
vErrors = [err1310];
}
else {
vErrors.push(err1310);
}
errors++;
}
if(data415.sourceHash === undefined){
const err1311 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "sourceHash"},message:"must have required property '"+"sourceHash"+"'"};
if(vErrors === null){
vErrors = [err1311];
}
else {
vErrors.push(err1311);
}
errors++;
}
if(data415.sourceManifest === undefined){
const err1312 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "sourceManifest"},message:"must have required property '"+"sourceManifest"+"'"};
if(vErrors === null){
vErrors = [err1312];
}
else {
vErrors.push(err1312);
}
errors++;
}
if(data415.canvas === undefined){
const err1313 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "canvas"},message:"must have required property '"+"canvas"+"'"};
if(vErrors === null){
vErrors = [err1313];
}
else {
vErrors.push(err1313);
}
errors++;
}
if(data415.layout === undefined){
const err1314 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "layout"},message:"must have required property '"+"layout"+"'"};
if(vErrors === null){
vErrors = [err1314];
}
else {
vErrors.push(err1314);
}
errors++;
}
if(data415.layoutConfirmed === undefined){
const err1315 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "layoutConfirmed"},message:"must have required property '"+"layoutConfirmed"+"'"};
if(vErrors === null){
vErrors = [err1315];
}
else {
vErrors.push(err1315);
}
errors++;
}
if(data415.limitedAccepted === undefined){
const err1316 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "limitedAccepted"},message:"must have required property '"+"limitedAccepted"+"'"};
if(vErrors === null){
vErrors = [err1316];
}
else {
vErrors.push(err1316);
}
errors++;
}
if(data415.omittedAccepted === undefined){
const err1317 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "omittedAccepted"},message:"must have required property '"+"omittedAccepted"+"'"};
if(vErrors === null){
vErrors = [err1317];
}
else {
vErrors.push(err1317);
}
errors++;
}
if(data415.layers === undefined){
const err1318 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "layers"},message:"must have required property '"+"layers"+"'"};
if(vErrors === null){
vErrors = [err1318];
}
else {
vErrors.push(err1318);
}
errors++;
}
if(data415.groups === undefined){
const err1319 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "groups"},message:"must have required property '"+"groups"+"'"};
if(vErrors === null){
vErrors = [err1319];
}
else {
vErrors.push(err1319);
}
errors++;
}
if(data415.missingProperties === undefined){
const err1320 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "missingProperties"},message:"must have required property '"+"missingProperties"+"'"};
if(vErrors === null){
vErrors = [err1320];
}
else {
vErrors.push(err1320);
}
errors++;
}
if(data415.omitted === undefined){
const err1321 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/required",keyword:"required",params:{missingProperty: "omitted"},message:"must have required property '"+"omitted"+"'"};
if(vErrors === null){
vErrors = [err1321];
}
else {
vErrors.push(err1321);
}
errors++;
}
for(const key73 in data415){
if(!(func1.call(schema31.properties.split.properties.draft.properties, key73))){
const err1322 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key73},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1322];
}
else {
vErrors.push(err1322);
}
errors++;
}
}
if(data415.id !== undefined){
let data416 = data415.id;
if(typeof data416 === "string"){
if(func2(data416) > 64){
const err1323 = {instancePath:instancePath+"/split/draft/id",schemaPath:"#/properties/split/properties/draft/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1323];
}
else {
vErrors.push(err1323);
}
errors++;
}
if(func2(data416) < 1){
const err1324 = {instancePath:instancePath+"/split/draft/id",schemaPath:"#/properties/split/properties/draft/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1324];
}
else {
vErrors.push(err1324);
}
errors++;
}
if(!pattern4.test(data416)){
const err1325 = {instancePath:instancePath+"/split/draft/id",schemaPath:"#/properties/split/properties/draft/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1325];
}
else {
vErrors.push(err1325);
}
errors++;
}
}
else {
const err1326 = {instancePath:instancePath+"/split/draft/id",schemaPath:"#/properties/split/properties/draft/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1326];
}
else {
vErrors.push(err1326);
}
errors++;
}
}
if(data415.sourceKind !== undefined){
let data417 = data415.sourceKind;
if(!((data417 === "folder") || (data417 === "2dparts"))){
const err1327 = {instancePath:instancePath+"/split/draft/sourceKind",schemaPath:"#/properties/split/properties/draft/properties/sourceKind/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.sourceKind.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1327];
}
else {
vErrors.push(err1327);
}
errors++;
}
}
if(data415.sourceHash !== undefined){
let data418 = data415.sourceHash;
const _errs906 = errors;
let valid197 = false;
const _errs907 = errors;
if(typeof data418 === "string"){
if(!pattern11.test(data418)){
const err1328 = {instancePath:instancePath+"/split/draft/sourceHash",schemaPath:"#/properties/split/properties/draft/properties/sourceHash/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""};
if(vErrors === null){
vErrors = [err1328];
}
else {
vErrors.push(err1328);
}
errors++;
}
}
else {
const err1329 = {instancePath:instancePath+"/split/draft/sourceHash",schemaPath:"#/properties/split/properties/draft/properties/sourceHash/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1329];
}
else {
vErrors.push(err1329);
}
errors++;
}
var _valid13 = _errs907 === errors;
valid197 = valid197 || _valid13;
const _errs909 = errors;
if(data418 !== null){
const err1330 = {instancePath:instancePath+"/split/draft/sourceHash",schemaPath:"#/properties/split/properties/draft/properties/sourceHash/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1330];
}
else {
vErrors.push(err1330);
}
errors++;
}
var _valid13 = _errs909 === errors;
valid197 = valid197 || _valid13;
if(!valid197){
const err1331 = {instancePath:instancePath+"/split/draft/sourceHash",schemaPath:"#/properties/split/properties/draft/properties/sourceHash/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1331];
}
else {
vErrors.push(err1331);
}
errors++;
}
else {
errors = _errs906;
if(vErrors !== null){
if(_errs906){
vErrors.length = _errs906;
}
else {
vErrors = null;
}
}
}
}
if(data415.sourceManifest !== undefined){
let data419 = data415.sourceManifest;
const _errs912 = errors;
let valid198 = false;
const _errs913 = errors;
if(typeof data419 === "string"){
if(func2(data419) > 1048576){
const err1332 = {instancePath:instancePath+"/split/draft/sourceManifest",schemaPath:"#/properties/split/properties/draft/properties/sourceManifest/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 1048576},message:"must NOT have more than 1048576 characters"};
if(vErrors === null){
vErrors = [err1332];
}
else {
vErrors.push(err1332);
}
errors++;
}
if(func2(data419) < 1){
const err1333 = {instancePath:instancePath+"/split/draft/sourceManifest",schemaPath:"#/properties/split/properties/draft/properties/sourceManifest/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1333];
}
else {
vErrors.push(err1333);
}
errors++;
}
}
else {
const err1334 = {instancePath:instancePath+"/split/draft/sourceManifest",schemaPath:"#/properties/split/properties/draft/properties/sourceManifest/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1334];
}
else {
vErrors.push(err1334);
}
errors++;
}
var _valid14 = _errs913 === errors;
valid198 = valid198 || _valid14;
const _errs915 = errors;
if(data419 !== null){
const err1335 = {instancePath:instancePath+"/split/draft/sourceManifest",schemaPath:"#/properties/split/properties/draft/properties/sourceManifest/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1335];
}
else {
vErrors.push(err1335);
}
errors++;
}
var _valid14 = _errs915 === errors;
valid198 = valid198 || _valid14;
if(!valid198){
const err1336 = {instancePath:instancePath+"/split/draft/sourceManifest",schemaPath:"#/properties/split/properties/draft/properties/sourceManifest/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1336];
}
else {
vErrors.push(err1336);
}
errors++;
}
else {
errors = _errs912;
if(vErrors !== null){
if(_errs912){
vErrors.length = _errs912;
}
else {
vErrors = null;
}
}
}
}
if(data415.canvas !== undefined){
let data420 = data415.canvas;
if(data420 && typeof data420 == "object" && !Array.isArray(data420)){
if(data420.width === undefined){
const err1337 = {instancePath:instancePath+"/split/draft/canvas",schemaPath:"#/properties/split/properties/draft/properties/canvas/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1337];
}
else {
vErrors.push(err1337);
}
errors++;
}
if(data420.height === undefined){
const err1338 = {instancePath:instancePath+"/split/draft/canvas",schemaPath:"#/properties/split/properties/draft/properties/canvas/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1338];
}
else {
vErrors.push(err1338);
}
errors++;
}
for(const key74 in data420){
if(!((key74 === "width") || (key74 === "height"))){
const err1339 = {instancePath:instancePath+"/split/draft/canvas",schemaPath:"#/properties/split/properties/draft/properties/canvas/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key74},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1339];
}
else {
vErrors.push(err1339);
}
errors++;
}
}
if(data420.width !== undefined){
let data421 = data420.width;
if(!(((typeof data421 == "number") && (!(data421 % 1) && !isNaN(data421))) && (isFinite(data421)))){
const err1340 = {instancePath:instancePath+"/split/draft/canvas/width",schemaPath:"#/properties/split/properties/draft/properties/canvas/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1340];
}
else {
vErrors.push(err1340);
}
errors++;
}
if((typeof data421 == "number") && (isFinite(data421))){
if(data421 > 4096 || isNaN(data421)){
const err1341 = {instancePath:instancePath+"/split/draft/canvas/width",schemaPath:"#/properties/split/properties/draft/properties/canvas/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1341];
}
else {
vErrors.push(err1341);
}
errors++;
}
if(data421 < 1 || isNaN(data421)){
const err1342 = {instancePath:instancePath+"/split/draft/canvas/width",schemaPath:"#/properties/split/properties/draft/properties/canvas/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1342];
}
else {
vErrors.push(err1342);
}
errors++;
}
}
}
if(data420.height !== undefined){
let data422 = data420.height;
if(!(((typeof data422 == "number") && (!(data422 % 1) && !isNaN(data422))) && (isFinite(data422)))){
const err1343 = {instancePath:instancePath+"/split/draft/canvas/height",schemaPath:"#/properties/split/properties/draft/properties/canvas/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1343];
}
else {
vErrors.push(err1343);
}
errors++;
}
if((typeof data422 == "number") && (isFinite(data422))){
if(data422 > 4096 || isNaN(data422)){
const err1344 = {instancePath:instancePath+"/split/draft/canvas/height",schemaPath:"#/properties/split/properties/draft/properties/canvas/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1344];
}
else {
vErrors.push(err1344);
}
errors++;
}
if(data422 < 1 || isNaN(data422)){
const err1345 = {instancePath:instancePath+"/split/draft/canvas/height",schemaPath:"#/properties/split/properties/draft/properties/canvas/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1345];
}
else {
vErrors.push(err1345);
}
errors++;
}
}
}
}
else {
const err1346 = {instancePath:instancePath+"/split/draft/canvas",schemaPath:"#/properties/split/properties/draft/properties/canvas/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1346];
}
else {
vErrors.push(err1346);
}
errors++;
}
}
if(data415.layout !== undefined){
let data423 = data415.layout;
if(!(((data423 === "manifest") || (data423 === "common")) || (data423 === "cropped"))){
const err1347 = {instancePath:instancePath+"/split/draft/layout",schemaPath:"#/properties/split/properties/draft/properties/layout/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.layout.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1347];
}
else {
vErrors.push(err1347);
}
errors++;
}
}
if(data415.layoutConfirmed !== undefined){
if(typeof data415.layoutConfirmed !== "boolean"){
const err1348 = {instancePath:instancePath+"/split/draft/layoutConfirmed",schemaPath:"#/properties/split/properties/draft/properties/layoutConfirmed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1348];
}
else {
vErrors.push(err1348);
}
errors++;
}
}
if(data415.limitedAccepted !== undefined){
if(typeof data415.limitedAccepted !== "boolean"){
const err1349 = {instancePath:instancePath+"/split/draft/limitedAccepted",schemaPath:"#/properties/split/properties/draft/properties/limitedAccepted/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1349];
}
else {
vErrors.push(err1349);
}
errors++;
}
}
if(data415.omittedAccepted !== undefined){
if(typeof data415.omittedAccepted !== "boolean"){
const err1350 = {instancePath:instancePath+"/split/draft/omittedAccepted",schemaPath:"#/properties/split/properties/draft/properties/omittedAccepted/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1350];
}
else {
vErrors.push(err1350);
}
errors++;
}
}
if(data415.layers !== undefined){
let data427 = data415.layers;
if(Array.isArray(data427)){
if(data427.length > 64){
const err1351 = {instancePath:instancePath+"/split/draft/layers",schemaPath:"#/properties/split/properties/draft/properties/layers/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err1351];
}
else {
vErrors.push(err1351);
}
errors++;
}
if(data427.length < 1){
const err1352 = {instancePath:instancePath+"/split/draft/layers",schemaPath:"#/properties/split/properties/draft/properties/layers/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"};
if(vErrors === null){
vErrors = [err1352];
}
else {
vErrors.push(err1352);
}
errors++;
}
const len54 = data427.length;
for(let i56=0; i56<len54; i56++){
let data428 = data427[i56];
if(data428 && typeof data428 == "object" && !Array.isArray(data428)){
if(data428.id === undefined){
const err1353 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err1353];
}
else {
vErrors.push(err1353);
}
errors++;
}
if(data428.name === undefined){
const err1354 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "name"},message:"must have required property '"+"name"+"'"};
if(vErrors === null){
vErrors = [err1354];
}
else {
vErrors.push(err1354);
}
errors++;
}
if(data428.origin === undefined){
const err1355 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "origin"},message:"must have required property '"+"origin"+"'"};
if(vErrors === null){
vErrors = [err1355];
}
else {
vErrors.push(err1355);
}
errors++;
}
if(data428.z === undefined){
const err1356 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "z"},message:"must have required property '"+"z"+"'"};
if(vErrors === null){
vErrors = [err1356];
}
else {
vErrors.push(err1356);
}
errors++;
}
if(data428.role === undefined){
const err1357 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "role"},message:"must have required property '"+"role"+"'"};
if(vErrors === null){
vErrors = [err1357];
}
else {
vErrors.push(err1357);
}
errors++;
}
if(data428.side === undefined){
const err1358 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "side"},message:"must have required property '"+"side"+"'"};
if(vErrors === null){
vErrors = [err1358];
}
else {
vErrors.push(err1358);
}
errors++;
}
if(data428.visible === undefined){
const err1359 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "visible"},message:"must have required property '"+"visible"+"'"};
if(vErrors === null){
vErrors = [err1359];
}
else {
vErrors.push(err1359);
}
errors++;
}
if(data428.opacity === undefined){
const err1360 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "opacity"},message:"must have required property '"+"opacity"+"'"};
if(vErrors === null){
vErrors = [err1360];
}
else {
vErrors.push(err1360);
}
errors++;
}
if(data428.parentId === undefined){
const err1361 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "parentId"},message:"must have required property '"+"parentId"+"'"};
if(vErrors === null){
vErrors = [err1361];
}
else {
vErrors.push(err1361);
}
errors++;
}
if(data428.groupId === undefined){
const err1362 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "groupId"},message:"must have required property '"+"groupId"+"'"};
if(vErrors === null){
vErrors = [err1362];
}
else {
vErrors.push(err1362);
}
errors++;
}
if(data428.usage === undefined){
const err1363 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "usage"},message:"must have required property '"+"usage"+"'"};
if(vErrors === null){
vErrors = [err1363];
}
else {
vErrors.push(err1363);
}
errors++;
}
if(data428.variantOf === undefined){
const err1364 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "variantOf"},message:"must have required property '"+"variantOf"+"'"};
if(vErrors === null){
vErrors = [err1364];
}
else {
vErrors.push(err1364);
}
errors++;
}
if(data428.state === undefined){
const err1365 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "state"},message:"must have required property '"+"state"+"'"};
if(vErrors === null){
vErrors = [err1365];
}
else {
vErrors.push(err1365);
}
errors++;
}
if(data428.positionConfirmed === undefined){
const err1366 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "positionConfirmed"},message:"must have required property '"+"positionConfirmed"+"'"};
if(vErrors === null){
vErrors = [err1366];
}
else {
vErrors.push(err1366);
}
errors++;
}
if(data428.roleConfirmed === undefined){
const err1367 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "roleConfirmed"},message:"must have required property '"+"roleConfirmed"+"'"};
if(vErrors === null){
vErrors = [err1367];
}
else {
vErrors.push(err1367);
}
errors++;
}
if(data428.sourceId === undefined){
const err1368 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "sourceId"},message:"must have required property '"+"sourceId"+"'"};
if(vErrors === null){
vErrors = [err1368];
}
else {
vErrors.push(err1368);
}
errors++;
}
if(data428.sourceName === undefined){
const err1369 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "sourceName"},message:"must have required property '"+"sourceName"+"'"};
if(vErrors === null){
vErrors = [err1369];
}
else {
vErrors.push(err1369);
}
errors++;
}
if(data428.sourcePath === undefined){
const err1370 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "sourcePath"},message:"must have required property '"+"sourcePath"+"'"};
if(vErrors === null){
vErrors = [err1370];
}
else {
vErrors.push(err1370);
}
errors++;
}
if(data428.sourceZ === undefined){
const err1371 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "sourceZ"},message:"must have required property '"+"sourceZ"+"'"};
if(vErrors === null){
vErrors = [err1371];
}
else {
vErrors.push(err1371);
}
errors++;
}
if(data428.sourceOrigin === undefined){
const err1372 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "sourceOrigin"},message:"must have required property '"+"sourceOrigin"+"'"};
if(vErrors === null){
vErrors = [err1372];
}
else {
vErrors.push(err1372);
}
errors++;
}
if(data428.originalAssetId === undefined){
const err1373 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "originalAssetId"},message:"must have required property '"+"originalAssetId"+"'"};
if(vErrors === null){
vErrors = [err1373];
}
else {
vErrors.push(err1373);
}
errors++;
}
if(data428.imageAssetId === undefined){
const err1374 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "imageAssetId"},message:"must have required property '"+"imageAssetId"+"'"};
if(vErrors === null){
vErrors = [err1374];
}
else {
vErrors.push(err1374);
}
errors++;
}
if(data428.sourceHash === undefined){
const err1375 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "sourceHash"},message:"must have required property '"+"sourceHash"+"'"};
if(vErrors === null){
vErrors = [err1375];
}
else {
vErrors.push(err1375);
}
errors++;
}
if(data428.imageHash === undefined){
const err1376 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "imageHash"},message:"must have required property '"+"imageHash"+"'"};
if(vErrors === null){
vErrors = [err1376];
}
else {
vErrors.push(err1376);
}
errors++;
}
if(data428.image === undefined){
const err1377 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "image"},message:"must have required property '"+"image"+"'"};
if(vErrors === null){
vErrors = [err1377];
}
else {
vErrors.push(err1377);
}
errors++;
}
if(data428.proposal === undefined){
const err1378 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/required",keyword:"required",params:{missingProperty: "proposal"},message:"must have required property '"+"proposal"+"'"};
if(vErrors === null){
vErrors = [err1378];
}
else {
vErrors.push(err1378);
}
errors++;
}
for(const key75 in data428){
if(!(func1.call(schema31.properties.split.properties.draft.properties.layers.items.properties, key75))){
const err1379 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key75},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1379];
}
else {
vErrors.push(err1379);
}
errors++;
}
}
if(data428.id !== undefined){
let data429 = data428.id;
if(typeof data429 === "string"){
if(func2(data429) > 64){
const err1380 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/id",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1380];
}
else {
vErrors.push(err1380);
}
errors++;
}
if(func2(data429) < 1){
const err1381 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/id",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1381];
}
else {
vErrors.push(err1381);
}
errors++;
}
if(!pattern4.test(data429)){
const err1382 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/id",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1382];
}
else {
vErrors.push(err1382);
}
errors++;
}
}
else {
const err1383 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/id",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1383];
}
else {
vErrors.push(err1383);
}
errors++;
}
}
if(data428.name !== undefined){
let data430 = data428.name;
if(typeof data430 === "string"){
if(func2(data430) > 120){
const err1384 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/name",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/name/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err1384];
}
else {
vErrors.push(err1384);
}
errors++;
}
if(func2(data430) < 1){
const err1385 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/name",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1385];
}
else {
vErrors.push(err1385);
}
errors++;
}
}
else {
const err1386 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/name",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1386];
}
else {
vErrors.push(err1386);
}
errors++;
}
}
if(data428.origin !== undefined){
let data431 = data428.origin;
if(Array.isArray(data431)){
if(data431.length > 2){
const err1387 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/origin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/origin/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err1387];
}
else {
vErrors.push(err1387);
}
errors++;
}
if(data431.length < 2){
const err1388 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/origin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/origin/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err1388];
}
else {
vErrors.push(err1388);
}
errors++;
}
const len55 = data431.length;
for(let i57=0; i57<len55; i57++){
let data432 = data431[i57];
if(!((typeof data432 == "number") && (isFinite(data432)))){
const err1389 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/origin/" + i57,schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/origin/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1389];
}
else {
vErrors.push(err1389);
}
errors++;
}
}
}
else {
const err1390 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/origin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/origin/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1390];
}
else {
vErrors.push(err1390);
}
errors++;
}
}
if(data428.z !== undefined){
let data433 = data428.z;
if(!(((typeof data433 == "number") && (!(data433 % 1) && !isNaN(data433))) && (isFinite(data433)))){
const err1391 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/z",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/z/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1391];
}
else {
vErrors.push(err1391);
}
errors++;
}
if((typeof data433 == "number") && (isFinite(data433))){
if(data433 > 100000 || isNaN(data433)){
const err1392 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/z",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/z/maximum",keyword:"maximum",params:{comparison: "<=", limit: 100000},message:"must be <= 100000"};
if(vErrors === null){
vErrors = [err1392];
}
else {
vErrors.push(err1392);
}
errors++;
}
if(data433 < -100000 || isNaN(data433)){
const err1393 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/z",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/z/minimum",keyword:"minimum",params:{comparison: ">=", limit: -100000},message:"must be >= -100000"};
if(vErrors === null){
vErrors = [err1393];
}
else {
vErrors.push(err1393);
}
errors++;
}
}
}
if(data428.role !== undefined){
let data434 = data428.role;
if(!(((((((((data434 === "base") || (data434 === "body")) || (data434 === "head")) || (data434 === "hair-front")) || (data434 === "hair-back")) || (data434 === "eye")) || (data434 === "mouth")) || (data434 === "accessory")) || (data434 === "custom"))){
const err1394 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/role",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/role/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.layers.items.properties.role.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1394];
}
else {
vErrors.push(err1394);
}
errors++;
}
}
if(data428.side !== undefined){
let data435 = data428.side;
if(!((((data435 === "character-left") || (data435 === "character-right")) || (data435 === "center")) || (data435 === "none"))){
const err1395 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/side",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/side/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.layers.items.properties.side.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1395];
}
else {
vErrors.push(err1395);
}
errors++;
}
}
if(data428.visible !== undefined){
if(typeof data428.visible !== "boolean"){
const err1396 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/visible",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/visible/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1396];
}
else {
vErrors.push(err1396);
}
errors++;
}
}
if(data428.opacity !== undefined){
let data437 = data428.opacity;
if((typeof data437 == "number") && (isFinite(data437))){
if(data437 > 1 || isNaN(data437)){
const err1397 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/opacity",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/opacity/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err1397];
}
else {
vErrors.push(err1397);
}
errors++;
}
if(data437 < 0 || isNaN(data437)){
const err1398 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/opacity",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/opacity/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1398];
}
else {
vErrors.push(err1398);
}
errors++;
}
}
else {
const err1399 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/opacity",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/opacity/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1399];
}
else {
vErrors.push(err1399);
}
errors++;
}
}
if(data428.parentId !== undefined){
let data438 = data428.parentId;
const _errs953 = errors;
let valid205 = false;
const _errs954 = errors;
if(typeof data438 === "string"){
if(func2(data438) > 64){
const err1400 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/parentId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/parentId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1400];
}
else {
vErrors.push(err1400);
}
errors++;
}
if(func2(data438) < 1){
const err1401 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/parentId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/parentId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1401];
}
else {
vErrors.push(err1401);
}
errors++;
}
if(!pattern4.test(data438)){
const err1402 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/parentId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/parentId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1402];
}
else {
vErrors.push(err1402);
}
errors++;
}
}
else {
const err1403 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/parentId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/parentId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1403];
}
else {
vErrors.push(err1403);
}
errors++;
}
var _valid15 = _errs954 === errors;
valid205 = valid205 || _valid15;
const _errs956 = errors;
if(data438 !== null){
const err1404 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/parentId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/parentId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1404];
}
else {
vErrors.push(err1404);
}
errors++;
}
var _valid15 = _errs956 === errors;
valid205 = valid205 || _valid15;
if(!valid205){
const err1405 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/parentId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/parentId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1405];
}
else {
vErrors.push(err1405);
}
errors++;
}
else {
errors = _errs953;
if(vErrors !== null){
if(_errs953){
vErrors.length = _errs953;
}
else {
vErrors = null;
}
}
}
}
if(data428.groupId !== undefined){
let data439 = data428.groupId;
const _errs959 = errors;
let valid206 = false;
const _errs960 = errors;
if(typeof data439 === "string"){
if(func2(data439) > 64){
const err1406 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/groupId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/groupId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1406];
}
else {
vErrors.push(err1406);
}
errors++;
}
if(func2(data439) < 1){
const err1407 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/groupId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/groupId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1407];
}
else {
vErrors.push(err1407);
}
errors++;
}
if(!pattern4.test(data439)){
const err1408 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/groupId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/groupId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1408];
}
else {
vErrors.push(err1408);
}
errors++;
}
}
else {
const err1409 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/groupId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/groupId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1409];
}
else {
vErrors.push(err1409);
}
errors++;
}
var _valid16 = _errs960 === errors;
valid206 = valid206 || _valid16;
const _errs962 = errors;
if(data439 !== null){
const err1410 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/groupId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/groupId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1410];
}
else {
vErrors.push(err1410);
}
errors++;
}
var _valid16 = _errs962 === errors;
valid206 = valid206 || _valid16;
if(!valid206){
const err1411 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/groupId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/groupId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1411];
}
else {
vErrors.push(err1411);
}
errors++;
}
else {
errors = _errs959;
if(vErrors !== null){
if(_errs959){
vErrors.length = _errs959;
}
else {
vErrors = null;
}
}
}
}
if(data428.usage !== undefined){
let data440 = data428.usage;
if(!(((data440 === "primary") || (data440 === "auxiliary")) || (data440 === "alternative"))){
const err1412 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/usage",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/usage/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.layers.items.properties.usage.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1412];
}
else {
vErrors.push(err1412);
}
errors++;
}
}
if(data428.variantOf !== undefined){
let data441 = data428.variantOf;
const _errs966 = errors;
let valid207 = false;
const _errs967 = errors;
if(typeof data441 === "string"){
if(func2(data441) > 64){
const err1413 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/variantOf",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/variantOf/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1413];
}
else {
vErrors.push(err1413);
}
errors++;
}
if(func2(data441) < 1){
const err1414 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/variantOf",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/variantOf/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1414];
}
else {
vErrors.push(err1414);
}
errors++;
}
if(!pattern4.test(data441)){
const err1415 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/variantOf",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/variantOf/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1415];
}
else {
vErrors.push(err1415);
}
errors++;
}
}
else {
const err1416 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/variantOf",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/variantOf/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1416];
}
else {
vErrors.push(err1416);
}
errors++;
}
var _valid17 = _errs967 === errors;
valid207 = valid207 || _valid17;
const _errs969 = errors;
if(data441 !== null){
const err1417 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/variantOf",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/variantOf/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1417];
}
else {
vErrors.push(err1417);
}
errors++;
}
var _valid17 = _errs969 === errors;
valid207 = valid207 || _valid17;
if(!valid207){
const err1418 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/variantOf",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/variantOf/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1418];
}
else {
vErrors.push(err1418);
}
errors++;
}
else {
errors = _errs966;
if(vErrors !== null){
if(_errs966){
vErrors.length = _errs966;
}
else {
vErrors = null;
}
}
}
}
if(data428.state !== undefined){
let data442 = data428.state;
if(!((((data442 === "default") || (data442 === "open")) || (data442 === "closed")) || (data442 === "middle"))){
const err1419 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/state",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/state/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.layers.items.properties.state.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1419];
}
else {
vErrors.push(err1419);
}
errors++;
}
}
if(data428.positionConfirmed !== undefined){
if(typeof data428.positionConfirmed !== "boolean"){
const err1420 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/positionConfirmed",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/positionConfirmed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1420];
}
else {
vErrors.push(err1420);
}
errors++;
}
}
if(data428.roleConfirmed !== undefined){
if(typeof data428.roleConfirmed !== "boolean"){
const err1421 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/roleConfirmed",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/roleConfirmed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1421];
}
else {
vErrors.push(err1421);
}
errors++;
}
}
if(data428.sourceId !== undefined){
let data445 = data428.sourceId;
if(typeof data445 === "string"){
if(func2(data445) > 128){
const err1422 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceId/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1422];
}
else {
vErrors.push(err1422);
}
errors++;
}
if(func2(data445) < 1){
const err1423 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1423];
}
else {
vErrors.push(err1423);
}
errors++;
}
}
else {
const err1424 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1424];
}
else {
vErrors.push(err1424);
}
errors++;
}
}
if(data428.sourceName !== undefined){
let data446 = data428.sourceName;
if(typeof data446 === "string"){
if(func2(data446) > 120){
const err1425 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceName",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceName/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err1425];
}
else {
vErrors.push(err1425);
}
errors++;
}
if(func2(data446) < 1){
const err1426 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceName",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceName/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1426];
}
else {
vErrors.push(err1426);
}
errors++;
}
}
else {
const err1427 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceName",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1427];
}
else {
vErrors.push(err1427);
}
errors++;
}
}
if(data428.sourcePath !== undefined){
let data447 = data428.sourcePath;
if(typeof data447 === "string"){
if(func2(data447) > 240){
const err1428 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourcePath",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourcePath/maxLength",keyword:"maxLength",params:{limit: 240},message:"must NOT have more than 240 characters"};
if(vErrors === null){
vErrors = [err1428];
}
else {
vErrors.push(err1428);
}
errors++;
}
if(func2(data447) < 1){
const err1429 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourcePath",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourcePath/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1429];
}
else {
vErrors.push(err1429);
}
errors++;
}
}
else {
const err1430 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourcePath",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourcePath/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1430];
}
else {
vErrors.push(err1430);
}
errors++;
}
}
if(data428.sourceZ !== undefined){
let data448 = data428.sourceZ;
const _errs983 = errors;
let valid208 = false;
const _errs984 = errors;
if(!(((typeof data448 == "number") && (!(data448 % 1) && !isNaN(data448))) && (isFinite(data448)))){
const err1431 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceZ",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceZ/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1431];
}
else {
vErrors.push(err1431);
}
errors++;
}
if((typeof data448 == "number") && (isFinite(data448))){
if(data448 > 100000 || isNaN(data448)){
const err1432 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceZ",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceZ/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 100000},message:"must be <= 100000"};
if(vErrors === null){
vErrors = [err1432];
}
else {
vErrors.push(err1432);
}
errors++;
}
if(data448 < -100000 || isNaN(data448)){
const err1433 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceZ",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceZ/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: -100000},message:"must be >= -100000"};
if(vErrors === null){
vErrors = [err1433];
}
else {
vErrors.push(err1433);
}
errors++;
}
}
var _valid18 = _errs984 === errors;
valid208 = valid208 || _valid18;
const _errs986 = errors;
if(data448 !== null){
const err1434 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceZ",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceZ/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1434];
}
else {
vErrors.push(err1434);
}
errors++;
}
var _valid18 = _errs986 === errors;
valid208 = valid208 || _valid18;
if(!valid208){
const err1435 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceZ",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceZ/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1435];
}
else {
vErrors.push(err1435);
}
errors++;
}
else {
errors = _errs983;
if(vErrors !== null){
if(_errs983){
vErrors.length = _errs983;
}
else {
vErrors = null;
}
}
}
}
if(data428.sourceOrigin !== undefined){
let data449 = data428.sourceOrigin;
const _errs989 = errors;
let valid209 = false;
const _errs990 = errors;
if(Array.isArray(data449)){
if(data449.length > 2){
const err1436 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceOrigin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceOrigin/anyOf/0/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err1436];
}
else {
vErrors.push(err1436);
}
errors++;
}
if(data449.length < 2){
const err1437 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceOrigin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceOrigin/anyOf/0/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err1437];
}
else {
vErrors.push(err1437);
}
errors++;
}
const len56 = data449.length;
for(let i58=0; i58<len56; i58++){
let data450 = data449[i58];
if(!((typeof data450 == "number") && (isFinite(data450)))){
const err1438 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceOrigin/" + i58,schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceOrigin/anyOf/0/items/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1438];
}
else {
vErrors.push(err1438);
}
errors++;
}
}
}
else {
const err1439 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceOrigin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceOrigin/anyOf/0/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1439];
}
else {
vErrors.push(err1439);
}
errors++;
}
var _valid19 = _errs990 === errors;
valid209 = valid209 || _valid19;
const _errs994 = errors;
if(data449 !== null){
const err1440 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceOrigin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceOrigin/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1440];
}
else {
vErrors.push(err1440);
}
errors++;
}
var _valid19 = _errs994 === errors;
valid209 = valid209 || _valid19;
if(!valid209){
const err1441 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceOrigin",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceOrigin/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1441];
}
else {
vErrors.push(err1441);
}
errors++;
}
else {
errors = _errs989;
if(vErrors !== null){
if(_errs989){
vErrors.length = _errs989;
}
else {
vErrors = null;
}
}
}
}
if(data428.originalAssetId !== undefined){
let data451 = data428.originalAssetId;
if(typeof data451 === "string"){
if(func2(data451) > 64){
const err1442 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/originalAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/originalAssetId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1442];
}
else {
vErrors.push(err1442);
}
errors++;
}
if(func2(data451) < 1){
const err1443 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/originalAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/originalAssetId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1443];
}
else {
vErrors.push(err1443);
}
errors++;
}
if(!pattern4.test(data451)){
const err1444 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/originalAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/originalAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1444];
}
else {
vErrors.push(err1444);
}
errors++;
}
}
else {
const err1445 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/originalAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/originalAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1445];
}
else {
vErrors.push(err1445);
}
errors++;
}
}
if(data428.imageAssetId !== undefined){
let data452 = data428.imageAssetId;
if(typeof data452 === "string"){
if(func2(data452) > 64){
const err1446 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/imageAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/imageAssetId/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1446];
}
else {
vErrors.push(err1446);
}
errors++;
}
if(func2(data452) < 1){
const err1447 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/imageAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/imageAssetId/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1447];
}
else {
vErrors.push(err1447);
}
errors++;
}
if(!pattern4.test(data452)){
const err1448 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/imageAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/imageAssetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1448];
}
else {
vErrors.push(err1448);
}
errors++;
}
}
else {
const err1449 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/imageAssetId",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/imageAssetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1449];
}
else {
vErrors.push(err1449);
}
errors++;
}
}
if(data428.sourceHash !== undefined){
let data453 = data428.sourceHash;
if(typeof data453 === "string"){
if(!pattern11.test(data453)){
const err1450 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceHash",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceHash/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""};
if(vErrors === null){
vErrors = [err1450];
}
else {
vErrors.push(err1450);
}
errors++;
}
}
else {
const err1451 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/sourceHash",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/sourceHash/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1451];
}
else {
vErrors.push(err1451);
}
errors++;
}
}
if(data428.imageHash !== undefined){
let data454 = data428.imageHash;
if(typeof data454 === "string"){
if(!pattern11.test(data454)){
const err1452 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/imageHash",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/imageHash/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""};
if(vErrors === null){
vErrors = [err1452];
}
else {
vErrors.push(err1452);
}
errors++;
}
}
else {
const err1453 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/imageHash",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/imageHash/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1453];
}
else {
vErrors.push(err1453);
}
errors++;
}
}
if(data428.image !== undefined){
let data455 = data428.image;
if(data455 && typeof data455 == "object" && !Array.isArray(data455)){
if(data455.key === undefined){
const err1454 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/required",keyword:"required",params:{missingProperty: "key"},message:"must have required property '"+"key"+"'"};
if(vErrors === null){
vErrors = [err1454];
}
else {
vErrors.push(err1454);
}
errors++;
}
if(data455.width === undefined){
const err1455 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1455];
}
else {
vErrors.push(err1455);
}
errors++;
}
if(data455.height === undefined){
const err1456 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1456];
}
else {
vErrors.push(err1456);
}
errors++;
}
if(data455.bounds === undefined){
const err1457 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/required",keyword:"required",params:{missingProperty: "bounds"},message:"must have required property '"+"bounds"+"'"};
if(vErrors === null){
vErrors = [err1457];
}
else {
vErrors.push(err1457);
}
errors++;
}
if(data455.empty === undefined){
const err1458 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/required",keyword:"required",params:{missingProperty: "empty"},message:"must have required property '"+"empty"+"'"};
if(vErrors === null){
vErrors = [err1458];
}
else {
vErrors.push(err1458);
}
errors++;
}
if(data455.opaque === undefined){
const err1459 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/required",keyword:"required",params:{missingProperty: "opaque"},message:"must have required property '"+"opaque"+"'"};
if(vErrors === null){
vErrors = [err1459];
}
else {
vErrors.push(err1459);
}
errors++;
}
if(data455.iccConverted === undefined){
const err1460 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/required",keyword:"required",params:{missingProperty: "iccConverted"},message:"must have required property '"+"iccConverted"+"'"};
if(vErrors === null){
vErrors = [err1460];
}
else {
vErrors.push(err1460);
}
errors++;
}
for(const key76 in data455){
if(!(((((((key76 === "key") || (key76 === "width")) || (key76 === "height")) || (key76 === "bounds")) || (key76 === "empty")) || (key76 === "opaque")) || (key76 === "iccConverted"))){
const err1461 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key76},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1461];
}
else {
vErrors.push(err1461);
}
errors++;
}
}
if(data455.key !== undefined){
let data456 = data455.key;
if(typeof data456 === "string"){
if(!pattern11.test(data456)){
const err1462 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/key",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/key/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""};
if(vErrors === null){
vErrors = [err1462];
}
else {
vErrors.push(err1462);
}
errors++;
}
}
else {
const err1463 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/key",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/key/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1463];
}
else {
vErrors.push(err1463);
}
errors++;
}
}
if(data455.width !== undefined){
let data457 = data455.width;
if(!(((typeof data457 == "number") && (!(data457 % 1) && !isNaN(data457))) && (isFinite(data457)))){
const err1464 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/width",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/width/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1464];
}
else {
vErrors.push(err1464);
}
errors++;
}
if((typeof data457 == "number") && (isFinite(data457))){
if(data457 > 4096 || isNaN(data457)){
const err1465 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/width",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/width/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1465];
}
else {
vErrors.push(err1465);
}
errors++;
}
if(data457 < 1 || isNaN(data457)){
const err1466 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/width",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
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
if(data455.height !== undefined){
let data458 = data455.height;
if(!(((typeof data458 == "number") && (!(data458 % 1) && !isNaN(data458))) && (isFinite(data458)))){
const err1467 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/height",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/height/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err1467];
}
else {
vErrors.push(err1467);
}
errors++;
}
if((typeof data458 == "number") && (isFinite(data458))){
if(data458 > 4096 || isNaN(data458)){
const err1468 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/height",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/height/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4096},message:"must be <= 4096"};
if(vErrors === null){
vErrors = [err1468];
}
else {
vErrors.push(err1468);
}
errors++;
}
if(data458 < 1 || isNaN(data458)){
const err1469 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/height",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err1469];
}
else {
vErrors.push(err1469);
}
errors++;
}
}
}
if(data455.bounds !== undefined){
let data459 = data455.bounds;
const _errs1014 = errors;
let valid213 = false;
const _errs1015 = errors;
if(data459 && typeof data459 == "object" && !Array.isArray(data459)){
if(data459.x === undefined){
const err1470 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/required",keyword:"required",params:{missingProperty: "x"},message:"must have required property '"+"x"+"'"};
if(vErrors === null){
vErrors = [err1470];
}
else {
vErrors.push(err1470);
}
errors++;
}
if(data459.y === undefined){
const err1471 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/required",keyword:"required",params:{missingProperty: "y"},message:"must have required property '"+"y"+"'"};
if(vErrors === null){
vErrors = [err1471];
}
else {
vErrors.push(err1471);
}
errors++;
}
if(data459.width === undefined){
const err1472 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/required",keyword:"required",params:{missingProperty: "width"},message:"must have required property '"+"width"+"'"};
if(vErrors === null){
vErrors = [err1472];
}
else {
vErrors.push(err1472);
}
errors++;
}
if(data459.height === undefined){
const err1473 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err1473];
}
else {
vErrors.push(err1473);
}
errors++;
}
for(const key77 in data459){
if(!((((key77 === "x") || (key77 === "y")) || (key77 === "width")) || (key77 === "height"))){
const err1474 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key77},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1474];
}
else {
vErrors.push(err1474);
}
errors++;
}
}
if(data459.x !== undefined){
let data460 = data459.x;
if(!((typeof data460 == "number") && (isFinite(data460)))){
const err1475 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/bounds/x",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1475];
}
else {
vErrors.push(err1475);
}
errors++;
}
}
if(data459.y !== undefined){
let data461 = data459.y;
if(!((typeof data461 == "number") && (isFinite(data461)))){
const err1476 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/bounds/y",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1476];
}
else {
vErrors.push(err1476);
}
errors++;
}
}
if(data459.width !== undefined){
let data462 = data459.width;
if((typeof data462 == "number") && (isFinite(data462))){
if(data462 <= 0 || isNaN(data462)){
const err1477 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/bounds/width",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/properties/width/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1477];
}
else {
vErrors.push(err1477);
}
errors++;
}
}
else {
const err1478 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/bounds/width",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1478];
}
else {
vErrors.push(err1478);
}
errors++;
}
}
if(data459.height !== undefined){
let data463 = data459.height;
if((typeof data463 == "number") && (isFinite(data463))){
if(data463 <= 0 || isNaN(data463)){
const err1479 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/bounds/height",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/properties/height/exclusiveMinimum",keyword:"exclusiveMinimum",params:{comparison: ">", limit: 0},message:"must be > 0"};
if(vErrors === null){
vErrors = [err1479];
}
else {
vErrors.push(err1479);
}
errors++;
}
}
else {
const err1480 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/bounds/height",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1480];
}
else {
vErrors.push(err1480);
}
errors++;
}
}
}
else {
const err1481 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1481];
}
else {
vErrors.push(err1481);
}
errors++;
}
var _valid20 = _errs1015 === errors;
valid213 = valid213 || _valid20;
const _errs1026 = errors;
if(data459 !== null){
const err1482 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1482];
}
else {
vErrors.push(err1482);
}
errors++;
}
var _valid20 = _errs1026 === errors;
valid213 = valid213 || _valid20;
if(!valid213){
const err1483 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/bounds",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/bounds/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1483];
}
else {
vErrors.push(err1483);
}
errors++;
}
else {
errors = _errs1014;
if(vErrors !== null){
if(_errs1014){
vErrors.length = _errs1014;
}
else {
vErrors = null;
}
}
}
}
if(data455.empty !== undefined){
if(typeof data455.empty !== "boolean"){
const err1484 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/empty",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/empty/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1484];
}
else {
vErrors.push(err1484);
}
errors++;
}
}
if(data455.opaque !== undefined){
if(typeof data455.opaque !== "boolean"){
const err1485 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/opaque",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/opaque/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1485];
}
else {
vErrors.push(err1485);
}
errors++;
}
}
if(data455.iccConverted !== undefined){
if(typeof data455.iccConverted !== "boolean"){
const err1486 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image/iccConverted",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/properties/iccConverted/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1486];
}
else {
vErrors.push(err1486);
}
errors++;
}
}
}
else {
const err1487 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/image",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/image/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1487];
}
else {
vErrors.push(err1487);
}
errors++;
}
}
if(data428.proposal !== undefined){
let data467 = data428.proposal;
if(data467 && typeof data467 == "object" && !Array.isArray(data467)){
if(data467.role === undefined){
const err1488 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/required",keyword:"required",params:{missingProperty: "role"},message:"must have required property '"+"role"+"'"};
if(vErrors === null){
vErrors = [err1488];
}
else {
vErrors.push(err1488);
}
errors++;
}
if(data467.side === undefined){
const err1489 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/required",keyword:"required",params:{missingProperty: "side"},message:"must have required property '"+"side"+"'"};
if(vErrors === null){
vErrors = [err1489];
}
else {
vErrors.push(err1489);
}
errors++;
}
if(data467.confidence === undefined){
const err1490 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/required",keyword:"required",params:{missingProperty: "confidence"},message:"must have required property '"+"confidence"+"'"};
if(vErrors === null){
vErrors = [err1490];
}
else {
vErrors.push(err1490);
}
errors++;
}
if(data467.reasons === undefined){
const err1491 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/required",keyword:"required",params:{missingProperty: "reasons"},message:"must have required property '"+"reasons"+"'"};
if(vErrors === null){
vErrors = [err1491];
}
else {
vErrors.push(err1491);
}
errors++;
}
for(const key78 in data467){
if(!((((key78 === "role") || (key78 === "side")) || (key78 === "confidence")) || (key78 === "reasons"))){
const err1492 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key78},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1492];
}
else {
vErrors.push(err1492);
}
errors++;
}
}
if(data467.role !== undefined){
let data468 = data467.role;
if(!(((((((((data468 === "base") || (data468 === "body")) || (data468 === "head")) || (data468 === "hair-front")) || (data468 === "hair-back")) || (data468 === "eye")) || (data468 === "mouth")) || (data468 === "accessory")) || (data468 === "custom"))){
const err1493 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal/role",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/role/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.layers.items.properties.proposal.properties.role.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1493];
}
else {
vErrors.push(err1493);
}
errors++;
}
}
if(data467.side !== undefined){
let data469 = data467.side;
if(!((((data469 === "character-left") || (data469 === "character-right")) || (data469 === "center")) || (data469 === "none"))){
const err1494 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal/side",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/side/enum",keyword:"enum",params:{allowedValues: schema31.properties.split.properties.draft.properties.layers.items.properties.proposal.properties.side.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1494];
}
else {
vErrors.push(err1494);
}
errors++;
}
}
if(data467.confidence !== undefined){
let data470 = data467.confidence;
if((typeof data470 == "number") && (isFinite(data470))){
if(data470 > 1 || isNaN(data470)){
const err1495 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal/confidence",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/confidence/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err1495];
}
else {
vErrors.push(err1495);
}
errors++;
}
if(data470 < 0 || isNaN(data470)){
const err1496 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal/confidence",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/confidence/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1496];
}
else {
vErrors.push(err1496);
}
errors++;
}
}
else {
const err1497 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal/confidence",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/confidence/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1497];
}
else {
vErrors.push(err1497);
}
errors++;
}
}
if(data467.reasons !== undefined){
let data471 = data467.reasons;
if(Array.isArray(data471)){
if(data471.length > 8){
const err1498 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal/reasons",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/reasons/maxItems",keyword:"maxItems",params:{limit: 8},message:"must NOT have more than 8 items"};
if(vErrors === null){
vErrors = [err1498];
}
else {
vErrors.push(err1498);
}
errors++;
}
const len57 = data471.length;
for(let i59=0; i59<len57; i59++){
let data472 = data471[i59];
if(typeof data472 === "string"){
if(func2(data472) > 128){
const err1499 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal/reasons/" + i59,schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/reasons/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1499];
}
else {
vErrors.push(err1499);
}
errors++;
}
if(func2(data472) < 1){
const err1500 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal/reasons/" + i59,schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/reasons/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1500];
}
else {
vErrors.push(err1500);
}
errors++;
}
}
else {
const err1501 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal/reasons/" + i59,schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/reasons/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1501];
}
else {
vErrors.push(err1501);
}
errors++;
}
}
}
else {
const err1502 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal/reasons",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/properties/reasons/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1502];
}
else {
vErrors.push(err1502);
}
errors++;
}
}
}
else {
const err1503 = {instancePath:instancePath+"/split/draft/layers/" + i56+"/proposal",schemaPath:"#/properties/split/properties/draft/properties/layers/items/properties/proposal/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1503];
}
else {
vErrors.push(err1503);
}
errors++;
}
}
}
else {
const err1504 = {instancePath:instancePath+"/split/draft/layers/" + i56,schemaPath:"#/properties/split/properties/draft/properties/layers/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1504];
}
else {
vErrors.push(err1504);
}
errors++;
}
}
}
else {
const err1505 = {instancePath:instancePath+"/split/draft/layers",schemaPath:"#/properties/split/properties/draft/properties/layers/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1505];
}
else {
vErrors.push(err1505);
}
errors++;
}
}
if(data415.groups !== undefined){
let data473 = data415.groups;
if(Array.isArray(data473)){
if(data473.length > 128){
const err1506 = {instancePath:instancePath+"/split/draft/groups",schemaPath:"#/properties/split/properties/draft/properties/groups/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err1506];
}
else {
vErrors.push(err1506);
}
errors++;
}
const len58 = data473.length;
for(let i60=0; i60<len58; i60++){
let data474 = data473[i60];
if(data474 && typeof data474 == "object" && !Array.isArray(data474)){
if(data474.id === undefined){
const err1507 = {instancePath:instancePath+"/split/draft/groups/" + i60,schemaPath:"#/properties/split/properties/draft/properties/groups/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err1507];
}
else {
vErrors.push(err1507);
}
errors++;
}
if(data474.name === undefined){
const err1508 = {instancePath:instancePath+"/split/draft/groups/" + i60,schemaPath:"#/properties/split/properties/draft/properties/groups/items/required",keyword:"required",params:{missingProperty: "name"},message:"must have required property '"+"name"+"'"};
if(vErrors === null){
vErrors = [err1508];
}
else {
vErrors.push(err1508);
}
errors++;
}
if(data474.parentGroupId === undefined){
const err1509 = {instancePath:instancePath+"/split/draft/groups/" + i60,schemaPath:"#/properties/split/properties/draft/properties/groups/items/required",keyword:"required",params:{missingProperty: "parentGroupId"},message:"must have required property '"+"parentGroupId"+"'"};
if(vErrors === null){
vErrors = [err1509];
}
else {
vErrors.push(err1509);
}
errors++;
}
if(data474.visible === undefined){
const err1510 = {instancePath:instancePath+"/split/draft/groups/" + i60,schemaPath:"#/properties/split/properties/draft/properties/groups/items/required",keyword:"required",params:{missingProperty: "visible"},message:"must have required property '"+"visible"+"'"};
if(vErrors === null){
vErrors = [err1510];
}
else {
vErrors.push(err1510);
}
errors++;
}
if(data474.opacity === undefined){
const err1511 = {instancePath:instancePath+"/split/draft/groups/" + i60,schemaPath:"#/properties/split/properties/draft/properties/groups/items/required",keyword:"required",params:{missingProperty: "opacity"},message:"must have required property '"+"opacity"+"'"};
if(vErrors === null){
vErrors = [err1511];
}
else {
vErrors.push(err1511);
}
errors++;
}
for(const key79 in data474){
if(!(((((key79 === "id") || (key79 === "name")) || (key79 === "parentGroupId")) || (key79 === "visible")) || (key79 === "opacity"))){
const err1512 = {instancePath:instancePath+"/split/draft/groups/" + i60,schemaPath:"#/properties/split/properties/draft/properties/groups/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key79},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1512];
}
else {
vErrors.push(err1512);
}
errors++;
}
}
if(data474.id !== undefined){
let data475 = data474.id;
if(typeof data475 === "string"){
if(func2(data475) > 64){
const err1513 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/id",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/id/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1513];
}
else {
vErrors.push(err1513);
}
errors++;
}
if(func2(data475) < 1){
const err1514 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/id",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1514];
}
else {
vErrors.push(err1514);
}
errors++;
}
if(!pattern4.test(data475)){
const err1515 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/id",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1515];
}
else {
vErrors.push(err1515);
}
errors++;
}
}
else {
const err1516 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/id",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1516];
}
else {
vErrors.push(err1516);
}
errors++;
}
}
if(data474.name !== undefined){
let data476 = data474.name;
if(typeof data476 === "string"){
if(func2(data476) > 120){
const err1517 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/name",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/name/maxLength",keyword:"maxLength",params:{limit: 120},message:"must NOT have more than 120 characters"};
if(vErrors === null){
vErrors = [err1517];
}
else {
vErrors.push(err1517);
}
errors++;
}
if(func2(data476) < 1){
const err1518 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/name",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1518];
}
else {
vErrors.push(err1518);
}
errors++;
}
}
else {
const err1519 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/name",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1519];
}
else {
vErrors.push(err1519);
}
errors++;
}
}
if(data474.parentGroupId !== undefined){
let data477 = data474.parentGroupId;
const _errs1055 = errors;
let valid221 = false;
const _errs1056 = errors;
if(typeof data477 === "string"){
if(func2(data477) > 64){
const err1520 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/parentGroupId",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/parentGroupId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 64},message:"must NOT have more than 64 characters"};
if(vErrors === null){
vErrors = [err1520];
}
else {
vErrors.push(err1520);
}
errors++;
}
if(func2(data477) < 1){
const err1521 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/parentGroupId",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/parentGroupId/anyOf/0/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1521];
}
else {
vErrors.push(err1521);
}
errors++;
}
if(!pattern4.test(data477)){
const err1522 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/parentGroupId",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/parentGroupId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err1522];
}
else {
vErrors.push(err1522);
}
errors++;
}
}
else {
const err1523 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/parentGroupId",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/parentGroupId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1523];
}
else {
vErrors.push(err1523);
}
errors++;
}
var _valid21 = _errs1056 === errors;
valid221 = valid221 || _valid21;
const _errs1058 = errors;
if(data477 !== null){
const err1524 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/parentGroupId",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/parentGroupId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1524];
}
else {
vErrors.push(err1524);
}
errors++;
}
var _valid21 = _errs1058 === errors;
valid221 = valid221 || _valid21;
if(!valid221){
const err1525 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/parentGroupId",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/parentGroupId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err1525];
}
else {
vErrors.push(err1525);
}
errors++;
}
else {
errors = _errs1055;
if(vErrors !== null){
if(_errs1055){
vErrors.length = _errs1055;
}
else {
vErrors = null;
}
}
}
}
if(data474.visible !== undefined){
if(typeof data474.visible !== "boolean"){
const err1526 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/visible",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/visible/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err1526];
}
else {
vErrors.push(err1526);
}
errors++;
}
}
if(data474.opacity !== undefined){
let data479 = data474.opacity;
if((typeof data479 == "number") && (isFinite(data479))){
if(data479 > 1 || isNaN(data479)){
const err1527 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/opacity",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/opacity/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err1527];
}
else {
vErrors.push(err1527);
}
errors++;
}
if(data479 < 0 || isNaN(data479)){
const err1528 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/opacity",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/opacity/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err1528];
}
else {
vErrors.push(err1528);
}
errors++;
}
}
else {
const err1529 = {instancePath:instancePath+"/split/draft/groups/" + i60+"/opacity",schemaPath:"#/properties/split/properties/draft/properties/groups/items/properties/opacity/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1529];
}
else {
vErrors.push(err1529);
}
errors++;
}
}
}
else {
const err1530 = {instancePath:instancePath+"/split/draft/groups/" + i60,schemaPath:"#/properties/split/properties/draft/properties/groups/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
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
const err1531 = {instancePath:instancePath+"/split/draft/groups",schemaPath:"#/properties/split/properties/draft/properties/groups/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1531];
}
else {
vErrors.push(err1531);
}
errors++;
}
}
if(data415.missingProperties !== undefined){
let data480 = data415.missingProperties;
if(Array.isArray(data480)){
if(data480.length > 32){
const err1532 = {instancePath:instancePath+"/split/draft/missingProperties",schemaPath:"#/properties/split/properties/draft/properties/missingProperties/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err1532];
}
else {
vErrors.push(err1532);
}
errors++;
}
const len59 = data480.length;
for(let i61=0; i61<len59; i61++){
let data481 = data480[i61];
if(typeof data481 === "string"){
if(func2(data481) > 128){
const err1533 = {instancePath:instancePath+"/split/draft/missingProperties/" + i61,schemaPath:"#/properties/split/properties/draft/properties/missingProperties/items/maxLength",keyword:"maxLength",params:{limit: 128},message:"must NOT have more than 128 characters"};
if(vErrors === null){
vErrors = [err1533];
}
else {
vErrors.push(err1533);
}
errors++;
}
if(func2(data481) < 1){
const err1534 = {instancePath:instancePath+"/split/draft/missingProperties/" + i61,schemaPath:"#/properties/split/properties/draft/properties/missingProperties/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1534];
}
else {
vErrors.push(err1534);
}
errors++;
}
}
else {
const err1535 = {instancePath:instancePath+"/split/draft/missingProperties/" + i61,schemaPath:"#/properties/split/properties/draft/properties/missingProperties/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1535];
}
else {
vErrors.push(err1535);
}
errors++;
}
}
}
else {
const err1536 = {instancePath:instancePath+"/split/draft/missingProperties",schemaPath:"#/properties/split/properties/draft/properties/missingProperties/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1536];
}
else {
vErrors.push(err1536);
}
errors++;
}
}
if(data415.omitted !== undefined){
let data482 = data415.omitted;
if(Array.isArray(data482)){
if(data482.length > 128){
const err1537 = {instancePath:instancePath+"/split/draft/omitted",schemaPath:"#/properties/split/properties/draft/properties/omitted/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err1537];
}
else {
vErrors.push(err1537);
}
errors++;
}
const len60 = data482.length;
for(let i62=0; i62<len60; i62++){
let data483 = data482[i62];
if(typeof data483 === "string"){
if(func2(data483) > 240){
const err1538 = {instancePath:instancePath+"/split/draft/omitted/" + i62,schemaPath:"#/properties/split/properties/draft/properties/omitted/items/maxLength",keyword:"maxLength",params:{limit: 240},message:"must NOT have more than 240 characters"};
if(vErrors === null){
vErrors = [err1538];
}
else {
vErrors.push(err1538);
}
errors++;
}
if(func2(data483) < 1){
const err1539 = {instancePath:instancePath+"/split/draft/omitted/" + i62,schemaPath:"#/properties/split/properties/draft/properties/omitted/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err1539];
}
else {
vErrors.push(err1539);
}
errors++;
}
}
else {
const err1540 = {instancePath:instancePath+"/split/draft/omitted/" + i62,schemaPath:"#/properties/split/properties/draft/properties/omitted/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1540];
}
else {
vErrors.push(err1540);
}
errors++;
}
}
}
else {
const err1541 = {instancePath:instancePath+"/split/draft/omitted",schemaPath:"#/properties/split/properties/draft/properties/omitted/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1541];
}
else {
vErrors.push(err1541);
}
errors++;
}
}
}
else {
const err1542 = {instancePath:instancePath+"/split/draft",schemaPath:"#/properties/split/properties/draft/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1542];
}
else {
vErrors.push(err1542);
}
errors++;
}
}
}
else {
const err1543 = {instancePath:instancePath+"/split",schemaPath:"#/properties/split/type",keyword:"type",params:{type: "object"},message:"must be object"};
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
const err1544 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1544];
}
else {
vErrors.push(err1544);
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
