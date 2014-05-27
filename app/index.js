var getsrc = require('./getsrc.js');

//	Test lookup
var lookup = {
	url: "http://jsguy.com/labs/srcify/jquery-1.11.0.min.js",
	line: 3,
	column: 26
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
