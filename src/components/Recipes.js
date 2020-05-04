import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Comment from './Comment.js';
import CommentForm from './CommentForm.js';

class Recipes extends React.Component {
  static propTypes = {
    recipe: PropTypes.object,
    index: PropTypes.number,
    comments: PropTypes.array,
    onPostCallback: PropTypes.func,
  };

  render() {
    const { recipe, comments, onPostCallback } = this.props;

    return (
      <div>
        <h2> {recipe.name}</h2>
        <p>
          Author: {recipe.author}, {moment(recipe.date).format('LLL')}
        </p>
        <p align="right">
          Preparation difficulty: {recipe.preparation_difficulty}
        </p>
        <p align="right">Preparation time: {recipe.preparation_time}</p>
        <p align="right">Servings: {recipe.servings}</p>
        <div className="imgReceipe">
          <img src={require(`../images/${recipe.image}`)} alt="" />
        </div>
        <h4> Ingredients:</h4>
        <div className="ingredients">
          <ul>
            {recipe.ingredients.map((ingredient, i) => {
              return <li key={i}>{ingredient}</li>;
            })}
          </ul>
        </div>
        <h4>Preparation steps:</h4>
        <p className="prep_steps"> {recipe.preparation_steps} </p>
        Tags: <p> {recipe.tags} </p>
        <h4 align="left">Comments:</h4>
        <CommentForm recipeId={recipe.id} onPostCallback={onPostCallback} />
        {comments
          .filter((comment) => comment.recipeId === recipe.id)
          .map((comment, key) => {
            return <Comment key={key} comment={comment} />;
          })}
      </div>
    );
  }
}

export default Recipes;
