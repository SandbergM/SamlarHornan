import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const RegisterModal = ({ toggleModalState }) => {
  const [newUser, setNewUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const { whoami } = useContext(UserContext);

  const register = async (e) => {
    e.preventDefault();

    if (weakPassword(newUser.password)) {
      setErrorMessage(weakPassword(newUser.password));
      return;
    }

    let res = await fetch(`/api/v1/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-type": "application/json;charset=utf-8" },
    });

    switch (res.status) {
      case 201:
        await fetch(`/api/v1/auth`, {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: { "Content-type": "application/json;charset=utf-8" },
        }).then(whoami());
        break;
      case 409:
        setErrorMessage(`Användarnamnet eller mailen du angivit är upptagen`);
        break;
    }
  };

  const weakPassword = (password) => {
    let start = `Ditt lösenord måste innehålla minst `;
    if (!password.match(/[a-z]+/)) return `${start} en liten bokstav`;
    if (!password.match(/[A-Z]+/)) return `${start} en stor bokstav`;
    if (!password.match(/[0-9]+/)) return `${start} en siffra`;
    if (!password.match(/[!@#$%^&*]+/)) return `${start} ett specialtecken`;
    if (password.length < 7) return `${start} 8 tecken långt`;
    return false;
  };

  return (
    <div className="primary-bgc secondary-tc">
      <Form className="row" onSubmit={register}>
        <FormGroup className="col-12 ">
          <Label className="tradeHub-dark-grey font-weight-bold">Email</Label>
          <Input
            required
            className="light-grey-background tradeHub-input"
            type="email"
            placeholder="Email"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </FormGroup>
        <FormGroup className="col-12">
          <Label className="tradeHub-dark-grey font-weight-bold">
            Password
          </Label>
          <Input
            required
            className="light-grey-background tradeHub-input"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup className="col-12">
          <Label className="tradeHub-dark-grey font-weight-bold">
            Användarnamn
          </Label>
          <Input
            required
            className="light-grey-background tradeHub-input"
            type="text"
            placeholder="Användarnamn"
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup className="col-6">
          <Label className="tradeHub-dark-grey font-weight-bold">Förnamn</Label>
          <Input
            required
            className="light-grey-background tradeHub-input"
            type="text"
            placeholder="Förnamn"
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup className="col-6 ">
          <Label className="tradeHub-dark-grey font-weight-bold">
            Efternamn
          </Label>
          <Input
            required
            className="light-grey-background tradeHub-input"
            type="text"
            placeholder="Efternamn"
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
          />
        </FormGroup>
        <div
          id="login-error-message"
          className="col-12 d-flex justify-content-center align-items-center"
        >
          {errorMessage && <h6 className="no-margin"> {errorMessage} </h6>}
        </div>
        <Button className="col-6 offset-3 mt-3">Registrera</Button>
        <p
          className="col-12 secondary-tc no-margin mt-5 d-flex justify-content-center pointer"
          onClick={() => {
            toggleModalState();
          }}
        >
          Redan registrerad? Logga in här!
        </p>
      </Form>
    </div>
  );
};

export default RegisterModal;
