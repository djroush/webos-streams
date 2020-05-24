import React, { Component } from 'react';

import './NavHeader.css';

class NavHeader extends Component {
  props: NavHeaderProps;
  state : NavHeaderState = {
    active: false
  }; 

  constructor(props:NavHeaderProps) {
    super(props);
    this.props = props;
  }

  setState(state: NavHeaderState) {
    this.state = state;	
  } 

  render() {
	if (this.state.active) {
      return (
        <li id={this.props.id} className="tabNav"><a onClick={this.props.clickListener}>{this.props.text}</a></li>);
    } else {
	  return (null)
    };
    
  }

}

export default NavHeader;