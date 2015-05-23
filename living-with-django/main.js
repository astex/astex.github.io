window.blog = {DEUBUG: true};

require.config({
  paths: {
    text: 'lib/require-text',
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone'
  }
});

require(['views'], function(V) {});
