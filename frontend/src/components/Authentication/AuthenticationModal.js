import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import Login from "./Login";
import Register from "./Register";

const AuthenticationModal = ({ label, showLogin }) => {
  const [modal, setModal] = useState(false);
  const [modalState, setModalState] = useState(showLogin);
  const toggle = () => setModal(!modal);

  const toggleModalState = () => {
    setModalState(!modalState);
  };

  return (
    <div>
      <p
        className="rounded bold secondary-tc pointer no-margin"
        onClick={toggle}
      >
        {label}
      </p>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody className="primary-bgc pl-5 pr-5 pb-4 pt-5">
          {modalState && <Login toggleModalState={toggleModalState} />}
          {!modalState && <Register toggleModalState={toggleModalState} />}
        </ModalBody>
        <ModalFooter className="primary-bgc secondary-tc"></ModalFooter>
      </Modal>
    </div>
  );
};

export default AuthenticationModal;
