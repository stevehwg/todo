import React from 'react';
import { Navbar, NavItem } from 'react-materialize'

const NavbarView = () => {
    return (
        <Navbar brand='SunShine Music' className="deep-orange accent-2" right>
            <NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
            <NavItem href='components.html'>Components</NavItem>
        </Navbar>

  
    )
}

export default NavbarView;