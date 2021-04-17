import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct,removeSelectedProduct } from "../Redux/actions/productActions";
import { Container, Row, Col, Button } from "react-bootstrap";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  console.log(product);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .catch((error) => {
          console.log(error);
        });
      // console.log(response)
      dispatch(selectedProduct(response.data));
      return () => {
        dispatch(removeSelectedProduct())
      }
    };
    fetchProduct();
  }, [id, dispatch]);
  return (
    <Container className="product-container pt-3">
      <Row>
        <Col md={6} className="product-left p-3">
          <img src={product.image} alt={product.title} style={{width: "300px"}} />
        </Col>
        <Col md={6} className="product-left p-3">
          <h4>{product.title}</h4>
          <h5>Category : {product.category}</h5>
          <h5>Description</h5><hr/>
          <p>{product.description}</p>
          <p>Price : $ <b>{product.price}</b></p>
          <Button variant="warning" >Add to Cart</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
