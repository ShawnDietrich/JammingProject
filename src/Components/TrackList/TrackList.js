import React from 'react'
import './TrackList.css'
import Track from '../Track/Track'

export default class TrackList extends React.Component {
  render() {
    //let newTrack = {};
    //newTrack = this.props.tracks.map(track => {return track})
    return (
      
      <div className="TrackList">
        {
          //<Track track={this.props.tracks} /> 
          this.props.tracks.map((track) => 
             <Track track={Track} key={track.id} />
          )
        }
        
      </div>)
  }
}