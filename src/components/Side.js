import React from 'react';
import PropTypes from 'prop-types';

class Side extends React.Component {
  static propTypes = {
    onAddRecipeClick: PropTypes.func,
  };

  render() {
    return (
      <div className="side">
        <h2>About us:</h2>
        <p>We are a brand new site with the most delicious recipes.</p>
        <p>Enjoy!</p>
        <div className="imgSide">
          <img src={require('../images/pic_side.jpg')} alt="" />
        </div>
        <div className="sideButtons">
          <button className="sideButton" onClick={this.props.onAddRecipeClick}>
            Add Recipe
          </button>
        </div>
      </div>
    );
  }
}

export default Side;
