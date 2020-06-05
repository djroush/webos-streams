import React from 'react';

import '../css/StreamTab.css';

import $ from 'jquery'

type StreamTabProps = {
	isActive: boolean
}

class StreamTab extends React.Component<StreamTabProps, {}> {

  removePlayer() {
	$('#twitch-embed').empty();
  }

  render() {
	const {isActive} = this.props
    const className = "tab" + (isActive ? " active" : "");

    return (<div id="stream" className={className}><div id="twitch-embed"/></div>);
  }
}

export default StreamTab;
