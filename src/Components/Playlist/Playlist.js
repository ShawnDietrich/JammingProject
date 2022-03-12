import React from 'react'
import './Playlist.css'
import TrackList from '../TrackList/TrackList'

export default class Playlist extends React.Component {
  constructor(props) {
    super(props)

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEnterEvent = this.handleEnterEvent.bind(this);
  }

  //life cycle events
  componentDidMount() {
    document.addEventListener("keydown", this.handleEnterEvent);
  }

  handleNameChange (event) {
    this.props.onNameChange(event.target.value);
  }
  handleEnterEvent(event) {
    //if (event ==='Enter') this.props.onSave();
  }

  render() {

    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.playlistTracks} 
        onAdd={this.props.onAdd}
        onRemove={this.props.onRemove}
        isRemoval={true}
        />
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>)

  }

}