define(['backbone', 'marked'], function(B, marked) {
  var M = {};

  M.Entry = B.Model.extend({
    fetchSrc: function(cbs) {
      require(['text!' + this.get('src')], function(src) {
        this.set('content', marked(src));
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
