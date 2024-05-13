let currentCardIndex = 0;
let flashcardsData = [];
var isMoving = false;

function loadFileAsText() {
  var fileToLoad = document.getElementById("inputbox").files[0];
  var fileName = fileToLoad.name;
  fileName = fileName.replace('.txt', '');
  document.getElementById('title').innerText = fileName;


  var fileReader = new FileReader();
  fileReader.onload = function (fileLoadedEvent) {
    var textFromFileLoaded = fileLoadedEvent.target.result;
    flashcardsData = textFromFileLoaded.trim().split('\n').map(line => line.split(':'));
    currentCardIndex = 0;
    showCard(currentCardIndex);
    document.querySelector('.flip-card').classList.remove('flip-card-clicked');
  };

  fileReader.readAsText(fileToLoad, "UTF-8");
}


// Function to display current flashcard
function showCard(index) {
  const [front, back] = flashcardsData[index];
  document.querySelector('.flip-card').classList.remove('flip-card-clicked');
  document.getElementById('frontText').innerText = front;
  // Do not set the back content initially
  document.getElementById('backText').innerText = back;
  document.getElementById('cardCounter').innerText = `${index + 1}/${flashcardsData.length}`;

  document.getElementById('progress').style = 'width:' + currentCardIndex / flashcardsData.length * 100 + "%;"
}


// Function to show previous flashcard
function prevCard() {
  if (flashcardsData.length > 0 && isMoving == false) {
    isMoving = true
    // Trigger slideout animation
    const flipCardInner = document.querySelector('.flip-card-inner');
    flipCardInner.style.animationName = 'slideout';
    flipCardInner.style.animationDuration = '1.5s';

    // Delay changing the card index until after the slideout animation completes
    setTimeout(() => {
      if (currentCardIndex > 0) {
        currentCardIndex--;
      } else {
        currentCardIndex = flashcardsData.length - 1;
      }
      document.querySelector('.flip-card').classList.add('flip-card-clicked');
      document.querySelector('.flip-card').style.visibility = "hidden";
      showCard(currentCardIndex);
      document.querySelector('.flip-card').style.visibility = "visible";
      flipCardInner.style.animationName = 'slidein';
    }, 1500); // Adjust the delay time to match the animation duration 
    isMoving = false
  }
}

// Function to show next flashcard
function nextCard() {
  if (flashcardsData.length > 0 && isMoving == false) {
    isMoving = true
    // Trigger slideout animation
    const flipCardInner = document.querySelector('.flip-card-inner');
    flipCardInner.style.animationName = 'slideout';
    flipCardInner.style.animationDuration = '1.5s';

    // Delay changing the card index until after the slideout animation completes
    setTimeout(() => {
      if (currentCardIndex < flashcardsData.length - 1) {
        currentCardIndex++;
      } else {
        currentCardIndex = 0;
      }
      document.querySelector('.flip-card').style.visibility = "hidden";
      showCard(currentCardIndex);
      document.querySelector('.flip-card').style.visibility = "visible";

      // Reset animation name to trigger slidein animation
      flipCardInner.style.animationName = 'slidein';
    }, 1500); // Adjust the delay time to match the animation duration
    isMoving = false
  }
}

function flipCard() {
  const flipCard = document.querySelector('.flip-card');
  flipCard.classList.toggle('flip-card-clicked');
}


function jumpTo() {
  let page = prompt("Please enter a card number", "1");
  if (Number.isInteger(Number(page)) && page < flashcardsData.length) {
    if (Number(page) > 0 && isMoving == false) {
      isMoving = true
      // Trigger slideout animation
      const flipCardInner = document.querySelector('.flip-card-inner');
      flipCardInner.style.animationName = 'slideout';
      flipCardInner.style.animationDuration = '1.5s';

      // Delay changing the card index until after the slideout animation completes
      setTimeout(() => {
        currentCardIndex = Number(page) - 1;
        document.querySelector('.flip-card').style.visibility = "hidden";
        showCard(currentCardIndex);
        document.querySelector('.flip-card').style.visibility = "visible";

        // Reset animation name to trigger slidein animation
        flipCardInner.style.animationName = 'slidein';
      }, 1500); // Adjust the delay time to match the animation duration
      isMoving = false
    }
  }
}
// Add event listener to flip card on click
var flipCardElement = document.querySelector('.flip-card-inner');
var touchStartFired = false;

// For touch-enabled devices
flipCardElement.addEventListener('touchstart', function(event) {
    // Prevent the default action to avoid double click/tap
    event.preventDefault();
    // Call your flipCard function here
    if (!touchStartFired) {
        flipCard();
        touchStartFired = true;
    }
});

flipCardElement.addEventListener('touchend', function(event) {
    touchStartFired = false;
});

// For desktop browsers
flipCardElement.addEventListener('click', function(event) {
    // If touchstart has been fired, prevent click event
    if (touchStartFired) {
        event.preventDefault();
        touchStartFired = false;
    } else {
        flipCard();
    }
});
