import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "./../api/productsApi";
const Products = () => {
  const {
    isLoading,
    error,
    data: products,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id),
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Product deleted");
      queryClient.invalidateQueries("products");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      console.log("Product Updated");
      queryClient.invalidateQueries("products");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return products.map((product) => (
    <div key={product.id}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button
        onClick={() => {
          deleteMutation.mutate(product.id);
        }}
      >
        Delete
      </button>
      <input
        type='checkbox'
        checked={product.inStock}
        onChange={(e) =>
          updateMutation.mutate({
            ...product,
            inStock: e.target.checked,
          })
        }
      />
      <label htmlFor=''>In Stock</label>
    </div>
  ));
};

export default Products;
