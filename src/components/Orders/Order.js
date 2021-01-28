import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../../StateProvider";
import OrderSingleItem from "./OrderSingleItem";


function Order() {
  const [{ apiKey, user, basket }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    getOrder();
  }, [user]);

  const getOrder = () => {
    axios
      .post(`${apiKey}/recent_orders`, {
        user: user?.Email,
      })
      .then((res) => {
        setOrders(res.data);
      });
  };
  useEffect(() => {
    let checkUser = setTimeout(() => {
      if (!user) {
        console.log("Please Login In to View Your Orders");
      }
    }, 1000);
    return () => {
      clearTimeout(checkUser);
    };
  }, [user]);

  const deleteOrder = (uuidOrder) => {
    getOrder();
    if (orders.length === 1) {
      setOrders([]);
    }
  };

  return (
    <div className="orders container">
      <div>
        <br></br>
        <h4>Your Orders</h4>
        <br></br>
        {console.log(orders)}
        {orders.map((each) => {
          console.log(each.Order_uuid);
          return (
            <OrderSingleItem
              triggerOrderItem={deleteOrder}
              key={each.Order_uuid}
              order={each}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Order;
