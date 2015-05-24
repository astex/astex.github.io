window.blog = {DEUBUG: true};

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

    highlight: 'lib/highlight'
  },

  shim: {
    highlight: {
      deps: ['css!style/highlight.css'],
      exports: 'hljs'
    }
  }
});

require(['views', 'css!style/main.css'], function(V) {
  new V.Main({el: $('body')});
});
