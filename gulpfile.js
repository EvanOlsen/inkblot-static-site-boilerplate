/**
 * Settings
 * Turn on/off build features
 */
var settings = {
	clean: true,
	scripts: true,
	templates: true,
	polyfills: false,
	styles: true,
	svgs: true,
	imgs: true,
	copy: true,
	reload: true
};

/**
 * Paths to project folders
 */
var paths = {
	input: 'src/',
	output: 'dist/',
	scripts: {
		input: 'src/js/*',
		polyfills: '.polyfill.js',
		output: 'dist/js/'
	},
	templates: {
		input: 'src/pages/**/*.+(html|nunjucks|njk)',
		render: 'src/templates',
		output: 'dist/'
	},
	styles: {
		input: 'src/sass/**/*.{scss,sass}',
		output: 'dist/css/'
	},
	svgs: {
		input: 'src/svg/*.svg',
		output: 'dist/svg/'
	},
	imgs: {
		input: 'src/img/**/*',
		output: 'dist/img/'
	},
	copy: {
		input: 'src/copy/**/*',
		output: 'dist/'
	},
	reload: './dist/'
};
/**
 * Template for banner to add to file headers
 */
var banner = {
	full:
		'/*!\n' +
		' * <%= package.name %> v<%= package.version %>\n' +
		' * <%= package.description %>\n' +
		' * (c) ' + new Date().getFullYear() + ' <%= package.author.name %>\n' +
		' * <%= package.license %> License\n' +
		' * <%= package.repository.url %>\n' +
		' */\n\n',
	min:
		'/*!' +
		' <%= package.name %> v<%= package.version %>' +
		' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
		' | <%= package.license %> License' +
		' | <%= package.repository.url %>' +
		' */\n'
};


/**
 * Gulp Packages
 */

// General
var {gulp, src, dest, watch, series, parallel} = require('gulp');
var del = require('del');
var flatmap = require('gulp-flatmap');
var lazypipe = require('lazypipe');
var rename = require('gulp-rename');
var header = require('gulp-header');
var package = require('./package.json');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');

// Scripts
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-terser');
var optimizejs = require('gulp-optimize-js');

// Styles
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-cssnano');

// SVGs and Image Optimization
var svgmin = require('gulp-svgmin');
var imagemin = require('gulp-imagemin');

// BrowserSync
var browserSync = require('browser-sync');


/**
 * Gulp Tasks
 */

// Remove pre-existing content from output folders
var cleanDist = function (done) {
	// Make sure this feature is activated before running
	if (!settings.clean) return done();
	// Clean the dist folder
	del.sync([
		paths.output
	]);
	// Signal completion
	return done();
};

// Repeated JavaScript tasks
var jsTasks = lazypipe()
	.pipe(header, banner.full, {package: package})
	.pipe(optimizejs)
	.pipe(dest, paths.scripts.output)
	.pipe(rename, {suffix: '.min'})
	.pipe(uglify)
	.pipe(optimizejs)
	.pipe(header, banner.min, {package: package})
	.pipe(dest, paths.scripts.output);

// Lint, minify, and concatenate scripts
var buildScripts = function (done) {
	// Make sure this feature is activated before running
	if (!settings.scripts) return done();
	// Run tasks on script files
	return src(paths.scripts.input)
		.pipe(flatmap(function(stream, file) {

			// If the file is a directory
			if (file.isDirectory()) {

				// Setup a suffix variable
				var suffix = '';

				// If separate polyfill files enabled
				if (settings.polyfills) {

					// Update the suffix
					suffix = '.polyfills';

					// Grab files that aren't polyfills, concatenate them, and process them
					src([file.path + '/*.js', '!' + file.path + '/*' + paths.scripts.polyfills])
						.pipe(concat(file.relative + '.js'))
						.pipe(jsTasks());

				}

				// Grab all files and concatenate them
				// If separate polyfills enabled, this will have .polyfills in the filename
				src(file.path + '/*.js')
					.pipe(concat(file.relative + suffix + '.js'))
					.pipe(jsTasks());

				return stream;

			}

			// Otherwise, process the file
			return stream.pipe(jsTasks());

		}));

};

