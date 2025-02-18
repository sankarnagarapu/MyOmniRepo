import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionic-bg-task',
  webDir: '../../dist/apps/ionic-bg-task/browser',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
