window.blog = {DEUBUG: true};

require.config({
  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone'
  }
});

require(['views'], function(V) {});
