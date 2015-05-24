define(['backbone', 'marked.highlight'], function(B, marked) {
  var M = {};

  M.Entry = B.Model.extend({
    fetchSrc: function(cbs) {
      var m = this;
      return require(['text!' + m.get('src')], function(src) {
        m.set('content', marked(src));
        _.finish(cbs);
      });
    }
  });
  M.Entries = B.Collection.extend({
    model: M.Entry,
    url: 'entries/data.json'
  });

  return M;
});
