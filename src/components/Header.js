import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    search: PropTypes.string,
    onChangeCallback: PropTypes.func,
    onSearchCallback: PropTypes.func,
  };

  handleChange(event) {
    this.props.onChangeCallback(event.target.value);
  }

  render() {
    return (
      <div className="header">
        <div className="headerImg">
          <img src={require('../images/header.jpg')} alt="header_pic" />
        </div>
        <div className="searchbox">
          <input
            name="src"
            type="text"
            placeholder="Search CookBook.."
            value={this.props.search}
            onChange={this.handleChange}
          ></input>
          <button
            className="Search"
            type="submit"
            onClick={this.props.onSearchCallback}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
