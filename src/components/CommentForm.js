import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { BASE_URL } from '../config';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      comment: '',
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.handlePostComment = this.handlePostComment.bind(this);
  }

  static propTypes = {
    recipeId: PropTypes.number,
    onPostCallback: PropTypes.func,
  };

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeComment(event) {
    this.setState({ comment: event.target.value });
  }

  handlePostComment() {
    const { recipeId, onPostCallback } = this.props;
    const { name, comment } = this.state;
    fetch(BASE_URL + 'comments', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: name,
        date: moment().format(),
        text: comment,
        recipeId: recipeId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          this.setState({ name: '', comment: '' });
          onPostCallback();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="Comment">
        <div className="comment-form">
          <div className="input-group">
            <span>Name: </span>
            <input
              type="text"
              placeholder="Your name"
              value={this.state.name}
              onChange={this.handleChangeName}
            />
          </div>
          <div className="input-group">
            <span>Comment: </span>
            <input
              type="text"
              placeholder="Say something..."
              value={this.state.comment}
              onChange={this.handleChangeComment}
            />
          </div>
          <button onClick={this.handlePostComment}>Post Comment</button>
        </div>
      </div>
    );
  }
}

export default CommentForm;
