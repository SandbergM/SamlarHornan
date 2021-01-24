import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { ForumContext } from "../../context/ForumContext";
import { useHistory } from "react-router-dom";

const CreateNewForum = () => {
  const [newforum, setNewForum] = useState(null);

  const { categories } = useContext(ForumContext);

  let history = useHistory();

  const publishNewForum = async (e) => {
    e.preventDefault();
    let forum = await fetch(`/api/v1/forums`, {
      method: "POST",
      body: JSON.stringify({
        ...newforum,
        categoryId: parseInt(newforum.categoryId),
      }),
      headers: { "Content-type": "application/json;charset=utf-8" },
    });
    switch (forum.status) {
      case 201:
        history.push(`forum/${newforum.url}`);
        break;
    }
  };

  return (
    <div className="primary-bgc secondary-tc">
      <h5> Skapa nytt forum </h5>
      <Form
        className="light-grey-background tradeHub-input"
        onSubmit={publishNewForum}
      >
        <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12">
          <Label
            for="emailAddress"
            className="tradeHub-dark-grey font-weight-bold"
          >
            Namn
          </Label>
          <Input
            required
            type="text"
            placeholder="Titel"
            onChange={(e) => setNewForum({ ...newforum, name: e.target.value })}
          />
        </FormGroup>
        <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12">
          <Label
            for="emailAddress"
            className="tradeHub-dark-grey font-weight-bold"
          >
            Beskrivning
          </Label>
          <Input
            required
            type="text"
            placeholder="Beskrivning"
            onChange={(e) =>
              setNewForum({ ...newforum, description: e.target.value })
            }
          />
        </FormGroup>

        <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12">
          <Label
            for="emailAddress"
            className="tradeHub-dark-grey font-weight-bold"
          >
            Länk / Förkortning
          </Label>
          <Input
            required
            type="text"
            placeholder="Länk / Förkortning"
            onChange={(e) => setNewForum({ ...newforum, url: e.target.value })}
          />
        </FormGroup>

        <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12">
          <Label
            for="emailAddress"
            className="tradeHub-dark-grey font-weight-bold"
          >
            Kategori
          </Label>
          <Input
            required
            type="select"
            onChange={(e) =>
              setNewForum({ ...newforum, categoryId: e.target.value })
            }
          >
            <option defaultValue disabled>
              Välj en kategori
            </option>
            {categories &&
              categories.map((category) => {
                return <option value={category.id}> {category.name} </option>;
              })}
          </Input>
        </FormGroup>
        <Button> Publicera </Button>
      </Form>
    </div>
  );
};

export default CreateNewForum;
