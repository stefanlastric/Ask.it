import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

const Register = () => {
  return (
    <Fragment>
      <Row className='justify-content-center'>
        <Col sm={0}>
          <h1 className='large text-primary'>Sign Up</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Create Your Account
          </p>
          <form className='form' action='create-profile.html'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Name'
                name='name'

                //required
              />
            </div>
            <div className='form-group'>
              <input type='email' placeholder='Email Address' name='email' />
              <small className='form-text'></small>
            </div>
            <div className='form-group'>
              <input type='password' placeholder='Password' name='password' />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                //minLength='5'
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Register' />
          </form>
          <p className='my-1'>
            Already have an account? <Link to='/login'>Sign In</Link>
          </p>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Register;
