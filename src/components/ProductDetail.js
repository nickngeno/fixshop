import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct } from "../Redux/actions/productActions";
import { Container, Row, Col } from "react-bootstrap";

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
    };
    fetchProduct();
  }, [id, dispatch]);
  return (
    <Container>

      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.title} />
        </Col>
        <Col md={6}></Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
