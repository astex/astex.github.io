define(
  [
    'jquery', 'underscore', 'backbone',
    'models',
    'text!templates/main.utpl',

    'underscore.crunch'
  ], function($, _, B, M, t_main) {
    var V = {};

    V.Base = Backbone.View.extend({
      initialize: function() {
        var v = this;
        v.fetch({
          success: function() { v.render(); }
        });
      },
      fetch: function(cbs) { _.finish(cbs); },
      render: function() { this.$el.html(this.template({model: this.model})); return this; }
    });

    V.Main = V.Base.extend({
      template: _.template(t_main),
      model: new M.Entries(),
      fetch: function(cbs) { return this.model.fetch(cbs); }
    });

    return V;
  }
);
