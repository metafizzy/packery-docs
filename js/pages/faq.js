/**
 * faq page
 */

( function( window ) {

'use strict';

var PS = window.PS;

// ----- text helper ----- //

var docElem = document.documentElement;
var textSetter = docElem.textContent !== undefined ? 'textContent' : 'innerText';

function setText( elem, value ) {
  elem[ textSetter ] = value;
}

// -------------------------- faq -------------------------- //

PS.faq = function() {

  // ----- order after drag ----- //

  ( function() {
    var container = document.querySelector('#order-after-drag-demo .packery');
    var pckry = new Packery( container, {
      columnWidth: 80,
      rowHeight: 80
    });
    var itemElems = pckry.getItemElements();
    // for each item element
    for ( var i=0, len = itemElems.length; i < len; i++ ) {
      var elem = itemElems[i];
      // make element draggable with Draggabilly
      var draggie = new Draggabilly( elem );
      // bind Draggabilly events to Packery
      pckry.bindDraggabillyEvents( draggie );
    }


    // show item order after layout
    function orderItems() {
      var itemElems = pckry.getItemElements();
      for ( var i=0, len = itemElems.length; i < len; i++ ) {
        var elem = itemElems[i];
        setText( elem, i + 1 );
      }
    }

    pckry.on( 'layoutComplete', orderItems );
    pckry.on( 'dragItemPositioned', orderItems );
  })();

};

})( window );
