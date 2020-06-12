import React from 'react';

import '../css/ClipsPlayer.css';
import CONFIG from '../index';

type ClipsPlayerProps = {
  clipid: string;
  removePlayer: () => () => void;
  onKeyPress: () => (event: React.KeyboardEvent) => void;
};

class ClipsPlayer extends React.PureComponent<ClipsPlayerProps, unknown> {
  // TODO: find a way to bind the key listener to escape button

  render(): JSX.Element {
    const { clipid, removePlayer, onKeyPress } = this.props;
    const parent = CONFIG.hostName;
    const className = clipid !== null ? 'active' : '';
    const src = `https://clips.twitch.tv/embed?clip=${clipid}&parent=${parent}`;

    // TODO: add/remove a listener
    return (
      <div
        id="clipPlayer"
        className={className}
        onKeyPress={onKeyPress}
        onClick={removePlayer}
      >
        <iframe
          id="clipPlayerFrame"
          title="Embedded Twitch Player for Clips"
          src={src}
          width="1024"
          height="768"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
        />
      </div>
    );
  }
}

export default ClipsPlayer;
