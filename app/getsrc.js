var request = require('request'),
	async = require('async'),
	sourceMap = require('source-map');

module.exports = function(lookup, callback){
	var srcMapKey = "sourceMappingURL",
		srcMapCommentStart = "//#",
		linesBefore = 3,
		linesAfter = 5,
		errMsg = {
			0: "Unknown error",
			404: "Not found",
			500: "Internal server error"
		};

	async.waterfall([
		//	Grab error URL JS script
		function(cb) {
			request(lookup.url, function(error, response, miniSrcCode) {
				var errCode;
				if (!error && response.statusCode == 200 && miniSrcCode) {
					cb(null, miniSrcCode);
				} else {
					//	See if we have a statusCode
					errCode = (response && response.statusCode)? response.statusCode: 0;
					cb({
						statusCode: errCode,
						message: errMsg[errCode] || errMsg[0]
					});
				}
			});
		},
		//	Grab source map, if available
		function(miniSrcCode, cb) {
			//	See if the last line contains sourcemap
			//	Grab last index of "//"
			var lastComment = miniSrcCode.substr(miniSrcCode.lastIndexOf(srcMapCommentStart));
			if(lastComment && lastComment.indexOf(srcMapKey) != -1) {
				var srcMapUrl = lastComment.substr(lastComment.indexOf(srcMapKey) + srcMapKey.length + 1);

				if(srcMapUrl) {
					request(srcMapUrl, function (error, response, srcMapResult) {
						if (!error && response.statusCode == 200 && srcMapResult) {
							cb(null, srcMapResult);
						} else {
							cb("Could not load source map from url:", srcMapUrl);
						}
					});
				} else {
					cb("no source map url");
				}
			}
		},

		//	Grab the source code from the sourcemap if we can
		function(srcMapResult, cb) {
			var source_map = new sourceMap.SourceMapConsumer(srcMapResult),
				pos = source_map.originalPositionFor(lookup);

			//	Grab the code
			if(pos) {
				var url = (srcMapResult.sourceRoot? srcMapResult.sourceRoot: "") + pos.source;
				request(url, function (error, response, srcCode) {
					if (!error && response.statusCode == 200 && srcCode) {
						cb(null, pos, srcCode)
					} else {
						cb(error);
					}
				});
			}
		},


		//	Grab the exact source code we want from the SRC url if we can
		//	Note: It's padded on each side based on linesBefore and linesAfter.
		function(pos, srcCode, cb) {
			var lines = srcCode.split("\r\n").join("\n").split("\n"),
				line = pos.line - 1;
				startLine = line - linesBefore,
				endLine = line + linesAfter,
				code = [];

			if(startLine < 0) {
				startLine = 0;
			}

			if(endLine > lines.length) {
				endLine = lines.length;
			}

			//	And we have our code.
			for(var i = startLine; i < endLine; i += 1) {
				code.push({line: i + 1, code: lines[i], errorLine: i == line });
			}

			cb(null, code);
		}

		], function (err, result) {
			if(err) {
				callback(err);
			} else {
				callback(null, result);
			}
		}
	);

};
