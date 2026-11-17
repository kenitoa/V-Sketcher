export interface Guidance { severity:'안내' | '경고' | '작업 차단'; title:string; impact:string; preserved:string; action:'resources' | 'save-as' | 'open' | 'parts' | 'retry'; actionLabel:string; }
export function guidance(code:string):Guidance {
  const base = { severity:'작업 차단' as const,preserved:'현재 프로젝트의 편집 내용은 유지됩니다.' };
  if(code==='E_RUN_HEAVY')return {...base,title:'실행을 유지하려고 이 작업을 보류했어요',impact:'분석·새 그림 가져오기·큰 파일 처리는 실행 중 지원하지 않습니다. 실행을 중지한 뒤 다시 진행해 주세요.',preserved:'작업본과 현재 실행 캐릭터는 그대로 유지됩니다.',action:'retry',actionLabel:'실행·작업 상태 확인'};
  if(code==='E_RUN_TRANSITION')return {...base,title:'실행 중 프로젝트 전환을 확인해 주세요',impact:'현재 캐릭터를 유지할지 새 프로젝트를 검사해 전환할지 선택해야 합니다.',preserved:'기존 실행본과 미저장 편집은 그대로 유지됩니다.',action:'retry',actionLabel:'전환 방법 확인'};
  if (code === 'E_SAVE_MIGRATION_TARGET') return { ...base,title:'원본과 다른 이름으로 저장해 주세요',impact:'이전 형식의 원본을 유지하기 위해 변환본은 다른 파일로 저장합니다.',action:'save-as',actionLabel:'다른 이름으로 저장' };
  if (['E_RESOURCE_MISSING','E_RESOURCE_CHANGED'].includes(code)) return { ...base,title:'필요한 그림을 읽을 수 없어요',impact:'이 그림을 사용하는 부위와 저장을 확인해야 해요. 표시 가능한 다른 부위는 계속 편집할 수 있어요.',action:'resources',actionLabel:'그림 다시 연결하기' };
  if (['E_SAVE_SPACE','E_SAVE_PERMISSION','E_SAVE_PATH','E_SAVE_CONFLICT'].includes(code)) return { ...base,title:code === 'E_SAVE_SPACE' ? '저장 공간이 부족해요' : code === 'E_SAVE_CONFLICT' ? '저장 파일이 다른 곳에서 바뀌었어요' : code === 'E_SAVE_PERMISSION' ? '이 위치에 저장할 수 없어요' : '파일 위치를 확인해 주세요',impact:'이번 변경을 이 위치에 저장하지 못했어요. 다른 위치에 저장하거나 공간과 권한을 확인해 주세요.',action:'save-as',actionLabel:'다른 이름으로 저장' };
  if (['E_SCHEMA_MAJOR','E_SCHEMA_VERSION','E_FILE_VERSION'].includes(code)) return { ...base,title:'지원하지 않는 프로젝트 형식이에요',impact:'이 파일을 편집할 수 없어요. 호환되는 앱이나 다른 사본을 사용해 주세요.',action:'open',actionLabel:'다른 프로젝트 열기' };
  if (/E_(ZIP|PROJECT_HASH|MANIFEST)/.test(code)) return { ...base,title:'프로젝트 파일을 확인하지 못했어요',impact:'손상되었거나 허용 범위를 벗어난 파일일 수 있어요. 원본 파일은 덮어쓰지 않았어요.',action:'open',actionLabel:'다른 사본 열기' };
  if (/E_(EDIT|PROJECT_SCHEMA|REFERENCE|PARAMETER)/.test(code)) return { ...base,title:'이 값을 적용할 수 없어요',impact:'부위와 값의 범위를 확인해 주세요. 유효한 이전 내용으로 표시하고 있어요.',action:'parts',actionLabel:'부위 설정으로 이동' };
  if (code === 'E_SESSION_READ_ONLY') return { ...base,severity:'안내',title:'지금은 편집할 수 없어요',impact:'프로젝트를 먼저 열거나 읽기 전용 여부를 확인해 주세요.',action:'open',actionLabel:'프로젝트 열기' };
  return { ...base,severity:'경고',title:'작업 결과를 확인해 주세요',impact:'요청한 작업을 끝내지 못했거나 추가 확인이 필요해요. 저장 상태를 확인하고 다시 시도해 주세요.',action:'retry',actionLabel:'복구 방법 보기' };
}
export const roleNames:Record<string,string> = { base:'기본 그림',body:'몸',head:'머리',eye:'눈',mouth:'입','hair-back':'뒤쪽 머리카락','hair-front':'앞쪽 머리카락',accessory:'장식',custom:'직접 지정' };
export const routeNames:Record<string,string> = { parts:'파츠로 시작','single-image':'그림 한 장','split-image':'분리된 그림' };
