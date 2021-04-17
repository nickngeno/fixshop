import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../Redux/actions/productActions";
import { Container, Row, Card, Badge, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    <>
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
            <Link
              to={`/product/${item.id}`}
              className="card-link"
              key={item.id}
            >
              <Card className="shadow p-2 rounded">
                <Card.Img
                  variant="top"
                  src={item.image}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>Category : {item.category}</Card.Text>
                  <Badge pill variant="warning" size="lg">
                    $ {item.price}
                  </Badge> 
                </Card.Body>
              </Card>
            </Link>
          ))
        )}
      </Container>
    </>
  );
};

export default ProductListing;
