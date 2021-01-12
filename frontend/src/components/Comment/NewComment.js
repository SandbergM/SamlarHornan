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

const NewComment = ({ threadId, isModerator, appendComment }) => {
  const toggle = () => setModal(!modal);
  const [newComment, setNewComment] = useState(null);
  const [modal, setModal] = useState(false);

  const publishComment = async (e) => {
    e.preventDefault();
    console.log(newComment);
    let comment = await fetch(`/api/v1/comments`, {
      method: "POST",
      body: JSON.stringify({
        message: newComment.message,
        highlighted: newComment.highlighted === "true",
        threadId: parseInt(threadId),
      }),
      headers: { "Content-type": "application/json;charset=utf-8" },
    });
    if (comment.ok) {
      appendComment(await comment.json());
      setModal(!modal);
    }
  };

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
                onChange={(e) =>
                  setNewComment({ ...newComment, message: e.target.value })
                }
              />
            </FormGroup>
            {isModerator && (
              <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12">
                <Label for="exampleSelect">Select</Label>
                <Input
                  type="select"
                  name="select"
                  onChange={(e) => {
                    setNewComment({
                      ...newComment,
                      highlighted: e.target.value,
                    });
                  }}
                >
                  <option value={false}>Spara som vanligt inlägg</option>
                  <option value={true}>Spara som moderator inlägg</option>
                </Input>
              </FormGroup>
            )}
            <Button className="col-6 offset-3 mt-3">Publicera</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default NewComment;
