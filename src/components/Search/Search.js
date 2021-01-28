import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
function Search(props) {
  const [{ apiKey, products }, dispatch] = useStateValue();
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (props.pageValue === 1) {
      history.replace(`/products`);
    } else {
      

      if (searchValue.length === 0) {
        dispatch({
          type: "SET_PRODUCTS",
          products: [],
        });
      } else {
        axios
          .post(`${apiKey}/search_products`, { prodname: searchValue })
          .then((res) => {
            console.log(res.data);
            dispatch({
              type: "SET_PRODUCTS",
              products: res.data,
            });
          });
      }
    }
  };

  return (
    <div className="search container">
      <Form style={{ display: "flex", flexGrow: 1 }}>
        <Form.Control
          className="search__searchInput"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleSearch}
          style={{ background: "none", border: "none" }}
        >
          
        </button>
      </Form>
    </div>
  );
}

export default Search;
