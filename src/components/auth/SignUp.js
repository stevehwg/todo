import React, { Component } from 'react';
import { Row, Col, Input, Button, Preloader } from 'react-materialize';
import { signUp } from '../../actions/authActions';
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
      userType: ''
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
              <Row>
                <Col>
                <input name="userType" id='user' type='radio' value='User' label='User' onChange={this.handleFormChange} className='with-gap' />
                <label htmlFor="user">User</label>
                </Col>
                <Col>
                <input name="userType" id='superuser' type='radio' value='Superuser' label='Superuser' onChange={this.handleFormChange} className='with-gap'/>
                <label htmlFor="superuser">Superuser</label>
                </Col>
                <Col>
                <input name="userType" id='admin' type='radio' value='Admin' label='Admin' onChange={this.handleFormChange} className='with-gap' />
                <label htmlFor="admin">Admin</label>
                </Col>
              </Row>
              <Row className="center">
                <Button className="blue lighten-1" waves='light'>Sign Up</Button>
              </Row>
            </Col>
          </Row>
        </form>
        }
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
    }
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(SignUp);