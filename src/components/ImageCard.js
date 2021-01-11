import React from "react";
import { Card, Button, CardImg, CardText } from "reactstrap";

const ImageCard = (props) => {
  return (
    <Card body outline>
      <CardImg top width="100%" src={props.imgUrl} />
      <CardText>{props.imgName}</CardText>
    </Card>
  );
};

export default ImageCard;
