const express = require("express");
const {
	getAllItems,
	getSelectedItems,
	addItems,
	updateItems,
	updateItemsImage,
	deleteItems,
	searchItems,
} = require("../controller/items.controller");
const itemImages = require("../middleware/itemImages.middleware");
const jwtAuth = require("../middleware/auth.middleware");

const itemsRouter = express.Router();

itemsRouter
	.get("/items", getAllItems)
	.get("/items/:id_barang", getSelectedItems)
	.get("/search/items", searchItems)
	.post("/additems", jwtAuth, itemImages, addItems)
	.put("/updateitems/:id_barang", jwtAuth, itemImages, updateItems)
	.put("/updateimages/:id_barang", jwtAuth, itemImages, updateItemsImage)
	.delete("/deleteitems/:id_barang", deleteItems);

module.exports = itemsRouter;
