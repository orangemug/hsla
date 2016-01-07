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
  // Set defaults
  this._hue        = defaults(hue, 0);
  this._saturation = defaults(saturation, 100);
  this._lightness  = defaults(lightness, 50);
  this._alpha      = defaults(alpha, 1);

  // Make sure in clamps
  this._hue        = Math.round(clamp(this._hue,        0, 360));
  this._saturation = Math.round(clamp(this._saturation, 0, 100));
  this._lightness  = Math.round(clamp(this._lightness,  0, 100));
  this._alpha      = clamp(this._alpha, 0, 1);
}

Hsla.prototype = {
  /**
   * Set alpha of hsla
   * @param {Float} _alpha
   * @return {Hsla}
   */
  alpha: function(newAlpha) {
    return new Hsla(this._hue, this._saturation, this._lightness, newAlpha);
  },
  lighten: function(percent) {
    var _lightness = this._lightness + percent;
    return new Hsla(this._hue, this._saturation, _lightness, this._alpha);
  },
  darken: function(percent) {
    var _lightness = this._lightness - percent;
    return new Hsla(this._hue, this._saturation, _lightness, this._alpha);
  },
  saturate: function(percent) {
    var _saturation = this._saturation + percent;
    return new Hsla(this._hue, _saturation, this._lightness, this._alpha);
  },
  desaturate: function(percent) {
    var _saturation = this._saturation - percent;
    return new Hsla(this._hue, _saturation, this._lightness, this._alpha);
  },
  rotate: function(degrees) {
    var _hue = (this._hue + degrees) % 360;
    if(_hue < 0) _hue = 360 + _hue;
    return new Hsla(_hue, this._saturation, this._lightness, this._alpha);
  },
  triadic: function(degrees) {
    degrees = defaults(degrees, 60);
    degrees = clamp(degrees, 0, 60);

    var opposite = this.opposite();
    return [
      opposite.rotate(-degrees),
      this,
      opposite.rotate(+degrees)
    ];
  },
  analogous: function(degrees) {
    degrees = defaults(degrees, 15);
    degrees = clamp(degrees, 0, 120);

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
    return new Hsla(this._hue, this._saturation, this._lightness, this._alpha);
  },
  toString: function() {
    return "hsla("
      +this._hue
      +", "
      +this._saturation+"%"
      +", "
      +this._lightness+"%"
      +", "
      +this._alpha
      +")";
  },
  toJSON: function() {
    return {
      hue:        this._hue,
      saturation: this._saturation,
      lightness:  this._lightness,
      alpha:      this._alpha
    };
  }
}


/**
 * Export as a single function.
 */
var hsla = function(hue, saturation, lightness, alpha) {
  return new Hsla(hue, saturation, lightness, alpha);
}

module.exports = hsla;
