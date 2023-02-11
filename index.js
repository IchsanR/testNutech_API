const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const { PORT } = require("./src/helper/env");

const app = express();

// router
const userRouter = require("./src/router/user.routes");
const itemsRouter = require("./src/router/items.routes");

app.use(express.static("public"));
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(bodyParser.json());
app.use(userRouter);
app.use(itemsRouter);

// server
app.listen(PORT, () => {
	console.log("Server running on " + PORT);
});
