import React, { Component } from 'react';
import { Row, Col, Input, Button, Preloader } from 'react-materialize';
import GoogleButton from 'react-google-button'
import { signUp, googleLogin } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';

// connect to redux to access firebase
import { connect } from 'react-redux';

//connect to firebae
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';

class SignUp extends Component {
  state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
  }

  handleFormChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      });

  }

  handleSubmit = (e) => {
      e.preventDefault();
      const { firebase } = this.props
      // console.log(this.state)
      this.props.signUp(this.state, firebase)
  }

  render() {
    // console.log(this.props)
    const { firebase, googleLogin } = this.props
    // Redirect to home if user is logged in.
    const { isLoaded, isEmpty } = this.props.auth
    if (isLoaded && !isEmpty) {
      return <Redirect to='/' />
    }

    return (
      <Row>
        { !isLoaded ?
          <Preloader />
        :
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Col m={12}>
              <Row>
                <Col s={12}>
                <Input s={6} type='text' name='firstName'label="First Name" onChange={this.handleFormChange} required />
                <Input s={6} type='text' name='lastName' label="Last Name" onChange={this.handleFormChange} required/>
                <Input type="email" name='email' label="Email" s={12} onChange={this.handleFormChange} required/>
                <Input type="password" name='password' label="password" s={12} onChange={this.handleFormChange} required/>
                </Col>
              </Row>
              <Row className="center">
                <Button className="blue lighten-1" waves='light'>Sign Up</Button>
              </Row>
            </Col>
          </Row>
        </form>
        }
        {/* Google auth */}
        <Row className="center">Or</Row>
        <Row>
          <Col className="center">
            <GoogleButton
              label='Sign up with Google'
              type='light'
              onClick={() => googleLogin(firebase)}
            />
          </Col>
        </Row>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  // console.log('state', state)
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: (cred, firebase) => {
        dispatch(signUp(cred, firebase))
    },
    googleLogin: firebase => {
      dispatch(googleLogin(firebase))
    }
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(SignUp);
