import { ProductProps } from "@/src/utils/data/products";
import { productCartProps } from "../cart-store";

export function Add(products: productCartProps[], newProduct: ProductProps) {

    const existingProduct = products.find(({ id }) => newProduct.id === id);

    if (existingProduct) {
        return products.map((product) =>
        product.id === existingProduct.id
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        );
    }

    return [...products, { ...newProduct, quantity: 1 }];

}