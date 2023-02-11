const db = require("../config/db");

const itemsModel = {
	getAllItem: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM barang JOIN users ON users.id_user = barang.iduser ORDER BY nama_barang ${data.sortOrder} LIMIT ${data.limit} OFFSET ${data.offset}`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	getSelectedItems: (id_barang) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM barang JOIN users ON users.id_user = barang.iduser WHERE id_barang = '${id_barang}'`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	searchItems: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM barang JOIN users ON users.id_user = barang.iduser WHERE nama_barang ILIKE '%${data.nama_barang}%' ORDER BY nama_barang ${data.sortOrder} LIMIT ${data.limit} OFFSET ${data.offset}`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	addItems: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`INSERT INTO barang 
				(id_barang, iduser, nama_barang, foto_barang, harga_barang, harga_jual, stok)
				VALUES ($1, $2, $3, $4, $5, $6, $7)`,
				[
					data.id_barang,
					data.iduser,
					data.nama_barang,
					data.foto_barang,
					data.harga_barang,
					data.harga_jual,
					data.stok,
				]
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	updateItems: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`UPDATE barang SET
				nama_barang = COALESCE ($1, nama_barang),
				foto_barang = COALESCE ($2, foto_barang),
				harga_barang = COALESCE ($3, harga_barang),
				harga_jual = COALESCE ($4, harga_jual),
				stok = COALESCE ($5, stok)
				WHERE id_barang = $6
				`,
				[
					data.nama_barang,
					data.foto_barang,
					data.harga_barang,
					data.harga_jual,
					data.stok,
					data.id_barang,
				]
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	updateItemsImage: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`UPDATE barang SET foto_barang = '${data.foto_barang}' WHERE id_barang = '${data.id_barang}'`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	itemsDelete: (id_barang) => {
		return new Promise((resolve, reject) => {
			db.query(`DELETE FROM barang WHERE id_barang = '${id_barang}'`)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
};

module.exports = itemsModel;
