import React, { useState, useEffect } from "react";
import Search from "../Search/Search";
import Products from "../Products/Products";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import { useStateValue } from "../../StateProvider";
function Mainpage() {
  const [latestProd, setLatestProd] = useState([]);
  const [{ apiKey }, dispatch] = useStateValue();

  useEffect(() => {
    axios.get(`${apiKey}/get_latest`).then((res) => {
      setLatestProd(res.data);
    });
  }, []);

  return (
    <div>
      
        <Search pageValue={1} />
        <br></br>

        <div className="container">
          <h4>Latest Products</h4>
          <Row>
            {latestProd.map((each) => {
              return (
                <Col lg={3}>
                  <Products
                    key={each.Prod_id}
                    Prod_id={each.Prod_id}
                    Categories_name={each.Categories_name}
                    Prod_img_url={each.Prod_img_url}
                    Prod_name={each.Prod_name}
                    Prod_price={each.Prod_price}
                    Prod_rating={each.Prod_rating}
                    Prod_specs={each.Prod_specs}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
    
    </div>
  );
}

export default Mainpage;
