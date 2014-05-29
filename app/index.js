var getsrc = require('./getsrc.js');

//	Test lookup
// var lookup = {
// 	url: "http://jsguy.com/labs/srcify/jquery-1.11.0.min.js",
// 	line: 3,
// 	column: 26
// };

var lookup = {
	url: "http://localhost/projects/srcify/test/dist/scrifytest.min.js",
	//line: 6, column: 6
	line: 8, column: 7
};

//	Grab the src
console.log('Grabbing file:', lookup.url);
getsrc(lookup, function(error, code){
	if(code && ! error) {
		console.log('--- Result ---');
		//console.log(code);
		//	Show just the line
		for(var i in code) {
			if(code[i].errorLine) {
				console.log(code[i].line + ": " + code[i].code);
			}
		}
	} else {
		console.log('Something went wrong whilst trying to fetch the code.', error);
	}
});
