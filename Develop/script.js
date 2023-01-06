// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {

  var saveButton = document.querySelectorAll('button');
  var divEl = document.querySelectorAll('.time-block');
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  for (var i = 0; i < saveButton.length; i++){
    saveButton[i].addEventListener('click', saveInput);
  };
  
  function saveInput() {
    var parentEl = this.parentElement.id;
    var parentElSplit = parentEl.split('-');
    var parentElNum = parentElSplit[1];
    var eventEl = this.previousElementSibling.value
    localStorage.setItem(parentElNum, eventEl);
    console.log(parentElNum);
  };



  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  for (var i = 0; i < divEl.length; i++) {
    var divBox = divEl[i];
    var now = dayjs().format('H');
    var blockTime = divBox.id;
    var blockTimeNum = blockTime.split('-');
    var blockTimeLast = blockTimeNum[1];
   

    if (now < blockTimeLast) {
      divBox.classList.remove('past', 'present');
      divBox.classList.add('future');
    }   else if (now > blockTimeLast) {
          divBox.classList.remove('future', 'present');
          divBox.classList.add('past');
    }   else if (now === blockTimeLast) {
          divBox.classList.remove('future', 'past');
          divBox.classList.add('present');
      }
    };



  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

    var textareaEl = document.querySelector('textarea');

   for (var i = 0; i < divEl.length; i++) {
    var divBox = divEl[i];
    var divBoxId = divBox.id;
    var divBoxNum = divBoxId.split('-');
    var divBoxNumLast = divBoxNum[1]; //Gives the NUMBER of the div box, also is the key
    var textArea = divBox.children[1];
    console.log(textArea);

    var value = localStorage.getItem(divBoxNumLast); //Grabs the value of the key number
    console.log(value);
    textArea.innerHTML = value;
    };




  // TODO: Add code to display the current date in the header of the page.
  var currentDate = document.getElementById('currentDay');
  var timeHeader = document.querySelector('header');

  var currentTime = document.createElement('p');
  currentTime.setAttribute('id', 'currentTime');
  timeHeader.append(currentTime);

  function updateDate() {
    var now = dayjs();

    var dateString = now.format('dddd, MMM.DD.YYYY');
    currentDate.innerText = dateString;
    var timeString = now.format('h:mm:ss a');
    currentTime.textContent = timeString;
  };

  setInterval(updateDate, 1000);
});