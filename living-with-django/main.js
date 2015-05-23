window.blog = {DEUBUG: true};

require.config({
  paths: {
    text: 'lib/require-text',
    css: 'lib/require-css',
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone'
  }
});

require(['views', 'css!style/main.css'], function(V) {
  new V.Main({el: $('body')});
});
