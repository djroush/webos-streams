import React, { Component } from 'react';
import './Tabs.css';
import Clips from './Clips';
import Videos from './Videos';
import Stream from './Stream';

class Tabs extends Component {
  render() {
    return (
        <div id="tabsContainer" className="hidden">
          <Stream/>
          <Videos/>
          <Clips/>
        </div>
    );
  }

  activateTab(clickedTab) {
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

  loadTab(userid) {
    //Load data on the active tab
    var activeTab = $(".tabNav.active a").text();
    if (activeTab && userid) {
        switch(activeTab) {
        case 'Stream': 
            getStream(userid);
            //getStreamCallback(undefined);
            break;
        case 'Videos':
            getVideos(userid);
            //getVideosCallback(getVideosResponse);
            break;
        case 'Clips':
        	getClips(userid);
        	//getClipsCallback(getClipsResponse);
            break;
        default: console.warn("Invalid tab (" + activeTab + ") while attempting to load data");
        }
    }
}


}

export default Tabs;
