import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'foodx',
  webDir: '../../dist/apps/foodx/browser',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.94.124:8100/',
    cleartext: true,
  },
};

export default config;
