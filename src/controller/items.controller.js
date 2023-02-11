const itemsModel = require("../model/items.model");
const { success, failed } = require("../helper/file.response");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../helper/cloudinary");

const itemsController = {
	getAllItems: (req, res) => {
		const query = req.query;
		const page = parseInt(query.page) || 1;
		const limit = query.limit || 3;
		const data = {
			sortOrder: query.sortOrder || "ASC",
			limit: limit,
			page: page,
			offset: (page - 1) * limit,
		};

		itemsModel
			.getAllItem(data)
			.then((response) => {
				response.rows.map(
					(items) => delete items.password && delete items.id_user
				);
				success(res, response.rows, "Success", "Get all items success");
			})
			.catch((error) => {
				failed(res, error.message, "Failed", "Get all items failed");
			});
	},

	getSelectedItems: (req, res) => {
		const { id_barang } = req.params;

		itemsModel
			.getSelectedItems(id_barang)
			.then((response) => {
				response.rows.map(
					(items) => delete items.password && delete items.id_user
				);
				success(res, response.rows, "Success", "Get item succes");
			})
			.catch((error) => {
				failed(res, error.message, "Failed", "Get item failed");
			});
	},

	searchItems: (req, res) => {
		const query = req.query;
		const page = parseInt(query.page) || 1;
		const limit = query.limit || 5;
		const data = {
			nama_barang: query.namabarang,
			sortOrder: query.sortOrder || "ASC",
			limit: limit,
			page: page,
			offset: (page - 1) * limit,
		};

		itemsModel
			.searchItems(data)
			.then((response) => {
				response.rows.map(
					(items) => delete items.password && delete items.id_user
				);
				success(res, response.rows, "Success", "Get item succes");
			})
			.catch((error) => {
				failed(res, error.message, "Failed", "Get item failed");
			});
	},

	addItems: async (req, res) => {
		const id_barang = uuidv4();
		const body = req.body;
		const { id_user: iduser } = req.decoded;
		const fotoBarang = await cloudinary.uploader.upload(req.file.path);
		const data = {
			id_barang,
			iduser: iduser,
			nama_barang: body.nama_barang,
			foto_barang: fotoBarang.secure_url,
			harga_barang: body.harga_barang,
			harga_jual: body.harga_jual,
			stok: body.stok,
		};

		itemsModel
			.addItems(data)
			.then((response) => {
				success(res, response.rows, "Success", "Add item success");
			})
			.catch((error) => {
				failed(res, error.message, "Failed", "Add item failed");
			});
	},

	updateItems: async (req, res) => {
		const body = req.body;
		const { id_barang } = req.params;
		const fotoBarang = await cloudinary.uploader.upload(req.file.path);
		const data = {
			id_barang,
			nama_barang: body.nama_barang,
			foto_barang: req.file ? fotoBarang.secure_url : null,
			harga_barang: body.harga_barang,
			harga_jual: body.harga_jual,
			stok: body.stok,
		};

		itemsModel
			.updateItems(data)
			.then((response) => {
				success(res, response.rows, "Success", "Update item success");
			})
			.catch((error) => {
				failed(res, error.message, "Failed", "Update item failed");
			});
	},

	updateItemsImage: async (req, res) => {
		const { id_barang } = req.params;
		const fotoBarang = await cloudinary.uploader.upload(req.file.path);
		const data = {
			foto_barang: req.file ? fotoBarang.secure_url : null,
			id_barang,
		};
		itemsModel
			.updateItemsImage(data)
			.then((response) => {
				success(res, response.rows, "Success", "Update item success");
			})
			.catch((error) => {
				failed(res, error.message, "Failed", "Update item failed");
			});
	},

	deleteItems: (req, res) => {
		const { id_barang } = req.params;

		itemsModel
			.itemsDelete(id_barang)
			.then((response) => {
				success(res, response.rows, "Success", "Delete item success");
			})
			.catch((error) => {
				failed(res, error.message, "Failed", "Delete item failed");
			});
	},
};

module.exports = itemsController;
