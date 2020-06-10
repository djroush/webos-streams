import React, { Component } from 'react';

import '../css/NavHeader.css';

type NavHeaderProps = {
    isActive: boolean
	text: string
	onClick: (event: React.MouseEvent<any, any>) => void;
}

class NavHeader extends Component<NavHeaderProps, {}> {

  render() {
	const {isActive, text, onClick} = this.props
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