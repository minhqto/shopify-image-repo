import React, { useState } from "react";
import {
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert,
} from "reactstrap";
import axios from "axios";
import FormData from "form-data";
import config from "../config/config";
import { useHistory } from "react-router-dom";

const AddImages = () => {
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [errorMsg, setErrorMsg] = useState({});
  const history = useHistory();
  //header is required for axios post requests to work with multipart/form-data
  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();

    imagesToUpload.forEach((img) => {
      formData.append("imageFile", img);
    });
    axios
      .post(`${config.apiUrl}/uploadImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        history.push("/images");
      })
      .catch((err) => {
        setErrorMsg(err);
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
              Upload your .jpeg, .png, .gif files. You can select up to 50
              images at once!
            </FormText>
          </Col>
        </FormGroup>
        <Button type="submit">Submit</Button>
        {errorMsg.message ? (
          <Alert color="danger">{errorMsg.message} </Alert>
        ) : null}
      </Form>
    </Container>
  );
};

export default AddImages;
