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
      c = hsla(60, 80, 50, 1);
      cv = c.toString();
    })

    describe("#alpha", function() {

      it("should return new hsla with alpha set", function() {
        var nc = c.alpha(0.5)
        assert.notEqual(nc.toString(), c.toString());
        assert.equal(nc, "hsla(60, 80%, 50%, 0.5)");
      })
      it("should not allow <0", function() {
        var nc = c.alpha(-1.1);
        assert.equal(nc, "hsla(60, 80%, 50%, 0)");
      });
      it("should not allow >1", function() {
        var nc = c.alpha(1.1);
        assert.equal(nc, "hsla(60, 80%, 50%, 1)");
      });
    });

    describe("#saturate", function() {
      it("should return new hsla saturated by percent", function() {
        var nc = c.saturate(20);
        assert.equal(nc.toString(), "hsla(60, 100%, 50%, 1)");
      });
      it("should not allow >100", function() {
        var nc = c.saturate(20);
        assert.equal(nc, "hsla(60, 100%, 50%, 1)");
      });
    });

    describe("#desaturate", function() {
      it("should return new hsla desaturated by percent", function() {
        var nc = c.desaturate(20);
        assert.equal(nc, "hsla(60, 60%, 50%, 1)");
      });
      it("should not allow <0", function() {
        var nc = c.desaturate(110);
        assert.equal(nc, "hsla(60, 0%, 50%, 1)");
      });
    });

    describe("#lighten", function() {
      it("should return new hsla lightened by percent", function() {
        var nc = c.lighten(20);
        assert.equal(nc, "hsla(60, 80%, 70%, 1)");
      });
      it("should not allow >100", function() {
        var nc = c.lighten(90);
        assert.equal(nc, "hsla(60, 80%, 100%, 1)");
      });
    });

    describe("#darken", function() {
      it("should return new hsla darkened by percent", function() {
        var nc = c.darken(20);
        assert.equal(nc, "hsla(60, 80%, 30%, 1)");
      });
      it("should not allow <0", function() {
        var nc = c.darken(90);
        assert.equal(nc, "hsla(60, 80%, 0%, 1)");
      });
    });

    describe("#rotate", function() {
      it("should return new hsla rotated by degrees", function() {
        var nc1 = c.rotate(-30);
        var nc2 = c.rotate(+30);

        assert.equal(nc1.toString(), "hsla(30, 80%, 50%, 1)");
        assert.equal(nc2.toString(), "hsla(90, 80%, 50%, 1)");
      });
      it("should wrap if <0", function() {
        var nc = c.rotate(-90);
        assert.equal(nc.toString(), "hsla(330, 80%, 50%, 1)");
      });
      it("should wrap if >359", function() {
        var nc = c.rotate(300);
        assert.equal(nc.toString(), "hsla(0, 80%, 50%, 1)");
      });
    });

    describe("#triadic", function() {
      it("should work", function() {
        var colors = c.triadic();
        assert.equal(colors[0], "hsla(180, 80%, 50%, 1)");
        assert.equal(colors[1], "hsla(60, 80%, 50%, 1)");
        assert.equal(colors[2], "hsla(300, 80%, 50%, 1)");
      });
    });

    describe("#analogous", function() {
      it("should work", function() {
        var colors = c.analogous();
        assert.equal(colors[0], "hsla(45, 80%, 50%, 1)");
        assert.equal(colors[1], "hsla(60, 80%, 50%, 1)");
        assert.equal(colors[2], "hsla(75, 80%, 50%, 1)");
      });
    });

    describe("#opposite", function() {
      it("should work", function() {
        var nc = c.opposite();
        assert.equal(nc, "hsla(240, 80%, 50%, 1)");
      });
    });
  });


  describe("util", function() {
    var c, cv;
    before(function() {
      c = hsla(60, 80, 50, 1);
      cv = c.toString();
    })

    describe("#clone", function() {
      it("should make new object", function() {
        var nc = c.clone()
        assert.notEqual(nc, c);
      });
    });

    describe("#toString", function() {
      it("should return hsla string", function() {
        assert.equal(c.toString(), "hsla(60, 80%, 50%, 1)");
      });
    });

    describe("#toJSON", function() {
      it("should return javascript object", function() {
        assert.deepEqual(c.toJSON(), {
          hue: 60,
          saturation: 80,
          lightness: 50,
          alpha: 1
        });
      });
    });
  });

});
