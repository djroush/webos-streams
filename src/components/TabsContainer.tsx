import React from 'react'

import '../css/TabsContainer.css'

import StreamTab from '../components/StreamTab'
import VideosTab from '../components/VideosTab'
import ClipsTab from '../components/ClipsTab'

//To make the Twitch library happy
declare var Twitch: any

type TabsContainerProps = {
	videoClick: () => (event: React.MouseEvent<any, any>) => void
}

type TabsContainerState = {
	activeTab?: string,
	user?: AppUser,
	videoid: number
}

class TabsContainer extends React.Component<TabsContainerProps, TabsContainerState> {
  streamTab: StreamTab
  videosTab: VideosTab
  clipsTab:  ClipsTab
	
  setState(state: TabsContainerState) {
    const oldUser = this.state.user && this.state.user.login
	const newUser = state.user && state.user.login
	const oldTab = this.state.activeTab
	const newTab = state.activeTab
    const isUserUpdated =  newUser !== oldUser && newUser !== null
    const isTabChanged = oldTab !== newTab || oldTab === null
   
    super.setState(state)

    if (isUserUpdated) {
	  this.streamTab.removePlayer()
	  this.clipsTab.removePlayer()
      this.videosTab.loadVideos(state.user)
      this.clipsTab.loadClips(state.user)
    }

    if (isTabChanged) {
	    if (newTab === 'stream') {
	      const videoid = state.videoid
		  if (videoid !== null) {
	         this.playVideo(videoid)
		  } else {       
		    this.playStream(newUser, false)
          }
	    } else  {
		  this.streamTab.removePlayer()
        }
	    if (newTab !== 'clips') {
		  this.clipsTab.removePlayer()
	    }
	}

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
	const {videoClick} = this.props
	const { user, activeTab } = this.state
	const hasUser = user !== null
	
	if (hasUser) {
	  return (
       <div id="tabsContainer">
         <StreamTab ref={(node) => { this.streamTab = node;}} isActive={activeTab === 'stream'} />
         <VideosTab ref={(node) => { this.videosTab = node;}} isActive={activeTab === 'videos'} videoClick={videoClick} />
         <ClipsTab  ref={(node) => { this.clipsTab = node;}} isActive={activeTab === 'clips'} />
       </div>

      )
	} else {
		return (<div id="tabsContainer"/>);
	}
  }
}

TabsContainer.prototype.state = {
	activeTab: null,
	user: null,
	videoid: null
}

export default TabsContainer