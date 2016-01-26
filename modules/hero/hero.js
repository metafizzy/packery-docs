PD.modules.hero = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.hero__grid');
  var pckry = new Packery( grid, {
    itemSelector: '.hero__grid__item',
    stamp: '.hero__grid__stamp',
    gutter: 2,
    containerStyle: null
  });

  addItems( pckry, elem.offsetHeight + 40 );

  /**
   * add items to a Packery
   * keep doing it until it's full
   */
  function addItems( pckry, maxY ) {
    // stop after packery reaches height
    if ( pckry.maxY > maxY ) {
      return;
    }
    var fragment = document.createDocumentFragment();
    var items = [];
    for ( var i=0; i < 4; i++ ) {
      var item = getItem();
      items.push( item );
      fragment.appendChild( item );
    }

    pckry.element.appendChild( fragment );
    pckry.appended( items );
    // do it again
    setTimeout( function() {
      addItems( pckry, maxY );
    }, 40 );
  }

  function getItem() {
    var item = document.createElement('div');
    item.className = 'hero__grid__item';
    item.style.width =  Math.round( Math.random() * Math.random() * 110 + 20 ) + 'px';
    item.style.height = Math.round( Math.random() * Math.random() * 90 + 20 ) + 'px';
    return item;
  }

};
