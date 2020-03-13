import React, { Fragment, useEffect, Button } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, getPostsLoad } from '../../actions/post';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

const Landing = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h2>Question list</h2>
      <div className='posts'>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Landing);
