import React, { Component } from 'react';

import '../css/NavHeader.css';

type NavHeaderState = {
  isActive: boolean
}

type NavHeaderProps = {
	text: string
	onClick: (event: React.MouseEvent<any, any>) => void;
}

class NavHeader extends Component<NavHeaderProps, NavHeaderState> {

  render() {
	const {text, onClick} = this.props
	const {isActive} = this.state
	const className = "tabNav" + (isActive ? " active" : "");

    return (
      <li className={className}>
        <a onClick={onClick}>{text}</a>
      </li>
    ); 

  }
}

NavHeader.prototype.state = {
	isActive: false
}

export default NavHeader;