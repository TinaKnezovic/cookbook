import React from "react";
import PropTypes from 'prop-types';

class NavBar extends React.Component {
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

        <div className="navbar">
          <button value={''} onClick={this.handleCategory}>Home</button>
          <button value={'appetizers'} onClick={this.handleCategory} >Appetizers</button>
          <button value={'main'} onClick={this.handleCategory}>Main</button>
          <button value={'dessert'} onClick={this.handleCategory}>Desserts</button>
        </div>



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

    export default NavBar;