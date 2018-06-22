var gamePhrases = [
    {phrase: "Old School", hint: "Well, um, actually a pretty nice little Saturday, we're going to go to Home Depot. Yeah, buy some wallpaper, maybe get some flooring, stuff like that. Maybe Bed, Bath, & Beyond, I don't know, I don't know if we'll have enough time."},
    {phrase: "Dumb and Dumber", hint: "You sold our dead bird to a blind kid?!"},
    {phrase: "Usual Suspects", hint: "Who is Kaiser Sose?"},
    {phrase: "Jurassic Park", hint: "We spared no expense."},
    {phrase: "Shawshank Redemption", hint: "Get busy living, or get busy dying."},
    {phrase: "Tombstone", hint: "I'm your Huckleberry"},
    {phrase: "Heavy Weights", hint: "Attention campers lunch has been cancelled today due to a lack of hustle. Deal with it."},
    {phrase: "Avengers", hint: "If we can't protect the earth, you can be damned sure we'll avenge it."},
    {phrase: "Billy Madison", hint: "At no point in your rambling, incoherent response were you even close to anything that could be considered a rational thought. Everyone in this room is now dumber for having listened to it. I award you no points, and may God have mercy on your soul."},
    {phrase: "Tommy Boy", hint: "Brothers don't shake hands. Brothers gotta hug."}
];

function getNewPhrase() {
    return gamePhrases[Math.floor(Math.random() * gamePhrases.length)];
}

var lettersToWinGame = 0;
var guessedLetters = [];
var currentPhrase;
var currentPhrase = "";
var noisecomplaints = 0;

var audio = new Audio("./assets/sounds/applause.mp3");

var display = document.getElementById('phrase_display');
var blurb_display = document.getElementById('blurb_display');
var background_image = document.getElementById('background_image');

function restart() {
    audio.pause();
    lettersToWin = 0;
    guessedLetters = 0;
    currentPhrase = getNewPhrase();
    console.log(currentPhrase);
    displayString = "";
    noisecomplaints = 0;
    background_image.src = "./assets/images/background.jpg";

    for (i = 0; i < currentPhrase.phrase.length; i++) {
      if (currentPhrase.phrase.charAt(i) !== " ") {
        displayString += "_";
        lettersToWinGame += 1;
      }
      else {
        displayString += " ";
      }
    }

    display.textContent = displayString;

    blurb_display.textContent = currentPhrase.hint;

}

document.onkeyup = function(event) {
    console.log(event.key);

    for (var i = 0; i < guessedLetters.length; i++) {
        if (guessedLetters[i] === event.key) {
         console.log("Key has already been used.");
         return;
        }
    }

    guessedLetters.push(event.key);

    var tempstr = "";
    var correct_guess = false;

    for (var i = 0; i < currentPhrase.phrase.length; i++) {
        console.log("currentPhrase.phrase = " + currentPhrase.phrase);
        console.log(currentPhrase.phrase.charAt(i).toUpperCase());
        if ((currentPhrase.phrase.charAt(i).toUpperCase() == event.key) ||
            (currentPhrase.phrase.charAt(i).toLowerCase() == event.key)) {
            tempstr += currentPhrase.phrase.charAt(i);
            lettersToWinGame--;
            correct_guess = true;
            background_image.src = "./assets/images/background.jpg";
        }
        else {
            tempstr += displayString.charAt(i);
        }
    }
    if (correct_guess === false) {
        noisecomplaints++;
            if (noisecomplaints === 6) {
                audio = new Audio("./assets/sounds/boo.mp3");
                blurb_display.innerHTML = "<span class=\"lose-message\">The movie is over! YOU LOSE! Watch Again?</span><button class=\"msgbtn\" onclick=\restart();\">YES</button>";
            }
    }

    displayString = tempstr;
    display.textContent = displayString;

    if (lettersToWinGame === 0) {
        audio = new Audio("./assets/sounds/applause.mp3");
        audio.play();
        var message = "<span class\"win-message\">EMMY WINNING PERFORMANCE! WATCH NEXT MOVIE?</span><button class=\"msgbtn\" onclick=\"restart();\">YES</button>";
        blurb_display.innerHTML = message;
    }
}

restart();