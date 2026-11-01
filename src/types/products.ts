export interface Products {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export type NewProduct = Omit<Products , "id">;
export type UpdateProduct = Partial<Omit<Products, "id">> & {id: number};
export type DeleteProduct = Pick<Products, "id">