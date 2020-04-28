import React from "react";
import PropTypes from 'prop-types';
import moment from 'moment';

class CommentForm extends React.Component {
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
        postId: PropTypes.string,
    };

    handleName(event) {
        this.setState({ name: event.target.value });
        }

    handleComment(event) {
        this.setState({ comment: event.target.value });
        }


    postComment(postId,name,comment){
        fetch(`http://localhost:3000/recipes/${postId}/comments`, {
            method:'post',
            headers: {
                'Content-Type': 'application/json'
                },
            body:JSON.stringify({
            user: name,
            date: moment()
            .utcOffset('+05:30')
            .format(' hh:mm:ss a'),
            text: comment,
        })
        }).then(resp => {
            console.log(resp);
        }).catch(error => {
            console.log("error");
        });  
    }


    render() {
        return (

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
            <button type="submit" onClick={this.postComment(this.props.postId, this.state.name, this.state.comment)}> Post comment </button>
            </div>
        </div>
           
        )}
    }

    export default CommentForm;