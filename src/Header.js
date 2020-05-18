import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
	    <div>
	  	  <div id="searchBar">
		      <span>Channel Name:&nbsp;</span><input type="text" placeholder="test" id="channelInput" onKeyUp={this.checkKeyPress}></input><button id="loadButton onClick={loadChannel}">Load</button>
		    </div>
		    <div id="channelNavBar" className="hidden">
		      <div id="profile"></div>
		      <div>
			      <ul>
			        <li className="tabNav active"><a id="streamNav" onClick={this.showTab}>Stream</a></li>
			        <li className="tabNav"><a id="videosNav" onClick={this.showTab}>Videos</a></li>
			        <li className="tabNav"><a id="clipsNav" onClick={this.showTab}>Clips</a></li>
			      </ul>
		      </div>
		    </div>
	    </div>
    );
  }

  loadChannel() {
    var channel=$("#channelInput").val();
    if (channel && !channel.isEmpty()) {
    	$("#tabsContainer .tab").empty();
        getUser(channel);
    }
  };
 
  checkKeyPress(event) { 
	if (event.originalEvent.code === 'Enter') {
		loadChannel();
	}
  };

  showTab(event) {
	var tab=event.target.text.toLowerCase();

	if (tab) {
		activateTab(tab);
		var user = retrieveUser();
		loadTab(user.id);
	
	}
  };

  videoClickListeners() {
    $(".video a").click(function(event) {
    	var videoid = event.currentTarget.getAttribute("data-id");
    	activateTab("stream");
        playVideo(videoid);
	});
  }

  getUserCallback(response) {
    if (response && response.data.length == 1) {
        var user = response.data[0];
        $("#channelNavBar, #tabsContainer").removeClass("hidden");
        var profileDiv = $("#profile");
        profileDiv.empty();
        profileDiv.attr("data-id", user.id);
        profileDiv.append('<img class="profileImage" src="' + user.profile_image_url + '"></img><span>' + user.display_name + '</span>');
        storeUser(user);
        loadTab(user.id);
    }
  }

}

export default Header;
