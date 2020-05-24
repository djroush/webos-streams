import React, {Component, KeyboardEvent, MouseEvent} from 'react';

import './App.css';

import StreamTab from './StreamTab';
import ClipsTab from './ClipsTab';
import VideosTab from './VideosTab';
import NavHeader from './NavHeader';
import Config, {APP} from '../Config'; 
import TwitchClient from '../clients/TwitchClient'
import TwitchClientFactory from '../clients/TwitchClientFactory'

import $ from 'jquery';

class App extends Component {
  twitchClient: TwitchClient;

  streamNav: NavHeader;
  videosNav: NavHeader;
  clipsNav: NavHeader;
  streamTab: StreamTab;
  videosTab: VideosTab;
  clipsTab: ClipsTab;
  
  state: AppState = {}

  constructor(props: Readonly<any>) {
	super(props);
	Config.setup();
	this.twitchClient = TwitchClientFactory.getInstance();
  }

  render() {
    return ( 
      <div className="App">
        <div id="header">
          <this.searchBarElem/>
          <this.channelNavBarElem/> 
	    </div>
        <this.tabsContainerElem/>
      </div>
	);
  }

  searchBarElem = (): JSX.Element => {
	return (
	  <div id="searchBar">
        <span>Channel Name:&nbsp;</span>
	    <input type="text" placeholder="test" id="channelInput" onKeyUp={this.checkKeyPress}/>
        <button id="loadButton" onClick={this.loadChannel}>Load</button>
	  </div>
    )
  }
	
  channelNavBarElem = (): JSX.Element => {
	if (this.state.user) {
	  return (
      <div id="channelNavBar">
        <div id="profile" data-id={this.state.user.id}>
          <img className="profileImage" src={this.state.user.profile_image_url}></img>
          <span>{this.state.user.display_name}</span>
        </div>
        <div>
 	      <ul>  
            <NavHeader id="streamNav" ref={(node) => { this.streamNav = node;}} text="Stream" {...this.navHeaderProps}/>
            <NavHeader id="videosNav" ref={(node) => { this.videosNav = node;}} text="Videos" {...this.navHeaderProps}/>
            <NavHeader id="clipsNav" ref={(node) => { this.clipsNav = node;}} text="Clips" {...this.navHeaderProps}/>
 	      </ul>
        </div>
      </div>	
      )	
	} else {
		return (null);
	}
  }
	
  tabsContainerElem = (): JSX.Element => {
	if (this.state.user) {
	  return (
     <div id="tabsContainer">
       <StreamTab ref={(node) => { this.streamTab = node;}} {...this.tabProps}/>
       <VideosTab ref={(node) => { this.videosTab = node; }} {...this.tabProps}/>
       <ClipsTab ref={(node) => { this.clipsTab = node; }} {...this.tabProps}/>
     </div>
      )
	} else {
		return (null);
	}
  }
 
  private clickListener = (event: React.MouseEvent<any, any>): void => {
    const clipid: number = parseInt(event.currentTarget.getAttribute("data-id"));
    this.setActiveTab("stream");
    this.streamTab.playVideo(clipid);    	
  };

  private checkKeyPress = (event:KeyboardEvent): void => { 
	if (event.key === 'Enter') {
	   this.loadChannel();
	}
  };
  private clickNavHeader = (event:React.MouseEvent): void => {
	const target: EventTarget = event.target;
	
	if (target instanceof Element) {
		const tab: string = target.textContent.toLowerCase();
		this.setActiveTab(tab);		
	}
  };

  private loadChannel = () => {
	const channel: string = $("#channelInput").val().toString();
    if (channel && channel !== "") {
		const callback = this.getUserCallback.bind(this);
        this.twitchClient.getUser(channel, callback);
    }
  };
 

  setUser = (user: UserType): void => {
	APP.State.User = user;
	this.setState({ user: user, activeTab: "stream"});
  }
  setActiveTab = (tab: string): void => {
	this.setState({ user: this.state.user, activeTab: tab});

    this.streamTab.setState({active: tab === 'stream'})
    this.streamNav.setState({active: tab === 'stream'})
    this.videosTab.setState({active: tab === 'videos'})
    this.videosNav.setState({active: tab === 'videos'})
    this.clipsTab.setState({active: tab === 'clips'})
    this.clipsNav.setState({active: tab === 'clips'})
  }

  tabProps: TabProps = {
    parent: this,
    clickListener: this.clickListener
  }
  private navHeaderProps: TabProps = {
	clickListener: this.clickNavHeader
  }

  getUserCallback = (response: any): void => {
    if (response && response.data.length == 1) {
        const user: UserType = response.data[0];
		this.setUser(user);
		this.setActiveTab('stream')
    }
  }

// FIXME: Do i need this method
  getStreamCallback = (): void => {
	const user = APP.State.User;
	this.setActiveTab("stream");
	this.streamTab.playStream(user.login, false);
  }

  getVideosCallback = (event: MouseEvent): void => {
	const videoid: number = parseInt(event.currentTarget.getAttribute("data-id"));
	this.setActiveTab("stream");
	this.streamTab.playVideo(videoid);
  }

}

export default App;