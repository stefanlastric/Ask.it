import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItemLoad = ({
  addLike,
  removeLike,
  deletePost,
  isAuthenticated,
  postload: { _id, text, name, user, likes, comments, date },
  showActions
}) => {
  return (
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

        {showActions && (
          <Fragment>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Answers{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>

            {isAuthenticated && (
              <div>
                <Button
                  type='Button'
                  className='btn btn-secondary'
                  onClick={() => addLike(_id)}
                >
                  <i className='fas fa-thumbs-up lg' />{' '}
                  <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                </Button>
                <Button
                  type='Button'
                  className='btn btn-secondary'
                  onClick={() => removeLike(_id)}
                >
                  <i className='fas fa-thumbs-down lg'></i>
                </Button>
                <Button
                  onClick={() => deletePost(_id)}
                  className='btn-danger'
                ></Button>{' '}
              </div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItemLoad.defaultProps = {
  showActions: true
};

PostItemLoad.propTypes = {
  postload: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItemLoad
);
