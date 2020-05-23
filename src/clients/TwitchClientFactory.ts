import { APP } from '../Config';

import TwitchClient from './TwitchClient';
import TwitchClientMock from './TwitchClientMock';
import TwitchClientImpl from './TwitchClientImpl';

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