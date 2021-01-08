import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const RegisterModal = ({ toggleModalState }) => {
  const [newUser, setNewUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const { setUser } = useContext(UserContext);

  const register = async (e) => {
    e.preventDefault();

    let res = await fetch(`/api/v1/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-type": "application/json;charset=utf-8" },
    });

    if (res.status === 200) {
      let user = await fetch(`/api/v1/auth`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-type": "application/json;charset=utf-8" },
      });
      if (user.status === 200) {
        setUser(await user.json());
      }
    } else {
      setErrorMessage(res.statusText);
    }
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
