define(
  [
    'jquery', 'underscore', 'backbone',
    'models',
    'text!templates/main.utpl',
    'text!templates/entry.utpl',

    'underscore.crunch'
  ], function($, _, B, M, t_main, t_entry) {
    var V = {};

    V.Base = Backbone.View.extend({
      initialize: function() {
        var v = this;
        v.fetch({
          success: function() { v.render(); }
        });
      },
      fetch: function(cbs) { _.finish(cbs); },
      render: function() { this.$el.html(this.t({model: this.model})); return this; }
    });

    V.Main = V.Base.extend({
      t: _.template(t_main),
      t_entry: _.template(t_entry),
      model: new M.Entries(),

      fetch: function(cbs) {
        _.crunch({
          pre: this.model.fetch(cbs),
          post: _.map(this.model, function(entry) { return entry.fetchSrc; })
        });
      },

      render: function() {
        var v = this;
        V.Base.prototype.render.call(v);
        v.model.each(function(entry) { v.$('.container').append(v.t_entry({model: entry})); });
        return v;
      }
    });

    return V;
  }
);
