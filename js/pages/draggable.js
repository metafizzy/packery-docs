/**
 * draggable page
 */

( function( window ) {

'use strict';

var PS = window.PS;
var $ = window.jQuery;

PS.draggable = function() {

  // ----- draggabilly ----- //

  ( function() {
    var container = document.querySelector('#draggabilly-demo .packery');
    var pckry = new Packery( container, {
      columnWidth: 80,
      rowHeight: 80
    });

    var itemElems = pckry.getItemElements();
    // for each item...
    for ( var i=0, len = itemElems.length; i < len; i++ ) {
      var elem = itemElems[i];
      // make element draggable with Draggabilly
      var draggie = new Draggabilly( elem );
      // bind Draggabilly events to Packery
      pckry.bindDraggabillyEvents( draggie );
    }
  })();

  // ----- jquery ui draggable ----- //

  ( function() {
    var $container = $('#ui-draggable-demo .packery');
    $container.packery({
      columnWidth: 80,
      rowHeight: 80
    });

    var $itemElems = $( $container.packery('getItemElements') );
    // make item elements draggable
    $itemElems.draggable();
    // bind Draggable events to Packery
    $container.packery( 'bindUIDraggableEvents', $itemElems );
  })();

  // ----- non-grid ----- //

  ( function() {
    var container = document.querySelector('#non-grid-demo .packery');
    var pckry = new Packery( container );

    var itemElems = pckry.getItemElements();
    for ( var i=0, len = itemElems.length; i < len; i++ ) {
      var elem = itemElems[i];
      // make element draggable with Draggabilly
      var draggie = new Draggabilly( elem );
      // bind Draggabilly events to Packery
      pckry.bindDraggabillyEvents( draggie );
    }
  })();

  // ----- grid demo ----- //

  ( function() {
    var container = document.querySelector('#grid-demo .packery');
    var pckry = new Packery( container, {
      columnWidth: 80,
      rowHeight: 80
    });

    var itemElems = pckry.getItemElements();
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
