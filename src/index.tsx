import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

type ConfigProps = {
  twitchClientId: string
  twitchEndpoint: string,
  callbackUrl: string,
  mockTwitch: boolean,
  userAccessToken? : string
}

var CONFIG : ConfigProps = {
  twitchClientId: "wt3vscgu64y9f9tmew8ay17xdl3azt",
  twitchEndpoint: "https://api.twitch.tv/helix",
  callbackUrl: encodeURIComponent('http://localhost'),
  mockTwitch: false	
};

export default CONFIG;

//Check if an access token exist, otherwise redirect to twitch to get one
const matrixParams = document.location.href.split('#')[1]
if (matrixParams !== undefined) {
  const keyValues = matrixParams.split('&')
  if (keyValues !== undefined) {
     CONFIG.userAccessToken = keyValues.find(e => e !== null && e.includes('access_token=')).split('=')[1];
  }
}    
if (CONFIG.userAccessToken === null || CONFIG.userAccessToken === undefined) {
  window.location.href = 'https://id.twitch.tv/oauth2/authorize\
	?client_id=' +  CONFIG.twitchClientId + '\
	&redirect_uri=' + CONFIG.callbackUrl + '\
	&response_type=token&scope=';
}  


ReactDOM.render(<App />, document.getElementById('root'));

