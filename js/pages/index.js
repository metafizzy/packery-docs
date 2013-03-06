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
    item.style.width =  Math.round( Math.random() * Math.random() * 80 + 20 ) + 'px';
    item.style.height = Math.round( Math.random() * Math.random() * 80 + 20 ) + 'px';
  }
  return item;
}

/**
 * add items to a Packery
 * keep doing it until it's full
 */
function addItems( pckry, maxY, isRando ) {
  // stop after packery reaches height
  // console.log(pckry.maxY);
  if ( pckry.maxY > maxY ) {
    return;
  }
  var fragment = document.createDocumentFragment();
  var items = [];
  for ( var i=0; i < 4; i++ ) {
    var item = getItem( isRando );
    items.push( item );
    fragment.appendChild( item );
    // var draggie = new Draggabilly( item );
    // pckry.bindDraggabillyEvents( draggie );
  }

  pckry.element.appendChild( fragment );
  pckry.appended( items );
  // do it again
  setTimeout( function() {
    addItems( pckry, maxY, isRando );
  }, 40 );

}

PS.index = function() {

  var gridElem = document.querySelector('#grid-packery');
  var gridPckry = new Packery( gridElem, {
    columnWidth: 50,
    rowHeight: 50,
    gutter: 4
  });

  // addItems( gridPckry, false );

  var randoElem = document.querySelector('#rando-packery');
  var randoPckry = new Packery( randoElem, {
    gutter: 4
  });

  // addItems( randoPckry, true );

  var hero = document.querySelector('#hero');
  var heroPackryElem = hero.querySelector('#hero .packery');
  var heroPckry = new Packery( heroPackryElem, {
    itemSelector: '.item',
    placedElements: '.placed',
    gutter: 4,
    containerStyle: {}
  });

  addItems( heroPckry, hero.offsetHeight + 40, true );

};

})( window );