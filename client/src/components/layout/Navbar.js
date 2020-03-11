import { Navbar, Nav } from 'react-bootstrap';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import './Navbar.css';

const AppNavbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLink = (
    <Nav className='ml-auto'>
      <Nav.Item>
        <Nav.Link to='/myquestions' exact as={NavLink}>
          My Questions
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to='/profile' exact as={NavLink}>
          Profile
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={logout} href='#!'>
          Logout
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );

  const guestLinks = (
    <Nav className='ml-auto'>
      <Nav.Item>
        <Nav.Link to='/register' exact as={NavLink}>
          Register
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to='/login' exact as={NavLink}>
          Login
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );

  return (
    <div className='navigation-bar'>
      <Navbar expand='lg'>
        <Nav>
          <Navbar.Brand to='/' exact as={NavLink}>
            Ask.it
          </Navbar.Brand>
          <Nav.Item>
            {' '}
            <Nav.Link to='/' exact as={NavLink}>
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {' '}
            <Nav.Link to='/questions' exact as={NavLink}>
              Questions
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {!loading && (
            <Fragment>{isAuthenticated ? authLink : guestLinks}</Fragment>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

AppNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(AppNavbar);
