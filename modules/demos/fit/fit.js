PD.modules.fit = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var pckry = new Packery( grid, {
    columnWidth: 60
  });

  filterBindEvent( grid, 'click', '.grid-item', function( event ) {
    event.target.classList.toggle('grid-item--large');
    var isLarge = event.target.classList.contains('grid-item--large');
    if ( isLarge ) {
      pckry.fit( event.target );
    } else {
      pckry.shiftLayout();
    }
  });

};
