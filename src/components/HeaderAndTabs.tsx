import React from 'react';

import * as Twitch from '../clients/TwitchClient';

import TwitchClientFactory from '../clients/TwitchClientFactory';
import NavBar from './NavBar';
import TabsContainer from './TabsContainer';

type HeaderAndTabsState = {
  user: AppUser;
  activeTab: string;
  videoid: number;
};

class HeaderAndTabs extends React.Component<unknown, HeaderAndTabsState> {
  twitchClient: Twitch.Client = TwitchClientFactory.getInstance();

  navBar: NavBar;

  tabsContainer: TabsContainer;

  constructor(props: unknown) {
    super(props);
    this.videoClick = this.videoClick.bind(this);
    this.clickNavHeader = this.clickNavHeader.bind(this);
  }

  propogateChanges = (state: HeaderAndTabsState): void => {
    const { user, activeTab, videoid } = state;
    super.setState({ user });
    if (user != null) {
      this.navBar.setState({ user, activeTab });
      this.tabsContainer.setState({ user, activeTab, videoid });
    }
  };

  // Listeners
  videoClick = (event: React.MouseEvent): void => {
    const dataid = event.currentTarget.getAttribute('data-id');
    const { user } = this.state;
    const videoid: number = parseInt(dataid, 10);
    const activeTab = 'stream';
    this.propogateChanges({
      user,
      activeTab,
      videoid,
    });
  };

  // TODO: remove setState calls in favor of propogatingchanges
  clickNavHeader = (event: React.MouseEvent): void => {
    const { target } = event;
    if (target instanceof Element) {
      const activeTab: string = target.textContent.toLowerCase();
      const { user, videoid } = this.state;
      this.propogateChanges({
        user,
        activeTab,
        videoid,
      });
    }
  };

  loadUser = (channel: string): void => {
    const callback = this.getUserCallback.bind(this);
    this.twitchClient.getUser(channel, callback);
  };

  getUserCallback = (response: Twitch.UserResponse): void => {
    if (response && response.data.length === 1) {
      const twitchUser: Twitch.User = response.data[0];

      /* eslint-disable camelcase */
      const { id, login, profile_image_url, display_name } = twitchUser;
      const user: AppUser = {
        id,
        login,
        profileImageUrl: profile_image_url,
        displayName: display_name,
      };
      /* eslint-enable camelcase */
      const activeTab = 'stream';
      const videoid: number = null;

      this.propogateChanges({
        user,
        activeTab,
        videoid,
      });
    }
  };

  render(): JSX.Element {
    return (
      <div>
        <NavBar
          ref={(node) => {
            this.navBar = node;
          }}
          headerClick={this.clickNavHeader}
        />
        <TabsContainer
          ref={(node) => {
            this.tabsContainer = node;
          }}
          videoClick={this.videoClick}
        />
      </div>
    );
  }
}

HeaderAndTabs.prototype.state = {
  user: null,
  activeTab: null,
  videoid: null,
};

export default HeaderAndTabs;
