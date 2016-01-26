PD.modules['page-nav'] = function( elem ) {
  'use strict';

  // only do on index page
  if ( !document.body.classList.contains('index-page') ) {
    return;
  }

  var pageNav = elem;
  var wasAtTop = null;
  // add initial class
  var style = getComputedStyle( pageNav );

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
  function onDebounceScroll() {
    var isAtTop = window.pageYOffset + navY < contentY;
    if ( ( isAtTop && wasAtTop === null ) || isAtTop != wasAtTop ) {
      pageNav.classList[ isAtTop ? 'add' : 'remove' ]('is-at-top');
    }
    wasAtTop = isAtTop;
  }

  // only add scroll event if fixed
  if ( style.position == 'fixed' ) {
    window.addEventListener( 'scroll', function() {
      if ( scrollTimeout ) {
        clearTimeout( scrollTimeout );
      }
      scrollTimeout = setTimeout( onDebounceScroll, 100 );
    });
  }

};
