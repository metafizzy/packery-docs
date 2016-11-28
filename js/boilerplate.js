/* globals matchesSelector */

( function( window ) {

// global namespace
var PackeryDocs = window.PackeryDocs = {};

// ----- filterBindEvent ----- //

// adds event listener and filters for selector
window.filterBindEvent = function( elem, eventName, selector, listener ) {
  elem.addEventListener( eventName, function( event ) {
    if ( matchesSelector( event.target, selector ) ) {
      listener.call( event.target, event );
    }
  });
};

// ----- PD.getItemElement ----- //

PackeryDocs.getItemElement = function() {
  var elem = document.createElement('div');
  var wRand = Math.random();
  var hRand = Math.random();
  var widthClass = wRand > 0.8 ? 'grid-item--width3' :
    wRand > 0.6 ? 'grid-item--width2' : '';
  var heightClass = hRand > 0.8 ? 'grid-item--height3' :
    hRand > 0.5 ? 'grid-item--height2' : '';
  elem.className = 'grid-item ' + widthClass + ' ' + heightClass;
  return elem;
};

})( window );
