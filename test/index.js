var assert = require("assert");
var hsla   = require("../");


describe("hsla", function() {
  describe("initialize", function() {
    it("should initialize with no params", function() {
      assert.equal(hsla().toString(), "hsla(0, 100%, 50%, 1)");
    });

    it("should initialize with hue", function() {
      assert.equal(hsla(60).toString(), "hsla(60, 100%, 50%, 1)");
    });

    it("should initialize with hue/saturation", function() {
      assert.equal(hsla(60, 25).toString(), "hsla(60, 25%, 50%, 1)");
    });

    it("should initialize with hue/saturation/lightness", function() {
      assert.equal(hsla(60, 25, 80).toString(), "hsla(60, 25%, 80%, 1)");
    });

    it("should initialize with hue/saturation/lightness/alpha", function() {
      assert.equal(hsla(60, 25, 80, 0.5).toString(), "hsla(60, 25%, 80%, 0.5)");
    });
  });


  describe("manipulation", function() {
    var c, cv;
    before(function() {
      c = hsla();
      cv = c.toString();
    })

    describe("#alpha", function() {

      it("should return new hsla with alpha set", function() {
        var nc = c.alpha(0.5)
        assert.notEqual(nc.toString(), c.toString());
        assert.equal(nc, "hsla(0, 100%, 50%, 0.5)");
      })
      it("should not allow <0", function() {
        var nc = c.alpha(-1.1);
        assert.equal(nc, "hsla(0, 100%, 50%, 0)");
      });
      it("should not allow >1", function() {
        var nc = c.alpha(1.1);
        assert.equal(nc, "hsla(0, 100%, 50%, 1)");
      });
    });

    describe("#lighten", function() {
      it("should return new hsla lightened by percent", function() {
      });
      it("should not allow >100", function() {
      });
    });

    describe("#darken", function() {
      it("should return new hsla darkened by percent", function() {
      });
      it("should not allow <0", function() {
      });
    });

    describe("#saturate", function() {
      it("should return new hsla saturated by percent", function() {
      });
      it("should not allow >100", function() {
      });
    });

    describe("#desaturate", function() {
      it("should return new hsla desaturated by percent", function() {
      });
      it("should not allow <0", function() {
      });
    });

    describe("#rotate", function() {
      it("should return new hsla rotated by degrees", function() {
      });
      it("should wrap if <0", function() {
      });
      it("should wrap if >359", function() {
      });
    });

    describe("#triadic", function() {
      it("should...", function() {
      });
    });

    describe("#analogous", function() {
      it("should...", function() {
      });
    });

    describe("#opposite", function() {
      it("should...", function() {
      });
    });
  });


  describe("util", function() {
    describe("#clone", function() {
      it("should make new object", function() {
      });
    });

    describe("#toString", function() {
      it("should return hsla string", function() {
      });
    });

    describe("#toJSON", function() {
      it("should return javascript object", function() {
      });
    });
  });

});
