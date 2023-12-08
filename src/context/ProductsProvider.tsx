import { useState, createContext } from "react";
import { ProductsFetchType, getProducts } from "../backend/getProducts";
import { ProductType } from "../types/ProductType";

// fetch products from the backend
const initProductsState: ProductType[] = await getProducts();

// define the context state data type (in this scenario equal to the fetched data type)
export type UseProductsContextType = ProductsFetchType;

const initContextState: UseProductsContextType = {
	products: initProductsState,
};

export const ProductsContext =
	createContext<UseProductsContextType>(initContextState);

export const ProductsProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [products] = useState(initProductsState);

	return (
		<ProductsContext.Provider value={{ products }}>
			{children}
		</ProductsContext.Provider>
	);
};

export default ProductsContext;
