import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import mainLogo from "../../images/logo.png";
const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  let history = useHistory();

  const toggle = () => setIsOpen(!isOpen);

  const goToStartPage = () => {
    history.push("/");
  };

  return (
    <div>
      <Navbar
        id="navbar-container"
        className="primary-bgc secondary-tc navbar-dark pl-5 pr-5 pt-3 pb-3"
      >
        <NavbarBrand
          className="oblique secondary-tc pointer"
          onClick={() => {
            goToStartPage();
          }}
        >
          <img id="header-site-logo" src={mainLogo} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="row " navbar>
            <NavItem className="col-12 col-xl-3 d-flex justify-content-around mt-2 mb-2">
              <NavLink href="/components/" className="secondary-tc bold">
                Components
              </NavLink>
            </NavItem>
            <NavItem className="col-12 col-xl-3 d-flex justify-content-around mt-2 mb-2">
              <NavLink href="/components/" className="secondary-tc bold">
                Components
              </NavLink>
            </NavItem>
            <NavItem className="col-12 col-xl-3 d-flex justify-content-around mt-2 mb-2">
              <NavLink href="/components/" className="secondary-tc bold">
                Components
              </NavLink>
            </NavItem>
            <NavItem className="col-12 col-xl-3 d-flex justify-content-around">
              <NavLink href="/components/" className="secondary-tc bold">
                Components
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
