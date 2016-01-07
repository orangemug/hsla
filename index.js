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

/**
 * Creates a new Hsla
 * @param {Integer} hue
 * @param {Integer} saturation
 * @param {Integer} lightness
 * @param {Float} alpha
 */
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
   * @param {Float} alpha
   * @return {Hsla}
   */
  alpha: function(alpha) {
    var c = this._c;
    return new Hsla(c.hue, c.saturation, c.lightness, alpha);
  },
  /**
   * Lighten by percent
   * @param {Integer} percent
   * @return {Hsla}
   */
  lighten: function(percent) {
    var c = this._c;
    var _lightness = c.lightness + percent;
    return new Hsla(c.hue, c.saturation, _lightness, c.alpha);
  },
  /**
   * Darken by percent
   * @param {Integer} percent
   * @return {Hsla}
   */
  darken: function(percent) {
    var c = this._c;
    var _lightness = c.lightness - percent;
    return new Hsla(c.hue, c.saturation, _lightness, c.alpha);
  },
  /**
   * Saturate by percent
   * @param {Integer} percent
   * @return {Hsla}
   */
  saturate: function(percent) {
    var c = this._c;
    var _saturation = c.saturation + percent;
    return new Hsla(c.hue, _saturation, c.lightness, c.alpha);
  },
  /**
   * Deaturate by percent
   * @param {Integer} percent
   * @return {Hsla}
   */
  desaturate: function(percent) {
    var c = this._c;
    var _saturation = c.saturation - percent;
    return new Hsla(c.hue, _saturation, c.lightness, c.alpha);
  },
  /**
   * Rotate `hue` by `degrees`, note the rotation will wrap around 360 degrees
   * @param {Integer} degrees
   * @return {Hsla}
   */
  rotate: function(degrees) {
    var c = this._c;
    var _hue = (c.hue + degrees) % 360;
    if(_hue < 0) _hue = 360 + _hue;
    return new Hsla(_hue, c.saturation, c.lightness, c.alpha);
  },
  /**
   * Calculate a color triad @see <http://www.tigercolor.com/color-lab/color-theory/color-harmonies.htm>
   * Changing `degrees` will alter the spread somewhat like <http://paletton.com/>
   * @param {Integer} percent
   * @return {Hsla}
   */
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
  /**
   * Calculate a analogous color scheme (<@see http://www.tigercolor.com/color-lab/color-theory/color-harmonies.htm>
   * Changing `degrees` will alter the spread somewhat like <http://paletton.com/>
   * @param {Integer} percent
   * @return {Hsla}
   */
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
  /**
   * A shorthand for rotating by 180deg
   * @return {Hsla}
   */
  opposite: function() {
    return this.rotate(180);
  },
  /**
   * Clone the object
   * @return {Hsla}
   */
  clone: function() {
    var c = this._c;
    return new Hsla(c.hue, c.saturation, c.lightness, c.alpha);
  },
  /**
   * Return a string in the format 'hsla(:hue, :saturation%, :lightness%, :alpha)'
   * @return {String}
   */
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
  /**
   * Return a plain javascript object describing the color
   * @return {Object}
   */
  toJSON: function() {
    var c = this._c;
    return {
      hue:        c.hue,
      saturation: c.saturation,
      lightness:  c.lightness,
      alpha:      c.alpha
    }
  }
}


/**
 * Creates a new Hsla instance
 * @param {Integer} hue
 * @param {Integer} saturation
 * @param {Integer} lightness
 * @param {Float} alpha
 * @return {Hsla}
 */
module.exports = function(hue, saturation, lightness, alpha) {
  return new Hsla(hue, saturation, lightness, alpha);
}
