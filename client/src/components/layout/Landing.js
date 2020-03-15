import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import { getPostsLoad } from '../../actions/postload';
import PostItem from '../posts/PostItem';
import PostItemLoad from '../posts/PostItemLoad';
import Spinner from '../layout/Spinner';
import {
  Container,
  Col,
  Row,
  Card,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import { getUsers } from '../../actions/user';

const Landing = ({
  counter = 0,
  getPostsLoad,
  postload: { postsload },
  getPosts,
  post: { posts, loading },
  getUsers,
  user: { users }
}) => {
  useEffect(() => {
    getPosts();
    getUsers();
    getPostsLoad(counter);
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <Row>
        <Col>
          <div>
            <h2>Question list</h2>
            <div className='postload'>
              {postsload.map(postload => (
                <PostItemLoad key={postload._id} postload={postload} />
              ))}
            </div>
            <input
              type='button'
              className='btn-primary'
              value='Load more'
              onClick={() => getPostsLoad(counter + 20)}
            />
          </div>
        </Col>
        <Col>
          <h2>People list</h2>
          <div className='users'></div>
          {users.map((user, index) => {
            return (
              <Card key={index} style={{ width: '18rem', margin: '1rem' }}>
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                </Card.Body>
                <ListGroup>
                  <ListGroupItem>
                    <b>Number of answers: </b>
                    {user.brojkomentara}
                  </ListGroupItem>
                </ListGroup>
              </Card>
            );
          })}
        </Col>
        <Col>
          <h2>Question list by likes</h2>
          <div className='posts'>
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

Landing.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getPostsLoad: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  postload: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  user: state.user,
  postload: state.postload
});

export default connect(mapStateToProps, { getPosts, getUsers, getPostsLoad })(
  Landing
);
