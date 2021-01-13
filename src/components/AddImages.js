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
  Progress,
} from "reactstrap";
import axios from "axios";
import FormData from "form-data";
import config from "../config/config";
import { useHistory } from "react-router-dom";

const AddImages = () => {
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [errorMsg, setErrorMsg] = useState({});
  const [hideStatusBar, setHideStatusBar] = useState(true);
  const history = useHistory();
  let percentCompleted;
  const handleSubmit = (event) => {
    event.preventDefault();
    setHideStatusBar(false);
    let formData = new FormData();
    imagesToUpload.forEach((img) => {
      formData.append("imageFile", img);
    });
    axios
      .post(
        `${config.apiUrl}/uploadImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        {
          onDownloadProgress: (progressEvent) => {
            const total = parseFloat(
              progressEvent.currentTarget.responseHeaders["Content-Length"]
            );
            const current = progressEvent.currentTarget.response.length;

            percentCompleted = Math.floor((current / total) * 100);
          },
        }
      )
      .then((response) => {
        history.push("/images");
      })
      .catch((err) => {
        setErrorMsg(err);
      });
  };

  const handleChange = (event) => {
    let imgArr = Array.from(event.target.files);
    if (imgArr.length > 50) {
      alert("You can only upload a max of 50 images!");
      history.push("/addImages");
    } else {
      setImagesToUpload(imgArr);
    }
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
      <br></br>
      <Progress hidden={hideStatusBar} animated value={percentCompleted} />
    </Container>
  );
};

export default AddImages;
