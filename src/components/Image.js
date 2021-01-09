import { React, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  Button,
} from "reactstrap";
import { useParams } from "react-router";
import axios from "axios";
import config from "../config/config";

const Image = () => {
  let { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    axios.get(`${config.apiUrl}/image/${id}`).then((response) => {
      if (response.status == 200) {
        setImageUrl(response.data);
        console.log(response);
      }
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col xs="3">
          {imageUrl ? (
            <Card>
              <CardImg top width="100%" alt="Card image cap" src={imageUrl} />
              <CardText>{}</CardText>
            </Card>
          ) : (
            <p>Image not found!</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Image;
