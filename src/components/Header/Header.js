import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Header() {
  const [{ user, apiKey, basket }, dispatch] = useStateValue();
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axios.get(`${apiKey}/get_categories`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  const getCategories = (e) => {
    axios
      .post(`${apiKey}/get_products_by_category`, {
        cat_name: categories[e].Categories_name,
      })
      .then((res) => {
        console.log(res.data);
        history.replace("/products");
        dispatch({
          type: "SET_PRODUCTS",
          products: res.data,
        });
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: "REMOVE_USER",
    });
    localStorage.removeItem("user");
  };

  return (
    <div style={{ width: "100%" }} className="maxWidth">
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        bg="dark"
      >
        <div className="container">
          <Navbar.Brand as={NavLink} to="/" className="brandName">
            E-Commerce
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            
              <Nav className="ml-auto">
                <Nav.Link as={NavLink} to="/">
                  Home{" "}
                  <FontAwesomeIcon size="xs" icon={faHome}></FontAwesomeIcon>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/products">
                  Products
                </Nav.Link>
                <NavDropdown alignRight title={"Categories"}>
                  {categories.map((each, index) => {
                    return (
                      <NavDropdown.Item
                        onClick={(e) => {
                          e.preventDefault();
                          getCategories(index);
                        }}
                        key={each.Categories_name}
                      >
                        {each.Categories_name}
                      </NavDropdown.Item>
                    );
                  })}
                </NavDropdown>
                <Nav.Link as={NavLink} to="/user_orders">
                  Your Orders
                </Nav.Link>
              </Nav>

              {user === null ? (
                <Nav className="navbarLinks">
                  <Nav.Link as={NavLink} to="/user_registration">
                    Register
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/user_login">
                    Login
                  </Nav.Link>
                </Nav>
              ) : (
                <Nav className="navbarLinks">
                  <Nav.Link as={NavLink} to="/your_cart">
                    Cart <FontAwesomeIcon icon={faShoppingCart} /> {"   "}
                    {basket.length}
                  </Nav.Link>
                  <NavDropdown title={"User"}>
                    <NavDropdown.Item>
                      Logged in as: <br></br>
                      <strong>{user?.Name}</strong>
                    </NavDropdown.Item>
                    <NavDropdown.Item>{user?.Phone}</NavDropdown.Item>
                    <NavDropdown.Divider></NavDropdown.Divider>
                    <NavDropdown.Divider></NavDropdown.Divider>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              )}
           
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
