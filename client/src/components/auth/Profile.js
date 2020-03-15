import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUsers } from '../../actions/user';

import { ListGroup, Card, ListGroupItem, CardColumns } from 'react-bootstrap';

const Profile = ({ getUsers, user: { users } }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='users'>
      <h2 className='users-title'>Profile list</h2>
      {
        <div className='users-list'>
          {
            <CardColumns>
              {users.map((user, index) => {
                return (
                  <Card key={index} style={{ width: '18rem', margin: '1rem' }}>
                    <Card.Body>
                      <Card.Title>{user.name}</Card.Title>
                    </Card.Body>
                    <ListGroup>
                      <ListGroupItem>
                        <b>Email: </b>
                        {user.email}
                      </ListGroupItem>
                      <ListGroupItem>
                        <b>Number of answers: </b>
                        {user.brojkomentara}
                      </ListGroupItem>
                      <ListGroupItem>
                        <b>Country: </b>
                        {user.country}
                      </ListGroupItem>
                      <ListGroupItem>
                        <b>Age: </b>
                        {user.age}
                      </ListGroupItem>
                    </ListGroup>
                  </Card>
                );
              })}
            </CardColumns>
          }
        </div>
      }
    </div>
  );
};
Profile.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { getUsers })(Profile);
