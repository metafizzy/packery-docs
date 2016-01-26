PD.modules['hero-demos'] = function( elem ) {
  'use strict';

  var masonryPackery = new Packery( '.hero-demos__grid--masonry', {
    itemSelector: '.hero-demos__grid__item',
    gutter: '.hero-demos__grid__masonry-gutter-sizer'
  });

  var dashPackery = new Packery( '.hero-demos__grid--dash', {
    itemSelector: '.hero-demos__grid__item',
    gutter: 8,
    columnWidth: '.hero-demos__grid__dash-grid-sizer',
    rowHeight: 80
  });

  addDraggies( masonryPackery );
  addDraggies( dashPackery );

  function addDraggies( pckry ) {
    pckry.getItemElements().forEach( function( itemElem ) {
      var draggie = new Draggabilly( itemElem );
      pckry.bindDraggabillyEvents( draggie );
    });
  }

};
