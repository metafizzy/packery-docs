# Packery Docs

Documentation for Packery, the bin-packing layout library.

This project does _not_ include the source for Packery. That's over in [github.com/desandro/packery](https://github.com/desandro/packery).

## Build

Building these docs requires [Bower](https://bower.io), [Gulp](https://gulpjs.com) and [npm](https://www.npmjs.com).

``` bash
npm install
bower install
gulp
```

This will build the docs in `build/`.

Watch for updates to rebuild docs on the fly.

``` bash
gulp watch
```

Run `gulp watch-dev` to build the site with JS and CSS files included separately, un-concatenated, and un-minified.

``` bash
gulp watch-dev
```
