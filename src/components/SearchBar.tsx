import React from 'react';

import $ from 'jquery'

import '../css/SearchBar.css'

type SearchBarProps = {
	loadUser: (channel: string) => void
}

class SearchBar extends React.Component<SearchBarProps, {}> {

  inputKeyUp = (event: React.KeyboardEvent) : void => {
    if (event.key === 'Enter') {
      this.buttonClick()
    }	
  }

  buttonClick() {
    const input = $("#channelInput")
    const channel: string = input.val().toString();
    const {loadUser} = this.props
    if (channel && channel !== "") {
      loadUser(channel)
    }  
  }

  render() {
	const inputKeyUp = this.inputKeyUp.bind(this)
	const buttonClick = this.buttonClick.bind(this)
    return (
      <div id="searchBar">
        <span>Channel Name:&nbsp;</span>
        <input id="channelInput" type="text" placeholder="test" onKeyUp={inputKeyUp}/>
        <button id="loadButton" onClick={buttonClick}>Load</button>
      </div>
    )	
  }
}

export default SearchBar;
