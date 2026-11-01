import { useState } from "react";
import type { UpdateProduct } from "@/types/products"; 
import { updateProduct } from "@/services/productServices"; 

export const useUpdateProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateProductFunction = async(update: UpdateProduct) => {
    try {
      setLoading(true);
      setError(null);

      const data = await updateProduct(update);
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Foydalanuvchini yangilashda xatolik !";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, updateProductFunction }
}