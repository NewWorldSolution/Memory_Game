const list = document.querySelectorAll(".deck .fa");
const touch = document.querySelector('.restart');
const card = document.querySelectorAll('.card');
const show = document.querySelectorAll('.show');
const deck = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const stars = document.querySelectorAll(".stars .fa");
const main = document.querySelector('.container');
const final = document.querySelector('.winning');
const button = document.querySelector('.winning button');
const great = stars[2];
const good = stars[1];
const okay = stars[0];
const starScore = document.querySelector('.starScore');
const moveScore = document.querySelector('.moveScore');
const timer = document.querySelector('#timer');


let count = 0;
let firstCard;
let firstFace;
let movesCount = 0;
let wrongMoves = 0;
let gameCount =0;
let starNumber = 3;

/*
 * Create a list that holds all of your cards
 */
cards=["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube",
        "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o",
        "fa-anchor", "fa-bolt", "fa-cube","fa-leaf", "fa-bicycle", "fa-bomb"];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 // Game start
init();
touch.addEventListener("click",init);
button.addEventListener("click",function() {
  final.style.display = "none";
  main.style.display = "flex";
  init();
});
// initial

function init() {
  final.style.display = "none";
  //shuffle the cards and prepare the game
  newCards();
  //prepare the cards for game and able to flip
  for (let i = 0; i < card.length; i++) {
        card[i].classList.remove("open", "show", "match", "incorrect");
        card[i].addEventListener("click", flipCard);
  }
};




function flipCard(event) {
  // first open
  event.target.classList.add("open", "show");

  if (count === 0){
     firstCard = event.target
     firstFace = event.target.firstElementChild.classList[1];
     event.target.removeEventListener ("click", flipCard);
  }
  else if (count === 1){
    secondFace = event.target.firstElementChild.classList[1];
  }
  count ++
  if (count === 2) {
    //Count the moves
    movesCount++
    moves.textContent = movesCount;
    if (firstFace != secondFace) {
      wrongChoise(event.target,firstCard);
    }else {
      rightChoise(event.target,firstCard);
    }
  }
}



function wrongChoise(first, second) {
  second.classList.remove("open");
  first.classList.remove("open");
  second.classList.add("incorrect");
  first.classList.add("incorrect");
  count = 0;
  setTimeout(function() {
    second.classList.remove("show", "incorrect");
    first.classList.remove("show", "incorrect");
  }, 500);
  firstCard.addEventListener("click", flipCard);

  //Calculate how good play the game the player
  wrongMoves++
  if (wrongMoves > 9  && wrongMoves < 16){
    great.classList.remove("fa-star");
    great.classList.add("fa-star-o");
    starNumber = 2;
  }
  if (wrongMoves > 15 ){
    good.classList.remove("fa-star");
    good.classList.add("fa-star-o");
    starNumber = 1;
  }
}

function rightChoise(first, second) {
  second.classList.remove("open" ,"show");
  first.classList.remove("open", "show");
  second.classList.add("match");
  first.classList.add("match");
  first.removeEventListener ("click", flipCard);
  second.removeEventListener ("click", flipCard);
  count = 0;
  gameCount++
  if (gameCount === 8) {
    document.body.style.backgroundImage = "none";
    main.style.display = "none";
    final.style.display = "flex";
    starScore.textContent = starNumber;
    moveScore.textContent = movesCount;
  }
};




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
};


function newCards() {
  shuffle(cards);
  for (let i = 0; i < list.length; i++) {
    card[i].classList.remove("open", "show", "match", "incorrect")
    list[i].classList.remove(list[i].classList[1]);
    list[i].classList.add(cards[i]);
  }
  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.remove("fa-star-o");
    stars[i].classList.add("fa-star");
  }
  count = 0
  movesCount = 0;
  moves.textContent = 0;
  wrongMoves = 0;
  gameCount=0;
};

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
