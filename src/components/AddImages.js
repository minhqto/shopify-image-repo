import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import axios from "axios";
import FormData from "form-data";

const AddImages = () => {
  const [imageName, setImagename] = useState("");
  const [imagesToUpload, setImagesToUpload] = useState([]);

  //header is required for axios post requests to work with multipart/form-data
  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();

    imagesToUpload.forEach((img) => {
      formData.append("imageFile", img);
    });
    axios.post("http://localhost:8080/api/uploadImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const handleChange = (event) => {
    let imgArr = Array.from(event.target.files);
    setImagesToUpload(imgArr);
  };

  return (
    <Container>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <FormGroup row>
          <Label for="imageFile" sm={2}>
            File
          </Label>
          <Col sm={10}>
            <Input
              type="file"
              name="imageFile"
              id="imageFile"
              onChange={(event) => handleChange(event)}
              multiple
            />
            <FormText color="muted">
              Upload your .jpeg, .png, .gif files
            </FormText>
          </Col>
        </FormGroup>

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default AddImages;
