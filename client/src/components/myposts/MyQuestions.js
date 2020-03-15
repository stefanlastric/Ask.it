import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItemLoad from './PostItemLoad';
import PostForm from './PostForm';
import { getPostsLoad } from '../../actions/postload';

const Posts = ({
  getPostsLoad,
  counter = 0,
  postload: { postsload, loading }
}) => {
  useEffect(() => {
    getPostsLoad(counter);
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <PostForm />
      <div className='posts'>
        {postsload.map(postload => (
          <PostItemLoad key={postload._id} postload={postload} />
        ))}
      </div>
      <input
        type='submit'
        value='Load More'
        className='btn btn-primary'
        onClick={() => getPostsLoad(counter + 20)}
      />
    </Fragment>
  );
};

Posts.propTypes = {
  getPostsLoad: PropTypes.func.isRequired,
  postload: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  postload: state.postload
});

export default connect(mapStateToProps, { getPostsLoad })(Posts);
