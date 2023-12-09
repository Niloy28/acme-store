import useCart from "../hooks/useCart";
import { useState } from "react";
import CartItem from "./CartItem";

const Cart = () => {
	const [confirm, setConfirm] = useState(false);
	const { dispatch, totalNumber, totalPrice, CART_REDUCER_ACTIONS, cart } =
		useCart();

	const onConfirmOrder = () => {
		dispatch({
			type: CART_REDUCER_ACTIONS.SUBMIT,
		});
		setConfirm(true);
	};

	const pageContent = confirm ? (
		<h2>Tahnk you for your order.</h2>
	) : (
		<>
			<h2 className="offscreen">Cart</h2>
			<ul className="cart">
				{cart.map((cartItem) => {
					return (
						<CartItem
							key={cartItem.id}
							cartItem={cartItem}
							dispatch={dispatch}
							REDUCER_ACTIONS={CART_REDUCER_ACTIONS}
						/>
					);
				})}
			</ul>
			<div className="cart_totals">
				<p>Total Items: {totalNumber}</p>
				<p>Total Price: {totalPrice}</p>
			</div>
			<button
				disabled={!totalNumber}
				onClick={onConfirmOrder}
				className="cart__submit"
			>
				Place Order
			</button>
		</>
	);

	return <main className="main main--cart">{pageContent}</main>;
};

export default Cart;
