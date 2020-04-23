import React from "react";
import PropTypes from 'prop-types';

class Main extends React.Component {
    static propTypes = {
        filteredPosts: PropTypes.array,
    };

   
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
                        <div className="Comment">
                            <div className="user_date">
                            {" "}
                            <img src={require("./user.png")} /> {comment.user},{" "}
                            {comment.date}{" "}
                            </div>
                            <div className="comment_text"> {comment.text} </div>
                        </div>
                        );
                    })}
                    <div className="Comment">
                        <div className="comment-form">
                        <div className="input-group">
                            <span>Name: </span>
                            <input type="text" placeholder="Your name" />
                        </div>
                        <div className="input-group">
                            <span>Comment: </span>
                            <input type="text" placeholder="Say something..." />
                        </div>
                        <button type="submit"> Post comment </button>
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