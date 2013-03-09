/**
 * draggable page
 */

( function( window ) {

'use strict';

var PS = window.PS;

PS.draggable = function() {

  ( function() {
    var container = document.querySelector('#draggabilly-demo .packery');
    var itemElems = container.querySelectorAll('.item');
    var pckry = new Packery( container, {
      columnWidth: 80,
      rowHeight: 80
    });
    // for each item element
    for ( var i=0, len = itemElems.length; i < len; i++ ) {
      var elem = itemElems[i];
      // make element draggable with Draggabilly
      var draggie = new Draggabilly( elem );
      // bind Draggabilly events to Packery
      pckry.bindDraggabillyEvents( draggie );
    }
  })();

};

})( window );
