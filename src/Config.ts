export let APP: AppModel;

class Config {

  static setup() {
	var com: any = com || {};
	let github = com.github || {};
	let djroush = github.djroush || {};
	APP = djroush.webosstreams || {};
	
    APP.Config = {
	  twitchClientId: "wt3vscgu64y9f9tmew8ay17xdl3azt",
	  twitchEndpoint: "https://api.twitch.tv/helix",
	  callbackUrl: encodeURIComponent('http://localhost'),
 	  mockTwitch: false	
	};

	//Check if an access token exist, otherwise redirect to twitch to get one
	const matrixParams = document.location.href.split('#')[1]
	if (matrixParams !== undefined) {
	  var keyValues = matrixParams.split('&')
	  if (keyValues !== undefined) {
	     APP.Config.userAccessToken = keyValues.find(e => e !== null && e.includes('access_token=')).split('=')[1];
	  }
	}    
	if (APP.Config.userAccessToken === null || APP.Config.userAccessToken === undefined) {
	  window.location.href = 'https://id.twitch.tv/oauth2/authorize\
		?client_id=' + APP.Config.twitchClientId + '\
		&redirect_uri=' + APP.Config.callbackUrl + '\
		&response_type=token&scope=';
	}  
  };

}

export default Config;
