require("dotenv").config();
const { exec, spawn } = require("child_process");
var mongoose = require("mongoose");
var cons = require("consolidate");
var neatCsv = require("neat-csv");
var express = require("express");
var multer = require("multer");
var path = require("path");
var xlsx = require("xlsx");
const fs = require("fs");
var modules = [];
var moudlesName = [];
var routeModules = [];
var routeModulesName = [];

var app = express.Router();
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + "/uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
var upload = multer({ storage: storage }).any();
var port = 3000;

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
var db = mongoose.connection;

app.post("/", upload, (req, res) => {
	console.log("Uploading");

	upload(req, res, function (err) {
		if (err) {
			return res.status(500).json({ code: 500, error: err.body });
		}
		res.status(201).json({ code: 201, status: "uploaded" });
	});
});

app.get("/prepareData", PrepareData);

app.get("/createModels", CreateModels);

app.get("/loadModules", LoadModules);

app.get("/loadData", LoadData);

app.get("/createRoutes", CreateRoutes);

app.get("/loadRoutes", LoadRoutes);

async function PrepareData(req, res) {
	console.log("Prepare Data");

	var SysParams = [];
	SysParams.push("DataPrepare.py");
	await fs.readdir(__dirname + "/uploads", function (error, files) {
		console.log("work");

		var totalFiles = files.length;
		console.log(totalFiles);

		SysParams.push(totalFiles);

		files.forEach(async (element) => {
			SysParams.push(element);
		});

		var python = spawn("python", SysParams);
		var cmdGo;

		cmdGo = python;

		cmdGo.stdout.on("data", (data) => {
			console.log(`stdout: ${data}`);
		});

		cmdGo.stderr.on("data", (data) => {
			console.error(`stderr: ${data}`);
		});

		cmdGo.on("close", (code) => {
			console.log(`child process exited with code ${code}`);
		});
	});

	console.log(SysParams);
	res.status(200).json({ code: 200, status: "success" });
}

async function CreateModels(req, res, next) {
	console.log("Create Models");

	await fs.readdir(__dirname + "/uploadsPrepare", function (error, files) {
		var totalFiles = files.length;
		files.forEach(async (element) => {
			await chooseFileType(element);
		});
		res.status(201).json({ code: 201, status: "success" });
	});
}

async function LoadModules(req, res, next) {
	console.log("Load modules");
	modules = [];
	moudlesName = [];
	await fs.readdir(__dirname + "/models", function (error, files) {
		var totalFiles = files.length;
		for (let i = 0; i < totalFiles; i++) {
			const element = files[i];
			var name = element.slice(0, -3);
			moudlesName.push(name);
			modules.push(require(__dirname + "/models/" + element));
		}
		res.status(200).json({ code: 200, status: "success" });
	});
}

async function LoadData(req, res, next) {
	console.log("Load data");

	fs.readdir(__dirname + "/uploadsPrepare", async function (error, files) {
		var totalFiles = files.length;
		await files.forEach((element) => {
			chooseFileTypeData(element);
		});
		res.status(200).json({ code: 200, status: "success" });
	});
}

async function CreateRoutes(req, res, next) {
	console.log("Create routes");

	await fs.readdir(__dirname + "/uploadsPrepare", function (error, files) {
		var totalFiles = files.length;
		files.forEach((element) => {
			chooseFileTypeRoute(element);
		});
		// res.redirect("/api/admin");
		res.status(200).json({ code: 200, status: "success" });
	});
}

async function LoadRoutes(req, res, next) {
	console.log("Load routes");
	routeModules = [];
	routeModulesName = [];
	await fs.readdir(__dirname + "/routes", function (error, files) {
		var totalFiles = files.length;
		for (let i = 0; i < totalFiles; i++) {
			const element = files[i];
			var name = element.slice(0, -3);
			routeModulesName.push(name);
			routeModules.push(require(__dirname + "/routes/" + element));
			name = element.slice(0, -9);
			app.use("/api/" + name, routeModules[i]);
		}
	});
	// res.redirect("/api/admin");
	res.status(200).json({ code: 200, status: "success" });
}

async function chooseFileType(filename) {
	var Data;
	var csv = ".csv";
	var xlsx = ".xlsx";
	if (filename.includes(csv)) {
		Data = await CSVreader(filename);
	} else if (filename.includes(xlsx)) {
		Data = await Xlsxreader(filename);
	}
}

async function chooseFileTypeData(filename) {
	var Data;
	var csv = ".csv";
	var xlsx = ".xlsx";
	if (filename.includes(csv)) {
		Data = await CSVDatareader(filename);
	} else if (filename.includes(xlsx)) {
		Data = await XlsxDatareader(filename);
	}
}

