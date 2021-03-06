var list = document.querySelectorAll(".deck .fa");
var touch = document.querySelector('.restart');
var card = document.querySelectorAll('.card');
var moves = document.querySelector('.moves');
var stars = document.querySelectorAll(".stars .fa");
var main = document.querySelector('.container');
var final = document.querySelector('.winning');
var button = document.querySelector('.winning button');
var great = stars[2];
var good = stars[1];
var starScore = document.querySelector('.starScore');
var moveScore = document.querySelector('.moveScore');
var minute = document.querySelector('.minute');
var seconds = document.querySelector('.second');
var resultMinute = document.querySelector('#resultMinute');
var resultSecond = document.querySelector('#resultSecond');

var count = 0;
var firstCard;
var firstFace;
var secondFace;
var movesCount = 0;
var wrongMoves = 0;
var gameCount =0;
var starNumber = 3;
var totalSecond = 0;
var clock;
/*
 * Create a list that holds all of your cards
 */
var cards=["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube",
        "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o",
        "fa-anchor", "fa-bolt", "fa-cube","fa-leaf", "fa-bicycle", "fa-bomb"];


 // Game start when the page open
init();
// restart the game while playing
touch.addEventListener("click",init);
// restart the game after finishing the game
button.addEventListener("click",function() {
  final.style.display = "none";
  main.style.display = "flex";
  init();
});

// initial

function init() {
  //to avoid double timer
  clearInterval(clock);
  //activeta timer
  clock = setInterval(changeTimer,1000);
  final.style.display = "none";
  //shuffle the cards and prepare the game
  newCards();
  //prepare the cards for game and able to flip
  for (var i = 0; i < card.length; i++) {
        card[i].classList.remove("open", "show", "match", "incorrect");
        card[i].addEventListener("click", flipCard);
  }
}




function flipCard(event) {
  // first open
  event.target.classList.add("open", "show");
  // Check the cards
  if (count === 0){
     firstCard = event.target;
     firstFace = event.target.firstElementChild.classList[1];
     //avoid to click already selected card
     event.target.removeEventListener ("click", flipCard);
  }
  else if (count === 1){
    secondFace = event.target.firstElementChild.classList[1];
  }
  count ++;
  // 2 cards selected
  if (count === 2) {
    //Count the moves
    movesCount++;
    moves.textContent = movesCount;
    if (firstFace != secondFace) {
      wrongChoise(event.target,firstCard);
    }else {
      rightChoise(event.target,firstCard);
    }
  }
}


//If the cards are different
function wrongChoise(first, second) {
  second.classList.remove("open");
  first.classList.remove("open");
  second.classList.add("incorrect");
  first.classList.add("incorrect");
  //reset the selected card
  count = 0;
  // to show the both wrong cards
  setTimeout(function() {
    second.classList.remove("show", "incorrect");
    first.classList.remove("show", "incorrect");
  }, 500);
  firstCard.addEventListener("click", flipCard);

  //Calculate how good play the game the player
  wrongMoves++;
  if (wrongMoves > 5  && wrongMoves < 14){
    great.classList.remove("fa-star");
    great.classList.add("fa-star-o");
    starNumber = 2;
  }
  if (wrongMoves > 13 ){
    good.classList.remove("fa-star");
    good.classList.add("fa-star-o");
    starNumber = 1;
  }
}
//If the selected cards match
function rightChoise(first, second) {
  second.classList.remove("open" ,"show");
  first.classList.remove("open", "show");
  second.classList.add("match");
  first.classList.add("match");
  //disbale to click already matched cards
  first.removeEventListener ("click", flipCard);
  second.removeEventListener ("click", flipCard);
  //reset the selected card
  count = 0;
  //count how many pair is matched
  gameCount++;
  if (gameCount === 8) {
    //stop the timer
    clearInterval(clock);
    //show the results
    document.body.style.backgroundImage = "none";
    main.style.display = "none";
    final.style.display = "flex";
    //show the scores
    starScore.textContent = starNumber;
    moveScore.textContent = movesCount;
    //show the game time
    resultSecond.innerHTML = seconds.innerHTML;
    resultMinute.innerHTML = minute.innerHTML;
  }
}




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//Create a new game condition reset everything
function newCards() {
  shuffle(cards);
  for (var i = 0; i < list.length; i++) {
    card[i].classList.remove("open", "show", "match", "incorrect");
    list[i].classList.remove(list[i].classList[1]);
    list[i].classList.add(cards[i]);
  }
  for (var y = 0; y < stars.length; y++) {
    stars[y].classList.remove("fa-star-o");
    stars[y].classList.add("fa-star");
  }

  count = 0 ;//reset the fliped card
  // reset the number of movement
  movesCount = 0;
  moves.textContent = 0;
  // reset the wrong number for stars
  wrongMoves = 0;
  //reset number matched card
  gameCount=0;
  //reset the timer
  minute.innerHTML = "00";
  seconds.innerHTML = "00";
  totalSecond =0;
}
//Timer mechanisim
function changeTimer() {
  totalSecond++;
  seconds.innerHTML = calc(totalSecond%60);
  minute.innerHTML = calc(parseInt(totalSecond / 60));
}

function calc(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
