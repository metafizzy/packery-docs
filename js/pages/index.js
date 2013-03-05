/**
 * methods page
 */

( function( window ) {

'use strict';

function getItem( isRando ) {
  var item = document.createElement('div');
  var wRand = Math.random();
  var widthClass = wRand > 0.9 ? 'w4' :
    wRand > 0.7 ? 'w2' : '';
  var hRand = Math.random();
  var heightClass = hRand > 0.7 ? 'h2' : '';
  item.className = 'item ' + widthClass + ' ' + heightClass;
  // random sizing
  if ( isRando ) {
    item.style.width = Math.random() * Math.random() * 60 + 16 + 'px';
    item.style.height = Math.random() * Math.random() * 60 + 16 + 'px';
  }
  return item;
}

PS.index = function() {

  var gridElem = document.querySelector('#grid-packery');
  var gridPckry = new Packery( gridElem, {
    columnWidth: 40,
    rowHeight: 40,
    gutter: 4
  });

  function addGridItems() {
    if ( gridPckry.maxY > 350 ) {
      return;
    }
    var fragment = document.createDocumentFragment();
    var items = [];
    for ( var i=0; i < 1; i++ ) {
      var item = getItem();
      items.push( item );
      fragment.appendChild( item );
      var draggie = new Draggabilly( item );
      gridPckry.bindDraggabillyEvents( draggie );
    }

    gridElem.appendChild( fragment );
    gridPckry.appended( items );
    setTimeout( addGridItems, 40 );
  }

  addGridItems();

};

})( window );