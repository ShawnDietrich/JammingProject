import React from 'react'
import './SearchBar.css';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.enterEvent = this.enterEvent.bind(this);
    }

    //life cycle methods
    componentDidMount() {
        document.addEventListener("keydown", this.enterEvent);
        //console.log('Enter event listener loaded')
    }

    search() {
        this.props.onSearch(this.state.term);
    }
    handleTermChange(e) {
        this.setState({ term: e.target.value })
    }
    enterEvent(event) {
        
        if (event.code === "Enter") {
        console.log("Enter Key pressed searching " + this.state.term);
        this.search();}
    }
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
                <button className="SearchButton" onClick={this.search} >SEARCH</button>
            </div>)
    }
}