function isLetter(char) {
  return char.length == 1 && new RegExp("[a-zA-Z]").test(char);
}

function isWhiteSpace(char) {
  return char.length == 1 && new RegExp("\\s").test(char);
}

(function($) {
  $.widget("stej.game", {
    options: {
      words: []
    },

    word: "",
    maxGuesses: 0,
    wins: 0,
    letters: {},
    guesses: [],

    start: function() {
      var self = this;

      this.word = this._pickWord();
      this.maxGuesses = this.word.length * 2;
      this.letters = {};
      this.guesses = [];

      console.log("start: " + this.word);

      this.wordEl.empty();

      $.each(this.word.split(""), function() {
        var letterEl = $("<div>").letter({ value: this });
        var letterEls = self.letters[this.toLowerCase()];

        self.wordEl.append(letterEl);

        if (Array.isArray(letterEls)) {
          letterEls.push(letterEl);
        } else {
          letterEls = [letterEl];
        }

        self.letters[this.toLowerCase()] = letterEls;
      });

      this._update();
      this.element.show();
    },

    guess: function(letter) {
      console.log("guess: ", letter);

      if (this.guesses.length < this.maxGuesses) {
        if (!this.guesses.includes(letter)) {
          if (Object.keys(this.letters).includes(letter.toLowerCase())) {
            $.each(this.letters[letter.toLowerCase()], function() {
              $(this).letter("reveal");
            });
          } else {
            this.guesses.push(letter);
          }
        }
      }

      if (this.guesses.length >= this.maxGuesses) {
        alert("The word was: " + this.word);
        this.start();
      } else {
        this._update();
      }
    },

    _pickWord: function() {
      return this.options.words[Math.round((Math.random() * 100) % this.options.words.length)];
    },

    _create: function() {
      // console.log("words: ", this.options.words);

      this.wordEl = $("<div>").addClass("word");
      this.winsEl = $("<span>").addClass("wins");
      this.guessesEl = $("<span>").addClass("guesses");
      this.guessesRemainingEl = $("<span>").addClass("guessesRemaining");

      this.element.hide();

      this.element.append(this.wordEl);

      this.element.append(
        $("<div>")
          .text("Wins: ")
          .append(this.winsEl)
      );

      this.element.append(
        $("<div>")
          .text("Guesses: ")
          .append(this.guessesEl)
      );

      this.element.append(
        $("<div>")
          .text("Guesses Remaining: ")
          .append(this.guessesRemainingEl)
      );

      this.element.addClass("game");

      this._update();
    },

    _update: function() {
      this.winsEl.text(this.wins);
      this.guessesEl.text(this.guesses.map(l => l.toUpperCase()).join(" "));
      this.guessesRemainingEl.text(this.maxGuesses - this.guesses.length);
    }
  });
})(jQuery);
