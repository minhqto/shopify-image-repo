import React, { useState, useContext } from "react";
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
import ImageRepoNavbar from "./Navbar";
import { AppContext } from "../context";

const AddImages = () => {
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [errorMsg, setErrorMsg] = useState({});
  const [hideStatusBar, setHideStatusBar] = useState(true);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const { setAllUploadedImages } = useContext(AppContext);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    setHideStatusBar(false);
    let formData = new FormData();
    imagesToUpload.forEach((img) => {
      formData.append("imageFile", img);
    });

    axios
      .post(`${config.apiUrl}/uploadImage`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        }, //credit goes to https://github.com/chancet1982/vue-loadingbar/blob/master/src/components/LoadingBar.vue
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader("content-length") ||
              progressEvent.target.getResponseHeader(
                "x-decompressed-content-length"
              );
          if (totalLength !== null) {
            let completed = Math.round(
              (progressEvent.loaded * 100) / totalLength
            );
            setPercentCompleted(completed);
          }
        },
      })
      .then((response) => {
        setAllUploadedImages(response.data); //set the global state to the newly set array
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
      document.getElementById("imageFile").value = "";
    } else {
      setImagesToUpload(imgArr);
    }
  };

  return (
    <Container>
      <ImageRepoNavbar />
      <Form onSubmit={(event) => handleSubmit(event)}>
        <FormGroup row>
          <Label for="imageFile" sm={2}>
            File
          </Label>
          <Col sm={10}>
            <Input
              type="file"
              accept=".jpeg,.png,.gif"
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
