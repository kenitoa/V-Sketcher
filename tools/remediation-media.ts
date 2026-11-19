import { CameraRuntime } from '../apps/renderer/src/camera-runtime';
import { MicrophoneRuntime } from '../apps/renderer/src/microphone-runtime';
import { MotionPlayer } from '../packages/motion';
import { readProject } from '../packages/project-model';
declare global {
  interface Window {
    remediationMedia: Promise<unknown>;
    deviceCheck: { backend: (value: string) => Promise<void>; sample: () => Promise<unknown> };
  }
}
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));
let stage = 'module';
const require = (ok: unknown, code: string) => {
  if (!ok) throw Error(code);
};
window.remediationMedia = (async () => {
  const opened = readProject(await (await fetch('/project.json')).json());
  require(opened.mode === 'read-write', 'E_MEDIA_PROJECT');
  const project = opened.project,
    player = new MotionPlayer(),
    camera = new CameraRuntime(player),
    microphone = new MicrophoneRuntime(player),
    real = navigator.mediaDevices.getUserMedia;
  const goal = Number(new URLSearchParams(location.search).get('cycles') ?? 60);
  require([6, 60].includes(goal), 'E_MEDIA_CYCLES');
  const until = async (fn: () => unknown, ms = 15000) => {
    const end = performance.now() + ms;
    while (!fn()) {
      if (performance.now() > end) throw Error('E_MEDIA_WAIT');
      await pause(25);
    }
  };
  const fixture = document.createElement('canvas');
  fixture.width = 640;
  fixture.height = 480;
  const ctx = fixture.getContext('2d')!,
    photo = new Image();
  photo.src = '/fixture.png';
  await photo.decode();
  let layout = 'single',
    tick = 0;
  const captures: CanvasCaptureMediaStreamTrack[] = [];
  const draw = () => {
    ctx.fillStyle = '#888';
    ctx.fillRect(0, 0, 640, 480);
    if (layout === 'single') ctx.drawImage(photo, 80, 0, 480, 480);
    else if (layout === 'multiple') {
      ctx.drawImage(photo, 140, 25, 210, 240, 20, 60, 260, 300);
      ctx.drawImage(photo, 140, 25, 210, 240, 360, 60, 260, 300);
    }
    ctx.fillStyle = ++tick % 2 ? 'red' : 'blue';
    ctx.fillRect(0, 476, 4, 4);
    for (const track of captures) if (track.readyState === 'live') track.requestFrame();
  };
  const timer = setInterval(draw, 50);
  draw();
  const controls = [],
    cycles = [];
  try {
    Object.defineProperty(navigator.mediaDevices, 'getUserMedia', {
      configurable: true,
      value: async () => {
        const stream = fixture.captureStream(20);
        captures.push(stream.getVideoTracks()[0] as CanvasCaptureMediaStreamTrack);
        return stream;
      },
    });
    for (const backend of ['development', 'packaged']) {
      await window.deviceCheck.backend(backend);
      camera.setProject(project, 'control-' + backend);
      player.setProject(project, new Set(), backend);
      layout = 'single';
      draw();
      await camera.start('');
      stage = backend + '-single';
      await until(() => camera.state === 'failed' || camera.frames >= 8, 25000);
      require(camera.state === 'open' && !!camera.result?.faces.length, 'E_MEDIA_POSITIVE_CONTROL');
      const single = camera.result!.faces.length;
      stage = backend + '-multiple';
      layout = 'multiple';
      draw();
      await until(() => (camera.result?.faces.length ?? 0) >= 2, 15000);
      const multiple = camera.result!.faces.length;
      stage = backend + '-blank';
      layout = 'blank';
      draw();
      await until(() => camera.frames > 10 && camera.result?.faces.length === 0, 15000);
      camera.stop();
      await camera.stopped();
      require(camera.resources().liveTracks === 0, 'E_MEDIA_CONTROL_RELEASE');
      controls.push({
        backend,
        passed: true,
        source: 'NASA public-domain image via canvas MediaStream; not a live participant',
        singleFaces: single,
        multipleFaces: multiple,
        blankFaces: 0,
        actualCameraRuntime: true,
        actualWorkerProtocol: true,
        resourcesReleased: true,
      });
    }
    Object.defineProperty(navigator.mediaDevices, 'getUserMedia', {
      configurable: true,
      value: real,
    });
    for (let i = 0; i < goal; i++) {
      stage = 'physical-' + (i + 1);
      const backend = i < goal / 2 ? 'development' : 'packaged';
      if (i === 0 || i === goal / 2) await window.deviceCheck.backend(backend);
      const session = 'physical-' + i;
      player.setProject(project, new Set(), session);
      camera.setProject(project, session);
      microphone.setProject(project, session);
      await camera.start('');
      await microphone.start('');
      require(camera.state === 'open' && microphone.state === 'open', 'E_MEDIA_DEVICE_OPEN');
      await until(() => camera.frames >= 2 && microphone.blocks >= 3, 12000);
      const sourceClass = /OBS|virtual|가상|NDI|DroidCam|Camo|Snap Camera/i.test(camera.sourceLabel)
        ? 'known-virtual'
        : /HD.*Webcam|Integrated.*Camera|USB.*(Camera|Webcam)|FaceTime/i.test(camera.sourceLabel)
          ? 'hardware-like'
          : 'unclassified';
      const measured = {
        cycle: i + 1,
        backend,
        cameraFrames: camera.frames,
        framesWithDetectedFace: camera.result?.faces.length ?? 0,
        microphoneBlocks: microphone.blocks,
        sourceClass,
        sourceLabelStored: false,
      };
      // Project-switch cancellation invokes the product teardown path, followed by explicit microphone stop.
      camera.setProject(null, session + '-closed');
      await Promise.all([camera.stopped(), microphone.stop()]);
      const c = camera.resources(),
        m = microphone.resources();
      require(c.liveTracks === 0 &&
        m.liveTracks === 0 &&
        !m.audioContext, 'E_MEDIA_DEVICE_RELEASE');
      cycles.push({
        ...measured,
        passed: true,
        liveTracksAfterStop: 0,
        audioContextAfterStop: false,
        resourceSample: await window.deviceCheck.sample(),
      });
    }
    return {
      passed: true,
      controls,
      cycles,
      physicalDeviceCycles: cycles.length,
      projectGenerationChanges: cycles.length,
      physicalCameraFramesStored: false,
      microphonePCMStored: false,
      liveParticipantMotionValidated: false,
      physicalUSBUnplugPerformed: false,
      cleanWindowsOS: false,
      scope:
        'Actual product camera/microphone classes, real repeated open/close and worker positive controls; not human motion, noise classification or USB removal acceptance',
    };
  } finally {
    clearInterval(timer);
    camera.stop();
    await Promise.all([camera.stopped(), microphone.stop()]);
    captures.forEach((track) => track.stop());
    Object.defineProperty(navigator.mediaDevices, 'getUserMedia', {
      configurable: true,
      value: real,
    });
  }
})().catch((error) => ({
  passed: false,
  stage,
  code:
    error instanceof Error
      ? (error.message.match(/E_[A-Z0-9_]+/)?.[0] ?? 'E_MEDIA_CHECK')
      : 'E_MEDIA_CHECK',
  physicalCameraFramesStored: false,
  microphonePCMStored: false,
}));
