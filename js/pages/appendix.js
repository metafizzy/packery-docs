/**
 * appendix page
 */

( function( window ) {

'use strict';

var PS = window.PS;

var transitionProp = getStyleProperty('transition');
var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'otransitionend',
  transition: 'transitionend'
}[ transitionProp ];

// -------------------------- faq -------------------------- //

PS.appendix = function() {

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

  // ----- animate item size responsive ----- //

  ( function() {
    var container = document.querySelector('#animate-item-size-responsive .packery');
    var pckry = new Packery( container );

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item content was not clicked on
      var target = event.target;
      if ( !classie.has( target, 'item-content' )  ) {
        return;
      }

      var previousContentSize = getSize( target );
      // disable transition
      target.style[ transitionProp ] = 'none';
      // set current size
      target.style.width = previousContentSize.width + 'px';
      target.style.height = previousContentSize.height + 'px';

      var itemElem = target.parentNode;
      var isExpanded = classie.has( itemElem, 'is-expanded' );
      classie.toggleClass( itemElem, 'is-expanded' );

      // force redraw
      var redraw = target.offsetWidth;
      // renable default transition
      target.style[ transitionProp ] = '';

      // reset 100%/100% sizing after transition end
      if ( transitionProp ) {
        var onTransitionEnd = function() {
          target.style.width = '';
          target.style.height = '';
          target.removeEventListener( transitionEndEvent, onTransitionEnd, false );
        };
        target.addEventListener( transitionEndEvent, onTransitionEnd, false );
      }

      // set new size
      var size = getSize( itemElem );
      target.style.width = size.width + 'px';
      target.style.height = size.height + 'px';
      redraw = null; // for JSHint

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
