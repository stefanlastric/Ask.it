import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Row, Col } from 'react-bootstrap';

const Login = () => {
  return (
    <Fragment>
      <Row className='justify-content-center'>
        <Col sm={0}>
          <h1 className='large text-primary'>Sign In</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Sign Into Your Account
          </p>
          <form className='form'>
            <div className='form-group'>
              <input type='email' placeholder='Email Address' name='email' />
            </div>
            <div className='form-group'>
              <input type='password' placeholder='Password' name='password' />
            </div>
            <input type='submit' className='btn btn-primary' value='Login' />
          </form>
          <p className='my-1'>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Login;
