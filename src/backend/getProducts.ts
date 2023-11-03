import { ProductType } from "../types/ProductType";

/**
 * JSON data fetched from the backend
 *
 * Each array element is of type {@link ProductType}
 */
export type ProductsFetchType = {
	products: ProductType[];
};

/**
 * Returns a list of {@link ProductType} after fetching it from the backend
 * @returns List of {@link ProductType} fetched from the backend
 */
export const getProducts = async (): Promise<ProductType[]> => {
	const response = await fetch("https://dummyjson.com/products");

	const productsJson: ProductsFetchType = await response.json();

	return productsJson.products;
};
