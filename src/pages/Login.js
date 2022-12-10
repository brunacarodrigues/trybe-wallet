import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailAction } from '../redux/actions';

class Login extends Component {
  state = {
    buttonDisabled: true,
    email: '',
    password: '',
  };

  handleChangeButton = () => {
    const { email, password } = this.state;
    const user = /\S+@\S+\.\S+/;
    const minChars = 6;
    const validEmail = user.test(email);
    const validPass = password.length >= minChars;

    if (validEmail && validPass) {
      this.setState({
        buttonDisabled: false });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleChangeButton);
  };

  render() {
    const { buttonDisabled, email, password } = this.state;
    const { dispatch, history } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="email-input">
            <input
              type="email"
              id="email"
              name="email"
              value={ email }
              data-testid="email-input"
              placeholder="E-mail"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-input">
            <input
              type="password"
              id="password"
              name="password"
              value={ password }
              data-testid="password-input"
              placeholder="Password"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ buttonDisabled }
            onClick={ () => dispatch(emailAction(email)) && history.push('/carteira') }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
