import React from "react";
import PropTypes from 'prop-types';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    static propTypes = {
        search: PropTypes.string,
        onChangeCallBack: PropTypes.func,
        onSearchCallBack: PropTypes.func,
    };

    handleChange(event) {
        this.props.onChangeCallBack(event.target.value);
     }

    /*  handleSearch() {
        this.props.onSearchCallBack();
     } */

    render() {
        return (
            <div className="header">
            <div className="headerImg">
                <img src={require("./header.jpg")} alt="header_pic" />
            </div>
            <div className="searchbox">
                <input
                name="src" type="text" placeholder="Search CookBook.." value={this.props.search} onChange={this.handleChange}></input>
                <button
                className="Search" type="submit" onClick={this.props.onSearchCallBack}>Search
                </button>
            </div>
            </div>
        )}
    }

    export default Header;