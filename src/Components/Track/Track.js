import React from 'react'
import './Track.css'


export default class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  //Add track to playlist
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack () {
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return <button className = 'Track-Action' onClick={this.removeTrack()}>-</button>
    } else {
      return <button className='Track-Action' onClick={this.addTrack()}>+</button>;
    }
  }

  render() {

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>track name will go here</h3>
          <p>track artist will go here | track album will go here</p>
        </div>
        {this.renderAction()}
      </div>)
  }
}