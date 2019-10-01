console.log('index.js script loaded');

const clientId = '810066002433-smifmgudga64a88i9ngebr0bdabs4va7.apps.googleusercontent.com';
const apiKey = 'AIzaSyCT3dgcjVADrKlIQF8G_uw4cTQhhUmuQiM';

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  //gapi.auth2.getAuthInstance().signIn();
  console.log('Handling auth click');
  initClient();
}

const scopes = [
  // Per-file access to files created or opened by the app
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata.readonly'
];

const authorizeButton = document.getElementById('authorizeButton');
const signoutButton = document.getElementById('signoutButton');

authorizeButton.onclick = handleAuthClick;

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  console.log('Gapi client loaded successfully');
  console.log('Loading client module');
  gapi.load('client', () => {console.log('Google api client module loaded')});
}

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

function initClient() {
  // Developer Console, https://console.developers.google.com
  console.log('Authorizing with gapi.auth2.init()');
  gapi.client.init({
    clientId: clientId,
    apiKey: apiKey,
    discoveryDocs: DISCOVERY_DOCS, //: ['https://people.googleapis.com/$discovery/rest'],
    scope: SCOPES
  }).then(function (response) {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

    gapi.auth2.getAuthInstance().signIn();
  }, function(error) {
    throw error;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  console.log('Updating signin status, is user signed in: ' + isSignedIn);
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    signInSuccessHandler();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

function signInSuccessHandler() {
  console.log('Sign in successfull! User is authorized! What next? :)');
  app.run();
}
