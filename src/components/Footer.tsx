import React from "react";

import useCart from "../hooks/useCart";

type PropTypes = {
	viewCart: boolean;
};

const Footer = ({ viewCart }: PropTypes) => {
	const { totalNumber, totalPrice } = useCart();
	const year = new Date().getFullYear();

	const pageContent = viewCart ? (
		<p>Shopping Cart &copy; {year}</p>
	) : (
		<>
			<p>Total Items: {totalNumber}</p>
			<p>Total Price: {totalPrice}</p>
			<p>Shopping Cart &copy; {year}</p>
		</>
	);

	return <footer className="footer">{pageContent}</footer>;
};

export default Footer;
