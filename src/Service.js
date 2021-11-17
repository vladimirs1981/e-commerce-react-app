export const OrdersService = {
	getPreviousOrders: (orders) => {
		return orders.filter((ord) => ord.isPaymentCompleted === true);
	},
	getCart: (orders) => {
		return orders.filter((ord) => ord.isPaymentCompleted === false);
	},
};

export const ProductsService = {
	getProductsByProductId: (products, productId) => {
		return products.find((prod) => prod.id === productId);
	},
};

export const BrandsService = {
	getBrandByBrandId: (brands, brandId) => {
		return brands.find((brand) => brand.id === brandId);
	},
};

export const CategoriesService = {
	getCategoryByCategoryId: (categories, categoryId) => {
		return categories.find((category) => category.id === categoryId);
	},
};
