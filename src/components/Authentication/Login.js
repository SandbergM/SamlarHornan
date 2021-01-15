import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const LoginModal = ({ toggleModalState }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showError, setShowError] = useState(false);

  const { whoami } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();

    let res = await fetch(`/api/v1/auth`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-type": "application/json;charset=utf-8" },
    });

    switch (res.status) {
      case 201:
        whoami();
        break;
      default:
        setShowError(true);
    }
  };

  return (
    <div className="primary-bgc secondary-tc">
      <Form onSubmit={login}>
        <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12">
          <Label
            for="emailAddress"
            className="tradeHub-dark-grey font-weight-bold"
          >
            Email
          </Label>
          <Input
            required
            className="light-grey-background tradeHub-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12">
          <Label
            for="emailAddress"
            className="tradeHub-dark-grey font-weight-bold"
          >
            Password
          </Label>
          <Input
            required
            className="light-grey-background tradeHub-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <div
          id="login-error-message"
          className="col-12 d-flex justify-content-center align-items-center mt-2"
        >
          {showError && (
            <h6 className="no-margin"> Fel email eller lösenord </h6>
          )}
        </div>
        <Button className="col-6 offset-3 mt-3">Logga in</Button>
        <p
          className="secondary-tc no-margin mt-5 d-flex justify-content-center pointer"
          onClick={() => {
            toggleModalState();
          }}
        >
          Inget konto? Skaffa ett här!
        </p>
      </Form>
    </div>
  );
};

export default LoginModal;
