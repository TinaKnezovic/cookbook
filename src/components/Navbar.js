import React from 'react';
import PropTypes from 'prop-types';

class Navbar extends React.Component {
  static propTypes = {
    handleCategory: PropTypes.func,
  };

  render() {
    return (
      <div className="navbar">
        <button href="home" onClick={this.props.handleCategory}>
          Home
        </button>
        <button
          href="appetizers"
          value={'appetizers'}
          onClick={this.props.handleCategory}
        >
          Appetizers
        </button>
        <button
          href="main"
          value={'main'}
          onClick={this.props.handleCategory}
        >
          Main
        </button>
        <button
          href="desserts"
          value={'dessert'}
          onClick={this.props.handleCategory}
        >
          Desserts
        </button>
      </div>
    );
  }
}

export default Navbar;
