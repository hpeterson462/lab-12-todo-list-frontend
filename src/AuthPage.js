import React, { Component } from 'react';
import { signUp, signIn } from './todos-api.js';

export default class AuthPage extends Component {

    state = {
        signInEmail: '',
        singInPassword: '',
        signUpEmail: '',
        signUpPassword: ''
    }

    handleSignIn = async (e) => {
        e.preventDefault();

        const user = await signIn({
            email: this.state.signInEmail,
            password: this.state.signInPassword
        })
        this.props.handleTokenChange(user.body.token);
        this.props.history.push('/');
    }

    handleSignUp = async (e) => {
        e.preventDefault();

        const user = await signUp({
            email: this.state.signUpEmail,
            password: this.state.signUpPassword
        });
        this.props.handleTokenChange(user.body.token);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSignIn} className='form-signin'>
                    Sign In
                <label>
                        Email
                    <input onChange={e => this.setState({ signInEmail: e.target.value })} value={this.state.signInEmail} />
                    </label>
                    <label>
                        Password
                    <input onChange={e => this.setState({ signInPassword: e.target.value })} value={this.state.signInPassword} type='password' />
                    </label>
                    <button>Submit</button>
                </form>
                <form onSubmit={this.handleSignUp} className='form-signup'>
                    Sign Up
                <label>
                        Email
                    <input onChange={e => this.setState({ signUpEmail: e.target.value })} value={this.state.signUpEmail} />
                    </label>
                    <label>
                        Password
                    <input onChange={e => this.setState({ signUpPassword: e.target.value })} value={this.state.signUpPassword} type='password' />
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
