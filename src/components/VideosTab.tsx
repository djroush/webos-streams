import React from 'react';

import '../css/VideosTab.css';

import TwitchClientFactory, {TwitchClient} from '../clients/TwitchClientFactory'
import TimeHelper from '../helper/TimeHelper'; 

type VideosTabProps = {
  isActive: boolean
  videoClick: (event: React.MouseEvent<any, any>) => void
}
type VideosTabState = {
  videos? : AppVideo []
  user?: TwitchUser
}

class VideosTab extends React.Component<VideosTabProps, VideosTabState> {
  twitchClient: TwitchClient = TwitchClientFactory.getInstance()
  videos: AppVideo[] = null

  setUser(user: TwitchUser) {
    const callback = this.getVideosCallback.bind(this, user);
	this.twitchClient.getVideos(user.id, callback);	
  }

  getVideosCallback(user: TwitchUser, getVideosResponse: TwitchVideosResponse) {
	const twitchVideos: TwitchVideo[] = getVideosResponse.data
	const videos: AppVideo[] = [];
    twitchVideos.forEach(function(twitchVideo: TwitchVideo) {
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
    this.setState({videos: videos, user: user})
  }

  render() {	
	const {isActive, videoClick} = this.props
	const {videos} = this.state
	const className = "tab" + (isActive ? " active" : "");
	
    const videoList = !videos ? "" : videos.map((video: AppVideo) => 
	  <div key={video.id} className="video">
        <a href="void(0)" data-id={video.id} onClick={videoClick}>
          <img src={video.thumbnail_url}/>
        </a>
        <div className="overlay topLeft">{video.duration}</div>
        <div className="overlay bottomLeft">{video.view_count} views</div>
        <div className="overlay bottomRight">{video.relative_published_time}</div> 
      </div>
    );

  return (
      <div id="videos" className={className}>
        {videoList}
     </div>
    );
  }
}

VideosTab.prototype.state = {
	videos: null,
	user: null
}

export default VideosTab