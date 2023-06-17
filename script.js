$(function () {
  var saveButtonEl = $('.saveBtn');
  var timeBlock = $('.time-block');
  var currentHour = dayjs().hour();

  for (let i = 0; i < timeBlock.length; i++) {
    var timeBlockHour = $(timeBlock[i]).attr('id').split('-')[1];
    if (timeBlockHour < currentHour) {
      $(timeBlock[i]).addClass('past');
    } else if (parseInt(timeBlockHour) === currentHour) {
      $(timeBlock[i]).addClass('present');
    } else {
      $(timeBlock[i]).addClass('future');
    }
  }

  // The date for the main page of today's date
  var today = dayjs();
  $('#currentDay').text(today.format('MMM D, YYYY'));

  // Add a listener for click events on the save button
  saveButtonEl.on('click', function () {
    var timeBlockId = $(this).parent().attr('id');
    var description = $(this).siblings('.description').val();
    localStorage.setItem(timeBlockId, description);
  });

  // Retrieve saved events from local storage and populate the textarea elements
  for (let i = 0; i < timeBlock.length; i++) {
    var savedEvent = localStorage.getItem($(timeBlock[i]).attr('id'));
    if (savedEvent) {
      $(timeBlock[i]).find('.description').val(savedEvent);
    }
  }
});