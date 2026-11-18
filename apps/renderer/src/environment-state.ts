import {defaults,type EnvironmentSettings} from '../../../packages/settings';
let current=defaults();
export const environmentValue=():EnvironmentSettings=>current;
export const applyEnvironment=(value:EnvironmentSettings):void=>{current=structuredClone(value);};
