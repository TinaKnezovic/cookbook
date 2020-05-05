import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TagsInput from 'react-tagsinput';

const initialState = {
  author: '',
  RcpName: '',
  image: '',
  preparation: '',
  time: '',
  servings: '',
  ingredients: [],
  steps: [],
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
    this.handleChangeIngredients = this.handleChangeIngredients.bind(this);
    this.handleChangeSteps = this.handleChangeSteps.bind(this);
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

  handleChangeIngredients(event) {
    this.setState({ ingredients: event.target.value });
  }

  handleChangeSteps(event) {
    this.setState({ steps: event.target.value });
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
            <span> Ingredients: </span>
            <input
              type="text"
              value={this.state.ingredients}
              onChange={this.handleChangeIngredients}
            />
          </div>
          <div className="input-group">
            <span> Preparation steps: </span>
            <input
              type="text"
              value={this.state.steps}
              onChange={this.handleChangeSteps}
            />
          </div>
          Select dish type:{' '}
          <select value={this.state.type} onChange={this.handleChangeType}>
            <option value="appetizers">Appetizers</option>
            <option value="main">Main</option>
            <option value="dessert">Dessert</option>
          </select>
          <TagsInput value={this.state.tags} onChange={this.handleChangeTags} />
          <button type="submit" onClick={this.handlePostRecipe}>
            Post Recipe
          </button>
        </div>
      </div>
    );
  }
}

export default AddRecipe;
