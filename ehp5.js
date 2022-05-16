


background_int = function() {
   h = $(window).height();
   w = $(window).width();
   fs = Math.min(w/2,h,30);
   fontSize = fs * .08;
   $('#background').css('height', h); //background is exactly window size
   $("body").css('font-size', fontSize).css('height', h); //body is twice window size (allows for scrolling)
};


$(document).ready(function(){ //when page loads
   console.log('dfd')
   background_int();
   });







