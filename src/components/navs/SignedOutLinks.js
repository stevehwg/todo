import React from 'react'
import { NavItem } from 'react-materialize';

const SignedOutLinks = () => {
  return (
    <div className="right">
      <NavItem href="/signin">Sign In</NavItem>
      <NavItem href='/signup'>Sign Up</NavItem>
    </div>
  )
}

export default SignedOutLinks