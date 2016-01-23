var fs = require('fs');
var gulp = require('gulp');
var gulpFilter = require('gulp-filter');
var Handlebars = require('handlebars');

// ----- site ----- //

// stuff used across tasks
var site = {
  // templating data
  data: {
    isDev: process.argv[2] == 'dev'
  },
  // src to watch, tasks to trigger
  watches: [],
  watch: function( src, tasks ) {
    site.watches.push( [ src, tasks ] );
  }

};

// ----- prod assets ----- //

gulp.task( 'fonts', function() {
  return gulp.src( 'fonts/*.*', { base: '.' } )
    .pipe( gulp.dest('build') );
});

gulp.task( 'assets', function() {
  return gulp.src('assets/**/*.*')
    .pipe( gulp.dest('build') );
});

// copy prod assets
gulp.task( 'prod-assets', [ 'fonts', 'assets' ] );

// ----- dist ----- //

// copy packery dist to build/
gulp.task( 'dist', function() {
  gulp.src( 'bower_components/packery/dist/*.*' )
    .pipe( gulp.dest('build') );
});

// ----- tasks ----- //

require('./tasks/hint')( site );
require('./tasks/js')( site );
require('./tasks/css')( site );
require('./tasks/data')( site );

// ----- data ----- //

// add all data/*.json to siteData
// file.json => siteData.file: {json}
var siteData = {
  // get packery version from its bower.json
  packery_version: JSON.parse( fs.readFileSync('bower_components/packery/bower.json') ).version
};



// ----- content ----- //

var contentSrc = [
  'content/*.html',
  'content/*.mustache'
];
var highlightCodeBlock = require('./tasks/highlight-code-block');
var build = require('./tasks/build');
var frontMatter = require('gulp-front-matter');
// var gulpFilter = require('gulp-filter');
var path = require('path');
var through2 = require('through2');

var partialsSrc = 'templates/partials/*.*';
var partials = [];

gulp.task( 'partials', function() {
  var addPartial = through2.obj( function( file, enc, callback ) {
    partials.push({
      name: path.basename( file.path, path.extname( file.path ) ),
      tpl: file.contents.toString()
    });
    this.push( file );
    callback();
  });

  return gulp.src( partialsSrc )
    .pipe( addPartial );
});

// ----- buildContent ----- //

var rename = require('gulp-rename');
var pageNav = require('./tasks/page-nav');
var gulpFilter = require('gulp-filter');

var pageTemplateSrc = 'templates/page.mustache';

function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

function buildContent( dataOptions ) {
  dataOptions = dataOptions || {};
  var pageTemplate = fs.readFileSync( pageTemplateSrc, 'utf8' );
  // exclude 404 if export
  var filterQuery = dataOptions.is_export ? [ '*', '!**/404.*'] : '*';

  // gulp task
  return function() {
    var data = extend( siteData, dataOptions );
    data.source_url_path = data.is_export ? '' :
      'https://cdnjs.cloudflare.com/ajax/libs/packery/' + data.packery_version + '/';
    // HACK, wait on cdnjs to update
    // data.source_url_path = '';
    var filter = gulpFilter( filterQuery );

    var buildOptions = {
      layout: pageTemplate,
      partials: partials
    };

    gulp.src( contentSrc )
      .pipe( filter )
      .pipe( frontMatter({
        property: 'frontMatter',
        remove: true
      }) )
      .pipe( build( data, buildOptions ) )
      .pipe( highlightCodeBlock() )
      .pipe( pageNav() )
      .pipe( rename({ extname: '.html' }) )
      .pipe( gulp.dest('build') );
  };
}

var dependencyTasks = [ 'partials', 'data' ];

gulp.task( 'content', dependencyTasks, buildContent() );

gulp.task( 'content-dev', dependencyTasks, buildContent({ is_dev: true }) );

gulp.task( 'content-export', dependencyTasks, buildContent({ is_export: true }) );

// ----- default ----- //

gulp.task( 'default', [
  'hint',
  'content',
  'js',
  'css',
  'dist',
  'prod-assets'
] );

// ----- dev ----- //

gulp.task( 'dev', [
  'hint',
  'content-dev'
] );

// ----- export ----- //

// version of site used in packery-docs.zip

gulp.task( 'export', [
  'hint',
  'content-export',
  'js',
  'css',
  'dist'
] );

// ----- watch ----- //

gulp.task( 'watch', [ 'default' ], function() {
  gulp.watch( contentSrc, [ 'content' ] );
  gulp.watch( partialsSrc, [ 'content' ] );
  gulp.watch( pageTemplateSrc, [ 'content' ] );
  gulp.watch( 'css/*.css', [ 'css' ] );
});


gulp.task( 'watch-dev', [ 'dev' ], function() {
  gulp.watch( contentSrc, [ 'content-dev' ] );
  gulp.watch( partialsSrc, [ 'content-dev' ] );
  gulp.watch( pageTemplateSrc, [ 'content-dev' ] );
});
