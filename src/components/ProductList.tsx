import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import { ReactElement } from "react";
import Product from "./Product";

const ProductList = () => {
	const { dispatch, CART_REDUCER_ACTIONS, cart } = useCart();
	const { products } = useProducts();

	let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;

	if (products?.length > 0) {
		pageContent = products.map((product) => {
			const inCart = cart.some((item) => item.id === product.id);

			return (
				<Product
					key={product.id}
					product={product}
					dispatch={dispatch}
					inCart={inCart}
					CART_REDUCER_ACTIONS={CART_REDUCER_ACTIONS}
				/>
			);
		});
	}
	return <main className="main main--products">{pageContent}</main>;
};

export default ProductList;
