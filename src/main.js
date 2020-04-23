import React from "react";
import PropTypes from 'prop-types';
import Comment from './Comment.js';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name:'',
          comment:'',
        };
    this.handleName = this.handleName.bind(this);
    this.handleComment = this.handleComment.bind(this);
    }

    static propTypes = {
        filteredPosts: PropTypes.array,
    };

    handleName(event) {
        this.setState({ name: event.target.value });
        }

    handleComment(event) {
        this.setState({ comment: event.target.value });
        }
    

    postComment(postId,name,comment,commentNumber){
        fetch(`http://localhost:3000/recipes/${postId}/comments`, {
            method:"post",
            body:JSON.stringify({
            id: commentNumber+1,
            name: name,
            text: comment,
        })
        }).then(resp => {
            console.log("success");
        }).catch(error => {
            console.log("error");
        });  
    }


    render() {
        return (
            <div className="main">
            <div className="searchResult">
                {this.props.filteredPosts.map((post, index) => {
                return (
                    <div key={index} className="receipe">
                    
                    <h2> {post.name}</h2>
                    <p>
                        Author:{post.author}, {post.date}
                    </p>
                    <p align="right">
                        Preparation difficulty:{post.preparation_difficulty}
                    </p>
                    <p align="right">
                        Preparation time:{post.preparation_time}
                    </p>
                    <p align="right">Servings:{post.servings}</p>
                    <div className="imgReceipe">
                    <img src={require(`./images/${post.image}`)} />
                    </div>
                    <h4> Ingredients:</h4>
                    <p className="ingredients">
                        <ul>
                        {post.ingredients.map((ingredient) => {
                            return <li>{ingredient}</li>;
                        })}
                        </ul>
                    </p>
                    <h4>Preparation steps:</h4>
                    <p className="prep_steps"> {post.preparation_steps} </p>
                    Tags: <p> {post.tags} </p>
                    <h4 align="left">Comments:</h4>
                    {post.comments.map((comment) => {
                        return (
                        <Comment comment={comment}/>
                        );
                    })}
                    <div className="Comment">
                        <div className="comment-form">
                        <div className="input-group">
                            <span>Name: </span>
                            <input type="text" placeholder="Your name" value={this.state.name} onChange={this.handleName}/>
                        </div>
                        <div className="input-group">
                            <span>Comment: </span>
                            <input type="text" placeholder="Say something..." value={this.state.comment} onChange={this.handleComment}/>
                        </div>
                        <button type="submit" onClick={this.postComment(post.id,this.state.name, this.state.comment, post.comments.length)}> Post comment </button>
                        </div>
                    </div>
                    </div>
                );
                })}
            </div>
            </div>
        )}
    }

    export default Main;