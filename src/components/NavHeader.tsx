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
    super.setState(state);
    this.state = state;	
  } 

  render() {
	const className = "tabNav" + (this.state.active ? " active" : "");
      return (
        <li id={this.props.id}className={className}>
		  <a onClick={this.props.clickListener}>{this.props.text}</a>
       </li>
      );
  }
}

export default NavHeader;