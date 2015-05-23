define(
  [
    'jquery', 'underscore', 'backbone', 'moment',
    'models',
    'text!templates/main.utpl',
    'text!templates/entry.utpl',

    'underscore.crunch'
  ], function($, _, B, moment, M, t_main, t_entry) {
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
        var v = this;

        _.crunch({
          pre: $.proxy(v.model.fetch, v.model),
          post: function(cbs1) {
            _.crunch(v.model.map(function(entry) {
              return $.proxy(entry.fetchSrc, entry);
            }))(cbs1);
          }
        })(cbs);
      },

      render: function() {
        var v = this;
        V.Base.prototype.render.call(v);
        v.model.each(function(entry) {
          v.$('.container').append(v.t_entry({model: entry, moment: moment}));
        });
        return v;
      }
    });

    return V;
  }
);
