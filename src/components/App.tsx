import React from 'react';

import SearchBar from './SearchBar';
import HeaderAndTabs from './HeaderAndTabs';

class App extends React.Component<unknown, unknown> {
  searchBar: SearchBar;

  headerAndTabs: HeaderAndTabs;

  loadUser = (channel: string): void => {
    this.headerAndTabs.loadUser(channel);
  };

  render(): JSX.Element {
    return (
      <div className="App">
        <SearchBar
          ref={(node) => {
            this.searchBar = node;
          }}
          loadUser={this.loadUser}
        />
        <HeaderAndTabs
          ref={(node) => {
            this.headerAndTabs = node;
          }}
        />
      </div>
    );
  }
}

App.prototype.state = {
  user: null,
  videoid: null,
};

export default App;
