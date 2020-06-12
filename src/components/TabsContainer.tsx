import React from 'react';

import '../css/TabsContainer.css';

import StreamTab from './StreamTab';
import VideosTab from './VideosTab';
import ClipsTab from './ClipsTab';

// To make the Twitch library happy
declare let Twitch: any;

type TabsContainerProps = {
  videoClick: (event: React.MouseEvent) => void;
};

export type TabsContainerState = {
  activeTab?: string;
  user?: AppUser;
  videoid: number;
};

class TabsContainer extends React.Component<
  TabsContainerProps,
  TabsContainerState
> {
  twitchPlayer: any = null;

  streamTab: StreamTab;

  videosTab: VideosTab;

  clipsTab: ClipsTab;

  setState(state: TabsContainerState): void {
    const oldUser = this.state.user && this.state.user.login;
    const newUser = state.user && state.user.login;
    const oldTab = this.state.activeTab;
    const newTab = state.activeTab;
    const isUserUpdated = newUser !== oldUser && newUser !== null;
    const isTabChanged = oldTab !== newTab || oldTab === null;

    super.setState(state);

    if (isUserUpdated) {
      // TODO: pause playback when tab changes?
      //      this.streamTab.removePlayer();
      //      this.clipsTab.removePlayer();
      this.videosTab.loadVideos(state.user);
      this.clipsTab.loadClips(state.user);
    }

    if (isUserUpdated || isTabChanged) {
      if (newTab === 'stream') {
        const { videoid } = state;
        if (videoid !== null) {
          this.playVideo(videoid);
        } else {
          this.playStream(newUser);
        }
        //      } else {
        //        this.streamTab.removePlayer();
      }
      //      if (newTab !== 'clips') {
      //        this.clipsTab.removePlayer();
      //      }
    }
  }

  playStream(channel: string): void {
    if (this.twitchPlayer === null) {
      this.twitchPlayer = new Twitch.Player('twitch-embed', {
        width: 1024,
        height: 768,
        allowfullscreen: true,
        channel,
      });
    } else {
      this.twitchPlayer.setChannel(channel);
    }
  }

  playVideo(videoid: number): void {
    // twitchPlayer should always be non null by this point
    this.twitchPlayer.setVideo(videoid);
  }

  render(): JSX.Element {
    const { videoClick } = this.props;
    const { user, activeTab } = this.state;
    const hasUser = user !== null;

    if (hasUser) {
      return (
        <div id="tabsContainer">
          <StreamTab
            ref={(node) => {
              this.streamTab = node;
            }}
            isActive={activeTab === 'stream'}
          />
          <VideosTab
            ref={(node) => {
              this.videosTab = node;
            }}
            isActive={activeTab === 'videos'}
            videoClick={videoClick}
          />
          <ClipsTab
            ref={(node) => {
              this.clipsTab = node;
            }}
            isActive={activeTab === 'clips'}
          />
        </div>
      );
    }
    return <div id="tabsContainer" />;
  }
}

TabsContainer.prototype.state = {
  activeTab: null,
  user: null,
  videoid: null,
};

export default TabsContainer;
