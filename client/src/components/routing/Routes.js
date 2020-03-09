import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import NotFound from '../layout/NotFound';
import Questions from '../questions/Questions';
import MyQuestions from '../questions/MyQuestions';
import Profile from '../auth/Profile';

class Routes extends React.Component {
  render() {
    return (
      <section className='container'>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/questions' component={Questions} />
          <Route exact path='/login' component={Login} />

          <Route component={NotFound} />
        </Switch>
      </section>
    );
  }
}

export default Routes;

/*
{isAuthenticated && (
            <Route private path='/myquestions' component={MyQuestions} />
          )}
          {isAuthenticated && (
            <Route private path='/profile' component={Profile} />
          )}

          */
