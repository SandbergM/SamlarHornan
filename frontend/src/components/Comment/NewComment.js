import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const NewComment = ({ threadId, isModerator }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [message, setMessage] = useState({});
  const [highlighted, setHighlighted] = useState(false);

  const publishComment = async (e) => {
    e.preventDefault();
    let comment = await fetch(`/api/v1/comments`, {
      method: "POST",
      body: JSON.stringify({
        message: message,
        highlighted: highlighted ? 1 : 0,
        threadId: threadId,
      }),
      headers: { "Content-type": "application/json;charset=utf-8" },
    });
    console.log(comment.status);
  };

  useEffect(() => {
    console.log(highlighted);
  }, [highlighted]);

  return (
    <div>
      <Button
        className="col-12 rounded secondary-bgc primary-tc oblique new-thread-button"
        onClick={toggle}
      >
        Skriv kommentar
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody className="primary-bgc secondary-tc">
          <Form onSubmit={publishComment}>
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12">
              <Label className="tradeHub-dark-grey font-weight-bold">
                Meddelande
              </Label>
              <Input
                required
                className="light-grey-background tradeHub-input"
                type="textarea"
                placeholder="Meddelande"
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12">
              <Label for="exampleSelect">Select</Label>
              <Input
                type="select"
                name="select"
                onChange={(e) => {
                  setHighlighted(e.target.value);
                }}
              >
                <option value="false">Spara som vanligt inlägg</option>
                <option value="true">Spara som moderator inlägg</option>
              </Input>
            </FormGroup>
            <Button className="col-6 offset-3 mt-3">Publicera</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default NewComment;
