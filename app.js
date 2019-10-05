import GoogleDriveApiJsSimple from './google-drive-api-simple.js';

const app = {
  run() {
    document.write('app is running');

    const googleDriveApiJsSimple = new GoogleDriveApiJsSimple(gapi);

    console.log('googleDriveApiJsSimple: ', googleDriveApiJsSimple);
  }
};

export default app;
window.app = app;
