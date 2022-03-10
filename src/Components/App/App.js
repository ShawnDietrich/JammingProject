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
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    // Hard coded value change later
    this.state = {
      SearchResults: [
        { name: 'name1', artist: 'artist1', album: 'album1', id: 1},
        { name: 'name2', artist: 'artist2', album: 'album2', id: 2},
        { name: 'name3', artist: 'artist3', album: 'album3', id: 3}],
      playlistName: "",
      playlistTracks: [{name: 'name1', artist: 'artist1', album: 'album', id:1},
      {name: 'name1', artist: 'artist1', album: 'album', id:1},
      {name: 'name1', artist: 'artist1', album: 'album', id:1}]
      }; 
  }
  //Method to update track list
  addTrack (savedTrack) {
    if(this.state.playlistTracks.find(track => 
      track.id === savedTrack.id)){
        return;
      }
  }
  //Method to remove track from list
  removeTrack(saveTrack) {
    let newPlaylist = this.state.PlaylistTracks.filter(list => saveTrack.id !== list.id);
    this.setState({playlistTracks: newPlaylist});
  }

  //Method to change playlist name
  updatePlaylistName (name) {
    this.setState({playlistName: name})
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack} />
            <Playlist SearchResults={this.state.SearchResults} 
            onAdd={this.addTrack}
            onRemove={this.removeTrack}
            playListName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            isRemoval={true}
            onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
