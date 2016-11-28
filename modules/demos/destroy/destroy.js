PackeryDocs.destroy = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');
  // init Packery
  var pckry = new Packery( grid );
  var isActive = true;

  var toggleButton = elem.querySelector('.toggle-button');

  toggleButton.addEventListener( 'click', function() {
    if ( isActive ) {
      pckry.destroy();
    } else {
      // re-initialize
      pckry = new Packery( grid );
    }
    // set flag
    isActive = !isActive;
  });

};
