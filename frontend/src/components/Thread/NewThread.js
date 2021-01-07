import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useHistory } from "react-router-dom";

const NewThread = ({ forumUrl }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  let history = useHistory();
  const [newThread, setNewThread] = useState({});
  const [newComment, setNewComment] = useState({});

  const publishThread = async (e) => {
    e.preventDefault();
    let thread = await fetch(`/api/v1/threads`, {
      method: "POST",
      body: JSON.stringify({ ...newThread, forumUrl: forumUrl }),
      headers: { "Content-type": "application/json;charset=utf-8" },
    });
    if (thread.status === 201) {
      thread = await thread.json();
      await fetch(`/api/v1/comments`, {
        method: "POST",
        body: JSON.stringify({
          ...newComment,
          threadId: thread.lastInsertRowid,
          highlighted: 1,
        }),
        headers: { "Content-type": "application/json;charset=utf-8" },
      }).then(
        history.push(`/forum/${forumUrl}/thread/${thread.lastInsertRowid}`)
      );
    }
  };

  return (
    <div>
      <Button
        className="col-12 rounded secondary-bgc primary-tc oblique new-thread-button"
        onClick={toggle}
      >
        Skapa ny tråd
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody className="primary-bgc secondary-tc">
          <Form onSubmit={publishThread}>
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12">
              <Label
                for="emailAddress"
                className="tradeHub-dark-grey font-weight-bold"
              >
                Titel
              </Label>
              <Input
                required
                className="light-grey-background tradeHub-input"
                type="text"
                placeholder="Titel"
                onChange={(e) =>
                  setNewThread({ ...newThread, title: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12">
              <Label className="tradeHub-dark-grey font-weight-bold">
                Meddelande
              </Label>
              <Input
                required
                className="light-grey-background tradeHub-input"
                type="textarea"
                placeholder="Meddelande"
                onChange={(e) =>
                  setNewComment({ ...newComment, message: e.target.value })
                }
              />
            </FormGroup>
            <Button className="col-6 offset-3 mt-3">Publicera</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default NewThread;
