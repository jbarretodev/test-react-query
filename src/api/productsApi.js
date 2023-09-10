import axios from "axios";

const productApi = axios.create({
  baseURL: "http://localhost:3000",
});

export const getProducts = async () => {
  const res = await productApi.get("/products");
  return res.data;
};

export const addProduct = async (product) => { 
  const res = await productApi.post("/products", product);
  return res.data;
}

export const deleteProduct = async (id) => {
  const res = await productApi.delete(`/products/${id}`);
  return res.data;
};

export const updateProduct = async (product) => {
  const res = await productApi.put(`/products/${product.id}`, product);
  return res.data;
};