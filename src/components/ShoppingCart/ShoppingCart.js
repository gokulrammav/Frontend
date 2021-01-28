import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useStateValue } from "../../StateProvider";
import "./ShoppingCartStyles.css";
import ShoppingItem from "./ShoppingItem";
import CurrencyFormat from "react-currency-format";
import { CalculateTotal } from "../../reducer";
import axios from "axios";
import { useHistory } from "react-router-dom";


function ShoppingCart() {
  const [{ basket, apiKey, user }, dispatch] = useStateValue();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [addressData, setAddressData] = useState();
  const history = useHistory();
  

  useEffect(() => {
    axios
      .post(`${apiKey}/recent_address`, { user: user?.Email })
      .then((res) => {
        setAddressData(res.data[0]);
      });
  }, [user]);

  const handleGetDefaultAddress = (e) => {
    e.preventDefault();
    setFirstName(addressData?.First_name);
    setLastName(addressData?.Last_name);
    setAddress(addressData?.address);
    setCity(addressData?.City);
    setState(addressData?.State);
    setPincode(addressData?.Pincode);
    setPhone(addressData?.Phone);
  };

  const handleOrderNow = (e) => {
    if (
      firstName.length <= 3 ||
      lastName.length <= 3 ||
      address.length <= 3 ||
      city.length <= 3 ||
      state.length <= 3 ||
      pinCode.length <= 3 ||
      phone.length <= 3
    ) {
    } else {
      e.preventDefault();
      if (user) {
        axios
          .post(`${apiKey}/place_orders`, {
            user: user.Email,
            basket: basket,
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            state: state,
            pinCode: pinCode,
            phone: phone,
          })
          .then((res) => {
            if (res) {
              dispatch({
                type: "EMPTY_BASKET",
              });
              axios
                .post(`${apiKey}/delete_all_cart`, { user: user?.Email })
                .then((res) => {
                  if (res) {
                    history.replace("/order_placed_page");
                  }
                });
            }
          });
      } else {
       console.log("Your are not logged in.");
      }
    }
  };

  return (
    <div className="shoppingcart container">
      <h4>Here's What You're Getting!</h4>
      <hr></hr>
      <h6>You have {basket.length} items in your order.</h6>
      {basket.length > 0 ? (
        <>
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Updater</th>
              </tr>
            </thead>
            {basket.map((each) => {
              return <ShoppingItem key={each.Prod_id} cartItem={each} />;
            })}
          </Table>
          <CurrencyFormat
            renderText={(value) => (
              <h5>
                <strong>Order Total: {value}</strong>
              </h5>
            )}
            decimalScale={2}
            value={CalculateTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
          />
          <div
            className="container"
            style={{
              marginTop: 40,
            }}
          >
            <Button onClick={handleGetDefaultAddress}>
              Get Default Address
            </Button>
            <Form>
              <Form.Group>
                <Row>
                  <Col>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      defaultValue={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      placeholder="Enter First Name"
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      placeholder="Enter Last Name"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  defaultValue={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Enter Address"
                  required
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      placeholder="Enter City"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      defaultValue={state}
                      onChange={(e) => setState(e.target.value)}
                      type="text"
                      placeholder="Enter State"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>PinCode</Form.Label>
                    <Form.Control
                      defaultValue={pinCode}
                      onChange={(e) => setPincode(e.target.value)}
                      type="number"
                      placeholder="Enter Pincode"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      defaultValue={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                      placeholder="123-427-477"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br></br>
              <Button type="submit" variant="success" onClick={handleOrderNow}>
                Order Now
              </Button>
            </Form>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ShoppingCart;
