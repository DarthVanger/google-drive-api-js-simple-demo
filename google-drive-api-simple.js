/**
 * Provides all the functions to work with Google Drive
 */
class GoogleDriveApiJsSimple {
  /**
   * @param {gapiClient} - gapi.client with Google Drive loaded
   */
  constructor(gapiClient) {
    this.gapiClient = gapiClient;
  }

  /**
   * Update text file content
   * @param {Object} options - Options object
   * @param {String} options.fileId - Id of the file on Google Drive
   * @param {String} options.text - Text to write to the text file
   *
   * @return {Promise} Promise resolves the response from Google Drive
   */
  updateTextFileContent({ fileId, text }) {
    const request = this.gapi.client.request({
      'path': '/upload/drive/v2/files/' + fileId,
      'method': 'PUT',
      'params': { 'uploadType': 'media' },
      'headers': {
        'Content-Type': 'text/plain'
      },
      'body': text
    });

    return new Promise(resolve => {
      request.execute(function (response) {
        resolve(response);
      });
    });
  }

  /**
   * Update file name
   * @param {Object} options - Options object
   * @param {String} options.fileId - Id of the file on Google Drive
   * @param {text} options.name - New name for the file
   *
   * @return {Promise} Promise resolves the response from Google Drive
   */
  updateFileName(options) {
    let fileId = options.id;
    let fileName = options.name;

    let request = this.gapi.client.request({
      'path': '/drive/v2/files/' + fileId,
      'method': 'PATCH',
      'body': JSON.stringify({
        title: fileName
      })
    });

    let promise = new Promise(resolve => {
      request.execute(function (response) {
        resolve(response);
      });
    });

    return promise;
  }

  /**
   * Create a directory
   *
   * @param {Object} options - Options object
   * @param {String} options.name - Directory name
   * @param {Array} options.parentId - Id of the parent directory for the created directory
   *
   * @return {Promise} Promise resolves the response from Google Drive
   */
  createDirectory(options) {
    var requestParams = {
      name: options.name,
      title: options.name,
      mimeType: "application/vnd.google-apps.folder",
    };

    requestParams.parents = [options.parentId];

    //const request = this.gapiClient.files.create(requestParams);

    const request = gapi.client.request({
      'path': '/drive/v2/files',
      'method': 'POST',
      'body': JSON.stringify(requestParams)
    });

    return new Promise(resolve => {
      request.execute(function (newFile) {
        resolve(newFile);
      });
    });
  }
}

export default GoogleDriveApiJsSimple;;
