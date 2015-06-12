define(['json!/config.json', 'backbone'], function(config, B) {
  var M = {};

  M.Config = B.Model.extend({url: '/config.json'});

  M.Entry = B.Model.extend({
    fetchSrc: function(cbs) {
      var m = this;
      return require([m.get('parser')], function(parse) {
        m.set('content', parse(m.get('src')));
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
