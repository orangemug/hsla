# hsla
A really simple immutable hsla manipulation library

[![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg)][stability]
[![circleci](https://circleci.com/gh/orangemug/hsla.png?style=shield)][circleci]
[![Dependency Status](https://david-dm.org/orangemug/hsla.svg)][dm-prod]
[![Dev Dependency Status](https://david-dm.org/orangemug/hsla/dev-status.svg)][dm-dev]

[stability]: https://github.com/orangemug/stability-badges#work-in-progress
[circleci]:  https://circleci.com/gh/orangemug/hsla
[dm-prod]:   https://david-dm.org/orangemug/hsla
[dm-dev]:    https://david-dm.org/orangemug/hsla#info=devDependencies


## Install
To install

    npm i git://github.com/orangemug/hsla.git --save


## Usage
The API provides

Chainable functions

    lighten
    darken
    saturate
    desaturate
    alpha
    rotate
    clone

Chain ending functions

    triadic
    analogous
    opposite
    toString
    toJSON


## Examples

```js
var color = hsla(120, 100, 50, 1) // green;
  .alpha(0.5)
  .lighten(20)
  .toString()

assert.equal(color.toString(), "hsla(120, 100%, 70%, 0.5)");
```


## Test
To test run

    npm test


## License
[MIT](LICENSE)
