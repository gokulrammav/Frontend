import axios from "axios";
import React from "react";
import { Button, Table } from "react-bootstrap";
import { useStateValue } from "../../StateProvider";
import "./ShoppingItemStyles.css";

function ShoppingItem({ cartItem }) {
  const [{ apiKey, user }, dispatch] = useStateValue();

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: cartItem.UUID,
    });
    axios
      .post(`${apiKey}/remove_from_cart`, {
        cartItem: cartItem.Prod_id,
        user: user.Email,
        uuid: cartItem?.UUID || cartItem?.uuid,
      })
      .then((res) => {});
  };

  return (
    <tbody>
      {console.log(cartItem)}
      <tr>
        <td>
          <img
            className="shoppingitem__img"
            alt="img"
            src={cartItem.Prod_img_url}
          />
        </td>
        <td>{cartItem.Prod_name}</td>
        <td>Rs. {cartItem.Prod_price}</td>
        <td>
          <Button variant="dark" onClick={handleRemoveFromCart}>
            Remove
          </Button>
        </td>
      </tr>
    </tbody>
  );
}

export default ShoppingItem;
