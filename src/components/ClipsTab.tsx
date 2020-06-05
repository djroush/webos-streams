import React from 'react';

import '../css/ClipsTab.css';

import TwitchClientFactory, {TwitchClient} from '../clients/TwitchClientFactory';
import TimeHelper from '../helper/TimeHelper'; 

type ClipsTabProps = {
	isActive: boolean,
	clipClick: (event: React.MouseEvent<any, any>) => void
}
type ClipsTabState = {
	clips?: AppClip[],
	user?: TwitchUser
}

class ClipsTab extends React.Component<ClipsTabProps, ClipsTabState> {
  twitchClient: TwitchClient = TwitchClientFactory.getInstance();

  setUser(user: TwitchUser) {
	const callback = this.getClipsCallback.bind(this, user);
     this.twitchClient.getClips(user.id, callback);
  }

  shouldComponentUpdate(_nextProps: ClipsTabProps, nextState: ClipsTabState) {
    return 	nextState.clips !== null
  }

  getClipsCallback(user: TwitchUser, getClipsResponse: TwitchClipsResponse) {
	const twitchClips: TwitchClip[] = getClipsResponse.data
    const clips: AppClip[] = []
    twitchClips.forEach(function(twitchClip: TwitchClip) {
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

    this.setState({clips: clips, user: user})
  }

  render() {	
	const {isActive, clipClick} = this.props
	const {clips} = this.state
	const className = "tab" + (isActive ? " active" : "");

	const clipList = !clips ? "" : clips.map((clip: AppClip) =>
	    <div key={clip.id} className="clip">
          <a href="void(0)" data-id={clip.id} onClick={clipClick}>
            <img src={clip.thumbnail_url}/>
          </a>
          <div className="overlay bottomLeft">{clip.view_count} views</div>
          <div className="overlay bottomRight">{clip.relative_created_time}</div> 
        </div>
      )

    return (
        <div id="clips" className={className}>
          {clipList}
       </div>
    )
  }
}

ClipsTab.prototype.state = {
	clips: [],
	user: null
}

export default ClipsTab
