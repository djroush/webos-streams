import TwitchClient from './TwitchClient';
import { APP } from '../Config';

class TwitchClientImpl implements TwitchClient {

  private setRequestHeaders(xhr: JQuery.jqXHR<any>) {
	  xhr.setRequestHeader('Client-ID', APP.Config.twitchClientId);
	  xhr.setRequestHeader('Authorization', 'Bearer ' + APP.Config.userAccessToken);
  };

  public getUser(username: string, callback: (response: any) => void) {
    console.log("Loading user: " + username);
    
    const url =  APP.Config.twitchEndpoint + '/users?login=' + username; 
    let request = {
      type: 'GET',
      dataType: 'json',
      beforeSend: this.setRequestHeaders,
      success: callback,
        error: function(jqXHR: JQuery.jqXHR<any>, textStatus: string, errorThrown: string) {
          console.error('Unable to lookup user ' + username + '.  Received ' + textStatus + ' status code.\r\n' +
            'error: ' + errorThrown);
        }
        
      };
    
    $.ajax(url, request);
  }

  public getStream(userid: string, callback: (response: any) => void) {
    console.log("Loading Stream: " + userid);

    var request = {
        url: APP.Config.twitchEndpoint + '/streams?user_id=' + userid + '&first=5',
        type: 'GET',
        dataType: 'json',
        beforeSend: this.setRequestHeaders,
        success: callback,
        error: function(jqXHR: JQuery.jqXHR<any>, textStatus: string, errorThrown: string) {
          console.error('Unable to lookup stream for userid ' + userid + '.  Received ' + textStatus + ' status code.\r\n' +
                'error: ' + errorThrown);
        } 
    };
    
    $.ajax(request);
  }

  public getVideos(userid: string, callback: (response: any) => void) {
    console.log("Loading Videos: " + userid);

    var request = {
        url: APP.Config.twitchEndpoint + '/videos?user_id=' + userid + '&sort=time&first=18',
        type: 'GET',
        dataType: 'json',
        beforeSend: this.setRequestHeaders,
        success: callback,
        error: function(jqXHR: JQuery.jqXHR<any>, textStatus: string, errorThrown: string) {
          console.error('Unable to lookup videos for userid ' + userid + '.  Received ' + textStatus + ' status code.\r\n' +
              'error: ' + errorThrown);
        }
    };
    
    $.ajax(request);
  }

  public getClips(userid: string, callback: (response: any) => void) {
    console.log("Loading Clips: " + userid);
    var beforeTimeDate = new Date();
    beforeTimeDate.setDate(beforeTimeDate.getDate() - 7);
    var beforeTime = beforeTimeDate.toISOString();
    var afterTime = new Date().toISOString();

    var request = {
        url: APP.Config.twitchEndpoint + '/clips?broadcaster_id=' + userid + '&started_at=' + beforeTime + '&ended_at=' + afterTime + '&first=3',
        type: 'GET',
        dataType: 'json',
        beforeSend: this.setRequestHeaders,
        success: callback,
        error: function(jqXHR: JQuery.jqXHR<any>, textStatus: string, errorThrown: string) {
          console.error('Unable to lookup clips for userid ' + userid + '.  Received ' + textStatus + ' status code.\r\n' +
              'error: ' + errorThrown);
        }
    };

    $.ajax(request);
  }
}

export default TwitchClientImpl;

