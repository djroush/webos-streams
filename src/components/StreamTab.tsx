import React, {Component} from 'react';
import './StreamTab.css';

class StreamTab extends Component {
  Twitch = require('../lib/twitch-embed-v1.js');  

  render() {
    return ( 
      <div id="stream" className="tab active">
        <div id="twitch-embed"></div>
      </div>
    );
  }

  playStream(channel: string, withChat: boolean) {
    var layout = withChat ? 'video-with-chat' : 'video';
    new this.Twitch.Embed("twitch-embed", {
      width: 1024,
      height: 768,
      channel: channel,
      layout: layout,
      allowFullScreen: true,
      theme: "dark"
    });
  }

  playVideo(videoid: number) {
    new this.Twitch.Embed("twitch-embed", {
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
