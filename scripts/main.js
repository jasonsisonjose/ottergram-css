var HIDDEN_DETAIL_CLASS = "hidden-detail";
var TINY_EFFECT_CLASS = "is-tiny";

var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var PREVIOUS_BUTTON_SELECTOR = '[data-image-role="previous-button"]';
var NEXT_BUTTON_SELETOR = '[data-image-role="next-button"]';

var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  var title = thumbnail.getAttribute('data-image-title');
  console.log(title);
  return title;
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumbnail) {
  'use strict';
  thumbnail.addEventListener('click', function(eventTriggered) {
    // this prevents it from loading in a new page
    eventTriggered.preventDefault();
    setDetailsFromThumb(thumbnail);
    showDetails();
  });
}

function goBack() {
  var currentDetailThumb = document.querySelector(DETAIL_IMAGE_SELECTOR);
  var detailImageLink = currentDetailThumb.getAttribute('src');
  var thumbnail_array = getThumbnailsArray();
  for (var index = 0; index < thumbnail_array.length; index++) {
    if (imageFromThumb(thumbnail_array[index]) == detailImageLink) {
      if ((index - 1) == -1) {
        setDetailsFromThumb(thumbnail_array[4]);
      } else {
        setDetailsFromThumb(thumbnail_array[index - 1]);
      }
    }
  }
}

function goForward() {
  var currentDetailThumb = document.querySelector(DETAIL_IMAGE_SELECTOR);
  var detailImageLink = currentDetailThumb.getAttribute('src');
  var thumbnail_array = getThumbnailsArray();
  for (var index = 0; index < thumbnail_array.length; index++) {
    if (imageFromThumb(thumbnail_array[index]) == detailImageLink) {
      if ((index + 1) == thumbnail_array.length) {
        setDetailsFromThumb(thumbnail_array[0]);
      } else {
        setDetailsFromThumb(thumbnail_array[index + 1]);
      }
    }
  }
}

function addPreviousButtonClick(button) {
  'use strict';
  button.addEventListener('click', function(event) {
    event.preventDefault();
    goBack();
    showDetails();
    console.log("You went back");
  });
}

function addNextButtonClick(button) {
  'use strict';
  button.addEventListener('click', function(event) {
    event.preventDefault();
    goForward();
    showDetails();
    console.log("You went forward");
  });
}

function addAllButtons() {
  var previousButton = document.querySelector(PREVIOUS_BUTTON_SELECTOR);
  var nextButton = document.querySelector(NEXT_BUTTON_SELETOR);
  addPreviousButtonClick(previousButton);
  addNextButtonClick(nextButton);

}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function(event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
}

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);

}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
}

initializeEvents();
addAllButtons();
