import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import http from "http";
import axios from "axios";

const Images = () => {
  const [images, setImages] = useState();

  useEffect(async () => {
    const result = await axios("http://localhost:8080/images");
    setImages(result.data);
  }, []);

  return (
    <Container>
      <h1>{images}</h1>
    </Container>
  );
};

export default Images;
