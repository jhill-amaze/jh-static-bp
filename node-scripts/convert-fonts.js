const fs = require('fs');
const ttf2woff2 = require('ttf2woff2');
const exec = require('child_process').exec;
let inDir = process.argv[2];
let outDir = process.argv[3];
let cssOutPath = process.argv[4];
const generateWoff2 = process.argv[5];

if (inDir[inDir.length - 1] !== "/") { inDir += "/"; }
if (outDir[outDir.length - 1] !== "/") { outDir += "/"; }
if (cssOutPath[cssOutPath.length - 1] !== "/") { cssOutPath += "/"; }

console.log(`convert-fonts.js: running with input directory ${inDir}`);

// Create a .woff file for each .ttf file in the input directory
console.log('convert-fonts.js: ttf > woff...');

fs.readdirSync(inDir).forEach(inFile => {

	const outFile = inFile.replace('.ttf', '.woff');

	exec(`ttf2woff ${inDir}${inFile} ${outDir}${outFile}`, function (err, stdout, stderr) {
		if (err) {
			console.error(`exec error: ${err}`);
		}
	});
});

// If flag is set, create a .woff2 file for each .ttf file in the input directory
if (generateWoff2 === "--woff2") {
	
	console.log('convert-fonts.js: ttf > woff2...');

	fs.readdirSync(inDir).forEach(inFile => {

		const outFile = inFile.replace('.ttf', '.woff2');
		const input = fs.readFileSync(inDir + inFile);

		fs.writeFileSync(outDir + outFile);
	});
}

// Create a single combined SASS stylesheet containing font-face definitions for all .ttf files in the input directory
let fontFacesCSS = "/* auto-generated by convert-fonts.js */\n\n";

fs.readdirSync(inDir).forEach(inFile => {

	const outFile = inFile.replace('.ttf', '');

	fontFacesCSS += `@font-face {
			font-family: '${outFile}';
			src: url('../fonts/${outFile}.woff2') format('woff2'),
				url('../fonts/${outFile}.woff') format('woff');
		}
	`;
});

console.log(`Writing fontfaces CSS to ${cssOutPath}`);

fs.writeFile(`${cssOutPath}`, fontFacesCSS, err => {
	if (err) {
		console.log(err);
	}
});