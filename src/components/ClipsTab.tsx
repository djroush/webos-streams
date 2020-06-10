import React from 'react';

import '../css/ClipsTab.css';

import * as Twitch from '../clients/TwitchClient'
import TwitchClientFactory from '../clients/TwitchClientFactory'
import ClipsPlayer from '../components/ClipsPlayer'
import TimeHelper from '../helper/TimeHelper'

type ClipsTabProps = {
	isActive: boolean

}
type ClipsTabState = {
	clips: AppClip[],
	clipid: string
}

class ClipsTab extends React.Component<ClipsTabProps, ClipsTabState> {
  twitchClient: Twitch.Client = TwitchClientFactory.getInstance();

  loadClips(user: AppUser) {
	const callback = this.getClipsCallback.bind(this);
     this.twitchClient.getClips(user.id, callback);
  }


  getClipsCallback(getClipsResponse: Twitch.ClipsResponse) {
	const twitchClips: Twitch.Clip[] = getClipsResponse.data
    const clips: AppClip[] = []
    twitchClips.forEach(function(twitchClip: Twitch.Clip) {
	  const now = new Date();
	  const created_date = new Date(twitchClip.created_at);
	  const seconds = Math.round((now.getTime() - created_date.getTime())/1000);
	  const relative_created_time = TimeHelper.getFuzzyDuration(seconds);

	  const clip: AppClip = {
		id: twitchClip.id,
		thumbnail_url: twitchClip.thumbnail_url,
		created_date: created_date,
		relative_created_time: relative_created_time,
		view_count: twitchClip.view_count
      }
	  clips.push(clip)
    })

    this.setState({clips: clips, clipid: null})
  }

 clipClick = (event: React.MouseEvent<any, any>): void => {
	const {clips} = this.state;
	const clipid = event.currentTarget.getAttribute("data-id")
	
	this.setState({ clips: clips, clipid: clipid })
  };

  onKeyPress = (event: React.KeyboardEvent) : void => {
    if (event.key === 'Escape') {
      this.removePlayer()
    }	
  }

  removePlayer() {
    const {clips} = this.state
    this.setState({clips: clips, clipid: null})
  }

  render() {	
	const {clips, clipid} = this.state
	const clipClick = this.clipClick
	const {isActive} = this.props

    if (!isActive) {
	  return (<div id="clips"/>)
    } else if (clipid !== null) {
	  const removePlayer = this.removePlayer.bind(this)
	  const onKeyPress = this.onKeyPress.bind(this)
	  return (
        <div id="clips">
          <ClipsPlayer clipid={clipid} removePlayer={removePlayer} onKeyPress={onKeyPress}/>
       </div>
      )
    } else {
      const clipList = !clips ? "" : clips.map((clip: AppClip) =>
        <a data-id={clip.id} key={clip.id} className="clip" onClick={clipClick}>
          <img src={clip.thumbnail_url}/>
          <div className="overlay bottomLeft">{clip.view_count} views</div>
          <div className="overlay bottomRight">{clip.relative_created_time}</div> 
        </a>
      )

	  return (
        <div id="clips">
          <div> 
            {clipList}
          </div>
       </div>
      )
    }
  }
}

ClipsTab.prototype.state = {
	clips: [],
	clipid: null
}

export default ClipsTab