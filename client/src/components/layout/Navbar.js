import { Navbar, Nav } from 'react-bootstrap';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
// import { logout } from '../../actions/auth';

import './Navbar.css';

export const AppNavBar = () => {
  const authLink = (
    <Nav className='ml-auto'>
      <Nav.Item>
        <Nav.Link to='/profile' exact as={NavLink}>
          Profile
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        {' '}
        <Nav.Link to='/myquestions' exact as={NavLink}>
          My Questions
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
        <Navbar.Collapse id='basic-navbar-nav'></Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavBar;
