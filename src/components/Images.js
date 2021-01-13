import React, { useState, useEffect } from "react";
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
import axios from "axios";
import config from "../config/config";

const Images = () => {
  const [images, setImages] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios(`${config.apiUrl}/images`).then((result) => {
      let allImages = [];
      let imgID = 1;
      result.data.forEach((image) => {
        let tempImg = { id: imgID, imgUrl: image.url, imgName: image.name };
        imgID++;
        allImages.push(tempImg);
      });
      setImages(allImages);
    });
  }, []);

  const handleCardClick = (imgName) => {
    history.push(`/image/${imgName}`);
  };

  const handleDelete = (imgName) => {
    axios
      .delete(`${config.apiUrl}/image/${imgName}`)
      .then((response) => {
        let updatedImages = images.filter((img) => img.imgName !== imgName);
        setImages(updatedImages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Alert color="light">Click on images to see larger version!</Alert>
      <Row>
        {images.length > 0 ? (
          images.map((img, index) => (
            <Col xs="3" key={index}>
              <Card body outline>
                <CardImg
                  top
                  width="100%"
                  src={img.imgUrl}
                  onClick={() => handleCardClick(img.imgName)}
                />
                <CardText>{img.imgName}</CardText>
                {/* <Button outline color="primary" onClick={() => {}}>
                  Edit
                </Button> */}
                &nbsp;
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
