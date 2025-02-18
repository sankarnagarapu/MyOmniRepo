import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'presence-track',
  webDir: '../../dist/apps/presence-track/browser',
  server: {
    url: 'http://192.168.29.213:8100',
    cleartext: true,
  },
};

export default config;
