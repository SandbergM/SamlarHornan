import React, { useState } from "react";
import { Button, Modal, ModalBody, Form } from "reactstrap";
import CreateNewForum from "./CreateNewForum";
import UpdateUser from "./UpdateUser";

const NewComment = ({}) => {
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState(null);
  return (
    <div>
      <p
        className="rounded bold secondary-tc pointer no-margin"
        onClick={toggle}
      >
        Kontrollpanel
      </p>
      <Modal isOpen={modal} toggle={toggle}>
        <div className="primary-bgc pt-5 d-flex justify-content-around">
          <Button
            onClick={() => {
              setAction("update");
            }}
          >
            Befordra användare
          </Button>
          <Button
            onClick={() => {
              setAction("create");
            }}
          >
            Skapa nytt forum
          </Button>
        </div>
        <ModalBody className="primary-bgc pl-5 pr-5 pb-4 pt-5">
          {action === "update" && <UpdateUser />}
          {action === "create" && <CreateNewForum />}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default NewComment;
