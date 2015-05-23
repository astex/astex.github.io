define(['backbone'], function(B) {
  var M = {};

  M.Entry = Backbone.Models.extend({});
  M.Entries = Backbone.Models.extend({url: 'entries/data.json'});

  return M;
});