async function chooseFileTypeRoute(filename) {
	var Data;
	var csv = ".csv";
	var xlsx = ".xlsx";
	if (filename.includes(csv)) {
		Data = await CSVRoutereader(filename);
	} else if (filename.includes(xlsx)) {
		Data = await XlsxRoutereader(filename);
	}
}

async function CSVreader(filename) {
	var Data;
	fs.readFile(
		__dirname + "/uploadsPrepare/" + filename,
		async (err, data) => {
			if (err) {
				console.error(err);
				return;
			}
			Data = await neatCsv(data);
			var result = [];
			var type = [];
			var obj = Data[0];
			var counter = 1;
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {
					type.push(jsUcfirst(typeof obj[p]));
					var P = p.split(" ").join("");
					p = P;
					P = p.split("-").join("");
					p = P;
					P = p.split("/").join("");
					p = P;
					P = p.split("\\").join("");
					if (!isNaN(P.charAt(0))) {
						P = "_" + P;
					}
					P = P.replace(/([^A-Za-z0-9\_]+)/gi, "");
					if (P.length == 0) {
						P = "Para_" + counter;
						counter++;
					}
					result.push(P);
				}
			}
			filename = filename.slice(0, -4);
			//CreatingModelJs(filename, result, type);
			CreatingModelJsNoParamType(filename, result);
		}
	);
}

async function Xlsxreader(filename) {
	var Data;
	var workbook = xlsx.readFile(__dirname + "/uploadsPrepare/" + filename);
	var sheet_name_list = workbook.SheetNames;
	sheet_name_list.forEach((element) => {
		Data = xlsx.utils.sheet_to_json(workbook.Sheets[element]);
		var result = [];
		var type = [];
		var obj = Data[0];
		var counter = 1;
		for (var p in obj) {
			if (obj.hasOwnProperty(p)) {
				type.push(jsUcfirst(typeof obj[p]));
				var P = p.split(" ").join("");
				p = P;
				P = p.split("-").join("");
				p = P;
				P = p.split("/").join("");
				p = P;
				P = p.split("\\").join("");
				if (!isNaN(P.charAt(0))) {
					P = "_" + P;
				}
				P = P.replace(/([^A-Za-z0-9\_]+)/gi, "");
				if (P.length == 0) {
					P = "Para_" + counter;
					counter++;
				}
				result.push(P);
			}
		}
		filename = filename.slice(0, -5);
		//CreatingModelJs(element, result, type);
		CreatingModelJsNoParamType(element, result);
	});
}

function CreatingModelJs(filename, params, paramsType) {
	filename = filename.split(" ").join("");
	filename = filename.split("-").join("");
	filename = filename.split("/").join("");
	filename = filename.split("\\").join("");
	var writeStream = fs.createWriteStream("./models/" + filename + ".js");
	writeStream.write('const mongoose = require("mongoose");\n');
	writeStream.write("const " + filename + "Schema = new mongoose.Schema({\n");
	for (let i = 0; i < params.length; i++) {
		writeStream.write(params[i] + ":{\n");
		writeStream.write("type:" + paramsType[i] + ",\n");
		writeStream.write("},\n");
	}
	writeStream.write("},{\n");
	writeStream.write("collection: '" + filename + "'\n");
	writeStream.write("});\n");
	writeStream.write(
		"module.exports = mongoose.model('" +
			filename +
			"'," +
			filename +
			"Schema)"
	);
	writeStream.end();
}

function CreatingModelJsNoParamType(filename, params) {
	filename = filename.split(" ").join("");
	filename = filename.split("-").join("");
	filename = filename.split("/").join("");
	filename = filename.split("\\").join("");
	var writeStream = fs.createWriteStream("./models/" + filename + ".js");
	writeStream.write('const mongoose = require("mongoose");\n');
	writeStream.write("const " + filename + "Schema = new mongoose.Schema({\n");
	for (let i = 0; i < params.length; i++) {
		writeStream.write(params[i] + ":{\n");
		writeStream.write("type: String,\n");
		writeStream.write("},\n");
	}
	writeStream.write("},{\n");
	writeStream.write("collection: '" + filename + "'\n");
	writeStream.write("});\n");
	writeStream.write(
		"module.exports = mongoose.model('" +
			filename +
			"'," +
			filename +
			"Schema)"
	);
	writeStream.end();
}

