import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import useApi from "../hooks/useApi";

const CreateAProduct = ({ fetchProducts }) => {
  const initialValue = {
    name: "",
    type: "",
    price: 0,
    stock: 0,
    category: "",
    description: "",
    color: "",
    size: "",
  };
  const [productDetails, setProductDetails] = useState({ ...initialValue });
  const [saveProductLoading, setSaveProductLoading] = useState(false);
  const [saveProductError, setSaveProductError] = useState();
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const { callApi } = useApi();

  const fetchCategories = useCallback(async () => {
    setCategoriesLoading(true);
    try {
      const data = await callApi("GET", "/api/categories");
      setCategories(data ?? []);
    } catch (err) {
      console.error("Failed to login:", err);
    }
    setCategoriesLoading(false);
  }, [callApi]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveProductLoading(true);
    try {
      await callApi("POST", "/api/products", productDetails);
      setProductDetails({ ...initialValue });
      fetchProducts();
    } catch (err) {
      setSaveProductError(err);
      console.error("Failed to login:", err);
    }
    setSaveProductLoading(false);
  };
  return (
    <Container>
      <h3>Create a Product</h3>
      {saveProductError && <Alert color="danger">{saveProductError}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter product name"
            value={productDetails.name}
            onChange={handleFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="type">Type</Label>
          <Input
            type="text"
            name="type"
            id="type"
            placeholder="Enter product type"
            value={productDetails.type}
            onChange={handleFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input
            type="number"
            name="price"
            id="price"
            placeholder="Enter product price"
            value={productDetails.price}
            onChange={handleFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="stock">Stock</Label>
          <Input
            type="number"
            name="stock"
            id="stock"
            placeholder="Enter product stock"
            value={productDetails.stock}
            onChange={handleFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="category">Category</Label>
          <Input
            type="select"
            name="category"
            id="category"
            placeholder="Enter product category"
            value={productDetails.category}
            onChange={handleFormChange}
            disabled={categoriesLoading}
          >
            <option></option>
            {categories.map((category, i) => {
              return (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              );
            })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            placeholder="Enter description"
            value={productDetails.description}
            onChange={handleFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="color">Color</Label>
          <Input
            type="text"
            name="color"
            id="color"
            placeholder="Enter product color"
            value={productDetails.color}
            onChange={handleFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="size">Size</Label>
          <Input
            type="text"
            name="size"
            id="size"
            placeholder="Enter product size"
            value={productDetails.size}
            onChange={handleFormChange}
          />
        </FormGroup>

        <Button
          type="submit"
          color="primary"
          className="w-100"
          disabled={saveProductLoading}
          size="sm"
        >
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default CreateAProduct;
