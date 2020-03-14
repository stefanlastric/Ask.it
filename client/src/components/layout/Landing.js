import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, getPostsLoad } from '../../actions/post';
import PostItem from '../posts/PostItem';
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
  getPosts,
  post: { posts, loading },
  getUsers,
  user: { users }
}) => {
  useEffect(() => {
    getPosts();
    getUsers();
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <Row>
        <Col>
          <h2>Question list</h2>
          <div className='posts'>
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
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
                    <b>Broj Komentara: </b>
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
  post: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  user: state.user
});

export default connect(mapStateToProps, { getPosts, getUsers })(Landing);
