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
  var what = document.querySelector('.what-is-packery');
  var contentY = what.getBoundingClientRect().top + window.pageYOffset;

  var scrollTimeout;

  // debounce scroll
  function onDebounceScroll() {
    var isAtTop = window.pageYOffset + navY < contentY;
    if ( ( isAtTop && wasAtTop === null ) || isAtTop != wasAtTop ) {
      pageNav.classList[ isAtTop ? 'add' : 'remove' ]('is-at-top');
    }
    wasAtTop = isAtTop;
  }

  onDebounceScroll();

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
