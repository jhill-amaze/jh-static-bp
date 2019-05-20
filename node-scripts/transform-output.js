const fs = require('fs');
var ncp = require('ncp').ncp;
ncp.limit = 0; // there's no limit.
let configFilePath = process.argv[2];

console.log(`transform-output.js: running...`);

if (typeof configFilePath === "undefined") {
	console.error(`ERROR: configFilePath not supplied`);
}

function endsInSlash (str) {
	return str[str.length - 1] === "/";
}

var file = fs.readFile(configFilePath, "utf8", function(err, doc) {

	if (err) {
		console.log(err);
		return;
	}

	const config = JSON.parse(doc);
	const inputRoot = config.inputRoot;
	const outputRoot = config.outputRoot;

	if (!endsInSlash(inputRoot)) {
		console.error(`ERROR: format error for inputRoot: must end in "/"`);
		return;
	}
	if (!endsInSlash(outputRoot)) {
		console.error(`ERROR: format error for outputRoot: must end in "/"`);
		return;
	}

	const items = config.items;

	for (let i = 0; i < items.length; i++) {

		const item = config.items[i];
		const required = ['inPath', 'outDir'];

		for (let r = 0; r < required.length; r++) {
			if (typeof item[required[r]] === "undefined") {
				console.error(`ERROR: must supply ${required[r]}`);
			}
		}

		const inPath = inputRoot + item.inPath;
		const outDir = outputRoot + item.outDir;
		const outName = item.outName;

		// if outName is supplied, must be copying a single file
		if (typeof outName !== "undefined") {

			// create outDir if it doesn't already exist (not necessary for full directory copy, NCP handles it)
			if (!fs.existsSync(outDir)) {
				fs.mkdirSync(outDir);
			}

			if (!endsInSlash(outDir)) {
				console.error(`ERROR: outDir format error for "${outDir}": must end with "/"`);
				continue;
			}

			const outPath = outDir + outName;

			console.log(`inPath: ${inPath}, outPath: ${outPath}`);

			ncp(inPath, outPath, function (err) {

				if (err) {
					console.error('ERROR: ncp:');
					console.error(err);
				}

				console.log(`ncp successfully copied from ${inPath} to ${outPath}`);
			});
		}
		// else we are copying a directory
		else {

			console.log(`inPath: ${inPath}, outDir: ${outDir}`);

			ncp(inPath, outDir, function (err) {

				if (err) {
					console.error('ERROR: ncp:');
					console.error(err);
				}

				console.log(`ncp successfully copied from ${inPath} to ${outDir}`);
			});
		}
	}
});
