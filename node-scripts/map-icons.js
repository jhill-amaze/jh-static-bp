const fs = require('fs');
let inPath = process.argv[2];
let outPath = process.argv[3];
const sassMapName = '$icons';

console.log(`map-icons.js: running...`);

var file = fs.readFile(inPath, "utf8", function(err, doc) {
    
	if (err) {
		console.log(err);
		return;
	}

    const cssStyles = doc.match(/icon-([\s\S]*?)}/gi);

    // Pull out and store the icon name and char code for each style declaration
    const icons = [];

    for (let s = 0; s < cssStyles.length; s++) {

    	const rule = cssStyles[ s ];
    	const nameFragments = rule.match(/icon-([\s\S]*?):/gi);
    	let name = nameFragments[0].replace('icon-', '');
    	name = name.replace(':', '');
    	const codeFragments = rule.match(/content: "([\s\S]*?)";/gi);
    	let code = codeFragments[0].replace('content: "', '');
    	code = code.replace('";', '');

    	icons.push({
    		name: name,
    		code: `"${code}"`
    	});
    }

    // Create an output string
    let outStr = `${sassMapName}: (\n`;

    for (var i = 0; i < icons.length; i++) {

    	outStr += '\t"' + icons[ i ].name + '": ' + icons[ i ].code + ',\n';
    }

    outStr += ');\n';

    // Write output file
    fs.writeFileSync(outPath, outStr);

    console.log('populated map with ' + icons.length + ' icons');
});
