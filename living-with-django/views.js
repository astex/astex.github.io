define(
  [
    'underscore', 'backbone',
    'models',
    'text!templates/main.utpl'
  ], function(_, B, M, t_main) {
    var V = {};

    V.Base = Backbone.View.extend({
      initialize: function() { this.render(); },
      render: function() { this.$el.html(this.template({model: this.model})); }
    });

    V.Main = V.Base.extend({template: _.template(t_main)});

    return V;
  }
);
