import React from 'react';
import Header from './components/Header.js';
import Side from './components/Side.js';
import Footer from './components/Footer.js';
import Navbar from './components/Navbar.js';
import AddRecipe from './components/AddRecipe.js';
import Recipes from './components/Recipes.js';
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
    const { filteredRecipes, search } = this.state;

    return (
      <div className="App">
        <Header
          search={search}
          onChangeCallback={this.handleChange}
          onSearchCallback={this.handleSearch}
        />

        <Navbar handleCategory={this.handleCategory} />

        <div className="row">
          <Side />
          <div className="main">
            <AddRecipe onPostCallback={this.fetchRecipes} />
            <div className="searchResult">
              {filteredRecipes.map((recipe, index) => {
                return (
                  <div key={index} className="receipe">
                    <Recipes
                      recipe={recipe}
                      comments={this.state.comments}
                      onPostCallback={this.fetchComments}
                    />
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
