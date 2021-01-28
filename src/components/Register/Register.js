import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./RegisterStyles.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [{ apiKey }, dispatch] = useStateValue();
  const history = useHistory();

  const registerUser = (e) => {
    Axios.post(`${apiKey}/user_registration`, {
      name: name,
      email: email,
      phone: phone,
      role: role,
      password: password,
    })
      .then((res) => {
        console.log(res.data.sqlMessage);
        history.replace("/user_login");
      })
      .then((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setEmail("");
        setPassword("");
        setRole("");
        setName("");
        setPhone("");
        console.log("User Registered");
        history.replace("/user_login");
      });
  };

  return (
    <div className="register">
      <Form onSubmit={registerUser}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Name"
            required={true}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="enter your email"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            type="phone"
            placeholder="enter your phone no"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Control

            onChange={(e) => {
              setRole(e.target.value);
              console.log(e.target.value);
            }}
            as="select" 
            name="role"
            placeholder="Role"
            required
          >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
      </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="enter password"
            required
          />
        </Form.Group>

        <Button
          variant="info"
          type="submit"
          value="Register"
        >
          Register
        </Button>
      </Form>
      <Link to="/user_login">Login</Link>
    </div>
  );
}

export default Register;
