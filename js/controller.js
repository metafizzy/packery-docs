/*!
 * Packery site scripts
 */

( function( window ) {

'use strict';

// global namespace, PS = Packery Site
var PS = window.PS = {};
// hash of page controllers
PS.pages = {};

// ----- dependencies ----- //

var docListener = window.docListener;

// -------------------------- page controller -------------------------- //

docListener.on( 'ready', function() {
  // get name of page
  var pageAttr = document.body.getAttribute('data-page');
  // trigger controller if there
  if ( typeof PS[ pageAttr ] === 'function' ) {
    PS[ pageAttr ]();
  }

  // ----- side bar lil packery ----- //

  var isRando = Math.random() > 0.5;
  var navContainer = document.querySelector('#site-nav .packery');
  var navPckry = new Packery( navContainer, {
    itemSelector: '.item',
    columnWidth: isRando ? 0 : 20,
    rowHeight: isRando ? 0 : 20,
    gutter: 4,
    isResizable: false
  });
  var itemCount = 0;
  var maxY = isRando ? 115 : 125;
  var maxCount = isRando ? 1000 : 16;
  function addItem() {
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
    navContainer.appendChild( item );
    var draggie = new Draggabilly( item );
    navPckry.bindDraggabillyEvents( draggie );
    navPckry.appended( item );
    itemCount++;
    // add another item
    if ( navPckry.maxY < maxY && itemCount < maxCount ) {
      setTimeout( addItem, 40 );
    }
  }
  addItem();

});



// -------------------------- helpers -------------------------- //

PS.getSomeItemElements = function() {
  var fragment = document.createDocumentFragment();
  var items = [];
  for ( var i=0; i < 3; i++ ) {
    var item = document.createElement('div');
    var wRand = Math.random();
    var widthClass = wRand > 0.85 ? 'w4' :
      wRand > 0.7 ? 'w2' : '';
    var hRand = Math.random();
    var heightClass = hRand > 0.85 ? 'h4' :
      hRand > 0.7 ? 'h2' : '';
    item.className = 'item ' + widthClass + ' ' + heightClass;
    fragment.appendChild( item );
    items.push( item );
  }
  // ex7.appendChild( fragment );
  // return
};

})( window );
