function playStream(channel, withChat) {
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

function playVideo(videoid) {
    var player = new Twitch.Embed("twitch-embed", {
        width: 1024,
        height: 768,
        video: videoid,
        layout: 'video',
        allowFullScreen: true,
        theme: "dark"
      });
}
