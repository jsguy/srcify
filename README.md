# srcify

Downloads source maps as specified in a JavaScript file and identifies unminified lines of code at given line and column.

For example:

	var lookup = {
		url: "http://localhost/projects/srcify/test/dist/scrifytest.min.js",
		line: 8,
		column: 7
	};

	//	Grab the src
	getsrc(lookup, function(error, code){
		if(code && ! error) {
			console.log(code);
		} else {
			console.log('Something went wrong whilst trying to fetch the code.', error);
		}
	});

By default you get the 3 lines before and 4 lines after the error line, here is the code output from above:
	
	{ line: 14607, code: '\t\t\tdayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,', errorLine: true }

So you have:

	{ 
		line: What line it happened on
		code: The code that caused the error
		errorLine: true if this is the line the error occued on
	}


## Options

* srcMapKey (String) - What to search for to get the source map url, default: "sourceMappingURL"
* srcMapCommentStart (String) - Start of source map comment, default: "//#"
* linesBefore (Number) - How many lines before the error to show, default: 3
* linesAfter (Number) - How many lines after the error (including error line), default: 5
