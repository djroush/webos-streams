import React, { Component, RefObject, MouseEvent } from 'react';
import './Clips.css';
import TwitchInterface from '../clients/TwitchInterface';
import TwitchClientFactory from '../clients/TwitchClientFactory';
import TimeHelper from '../js/TimeHelper';

class Clips extends Component {

  twitchClient: TwitchInterface = TwitchClientFactory.getInstance();  
  
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
      this.twitchClient.getClips(userid, this.getClipsCallback);
  }


  //TODO: add a type for this
  getClipsCallback(getClipsResponse: object) {
    var now = new Date();
  	$.each(getClipsResponse.data, function(_, value){
      var thumb_url= value.thumbnail_url;
      var created_date = new Date(value.created_at);
      var seconds = Math.round((now - created_date)/1000);
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

  clipsClickListeners(event: MouseEvent) {
      var clipid = event.currentTarget.getAttribute("data-id");
      activateTab("stream");
      playVideo(clipid);    	
  };

}

export default Clips;