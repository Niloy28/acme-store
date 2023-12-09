import { ReactElement, memo } from "react";
import {
	CartReducerAction,
	CartReducerActionType,
} from "../context/CartProvider";
import { ProductType } from "../types/ProductType";

type PropTypes = {
	product: ProductType;
	dispatch: React.Dispatch<CartReducerAction>;
	inCart: boolean;
	CART_REDUCER_ACTIONS: CartReducerActionType;
};

const Product = ({
	product,
	dispatch,
	inCart,
	CART_REDUCER_ACTIONS,
}: PropTypes): ReactElement => {
	const img = new URL(product.thumbnail, import.meta.url).href;

	const onAddToCart = () =>
		dispatch({
			type: CART_REDUCER_ACTIONS.ADD,
			payload: { ...product, quantity: 1 },
		});

	const itemInCart = inCart ? " Item in Cart ✅" : null;

	return (
		<article className="product">
			<h3>{product.title}</h3>
			<img src={img} alt={product.id} className="product_img" />
			<p>
				{Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(product.price)}
				{itemInCart}
			</p>
			<button onClick={onAddToCart}>Add to Cart</button>
		</article>
	);
};

const areProductsEqual = (
	{ product: prevProduct, inCart: prevInCart }: PropTypes,
	{ product: nextProduct, inCart: nextInCart }: PropTypes
) => {
	return (
		Object.keys(prevProduct).every((key) => {
			prevProduct[key as keyof ProductType] ===
				nextProduct[key as keyof ProductType];
		}) && prevInCart === nextInCart
	);
};

const MemoizedProduct = memo(Product, areProductsEqual);

export default MemoizedProduct;
