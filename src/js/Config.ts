declare let APP2: AppType;

interface AppType {
	Component?: object,
	Model?: object,
	Config?: { [key: string]: any }
}

class Config {
  constructor() {
	var com = com || {};
	let github = com.github || {};
	let djroush = github.djroush || {};
	APP2 = djroush.webosstreams || {};

    APP2.Config = {
	  twitchClientId: "wt3vscgu64y9f9tmew8ay17xdl3azt",
	  twitchEndpoint: "https://api.twitch.tv/helix",
	  callbackUrl: encodeURIComponent('http://localhost'),
 	  mockTwitch: false	
	};

	//Check if an access token exist, otherwise redirect to twitch to get one
	var [_, matrixParams] = document.location.href.split('#')
	if (matrixParams !== undefined) {
	  var keyValues = matrixParams.split('&')
	  if (keyValues !== undefined) {
	     APP2.Config.userAccessToken = keyValues.find(e => e !== null && e.includes('access_token=')).split('=')[1];
	  }
	}    
	if (APP2.Config.userAccessToken === null || APP2.Config.userAccessToken === undefined) {
	  window.location.href = 'https://id.twitch.tv/oauth2/authorize?client_id=' + APP2.Config.twitchClientId + 
		'&redirect_uri=' + APP2.Config.callbackUrl + '&response_type=token&scope=';    	  
	}  
  };

}


export default Config; 
export const APP: AppType  = this.APP2; 
