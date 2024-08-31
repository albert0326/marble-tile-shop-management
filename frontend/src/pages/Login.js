// src/pages/Login.js

import React, { useState } from "react";
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
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../axiosConfig"; // Import setAuthToken
import useApi from "../hooks/useApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { callApi, loading, error } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await callApi("POST", "/api/users/login", {
        email,
        password,
      });

      // Save token to local storage or state management
      localStorage.setItem("authToken", response?.token);

      // Set the token globally for axios
      setAuthToken(response?.token);
      login();
      navigate("/products");
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Login</h2>
          {error && <Alert color="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" color="primary" disabled={loading}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
