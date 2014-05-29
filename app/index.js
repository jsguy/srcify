var getsrc = require('./getsrc.js');

//	Test lookup
// var lookup = {
// 	url: "http://jsguy.com/labs/srcify/jquery-1.11.0.min.js",
// 	line: 3,
// 	column: 26
// };

var lookup = {
	url: "http://192.168.7.207/projects/srcify/test/dist/scrifytest.min.js",
	line: 6,
	column: 6
};

//	Grab the src
console.log('Grabbing file:', lookup.url);
getsrc(lookup, function(error, code){
	if(code && ! error) {
		console.log('--- Result ---');
		console.log(code);
	} else {
		console.log('Something went wrong whilst trying to fetch the code.', error);
	}
});
