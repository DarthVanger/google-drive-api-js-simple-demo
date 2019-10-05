import GoogleDriveApiJsSimple from './google-drive-api-simple.js';

const app = {
  run() {
    document.write('app is running');

    const googleDriveApiJsSimple = new GoogleDriveApiJsSimple(gapi);

    const createFolderButton = document.createElement('button');
    createFolderButton.onclick = createFolder;
    createFolderButton.innerHTML = 'Create folder';
    document.body.append(createFolderButton);

    console.log('googleDriveApiJsSimple: ', googleDriveApiJsSimple);
    console.log('createFolderButton: ', createFolderButton);

    function createFolder() {
      console.log('creating folder :)');
      googleDriveApiJsSimple.createDirectory({
        name: 'google-drive-api-js-simple-demo',
      }).then(() => {
        console.log('dir created success. Args: ', arguments);
      }).catch(() => {
        console.log('dir cretion failed!. Args: ', arguments);
      });
    }
  },

};

export default app;
window.app = app;
