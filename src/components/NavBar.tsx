import React from 'react';

import '../css/NavBar.css'

import {AppState} from '../components/App'
import NavHeader from '../components/NavHeader'

type NavBarProps = {
	user: TwitchUser
	headerClick: (event: React.MouseEvent<any, any>) => void;
}

class NavBar extends React.Component<NavBarProps, AppState> {
  streamNav: NavHeader;
  videosNav: NavHeader;
  clipsNav: NavHeader;

  //Listeners
  clickNavHeader = (event:React.MouseEvent): void => {
	const target: EventTarget = event.target;
	if (target instanceof Element) {
		const tab: string = target.textContent.toLowerCase();
		this.setState({
			activeTab: tab,
			user: this.state.user
		})	
	}
  };

  setState = (state: AppState): void => {
	super.setState(state)
	const activeTab = state.activeTab
    this.streamNav.setState({isActive: activeTab === 'stream'});
    this.videosNav.setState({isActive: activeTab === 'videos'});
    this.clipsNav.setState({isActive: activeTab === 'clips'});
  }

  render() {
	const {headerClick} = this.props
	const user = this.state.user

    if (user) {
	  return (
      <div id="channelNavBar">
		<div id="profile" key={user.id}>
          <img className="profileImage" src={user.profile_image_url}></img>
          <span>{user.display_name}</span>
        </div>
        <div>
 	      <ul>  
            <NavHeader ref={(node) => { this.streamNav = node;}} text="Stream" onClick={headerClick}/>
            <NavHeader ref={(node) => { this.videosNav = node;}} text="Videos" onClick={headerClick}/>
            <NavHeader ref={(node) => { this.clipsNav = node;}} text="Clips" onClick={headerClick}/>
 	      </ul>
        </div>
      </div>	
      )	
    } else {
	  return <div id="channelNavBar"/>
    }
  }
}

NavBar.prototype.state = {
	activeTab: null,
	user: null
}

export default NavBar;
