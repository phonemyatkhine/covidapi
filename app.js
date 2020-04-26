const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("./middlewares/cors");
const adminRoute = require("./routes/admin.route");
const GenerateRoute = require("./routes/generate.route");

dotenv.config();
const app = express();

// initialize mongoose connection
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;

// set access-controll-allow-origin to *
app.all("*", cors);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// load default routes
app.use("/api/admin", adminRoute);
app.use("/api/generate", GenerateRoute);

// start server
app.listen(process.env.PORT, () => {
	console.log(`server started on http://localhost:${process.env.PORT}`);
});

db.on("error", (err) => {
	console.error(err);
});
db.once("open", () => {
	console.log("Database connected!");
});
