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
	
	[ { line: 14604, code: '\t\t}', errorLine: false },
	  { line: 14605, code: '', errorLine: false },
	  { line: 14606, code: '\t\tvar iFormat,', errorLine: false },
	  { line: 14607,
	    code: '\t\t\tdayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,',
	    errorLine: true },
	  { line: 14608,
	    code: '\t\t\tdayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,',
	    errorLine: false },
	  { line: 14609,
	    code: '\t\t\tmonthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,',
	    errorLine: false },
	  { line: 14610,
	    code: '\t\t\tmonthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,',
	    errorLine: false },
	  { line: 14611,
	    code: '\t\t\t// Check whether a format character is doubled',
	    errorLine: false } ]

So for each object you have:

	{ 
		line: What line it happened on
		code: The code that caused the error
		errorLine: true if this is the line the error occued on
	}

In this example, the error was on line 14607, as errorLine is true.

## Options

* srcMapKey (String) - What to search for to get the source map url, default: "sourceMappingURL"
* srcMapCommentStart (String) - Start of source map comment, default: "//#"
* linesBefore (Number) - How many lines before the error to show, default: 3
* linesAfter (Number) - How many lines after the error (including error line), default: 5
