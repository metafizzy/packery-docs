PD.modules['layout-complete'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var pckry = new Packery( grid );

  pckry.on( 'layoutComplete', function( laidOutItems ) {
    PD.notify( 'Packery layout complete on ' + laidOutItems.length + ' items' );
  });

  filterBindEvent( grid, 'click', '.grid-item', function( event ) {
    event.target.classList.toggle('grid-item--large');
    pckry.layout();
  });

};
