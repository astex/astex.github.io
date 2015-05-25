require.config({
  paths: {
    text: 'lib/require-text',
    css: 'lib/require-css',

    jquery: 'lib/jquery',

    underscore: 'lib/underscore',
    'underscore.crunch': 'lib/underscore.crunch',

    backbone: 'lib/backbone',

    marked: 'lib/marked',
    'marked.highlight': 'lib/marked.highlight',

    moment: 'lib/moment',

    highlight: 'lib/highlight',

    "disqus.embed": '//livingwithdjango.disqus.com/embed',
    "disqus.count": '//livingwithdjango.disqus.com/count'
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
      routes: {'': 'list', '*src': 'entry'},
      list: function() { new V.List(); },
      entry: function(src) { new V.Entry({model: new M.Entry({src: src})}); }
    }));

    // Disqus needs to be required once the "disqus_thread" element is on the page, so we need to
    // reload the page whenever that element is added.  Easier to just always reload the page.
    $('body').on('click', 'a', function(e) {
      e.preventDefault();
      window.location.replace($(this).attr('href'));
      window.location.reload();
    });

    B.history.start({root: '/living-with-django/'});
  }
);
