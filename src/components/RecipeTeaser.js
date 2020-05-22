import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class RecipeTeaser extends React.Component {
  static propTypes = {
    recipe: PropTypes.object,
  };

  render() {
    const { recipe } = this.props;

    return (
      <div>
        <h2>{recipe.name}</h2>
        <p>
          Author: {recipe.author} | {moment(recipe.date).format('LLL')}
        </p>
        <div className="imgReceipe">
          <img
            src={require(`../images/${recipe.image}`)}
            alt=""
            height="200"
            width="200"
          />
        </div>
      </div>
    );
  }
}

export default RecipeTeaser;
