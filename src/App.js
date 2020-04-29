import React from 'react';
import Header from './components/Header.js';
import Side from './components/Side.js';
import Footer from './components/Footer.js';
import Comment from './components/Comment.js';
import CommentForm from './components/CommentForm.js';
import './App.css';

const BASE_URL = 'http://localhost:4000/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      filteredRecipes: [],
      comments: [],
      search: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.fetchRecipes = this.fetchRecipes.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
  }

  componentDidMount() {
    this.fetchRecipes();
    this.fetchComments();
  }

  handleChange(value) {
    this.setState({ search: value });
  }

  handleSearch() {
    const filterString = this.state.search;
    const filteredRecipes = this.state.recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(filterString) ||
        recipe.tags.includes(filterString),
    );
    this.setState({ filteredRecipes });
  }

  handleCategory(event) {
    const filterString = event.target.value.toLowerCase();
    const filteredRecipes = this.state.recipes.filter((recipe) =>
      recipe.dish_type.toLowerCase().includes(filterString),
    );
    this.setState({ filteredRecipes });
  }

  fetchRecipes() {
    fetch(BASE_URL + 'recipes')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          recipes: data,
          filteredRecipes: data,
        });
      });
  }

  fetchComments() {
    fetch(BASE_URL + 'comments')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          comments: data,
        });
      });
  }

  render() {
    const { filteredRecipes, comments, search } = this.state;

    return (
      <div className="App">
        <Header
          search={search}
          onChangeCallback={this.handleChange}
          onSearchCallback={this.handleSearch}
        />

        <div className="navbar">
          <button href="home" value={''} onClick={this.handleCategory}>
            Home
          </button>
          <button
            href="appetizers"
            value={'appetizers'}
            onClick={this.handleCategory}
          >
            Appetizers
          </button>
          <button href="main" value={'main'} onClick={this.handleCategory}>
            Main
          </button>
          <button
            href="desserts"
            value={'dessert'}
            onClick={this.handleCategory}
          >
            Desserts
          </button>
        </div>

        <div className="row">
          <Side />
          <div className="main">
            <div className="searchResult">
              {filteredRecipes.map((recipe, index) => {
                return (
                  <div key={index} className="receipe">
                    <h2> {recipe.name}</h2>
                    <p>
                      Author: {recipe.author}, {recipe.date}
                    </p>
                    <p align="right">
                      Preparation difficulty: {recipe.preparation_difficulty}
                    </p>
                    <p align="right">
                      Preparation time: {recipe.preparation_time}
                    </p>
                    <p align="right">Servings: {recipe.servings}</p>
                    <div className="imgReceipe">
                      <img src={require(`./images/${recipe.image}`)} alt="" />
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
                    <CommentForm
                      recipeId={recipe.id}
                      onPostCallback={this.fetchComments}
                    />
                    {comments
                      .filter((comment) => comment.recipeId === recipe.id)
                      .map((comment, key) => {
                        return <Comment key={key} comment={comment} />;
                      })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
