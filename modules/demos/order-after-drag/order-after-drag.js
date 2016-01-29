PD.modules['order-after-drag'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var pckry = new Packery( grid, {
    columnWidth: 100
  });

  pckry.getItemElements().forEach( function( itemElem ) {
    var draggie = new Draggabilly( itemElem );
    pckry.bindDraggabillyEvents( draggie );
  });

  // show item order after layout
  function orderItems() {
    pckry.getItemElements().forEach( function( itemElem, i ) {
      itemElem.textContent = i + 1;
    });
  }

  pckry.on( 'layoutComplete', orderItems );
  pckry.on( 'dragItemPositioned', orderItems );

};
