function getUserCallback(response) {
    if (response && response.data.length == 1) {
        var user = response.data[0];
        $("#channelNavBar, #tabsContainer").removeClass("hidden");
        var profileDiv = $("#profile");
        profileDiv.empty();
        profileDiv.attr("data-id", user.id);
        profileDiv.append('<img class="profileImage" src="' + user.profile_image_url + '"></img><span>' + user.display_name + '</span>');
        storeUser(user);
        loadTab(user.id);
    }
}

function getStreamCallback(getStreamResponse) {
	//TOOD: use this or remove the parameter
	streamDiv = $("#stream");
	var user = retrieveUser();
	streamDiv.empty();
    streamDiv.append('<div id="twitch-embed"></div>');
	playStream(user.login, false);
}

function getVideosCallback(getVideosResponse) {
	var videosDiv = $("#videos");
    var now = new Date();
  	$.each(getVideosResponse.data, function(_, value){
  		var thumb_url= value.thumbnail_url.replace("%{width}", "304").replace("%{height}", "171");
  		var published_date = new Date(value.published_at);
  		var seconds = Math.round((now - published_date)/1000);
  		var relative_publish_time = getFuzzyDuration(seconds);
  		var duration = formatDuration(value.duration);
  		
  		videosDiv.append(
  			'<div class="video">' +
  			    '<a href="javascript:void(0)" data-id="' + value.id + '"><img src="' + thumb_url + '"></img></a>' +
  			    '<div class="videoOverlay topLeft">' + duration + '</div>' + 
  			    '<div class="videoOverlay bottomLeft">' + value.view_count + ' views</div>' + 
  			    '<div class="videoOverlay bottomRight">' + relative_publish_time + '</div>' + 
  			'</div>'
  		);
  	})
  	
  	videoClickListeners();
}

function getClipsCallback(getClipsResponse) {
	var clipsDiv = $("#clips");
    var now = new Date();
  	$.each(getClipsResponse.data, function(_, value){
  		var thumb_url= value.thumbnail_url;
  		var created_date = new Date(value.created_at);
  		var seconds = Math.round((now - created_date)/1000);
  		var relative_created_time = getFuzzyDuration(seconds);
  		
  		clipsDiv.append(
  			'<div class="video">' +
  			    '<a href="javascript:void(0)" data-id="' + value.id + '"><img src="' + thumb_url + '"></img></a>' +
  			    '<div class="videoOverlay bottomLeft">' + value.view_count + ' views</div>' + 
  			    '<div class="videoOverlay bottomRight">' + relative_created_time + '</div>' + 
  			'</div>'
  		);
  	})
  	
  	clipsClickListeners();
}
