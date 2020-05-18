import React, { Component, useRef } from 'react';

class Player extends Component {

  playerDiv = useRef(null);
  player = undefined;

  render() {
    return (
	  <div id="twitch-embed" ref={playerDiv}></div>
    );
  }

  getStreamCallback(getStreamResponse) {
	  //TOOD: use this or remove the parameter
	  var user = retrieveUser();
	  //TODO: see if this works correctly
	  this.render();
	  playStream(user.login, false);
  }

  playStream(channel, withChat) {
    var layout = withChat ? 'video-with-chat' : 'video';
    player = new Twitch.Embed("twitch-embed", {
      width: 1024,
      height: 768,
      channel: channel,
      layout: layout,
      allowFullScreen: true,
      theme: "dark"
    });
  }

  playVideo(videoid) {
    player = new Twitch.Embed("twitch-embed", {
      width: 1024,
      height: 768,
      video: videoid,
      layout: 'video',
      allowFullScreen: true,
      theme: "dark"
    });
  }
}

export default Player;
