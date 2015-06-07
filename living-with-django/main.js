require.config({
  paths: {
    text: 'lib/require-text',
    css: 'lib/require-css',
    async: 'lib/require-async',

    jquery: 'lib/jquery',

    underscore: 'lib/underscore',
    'underscore.crunch': 'lib/underscore.crunch',

    backbone: 'lib/backbone',

    marked: 'lib/marked',
    'marked.highlight': 'lib/marked.highlight',

    moment: 'lib/moment',

    highlight: 'lib/highlight'
  },

  shim: {
    highlight: {
      deps: ['css!style/highlight.css'],
      exports: 'hljs'
    }
  }
});

require(
  [
    'backbone', 'models', 'views', 'css!style/main.css'
  ], function(B, M, V) {
    new (B.Router.extend({
      routes: {'': 'list', 'e/:slug': 'entry'},
      list: function() { new V.List(); },
      entry: function(slug) { new V.Entry({model: new M.Entry({slug: slug})}); }
    }));

    B.history.start({pushState: true});
  }
);
