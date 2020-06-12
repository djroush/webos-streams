import React from 'react';

import '../css/ClipsTab.css';

import * as Twitch from '../clients/TwitchClient';
import TwitchClientFactory from '../clients/TwitchClientFactory';
import ClipsPlayer from './ClipsPlayer';
import TimeHelper from '../helper/TimeHelper';

type ClipsTabProps = {
  isActive: boolean;
};
type ClipsTabState = {
  clips: AppClip[];
  clipid: string;
};

class ClipsTab extends React.PureComponent<ClipsTabProps, ClipsTabState> {
  twitchClient: Twitch.Client = TwitchClientFactory.getInstance();

  onKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this.removePlayer();
    }
  };

  getClipsCallback(getClipsResponse: Twitch.ClipsResponse): void {
    const twitchClips: Twitch.Clip[] = getClipsResponse.data;
    const clips: AppClip[] = [];
    twitchClips.forEach((twitchClip: Twitch.Clip) => {
      const now = new Date();
      const { id } = twitchClip;
      const createdDate = new Date(twitchClip.created_at);
      const seconds = Math.round(
        (now.getTime() - createdDate.getTime()) / 1000,
      );
      const thumbnailUrl = twitchClip.thumbnail_url;
      const relativeCreatedTime = TimeHelper.getFuzzyDuration(seconds);
      const viewCount = twitchClip.view_count;

      const clip: AppClip = {
        id,
        thumbnailUrl,
        createdDate,
        relativeCreatedTime,
        viewCount,
      };
      clips.push(clip);
    });

    this.setState({ clips, clipid: null });
  }

  clipClick = (event: React.MouseEvent): void => {
    const { clips } = this.state;
    const clipid = event.currentTarget.getAttribute('data-id');

    this.setState({ clips, clipid });
  };

  loadClips(user: AppUser): void {
    const callback = this.getClipsCallback.bind(this);
    this.twitchClient.getClips(user.id, callback);
  }

  removePlayer(): void {
    const { clips } = this.state;
    this.setState({ clips, clipid: null });
  }

  render(): JSX.Element {
    const { clips, clipid } = this.state;
    const { clipClick } = this;
    const { isActive } = this.props;

    if (!isActive) {
      return <div id="clips" />;
    }
    if (clipid !== null) {
      const removePlayer = this.removePlayer.bind(this);
      const onKeyPress = this.onKeyPress.bind(this);
      return (
        <div id="clips">
          <ClipsPlayer
            clipid={clipid}
            removePlayer={removePlayer}
            onKeyPress={onKeyPress}
          />
        </div>
      );
    }
    const clipList = !clips
      ? ''
      : clips.map((clip: AppClip) => (
          <a
            data-id={clip.id}
            key={clip.id}
            className="clip"
            onClick={clipClick}
          >
            <img src={clip.thumbnailUrl} />
            <div className="overlay bottomLeft">
              {clip.viewCount}
              {' views'}
            </div>
            <div className="overlay bottomRight">
              {clip.relativeCreatedTime}
            </div>
          </a>
        ));

    return (
      <div id="clips">
        <div>{clipList}</div>
      </div>
    );
  }
}

ClipsTab.prototype.state = {
  clips: [],
  clipid: null,
};

export default ClipsTab;
