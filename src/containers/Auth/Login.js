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

  handleOnChangeInput = (even, field) => {
    this.setState({
      [even.target.name]: even.target.value,
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
        console.log('done');
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

  handleShowPassword = (even) => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  render() {
    return (
      <div className="Login-backgroud">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 text-center title">Login</div>
            <div className="form-group mt-4">
              <label for="email">Email:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={(even) => this.handleOnChangeInput(even)}
              />
            </div>
            <div className="form-group mt-4">
              <label for="email">Password:</label>
              <div className="input-password">
                <input
                  type={this.state.isShowPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={(even) => this.handleOnChangeInput(even)}
                />
                <button onClick={(even) => this.handleShowPassword(even)}>
                  <i
                    class={
                      this.state.isShowPassword
                        ? 'fas fa-eye'
                        : 'fas fa-eye-slash'
                    }
                  ></i>
                </button>
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
              <i class="fab fa-google icon google"></i>
              <i class="fab fa-facebook icon facebook"></i>
              <i class="fab fa-twitter icon twitter"></i>
            </div>
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
