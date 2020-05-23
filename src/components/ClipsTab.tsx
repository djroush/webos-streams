import React, { Component, RefObject, MouseEvent } from 'react';
import './ClipsTab.css';
import TwitchClientInterface from '../clients/TwitchClient';
import TwitchClientFactory from '../clients/TwitchClientFactory';
import {APP} from '../Config';

class ClipsTab extends Component {

  twitchClient: TwitchClientInterface = TwitchClientFactory.getInstance(); 
  self: ClipsTab = this; 
  
  clipsDiv: RefObject<HTMLDivElement>;
  constructor(props:any) {
    super(props);
    this.clipsDiv = React.createRef();
  }

  render() {
    return (
      <div id="clips" className="tab" ref={this.clipsDiv}></div>
    );
  }

  componentDidMount() {
	//TODO: pull in users id from somewhere
	/*	const user = APP.State.User;
	      this.twitchClient.getClips(user.id, this.getClipsCallback);
*/  }


  //TODO: add a type for this
  getClipsCallback(getClipsResponse: any) {
    var now = new Date();
  	$.each(getClipsResponse.data, function(_, value){
      var thumb_url= value.thumbnail_url;
      var created_date = new Date(value.created_at);
      var seconds = Math.round((now.getTime() - created_date.getTime())/1000);
      var relative_created_time = TimeHelper.getFuzzyDuration(seconds);
          
      this.clipsDiv.append(
        '<div class="video">' +
          '<a href="javascript:void(0)" data-id="' + value.id + ' onClick={clipsClickListener}"><img src="' + thumb_url + '"></img></a>' +
          '<div class="overlay bottomLeft">' + value.view_count + ' views</div>' + 
          '<div class="overlay bottomRight">' + relative_created_time + '</div>' + 
        '</div>'
      );
  	})
  	
  }

  //parent has this function, bind and pass in via props
  clipsClickListeners() {
//      var clipid = event.currentTarget.getAttribute("data-id");
//      activateTab("stream");
//      playVideo(clipid);    	
  };

}

export default ClipsTab;