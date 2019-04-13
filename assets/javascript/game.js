function isValidGuess(char) {
  return char.length == 1 && new RegExp("[a-zA-Z0-9]").test(char);
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

    guess: function(guess) {
      console.log("guess: ", guess);

      if (guess.length == 1) {
        if (isValidGuess(guess)) {
          if (this.guesses.length < this.maxGuesses) {
            if (!this.guesses.includes(guess)) {
              if (Object.keys(this.letters).includes(guess.toLowerCase())) {
                $.each(this.letters[guess.toLowerCase()], function() {
                  $(this).letter("reveal");
                });
              } else {
                this.guesses.push(guess);
              }
            }
          }
        } else {
          this._alert("[" + guess + "] is not a valid guess.");
        }
      }

      this._update();

      if (this.guesses.length >= this.maxGuesses) {
        this._alert(
          "The word was: " + this.word,
          function() {
            this.start();
          }.bind(this)
        );
      }
    },

    _pickWord: function() {
      return this.options.words[Math.round((Math.random() * 100) % this.options.words.length)];
    },

    _alert: function(message, cb) {
      $("#alertMessage").text(message);
      $("#alertModal")
        .on("hidden.bs.modal", function(e) {
          if (typeof cb === "function") {
            cb();
          }
        })
        .modal({ backdrop: false });
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

      this.element.append(
        $("<div>")
          .addClass("modal fade")
          .attr({ id: "alertModal", role: "dialog", tabindex: -1 })
          .append(
            $("<div>")
              .addClass("modal-dialog")
              .attr("role", "document")
              .append(
                $("<div>")
                  .addClass("modal-content")
                  .append(
                    $("<h5>")
                      .addClass("modal-body")
                      .attr("id", "alertMessage")
                  )
                  .append(
                    $("<div>")
                      .addClass("modal-footer")
                      .append(
                        $("<button>")
                          .addClass("btn btn-primary")
                          .attr({ type: "button", "data-dismiss": "modal" })
                          .text("Close")
                      )
                  )
              )
          )
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
