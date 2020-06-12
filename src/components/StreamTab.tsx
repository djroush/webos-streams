import React from 'react';

import '../css/StreamTab.css';

import $ from 'jquery';

type StreamTabProps = {
  isActive: boolean;
};

// TODO: Make this a videos player and put in in VideosTab and keep nav with Stream Videos Player,
// if stream not online, go to Videos by default?
class StreamTab extends React.Component<StreamTabProps, unknown> {
  shouldComponentUpdate(nextProps: StreamTabProps): boolean {
    const { isActive } = this.props;
    return isActive !== nextProps.isActive;
  }

  removePlayer = (): void => {
    $('#twitch-embed').empty();
  };

  render(): JSX.Element {
    const { isActive } = this.props;
    const className = `tab${isActive ? ' active' : ''}`;

    return (
      <div id="stream" className={className}>
        <div id="twitch-embed" />
      </div>
    );
  }
}

export default StreamTab;
