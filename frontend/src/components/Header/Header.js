import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
} from "reactstrap";
import mainLogo from "../../images/logo.png";
import { UserContext } from "../../context/UserContext";
import AuthenticationModal from "../Authentication/AuthenticationModal";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const toggle = () => setIsOpen(!isOpen);

  let history = useHistory();

  const goToStartPage = () => {
    history.push("/");
  };

  return (
    <div className="">
      <Navbar
        id="navbar-container"
        light
        expand="md"
        className=" primary-bgc secondary-tc navbar-dark pl-5 pr-5 pt-3 pb-3"
      >
        <NavbarBrand
          className="pointer"
          onClick={() => {
            goToStartPage();
          }}
        >
          <img src={mainLogo} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar></Nav>
          <div>
            {!user ? (
              <NavbarText className="secondary-tc bold pointer ml-4 mr-4">
                <AuthenticationModal showLogin={false} label={`Registrera`} />
              </NavbarText>
            ) : (
              <NavbarText
                className="secondary-tc bold pointer ml-4 mr-4"
                onClick={() => {
                  console.log("My account");
                }}
              >
                <p className="no-margin">Mitt konto</p>
              </NavbarText>
            )}
          </div>
          <div>
            {!user ? (
              <NavbarText className="secondary-tc bold pointer ml-4 mr-4">
                <AuthenticationModal showLogin={true} label={`Logga in`} />
              </NavbarText>
            ) : (
              <NavbarText
                className="secondary-tc bold pointer ml-4 mr-4"
                onClick={() => {
                  logout();
                }}
              >
                <p className="no-margin">Logga ut</p>
              </NavbarText>
            )}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
