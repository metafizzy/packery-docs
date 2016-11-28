PackeryDocs.appended = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var pckry = new Packery( grid );

  var appendButton = elem.querySelector('.append-button');

  appendButton.addEventListener( 'click', function() {
    // create new item elements
    var items = [
      PD.getItemElement(),
      PD.getItemElement(),
      PD.getItemElement()
    ];
    // append elements to container
    var fragment = document.createDocumentFragment();
    fragment.appendChild( items[0] );
    fragment.appendChild( items[1] );
    fragment.appendChild( items[2] );
    grid.appendChild( fragment );
    // add and lay out newly appended elements
    pckry.appended( items );
  });

};
