import React from 'react';

import TwitchClientFactory, {TwitchClient} from '../clients/TwitchClientFactory'
import SearchBar from '../components/SearchBar'
import NavBar from '../components/NavBar'
import TabsContainer from '../components/TabsContainer'


//To make typescript happy
declare var Twitch: any;

export type AppState = {
  activeTab?: string;
  user?: TwitchUser;
}

class App extends React.Component<{}, AppState> {
  //This relies on Config.setup() so it can't be instantiated earlier
  twitchClient: TwitchClient = TwitchClientFactory.getInstance()

  searchBar: SearchBar;
  navBar: NavBar;
  tabsContainer: TabsContainer;
 
  //Listeners
  videoClickListener = (event: React.MouseEvent<any, any>): void => {
    const clipid: number = parseInt(event.currentTarget.getAttribute("data-id"));
	this.setState({ 
		user: this.state.user, activeTab: 'stream'
	});
    this.playVideo(clipid);    	
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

  getUserCallback = (response: TwitchUserResponse): void => {
    if (response && response.data.length == 1) {
        const user: TwitchUser = response.data[0];
        this.setState({
		  user: user, activeTab: 'stream'
	    })
        this.playStream(user.login, false)
		//Stream will auto play when stream tab loads
    }
  }

  getVideosCallback = (event: React.MouseEvent): void => {
	const videoid: number = parseInt(event.currentTarget.getAttribute("data-id"));
	this.setState({ 
		user: this.state.user, activeTab: 'stream'
	});
	this.playVideo(videoid);
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