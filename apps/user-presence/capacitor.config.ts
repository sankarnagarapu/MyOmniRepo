import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'user-presence',
  webDir: '../../dist/apps/user-presence/browser',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.29.213:8100',
    cleartext: true,
  },
};

export default config;
