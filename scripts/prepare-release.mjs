import {mkdirSync,readFileSync,writeFileSync,copyFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {join} from 'node:path';
const require=createRequire(import.meta.url),{guideTopics}=require('../dist/electron/packages/user-guide/index.js');
const {version}=JSON.parse(readFileSync('package.json','utf8')),out='dist/release';mkdirSync(out,{recursive:true});
const support={app:version,platform:'Windows 11 x64; only listed local environment tested',delivery:'ZIP portable',installer:false,automaticUpdate:false,signed:false,
 testedEnvironment:{os:'Windows 11 Pro 10.0.26300 x64',cpu:'Intel i5-13420H',ramGiB:31.71,gpu:'RTX 4050 Laptop 6GB + Intel UHD',minimumSpecification:false},
 runtimesBundled:['Electron 45.3.3','Python worker and locked dependencies','local tracking models'],
 external:[{name:'OBS Studio',version:'33.0.1',bundled:false,evidence:'phase27 actual local browser-source test'},{name:'Inochi Session',version:'0.8.7',sdk:'0.8.6',bundled:false,evidence:'phase27 actual independent INP loading'}],
 requirements:{os:'Windows x64; clean OS validation pending',graphics:'WebGL2',storage:'Writable application and project folders; keep backup space',cpu:'Minimum not yet validated',memory:'Minimum not yet validated',devices:'Webcam and microphone optional for device-free preview; explicit connection required'},
 status:{m0:'HOLD',publicDistributionApproved:false,limitedTrialDistributed:false,noviceStudy:'PENDING',cleanWindowsTest:'PENDING',twoHourSoak:'PENDING',faceDetectionIssue:'INT27-CAM01 OPEN'},
 supportContact:{channel:'이번 시험을 안내한 담당자에게 피드백 양식을 전달하세요.',publicContactConfigured:false,automaticUpload:false}};
writeFileSync(join(out,'support.json'),JSON.stringify(support,null,2)+'\n');
writeFileSync(join(out,'USER-GUIDE.md'),'# 2DSketcher '+version+' 사용 안내\n\n앱의 도움말과 같은 안내입니다.\n\n'+guideTopics.map(t=>'## '+t.title+'\n\n'+t.summary+'\n\n'+t.steps.map((s,i)=>(i+1)+'. '+s).join('\n')+'\n\n'+t.check+'\n').join('\n'));
writeFileSync(join(out,'START-HERE.txt'),'2DSketcher '+version+' — 로컬 시험판 / M0 HOLD\r\n\r\nZIP 전체를 새 폴더에 풀고 2DSketcher.exe를 실행하세요.\r\nNode.js/Python 별도 설치, 관리자 실행, 보호 기능 해제는 필요하지 않습니다.\r\n첫 사용: 앱 도움말 → 처음 만드는 캐릭터.\r\n오프라인 안내: resources/release/USER-GUIDE.md\r\n업데이트: 저장·종료 → 새 버전은 다른 폴더에 압축 해제 → 프로젝트 사본으로 확인.\r\n제거: 종료 → 사용자 자료를 밖으로 옮긴 후 압축 해제한 앱 폴더만 삭제. 프로젝트·앱 데이터는 보존하세요.\r\n자동 업데이트와 제거 프로그램은 없습니다.\r\n서명되지 않은 시험판입니다. Windows 보안 경고는 출처를 확인하고 보호 기능을 끄지 마세요.\r\n검증 미완료: 깨끗한 OS, 초보자 성공률, 실제 장치·연속 실행·성능, 공개 배포 권리/품질 게이트.\r\n방송/외부 프로그램은 별도 설치하며 지원 버전은 resources/release/support.json에 있습니다.\r\n문의: 이번 시험을 안내한 담당자에게 resources/release/FEEDBACK.md 양식을 전달하세요. 자동 업로드는 없습니다.\r\n');
writeFileSync(join(out,'RELEASE-NOTES.md'),'# '+version+' 로컬 시험 안내\n\n- 세 제작 경로 설명, 검색 가능한 도움말 11개 주제, 고급 파츠 예제 진입을 추가했습니다.\n- 프로젝트/PNG/독립 INP 결과의 차이와 방송·복구·장치 점검 절차를 제공합니다.\n- ZIP 포터블에 이 안내·자산 조건·지원 표·피드백 양식을 포함합니다.\n\n아직 승인되지 않은 범위: M0, 초보자 성공률, 깨끗한 Windows 설치, 2시간 성능, 실제 장치 추적 문제. 3D와 자체 모델 글 기반 생성은 필수 장기 계획이며 이번 빌드에 포함되지 않습니다. 이전 단계의 구현과 시험 이력은 보존합니다.\n\n문제 발생 시 프로젝트를 새 이름으로 저장하고 복구본을 비교하세요. 이전 버전 폴더와 원본 백업을 보관하세요. 이전 앱에서 새 형식 파일을 읽을 수 있다고 보장하지 않습니다.\n');
copyFileSync('assets/product/parts/USAGE.md',join(out,'EXAMPLE-USAGE.md'));
copyFileSync('assets/product/parts/catalog.json',join(out,'catalog.json'));
copyFileSync('assets/product/parts/generation-record.json',join(out,'generation-record.json'));
copyFileSync('docs/user/feedback.md',join(out,'FEEDBACK.md'));
console.log('Prepared offline trial information',version,'HOLD');
