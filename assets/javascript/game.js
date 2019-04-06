function handleKeyPress(e) {
  if (e.key >= "a" && e.key <= "z") {
    console.log("letter");
  } else {
    console.log("other");
  }
}

$(function() {
  var doc = $(":root");
  var splash = $("#splash");
  var game = $("#game");

  doc.keyup(function(e) {
    if (splash.is(":visible")) {
      splash.hide();
      game.show();
    } else {
      handleKeyPress(e);
    }
  });
});
