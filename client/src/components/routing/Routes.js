import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import NotFound from '../layout/NotFound';
import Profile from '../auth/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import MyQuestions from '../myposts/MyQuestions';

class Routes extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <section className='container'>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/posts' component={Posts} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/posts/:id' component={Post} />

          {isAuthenticated && (
            <Route private path='/myquestions' component={MyQuestions} />
          )}
          {isAuthenticated && (
            <Route private path='/profile' component={Profile} />
          )}
          <Route component={NotFound} />
        </Switch>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Routes);
