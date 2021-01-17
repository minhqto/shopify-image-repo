import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardImg,
  Button,
  Alert,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context";
import axios from "axios";
import config from "../config/config";
import ImageRepoNavbar from "./Navbar";

const Images = () => {
  const { allUploadedImages, setAllUploadedImages } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (allUploadedImages.length === 0) {
      axios(`${config.apiUrl}/images`, { withCredentials: true }).then(
        (result) => {
          let allImages = [];
          let imgID = 1;
          result.data.forEach((image) => {
            let tempImg = { id: imgID, imgUrl: image.url, imgName: image.name };
            imgID++;
            allImages.push(tempImg);
          });
          setAllUploadedImages(allImages);
        }
      );
    }
  }, []);

  const handleCardClick = (imgName) => {
    history.push(`/image/${imgName}`);
  };

  const handleDelete = (imgName) => {
    axios
      .delete(`${config.apiUrl}/image/${imgName}`, { withCredentials: true })
      .then((response) => {
        let updatedImages = allUploadedImages.filter(
          (img) => img.imgName !== imgName
        );
        setAllUploadedImages(updatedImages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <ImageRepoNavbar />
      <Row>
        <Col xs="10">
          <Alert color="light">Click on images to see larger version!</Alert>
        </Col>
      </Row>
      <Row>
        {allUploadedImages.length > 0 ? (
          allUploadedImages.map((img, index) => (
            <Col xs="3" key={index}>
              <Card body outline>
                <CardImg
                  top
                  width="100%"
                  src={img.imgUrl}
                  onClick={() => handleCardClick(img.imgName)}
                />
                <CardText>{img.imgName}</CardText>

                <Button
                  outline
                  onClick={() => {
                    handleDelete(img.imgName);
                  }}
                >
                  Delete
                </Button>
              </Card>
            </Col>
          ))
        ) : (
          <div>
            <Alert color="info">
              No images here :( Click "Add Images" to start adding some
            </Alert>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Images;
