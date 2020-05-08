import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TagsInput from 'react-tagsinput';
import ListItems from './ListItems';

const initialState = {
  author: '',
  RcpName: '',
  image: '',
  preparation: '',
  time: '',
  servings: '',
  ingredients: [],
  currentIngredient: '',
  steps: [],
  currentStep: '',
  type: '',
  tags: [],
};

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleChangeRcpName = this.handleChangeRcpName.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleChangePreparation = this.handleChangePreparation.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleChangeServings = this.handleChangeServings.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeIngredients = this.handleChangeIngredients.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);

    this.onAddStep = this.onAddStep.bind(this);
    this.handleChangeSteps = this.handleChangeSteps.bind(this);
    this.deleteStep = this.deleteStep.bind(this);
    this.setUpdateStep = this.setUpdateStep.bind(this);

    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeTags = this.handleChangeTags.bind(this);

    this.handlePostRecipe = this.handlePostRecipe.bind(this);
  }

  static propTypes = {
    onPostCallback: PropTypes.func,
  };

  handleChangeAuthor(event) {
    this.setState({ author: event.target.value });
  }

  handleChangeRcpName(event) {
    this.setState({ RcpName: event.target.value });
  }

  handleChangeImage(event) {
    this.setState({ image: event.target.files[0] });
  }

  handleChangePreparation(event) {
    this.setState({ preparation: event.target.value });
  }

  handleChangeTime(event) {
    this.setState({ time: event.target.value });
  }

  handleChangeServings(event) {
    this.setState({ servings: event.target.value });
  }

  handleChangeIngredients(e) {
    this.setState({
      currentIngredient: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newItem = this.state.currentIngredient;
    if (newItem !== '') {
      const items = [...this.state.ingredients, newItem];
      this.setState({
        ingredients: items,
        currentIngredient: '',
      });
    }
  }

  deleteItem(text) {
    const filteredItems = this.state.ingredients.filter(
      (item) => item !== text,
    );
    this.setState({
      ingredients: filteredItems,
    });
  }

  setUpdate(text) {
    const items = this.state.ingredients;
    items.map((item) => {
      if (item === text) {
        item = text;
      }
    });
    this.setState({
      ingredients: items,
    });
  }

  handleChangeSteps(e) {
    this.setState({
      currentStep: e.target.value,
    });
  }

  onAddStep(e) {
    e.preventDefault();
    const newItem = this.state.currentStep;
    if (newItem !== '') {
      const items = [...this.state.steps, newItem];
      this.setState({
        steps: items,
        currentStep: '',
      });
    }
  }

  deleteStep(text) {
    const filteredItems = this.state.steps.filter((item) => item !== text);
    this.setState({
      steps: filteredItems,
    });
  }

  setUpdateStep(text) {
    const items = this.state.steps;
    items.map((item) => {
      if (item === text) {
        item = text;
      }
    });
    this.setState({
      steps: items,
    });
  }

  handleChangeType(event) {
    this.setState({ type: event.target.value });
  }

  handleChangeTags(tags) {
    this.setState({ tags: tags });
  }

  handlePostRecipe() {
    const { onPostCallback } = this.props;
    const {
      name,
      RcpName,
      image,
      preparation,
      time,
      servings,
      ingredients,
      steps,
      type,
      tags,
    } = this.state;

    fetch(`http://localhost:4000/recipes`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: name,
        date: moment().format(),
        name: RcpName,
        image: image,
        preparation_difficulty: preparation,
        preparation_time: time,
        servings: servings,
        ingredients: ingredients,
        preparation_steps: steps,
        dish_type: type,
        tags: tags,
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
  }

  render() {
    return (
      <div className="Comment">
        <div className="comment-form">
          <div className="input-group">
            <span>Your name: </span>
            <input
              type="text"
              value={this.state.author}
              onChange={this.handleChangeAuthor}
            />
          </div>
          <div className="input-group">
            <span>Recipe name: </span>
            <input
              type="text"
              value={this.state.RcpName}
              onChange={this.handleChangeRcpName}
            />
          </div>
          <div className="input-group">
            <span> Upload picture: </span>
            <input type="file" onChange={this.handleChangeImage} />
            {console.log(this.state.image)}
          </div>
          Select preparation difficulty:{' '}
          <select
            value={this.state.preparation}
            onChange={this.handleChangePreparation}
          >
            <option value="easy">Easy</option>
            <option value="meidum">Medium</option>
            <option value="advanced">Advanced</option>
          </select>
          <div className="input-group">
            <span> Time (minutes): </span>
            <input
              type="text"
              value={this.state.time}
              onChange={this.handleChangeTime}
            />
          </div>
          <div className="input-group">
            <span> Servings: </span>
            <input
              type="text"
              value={this.state.servings}
              onChange={this.handleChangeServings}
            />
          </div>
          
          <div className="input-group">
            <form id="to-do-form" onSubmit={this.onSubmit}>
              <span> Ingredients: </span>
              <input
                type="text"
                value={this.state.currentIngredient}
                onChange={this.handleChangeIngredients}
              ></input>
              <button type="submit">ADD INGREDIENT</button>
            </form>
            <ListItems
              items={this.state.ingredients}
              deleteItem={this.deleteItem}
              setUpdate={this.setUpdate}
            />
          </div>

          <div className="input-group">
            <form id="to-do-form" onSubmit={this.onAddStep}>
              <span> Preparation steps: </span>
              <input
                type="text"
                value={this.state.currentStep}
                onChange={this.handleChangeSteps}
              ></input>
              <button type="submit">ADD STEP</button>
            </form>
            <ListItems
              items={this.state.steps}
              deleteItem={this.deleteStep}
              setUpdate={this.setUpdateStep}
            />
          </div>
          <div className="input-group">
            Select dish type:{' '}
            <select value={this.state.type} onChange={this.handleChangeType}>
              <option value="appetizers">Appetizers</option>
              <option value="main">Main</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
          <div className="input-tags">
            <TagsInput
              value={this.state.tags}
              onChange={this.handleChangeTags}
            />
          </div>
          <br />
          <button type="submit" onClick={this.handlePostRecipe}>
            Post Recipe
          </button>
        </div>
      </div>
    );
  }
}

export default AddRecipe;
