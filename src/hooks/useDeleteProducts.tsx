import { useState } from "react";
import { DeleteProduct } from "@/types/products";
import { deleteProduct } from "@/services/productServices";

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProductFunction = async (user: DeleteProduct) => {
    try {
      setLoading(true);
      setError(null);

      await deleteProduct(user);
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Foydalanuvchini o'chirishda xatolik !";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, deleteProductFunction }
}