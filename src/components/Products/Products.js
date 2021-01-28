import React, { useState, useEffect } from "react";
import "./ProductsStyles.css";
import { Card, Row, Col } from "react-bootstrap";
import { useStateValue } from "../../StateProvider";
import axios from "axios";

function Products(props) {
  const [{ apiKey }, dispatch] = useStateValue();

  const handleAddToCart = (e) => {
    e.preventDefault();
    console.log(props.prod_id);
    axios
      .post(`${apiKey}/add_to_cart`, {
        prodid: props.Prod_id,
      })
      .then((res) => {
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
  };

  return (
    <Card style={{ width: "200px" }}>
      <Card.Img variant="top" src={props.Prod_img_url} />
      <Card.Body>
        <Card.Title> {props.Prod_name}</Card.Title>
        <Card.Text>₹{props.Prod_price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Products;
