
var $clr1 = '516E9A'
var $clr2 = '5786A4'
var $clr3 = '51828D'
var $clr5 = '56A4A2'
var $clr4 = '519A87'



var mq = window.matchMedia('only screen and (max-device-width: 841px)');
if(mq.matches) { 

   background_int = function() {
   h = $(window).height();
   w = $(window).width();
   fontSize = w * .22; 
   $("body").css('font-size', fontSize).css('height', h);
   $(".bullet:before").css('height', fontSize*.4).css('width', fontSize*.4);
   };
   
   $(window).resize(function(){  // when window is resized
   background_int();
   });
   
   $(document).ready(function(){ //when page loads
   background_int();
   });
   
  $(window).load(function() {
   background_int();
   $('#load').fadeOut(500);     
   });   
   
var $titlecolor = "black";
   
$(document).ready(function() {
        $('.button').click(function() {
         var $clickedpg = $(this).attr('id');
         if ($clickedpg=="back") {
            document.getElementById("build2").innerHTML = "Evan Piermont"
            $('#page-cont').hide();
            $('#back').hide();
            $("#moretextarrows").hide();
            $('.page').hide();
            $('#button-holder').show();
            $titlecolor = "black";
            $("#build2 > span").css("color", $titlecolor)
         }else{
         $('#page-cont').show();
         $('#back').css("display", "table");
         $('#button-holder').hide();
         $('#'+$clickedpg+'-page').show();
         $titlecolor = $("#"+$clickedpg).css("color");
         $("#build2 > span").css("color", $titlecolor)
         document.getElementById("build2").innerHTML = "Evan Piermont <br> <span id=currentpage>"+$clickedpg+"</span>"
         $("#currentpage").css("color", $titlecolor);
         issamesize('#'+$clickedpg+'-page')
         }
        });
        
});

var $inscrollpercent = 0; //amount of miniwindow scrolled

$(document).ready(function() { 
$("#page-cont-inner").scroll(function() {
        
        var $innerscroll = document.getElementById("page-cont-inner").scrollTop
        
        
        if ($innerscroll > 15) {
                $("#moretextarrows").fadeOut(300);
        } else {
                $("#moretextarrows").fadeIn(300);
        }
        
});
});
////

issamesize = function(x){
        
        var $pci = $("#page-cont-inner").height();
        var $pic = $(x + " > .page-int-cont").height();

if ($pci < $pic + 10) {
        $("#moretextarrows").fadeIn(500);
}


};

} else {


////////////////       The first thing we need to do is bind the action of scrolling to an event in JS
///////////////         simple function

$(window).bind('scroll',function(e){      //this just binds scrolling to call the function parallaxScroll
            parallaxScroll();
});


////////////////       We also want to be able to provide buttons, that quick link to areas of the page
///////////////         we will define a function to jump to a scroll and then a click event on the "buttons" that we want
//////////////           note we do NOT have to use the botton HTML thing. The buttons functions themselves are in the code block below

function scrl($x){
               window.scrollTo(0,$x);
         }
         
         
                  //now the buttons (with .click as the function)
                  
$(document).ready(function() { //we need to re aqquire the window sizes
         d = $(document).height(), 
         c = $(window).height();
});


     
////////////////////
///////////////////   
//////////////////    Now we have parallaxScroll, this is the meat of the scrolling envrioment
/////////////////       We will define the precentage scrolled, so that it works regardless of window size
////////////////          Then, every event will be based off of the percentage scrolled, to ensure that things to do go awry when
///////////////            scrolling happens too fast, we will define if-statements. This makes it so that if the user scrolls too quickly
//////////////               the page will still end up in the place that it needs to be when the event is done.



////////////////////
///////////////////   
//////////////////    Page Trasitions
/////////////////

$currentpage = 'home';
$currenttsp = 'tsp1';
$currentabs = 'abs1';


var $inscrollpercent = 0; //amount of miniwindow scrolled
var $trans1 = 70.65; //precentage until change of button and title
var $trans2 = 183.5;
var $trans3 = 255;
var $transGoal = 50; // target scroll for scroll on botton click in percentages
var $transGoalpx = 50; // target scroll for scroll on botton click in px; final usable value

var $titlecolor = "black" //color of the title rule


$(document).ready(function() { //we need to re aqquire the window sizes
$("#page-cont-inner").scroll(function() {
       // document.getElementById("build2").innerHTML = $inscrollpercent; //this line will tell you what the percentages are too target.
   var $inHeight = $("#page-cont-inner").height();
   var $outHeight = $("#page-cont").height();
   var $inscroll = document.getElementById("page-cont-inner").scrollTop;
   $inscrollpercent = (($inscroll*100)/($outHeight*3));

   $("#background").css("top", -.08*$inscrollpercent + "%")
   
   if ($inscrollpercent < $trans1 - 10) {
      document.getElementById("build2").innerHTML = "Evan Piermont"
      $('.button').removeClass('clicked');
      $("#home").addClass('clicked');
      $titlecolor = $clr1;
      $(".centertext").css("color", "black")
      $(".clicked > .centertext").css("color", $titlecolor)
      
   }
   else if ($inscrollpercent < $trans2 - 10) {
      document.getElementById("build2").innerHTML = "Evan Piermont: <span>Research</span>"
      $('.button').removeClass('clicked');
      $("#research").addClass('clicked');
      $titlecolor = $clr2;
      $("#build2 > span").css("color", $titlecolor)
      $(".centertext").css("color", "black")
      $(".clicked > .centertext").css("color", $titlecolor)
   }
   else if ($inscrollpercent < $trans3 - 10) {
      document.getElementById("build2").innerHTML = "Evan Piermont: <span>Teaching</span>"
      $('.button').removeClass('clicked');
      $("#teaching").addClass('clicked');
      $titlecolor = $clr3;
      $("#build2 > span").css("color", $titlecolor)
      $(".centertext").css("color", "black")
      $(".clicked > .centertext").css("color", $titlecolor) 
   }
   else {
      document.getElementById("build2").innerHTML = "Evan Piermont: <span>Contact</span>"
      $('.button').removeClass('clicked');
      $("#contact").addClass('clicked');
      $titlecolor = $clr4;
      $("#build2 > span").css("color", $titlecolor)
      $(".centertext").css("color", "black")
      $(".clicked > .centertext").css("color", $titlecolor)
      $('#footer').css('bottom', (Math.min(-(255-($inscrollpercent)),0)) +'%');

   }
});
});

function innerscrl($x){
               $("#page-cont-inner").scrollTo(0,$x);
         }
         
$(document).ready(function() {
        $('.button').click(function() {
         var $inHeight = $("#page-cont-inner").height();
         var $outHeight = $("#page-cont").height();
         var $clickedpg = $(this).attr('id');
        $('.button').removeClass('clicked');
        if ($clickedpg=="home") {
         $transGoal = 0;
        }
        if ($clickedpg=="research") {
         $transGoal = $trans1;
        }
         if ($clickedpg=="teaching") {
         $transGoal = $trans2;
        }
         if ($clickedpg=="contact") {
         $transGoal = $trans3;
        }
        $transGoalpx = ($transGoal*.031*$outHeight);
        
        $(this).addClass('clicked');
        $("#page-cont-inner").animate({
         scrollTop: $transGoalpx + "px"
    }, 700);
        });
});

$(document).ready(function() { 
        $('.newabs').click(function() {
            w = $(this).attr('id');
            z = $currentabs;
         if (w != z) {
            $currentabs = w;
         $('#' + w + '-page').show();
         $('#' + z + '-page').hide();
         var $outHeight = $("#page-cont").height();
         $transGoalpx = ($trans1*.031*$outHeight);
        $("#page-cont-inner").animate({
         scrollTop: $transGoalpx + "px"
    }, 200);
      }
        
   });
   $('.exitabs').click(function() {
            x = $currentabs;
            $currentabs = 'abs1';
         $('#abs1-page').show();
         $('#' + w + '-page').hide();
         var $outHeight = $("#page-cont").height();
         $transGoalpx = ($trans1*.031*$outHeight);
        $("#page-cont-inner").animate({
         scrollTop: $transGoalpx + "px"
    }, 200);
   });
   
   
});



};

