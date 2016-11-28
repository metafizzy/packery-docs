PackeryDocs['remove-complete'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var pckry = new Packery( grid );

  filterBindEvent( grid, 'click', '.grid-item', function( event ) {
    // remove clicked element
    pckry.remove( event.target );
    // layout remaining item elements
    pckry.shiftLayout();
  });

  pckry.on( 'removeComplete', function() {
    PackeryDocs.notify('Packery removed item');
  });

};
