import React from 'react';

import '../css/VideosTab.css';

import * as Twitch from '../clients/TwitchClient'
import TwitchClientFactory from '../clients/TwitchClientFactory'
import TimeHelper from '../helper/TimeHelper'; 

type VideosTabProps = {
  isActive: boolean
  videoClick: (event: React.MouseEvent<any, any>) => void
}
type VideosTabState = {
  videos? : AppVideo []
}

class VideosTab extends React.Component<VideosTabProps, VideosTabState> {
  twitchClient: Twitch.Client = TwitchClientFactory.getInstance()

  loadVideos(user: AppUser) {
    const callback = this.getVideosCallback.bind(this);
	this.twitchClient.getVideos(user.id, callback);	
  }

  getVideosCallback(getVideosResponse: Twitch.VideosResponse) {
	const twitchVideos: Twitch.Video[] = getVideosResponse.data
	const videos: AppVideo[] = [];
    twitchVideos.forEach(function(twitchVideo: Twitch.Video) {
	    const now = new Date();
	  	const thumbnail_url= twitchVideo.thumbnail_url.replace("%{width}", "304").replace("%{height}", "171");
	  	const published_date = new Date(twitchVideo.published_at);
	  	const seconds = Math.round((now.getTime() - published_date.getTime())/1000);
	  	const relative_published_time = TimeHelper.getFuzzyDuration(seconds);
	  	const duration = TimeHelper.formatDuration(twitchVideo.duration);

		const video: AppVideo = {
			id: twitchVideo.id,
			thumbnail_url: thumbnail_url,
			published_date: published_date,
			relative_published_time: relative_published_time,
			view_count: twitchVideo.view_count,
			duration: duration
		}
		videos.push(video)
    })
    this.setState({videos: videos})
  }

  render() {	
	const {isActive, videoClick} = this.props
	const {videos} = this.state
	const className = "tab" + (isActive ? " active" : "");
	
    const videoList = !videos ? "" : videos.map((video: AppVideo) => 
	  <a data-id={video.id} key={video.id} className="video" onClick={videoClick}>
          <img src={video.thumbnail_url}/>
        <div className="overlay topLeft">{video.duration}</div>
        <div className="overlay bottomLeft">{video.view_count} views</div>
        <div className="overlay bottomRight">{video.relative_published_time}</div> 
      </a>
    );

  return (
      <div id="videos" className={className}>
        {videoList}
     </div>
    );
  }
}

VideosTab.prototype.state = {
	videos: null
}

export default VideosTab