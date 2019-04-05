import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContext from './context/auth-context';
import Home from './components/Pages/Home';
import Connect from './components/Pages/Connect';
import Profile from './components/Pages/Profile';
import { cookies } from './constants';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    cookies.addChangeListener(this.authStateChanged);
  }

  authStateChanged = (cookie) => {
    if (!cookie) return;
    if (cookie.name !== 'auth') return;
    // user logged out
    if (!cookie.value) {
      this.setState({ user: null });
    }
  }

  setAuthenticatedUser = user => this.setState({ user });

  render() {
    const authContext = {
      user: this.state.user,
      setAuthenticatedUser: this.setAuthenticatedUser
    };

    return (
      <AuthContext.Provider value={authContext}>
        <BrowserRouter>
          <Switch>
            <Route path="/:path(|index|home|start)" component={Home} />
            <Route path="/connect" component={Connect} />
            <Route path="/profile/:userId" component={Profile} />
            <Route render={() => <p>Page not found</p>} />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

export default App;
