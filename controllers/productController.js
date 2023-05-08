import Product from '../models/Product.js';

export async function getAll(req, res, next) {
	try {
		const products = await Product.find({});
		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
}

export async function getById(req, res, next) {
	const id = req.params.id;
	if (!id) return res.status(400).json({ message: 'Id is required.' });

	try {
		const product = await Product.findById(id);
		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
}

export async function create(req, res, next) {
	try {
		const product = await Product.create(req.body);
		res.status(201).json(product);
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	const id = req.params.id;
	if (!id) return res.status(400).json({ message: 'Id is required.' });

	try {
		const product = await Product.findById({ _id: id });
		if (!product)
			return res.status(404).json({ message: 'Product not found.' });

		const updateProduct = {
			name: req.body.name || product.name,
			price: req.body.price || product.price,
		};

		await product.updateOne(updateProduct);

		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	const id = req.params.id;
	if (!id) return res.status(400).json({ message: 'Id is required.' });

	try {
		await Product.findOneAndDelete({ _id: id });
		res.status(200).json({ message: 'Product deleted.' });
	} catch (error) {
		next(error);
	}
}
