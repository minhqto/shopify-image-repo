import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardTitle,
  CardText,
  CardImg,
} from "reactstrap";
import axios from "axios";

const Images = () => {
  const [imgID, setImgID] = useState(0);
  const [images, setImages] = useState([{ id: 1, imgUrl: "" }]);

  useEffect(() => {
    axios("http://localhost:8080/api/images").then((result) => {
      let allImages = [];
      result.data.forEach((image) => {
        let tempImg = { id: imgID, imgUrl: image.url, imgName: image.name };
        setImgID(imgID + 1);
        allImages.push(tempImg);
      });
      setImages(allImages);
    });
  }, []);

  return (
    <Container>
      <Row>
        {images ? (
          images.map((img, index) => (
            <Col xs="3" key={index}>
              <Card>
                <CardImg
                  top
                  width="100%"
                  src={img.imgUrl}
                  alt="Card image cap"
                />
                <CardText>{img.imgName}</CardText>
              </Card>
            </Col>
          ))
        ) : (
          <p>loading...</p>
        )}
      </Row>
    </Container>
  );
};

export default Images;
