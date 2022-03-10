import React from 'react'
import './Track'


export class Track extends React.Component {




  renderAction() {
    return
    let removal = this.props.isRemoval ? '-' : '+' ;
    
    <div className="Track">
      <div className="Track-information">
        <h3>track name will go here</h3>
        <p>track artist will go here | track album will go here</p>
      </div>
      <button className="Track-action">{removal}</button>
    </div>
  }
}