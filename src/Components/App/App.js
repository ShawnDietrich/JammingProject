import logo from './logo.svg';
import './App.css';
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)

    // Hard coded value change later
    this.state = {SearchResults: [{
      name: '',
      artist: '',
      album: '',
      id: '',
    }]} 
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.SearchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
