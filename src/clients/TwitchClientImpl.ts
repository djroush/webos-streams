import * as Twitch from './TwitchClient';
import CONFIG from '../index'

import $ from 'jquery';

class TwitchClientImpl implements Twitch.Client {

  const baseRequest = {
    type: 'GET',
    dataType: 'json',
    beforeSend: function (xhr: JQuery.jqXHR<any>) {
	  xhr.setRequestHeader('Client-ID', CONFIG.twitchClientId);
	  xhr.setRequestHeader('Authorization', 'Bearer ' + CONFIG.userAccessToken);
    }
  }

  public getUser(username: string, callback: (response: Twitch.UserResponse) => void) {
    console.log("Loading user: " + username);
    
    const url =  CONFIG.twitchEndpoint + '/users?login=' + username; 
    const request = {
	  ...this.baseRequest,

      success: callback,
      error: function(_jqXHR: JQuery.jqXHR<any>, textStatus: string, errorThrown: string) {
          console.error('Unable to lookup user ' + username + '.  Received ' + textStatus + ' status code.\r\n' +
            'error: ' + errorThrown);
        }
      };
    
    $.ajax(url, request);
  }

  public getVideos(userid: string, callback: (response: Twitch.VideosResponse) => void) {
    console.log("Loading Videos: " + userid);

    const url: string = CONFIG.twitchEndpoint + '/videos?user_id=' + userid + '&sort=time&first=20'
    const request = {
		...this.baseRequest,
		
        success: callback,
        error: function(_jqXHR: JQuery.jqXHR<any>, textStatus: string, errorThrown: string) {
          console.error('Unable to lookup videos for userid ' + userid + '.  Received ' + textStatus + ' status code.\r\n' +
              'error: ' + errorThrown);
        }
    };
    
    $.ajax(url, request);
  }

  public getClips(userid: string, callback: (response: Twitch.ClipsResponse) => void) {
    console.log("Loading Clips: " + userid);
    let beforeTimeDate = new Date();
    beforeTimeDate.setDate(beforeTimeDate.getDate() - 7);
    const beforeTime = beforeTimeDate.toISOString();
    const afterTime = new Date().toISOString();

    const url: string = CONFIG.twitchEndpoint + '/clips?broadcaster_id=' + userid + '&started_at=' + beforeTime + '&ended_at=' + afterTime + '&first=20'
    
    const request = {
	    ...this.baseRequest,

        success: callback,
        error: function(_jqXHR: JQuery.jqXHR<any>, textStatus: string, errorThrown: string) {
          console.error('Unable to lookup clips for userid ' + userid + '.  Received ' + textStatus + ' status code.\r\n' +
              'error: ' + errorThrown);
        }
    };

    $.ajax(url, request);
  }
}

export default TwitchClientImpl;
