var gulp = require('gulp');
var fs = require('fs');
var rename = require('gulp-rename');
var gulpFilter = require('gulp-filter');
var frontMatter = require('gulp-front-matter');

var pageNav = require('./utils/page-nav');
var highlightCodeBlock = require('./utils/highlight-code-block');
var build = require('./utils/build');

var contentSrc = [
  'content/*.html',
  'content/*.mustache'
];

var pageTemplateSrc = 'templates/page.mustache';

function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

module.exports = function( site ) {

  function buildContent( dataOptions ) {
    dataOptions = dataOptions || {};
    var pageTemplate = fs.readFileSync( pageTemplateSrc, 'utf8' );
    // exclude 404 if export
    var filterQuery = dataOptions.is_export ? [ '*', '!**/404.*'] : '*';

    // gulp task
    return function() {
      var data = extend( site.data, dataOptions );
      data.source_url_path = data.is_export ? '' :
        'https://cdnjs.cloudflare.com/ajax/libs/packery/' + data.packery_version + '/';

      var filter = gulpFilter( filterQuery );

      var buildOptions = {
        layout: pageTemplate,
        partials: site.partials
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

};
