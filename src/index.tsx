import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import CONFIG from './Config';

// Check if an access token exist, otherwise redirect to twitch to get one
const matrixParams = document.location.href.split('#')[1];
if (matrixParams !== undefined) {
  const keyValues = matrixParams.split('&');
  if (keyValues !== undefined) {
    CONFIG.userAccessToken = keyValues
      .find((e) => e !== null && e.includes('access_token='))
      .split('=')[1];
  }
}
if (CONFIG.userAccessToken === null || CONFIG.userAccessToken === undefined) {
  window.location.href = `https://id.twitch.tv/oauth2/authorize?\
client_id=${CONFIG.twitchClientId}\
&redirect_uri=${CONFIG.callbackUrl}\
&response_type=token&scope=`;
}

ReactDOM.render(<App />, document.getElementById('root'));
