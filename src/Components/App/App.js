import logo from './logo.ico';
import './App.css';
import React from 'react'

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist'

import { Spotify } from '../../Util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props)

    //Bindings
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    // Hard coded value change later
    this.state = {
      SearchResults: [],
      playlistName: "My Playlist",
      playlistTracks: []
    };
  }

  //Method to update track list
  addTrack(savedTrack) {
    if (this.state.playlistTracks.find(track =>
      track.id === savedTrack.id)) {
      return;
    }
    else {
      this.state.playlistTracks.push(savedTrack)
      this.setState({ playlistTracks: this.state.playlistTracks });
    }
  }
  //Method to remove track from list
  removeTrack(saveTrack) {
    let trackList = this.state.playlistTracks;
    trackList = trackList.filter(list => saveTrack.id !== list.id);
    this.setState({ playlistTracks: trackList });
  }
  //Method to change playlist name
  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }
  //Save the playlist
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      alert(`${this.state.playlistName} Has Been Created!`);
      this.setState({playlistName: 'New Playlist'});
      this.setState({playlistTracks: []});
    });
  }
  //Serch function
  search(serchTerm) {
    //console.log(serchTerm);
    Spotify.search(serchTerm).then(results => {
      this.setState({ SearchResults: results });
      //console.log(this.setState.SearchResults);
    })

  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack} />
            <Playlist SearchResults={this.state.SearchResults}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}
              playListName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              isRemoval={true}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
