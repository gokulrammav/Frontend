import React, { useState } from "react";
import "./LoginStyles.css";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [{ apiKey }, dispatch] = useStateValue();
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    Axios.post(`${apiKey}/user_login`, {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          dispatch({
            type: "SET_USER",
            user: res.data?.data[0],
          });
          localStorage.setItem("user", JSON.stringify(res.data?.data[0]));
          history.replace("/");
        } else {
          console.log("No user");
        }
      })
      .then((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="your email"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="enter password"
            required
          />
        </Form.Group>
        <Button type="submit" variant="info">
          Sign In
        </Button>
      </Form>
    </div>
  );
}

export default Login;
