define(['json!/config.json', 'backbone'], function(config, B) {
  var M = {};

  M.Config = B.Model.extend({url: '/config.json'});

  M.Entry = B.Model.extend({
    fetchSrc: function(cbs) {
      var m = this;
      return require(['text!' + m.get('src'), m.get('parser')], function(src, parse) {
        m.set('content', parse(src));
        _.finish(cbs);
      });
    }
  });
  M.Entries = B.Collection.extend({
    model: M.Entry,
    url: config.url + '/entry/',

    parse: function(data) { return data.data; }
  });

  return M;
});
