import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import Button from 'react-bootstrap/Button';

const CommentItem = ({
  postId,
  comment: { _id, text, name, user, date },
  isAuthenticated,
  deleteComment
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>
        Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
      </p>
      {isAuthenticated && (
        <Button
          onClick={() => deleteComment(postId, _id)}
          type='Button'
          className='btn btn-danger'
        >
          <i className='fas fa-times' />
        </Button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
