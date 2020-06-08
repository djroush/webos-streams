import React from 'react';

//These two conflict and the first one can't change names'
declare var Twitch: any
import * as Twitch1 from '../clients/TwitchClient'

import TwitchClientFactory from '../clients/TwitchClientFactory'
import SearchBar from '../components/SearchBar'
import NavBar from '../components/NavBar'
import TabsContainer from '../components/TabsContainer'

type AppState = {
  activeTab?: string;
  user?: AppUser;
}

class App extends React.Component<{}, AppState> {
  twitchClient: Twitch1.Client = TwitchClientFactory.getInstance()

  searchBar: SearchBar;
  navBar: NavBar;
  tabsContainer: TabsContainer;
  
  //Listeners
  videoClickListener = (event: React.MouseEvent<any, any>): void => {
    const videoid: number = parseInt(event.currentTarget.getAttribute("key"));
	this.setState({ 
		user: this.state.user, activeTab: 'stream'
	});
    this.playVideo(videoid);    	
  };

  clickNavHeader = (event:React.MouseEvent): void => {
	const target: EventTarget = event.target;
	if (target instanceof Element) {
		const activeTab: string = target.textContent.toLowerCase();
		this.setState({ 
		  user: this.state.user, activeTab: activeTab
	    });
	}
  };

  loadChannel = (channel: string) => {
    const callback = this.getUserCallback.bind(this);
    this.twitchClient.getUser(channel, callback);
  };

  getUserCallback = (response: Twitch1.UserResponse): void => {
    if (response && response.data.length == 1) {
        const twitchUser: Twitch1.User = response.data[0];
		
		const {id, login, profile_image_url, display_name} = twitchUser
		const user: AppUser = {
			id: id,
			login: login,
			profile_image_url: profile_image_url,
			display_name: display_name
		}

        this.setState({
		  user: user, activeTab: 'stream'
	    })
        this.playStream(user.login, false)
		//Stream will auto play when stream tab loads
    }
  }



  setState(state: AppState) {
	super.setState(state)

	this.navBar.setState(state)
	this.tabsContainer.setState(state)
  }

  playStream(channel: string, withChat: boolean) {
    var layout = withChat ? 'video-with-chat' : 'video';
    new Twitch.Embed("twitch-embed", {
      width: 1024,
      height: 768,
      channel: channel,
      layout: layout,
      allowFullScreen: true,
      theme: "dark"
    });
  }

  playVideo(videoid: number) {
    new Twitch.Embed("twitch-embed", {
      width: 1024,
      height: 768,
      video: videoid,
      layout: 'video',
      allowFullScreen: true,
      theme: "dark"
    });
  }

  render() {
	const loadChannel = this.loadChannel.bind(this)
	const videoClick = this.videoClickListener.bind(this)
	const headerClick = this.clickNavHeader.bind(this)
	const user = this.state.user 

   return (
      <div className="App">
        <div id="header">
          <SearchBar ref={(node) => { this.searchBar = node;}} loadChannel={loadChannel} />
          <NavBar ref={(node) => { this.navBar = node;}} user={user} headerClick={headerClick} />
	    </div>
        <TabsContainer ref={(node) => { this.tabsContainer = node;}} videoClick={videoClick}/>
      </div>
   )
  }
}

App.prototype.state = {
  activeTab: null, user: null
}

export default App;