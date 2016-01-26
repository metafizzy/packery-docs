PD.modules['page-nav'] = function( elem ) {
  'use strict';

  // only do on index page
  if ( !document.body.classList.contains('index-page') ) {
    return;
  }

  var pageNav = elem;
  var isAtTop = null;
  // add initial class
  var style = getComputedStyle( pageNav );

  // only add scroll event if fixed
  if ( style.position !== 'fixed' ) {
    return;
  }

  var navY = pageNav.offsetHeight / 2 + parseInt( style.top, 10 );
  var installHeader = document.querySelector('#install');
  var contentY;
  function getContentY() {
    contentY = installHeader.getBoundingClientRect().top + window.pageYOffset;
  }
  // measure again after packery init
  setTimeout( getContentY, 200 );
  setTimeout( onDebounceScroll, 210 );

  var scrollTimeout;

  // debounce scroll
  window.addEventListener( 'scroll', function() {
    if ( scrollTimeout ) {
      clearTimeout( scrollTimeout );
    }
    scrollTimeout = setTimeout( onDebounceScroll, 100 );
  });

  function onDebounceScroll() {
    var wasAtTop = isAtTop;
    isAtTop = window.pageYOffset + navY < contentY;
    if ( ( isAtTop && wasAtTop === null ) || isAtTop != wasAtTop ) {
      pageNav.classList[ isAtTop ? 'add' : 'remove' ]('is-at-top');
    }
  }

};
