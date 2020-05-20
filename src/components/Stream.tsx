import React, {Component, RefObject} from 'react';
import './Stream.css';
import Player from './Player';

class Stream extends Component {
  
  streamDiv: RefObject<HTMLDivElement>;
  constructor(props) {
    super(props);
    this.streamDiv = React.createRef();
  }

  render() {
    return <div id="stream" className="tab active" ref={this.streamDiv}>
      <Player/>
    </div>;
    
  }
}

export default Stream;
