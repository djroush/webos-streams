import { APP } from '../Config';

import TwitchClientMock from './TwitchClientMock';
import TwitchClientImpl from './TwitchClientImpl';

export interface TwitchClient {
	getUser(username: string, callback: (response: any) => void): void;
    getStream(userid: string, callback: (response: any) => void): void;
	getVideos(userid: string, callback: (response: any) => void): void;
	getClips( userid: string, callback: (response: any) => void): void;
}

class TwitchClientFactory {
  static getInstance(): TwitchClient {
     if (APP.Config.mockTwitch) {
       return new TwitchClientMock();
     } else {
       return new TwitchClientImpl(); 
     }
  }
}
export default TwitchClientFactory;