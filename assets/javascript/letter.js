(function($) {
  $.widget("stej.letter", {
    options: {
      value: "",
      revealed: false
    },

    value: function(value) {
      if (value === undefined) {
        return this.options.value;
      } else {
        this.options.value = value;
        this._update();
      }
    },

    reveal: function() {
      // console.log("reveal: ", this.options.value);
      this.options.revealed = true;
      this._update();
    },

    isRevealed: function() {
      return this.options.revealed;
    },

    _create: function() {
      this.element.addClass("letter");
      this._update();
    },

    _update: function() {
      // console.log("letter: ", this.options.value);

      if (this.options.revealed) {
        this.element.addClass("letter-revealed");
        this.element.removeClass("letter-hidden");
        this.element.text(this.options.value);
      } else {
        this.element.removeClass("letter-revealed");
        this.element.addClass("letter-hidden");
        this.element.text("_");
      }
    }
  });
})(jQuery);