function CreatingRouteJs(filename, params) {
	filename = filename.split(" ").join("");
	filename = filename.split("-").join("");
	filename = filename.split("/").join("");
	filename = filename.split("\\").join("");
	var writeStream = fs.createWriteStream(
		"./routes/" + filename + ".route.js"
	);

	writeStream.write('var express = require("express");\n');
	writeStream.write("var router = express.Router();\n");
	writeStream.write('var jwt = require("jsonwebtoken");\n');
	writeStream.write(
		"var " + filename + ' = require("../models/' + filename + '.js");\n'
	);
	writeStream.write(
		'var Checker = require("../defaultFunctions/TokenChecker");'
	);
	writeStream.write("module.exports = router;\n");

	writeStream.write('router.get("/", async (req, res) => {\n');
	writeStream.write("try {\n");
	writeStream.write("var upload = await " + filename + ".find({});\n");
	writeStream.write('res.setHeader("Access-Control-Allow-Origin", "*");\n');
	writeStream.write("res.json({ code: 200, data: upload });\n");
	writeStream.write("} catch (err) {\n");
	writeStream.write("res.status(500).json({\n");
	writeStream.write("body: err.body\n");
	writeStream.write("});\n");
	writeStream.write("}\n");
	writeStream.write("});\n");

	writeStream.write('router.post("/", Checker ,async (req, res) => {\n');
	writeStream.write("try {\n");
	writeStream.write("var upload = new " + filename + "(req.body);\n");
	writeStream.write("await upload.save();\n");
	writeStream.write('res.redirect("' + process.env.RETURNADDRESS + '");\n');
	writeStream.write("} catch (e) {\n");
	writeStream.write("console.log(e);\n");
	writeStream.write('res.redirect("' + process.env.RETURNADDRESS + '");\n');
	writeStream.write("}\n");
	writeStream.write("});\n");

	writeStream.write('router.post("/:id", Checker , async (req,res) => {\n');
	writeStream.write("if(Object.keys(req.body).length === 0){\n");
	writeStream.write("try{\n");
	writeStream.write(
		filename +
			".remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});\n"
	);
	writeStream.write("} catch (e) {\n");
	writeStream.write("console.log(e);\n");
	writeStream.write("}\n");
	writeStream.write("}else{\n");
	writeStream.write("try{\n");
	writeStream.write(
		filename +
			".updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});\n"
	);
	writeStream.write("} catch (e) {\n");
	writeStream.write("console.log(e);\n");
	writeStream.write("}\n");
	writeStream.write("}\n");
	writeStream.write('res.redirect("' + process.env.RETURNADDRESS + '");\n');
	writeStream.write("});\n");

	for (let i = 0; i < params.length; i++) {
		writeStream.write(
			'router.get("/' + params[i] + '/:value/", async (req, res) => {\n'
		);
		writeStream.write("let " + params[i] + " = req.params.value;\n");
		writeStream.write("try {\n");
		writeStream.write(
			"var upload = await " +
				filename +
				".find({ " +
				params[i] +
				" : " +
				params[i] +
				" });\n"
		);
		writeStream.write(
			'res.setHeader("Access-Control-Allow-Origin", "*");\n'
		);
		writeStream.write("res.json({ code: 201, data: upload });\n");
		writeStream.write("} catch (err) {\n");
		writeStream.write("res.status(500).json({\n");
		writeStream.write("body: err.body\n");
		writeStream.write("});\n");
		writeStream.write("}\n");
		writeStream.write("});\n");
	}
	writeStream.end();
}

async function CSVDatareader(filename) {
	var Data;
	fs.readFile(
		__dirname + "/uploadsPrepare/" + filename,
		async (err, data) => {
			if (err) {
				console.error(err);
				return;
			}
			filename = filename.split(" ").join("");
			filename = filename.split("-").join("");
			filename = filename.split("/").join("");
			filename = filename.split("\\").join("");
			filename = filename.slice(0, -4);
			filename = filename.replace(/([^A-Za-z0-9\_]+)/gi, "");
			Data = await neatCsv(data);
			Data.forEach(async (element) => {
				var counter = 1;
				for (var p in element) {
					if (element.hasOwnProperty(p)) {
						var newName;
						newName = p.split(" ").join("");
						newName = newName.split("-").join("");
						newName = newName.split("/").join("");
						newName = newName.split("\\").join("");
						if (!isNaN(newName.charAt(0))) {
							newName = "_" + newName;
						}
						newName = newName.replace(/([^A-Za-z0-9\_]+)/gi, "");
						if (newName.length == 0) {
							newName = "Para_" + counter;
							counter++;
						}
						renameKey(element, p, newName);
					}
				}
				var index = moudlesName.indexOf(filename);
				var Uploadmodule = modules[index];
				Uploadmodule.findOne(element, async function (err, result) {
					if (result) {
						//console.log("Duplicate " + result);
					} else {
						var Uploadvariable = new Uploadmodule(element);
						try {
							await Uploadvariable.save();
						} catch (err) {
							console.log(err);
						}
					}
				});
			});
		}
	);
}

