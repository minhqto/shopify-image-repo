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
  const [images, setImages] = useState([{ id: 0, imgUrl: "" }]);

  useEffect(() => {
    axios("http://localhost:8080/images").then((result) => {
      result.data.forEach((imgUrl) => {
        let tempImg = { id: imgID, imgUrl: imgUrl };
        setImgID(imgID + 1);
        setImages((prevImages) => [...prevImages, tempImg]);
      });
    });
  }, []);

  return (
    <Container>
      <Row>
        {images ? (
          images.map((img, index) => (
            <Col xs="3" key={img.id}>
              <Card>
                <CardImg
                  top
                  width="100%"
                  src={img.imgUrl}
                  alt="Card image cap"
                />
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
