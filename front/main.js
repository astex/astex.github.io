require.config({
  paths: {
    text: 'lib/require-text',
    json: 'lib/require-json',
    css: 'lib/require-css',

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
      list: function() {
        new V.Main({View: V.List, active: new M.Entry({})});
      },
      entry: function(slug) {
        (new V.Main({View: V.List, active: new M.Entry({slug: slug})}))
          .on('ready', function() {
            $('.body').scrollTop($('.expanded').position().top - 45);
          }); 
      }
    }));

    B.history.start({pushState: true});
  }
);
