

var mq = window.matchMedia('only screen and (max-device-width: 841px)');
if(mq.matches) { 

   background_int = function() {

   h = $(window).height();
   w = $(window).width();
   fontSize = Math.min(w * .22, 50); 
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

background_int=function(){
    h=$(window).height(),
    w=$(window).width(),
    fs=Math.min(w/2,h),
    fontSize=Math.max(.08*fs,35),
    $("#background").css("height",h*1.25),
    $("body").css("font-size",fontSize).css("height",h)
},


$(document).ready(function() {
    background_int()
});


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

$currenttsp = 'tsp1';
$currentabs = 'abs1';


$(document).ready(function() { //we need to re aqquire the window sizes
$("#page-cont-inner").scroll(function() {




    let titleText = {
        'home-page': ['','51828D'],
        'research-page': [': <span>Research</span>','51828D'],
        'teaching-page': [': <span>Teaching</span>','5786A4'],
        'elltwo-page': [': <span>Elltwo // The Partial Order</span>','519A87'],
        'contact-page': [': <span>Contact</span>','56A4A2'],
    }

    //console.log(this.scrollTop)
    let h = window.innerHeight; 
    let offset = {}
    let s = this.scrollTop
    $('.page').each((t,v) => {
        offset[v.id] = v.offsetTop - 115 //v.offset())
    })

    let currentpage = null;
    Object.keys(offset).forEach(function(key) {
        if (s >= (offset[key] - h/2)){
            currentpage = key
        }
    });

    document.getElementById("build2").innerHTML = 'Evan Piermont' + titleText[currentpage][0];
    $("#build2 > span").css("color", titleText[currentpage][1])
    $('.button').css("color", 'unset')
    $(`#${currentpage.slice(0,-5)}`).css("color", titleText[currentpage][1])

});
});

function innerscrl($x){
               $("#page-cont-inner").scrollTo(0,$x);
         }
         
$(document).ready(function() {
        $('.button').click(function() {
        let clicked = $(this).attr('id');
        let goal = $(`#${clicked}-page`)[0].offsetTop - 115        
        $("#page-cont-inner").animate({
         scrollTop: goal + "px"
    }, 700);
        });
});

$(document).ready(function() {
    renderElltwo();
    creatElltwoLinks();
});

$(document).ready(function() { 
        $('.newabs').click(function() {
            w = $(this).parent().parent().find('.absx')
            w.toggle()
        
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
bg[6] = ['url("IMG/CIMG6.jpg")' , "High pass of the Salkantay Trek, 3 days by foot outside Cusco, Peru; Late Morning, April 2016 <span class=hideforeground> (Hover to view)<\span>"]
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
bg[17] = ['url("IMG/CIMG17.jpg")' , "The Swiss Alps peeking about the clouds, Engelberg, Switzerland; Late Morning, September 2018<span class=hideforeground> (Hover to view)<\span>"]
bg[18] = ['url("IMG/CIMG18.jpg")' , "Ponce City Market as viewed from the Beltline, Atlanta, Georgia; Late Evening, July 2016 <span class=hideforeground> (Hover to view)<\span>"]
bg[19] = ['url("IMG/CIMG19.jpg")' , "Tile wall on the fifth floor of a pagoda in Kek Lok Si, Penang, Malaysia; Morning, May 2015 <span class=hideforeground> (Hover to view)<\span>"]
bg[20] = ['url("IMG/CIMG20.jpg")' , "Foggy Ski Lift on Mount Hermon, Golan Heights, Isreal; Morning, March 2017 <span class=hideforeground> (Hover to view)<\span>"]
bg[21] = ['url("IMG/CIMG21.jpg")' , "Western edge of Lookout Mountain, Cloudland Canyon, Georgia; Christmas day 2016 <span class=hideforeground> (Hover to view)<\span>"]
bg[22] = ['url("IMG/CIMG22.jpg")' , "Looking out a giftshop window, Bailey Island, Maine; Midday October 2017 <span class=hideforeground> (Hover to view)<\span>"]
bg[23] = ['url("IMG/CIMG23.jpg")' , "Hills outide Harmon, Northern Isreal; Late Afternoon, May 2018 <span class=hideforeground> (Hover to view)<\span>"]
bg[24] = ['url("IMG/CIMG24.jpg")' , "The top of a small peak, outside Windermere, Northern England; Late Afternoon October 2017 <span class=hideforeground> (Hover to view)<\span>"]
bg[25] = ['url("IMG/CIMG25.jpg")' , "The desert cactus greenhouse, Kew Gardens, London, England; Noontime January 2018 <span class=hideforeground> (Hover to view)<\span>"]
bg[26] = ['url("IMG/CIMG26.jpg")' , "A rusted iron scupture off the Beltline trail, Atlanta, Georgia; Mid Afternoon February 2018 <span class=hideforeground> (Hover to view)<\span>"]
bg[27] = ['url("IMG/CIMG27.jpg")' , "Gaztelugatxeko Doniene off the coast of Biscay, Spain; Dusk March 2018 <span class=hideforeground> (Hover to view)<\span>"]



b_len = bg.length;
$currentBack = 5;


function bkgrd() {
   $currentBack = Math.floor((Math.random()*b_len)) //chooses a random color between 0 and the length of the color array
   console.log($currentBack, b_len)
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



