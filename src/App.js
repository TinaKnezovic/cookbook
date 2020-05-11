import React from 'react';
import Header from './components/Header';
import Side from './components/Side';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AddRecipe from './components/AddRecipe';
import Recipe from './components/Recipe';
import { BASE_URL } from './config';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      filteredRecipes: [],
      comments: [],
      search: '',
      addRecipeMode: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.setAddRecipeMode = this.setAddRecipeMode.bind(this);
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
    this.setState({ filteredRecipes, addRecipeMode: false });
  }

  handleCategory(event) {
    const dishType = event.target.value;
    const filteredRecipes = this.state.recipes.filter((recipe) =>
      recipe.dish_type.includes(dishType),
    );
    this.setState({ filteredRecipes, addRecipeMode: false });
  }

  setAddRecipeMode() {
    this.setState({ addRecipeMode: true });
  }

  fetchRecipes() {
    fetch(BASE_URL + 'recipes')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          recipes: data,
          filteredRecipes: data,
          addRecipeMode: false,
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
    const { filteredRecipes, comments, search, addRecipeMode } = this.state;

    return (
      <div className="App">
        <Header
          search={search}
          onChangeCallback={this.handleChange}
          onSearchCallback={this.handleSearch}
        />

        <Navbar handleCategory={this.handleCategory} />

        <div className="row">
          <Side onAddRecipeClick={this.setAddRecipeMode} />
          <div className="main">
            {addRecipeMode ? (
              <AddRecipe onPostCallback={this.fetchRecipes} />
            ) : (
              <div className="searchResult">
                {filteredRecipes.map((recipe, index) => {
                  return (
                    <div key={index} className="recipe">
                      <Recipe
                        recipe={recipe}
                        comments={comments}
                        onPostCallback={this.fetchComments}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
