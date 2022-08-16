import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginAPI } from '../../services';
import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isShowPassword: false,
      errMessage: '',
    };
  }

  handleOnChangeInput = (event) => {
    let coppyState = { ...this.state };
    coppyState[event.target.name] = event.target.value;
    this.setState({
      ...coppyState,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: '',
    });
    try {
      let data = await handleLoginAPI(this.state.email, this.state.password);
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      } else {
        this.setState({
          errMessage: data.message,
        });
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
    }
  };

  handleShowPassword = (event) => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    // send state to server with e.g. `window.fetch`
  };

  render() {
    return (
      <div className="Login-backgroud">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 text-center title">Login</div>
            <form onSubmit={(event) => this.onFormSubmit(event)}>
              <div className="form-group mt-4">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeInput(event)}
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="email">Password:</label>
                <div className="input-password">
                  <input
                    type={this.state.isShowPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={(event) => this.handleOnChangeInput(event)}
                  />
                  <a onClick={(event) => this.handleShowPassword(event)}>
                    <i
                      className={
                        this.state.isShowPassword
                          ? 'fas fa-eye'
                          : 'fas fa-eye-slash'
                      }
                    ></i>
                  </a>
                </div>
              </div>
              <div className="form-group mt-2" style={{ color: 'red' }}>
                {this.state.errMessage}
              </div>
              <div className="form-group mt-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-login"
                  onClick={() => this.handleLogin()}
                >
                  Login
                </button>
              </div>
              <div className="form-group mt-2 text-center">
                <label className="forgot-password ">Forgot password?</label>
              </div>
              <div className="form-group mt-4 text-center">
                <label>Or login with:</label>
              </div>
              <div className="form-group mt-2 text-center">
                <i className="fab fa-google icon google"></i>
                <i className="fab fa-facebook icon facebook"></i>
                <i className="fab fa-twitter icon twitter"></i>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
