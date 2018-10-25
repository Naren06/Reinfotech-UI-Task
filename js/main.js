var currentLocation = 'firstPage';
// No need to set these inside the event listener since they are always the same.
var firstHeight = $('#firstPage').offset().top,
    secondHeight = $('#secondPage').offset().top,
    thirdHeight = $('#thirdPage').offset().top;

// Helper so we can check if the scroll is triggered by user or by animation.
var autoScrolling = false;

$(document).scroll(function(e){
    var scrolled = $(window).scrollTop();
    
    // Only check if the user scrolled
    if (!autoScrolling) {
    	if (scrolled > 1 && currentLocation == 'firstPage') {
            scrollPage(secondHeight, 'secondPage');
        } else if (scrolled > secondHeight + 1 && currentLocation == 'secondPage') {
            scrollPage(thirdHeight, 'thirdPage');
        } else if (scrolled < thirdHeight - 1 && currentLocation == 'thirdPage') {
            scrollPage(secondHeight, 'secondPage');
        } else if (scrolled < secondHeight - 1 && currentLocation == 'secondPage') {
            scrollPage(firstHeight, 'firstPage');
        }
    }
    
    // Since they all have the same animation, you can avoid repetition
    function scrollPage(nextHeight, page) {
      currentLocation = page;

      // At this point, the page will start scrolling by the animation
      // So we switch this var so the listener does not trigger all the if/else
      autoScrolling = true;
      $('body,html').animate({scrollTop:nextHeight}, 500, function () {
          // Once the animation is over, we can reset the helper.
          // Now it is back to detecting user scroll.
          autoScrolling = false;
      });
    }
})