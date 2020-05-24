import React, {Component} from 'react';

import './StreamTab.css';

class StreamTab extends Component implements StreamTab {
  props: TabProps;
  state: TabState = {
	active: false
  }
  constructor(props: Readonly<any>) {
	super(props); 
  }   

  render() {
	if (this.state.active) {
      return (<div id="stream" className="tab"><div id="twitch-embed"/></div>);
    } else {
	  return (null)
    }
  }

  setState(state: TabState) {
    this.state = state;	
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
