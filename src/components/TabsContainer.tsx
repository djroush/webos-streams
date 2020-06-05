import React from 'react'

import '../css/TabsContainer.css'

import StreamTab from '../components/StreamTab'
import VideosTab from '../components/VideosTab'
import ClipsTab from '../components/ClipsTab'


type TabsContainerProps = {
  videoClick: (event: React.MouseEvent<any, any>) => void
}
type TabsContainerState = {
	activeTab?: string,
	user?: TwitchUser
}

class TabsContainer extends React.Component<TabsContainerProps, TabsContainerState> {
  streamTab: StreamTab
  videosTab: VideosTab
  clipsTab:  ClipsTab
	
  setState(state: TabsContainerState) {
    const oldUser = this.state.user && this.state.user.login
	const newUser = state.user && state.user.login
    const isUserUpdated = newUser !== null && newUser !== oldUser
    const oldActiveTab = this.state.activeTab
    const newActiveTab = state.activeTab
    const isActiveTabUpdated = oldActiveTab === newActiveTab
   
	
    super.setState(state)

    if (isActiveTabUpdated) {
	  //TODO: do i need this?
    }

    if (isUserUpdated) {
	  this.streamTab.removePlayer()
      this.videosTab.setUser(state.user)
      this.clipsTab.setUser(state.user)
    }
  }

  render() {
	const { videoClick } = this.props
	const { user } = this.state
	const hasUser = user !== null
	
	if (hasUser) {
	  const {activeTab} = this.state
	  return (
       <div id="tabsContainer">
         <StreamTab ref={(node) => { this.streamTab = node;}} isActive={activeTab === 'stream'} />
         <VideosTab ref={(node) => { this.videosTab = node;}} isActive={activeTab === 'videos'} videoClick={videoClick} />
         <ClipsTab  ref={(node) => { this.clipsTab = node;}} isActive={activeTab === 'clips'} clipClick={videoClick} />
       </div>
      )
	} else {
		return (<div id="tabsContainer"/>);
	}
  }
}

TabsContainer.prototype.state = {
	activeTab: null,
	user: null
}

export default TabsContainer