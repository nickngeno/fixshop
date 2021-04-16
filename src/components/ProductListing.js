import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../Redux/actions/productActions";
import { Container, Row, Card, Badge, Spinner } from "react-bootstrap";
import {Link} from 'react-router-dom'

const ProductListing = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios
        .get("https://fakestoreapi.com/products")
        .catch((err) => {
          console.log(err);
        });
      dispatch(setProducts(response.data));
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div>
      <h3 style={{ textAlign: "center", padding: "1rem" }}>Product Listing</h3>
      <Container className="content-wrapper">
        {products.length === 0 ? (
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            {" "}
            <Spinner animation="border" variant="primary" />
          </Row>
        ) : (
          products.map((item) => (
            <Card className="card-item" key={item.id}>
              <Link to={`/product/${item.id}`} >
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ width: "200px" }}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Badge pill variant="warning" size="lg">
                    $ {item.price}
                  </Badge>
                </Card.Body>
              </Link>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
};

export default ProductListing;
