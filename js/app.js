const list = document.querySelectorAll(".deck .fa");
const touch = document.querySelector('.restart');
const card = document.querySelectorAll('.card');
const show = document.querySelectorAll('.show');
const deck = document.querySelector('.deck')

let count = 0
let firstCard
let firstFace
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
newCards();
init();
touch.addEventListener("click",newCards);

// initial

function init() {
  for (let i = 0; i < card.length; i++) {
        card[i].classList.remove("open", "show", "match", "incorrect");
        card[i].addEventListener("click", function(event){
            event.preventDefault();
            flipCard(card , i);
        });
  }
};




function flipCard(array , index) {
  array[index].classList.add("open", "show");
  if (count === 0){
     firstCard = index;
     firstFace = array[index].firstElementChild.classList[1];
  }
  if (count === 1){
    secondFace = array[index].firstElementChild.classList[1];
  }
  count ++
  if (count === 2) {
    if (firstFace != secondFace) {
      wrongChoise(array[index],array[firstCard]);
    }else {
      rightChoise(array[index],array[firstCard]);
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
  }, 800);
}

function rightChoise(first, second) {
  second.classList.remove("open" ,"show");
  first.classList.remove("open", "show");
  second.classList.add("match");
  first.classList.add("match");
  first.outerHTML = first.outerHTML;
  second.outerHTML = second.outerHTML;
  count = 0;
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


function newCards() {
  shuffle(cards);
  for (var i = 0; i < list.length; i++) {
    list[i].classList.remove(list[i].classList[1]);
    list[i].classList.add(cards[i]);
    card[i].classList.remove("open", "show", "match", "incorrect")
  }
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
