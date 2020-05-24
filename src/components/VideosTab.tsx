import React, { Component } from 'react';

import './VideosTab.css';

import {APP} from '../Config';
import TwitchClient from '../clients/TwitchClient'
import TwitchClientFactory from '../clients/TwitchClientFactory'
import TimeHelper from '../helper/TimeHelper'; 

import $ from 'jquery';

class VideosTab extends Component {
  twitchClient: TwitchClient = TwitchClientFactory.getInstance();

  constructor(props: any) {
	super(props);
  }

  render() {	
    return (
      <div id="videos" className="tab"></div>
    );
  }

  setState(state: TabState) {
    this.state = state;	
  } 


  //TODO: call the twitch client somewhere, maybe make this call when visible?
  componentDidUpdate() {
	const user = APP.State.User;
	if (user && user.id) {
	  this.twitchClient.getVideos(user.id, this.getVideosCallback);	
	}
  }


  getVideosCallback = (getVideosResponse: any) => {
    var now = new Date();
  	$.each(getVideosResponse.data, function(_, value){
  		var thumb_url= value.thumbnail_url.replace("%{width}", "304").replace("%{height}", "171");
  		var published_date = new Date(value.published_at);
  		var seconds = Math.round((now.getTime() - published_date.getTime())/1000);
  		var relative_publish_time = TimeHelper.getFuzzyDuration(seconds);
  		var duration = TimeHelper.formatDuration(value.duration);
		  

  		$('#videosDiv').append(
  			'<div class="video">' +
  			    '<a href="javascript:void(0)" onClick="{this.videoClickListeners} data-id="' + value.id + '"><img src="' + thumb_url + '"></img></a>' +
  			    '<div class="overlay topLeft">' + duration + '</div>' + 
  			    '<div class="overlay bottomLeft">' + value.view_count + ' views</div>' + 
  			    '<div class="overlay bottomRight">' + relative_publish_time + '</div>' + 
  			'</div>'
  		);
  	})
  }

}

export default VideosTab;