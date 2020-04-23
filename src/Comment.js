import React from "react";
import PropTypes from 'prop-types';

class Comment extends React.Component {
    static propTypes = {
        comment: PropTypes.object,
    };    
    render() {
        return (
            <div className="Comment">
                            <div className="user_date">
                            {" "}
                            <img src={require("./images/user.png")} /> {this.props.comment.user},{" "}
                            {this.props.comment.date}{" "}
                            </div>
                            <div className="comment_text"> {this.props.comment.text} </div>
                        </div>

        )}
    }

    export default Comment;