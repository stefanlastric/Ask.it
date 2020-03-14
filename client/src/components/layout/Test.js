import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import PostItem from '../posts/PostItem';
import { Container, Row } from 'react-bootstrap';
import { getPostsLoad } from '../../actions/post';

const Test = ({ getPostsLoad, post: { posts, loading } }) => {
  useEffect(() => {
    getPostsLoad(0);
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <Row>
        <h2>Question list</h2>
        <div className='posts'>
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </Row>
    </Container>
  );
};

Test.propTypes = {
  getPostsLoad: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPostsLoad })(Test);
