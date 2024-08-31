// src/pages/CreateSale.js

import React, { useState } from "react";
import useApi from "../hooks/useApi";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Col,
  Row,
  Alert,
} from "reactstrap";

const CreateSale = () => {
  const { callApi, loading, error } = useApi();
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [saleCreated, setSaleCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaleCreated(false);

    try {
      await callApi("POST", "/api/sales", { productId, quantity });
      setSaleCreated(true);
    } catch (err) {
      console.error("Failed to create sale:", err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Create Sale</h2>
          {saleCreated && (
            <Alert color="success">Sale created successfully!</Alert>
          )}
          {error && <Alert color="danger">Failed to create sale.</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="productId">Product ID</Label>
              <Input
                type="text"
                name="productId"
                id="productId"
                placeholder="Enter product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Quantity</Label>
              <Input
                type="number"
                name="quantity"
                id="quantity"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? "Creating..." : "Create Sale"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateSale;
