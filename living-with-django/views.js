define(
  [
    'underscore', 'backbone',
    'models'
  ], function(_, B, M) {
    var V = {};

    V.Base = Backbone.View.extend({
      initialize: function() { this.render(); },
      render: function() { this.$el.html(this.template({model: this.model})); }
    });

    return V;
  }
);
