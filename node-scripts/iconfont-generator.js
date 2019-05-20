const fs = require('fs');
const webfontsGenerator = require('webfonts-generator');
let inDir = process.argv[2];
let outDir = process.argv[3];
let cssOutPath = process.argv[4];

if (inDir[inDir.length - 1] !== "/") { inDir += "/"; }

console.log(`iconfont-generator.js: running with input directory ${inDir}`);

const files = [];

fs.readdirSync(inDir).forEach(inFile => {

	if (inFile.endsWith('.svg')) {

		files.push(`${inDir}${inFile}`);

		console.log(`iconfont-generator : found input file "${inFile}"`);
	}
});

webfontsGenerator({
	files: files,
	dest: outDir,
	css: true,
	cssDest: cssOutPath,
	fontName: 'iconfont',
	type: ['eot', 'woff2', 'woff', 'ttf', 'svg']
}, function(error) {
	if (error) {
		console.log('iconfont-generator - Error : ', error);
	} else {
		console.log('iconfont-generator - Success');
	}
});