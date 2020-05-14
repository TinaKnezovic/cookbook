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
      nameError: '',
      commentError: '',
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

  validate = () => {
    let nameError = '';
    let commentError = '';

    if (!this.state.name) {
      nameError = 'Field cannot be blank';
    }

    if (!this.state.comment) {
      commentError = 'Field cannot be blank';
    }

    if (nameError || commentError) {
      this.setState({ nameError, commentError });
      return false;
    }

    return true;
  };

  handlePostComment() {
    const { recipeId, onPostCallback } = this.props;
    const { name, comment } = this.state;
    const isValid = this.validate();
    if (isValid) {
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
          <div style={{ fontSize: 12, color: 'red' }}>
            {this.state.nameError}
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
          <div style={{ fontSize: 12, color: 'red' }}>
            {this.state.commentError}
          </div>
          <button onClick={this.handlePostComment}>Post Comment</button>
        </div>
      </div>
    );
  }
}

export default CommentForm;
