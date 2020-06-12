import React from 'react';

import '../css/NavHeader.css';

type NavHeaderProps = {
  isActive: boolean;
  text: string;
  onClick: (event: React.MouseEvent) => void;
};

class NavHeader extends React.PureComponent<NavHeaderProps, unknown> {
  render(): JSX.Element {
    const { isActive, text, onClick } = this.props;
    const className = `tabNav${isActive ? ' active' : ''}`;

    return (
      <li className={className}>
        <a onClick={onClick}>{text}</a>
      </li>
    );
  }
}
export default NavHeader;
