import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardImg,
  Button,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import config from "../config/config";

const Images = () => {
  const [imgID, setImgID] = useState(0);
  const [images, setImages] = useState([{ id: 1, imgUrl: "" }]);
  const history = useHistory();
  useEffect(() => {
    axios(`${config.apiUrl}/images`).then((result) => {
      let allImages = [];
      result.data.forEach((image) => {
        let tempImg = { id: imgID, imgUrl: image.url, imgName: image.name };
        setImgID(imgID + 1);
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
        axios(`${config.apiUrl}/images`).then((result) => {
          let allImages = [];
          result.data.forEach((image) => {
            let tempImg = { id: imgID, imgUrl: image.url, imgName: image.name };
            setImgID(imgID + 1);
            allImages.push(tempImg);
          });
          setImages(allImages);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row>
        {images ? (
          images.map((img, index) => (
            <Col xs="3" key={index}>
              <Card body outline>
                <CardImg
                  top
                  width="100%"
                  src={img.imgUrl}
                  alt="Card image cap"
                  onClick={() => handleCardClick(img.imgName)}
                />
                <CardText>{img.imgName}</CardText>
                <Button outline color="primary" onClick={() => {}}>
                  Edit
                </Button>
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
          <p>loading...</p>
        )}
      </Row>
    </Container>
  );
};

export default Images;
