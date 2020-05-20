import { APP } from '../js/Config';
import TwitchClient from './TwitchClient';
import TwitchClientMock from './TwitchClientMock';
import TwitchInterface from './TwitchInterface';

class TwitchClientFactory {
  static getInstance(): TwitchInterface {
     if (!APP.Config.mockTwitch) {
       return new TwitchClient(); 
     } else {
        return new TwitchClientMock();
     }
  }
}
export default TwitchClientFactory;