import * as Twitch from './TwitchClient'
import TwitchClientMock from './TwitchClientMock';
import TwitchClientImpl from './TwitchClientImpl';
import CONFIG from '../index'

class TwitchClientFactory {
  static getInstance(): Twitch.Client {
     if (CONFIG.mockTwitch) {
       return new TwitchClientMock();
     } else {
       return new TwitchClientImpl(); 
     }
  }
}

export default TwitchClientFactory
