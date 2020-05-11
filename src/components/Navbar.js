import React from 'react';
import PropTypes from 'prop-types';

class Navbar extends React.Component {
  static propTypes = {
    handleCategory: PropTypes.func,
  };

  render() {
    return (
      <div className="navbar">
        <button value={''} onClick={this.props.handleCategory}>
          All Recipes
        </button>
        <button value={'appetizer'} onClick={this.props.handleCategory}>
          Appetizers
        </button>
        <button value={'main'} onClick={this.props.handleCategory}>
          Main Dishes
        </button>
        <button value={'dessert'} onClick={this.props.handleCategory}>
          Desserts
        </button>
      </div>
    );
  }
}

export default Navbar;
