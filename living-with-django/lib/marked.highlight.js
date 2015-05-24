define(['marked', 'highlight'], function(marked, highlight) {
  marked.setOptions({
    highlight: function(code) { return highlight.highlightAuto(code).value; }
  });
  return marked;
});
