import { useState } from "react";
import type { NewProduct } from "@/types/products"; 
import { postProduct } from "@/services/productServices"; 

export const usePostProducts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addProduct = async(product: NewProduct) => {
    try {
      setLoading(true);
      setError(null);

      const data = await postProduct(product);
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Foydalanuvchi qo'shishda xatolik!";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { addProduct, loading, error }
}