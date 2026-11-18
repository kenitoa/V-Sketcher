const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('studio',{
 tracking:{begin:()=>ipcRenderer.invoke('media:begin'),end:()=>ipcRenderer.invoke('media:end'),frame:(seq,bytes)=>ipcRenderer.invoke('media:frame',seq,bytes),profiles:async()=>({ok:true,profiles:[]}),saveCalibration:async()=>({ok:false,errorCode:'E_TEST_PROFILE'})},
 microphone:{begin:()=>ipcRenderer.invoke('media:microphone',true),end:()=>ipcRenderer.invoke('media:microphone',false),profiles:async()=>({ok:true,profiles:[]}),save:async()=>false}
});
contextBridge.exposeInMainWorld('deviceCheck',{backend:value=>ipcRenderer.invoke('media:backend',value),sample:()=>ipcRenderer.invoke('media:sample')});
