import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';


class ForgotPw extends Component {
  state = {
      email: '',
  }

  handleFormChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.props.firebase)
    const { firebase } = this.props;
    console.log(this.state.email, 'sending in...')
    firebase.auth().sendPasswordResetEmail(this.state.email).then(()=>{
      console.log('sent')
    }).catch(err=>{
      console.log('err', err)
    })
    console.log('resetting form state')
    this.setState({
        email: '',
    })
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
        <form onSubmit={this.handleSubmit}>
          <Row className="center">
            <Col m={12} s={12}>
              <Input type="email" value={this.state.email} id='email' label="Email" s={12} onChange={this.handleFormChange} required/>
              <div>
                <Button className="blue lighten-1" waves='light'>Send</Button>
              </div>
            </Col>
          </Row>
        </form>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  withFirebase
)(ForgotPw)
