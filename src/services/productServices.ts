import { Products , NewProduct, DeleteProduct, UpdateProduct } from "@/types/products";

export const getAllProducts = async(): Promise<Products[]> => {
    const response = await fetch(`https://fakestoreapi.com/products`);

    if(!response.ok) {
        throw new Error("Products larni olishda xatolik !");
    }

    return response.json();
}

export const postProduct = async(Products: NewProduct): Promise<Products> => {
    const response = await fetch(`https://fakestoreapi.com/products` , {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(Products),
    });

    if(!response.ok) {
        throw new Error("Products larni qo'shishda xatolik !");
    }

    return response.json();
}

export const updateProduct = async(updateData: UpdateProduct): Promise<Products> => {
    const response = await fetch(`https://fakestoreapi.com/products/${updateData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify({
            title: updateData?.title,
            price: updateData?.price,
            description: updateData?.description,
            category: updateData?.category,
            image: updateData?.image
        }),
    });

    if(!response.ok) {
        throw new Error("Products larni yangilashda xatolik !");
    }

    return response.json();
}

export const deleteProduct = async(Products: DeleteProduct): Promise<void> => {
    const response = await fetch(`https://fakestoreapi.com/products/${Products.id}`, {
        method: "DELETE",
    });

    if(!response.ok) {
        throw new Error("Products larni o'chirishda xatolik !");
    }
}