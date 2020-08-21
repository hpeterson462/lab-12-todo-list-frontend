import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import AuthPage from './AuthPage.js';
import TodoListPage from './TodoListPage.js';
import './App.css';

export default class App extends Component {
  state = { token: localStorage.getItem('token') }

  handleTokenChange = (token) => {
    this.setState({ token: token });
    localStorage.setItem('token', token);
  }

  clearToken = () => {
    this.setState({ token: '' })

    localStorage.setItem('token', '')
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <Router>
            <main>
              <section className='sidebar'>
                {
                  this.state.token &&
                  <div>
                    <Link to='/signin'><div>Sign In</div>
                    </Link>
                    <Link to="/signup"><div>Sign Up</div></Link>
                    <button onClick={this.clearToken}>
                      Logout
                      </button>
                  </div>
                }
              </section>
              <section className='content'>
                <Switch>
                  <Route
                    exact
                    path='/'
                    render={(routerProps) => <TodoListPage
                      token={this.state.token}
                      {...routerProps} />}
                  />
                  <Route
                    exact
                    path='/signin'
                    render={(routerProps) => <AuthPage
                      handleTokenChange={this.handleTokenChange}
                      token={this.state.token}
                      {...routerProps} />}
                  />
                </Switch>
              </section>
            </main>
          </Router>
        </header>
      </div >
    )
  }
}