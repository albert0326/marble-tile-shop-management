// src/pages/Products.js

import React, { useCallback, useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { Table, Spinner, Alert, Row, Col, Input } from "reactstrap";
import CreateAProduct from "../components/CreateAProduct";

const Products = () => {
  const { callApi, loading, error } = useApi();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKey, setSearchKey] = useState();

  const fetchProducts = useCallback(async () => {
    try {
      const data = await callApi("GET", `/api/products${searchQuery}`);
      setProducts(data?.products);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  }, [callApi, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const queries = [];
    if (searchKey && searchKey?.trim() !== "") {
      queries.push(`search=${searchKey?.trim()}`);
    }
    if (queries.length > 0) {
      setSearchQuery("?" + queries.join("&"));
    } else {
      setSearchQuery("");
    }
  }, [searchKey]);

  return (
    <>
      <Row className="w-100">
        <Col md={9}>
          <Input
            type="text"
            placeholder="Search by name"
            className="mb-2"
            style={{
              width: "300px",
              float: "right",
            }}
            value={searchKey ?? ""}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          {loading ? (
            <Spinner color="primary" />
          ) : !loading && error ? (
            <Alert color="danger">Failed to load products.</Alert>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Size</th>
                  <th>Stock</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.type}</td>
                    <td>{product?.category?.name}</td>
                    <td>{product?.size}</td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
        <Col>
          <CreateAProduct fetchProducts={fetchProducts} />
        </Col>
      </Row>
    </>
  );
};

export default Products;
