import { ElectronAPI } from '@electron-toolkit/preload'

export interface IElectronAPI {
  electronStore: {
    get: (key: string) => unknown;
    set: (key: string, val: unknown) => void;
    delete: (key: string) => void;
  }
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    electronStore: IElectronAPI['electronStore']
  }
}