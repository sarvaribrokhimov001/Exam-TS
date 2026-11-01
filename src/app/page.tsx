"use client"

import { useState } from "react";
import { useGetProducts } from "@/hooks/useGetProducts"; 
import { usePostProducts } from "@/hooks/usePostProducts"; 
import { useUpdateProduct } from "@/hooks/useUpdateProducts"; 
import { useDeleteProduct } from "@/hooks/useDeleteProducts"; 
import type { NewProduct, UpdateProduct } from "@/types/products";

const emptyForm: NewProduct = {
  title: "",
  price: 0,
  description: "",
  category: "",
  image: ""
}

const HomePage = () => {
  const { products, setProducts, loading, error } = useGetProducts();
  const { addProduct, loading: addLoading, error: addError } = usePostProducts();
  const { updateProductFunction, loading: updateLoading, error: updateError } = useUpdateProduct();
  const { deleteProductFunction, loading: deleteLoading, error: deleteError } = useDeleteProduct();
  const [formData, setFormData] = useState<NewProduct>(emptyForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [editFormData, setEditFormData] = useState<UpdateProduct>({
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: ""
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSuccessMessage(null);

    const title = formData.title.trim();
    const price = formData.price;
    const description = formData.description.trim();
    const category = formData.category.trim();
    const image = formData.image.trim();

    const result = await addProduct({ 
      title, 
      price, 
      description, 
      category, 
      image 
    });

    if (result) {
      const newItem = Math.max(0, ...products.map((product) => product.id)) + 1;

      setProducts((previousProducts) => [
        ...previousProducts, {
          ...result,
          id: newItem,
        },
      ]);

      setFormData({ ...emptyForm });
      setSuccessMessage("Foydalanuvchi muvaffaqiyatli qo'shildi !");
    }
  }

  const handleEdit = (id: number) => {
    const selectedProduct = products.find((product) => product.id === id);
    if (!selectedProduct) return;

    setEditId(selectedProduct?.id);

    setEditFormData({
      id: selectedProduct.id,
      title: selectedProduct?.title,
      price: selectedProduct?.price,
      description: selectedProduct?.description,
      category: selectedProduct?.category,
      image: selectedProduct?.image
    });

    setSuccessMessage(null);
    setEditModal(true);
  }

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editId === null) return;
    setSuccessMessage(null);

    const result = await updateProductFunction({
      id: editId,
      title: editFormData.title,
      price: editFormData.price,
      description: editFormData.description,
      category: editFormData.category,
      image: editFormData.image,
    });

    if (result !== null) {
      setProducts((previousProducts) => previousProducts.map((product) => product.id === editId ? {
        ...product,
        ...result,
      }
        : product
      )
    );

      setEditModal(false);
      setEditId(null);
      setSuccessMessage("Foydalanuvchi muvaffaqiyatli yangilandi !");
    }
  }

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Ushbu product ni o'chirishni xohlaysizmi ?");
     if (!confirmed) return;
     setSuccessMessage(null);

    const result = await deleteProductFunction({ id });

    if (result) {
      setProducts((previousProducts) => previousProducts.filter((product) => product.id !== id));

      if (editId === id) {
        setEditModal(false);
        setEditId(null);
      }
      setSuccessMessage("Product muvaffaqiyatli o'chirildi !");
    }
  }

  const closeEditModal = () => {
    setEditModal(false);
    setEditId(null);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-lg text-gray-300"> Loading.... </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black px-4 text-white">
        <p className="text-center text-red-400"> {error} </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center">
          <h1 className="text-2xl font-bold"> Products </h1>
        </header>

        <section className="mb-7 rounded-xl border border-white/10 bg-zinc-950 p-4">
          <h2 className="mb-6 text-xl font-bold"> NewProduct </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="mb-2 block text-sm text-gray-300"> Title </label>
              <input className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-white/50" type="text" placeholder="title kiriting" required value={formData.title} onChange={(e) => 
                setFormData((previous) => ({
                  ...previous,
                  title: e.target.value,
                }))} />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300"> Price </label>
              <input required type="number" placeholder="price" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-white/50" value={formData.price} onChange={(e) =>
                setFormData((previous) => ({
                  ...previous,
                  price: Number(e.target.value),
                }))} />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300"> Description </label>
              <input className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-white/50" type="text" placeholder="description kiriting" required value={formData.description} onChange={(e) => 
                setFormData((previous) => ({
                  ...previous,
                  description: e.target.value,
                }))} />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300"> Category </label>
              <input className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-white/50" type="text" placeholder="category kiriting" required value={formData.category} onChange={(e) => 
                setFormData((previous) => ({
                  ...previous,
                  category: e.target.value,
                }))} />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300"> Image </label>
              <input className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600" type="url" placeholder="image url kiriting" required value={formData.image} onChange={(e) => 
                setFormData((previous) => ({
                  ...previous,
                  image: e.target.value,
                }))} />
            </div>

            <button type="submit" disabled={addLoading} className="w-full rounded-xl bg-white px-5 py-3 font-bold text-black">
              {addLoading ? "Adding...." : " +Add"}
            </button>
          </form>
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold"> All Products </h2>
          </div>

          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/20 px-5 py-12 text-center text-gray-500"> Hozircha products mavjud emas ! </div>
          ) : (
            <div className="space-y-2">
              {products.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-950 p-4">
                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-3">
                      <h3 className="font-bold text-white"> {item.title} </h3>
                    </div>

                    <p className="mt-2 pl-12 text-xs text-gray-600"> ID: {item.id} </p>
                    <p className="pl-12 text-sm text-gray-400"> {item.price} </p>
                    <p className="pl-12 text-sm text-gray-400"> {item.description} </p>
                    <p className="pl-12 text-sm text-gray-400"> {item.category} </p>
                    <img src={item.image} alt={item.title} className="mt-3 h-24 w-24 rounded-lg object-contain bg-white p-2" />
                  </div>

                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleEdit(item.id)} disabled={updateLoading || deleteLoading} className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white">
                      Edit
                    </button>

                    <button type="button" onClick={() => void handleDelete(item.id)} disabled={deleteLoading || updateLoading} className="rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-600">
                      {deleteLoading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4">
          <section className="my-auto w-full max-w-md rounded-2xl border border-white/15 bg-black">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold"> EditProduct </h2>
              </div>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-gray-300"> Title </label>
                <input required type="text" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none" value={editFormData.title} onChange={(e) =>
                  setEditFormData((previous) => ({
                    ...previous,
                    title: e.target.value,
                  }))} />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300"> Price </label>
                <input type="number" required className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none" value={editFormData.price ?? ""} onChange={(e) =>
                  setEditFormData((previous) => ({
                    ...previous,
                    price: Number(e.target.value),
                  }))} />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300"> Description </label>
                <input required type="text" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none" value={editFormData.description} onChange={(e) =>
                  setEditFormData((previous) => ({
                    ...previous,
                    description: e.target.value,
                  }))} />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300"> Category </label>
                <input required type="text" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none" value={editFormData.category} onChange={(e) =>
                  setEditFormData((previous) => ({
                    ...previous,
                    category: e.target.value,
                  }))} />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300"> Image </label>
                <input required type="url" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-white/50" value={editFormData.image} onChange={(e) =>
                  setEditFormData((previous) => ({
                    ...previous,
                    image: e.target.value,
                  }))} />
              </div>

              <div className="flex flex-col gap-3 pt-3">
                <button onClick={closeEditModal} disabled={updateLoading} className="flex-1 rounded-xl border border-white/20 px-4 py-3 text-sm font-medium text-white">
                  Cancel
                </button>

                <button type="submit" disabled={updateLoading} className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black">
                  {updateLoading ? "Updating...." : "Update"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
export default HomePage;