import { React, useState, useEffect } from "react";
import { Container, Row, Col, Media, Spinner } from "reactstrap";
import ImageRepoNavbar from "./Navbar";
import { useParams } from "react-router";
import axios from "axios";
import config from "../config/config";

const Image = () => {
  let { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const imgStyle = {
    maxHeight: 1000,
    maxWidth: 1000,
  };
  useEffect(() => {
    axios
      .get(`${config.apiUrl}/image/${id}`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setImageUrl(response.data);
        }
      });
  }, [id]);

  return (
    <Container>
      <ImageRepoNavbar />
      <Row>
        <Col xs="3">
          <div styles="width:800; height:800;">
            {imageUrl ? (
              <Media src={imageUrl} style={imgStyle} />
            ) : (
              <Spinner color="primary" />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Image;
