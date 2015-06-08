define(
  [
    'jquery', 'underscore', 'backbone', 'moment',
    'models',
    'text!templates/main.utpl',
    'text!templates/list.utpl',
    'text!templates/entry.utpl',

    'underscore.crunch'
  ], function($, _, B, moment, M, t_main, t_list, t_entry) {
    var V = {};

    V.Base = Backbone.View.extend({
      el: $('body'),
      t_main: _.template(t_main),

      initialize: function() {
        var v = this;
        v.fetch({
          success: function() { v.render().trigger('ready'); }
        });
      },

      fetch: function(cbs) { _.finish(cbs); },

      render: function() {
        this.$el.html(this.t_main());
        this.$('.body').append(this.t(this.getTemplateArgs()));
        return this;
      },

      getTemplateArgs: function() { return {model: this.model}; }
    });

    V.List = V.Base.extend({
      t: _.template(t_list),
      t_entry: _.template(t_entry),
      model: new M.Entries(),

      initialize: function(opts) {
        this.active = opts.active;
        return V.Base.prototype.initialize.apply(this, opts);
      },

      fetch: function(cbs) {
        var v = this;

        _.crunch({
          pre: $.proxy(v.model.fetch, v.model),
          post: function(cbs1) {
            _.crunch(v.model.map(function(entry) {
              if (entry.get('slug') == v.active.get('slug')) {
                return $.proxy(entry.fetchSrc, entry);
              } else {
                return _.finish;
              }
            }))(cbs1);
          }
        })(cbs);
      },

      getTemplateArgs: function() {
        return {
          model: this.model,
          active: this.active,
          t_entry: this.t_entry,
          moment: moment
        };
      }
    });

    V.Entry = V.Base.extend({
      t: _.template(t_entry),

      fetch: function(cbs) {
        var v = this;
        var collection = new M.Entries();

        _.crunch({
          pre: $.proxy(collection.fetch, collection),
          post: {
            pre: function(cbs1) {
              v.model.set(collection.findWhere({slug: v.model.get('slug')}).attributes);
              _.finish(cbs1);
            },
            post: $.proxy(v.model.fetchSrc, v.model)
          }
        })(cbs);
      },

      getTemplateArgs: function() {
        return {model: this.model, moment: moment};
      }
    });

    return V;
  }
);
