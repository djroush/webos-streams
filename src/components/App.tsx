import React from 'react';

import * as Twitch from '../clients/TwitchClient';

import TwitchClientFactory from '../clients/TwitchClientFactory';
import SearchBar from './SearchBar';
import NavBar from './NavBar';
import TabsContainer from './TabsContainer';

type GlobalAppState = {
  activeTab: string;
  user?: AppUser;
  videoid: number;
};
type AppState = {
  user?: AppUser;
  videoid: number;
};

class App extends React.Component<unknown, AppState> {
  twitchClient: Twitch.Client = TwitchClientFactory.getInstance();

  searchBar: SearchBar;

  navBar: NavBar;

  tabsContainer: TabsContainer;

  setGlobalState(state: GlobalAppState): void {
    const { user, activeTab, videoid } = state;
    const storedState = { user, videoid };
    super.setState(storedState);
    if (activeTab != null && user != null) {
      this.navBar.setState(state);
      this.tabsContainer.setState(state);
    }
  }

  // Listeners
  videoClick = (event: React.MouseEvent): void => {
    const { user } = this.state;
    const dataid = event.currentTarget.getAttribute('data-id');
    const videoid: number = parseInt(dataid, 10);
    this.setGlobalState({
      user,
      activeTab: 'stream',
      videoid,
    });
  };

  // TODO: remove setState calls in favor of propogatingchanges
  clickNavHeader = (event: React.MouseEvent): void => {
    const { target } = event;
    if (target instanceof Element) {
      const activeTab: string = target.textContent.toLowerCase();
      const { user, videoid } = this.state;
      this.setGlobalState({
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

      this.setGlobalState({
        user,
        activeTab: 'stream',
        videoid: null,
      });
    }
  };

  render(): JSX.Element {
    // TODO: find another place to bind these!
    const loadUser = this.loadUser.bind(this);
    const videoClick = this.videoClick.bind(this);
    const clickNavHeader = this.clickNavHeader.bind(this);

    return (
      <div className="App">
        <div id="header">
          <SearchBar
            ref={(node) => {
              this.searchBar = node;
            }}
            loadUser={loadUser}
          />
          <NavBar
            ref={(node) => {
              this.navBar = node;
            }}
            headerClick={clickNavHeader}
          />
        </div>
        <TabsContainer
          ref={(node) => {
            this.tabsContainer = node;
          }}
          videoClick={videoClick}
        />
      </div>
    );
  }
}

App.prototype.state = {
  user: null,
  videoid: null,
};

export default App;
