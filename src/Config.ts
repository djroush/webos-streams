type ConfigProps = {
  twitchClientId: string;
  twitchEndpoint: string;
  callbackUrl: string;
  mockTwitch: boolean;
  userAccessToken?: string;
  hostName?: string;
};

const CONFIG: ConfigProps = {
  twitchClientId: 'wt3vscgu64y9f9tmew8ay17xdl3azt',
  twitchEndpoint: 'https://api.twitch.tv/helix',
  callbackUrl: encodeURIComponent('http://localhost'),
  hostName: window.location.hostname,
  mockTwitch: false,
};

export default CONFIG;
