/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./App.css";
import Header from "./Header.js";
import Side from "./Side.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      filteredPosts: [],
      src: "",
      search:"",
      comments:[],
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
    fetch("http://localhost:3000/db")
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ posts: data.recipes });
        this.setState({filteredPosts:data.recipes});
        this.setState({comments: data.comments});
      });
  }

  handleSearch() {
    const filterString = this.state.search;
    console.log(filterString);
    const filteredPosts = this.state.posts.filter(
      (post) =>
        post.name.toLowerCase().includes(filterString) ||
        post.tags.includes(filterString)
    );
    this.setState({ filteredPosts });
    console.log(filteredPosts);
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
          <Main filteredPosts={this.state.filteredPosts} comments={this.state.comments}/> 
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
