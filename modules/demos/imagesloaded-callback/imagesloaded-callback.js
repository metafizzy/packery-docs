/**
 * imagesloaded-callback
 */

PD.modules['imagesloaded-callback'] = function( elem ) {
  'use strict';

  imagesLoaded( elem, function() {
    new Packery( elem, {
      percentPosition: true
    });
  });

};
