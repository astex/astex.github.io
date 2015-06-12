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

    V.Main = Backbone.View.extend({
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

    V.List = V.Main.extend({
      t: _.template(t_list),
      t_entry: _.template(t_entry),
      model: new M.Entries(),

      initialize: function(opts) {
        this.active = opts.active;
        return V.Main.prototype.initialize.apply(this, opts);
      },

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

      getTemplateArgs: function() {
        return {
          model: this.model,
          active: this.active,
          t_entry: this.t_entry,
          moment: moment
        };
      },

      events: {
        'click .entry:not(.expanded)': 'expand',
        'click .entry.expanded .title': 'unexpand'
      },

      expand: function(e) {
        this.$('.expanded').removeClass('expanded');
        var $el = $(e.currentTarget).addClass('expanded');
        var model = this.model.findWhere({id: $el.data('id')});
        window.history.pushState(model.get('slug'), '', '/e/' + model.get('slug'));
      },

      unexpand: function(e) {
        this.$('.expanded').removeClass('expanded');
        window.history.pushState('home', '', '/');
      }
    });

    return V;
  }
);
