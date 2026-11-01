import { useEffect, useState } from "react";
import type { Products } from "@/types/products"; 
import { getAllProducts } from "@/services/productServices"; 

export const useGetProducts = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAllProducts();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Noma'lum xatolik yuz berdi !");
        }
      } finally {
        setLoading(false);
      }
    }

    void getAll();
  }, []);

  return { products, setProducts, loading, error }
}