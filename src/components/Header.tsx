import Nav from "./Nav";

import useCart from "../hooks/useCart";

type PropTypes = {
	viewCart: boolean;
	setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropTypes) => {
	const { totalNumber, totalPrice } = useCart();

	return (
		<header className="header">
			<div className="header__title-bar">
				<h1>Acme Co.</h1>

				<div className="header__title-price-box">
					<p>Total Item: {totalNumber}</p>
					<p>Total Price: {totalPrice}</p>
				</div>

				<Nav viewCart={viewCart} setViewCart={setViewCart} />
			</div>
		</header>
	);
};

export default Header;
