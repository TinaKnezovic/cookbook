import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ListItems from './ListItems';
import { BASE_URL, UPLOAD_URL } from '../config';

const initialState = {
  author: '',
  name: '',
  image: null,
  preparation_difficulty: 'medium',
  preparation_time: 60,
  servings: 2,
  dish_type: 'main',
  ingredients: [],
  newIngredient: '',
  preparation_steps: [],
  newStep: '',
  tags: [],
  newTag: '',
  authorError: '',
  nameError: '',
  prepTimeError: '',
  servingsError: '',
  imageError: '',
  ingredientsError: '',
  stepsError: '',
};

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleChangePreparationDifficulty = this.handleChangePreparationDifficulty.bind(
      this,
    );
    this.handleChangePreparationTime = this.handleChangePreparationTime.bind(
      this,
    );
    this.handleChangeServings = this.handleChangeServings.bind(this);
    this.handleChangeDishType = this.handleChangeDishType.bind(this);

    this.handleChangeIngredient = this.handleChangeIngredient.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);

    this.handleChangeStep = this.handleChangeStep.bind(this);
    this.addStep = this.addStep.bind(this);
    this.deleteStep = this.deleteStep.bind(this);

    this.handleChangeTag = this.handleChangeTag.bind(this);
    this.addTag = this.addTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);

    this.handlePostRecipe = this.handlePostRecipe.bind(this);
  }

  static propTypes = {
    onPostCallback: PropTypes.func,
  };

  handleChangeAuthor({ target: { value } }) {
    this.setState({ author: value });
  }

  handleChangeName({ target: { value } }) {
    this.setState({ name: value });
  }

  handleChangeImage({ target }) {
    this.setState({ image: target.files[0] });
  }

  handleChangePreparationDifficulty({ target: { value } }) {
    this.setState({ preparation_difficulty: value });
  }

  handleChangePreparationTime({ target: { value } }) {
    this.setState({ preparation_time: value !== '' ? parseInt(value) : 0 });
  }

  handleChangeServings({ target: { value } }) {
    this.setState({ servings: value !== '' ? parseInt(value) : 0 });
  }

  handleChangeDishType({ target: { value } }) {
    this.setState({ dish_type: value });
  }

  handleChangeIngredient({ target: { value } }) {
    this.setState({ newIngredient: value });
  }

  addIngredient() {
    const newIngredient = this.state.newIngredient;
    if (newIngredient !== '') {
      const ingredients = [...this.state.ingredients, newIngredient];
      this.setState({
        ingredients,
        newIngredient: '',
      });
    }
  }

  deleteIngredient(value) {
    const ingredients = this.state.ingredients.filter((item) => item !== value);
    this.setState({ ingredients });
  }

  handleChangeStep({ target: { value } }) {
    this.setState({ newStep: value });
  }

  addStep() {
    const newStep = this.state.newStep;
    if (newStep !== '') {
      const preparation_steps = [...this.state.preparation_steps, newStep];
      this.setState({
        preparation_steps,
        newStep: '',
      });
    }
  }

  deleteStep(value) {
    const preparation_steps = this.state.preparation_steps.filter(
      (item) => item !== value,
    );
    this.setState({ preparation_steps });
  }

  handleChangeTag({ target: { value } }) {
    this.setState({ newTag: value });
  }

  addTag() {
    const newTag = this.state.newTag;
    if (newTag !== '') {
      const tags = [...this.state.tags, newTag];
      this.setState({
        tags,
        newTag: '',
      });
    }
  }

  deleteTag(value) {
    const tags = this.state.tags.filter((item) => item !== value);
    this.setState({ tags });
  }

  validate = () => {
    let authorError = '';
    let nameError = '';
    let prepTimeError;
    let servingsError;
    let imageError;
    let ingredientsError;
    let stepsError;

    if (!this.state.author) {
      authorError = 'Field cannot be blank';
    }

    if (!this.state.name) {
      nameError = 'Field cannot be blank';
    }

    if (this.state.preparation_time === 0) {
      prepTimeError = 'Field cannot be 0';
    }
    if (this.state.servings === 0) {
      servingsError = 'Field cannot be 0';
    }
    if (this.state.image === null) {
      imageError = 'You must upload a picture';
    }
    if (this.state.ingredients.length === 0) {
      ingredientsError = 'You must enter at least one ingredient';
    }
    if (this.state.preparation_steps.length === 0) {
      stepsError = 'You must enter at least one step';
    }

    if (
      authorError ||
      nameError ||
      prepTimeError ||
      servingsError ||
      imageError ||
      ingredientsError ||
      stepsError
    ) {
      this.setState({
        authorError,
        nameError,
        prepTimeError,
        servingsError,
        imageError,
        ingredientsError,
        stepsError,
      });
      return false;
    }

    return true;
  };

  handlePostRecipe() {
    const { onPostCallback } = this.props;
    const {
      author,
      name,
      image,
      preparation_difficulty,
      preparation_time,
      servings,
      ingredients,
      preparation_steps,
      dish_type,
      tags,
    } = this.state;

    const isValid = this.validate();
    if (isValid) {
      const fileName = `${moment().format('x')}_${image.name}`;
      const data = new FormData();
      data.append('fileName', fileName);
      data.append('file', this.state.image);

      fetch(UPLOAD_URL, {
        method: 'post',
        body: data,
      })
        .then(() => {
          fetch(BASE_URL + 'recipes', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              author,
              date: moment().format(),
              name,
              image: fileName,
              preparation_difficulty,
              preparation_time,
              servings,
              ingredients,
              preparation_steps,
              dish_type,
              tags,
            }),
          })
            .then((response) => {
              if (response.ok) {
                this.setState({
                  ...initialState,
                });
                onPostCallback();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="Comment">
        <div className="comment-form">
          <div className="input-group">
            <span>Your Name: </span>
            <input
              type="text"
              value={this.state.author}
              onChange={this.handleChangeAuthor}
            />
          </div>
          <div style={{ fontSize: 12, color: 'red' }}>
            {this.state.authorError}
          </div>
          <div className="input-group">
            <span>Recipe Name: </span>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChangeName}
            />
          </div>
          <div style={{ fontSize: 12, color: 'red' }}>
            {this.state.nameError}
          </div>
          <div className="input-group">
            <span>Image: </span>
            <input type="file" onChange={this.handleChangeImage} />
          </div>
          <div style={{ fontSize: 12, color: 'red' }}>
            {this.state.imageError}
          </div>
          Preparation Difficulty:{' '}
          <select
            value={this.state.preparation_difficulty}
            onChange={this.handleChangePreparationDifficulty}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="advanced">Advanced</option>
          </select>
          <div className="input-group">
            <span>Preparation Time (minutes): </span>
            <input
              type="text"
              value={this.state.preparation_time}
              onChange={this.handleChangePreparationTime}
            />
          </div>
          <div style={{ fontSize: 12, color: 'red' }}>
            {this.state.prepTimeError}
          </div>
          <div className="input-group">
            <span>Servings: </span>
            <input
              type="text"
              value={this.state.servings}
              onChange={this.handleChangeServings}
            />
          </div>
          <div style={{ fontSize: 12, color: 'red' }}>
            {this.state.servingsError}
          </div>
          <div className="input-group">
            <span>Ingredients: </span>
            <input
              type="text"
              value={this.state.newIngredient}
              onChange={this.handleChangeIngredient}
            />
            <div style={{ fontSize: 12, color: 'red' }}>
              {this.state.ingredientsError}
            </div>
            <button onClick={this.addIngredient}>ADD INGREDIENT</button>
            <ListItems
              items={this.state.ingredients}
              deleteItem={this.deleteIngredient}
            />
          </div>
          <div className="input-group">
            <span>Preparation Steps: </span>
            <input
              type="text"
              value={this.state.newStep}
              onChange={this.handleChangeStep}
            />
            <div style={{ fontSize: 12, color: 'red' }}>
              {this.state.stepsError}
            </div>
            <button onClick={this.addStep}>ADD STEP</button>
            <ListItems
              items={this.state.preparation_steps}
              deleteItem={this.deleteStep}
            />
          </div>
          <div className="input-group">
            Dish Type:{' '}
            <select
              value={this.state.dish_type}
              onChange={this.handleChangeDishType}
            >
              <option value="appetizer">Appetizer</option>
              <option value="main">Main Dish</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
          <div className="input-group">
            <span>Tags: </span>
            <input
              type="text"
              value={this.state.newTag}
              onChange={this.handleChangeTag}
            />
            <button onClick={this.addTag}>ADD TAG</button>
            <ListItems items={this.state.tags} deleteItem={this.deleteTag} />
          </div>
          <br />
          <button onClick={this.handlePostRecipe}>Post Recipe</button>
        </div>
      </div>
    );
  }
}

export default AddRecipe;
