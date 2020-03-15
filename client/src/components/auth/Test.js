import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { updatePass } from '../../actions/user';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

const Test = ({ setAlert, updatePass }) => {
  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  });

  const { password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      updatePass({ password });
    }
  };

  return (
    <Fragment>
      <Row className='justify-content-center'>
        <Col sm={0}>
          <h1 className='large text-primary'>Change password</h1>

          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                minLength='5'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={e => onChange(e)}
                minLength='5'
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Change' />
          </form>
        </Col>
      </Row>
    </Fragment>
  );
};

Test.propTypes = {
  setAlert: PropTypes.func.isRequired,
  updatePass: PropTypes.func.isRequired
};

export default connect(null, { setAlert, updatePass })(Test);
