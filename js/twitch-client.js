var setRequestHeaders = function (xhr) {
	  xhr.setRequestHeader('Client-ID', APP.twitchClientId);
	  xhr.setRequestHeader('Authorization', 'Bearer ' + APP.userAccessToken);
};

function getUser(username){
	console.log("Loading user: " + username);
	
	var request = {
      url: APP.twitchEndpoint + '/users?login=' + username,
	  type: 'GET',
	  dataType: 'json',
	  beforeSend: setRequestHeaders,
      success: function(response) {
        getUserCallback(response);
      },
      error: function(_, textStatus, errorThrown) {
        console.error('Unable to lookup user ' + username + '.  Received ' + textStatus + ' status code.\r\n' +
        	'error: ' + errorThrown);
      }
    };
	
	$.ajax(request);
}

function getStream(userid){
	console.log("Loading Stream: " + userid);

	var request = {
      url: APP.twitchEndpoint + '/streams?user_id=' + userid + '&first=5',
      type: 'GET',
      dataType: 'json',
      beforeSend: setRequestHeaders,
      success: function(response) {
        console.log('Stream DATA: ' + JSON.stringify(response));
        getStreamCallback(response);
      }, error: function(_, textStatus, errorThrown) {
	       console.error('Unable to lookup stream for userid ' + userid + '.  Received ' + textStatus + ' status code.\r\n' +
           		'error: ' + errorThrown);
      } 
	};
	
	$.ajax(request);
}

function getVideos(userid){
	console.log("Loading Videos: " + userid);

	var request = {
      url: APP.twitchEndpoint + '/videos?user_id=' + userid + '&sort=time&first=18',
      type: 'GET',
      dataType: 'json',
      beforeSend: setRequestHeaders,
      success: function(response) {
        getVideosCallback(response);
      }, error: function(_, textStatus, errorThrown) {
   		  console.error('Unable to lookup videos for userid ' + userid + '.  Received ' + textStatus + ' status code.\r\n' +
   				  'error: ' + errorThrown);
      }
	};
	
	$.ajax(request);
}

function getClips(userid){
	console.log("Loading Clips: " + userid);
	var afterTime = new Date().toISOString();
	var beforeTime = new Date();
	beforeTime.setDate(beforeTime.getDate() - 7);
	beforeTime = beforeTime.toISOString();

	var request = {
      url: APP.twitchEndpoint + '/clips?broadcaster_id=' + userid + '&started_at=' + beforeTime + '&ended_at=' + afterTime + '&first=3',
      type: 'GET',
      dataType: 'json',
      beforeSend: setRequestHeaders,
      success: function(response) {
        getClipsCallback(response);
      }, error: function(_, textStatus, errorThrown) {
   		  console.error('Unable to lookup clips for userid ' + userid + '.  Received ' + textStatus + ' status code.\r\n' +
   				  'error: ' + errorThrown);
      }
	};

	$.ajax(request);
}