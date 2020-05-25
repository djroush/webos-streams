import React, { Component } from 'react';

import './VideosTab.css';

import TwitchClient from '../clients/TwitchClient'
import TwitchClientFactory from '../clients/TwitchClientFactory'
import TimeHelper from '../helper/TimeHelper'; 

import $ from 'jquery';
import ReactDOM from 'react-dom';

class VideosTab extends Component {
  twitchClient: TwitchClient = TwitchClientFactory.getInstance();
  videosDiv: HTMLDivElement;

  state: TabState = {
	active: false,
	user: null
  };
  props: TabProps;  
  constructor(props:any) {
    super(props);
    this.props = props;
  }

  render() {	
	const className = "tab" + (this.state.active ? " active" : "");
    return (
      <div id="videos" ref={(node) => { this.videosDiv = node;}} className={className}></div>
    );
  }

  setState(state: TabState) {
    super.setState(state);
    this.state = state;
  } 

  //TODO: call the twitch client somewhere, maybe make this call when visible?
   componentDidUpdate() {
	const user = this.state.user;
	if (user && user.id) {
	  const callback = this.getVideosCallback.bind(this);
	  this.twitchClient.getVideos(user.id, callback);	
	}
  }

  getVideosCallback(getClipsResponse: any) {
    const videoElems : JSX.Element[] = [];
    const callback = this.getVideo.bind(this, videoElems);
  	$.each(getClipsResponse.data, callback)
    ReactDOM.render(videoElems, this.videosDiv);
  }
  getVideo(videoElems: JSX.Element[], key: number, video: VideoType) {
    const now = new Date();
  	const thumb_url= video.thumbnail_url.replace("%{width}", "304").replace("%{height}", "171");
  	const published_date = new Date(video.published_at);
  	const seconds = Math.round((now.getTime() - published_date.getTime())/1000);
  	video.relative_published_time = TimeHelper.getFuzzyDuration(seconds);
  	const duration = TimeHelper.formatDuration(video.duration);
    const videoDivElem: JSX.Element = ( 
	  <div key={key} className="video">
        <a href="void(0)" data-id={video.id} onClick={this.props.clickListener}>
          <img src={thumb_url}/>
        </a>
        <div className="overlay topLeft">{duration}</div>
        <div className="overlay bottomLeft">{video.view_count} views</div>
        <div className="overlay bottomRight">{video.relative_published_time}</div> 
      </div>);
    videoElems.push(videoDivElem);
  }
}

export default VideosTab;