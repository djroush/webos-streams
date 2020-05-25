import React, {Component} from 'react';

import './StreamTab.css';

class StreamTab extends Component implements StreamTab {
  state: TabState = {
	active: false,
	user: null

  }
  constructor(props: Readonly<any>) {
	super(props); 
  }   

  render() {
    const className = "tab" + (this.state.active ? " active" : "");
	if (this.state.user && this.state.active) {  
      return (<div id="stream" className={className}><div id="twitch-embed"/></div>);
    } else {
	  return (<div id="stream" className={className}></div>);
    }
  }

  setState(state: TabState) {
    super.setState(state)
    this.state = state;
  } 

  componentDidUpdate() {
	//TODO: do i need to clear out the earlier player?
    if (this.state.active) {
	  this.playStream(this.state.user.login, false);
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
}

export default StreamTab;
