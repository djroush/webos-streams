import React from 'react';

import '../css/VideosTab.css';

import * as Twitch from '../clients/TwitchClient';
import TwitchClientFactory from '../clients/TwitchClientFactory';
import TimeHelper from '../helper/TimeHelper';

type VideosTabProps = {
  isActive: boolean;
  videoClick: (event: React.MouseEvent) => void;
};
type VideosTabState = {
  videos?: AppVideo[];
  paginationCursor: string;
};

class VideosTab extends React.Component<VideosTabProps, VideosTabState> {
  twitchClient: Twitch.Client = TwitchClientFactory.getInstance();

  getVideosCallback(getVideosResponse: Twitch.VideosResponse): void {
    const twitchVideos: Twitch.Video[] = getVideosResponse.data;
    const videos: AppVideo[] = [];
    twitchVideos.forEach((twitchVideo: Twitch.Video) => {
      const now = new Date();
      const thumbnailUrl = twitchVideo.thumbnail_url
        .replace('%{width}', '304')
        .replace('%{height}', '171');
      const publishedDate = new Date(twitchVideo.published_at);
      const seconds = Math.round(
        (now.getTime() - publishedDate.getTime()) / 1000,
      );
      const relativePublishedTime = TimeHelper.getFuzzyDuration(seconds);
      const duration = TimeHelper.formatDuration(twitchVideo.duration);
      const viewCount = twitchVideo.view_count;

      const video: AppVideo = {
        id: twitchVideo.id,
        thumbnailUrl,
        publishedDate,
        relativePublishedTime,
        viewCount,
        duration,
      };
      videos.push(video);
    });
    this.setState({ videos });
  }

  loadVideos(user: AppUser): void {
    const callback = this.getVideosCallback.bind(this);
    this.twitchClient.getVideos(user.id, callback);
  }

  render(): JSX.Element {
    const { isActive, videoClick } = this.props;
    const className = `tab${isActive ? ' active' : ''}`;

    if (!isActive) {
      return <div id="videos" className={className} />;
    }
    const { videos } = this.state;
    const videoList = !videos
      ? ''
      : videos.map((video: AppVideo) => (
          <a
            data-id={video.id}
            key={video.id}
            className="video"
            role="button"
            onClick={videoClick}
          >
            <img src={video.thumbnailUrl} />
            <div className="overlay topLeft">{video.duration}</div>
            <div className="overlay bottomLeft">
              {video.viewCount}
              <span> views</span>
            </div>
            <div className="overlay bottomRight">
              {video.relativePublishedTime}
            </div>
          </a>
        ));

    return (
      <div id="videos" className={className}>
        {videoList}
      </div>
    );
  }
}

VideosTab.prototype.state = {
  videos: null,
  paginationCursor: null,
};

export default VideosTab;
