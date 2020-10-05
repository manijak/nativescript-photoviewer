import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'org.nativescript.photoviewer',
  appResourcesPath: 'app/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    memoryCheckInterval: 500,
    freeMemoryRatio: 0.5,
  },
  appPath: 'app',
} as NativeScriptConfig
