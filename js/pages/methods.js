( function() {

var PS = window.PS;

function getItemElement() {
  var elem = document.createElement('div');
  var wRand = Math.random();
  var hRand = Math.random();
  var widthClass = wRand > 0.85 ? 'w4' : wRand > 0.4 ? 'w2' : '';
  var heightClass = hRand > 0.85 ? 'h4' : hRand > 0.4 ? 'h2' : '';
  elem.className = 'item ' + widthClass + ' ' + heightClass;
  return elem;
}

PS.methods = function() {
  // ----- appended ----- //
  ( function() {
    var demo = document.querySelector('#appended-demo');
    var container = demo.querySelector('.packery');
    var button = demo.querySelector('button');
    var pckry = new Packery( container );

    eventie.bind( button, 'click', function() {
      // create new item elements
      var elems = [];
      var fragment = document.createDocumentFragment();
      for ( var i = 0; i < 3; i++ ) {
        var elem = getItemElement();
        fragment.appendChild( elem );
        elems.push( elem );
      }
      // append elements to container
      container.appendChild( fragment );
      // add and lay out newly appended elements
      pckry.appended( elems );
    });
  })();

  // ----- bind Draggabilly ----- //
  ( function() {
    var container = document.querySelector('#bind-draggabilly-demo');
    var itemElems = container.querySelectorAll('.item');
    var pckry = new Packery( container );
    // for each item element
    for ( var i=0, len = itemElems.length; i < len; i++ ) {
      var elem = itemElems[i];
      // make element draggable with Draggabilly
      var draggie = new Draggabilly( elem );
      // bind Draggabilly events to Packery
      pckry.bindDraggabillyEvents( draggie );
    }
  })();
  

};

})( window );
