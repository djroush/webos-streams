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
  cursor: string;
};

class ClipsTab extends React.PureComponent<ClipsTabProps, ClipsTabState> {
  twitchClient: Twitch.Client = TwitchClientFactory.getInstance();

  constructor(props: ClipsTabProps) {
    super(props);
    this.removePlayer = this.removePlayer.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this.removePlayer();
    }
  };

  getClipsCallback(getClipsResponse: Twitch.ClipsResponse): void {
    const twitchClips: Twitch.Clip[] = getClipsResponse.data;
    const { cursor } = getClipsResponse.pagination;

    const clips: AppClip[] = [];
    twitchClips.forEach((twitchClip: Twitch.Clip) => {
      const now = new Date();
      const { id } = twitchClip;
      const createdDate = new Date(twitchClip.created_at);
      const relativeCreatedSeconds = Math.round(
        (now.getTime() - createdDate.getTime()) / 1000,
      );
      const thumbnailUrl = twitchClip.thumbnail_url;
      const relativeCreatedTime = TimeHelper.getFuzzyDuration(
        relativeCreatedSeconds,
      );
      const viewCount = twitchClip.view_count;

      const clip: AppClip = {
        id,
        thumbnailUrl,
        createdDate,
        relativeCreatedTime,
        relativeCreatedSeconds,
        viewCount,
      };
      clips.push(clip);
    });
    clips.sort(this.sortMostRecent);
    this.setState({ clips, clipid: null, cursor });
  }

  clipClick = (event: React.MouseEvent): void => {
    const { clips, cursor } = this.state;
    const clipid = event.currentTarget.getAttribute('data-id');

    this.setState({ clips, clipid, cursor });
  };

  sortMostRecent = (a: AppClip, b: AppClip): number =>
    a.relativeCreatedSeconds > b.relativeCreatedSeconds ? 1 : -1;

  loadClips(user: AppUser): void {
    const callback = this.getClipsCallback.bind(this);
    this.twitchClient.getClips(user.id, callback);
  }

  removePlayer(): void {
    const { clips, cursor } = this.state;
    this.setState({ clips, clipid: null, cursor });
  }

  render(): JSX.Element {
    const { clips, clipid } = this.state;
    const { clipClick } = this;
    const { isActive } = this.props;

    if (!isActive) {
      return <div id="clips" />;
    }
    if (clipid !== null) {
      return (
        <div id="clips">
          <ClipsPlayer
            clipid={clipid}
            removePlayer={this.removePlayer}
            onKeyPress={this.onKeyPress}
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
  cursor: null,
};

export default ClipsTab;
