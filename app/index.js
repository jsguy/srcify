var getsrc = require('./getsrc.js');

//	Test lookup
var lookup = {
	//url: "http://192.168.7.207/sourcemaptest/jquery-1.11.0.min.js",
	url: "http://192.168.7.207/sourcemaptest/jquery-1.11.0.min.js",
	//url: "http://nothere/sourcemaptest/jquery-1.11.0.min.js",
	line: 3,
	column: 26
};

//	Grab the src
getsrc(lookup, function(error, code){
	if(code && ! error) {
		console.log(code);
	} else {
		//	
		console.log('Something went wrong whilst trying to fetch the code.', error);
	}
});
