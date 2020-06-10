import React from 'react'

import '../css/ClipsPlayer.css'
import CONFIG from '../index'

type ClipsPlayerProps = {
	clipid: string,
	removePlayer: () => () => void,
	onKeyPress: () => (event: React.KeyboardEvent) => void,
}

class ClipsPlayer extends React.Component<ClipsPlayerProps, {}> {
  //TODO: find a way to bind the key listener to escape button 

  render() {
	const {clipid, removePlayer} = this.props
	const parent=CONFIG.hostName
	const className = clipid !== null ? 'active' : ''
	const src="https://clips.twitch.tv/embed?clip=" + clipid + "&parent=" + parent 

    //TODO: add/remove a listener 
    return (
      <div id="clipPlayer" className={className} onClick={removePlayer}>
          <iframe id="clipPlayerFrame"
		    src={src}
		    width="1024"
		    height="768"
		    frameBorder="0"
		    scrolling="no"
		    allowFullScreen={true}
           />
	  </div>
    )
  }
}

export default ClipsPlayer