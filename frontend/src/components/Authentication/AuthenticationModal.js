import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Login from "./Login";
import Register from "./Register";

const AuthenticationModal = ({ label, showLogin }) => {
  const [modal, setModal] = useState(false);
  const [modalState, setModalState] = useState(showLogin);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <p
        className="rounded bold secondary-tc pointer no-margin"
        onClick={toggle}
      >
        {label}
      </p>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody className="primary-bgc">
          {modalState && <Login />}
          {!modalState && <Register />}
        </ModalBody>
        <ModalFooter className="primary-bgc secondary-tc "></ModalFooter>
      </Modal>
    </div>
  );
};

export default AuthenticationModal;
