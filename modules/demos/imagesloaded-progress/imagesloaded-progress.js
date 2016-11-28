/**
 * imagesloaded-progress
 */

PackeryDocs['imagesloaded-progress'] = function( elem ) {
  'use strict';

  // init Isotope
  var pckry = new Packery( elem, {
    percentPosition: true
  });
  
  // layout Packery after each image loads
  imagesLoaded( elem ).on( 'progress', function() {
    pckry.layout();
  });

};
