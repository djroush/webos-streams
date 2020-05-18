import React, { Component } from 'react';
import './Videos.css';

class Videos extends Component {

  videosDiv
  constructor(props) {
	super(props);
	this.videosDiv = React.createRef();
  }

  render() {
    return (
      <div id="videos" className="tab" ref={this.videosDiv}></div>
    );
  }

  getVideosCallback(getVideosResponse) {
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

  videoClickListeners() {
    $(".video a").click(function(event) {
    	var videoid = event.currentTarget.getAttribute("data-id");
    	activateTab("stream");
        playVideo(videoid);
    });
  }
}

export default Videos;