import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  isAuthenticated,
  post: { _id, text, user, likes, comments, date },
  showActions
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>
        {isAuthenticated && (
          <Fragment>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={() => addLike(_id)}
            >
              <i className='fas fa-thumbs-up lg' />{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={() => removeLike(_id)}
            >
              <i className='fas fa-thumbs-down lg'></i>
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Answers{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>

            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='btn btn-danger lg'
            ></button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
