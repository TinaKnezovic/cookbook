import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Comment from './Comment';
import CommentForm from './CommentForm';

class Recipe extends React.Component {
  static propTypes = {
    recipe: PropTypes.object,
    comments: PropTypes.array,
    onPostCallback: PropTypes.func,
  };

  render() {
    const { recipe, comments, onPostCallback } = this.props;

    return (
      <div className="recipe-container">
        <h2>{recipe.name}</h2>
        <p>Author: {recipe.author}</p>
        <p>{moment(recipe.date).format('LLL')}</p>
        <p>Preparation Difficulty: {recipe.preparation_difficulty}</p>
        <p>Preparation Time: {recipe.preparation_time} min</p>
        <p>Servings: {recipe.servings}</p>
        <div className="imgReceipe">
          <img src={require(`../images/${recipe.image}`)} alt="" />
        </div>
        <h4>Ingredients</h4>
        <div className="ingredients">
          <ul>
            {recipe.ingredients.map((ingredient, i) => {
              return <li key={i}>{ingredient}</li>;
            })}
          </ul>
        </div>
        <h4>Preparation Steps</h4>
        <div className="prep_steps">
          <ul>
            {recipe.preparation_steps.map((step, i) => {
              return <li key={i}>{step}</li>;
            })}
          </ul>
        </div>
        <h4>Tags</h4>
        <div className="tags">
          <ul>
            {recipe.tags.map((tag, i) => {
              return <li key={i}>{tag}</li>;
            })}
          </ul>
        </div>
        <h4 align="left">Comments</h4>
        <CommentForm recipeId={recipe.id} onPostCallback={onPostCallback} />
        {comments
          .filter((comment) => comment.recipeId === recipe.id)
          .reverse()
          .map((comment, key) => {
            return <Comment key={key} comment={comment} />;
          })}
      </div>
    );
  }
}

export default Recipe;
