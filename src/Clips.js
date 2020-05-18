import React, { Component } from 'react';
import './Clips.css';

class Clips extends Component {

  clipsDiv;
  constructor(props) {
    super(props);
    this.clipsDiv = React.createRef();
  }

  render() {
    return (
      <div id="clips" className="tab" ref={this.clipsDiv}></div>
    );
  }

  getClipsCallback(getClipsResponse) {
    var now = new Date();
  	$.each(getClipsResponse.data, function(_, value){
      var thumb_url= value.thumbnail_url;
      var created_date = new Date(value.created_at);
      var seconds = Math.round((now - created_date)/1000);
      var relative_created_time = getFuzzyDuration(seconds);
          
      this.clipsDiv.append(
        '<div class="video">' +
          '<a href="javascript:void(0)" data-id="' + value.id + '"><img src="' + thumb_url + '"></img></a>' +
          '<div class="videoOverlay bottomLeft">' + value.view_count + ' views</div>' + 
          '<div class="videoOverlay bottomRight">' + relative_created_time + '</div>' + 
        '</div>'
      );
  	})
  	
  	clipsClickListeners();
  }

  clipsClickListeners() {
    $(".clips a").click(function(event) {
      var clipid = event.currentTarget.getAttribute("data-id");
      activateTab("stream");
      playVideo(clipid);    	
	});
  };

}

export default Clips;