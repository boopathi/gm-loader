var gm = require('gm');
var utils = require('loader-utils');

module.exports = function(source) {
	this.cacheable && this.cacheable(true);
	if(!this.emitFile) throw new Error('emitFile is required from module system');

	// might not be necessary
	// Image content changes aren't a thing
	this.addDependency(this.resourcePath);

	var cb = this.async();
	if (!cb) throw new Error('Cannot use gm loader');

	var filename = this.options.output.imageFilename;//|| '[name].[ext]';

	var query = utils.parseQuery(this.query);
	var url = utils.interpolateName(this, filename, {
		context: query.context || this.options.context,
		content: source,
		regExp: query.regExp
	});

	var loaderContext = this;
	var result = [];

	gm(this.resourcePath)
		.identify(function(err, data) {
			if(err) return cb(err);

			result.push('exports.src = __webpack_public_path__ + ' + JSON.stringify(url) + ';');
			result.push('exports.format = ' + JSON.stringify(data.format) + ';');
			result.push('exports.geometry = ' + JSON.stringify(data.Geometry) + ';');
			result.push('exports.width = ' + JSON.stringify(data.size.width) + ';');
			result.push('exports.height = ' + JSON.stringify(data.size.height) + ';');
			result.push('exports.depth = ' + JSON.stringify(data.depth) + ';');
			result.push('exports.filesize = ' + JSON.stringify(data.Filesize) + ';');

			loaderContext.emitFile(url, source);
			cb(null, result.join('\n'));
		});
};

module.exports.raw = true;
