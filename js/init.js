( function() {

'use strict';


var elems = document.querySelectorAll('[data-js]');
for ( var i=0; i < elems.length; i++ ) {
  var elem = elems[i];
  var attr = elem.getAttribute('data-js');
  var method = PD.modules[ attr ];
  if ( method ) {
    method( elem );
  }
}

})();
