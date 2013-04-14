/**
 * faq page
 */

( function( window ) {


'use strict';

var PS = window.PS;

PS.faq = function() {

  // ----- animate item size ----- //

  ( function() {
    var container = document.querySelector('#animate-item-size .packery');
    var pckry = new Packery( container );

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item content was not clicked on
      var target = event.target;
      if ( !classie.has( target, 'item-content' )  ) {
        return;
      }
      var itemElem = target.parentNode;
      var isExpanded = classie.has( itemElem, 'is-expanded' );
      classie.toggleClass( itemElem, 'is-expanded' );

      if ( isExpanded ) {
        // if shrinking, just layout
        pckry.layout();
      } else {
        // if expanding, fit it
        pckry.fit( itemElem );
      }
    });
  })();

};

})( window );
