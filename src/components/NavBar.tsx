import React from 'react';

import '../css/NavBar.css';

import NavHeader from './NavHeader';

type NavBarProps = {
  headerClick: (event: React.MouseEvent) => void;
};
type NavBarState = {
  activeTab?: string;
  user?: AppUser;
  videoid: number;
};

class NavBar extends React.PureComponent<NavBarProps, NavBarState> {
  render(): JSX.Element {
    const { headerClick } = this.props;
    const { user, activeTab } = this.state;
    const isStreamActive = activeTab === 'stream';
    const isVideosActive = activeTab === 'videos';
    const isClipsActive = activeTab === 'clips';

    const className = user === null ? 'hidden' : '';
    const userProfileDiv =
      user === null ? (
        ''
      ) : (
        <div id="profile" key={user.id}>
          <img className="profileImage" src={user.profileImageUrl} />
          <span>{user.displayName}</span>
        </div>
      );
    const navHeaderDiv =
      user === null ? (
        ''
      ) : (
        <div>
          <ul>
            <NavHeader
              isActive={isStreamActive}
              text="Stream"
              onClick={headerClick}
            />
            <NavHeader
              isActive={isVideosActive}
              text="Videos"
              onClick={headerClick}
            />
            <NavHeader
              isActive={isClipsActive}
              text="Clips"
              onClick={headerClick}
            />
          </ul>
        </div>
      );

    return (
      <div id="channelNavBar" className={className}>
        {userProfileDiv}
        {navHeaderDiv}
      </div>
    );
  }
}

NavBar.prototype.state = {
  activeTab: null,
  user: null,
  videoid: null,
};

export default NavBar;
