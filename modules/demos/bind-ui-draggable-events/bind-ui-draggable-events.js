PackeryDocs['bind-ui-draggable-events'] = function( elem ) {
  'use strict';

  var $grid = $( elem.querySelector('.grid') ).packery({
    columnWidth: 100
  });

  // make all items draggable
  var $items = $grid.find('.grid-item').draggable();
  // bind drag events to Packery
  $grid.packery( 'bindUIDraggableEvents', $items );

};
