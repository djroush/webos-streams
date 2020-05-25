import React, { Component } from 'react';

import './ClipsTab.css';

import TwitchClientInterface from '../clients/TwitchClient';
import TwitchClientFactory from '../clients/TwitchClientFactory';
import TimeHelper from '../helper/TimeHelper'; 

import $ from 'jquery';
import ReactDOM from 'react-dom';

class ClipsTab extends Component {
  twitchClient: TwitchClientInterface = TwitchClientFactory.getInstance();
  clipsDiv: HTMLDivElement;

  state: TabState = {
	active: false,
	user: null
  }
  props: TabProps;
  
  constructor(props:any) {
    super(props);
    this.props = props;
  }

  render() {
	const className = "tab" + (this.state.active ? " active" : "");
    return (<div id="clips" ref={(node) => { this.clipsDiv = node;}} className={className}></div>);
  }

  setState(state: TabState) {
    super.setState(state);	
    this.state = state;
  } 

  componentDidUpdate() {
	const user = this.state.user;
	if (user && user.id) {
	  const callback = this.getClipsCallback.bind(this);
      if (this.state.active) {
        this.twitchClient.getClips(user.id, callback);
      }
	}
  }
  
  getClipsCallback(getClipsResponse: any) {
    const clipElems : JSX.Element[] = [];
    const callback = this.getClip.bind(this, clipElems);
  	$.each(getClipsResponse.data, callback)
    ReactDOM.render(clipElems, this.clipsDiv);
  }
  getClip(clipElems: JSX.Element[], key: number, clip: ClipsType) {
    const now = new Date();
    const created_date = new Date(clip.created_at);
    const seconds = Math.round((now.getTime() - created_date.getTime())/1000);
    clip.relative_created_time = TimeHelper.getFuzzyDuration(seconds);
    const clipDivElem: JSX.Element = ( 
	  <div key={key} className="video">
        <a href="void(0)" data-id={clip.id} onClick={this.props.clickListener}>
          <img src={clip.thumbnail_url}/>
        </a>
        <div className="overlay bottomLeft">{clip.view_count} views</div>
        <div className="overlay bottomRight">{clip.relative_created_time}</div> 
      </div>);
    clipElems.push(clipDivElem);
  }
}

export default ClipsTab;