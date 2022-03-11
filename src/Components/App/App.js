import logo from './logo.ico';
import './App.css';
import React from 'react'

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist'

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
      SearchResults: [
        { name: 'name1', artist: 'artist1', album: 'album1', id: 1 },
        { name: 'name2', artist: 'artist2', album: 'album2', id: 2 },
        { name: 'name3', artist: 'artist3', album: 'album3', id: 3 }],
      playlistName: "My Playlist",
      playlistTracks: [{ name: 'Playlist1', artist: 'artist1', album: 'album', id: 10 },
      { name: 'Playlist2', artist: 'artist1', album: 'album', id: 11 },
      { name: 'Playlist3', artist: 'artist1', album: 'album', id: 12 }]
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

  }
  //Serch function
  search (serchTerm) {
    console.log(serchTerm);
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack} />
            <Playlist SearchResults={this.state.SearchResults}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}
              playListName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              isRemoval={true}
              onNameChange={this.updatePlaylistName} 
              onSave = {this.savePlaylist}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
