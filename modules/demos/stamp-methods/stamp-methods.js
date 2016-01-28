PD.modules['stamp-methods'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var pckry = new Packery( grid, {
    itemSelector: '.grid-item'
  });

  var stampElem = grid.querySelector('.stamp');
  var isStamped = false;

  var stampButton = elem.querySelector('.stamp-button');

  stampButton.addEventListener( 'click', function() {
    // stamp or unstamp element
    if ( isStamped ) {
      pckry.unstamp( stampElem );
    } else {
      pckry.stamp( stampElem );
    }
    // trigger layout
    pckry.layout();
    isStamped = !isStamped;
  });

};
