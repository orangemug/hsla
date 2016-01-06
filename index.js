/**
 * If `v` is null/undefined then return `default`
 * @private
 * @param {*} value to test
 * @param {*} default to use if default fails
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
  if(value < min) return min;
  if(value > max) return max;
  return value;
}


/**
 *
 */
var hsla = function(hue, saturation, lightness, alpha) {
  // Set defaults
  hue        = defaults(hue, 0);
  saturation = defaults(saturation, 100);
  lightness  = defaults(lightness, 50);
  alpha      = defaults(alpha, 1);

  // Make sure in clamps
  hue        = Math.round(clamp(hue,        0, 360));
  saturation = Math.round(clamp(saturation, 0, 100));
  lightness  = Math.round(clamp(lightness,  0, 100));
  alpha      = clamp(alpha, 0, 1);

  return {
    /**
     * Set alpha of hsla
     * @param {Float} _alpha
     * @return {Hsla}
     */
    alpha: function(newAlpha) {
      return hsla(hue, saturation, lightness, newAlpha);
    },
    lighten: function(percent) {
      var _lightness = lightness + percent;
      return hsla(hue, saturation, _lightness, alpha);
    },
    darken: function(percent) {
      var _lightness = lightness - percent;
      return hsla(hue, saturation, _lightness, alpha);
    },
    saturate: function(percent) {
      var _saturation = saturation + percent;
      return hsla(hue, _saturation, lightness, alpha);
    },
    desaturate: function(percent) {
      var _saturation = saturation - percent;
      return hsla(hue, _saturation, lightness, alpha);
    },
    rotate: function(degrees) {
      var _hue = (hue - degrees) % 360;
      return hsla(_hue, saturation, lightness, alpha);
    },
    triadic: function(degrees) {
      degrees = defaults(degrees, 60);
      degrees = clamp(degrees, 0, 60);

      var opposite = this.opposite();
      return [
        opposite.rotate(-30),
        this.clone(),
        opposite.rotate(+30)
      ];
    },
    analogous: function(degrees) {
      degrees = defaults(degrees, 15);
      degrees = clamp(degrees, 0, 120);

      return [
        this.rotate(-degrees),
        this.clone(),
        this.rotate(+degrees)
      ];
    },
    opposite: function() {
      return this.rotate(180);
    },
    clone: function() {
      return hsla(hue, saturation, lightness, alpha);
    },
    toString: function() {
      return "hsla("
        +hue
        +", "
        +saturation+"%"
        +", "
        +lightness+"%"
        +", "
        +alpha
        +")";
    },
    toJSON: function() {
      return {
        hue:        hue,
        saturation: saturation,
        lightness:  lightness,
        alpha:      alpha
      };
    }
  }
}

module.exports = hsla;
