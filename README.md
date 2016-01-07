# hsla
A really simple immutable hsla manipulation library

[![stability-unstable](https://img.shields.io/badge/stability-unstable-yellow.svg)][stability]
[![circleci](https://circleci.com/gh/orangemug/hsla.png?style=shield)][circleci]
[![Dependency Status](https://david-dm.org/orangemug/hsla.svg)][dm-prod]
[![Dev Dependency Status](https://david-dm.org/orangemug/hsla/dev-status.svg)][dm-dev]

[stability]: https://github.com/orangemug/stability-badges#unstable
[circleci]:  https://circleci.com/gh/orangemug/hsla
[dm-prod]:   https://david-dm.org/orangemug/hsla
[dm-dev]:    https://david-dm.org/orangemug/hsla#info=devDependencies


## Install
To install

    npm i git://github.com/orangemug/hsla.git --save


## Usage
The API provides

Chainable functions

    lighten(int:percent)
    darken(int:percent)
    saturate(int:percent)
    desaturate(int:percent)
    alpha(Number:alpha)
    rotate(int:degrees)
    clone()

Chain ending functions

    triadic(int:degreesOfSpread)
    analogous(int:degreesOfSpread)
    opposite()
    toString()
    toJSON()


## Examples

```js
var hsla = require("hsla");

var color = hsla(120, 100, 50, 1) // green;
  .alpha(0.5)
  .lighten(20)
  .toString()

assert.equal(color, "hsla(120, 100%, 70%, 0.5)");
```


## Why HSL?
Read [here](http://www.useragentman.com/blog/2010/08/28/coding-colors-easily-using-css3-hsl-notation) to find out more


## Test
To test run

    npm test


## License
[MIT](LICENSE)
