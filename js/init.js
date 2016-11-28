/* globals PackeryDocs, FizzyDocs */

( function() {

var elems = document.querySelectorAll('[data-js]');
for ( var i=0; i < elems.length; i++ ) {
  var elem = elems[i];
  var attr = elem.getAttribute('data-js');
  var module = PackeryDocs[ attr ] || FizzyDocs[ attr ];
  if ( module ) {
    module( elem );
  }
}

})();
