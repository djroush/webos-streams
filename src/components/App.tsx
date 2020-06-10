import React from 'react';

import * as Twitch from '../clients/TwitchClient'

import TwitchClientFactory from '../clients/TwitchClientFactory'
import SearchBar from '../components/SearchBar'
import NavBar from '../components/NavBar'
import TabsContainer from '../components/TabsContainer'

export type AppState = {
  activeTab?: string;
  user?: AppUser;
  videoid: number
}

class App extends React.Component<{}, AppState> {
  twitchClient: Twitch.Client = TwitchClientFactory.getInstance()

  searchBar: SearchBar;
  navBar: NavBar;
  tabsContainer: TabsContainer;
  
  //Listeners
  videoClick = (event: React.MouseEvent<any, any>): void => {
	const dataid = event.currentTarget.getAttribute("data-id")
    const videoid: number = parseInt(dataid);
	this.setState({ 
	  user: this.state.user, activeTab: 'stream', videoid: videoid
	});
  };


  clickNavHeader = (event:React.MouseEvent): void => {
	const target: EventTarget = event.target;
	if (target instanceof Element) {
		const activeTab: string = target.textContent.toLowerCase();
		this.setState({ 
		  user: this.state.user, activeTab: activeTab, videoid: this.state.videoid
	    });
	}
  };

  loadUser = (channel: string) => {
    const callback = this.getUserCallback.bind(this);
    this.twitchClient.getUser(channel, callback);
  };

  getUserCallback = (response: Twitch.UserResponse): void => {
    if (response && response.data.length == 1) {
        const twitchUser: Twitch.User = response.data[0];
		
		const {id, login, profile_image_url, display_name} = twitchUser
		const user: AppUser = {
			id: id,
			login: login,
			profile_image_url: profile_image_url,
			display_name: display_name
		}

        this.setState({
		  user: user, activeTab: 'stream', videoid: null
	    })
    }
  }

  setState(state: AppState) {
	const {activeTab, user} = state
	super.setState(state)
	
	if (activeTab != null && user != null) {
	  this.navBar.setState(state)
	  this.tabsContainer.setState(state)
	}
  }


  render() {
	const loadUser = this.loadUser.bind(this)
	const videoClick = this.videoClick.bind(this)
	const headerClick = this.clickNavHeader.bind(this)

    return (
      <div className="App">
        <div id="header">
          <SearchBar ref={(node) => { this.searchBar = node;}} loadUser={loadUser} />
          <NavBar ref={(node) => { this.navBar = node;}} headerClick={headerClick} />
	    </div>
        <TabsContainer ref={(node) => { this.tabsContainer = node;}} videoClick={videoClick}/>
      </div>
     )
  }
}

App.prototype.state = {
  activeTab: null, user: null, videoid: null
}

export default App;