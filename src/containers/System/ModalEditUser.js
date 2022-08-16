import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './UserManage.scss';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils';
import _ from 'lodash';

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
    };
  }

  componentDidMount() {
    let user = this.props.userEdit;

    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: 'password',
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
      });
    }
  }

  toggle = () => {
    this.props.toggleModalEditUser();
  };

  handleOnChangeInput = (event) => {
    let coppyState = { ...this.state };
    coppyState[event.target.name] = event.target.value;
    this.setState({
      ...coppyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      'email',
      'password',
      'firstName',
      'lastName',
      'address',
      'phoneNumber',
    ];

    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert('missing');
        break;
      }
    }

    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={'modal'}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
        <ModalBody>
          <div className="text-center">
            <h3>Create new user</h3>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <input
                disabled
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Password</label>
              <input
                disabled
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputFirstName">First name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="firstName"
                name="firstName"
                value={this.state.firstName}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputLastName">Last name:</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="lastName"
                value={this.state.lastName}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputAddress">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="1234 Main St"
                value={this.state.address}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPhoneNumber">Phone number:</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                placeholder="012345678"
                value={this.state.phoneNumber}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.handleSaveUser()}>
            Save
          </Button>
          <Button color="secondary" onClick={() => this.toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
