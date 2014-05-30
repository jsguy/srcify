var getsrc = require('./getsrc.js');

var lookup = {
	url: "http://localhost/projects/srcify/test/dist/scrifytest.min.js",
	line: 8, column: 7
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
