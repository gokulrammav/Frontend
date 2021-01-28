import React from "react";
import { Button, Jumbotron } from "react-bootstrap";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";
function OrderPlaced() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const handleVisitToRoot = (e) => {
    e.preventDefault();
    history.replace("/");
  };

  return (
    <div className="orderplaced container">
      <Jumbotron
        style={{
          backgroundColor: "gray",
          padding: 30,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <h2 style={{ color: "black" }}>Order Confirmation</h2>
        <h5>Thank you {user.Name}</h5>
        <p>
          Your Order Has Been Placed and will be delivered in next few working
          days.
        </p>
        <p>Since you are here!</p>
        <p>
          <Button variant="primary" onClick={handleVisitToRoot}>
            Buy More
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default OrderPlaced;
