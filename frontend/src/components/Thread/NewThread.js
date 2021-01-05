import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const NewThread = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        className="col-12 rounded secondary-bgc primary-tc oblique new-thread-button mt-3 mb-2"
        onClick={toggle}
      >
        Skapa ny tråd
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Skapa tråd</ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button className="primary-bgc" onClick={toggle}>
            Skapa
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default NewThread;
