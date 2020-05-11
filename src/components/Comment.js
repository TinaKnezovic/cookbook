import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Comment extends React.Component {
  static propTypes = {
    comment: PropTypes.object,
  };
  render() {
    const { user, date, text } = this.props.comment;
    return (
      <div className="Comment">
        <div className="user_date">
          <img src={require('../images/user.png')} alt="" /> {user} |{' '}
          {moment(date).format('LLL')}
        </div>
        <div className="comment_text">{text}</div>
      </div>
    );
  }
}

export default Comment;
