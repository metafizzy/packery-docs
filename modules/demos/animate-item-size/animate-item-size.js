PD.modules['animate-item-size'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var pckry = new Packery( grid );

  filterBindEvent( grid, 'click', '.animate-item-size-item__content', function( event ) {
    event.target.parentNode.classList.toggle('is-expanded');
    pckry.shiftLayout();
  });

};
