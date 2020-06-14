import * as Twitch from './TwitchClient';
import TwitchClientMock from './TwitchClientMock';
import TwitchClientImpl from './TwitchClientImpl';
import CONFIG from '../Config';

class TwitchClientFactory {
  static twitchClient: Twitch.Client = null; 
  
  static getInstance(): Twitch.Client {
    if (this.twitchClient === null) {
      if (CONFIG.mockTwitch) {
        this.twitchClient = new TwitchClientMock();       
      } else {
        this.twitchClient = new TwitchClientImpl();
      }
    }
    return this.twitchClient;
  }
}

export default TwitchClientFactory;
