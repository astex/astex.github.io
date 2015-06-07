define(['backbone'], function(B) {
  var M = {};

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
    url: '/entries/data.json'
  });

  return M;
});
