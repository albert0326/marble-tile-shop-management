// src/pages/Products.js

import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { Table, Spinner, Alert } from "reactstrap";

const Products = () => {
  const { callApi, loading, error } = useApi();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await callApi("GET", "/api/products");
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, [callApi]);

  if (loading) return <Spinner color="primary" />;
  if (error) return <Alert color="danger">Failed to load products.</Alert>;

  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Stock</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.stock}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Products;
