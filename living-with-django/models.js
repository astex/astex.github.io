define(['backbone'], function(B) {
  var M = {};

  M.Entry = B.Model.extend({});
  M.Entries = B.Collection.extend({
    model: M.Entry,
    url: 'entries/data.json'
  });

  return M;
});