async function XlsxDatareader(filename) {
	var Data;
	var workbook = xlsx.readFile(__dirname + "/uploadsPrepare/" + filename);
	var sheet_name_list = workbook.SheetNames;
	sheet_name_list.forEach((element) => {
		Data = xlsx.utils.sheet_to_json(workbook.Sheets[element]);
		element = element.split(" ").join("");
		element = element.split("-").join("");
		element = element.split("/").join("");
		element = element.split("\\").join("");
		element = element.replace(/([^A-Za-z0-9\_]+)/gi, "");
		console.log("Data Reading");

		Data.forEach(async (ele) => {
			var counter = 1;
			for (var p in ele) {
				if (ele.hasOwnProperty(p)) {
					var newName;
					newName = p.split(" ").join("");
					newName = newName.split("-").join("");
					newName = newName.split("/").join("");
					newName = newName.split("\\").join("");
					if (!isNaN(newName.charAt(0))) {
						newName = "_" + newName;
					}
					newName = newName.replace(/([^A-Za-z0-9\_]+)/gi, "");
					if (newName.length == 0) {
						newName = "Para_" + counter;
						counter++;
					}
					renameKey(ele, p, newName);
				}
			}
			var index = moudlesName.indexOf(element);
			var Uploadmodule = modules[index];
			Uploadmodule.findOne(ele, async function (err, result) {
				if (result) {
					//console.log("Duplicate " + result);
				} else {
					var Uploadvariable = new Uploadmodule(ele);
					try {
						await Uploadvariable.save();
					} catch (err) {
						console.log(err);
					}
				}
			});
		});
	});
}

async function CSVRoutereader(filename) {
	var Data;
	fs.readFile(
		__dirname + "/uploadsPrepare/" + filename,
		async (err, data) => {
			if (err) {
				console.error(err);
				return;
			}
			Data = await neatCsv(data);
			var result = [];
			var type = [];
			var obj = Data[0];
			var counter = 1;
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {
					type.push(jsUcfirst(typeof obj[p]));
					var P = p.split(" ").join("");
					p = P;
					P = p.split("-").join("");
					p = P;
					P = p.split("/").join("");
					p = P;
					P = p.split("\\").join("");
					if (!isNaN(P.charAt(0))) {
						P = "_" + P;
					}
					P = P.replace(/([^A-Za-z0-9\_]+)/gi, "");
					if (P.length == 0) {
						P = "Para_" + counter;
						counter++;
					}
					result.push(P);
				}
			}
			filename = filename.slice(0, -4);
			CreatingRouteJs(filename, result);
		}
	);
}

async function XlsxRoutereader(filename) {
	var Data;
	var workbook = xlsx.readFile(__dirname + "/uploadsPrepare/" + filename);
	var sheet_name_list = workbook.SheetNames;
	sheet_name_list.forEach((element) => {
		Data = xlsx.utils.sheet_to_json(workbook.Sheets[element]);
		var result = [];
		var type = [];
		var obj = Data[0];
		var counter = 1;
		for (var p in obj) {
			if (obj.hasOwnProperty(p)) {
				type.push(jsUcfirst(typeof obj[p]));
				var P = p.split(" ").join("");
				p = P;
				P = p.split("-").join("");
				p = P;
				P = p.split("/").join("");
				p = P;
				P = p.split("\\").join("");
				if (!isNaN(P.charAt(0))) {
					P = "_" + P;
				}
				P = P.replace(/([^A-Za-z0-9\_]+)/gi, "");
				if (P.length == 0) {
					P = "Para_" + counter;
					counter++;
				}
				result.push(P);
			}
		}
		filename = filename.slice(0, -5);
		CreatingRouteJs(element, result);
	});
}

function jsUcfirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function renameKey(obj, old_key, new_key) {
	// check if old key = new key
	if (old_key !== new_key) {
		Object.defineProperty(
			obj,
			new_key, // modify old key
			// fetch description from object
			Object.getOwnPropertyDescriptor(obj, old_key)
		);
		delete obj[old_key]; // delete old key
	}
}
module.exports = app;
