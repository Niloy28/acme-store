const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

export const convertPriceToIntl = (price: number) => {
	return formatter.format(price);
};
