// src/components/Navigation.js

import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useAuth } from "../AuthContext";
import LogoutButton from "./LogoutButton";

function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const { isLoggedIn } = useAuth();

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand tag={Link} to="/">
        Marble Shop
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/products">
              Products
            </NavLink>
          </NavItem>
          {isLoggedIn && (
            <>
              <NavItem>
                <NavLink tag={Link} to="/sales">
                  Sales
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/customers">
                  Customers
                </NavLink>
              </NavItem>
            </>
          )}
          {!isLoggedIn && (
            <>
              <NavItem>
                <NavLink tag={Link} to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/register">
                  Register
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
      {isLoggedIn && <LogoutButton />}
    </Navbar>
  );
}

export default Navigation;
