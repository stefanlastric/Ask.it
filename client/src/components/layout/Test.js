import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import PostItem from '../posts/PostItem';
import { Container, Row, Button } from 'react-bootstrap';
import { getPostsLoad } from '../../actions/postload';

const Test = ({
  counter = 0,
  getPostsLoad,
  postload: { postsload, loading }
}) => {
  useEffect(() => {
    getPostsLoad(counter);
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <Row>
        <h2>Question list</h2>
        <div className='posts'>
          {postsload.map(postload => (
            <PostItem key={postload._id} postload={postload} />
          ))}
        </div>
      </Row>
      <Button
        className='primary'
        text='Load more...'
        onClick={() => getPostsLoad(counter + 20)}
      ></Button>
    </Container>
  );
};

Test.propTypes = {
  getPostsLoad: PropTypes.func.isRequired,
  postload: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  postload: state.postload
});

export default connect(mapStateToProps, { getPostsLoad })(Test);
