const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const neatCsv = require("neat-csv");
const xlsx = require("xlsx");
const express = require("express");

const router = express.Router();

var modules = [];
var moudlesName = [];
var routeModules = [];
var routeModulesName = [];

const PrepareData = async (req, res) => {
	let param = [path.join(__dirname, "../scripts/prepare")];

	await fs.readdir(path.join(__dirname, "../uploads"), (err, files) => {
		files.forEach(async (name) => {
			param.push(name);
		});

		proc = spawn("python", param);

		proc.stdout.on("data", (data) => {
			console.log(`stdout: ${data}`);
		});

		proc.stderr.on("data", (data) => {
			console.error(`stderr: ${data}`);
		});

		proc.on("close", (code) => {
			console.log(`child process exited with code ${code}`);
		});
	});

	res.status(200).json({
		code: 200,
		status: "success",
		message: "data prepared",
	});
};

async function CreateModels(req, res, next) {
	console.log("Create Models");

	await fs.readdir(path.join(__dirname, "/../data"), function (error, files) {
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
	await fs.readdir(path.join(__dirname, "../generated/model"), function (
		error,
		files
	) {
		var totalFiles = files.length;
		for (let i = 0; i < totalFiles; i++) {
			const element = files[i];
			var name = element.slice(0, -3);
			moudlesName.push(name);
			modules.push(
				require(path.join(__dirname, "../generated/model", element))
			);
		}
		res.status(200).json({ code: 200, status: "success" });
	});
}

async function LoadData(req, res, next) {
	console.log("Load data");

	fs.readdir(path.join(__dirname, "../data"), async function (error, files) {
		var totalFiles = files.length;
		await files.forEach((element) => {
			chooseFileTypeData(element);
		});
		res.status(200).json({ code: 200, status: "success" });
	});
}

async function CreateRoutes(req, res, next) {
	console.log("Create routes");

	await fs.readdir(path.join(__dirname, "../data"), function (error, files) {
		var totalFiles = files.length;
		files.forEach((element) => {
			chooseFileTypeRoute(element);
		});
		res.status(200).json({ code: 200, status: "success" });
	});
}

async function LoadRoutes(req, res, next) {
	console.log("Load routes");
	routeModules = [];
	routeModulesName = [];
	await fs.readdir(path.join(__dirname, "../generated/routes"), function (
		error,
		files
	) {
		var totalFiles = files.length;
		for (let i = 0; i < totalFiles; i++) {
			const element = files[i];
			var name = element.slice(0, -3);
			routeModulesName.push(name);
			routeModules.push(
				require(path.join(__dirname, "../generated/routes", element))
			);
			name = element.slice(0, -9);
			router.use("/api/" + name, routeModules[i]);
		}
	});
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
		path.join(__dirname, "../data", filename),
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
	var workbook = xlsx.readFile(path.join(__dirname, "../data", filename));
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
	if (!fs.existsSync(path.join(__dirname, "../generated/model/"))) {
		fs.mkdirSync(path.join(__dirname, "../generated/model/"));
	}
	var writeStream = fs.createWriteStream(
		path.join(__dirname, "../generated/model/", `${filename}.js`)
	);
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
	if (!fs.existsSync(path.join(__dirname, "../generated/model/"))) {
		fs.mkdirSync(path.join(__dirname, "../generated/model/"));
	}
	var writeStream = fs.createWriteStream(
		path.join(__dirname, "../generated/model/", `${filename}.js`)
	);
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
	if (!fs.existsSync(path.join(__dirname, "../generated/routes/"))) {
		fs.mkdirSync(path.join(__dirname, "../generated/routes/"));
	}
	var writeStream = fs.createWriteStream(
		path.join(__dirname, "../generated/routes", `${filename}.route.js`)
	);

	writeStream.write('var express = require("express");\n');
	writeStream.write("var router = express.Router();\n");
	writeStream.write('var jwt = require("jsonwebtoken");\n');
	writeStream.write(
		"var " + filename + ' = require("../model/' + filename + '.js");\n'
	);
	writeStream.write(
		'var Checker = require("../../middlewares/checktoken.js");'
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
	writeStream.write(
		'res.status(201).json({ code: 201, status: "success" })\n'
	);
	writeStream.write("} catch (e) {\n");
	writeStream.write("console.log(e);\n");
	writeStream.write(
		'res.status(500).json({ code: 500, error: "Something went wrong" });\n'
	);
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
	writeStream.write(
		'res.status(200).json({ code: 200, status: "success" });\n'
	);
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
		path.join(__dirname, "../data", filename),
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
	var workbook = xlsx.readFile(path.join(__dirname, "../data", filename));
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
		path.join(__dirname, "../data", filename),
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
	var workbook = xlsx.readFile(path.join(__dirname, "../data", filename));
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

module.exports = {
	PrepareData: PrepareData,
	LoadData: LoadData,
	CreateModels: CreateModels,
	LoadModules: LoadModules,
	CreateRoutes: CreateRoutes,
	LoadRoutes: LoadRoutes,
	Routes: router,
};
