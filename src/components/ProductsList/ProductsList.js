import React, { useState } from "react";
import "./ProductsListStyles.css";
import { Button, Form } from "react-bootstrap";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";


function ProductsList(props) {
  const [{ basket, apiKey, user }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState(1);
  const history = useHistory();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    var basketItem = { uuid: uuidv4(), ...props };
    dispatch({
      type: "ADD_TO_BASKET",
      basket: basketItem,
    });
    axios
      .post(`${apiKey}/add_to_cart`, {
        cartItem: props.Prod_id,
        uuid: basketItem.uuid,
        user: user.Email,
      })
      .then((res) => {});
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("need to login")
    history.replace("/user_login");
  };

  return (
    <div className="productList">
      <div className="productList container">
        <img alt={props.Prod_id} src={props.Prod_img_url} />
        <div className="productList_details">
          <h4>{props.Prod_name}</h4>
          <div className="product__rating">
            {Array(props.Prod_rating)
              .fill()
              .map((_, i) => (
                <p key={i}>⭐</p>
              ))}
          </div>
          <p>
            <strong>₹{props.Prod_price}</strong>
          </p>
        </div>

        <div className="productList_buttons">
          {user?.Email ? (
            <Button variant="outline-primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          ) : (
            <Button variant="outline-primary" onClick={handleLogin}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
