import React, { Component, RefObject, MouseEvent } from 'react';
import './Videos.css';
import TimeHelper from '../js/TimeHelper';

class Videos extends Component {

  videosDiv: RefObject<HTMLDivElement>;
  constructor(props: any) {
	super(props);
	this.videosDiv = React.createRef();
  }

  render() {	
    return (
      <div id="videos" className="tab" ref={this.videosDiv}></div>
    );
  }

  componentDidMount() {
//Call to client here?
  }

  getVideosCallback(getVideosResponse: any) {
    var now = new Date();
  	$.each(getVideosResponse.data, function(_, value){
  		var thumb_url= value.thumbnail_url.replace("%{width}", "304").replace("%{height}", "171");
  		var published_date = new Date(value.published_at);
  		var seconds = Math.round((now - published_date)/1000);
  		var relative_publish_time = TimeHelper.getFuzzyDuration(seconds);
  		var duration = TimeHelper.formatDuration(value.duration);
		  

  		this.videosDiv.append(
  			'<div class="video">' +
  			    '<a href="javascript:void(0)" onClick="{this.videoClickListeners} data-id="' + value.id + '"><img src="' + thumb_url + '"></img></a>' +
  			    '<div class="overlay topLeft">' + duration + '</div>' + 
  			    '<div class="overlay bottomLeft">' + value.view_count + ' views</div>' + 
  			    '<div class="overlay bottomRight">' + relative_publish_time + '</div>' + 
  			'</div>'
  		);
  	})
  }

  videoClickListeners(event:MouseEvent) {
	var videoid = event.currentTarget.getAttribute("data-id");
	activateTab("stream");
	playVideo(videoid);
  }
}

export default Videos;