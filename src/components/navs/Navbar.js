import React from 'react';
import { Row, Navbar, NavItem, Preloader } from 'react-materialize';
import { connect } from 'react-redux';
import { signOut } from '../../actions/authActions';
import  SignedOutLinks from './SignedOutLinks'; 
// import { Redirect } from 'react-router-dom';

const NavbarView = (props) => {
    // console.log('props', props)
    // if (props.auth.uid) return <Redirect to='/' />
    
  const { uid, isLoaded } = props.auth
  
  return (
    <Row>
      { !isLoaded ?
      <div className="center">
        <Preloader size='big'/>
      </div>
      :
      <Navbar brand='ReactTodo' className="deep-orange darken-2" right>
        <NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
        <NavItem href='components.html'>Components</NavItem>
        
        {
        uid ? 
        <NavItem onClick={(firebase) => {props.signOut(props.firebase)}}>Sign Out</NavItem>
        :
        <SignedOutLinks />
        }
      </Navbar>
      }
    </Row>
  )
}

const mapStateToProps = state => {
  // console.log('state', state)
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: (firebase) => dispatch(signOut(firebase))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarView);