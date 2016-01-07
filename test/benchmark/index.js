var Benchmark = require("benchmark");
var hsla = require("../../");


var suite = new Benchmark.Suite;
var c = hsla(60);

// add tests
suite
  .add('hsla#init', function() {
    hsla(120);
  })
  .add('hsla#toString()', function() {
    c.toString();
  })
  .add('hsla#rotate', function() {
    c.rotate(1);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true });
