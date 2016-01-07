/**
 * If `value` is null/undefined then return `defaultValue`
 * @private
 * @param {*} value to test
 * @param {*} defaultValue to use if default fails
 * @returns {*}
 */
function defaults(value, defaultValue) {
  if(value === undefined || value === null) {
    return defaultValue;
  } else {
    return value;
  }
}

/**
 * Clamp `value` between `min` and `max`
 * @private
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 */
function clamp(value, min, max) {
  if(value < min) {
    return min
  }
  else if(value > max) {
    return max;
  }
  else {
    return value;
  }
}

function Hsla(hue, saturation, lightness, alpha) {
  // Set defaults and validate
  this._c = {
    hue: Math.round(
      clamp(defaults(hue, 0), 0, 360)
    ),
    saturation: Math.round(
      clamp(defaults(saturation, 100), 0, 100)
    ),
    lightness: Math.round(
      clamp(defaults(lightness, 50), 0, 100)
    ),
    alpha: clamp(defaults(alpha, 1), 0, 1)
  };
}

Hsla.prototype = {
  /**
   * Set alpha of hsla
   * @param {Float} _alpha
   * @return {Hsla}
   */
  alpha: function(newAlpha) {
    var c = this._c;
    return new Hsla(c.hue, c.saturation, c.lightness, newAlpha);
  },
  lighten: function(percent) {
    var c = this._c;
    var _lightness = c.lightness + percent;
    return new Hsla(c.hue, c.saturation, _lightness, c.alpha);
  },
  darken: function(percent) {
    var c = this._c;
    var _lightness = c.lightness - percent;
    return new Hsla(c.hue, c.saturation, _lightness, c.alpha);
  },
  saturate: function(percent) {
    var c = this._c;
    var _saturation = c.saturation + percent;
    return new Hsla(c.hue, _saturation, c.lightness, c.alpha);
  },
  desaturate: function(percent) {
    var c = this._c;
    var _saturation = c.saturation - percent;
    return new Hsla(c.hue, _saturation, c.lightness, c.alpha);
  },
  rotate: function(degrees) {
    var c = this._c;
    var _hue = (c.hue + degrees) % 360;
    if(_hue < 0) _hue = 360 + _hue;
    return new Hsla(_hue, c.saturation, c.lightness, c.alpha);
  },
  triadic: function(degrees) {
    degrees = clamp(
      defaults(degrees, 60), 0, 60
    );

    var opposite = this.opposite();
    return [
      opposite.rotate(-degrees),
      this,
      opposite.rotate(+degrees)
    ];
  },
  analogous: function(degrees) {
    degrees = clamp(
      defaults(degrees, 15), 0, 120
    );

    return [
      this.rotate(-degrees),
      this,
      this.rotate(+degrees)
    ];
  },
  opposite: function() {
    return this.rotate(180);
  },
  clone: function() {
    var c = this._c;
    return new Hsla(c.hue, c.saturation, c.lightness, c.alpha);
  },
  toString: function() {
    var c = this._c;
    return "hsla("
      +c.hue
      +", "
      +c.saturation+"%"
      +", "
      +c.lightness+"%"
      +", "
      +c.alpha
      +")";
  },
  toJSON: function() {
    return Object.assign({}, this._c);
  }
}


/**
 * Export as a single function.
 */
var hsla = function(hue, saturation, lightness, alpha) {
  return new Hsla(hue, saturation, lightness, alpha);
}

module.exports = hsla;
