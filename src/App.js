/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./App.css";
import Header from "./header.js";
import Side from "./side.js";
import Main from "./main.js";
import Footer from "./footer.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      filteredPosts: [],
      src: "",
      search:"",
    };
    
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }

  componentDidMount() {
    console.log("DidMount");
    this.fetchReceipe();
  }

  handleChange(value) {
    this.setState({ search: value });
  }

  fetchReceipe() {
    fetch("http://localhost:3000/recipes")
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ posts: data });
        this.setState({filteredPosts:data});
      });
  }

  handleSearch() {
    const filterString = this.state.search;
    const filteredPosts = this.state.posts.filter(
      (post) =>
        post.name.toLowerCase().includes(filterString) ||
        post.tags.includes(filterString)
    );
    this.setState({ filteredPosts });
  }

  handleCategory(event){
    const filterString = event.target.value.toLowerCase();
    const filteredPosts = this.state.posts.filter(
      (post) =>
        post.dish_type.toLowerCase().includes(filterString)    );
    this.setState({ filteredPosts });

  }

  render() {
    return (
      <div className="App">
        
        <Header search={this.state.search} onChangeCallBack={this.handleChange} onSearchCallBack={this.handleSearch}/>

        <div className="navbar">
          <button href="home" value={''} onClick={this.handleCategory}>Home</button>
          <button href="appetizers" value={'appetizers'} onClick={this.handleCategory} >Appetizers</button>
          <button href="main" value={'main'} onClick={this.handleCategory}>Main</button>
          <button href="desserts" value={'dessert'} onClick={this.handleCategory}>Desserts</button>
        </div>

        <div className="row"> 
          <Side/>
          <Main filteredPosts={this.state.filteredPosts}/> 
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
