/**
 * methods page
 */

( function( window ) {

'use strict';

var PS = window.PS;

// --------------------------  -------------------------- //

var defView = document.defaultView;

var getStyle = defView && defView.getComputedStyle ?
  function( elem ) {
    return defView.getComputedStyle( elem, null );
  } :
  function( elem ) {
    return elem.currentStyle;
  };


// --------------------------  -------------------------- //

PS.indexFoo = function() {

  // ----- scroll stuff ----- //

  ( function() {
    var pageNav = document.querySelector('#page-nav');
    var isAtTop = true;
    // add initial class
    var style = getStyle( pageNav );
    if ( style.position === 'absolute' || style.position === 'fixed' ) {
      classie.add( pageNav, 'is-at-top' );
    }
    // only add scroll event if fixed
    if ( style.position !== 'fixed' ) {
      return;
    }

    var navY = getSize( pageNav ).height / 2 + parseInt( style.top, 10 );
    var installHeader = document.querySelector('#install');
    var contentY = installHeader.getBoundingClientRect().top;

    var scrollTimeout;

    // debounce scroll
    eventie.bind( window, 'scroll', function() {
      if ( scrollTimeout ) {
        clearTimeout( scrollTimeout );
      }
      scrollTimeout = setTimeout( onDebounceScroll, 100 );
    });

    function onDebounceScroll() {
      var wasAtTop = isAtTop;
      isAtTop = window.scrollY + navY < contentY;
      if ( isAtTop !== wasAtTop ) {
        classie[ isAtTop ? 'add' : 'remove' ]( pageNav, 'is-at-top' );
      }
    }
  })();

};

})( window );