bg = []

bg[0] = ['url("IMG/CIMG0.jpg")' , "A small house at the edge of Kolaba Fort in Alibag, India; Midday, December 2014 <span class=hideforeground> (Hover to view)<\span>"]
bg[1] = ['url("IMG/CIMG1.jpg")' , "The interior of the Parrish Art Museum, Water Mill, New York; Late afternoon, December 2013 <span class=hideforeground> (Hover to view)<\span>"]
bg[2] = ['url("IMG/CIMG2.jpg")' , "The Lake Gardens in Taiping, Malaysia; Dawn, April 2015.  <span class=hideforeground> (Hover to view)<\span>"]
bg[3] = ['url("IMG/CIMG3.jpg")' , "Ornamental lights hanging in a tree in the Venice Canals, Los Angeles, California; Late Afternoon December 2013 <span class=hideforeground> (Hover to view)<\span>"]
bg[4] = ['url("IMG/CIMG4.jpg")' , "Sunset at La Jolla, San Diego, California; Dusk, December 2013 <span class=hideforeground> (Hover to view)<\span>"]
bg[5] = ['url("IMG/CIMG5.jpg")' , "Outside White Horse in Oxfordshire, UK; Afternoon, August 2013 <span class=hideforeground> (Hover to view)<\span>"]
bg[6] = ['url("IMG/CIMG6.jpg")' , "High pass of the Salkantay Trek, 3 days outside Cusco, Peru; Late Morning, April 2016 <span class=hideforeground> (Hover to view)<\span>"]
bg[7] = ['url("IMG/CIMG7.jpg")' , "Looking up at the Petronas Towers in Kuala Lumpur, Malaysia; Midnight, May 2015 <span class=hideforeground> (Hover to view)<\span>"]
bg[8] = ['url("IMG/CIMG8.jpg")' , "The blue dome of Motor Square Garden, Pittsburgh, Pennsylvania; Dusk, July 2015 <span class=hideforeground> (Hover to view)<\span>"]
bg[9] = ['url("IMG/CIMG9.jpg")' , "Sunset over Potrero Bay, Guanacaste, Costa Rica; Dusk, May 2015<span class=hideforeground> (Hover to view)<\span>"]
bg[10] = ['url("IMG/CIMG10.jpg")' , "Lake in the crater of Cerro Chato, Guanacaste, Costa Rica; Late Afternoon, May 2015 <span class=hideforeground> (Hover to view)<\span>"]
bg[11] = ['url("IMG/CIMG11.jpg")' , "Wild flowers in a small park, Milan, Italy; Noon, June 2015 <span class=hideforeground> (Hover to view)<\span>"]
bg[12] = ['url("IMG/CIMG12.jpg")' , "Lake Michigan, Between Chicago and Evanston, Illinois; Late Afternoon, October 2015 <span class=hideforeground> (Hover to view)<\span>"]
bg[13] = ['url("IMG/CIMG13.jpg")' , "The dunes and coast of Georgica beach, East Hampton, New York; Mid Afternoon, November 2015 <span class=hideforeground> (Hover to view)<\span>"]
bg[14] = ['url("IMG/CIMG14.jpg")' , "Housing development, near Columbus, Ohio; Dusk, Christmas day 2015 <span class=hideforeground> (Hover to view)<\span>"]
bg[15] = ['url("IMG/CIMG15.jpg")' , "Floating reed islands on Lake Titicaca, Peru; Mid Morning, April 2016 <span class=hideforeground> (Hover to view)<\span>"]
bg[16] = ['url("IMG/CIMG16.jpg")' , "Jardin du Mont des Arts, Bruxelles, Belgium; Late Afternoon, July 2016 <span class=hideforeground> (Hover to view)<\span>"]
bg[17] = ['url("IMG/CIMG17.jpg")' , "The Meuse river and its bank, Maastricht, the Netherlands; Dusk, July 2016 <span class=hideforeground> (Hover to view)<\span>"]
bg[18] = ['url("IMG/CIMG18.jpg")' , "Ponce City Market as viewed from the Beltline, Atlanta, Georgia; Late Evening, July 2016 <span class=hideforeground> (Hover to view)<\span>"]
bg[19] = ['url("IMG/CIMG19.jpg")' , "Tile wall on the fifth floor of a pagoda in Kek Lok Si, Penang, Malaysia; Morning, May 2015 <span class=hideforeground> (Hover to view)<\span>"]
bg[20] = ['url("IMG/CIMG20.jpg")' , "Foggy Ski Lift on Mount Hermon, Golan Heights, Isreal; Morning, March 2017 <span class=hideforeground> (Hover to view)<\span>"]
bg[21] = ['url("IMG/CIMG21.jpg")' , "Western edge of Lookout Mountain, Cloudland Canyon, Georgia; Christmas day 2016 <span class=hideforeground> (Hover to view)<\span>"]



c = bg.length;
$currentBack = 5;


function bkgrd() {
   $currentBack = Math.floor((Math.random()*c)) //chooses a random color between 0 and the length of the color array
   $('#background').css('background-image', bg[$currentBack][0]); //changes color using the css
   document.getElementById("footer").innerHTML = bg[$currentBack][1];
};

$(document).ready(function(){ //when page loads
        bkgrd();
   background_int();
   });

$(window).resize(function(){  // when window is resized
   background_int()
   });



$(document).ready(function() { 
        $( ".hideforeground" ).hover(function() {
    $("#page-cont").fadeOut(200, function() {
      $("#headfoot").fadeOut(100);
    });
  }, function() {
    $("#page-cont").fadeIn(100, function() {
      $("#headfoot").fadeIn(100);
    });
  });
});



