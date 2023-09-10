//import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../api/productsApi";
const ProductForm = () => {
  const queryClient = useQueryClient()
  
  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      console.log("Product added successfully");
      queryClient.invalidateQueries("products")
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const product = Object.fromEntries(data);
    addProductMutation.mutate({
      ...product,
      inStock: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' name='name' />
      <label htmlFor='description'>description</label>
      <input type='text' name='description' id='description' />
      <label htmlFor='price'>Price</label>
      <input type='number' name='price' id='price' />
      <button>Add Product</button>
    </form>
  );
};

export default ProductForm;
