define(function (require) {
  var registerSuite = require('intern!object'),
      assert        = require('intern/chai!assert'),
      plugin        = require('intern/dojo/node!../index'),
      fs            = require('intern/dojo/node!fs'),
      gonzales      = require('intern/dojo/node!../node_modules/gonzales-pe');

  registerSuite({
    name: 'polish-no-underscores',

    message: function () {
      assert.strictEqual(plugin.message({ error : { message : '.some-cool-message' } }), 'Use hyphens instead of underscores: ".some-cool-message".');
    }
  });

  registerSuite({
    name: 'polish-no-underscores CSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/css.css', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'css' }));

        assert.strictEqual(errors.length, 4);
        assert.equal(errors[0].node.toString().trim(), '.fail_here');
        assert.equal(errors[1].node.toString().trim(), '.but_definitely-here');
        assert.equal(errors[2].node.toString().trim(), '.because_of_this');
        assert.equal(errors[3].node.toString().trim(), '.too_shall_fail');
      }));
    }
  });

  registerSuite({
    name: 'polish-no-underscores SCSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/scss.scss', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'scss' }));

        assert.strictEqual(errors.length, 2);
        assert.equal(errors[0].node.toString().trim(), '.fails_for_sure');
        assert.equal(errors[1].node.toString().trim(), '.but_this_does');
      }));
    }
  });
});