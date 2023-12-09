import { ReactNode, createContext, useMemo, useReducer } from "react";
import { CartItemType } from "../types/CartItemType";
import { convertPriceToIntl } from "../utils/StringHelper";

type CartStateType = {
	cart: CartItemType[];
};

const initCartState: CartStateType = { cart: [] };

// Cart reducer dispatch action types
const CART_REDUCER_ACTION_TYPE = {
	ADD: "ADD",
	QUANTITY: "QUANTITY",
	REMOVE: "REMOVE",
	CLEAR: "CLEAR",
	CLEAR_ALL: "CLEAR_ALL",
	SUBMIT: "SUBMIT",
};

export type CartReducerActionType = typeof CART_REDUCER_ACTION_TYPE;

export type CartReducerAction = {
	type: string;
	payload?: CartItemType;
};

// Define cart reducer function
const cartReducer = (
	state: CartStateType,
	action: CartReducerAction
): CartStateType => {
	switch (action.type) {
		case CART_REDUCER_ACTION_TYPE.ADD: {
			if (!action.payload) {
				throw new Error(
					"Cart reducer action payload is undefined in ADD action"
				);
			}

			const { id, title, price } = action.payload;
			const filteredCart = state.cart.filter((item) => item.id !== id);
			const existingItem = state.cart.find((item) => item.id === id);
			const itemQuantity = existingItem ? existingItem.quantity + 1 : 1;

			return {
				...state,
				cart: [...filteredCart, { id, title, price, quantity: itemQuantity }],
			};
		}
		case CART_REDUCER_ACTION_TYPE.QUANTITY: {
			if (!action.payload) {
				throw new Error(
					"Cart reducer action payload is undefined in QUANTITY action"
				);
			}

			const { id, quantity } = action.payload;

			const existingItem = state.cart.find((item) => item.id === id);

			if (!existingItem) {
				throw new Error("Item does not exist in cart in QUANTITY action");
			}

			const filteredCart = state.cart.filter((item) => item.id !== id);
			const updatedItem = { ...existingItem, quantity };

			return {
				...state,
				cart: [...filteredCart, updatedItem],
			};
		}
		case CART_REDUCER_ACTION_TYPE.REMOVE: {
			if (!action.payload) {
				throw new Error(
					"Cart reducer action payload is undefined in REMOVE action"
				);
			}

			const { id, quantity } = action.payload;
			const filteredCart = state.cart.filter((item) => item.id !== id);
			const existingItem = state.cart.find((item) => item.id === id);

			if (!existingItem) {
				throw new Error("Item to remove does not exist in cart");
			}

			return {
				...state,
				cart: [...filteredCart, { ...existingItem, quantity: quantity - 1 }],
			};
		}
		case CART_REDUCER_ACTION_TYPE.CLEAR: {
			if (!action.payload) {
				throw new Error(
					"Cart reducer action payload is undefined in CLEAR action"
				);
			}

			const { id } = action.payload;
			const filteredCart = state.cart.filter((item) => item.id !== id);

			return {
				...state,
				cart: filteredCart,
			};
		}
		case CART_REDUCER_ACTION_TYPE.CLEAR_ALL: {
			return {
				...state,
				cart: [],
			};
		}
		case CART_REDUCER_ACTION_TYPE.SUBMIT: {
			return {
				...state,
				cart: [],
			};
		}
		default: {
			throw new Error("Undefined action type.");
		}
	}
};

// Define the hook to generate a context state from a Cart State
const useCartContext = (initState: CartStateType) => {
	const [cartState, dispatch] = useReducer(cartReducer, initState);

	const CART_REDUCER_ACTIONS = useMemo(() => {
		return CART_REDUCER_ACTION_TYPE;
	}, []);

	// Display total price in USD
	const totalPrice = convertPriceToIntl(
		cartState.cart.reduce((previousValue, cartItem) => {
			return previousValue + cartItem.price * cartItem.quantity;
		}, 0)
	);

	const totalNumber = cartState.cart.reduce((previousValue, cartItem) => {
		return previousValue + cartItem.quantity;
	}, 0);

	const cart = cartState.cart.sort((a, b) => {
		return Number(a.id) - Number(b.id);
	});

	return { dispatch, CART_REDUCER_ACTIONS, totalNumber, totalPrice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
	dispatch: () => {},
	CART_REDUCER_ACTIONS: CART_REDUCER_ACTION_TYPE,
	totalNumber: 0,
	totalPrice: "",
	cart: [],
};

export const CartContext =
	createContext<UseCartContextType>(initCartContextState);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	return (
		<CartContext.Provider value={useCartContext(initCartState)}>
			{children}
		</CartContext.Provider>
	);
};
