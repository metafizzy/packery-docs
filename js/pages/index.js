/**
 * methods page
 */

( function( window ) {

'use strict';

var PS = window.PS;

/**
 * create and return an item element
 * @returns {Element} item
 */
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
    item.style.width =  Math.round( Math.random() * Math.random() * 130 + 35 ) + 'px';
    item.style.height = Math.round( Math.random() * Math.random() * 130 + 35 ) + 'px';
  }
  return item;
}

/**
 * add items to a Packery
 * keep doing it until it's full
 */
function addItems( pckry, isRando ) {
  // stop after packery reaches height
  if ( pckry.maxY > 260 ) {
    return;
  }
  var fragment = document.createDocumentFragment();
  var items = [];
  for ( var i=0; i < 1; i++ ) {
    var item = getItem( isRando );
    items.push( item );
    fragment.appendChild( item );
    var draggie = new Draggabilly( item );
    pckry.bindDraggabillyEvents( draggie );
  }

  pckry.element.appendChild( fragment );
  pckry.appended( items );
  // do it again
  setTimeout( function() {
    addItems( pckry, isRando );
  }, 40 );

}

PS.index = function() {

  var gridElem = document.querySelector('#grid-packery');
  var gridPckry = new Packery( gridElem, {
    columnWidth: 50,
    rowHeight: 50,
    gutter: 4
  });

  addItems( gridPckry, false );

  var randoElem = document.querySelector('#rando-packery');
  var randoPckry = new Packery( randoElem, {
    gutter: 4
  });

  addItems( randoPckry, true );

};

})( window );