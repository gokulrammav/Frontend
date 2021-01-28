import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useStateValue } from "../../StateProvider";
import "./OrderSingleItem.css";
import moment from "moment";
import CurrencyFormat from "react-currency-format";

function OrderSingleItem({ order, triggerOrderItem }) {
  const [{ apiKey, user }, dispatch] = useStateValue();

  const handleCancel = (e) => {
    e.preventDefault();
    axios
      .post(`${apiKey}/cancelOrder`, {
        user: user?.Email,
        uuid: order.Order_uuid,
      })
      .then((res) => {
        triggerOrderItem(order.Order_uuid);
      });
  };

  return (
    <div className="ordersingleitem container">
      <div className="ordersingleitem__gray">
        <div className="ordersingleitem__left">
          <p>
            <strong>ORDER PLACED</strong> <br></br>
            {moment(order.Order_date).format("DD/MM/YYYY hh:mm:ss")}
          </p>
          <p>
            <strong>TOTAL</strong>
            <CurrencyFormat
              renderText={(value) => <p style={{ marginBottom: 0 }}>{value}</p>}
              decimalScale={2}
              value={order.Order_price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₹"}
            />
          </p>
          <p>
            <strong>SHIP TO</strong>
            <br></br>
            <div className="orderSingleItem__address">
              <p>{order?.address}</p>
              <p>{order?.City}</p>
              <p>{order?.State}</p>
              <p>{order?.Pincode}</p>
              <p>Phone: {order?.Phone}</p>
            </div>
          </p>
        </div>
        <p>
          <strong>ORDER ID</strong>
          <br></br>
          {order.Order_uuid}
        </p>
      </div>
      <div className="ordersingleitem__main">
        <Table style={{ width: "80%", margin: "auto" }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>

              <th>Price</th>
            </tr>
          </thead>
          {Array(order?.prod_ids.length)
            .fill()
            .map((_, i) => {
              return (
                <tbody key={i}>
                  <tr>
                    <td>
                      <img
                        className="ordersingleitem__main__img"
                        src={order.prod_imgs[i]}
                        alt="img"
                      />
                    </td>
                    <td>{order.prod_names[i]}</td>

                    <td>
                      <CurrencyFormat
                        renderText={(value) => (
                          <p style={{ marginBottom: 0 }}>{value}</p>
                        )}
                        decimalScale={2}
                        value={order.prod_prices[i]}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </Table>
        <hr style={{ margin: 0 }}></hr>
        <div className="container ordersingleitem__main__total">
          <Button
            style={{ marginRight: 10 }}
            onClick={handleCancel}
            variant="danger"
          >
            Cancel Order
          </Button>
          <strong>Order Has Been Received!</strong>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default OrderSingleItem;
