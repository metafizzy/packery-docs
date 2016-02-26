PD.modules['drag-hero-demos'] = function( elem ) {
  'use strict';

  var masonryGrid = elem.querySelector('.drag-hero-demos__grid--masonry');
  var masonryPackery = new Packery( masonryGrid, {
    itemSelector: '.drag-hero-demos__item',
    columnWidth: '.drag-hero-demos__grid__masonry-grid-sizer',
    gutter: '.drag-hero-demos__grid__masonry-gutter-sizer',
    percentPosition: true
  });

  var dashGrid = elem.querySelector('.drag-hero-demos__grid--dash');
  var dashPackery = new Packery( dashGrid, {
    itemSelector: '.drag-hero-demos__item',
    gutter: 8,
    columnWidth: '.drag-hero-demos__grid__dash-grid-sizer',
    rowHeight: 80,
    percentPosition: true
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
