PackeryDocs['animate-item-size'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var pckry = new Packery( grid );

  filterBindEvent( grid, 'click', '.animate-item-size-item__content', function( event ) {
    var itemElem = event.target.parentNode;
    var isExpanded = itemElem.classList.contains('is-expanded');
    itemElem.classList.toggle('is-expanded');
    if ( isExpanded ) {
      // if shrinking, shiftLayout
      pckry.shiftLayout();
    } else {
      // if expanding, fit it
      pckry.fit( itemElem );
    }
  });

};
