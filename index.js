module.exports = {
  name: 'no-underscores',
  message: function(error){
    return 'Use hyphens instead of underscores: "' + error.error.message + '".';
  },
  test: function(ast){
    var errors = [];

    ast.traverse(function(node) {
      var string;

      if (node.type !== 'class' && node.type !== 'id') {
        return;
      }

      string = node.toString();

      if (string.indexOf('_') !== -1) {
        string = string.replace(/_/g,'-').trim();

        errors.push({
          node    : node,
          message : string
        });
      }
    });

    return errors;
  }
};
