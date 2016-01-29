PD.modules['fit-complete'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var pckry = new Packery( grid, {
    columnWidth: 60
  });

  filterBindEvent( grid, 'click', '.grid-item', function( event ) {
    pckry.fit( event.target, 120, 60 );
  });

  pckry.on( 'fitComplete', function() {
    PD.notify('Packery fit complete');
  });

  elem.querySelector('.layout-button').addEventListener( 'click', function() {
    pckry.layout();
  });

};
