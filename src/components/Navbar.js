import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const NavBar = (props) => (
  <Navbar color="light" light expand="md">
    <NavbarBrand href="/">SWAPI</NavbarBrand>
    <NavbarToggler onClick={() => null } />
    <Collapse isOpen={false} navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="https://github.com/danilags">Daniel Agus</NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Filter
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => props.onFilter('Vehicles')}>
              Vehicles
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Collapse>
  </Navbar>
);

export default NavBar;
