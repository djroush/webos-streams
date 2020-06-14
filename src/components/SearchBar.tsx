import React from 'react';

import $ from 'jquery';

import '../css/SearchBar.css';

type SearchBarProps = {
  loadUser: (channel: string) => void;
};

class SearchBar extends React.Component<SearchBarProps, unknown> {
  constructor(props: SearchBarProps) {
    super(props);
    this.inputKeyUp = this.inputKeyUp.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  inputKeyUp = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.buttonClick();
    }
  };

  buttonClick = (): void => {
    const input = $('#channelInput');
    const channel: string = input.val().toString();
    const { loadUser } = this.props;
    if (channel && channel !== '') {
      loadUser(channel);
    }
  };

  render(): JSX.Element {
    return (
      <div id="searchBar">
        <span>Channel Name:&nbsp;</span>
        <input
          id="channelInput"
          type="text"
          placeholder="test"
          onKeyUp={this.inputKeyUp}
        />
        <button id="loadButton" type="button" onClick={this.buttonClick}>
          Load
        </button>
      </div>
    );
  }
}

export default SearchBar;
