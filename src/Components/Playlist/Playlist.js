import React from 'react'
import './Playlist.css'
import TrackList from '../TrackList/TrackList'

export default class Playlist extends React.Component {


  render() {

    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} />
        <TrackList tracks={this.props.SearchResults} 
        onAdd={this.props.onAdd}
        onRemove={this.props.onRemove}
        isRemoval={true}
        />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>)

  }

}