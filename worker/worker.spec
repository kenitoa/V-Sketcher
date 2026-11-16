from pathlib import Path
from PyInstaller.utils.hooks import collect_data_files,copy_metadata
root=Path(SPECPATH).parent
datas=[(str(root/'.local/models/face_landmarker.task'),'models')]
for package in ['mediapipe','sounddevice','Pillow','numpy','opencv-contrib-python']:
    datas+=copy_metadata(package)
datas+=collect_data_files('mediapipe')
a=Analysis([str(root/'worker/main.py')],pathex=[str(root/'worker')],binaries=[],datas=datas,
           hiddenimports=[],hookspath=[],hooksconfig={},runtime_hooks=[],excludes=['tkinter','pytest','IPython'],noarchive=False)
pyz=PYZ(a.pure)
exe=EXE(pyz,a.scripts,[],exclude_binaries=True,name='worker',debug=False,bootloader_ignore_signals=False,
        strip=False,upx=False,console=True)
coll=COLLECT(exe,a.binaries,a.datas,strip=False,upx=False,name='worker')
