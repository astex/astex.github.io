define(['backbone'], function(B) {
  var M = {};

  M.Entry = B.Models.extend({});
  M.Entries = B.Models.extend({url: 'entries/data.json'});

  return M;
});
