/*
 *  Honey.js file builder/watcher
 *  inspried from: https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
 */
'use strict';

// init all the requires
var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var concat = require('gulp-concat-sourcemap');
var fs = require('fs');

// init all the constants
var ENTRY_POINT = './app.js';
var LIB_NAME = 'libs.js';
var DEST = './dist';
var BUNDLE_NAME = 'bundle.js';

// add custom browserify options here
var customOpts = {
  entries: [ENTRY_POINT],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

gulp.task('default', ['js']);
gulp.task('js', bundle); // so you can run `gulp js` to build the file
//gulp.task('libs', generateCommon );

// add transformations here
// i.e. b.transform(coffeeify);
b.transform('folderify');
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function getDeps() {
   var readFiles = fs.readFileSync('./package.json', 'utf-8')
       , files = JSON.parse( readFiles ).browser;

   return Object.keys( files ).map(function(el) {
        return files[ el ];
   });
} // get the dependencies from package.json

function generateCommon() {
    gulpSmartSrc(
        getDeps()
    ).pipe(
        concat( LIB_NAME )
    ).pipe(
        gulp.dest( DEST )
    );
} // generate the common js files lib

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source( BUNDLE_NAME ))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest( DEST ));
} // bundle


