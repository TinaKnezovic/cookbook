import React from "react";
import PropTypes from 'prop-types';
import Comment from './Comment.js';
import CommentForm from './CommentForm.js';


class Main extends React.Component {
    constructor(props) {
        super(props);
        
    this.handleName = this.handleName.bind(this);
    this.handleComment = this.handleComment.bind(this);
    }

    static propTypes = {
        filteredPosts: PropTypes.array,
        comments: PropTypes.array,
    };

    handleName(event) {
        this.setState({ name: event.target.value });
        }

    handleComment(event) {
        this.setState({ comment: event.target.value });
        }
    

    render() {
        const { filteredPosts, comments } = this.props; 

        return (
            <div className="main">
            <div className="searchResult">
                {filteredPosts.map((post, index) => {
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
                    {comments.filter(comment=>comment.recipeId===post.id).map((comment) => {
                        return (
                        <Comment comment={comment}/>
                        );
                    })}
                     <CommentForm postId={post.id}/>
                    </div>
                );
                })}
            </div>
            </div>
        )}
    }

    export default Main;