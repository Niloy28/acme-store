import { CartItemType } from "../types/CartItemType";
import { CartReducerAction } from "../context/CartProvider";
import { CartReducerActionType } from "../context/CartProvider";
import useProducts from "../hooks/useProducts";
import { convertPriceToIntl } from "../utils/StringHelper";

type PropTypes = {
	cartItem: CartItemType;
	dispatch: React.Dispatch<CartReducerAction>;
	REDUCER_ACTIONS: CartReducerActionType;
};

const CartItem = ({ cartItem, dispatch, REDUCER_ACTIONS }: PropTypes) => {
	const { products } = useProducts();

	// find product corresponding to cart item ID
	const product = products.find((product) => product.id === cartItem.id);
	// grab product image
	const img = new URL(product!.thumbnail, import.meta.url).href;
	const cartItemTotal = cartItem.quantity * cartItem.price;
	const maxQuantity = 20 > cartItem.quantity ? 20 : cartItem.quantity;
	// generate option values for purchase count dropdown
	const optionValues = [...Array(maxQuantity).keys()].map((i) => i + 1);
	// create list of options
	const options = optionValues.map((optionValue) => {
		return (
			<option key={`opt${optionValue}`} value={optionValue}>
				{optionValue}
			</option>
		);
	});

	const onChangeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newQuantity = Number(event.target.value);
		dispatch({
			type: REDUCER_ACTIONS.QUANTITY,
			payload: {
				...cartItem,
				quantity: newQuantity,
			},
		});
	};

	const onClearItem = () => {
		dispatch({
			type: REDUCER_ACTIONS.CLEAR,
			payload: cartItem,
		});
	};

	return (
		<li className="cart__item">
			<img src={img} alt={cartItem.title} className="cart__img" />

			<div aria-label={cartItem.title}>{cartItem.title}</div>
			<div aria-label="Price per Item">
				{convertPriceToIntl(cartItem.price)}
			</div>

			<label htmlFor="itemQty" className="offscreen">
				Item Quantity
			</label>
			<select
				id="itemQty"
				name="itemQty"
				className="cart__select"
				value={cartItem.quantity}
				aria-label="Item quantity"
				onChange={onChangeQuantity}
			>
				{options}
			</select>

			<div className="cart__item-subtotal" aria-label="Cart item subtotal">
				{convertPriceToIntl(cartItemTotal)}
			</div>

			<button
				className="cart__button"
				aria-label="Remove cart item"
				title="Remove Item From Cart"
				onClick={onClearItem}
			>
				❌
			</button>
		</li>
	);
};

export default CartItem;
