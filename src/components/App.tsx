import React, {Component, KeyboardEvent} from 'react';

import './App.css';

import Config, {APP} from '../Config'; 
import TwitchClient from '../clients/TwitchClient'
import TwitchClientFactory from '../clients/TwitchClientFactory'

import StreamTab from './StreamTab';
import ClipsTab from './ClipsTab';
import VideosTab from './VideosTab';

import $ from 'jquery';

class App extends Component {
  twitchClient: TwitchClient;
  

  constructor(props: any) {
	super(props);
	Config.setup();
	this.twitchClient = TwitchClientFactory.getInstance();
  }

  render() {
    return ( 
      <div className="App">
        <div id="header">
	   	  <div id="searchBar">
             <span>Channel Name:&nbsp;</span>{
		  }<input type="text" placeholder="test" id="channelInput" onKeyUp={this.checkKeyPress}/>{
          }<button id="loadButton" onClick={this.loadChannel}>Load</button>
		  </div>
		    <div id="channelNavBar" className="hidden">
		       <div id="profile"></div>
		       <div>
		 	      <ul>  
		 	        <li className="tabNav"><a id="streamNav" onClick={this.showTab}>Stream</a></li>
		 	        <li className="tabNav"><a id="videosNav" onClick={this.showTab}>Videos</a></li>
		 	        <li className="tabNav"><a id="clipsNav" onClick={this.showTab}>Clips</a></li>
		 	      </ul>
		       </div>
		     </div>
	     </div>
		{/* TabsContainer component */}
         <div id="tabsContainer" className="hidden">
           <StreamTab/>
           <VideosTab/>
           <ClipsTab/>
         </div>
      </div>
	);
  }

  private loadChannel = () => {
	const channel: string = $("#channelInput").val().toString();
    if (channel && channel == null || channel === "") {
    	$("#tabsContainer .tab").empty();
        this.twitchClient.getUser(channel, this.getUserCallback);
    }
  };
 
  private checkKeyPress = (event:KeyboardEvent): void => { 
	if (event.key === 'Enter') {
	   this.loadChannel();
	}
  };

  private showTab = (event:any): void => {
	var tab=event.target.text.toLowerCase();

	if (tab) {
		this.activateTab(tab);
		var user = APP.State.User;
		this.loadTab(user.id);
	
	}
  };

   videoClickListeners = (): void => {
//	const parent = this;
    $(".video a").click(function(event) {
/*   	var videoid = event.currentTarget.getAttribute("data-id");
		//streamtab.playVideo
    	parent.activateTab("stream");
        parent.playVideo(videoid);
*/
	});
  }

  getUserCallback = (response: any): void => {
    if (response && response.data.length == 1) {
        var user = response.data[0];
        $("#channelNavBar, #tabsContainer").removeClass("hidden");
        var profileDiv = $("#profile");
        profileDiv.empty();
        profileDiv.attr("data-id", user.id);
        profileDiv.append('<img class="profileImage" src="' + user.profile_image_url + '"></img><span>' + user.display_name + '</span>');

		APP.State.User = user;
        
        this.loadTab(user.id);
    }
  }

  activateTab = (clickedTab: string): void => {
    $(".tabNav.active").removeClass("active");
    $('#' + clickedTab + 'Nav')[0].parentElement.classList.add("active");
    $(".tab.active").removeClass("active");
    var activeTab = $("#" + clickedTab);
    activeTab.addClass("active");
    activeTab.empty();
    if (clickedTab === 'stream') {
        activeTab.append('<div id="twitch-embed"></div>');
    }
  }

  loadTab = (userid: string): void => {
    //Load data on the active tab
    var activeTab = $(".tabNav.active a").text();
    if (activeTab && userid) {
        switch(activeTab) {
        case 'Stream': 
            this.twitchClient.getStream(userid, this.getStreamCallback);
            break;
        case 'Videos':
            this.twitchClient.getVideos(userid, this.getVideosCallback);
            break;
        case 'Clips':
            break;
        default: console.warn("Invalid tab (" + activeTab + ") while attempting to load data");
        }
    }
  }

  getStreamCallback = (): void => {
/*
	  var user = APP.State.User;
	  //TODO: see if this works correctly
	  this.render();
	  this.playStream(user.login, false);
*/
  }

  getVideosCallback = (): void => {
	//TODO: pass through a call to videos class
  }

}

export default App;