// Turn nunjuck files into HTML files
var buildTemplates = function (done) {
	// Make sure this feature is activated before running
	if (!settings.templates) return done();

	return src(paths.templates.input)
	// Adding data to Nunjucks
	.pipe(data(function() {
      return require('./src/data.json')
    }))
	.pipe(nunjucksRender({path: [paths.templates.render]}))
    .pipe(dest(paths.templates.output));
};

// Lint scripts
var lintScripts = function (done) {

	// Make sure this feature is activated before running
	if (!settings.scripts) return done();

	// Lint scripts
	return src(paths.scripts.input)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

};

// Process, lint, and minify Sass files
var buildStyles = function (done) {

	// Make sure this feature is activated before running
	if (!settings.styles) return done();

	// Run tasks on all Sass files
	return src(paths.styles.input)
		.pipe(sass({
			outputStyle: 'expanded',
			sourceComments: true
		}))
		.pipe(prefix({
			browsers: ['last 2 version', '> 0.25%'],
			cascade: true,
			remove: true
		}))
		.pipe(header(banner.full, { package : package }))
		.pipe(dest(paths.styles.output))
		.pipe(rename({suffix: '.min'}))
		.pipe(minify({
			discardComments: {
				removeAll: true
			}
		}))
		.pipe(header(banner.min, { package : package }))
		.pipe(dest(paths.styles.output));

};

// Optimize SVG files
var buildSVGs = function (done) {

	// Make sure this feature is activated before running
	if (!settings.svgs) return done();

	// Optimize SVG files
	return src(paths.svgs.input)
		.pipe(svgmin())
		.pipe(dest(paths.svgs.output));
};

// Optimize Images files
var optimizeImg = function (done) {

	// Make sure this feature is activated before running
	if (!settings.imgs) return done();

	// Optimize Images 
	return src(paths.imgs.input)
		.pipe(imagemin())
		.pipe(dest(paths.imgs.output));
};

// Copy static files into output folder
var copyFiles = function (done) {

	// Make sure this feature is activated before running
	if (!settings.copy) return done();

	// Copy static files
	return src(paths.copy.input)
		.pipe(dest(paths.copy.output));

};

// Watch for changes to the src directory
var startServer = function (done) {

	// Make sure this feature is activated before running
	if (!settings.reload) return done();

	// Initialize BrowserSync
	browserSync.init({
		server: {
			baseDir: paths.reload
		},
	    openBrowserAtStart: true,
	    // requires above to be true; allows non-default browser to open
	    browser: [
	      'Google Chrome',
	    ],
	    // Tunnel the Browsersync server through a random Public URL
	    // -> http://randomstring23232.localtunnel.me
	    tunnel: false,
	    reloadDelay: 50,
	    reloadDebounce: 750,
	    rewriteRules: [],
	});

	// Signal completion
	done();

};

// Reload the browser when files change
var reloadBrowser = function (done) {
	if (!settings.reload) return done();
	browserSync.reload();
	done();
};

// Watch for changes
var watchSource = function (done) {
	watch(paths.input, series(exports.watch, reloadBrowser));
	done();
};


/**
 * Export Tasks
 */

// Default task
// gulp
exports.default = series(
	cleanDist,
	parallel(
		buildScripts,
		buildTemplates,
		lintScripts,
		buildStyles,
		buildSVGs,
		optimizeImg,
		copyFiles
	),
	startServer,
	watchSource
);

// Watch and reload
// gulp watch
exports.watch = series(
	parallel(
		buildScripts,
		buildTemplates,
		lintScripts,
		buildStyles
	)
);

// Watch and reload
// gulp build
exports.build = series(
	cleanDist,
	parallel(
		buildScripts,
		buildTemplates,
		lintScripts,
		buildStyles,
		buildSVGs,
		optimizeImg,
		copyFiles
	)
);