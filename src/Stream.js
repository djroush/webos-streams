import React, { Component, useRef } from 'react';
import './Stream.css';

class Stream extends Component {
  
  streamDiv;
  constructor(props) {
    super(props);
    this.streamDiv = React.createRef();
  }

  render() {
    return (
	  <div id="stream" className="tab active" ref={this.streamDiv}></div>
    );
  }

  getStreamCallback(getStreamResponse) {
	  //TOOD: use this or remove the parameter
	  var user = retrieveUser();
	  streamDiv.empty();
    streamDiv.append('<div id="twitch-embed"></div>');
	  playStream(user.login, false);
  }

  playStream(channel, withChat) {
    var layout = withChat ? 'video-with-chat' : 'video';
    var player = new Twitch.Embed("twitch-embed", {
      width: 1024,
      height: 768,
      channel: channel,
      layout: layout,
      allowFullScreen: true,
      theme: "dark"
    });
  }

  playVideo(videoid) {
    var player = new Twitch.Embed("twitch-embed", {
      width: 1024,
      height: 768,
      video: videoid,
      layout: 'video',
      allowFullScreen: true,
      theme: "dark"
    });
  }

}

export default Stream;
