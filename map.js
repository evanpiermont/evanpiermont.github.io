


var r = 5; //map dot radius
var timer = 4; //time dot radius

var displayPaths = 'xx';
var displayTime = 'xx';

window.onresize = function(){  // when window is resized
   background_int();
   };
   
window.onload = function(){ //when page loads
   background_int();
   clickDots();
   createBar();
   clickTimeDots();
   d3.selectAll(".line").style('opacity', 0);
   };



//get those dynamic font sizes
background_int = function() {
   //h = $(window).height();
   w = window.innerWidth;
   fontSize = w * .015; 
   document.body.style.fontSize = fontSize;
   };



function initMap() {

  center = new google.maps.LatLng(center[0], center[1]);
    var map = new google.maps.Map(
    document.getElementById("map_canvas"), { //init map, basically useless
        center: center,
        zoom: zoom,
        disableDefaultUI: true, 
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

 
      //wait till the map is loaded, then call the canvas function (below)
      google.maps.event.addListenerOnce(map, 'idle', function(){

      bounds = map.getBounds();
      overlay = new canvas(bounds, map);
      
      });

    canvas.prototype = new google.maps.OverlayView();

    function canvas(bounds, map) {

      // Initialize all properties.
      this.map_ = map;
      this.bounds_ = bounds
      this.div_ = null;
    
      this.setMap(map);
  };
    
  canvas.prototype.onAdd = function() {

      var div = document.createElement('div');
      div.style.borderStyle = 'none';
      div.style.borderWidth = '0px';
      div.style.position = 'absolute';
      div.setAttribute("id", "canvasDiv");
    
      this.div_ = div;
    
      // Add the element to the "overlayLayer" pane.
      var panes = this.getPanes();
      panes.overlayMouseTarget.appendChild(div);


      var canvasCont = d3.select('#canvasDiv').append("div")
        .append("svg")
        .attr("id", "thatSVG");

        for (i = 0; i < placetime.length; i++){

        canvasCont
          .append("circle")
          .attr("r", r)
          .attr("class", "dot")
          .attr("id", 'loc' + i);
     
      };



  };  
  
  // this fucntion is going to draw the stuff on the map.
  canvas.prototype.draw = function() {

      // We use the south-west and north-east
      // coordinates of the overlay to peg it to the correct position and size.
      // To do this, we need to retrieve the projection from the overlay.
      var overlayProjection = this.getProjection();
    
      // Retrieve the south-west and north-east coordinates of this overlay
      // in LatLngs and convert them to pixel coordinates.
      // We'll use these coordinates to resize the div.
      var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
      var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
    
      // Resize the image's div to fit the indicated dimensions.
      var div = this.div_;
      div.style.left = sw.x + 'px';
      div.style.top = ne.y + 'px';
      div.style.width = (ne.x - sw.x) + 'px';
      div.style.height = (sw.y - ne.y) + 'px';

      //get init point
      var loc = new google.maps.LatLng(placetime[0][0], placetime[0][1]); //create map point from data
      var px = overlayProjection.fromLatLngToDivPixel(loc); //get pixle values for positions
      
      //type of line extrapolation
      var lineGenerator = d3.line().curve(d3.curveBasis);

      //init locations for paths, first two will be sliced off
      var pathinfo = [[],[],[px.x - sw.x, px.y - ne.y]];

      //iterate over points
      for (i = 0; i < placetime.length; i++){
        
        //draw dots
        loc = new google.maps.LatLng(placetime[i][0], placetime[i][1]); 
        px = overlayProjection.fromLatLngToDivPixel(loc); 
        d3.select('#loc' + i)
          .attr("cx", px.x - sw.x)
          .attr("cy", px.y - ne.y) 

          //biuld paths

          if (i > 0){
          //get mid points, add all to pathinfo
          pathinfo = pathinfo.slice(2)
          locmid = new google.maps.LatLng(placetime[i][3], placetime[i][4]); //create map point from data
          pxmid = overlayProjection.fromLatLngToDivPixel(locmid); 
  
          pathinfo.push([pxmid.x - sw.x, pxmid.y - ne.y],[px.x - sw.x, px.y - ne.y])
          var pathData = lineGenerator(pathinfo);
          
          //draw the path for the given two places
          d3.selectAll(".templine" + i).remove();
          d3.select('#thatSVG').append("svg:path")
            .attr("class", "line templine" + i)
            .attr('d', pathData)
            .attr("stroke-width", "1");
        };
        };

        d3.selectAll(".dot").raise()

        if (displayPaths != 'xx'){
          DotsRender(displayPaths);
        };
        if (displayTime != 'xx'){
          TimeDotsRender(displayTime);
        }
  };


};

//when you click a map dot, you get the lines entering and exiting the dot
clickDots = function() {
  d3.selectAll(".dot").on("click", function() {
    displayPaths = 'xx';
    displayTime = 'xx';
    d3.selectAll(".timedot").attr("r", timer).style("fill", "steelblue"); //reset time dots
    d3.selectAll(".dot").attr("r", r).style("fill", "steelblue"); //reset map dots
    d3.select(this).attr("r", r+1).style("fill", "red").raise(); //clicked dot is highlightd
    var id = d3.select(this).attr("id");
    var x = id.slice(3); //get the index from the id 
    displayPaths = [] //which paths
    //for each path does it enter or exit the give node
    for (i = 0; i < placetime.length; i++){
      coords = [placetime[i][0] - placetime[x][0], placetime[i][1] - placetime[x][1]]; 

      if (coords[0]==0 & coords[1]==0){ //if the latlang is the same
              displayPaths.push(i);
      };
    };

    DotsRender(displayPaths)


});

};

DotsRender = function(displayPaths) {
     d3.selectAll(".line").style('opacity', 0);
     for (i = 0; i < displayPaths.length; i++){
        d3.select("#time" + displayPaths[i]).attr("r", timer+1).style("fill", "red").raise(); //cooresponding times are highlighted
        d3.selectAll(".templine" + displayPaths[i]).style('opacity', 1);
        d3.selectAll(".templine" + (displayPaths[i]+1)).style('opacity', 1);
    };

};



createBar = function() {


    var lineCont = d3.select('#bar')
        .append("svg")
        .attr("id", "barlinecont")
        .style('top', '0%')
        .style('left', '0%')
        .style('width', '100%')
        .style('height', '100%')
        .append("svg")
        .attr("id", "lineSVG")
        .style('position', 'absolute')
        .style('top', '0%')
        .style('left', '0%')
        .style('width', '100%')
        .style('height', '100%')
        .attr('viewBox', "0 0 100 100")
        .attr('preserveAspectRatio',"none");

        lineCont
          .append("svg:path")
          .attr('d', 'M2 50 H 98')
          .attr("stroke-width", "5")
          .attr("stroke", "steelblue");


    var barCont = d3.select('#barlinecont')
        .append("svg")
        .attr("id", "barSVG")
        .style('width', '100%')
        .style('height', '100%');


  totaltime = (placetime.slice(-1)[0][2].getTime() - placetime[0][2].getTime())

  for (i = 0; i < placetime.length; i++){

    //time precent is the precentange time since begining date. adjusted to fit in 90% and shifted to start at 5
    time_percent = ((placetime[i][2].getTime() - placetime[0][2].getTime()) * 96 / totaltime) + 2

        barCont
          .append("circle")
          .attr("r", timer)
          .attr("id", 'time' + i)
          .attr("class", 'timedot')
          .attr("cx", time_percent + "%")
          .attr("cy", '50%')
;

    };

  };
  
//when you click a time dot, you get the lines entering and exiting that map dot
TimeDotsRender = function(x) {
    x = parseInt(x) //make number
    d3.select("#loc" + x).attr("r", r+1).style("fill", "red").raise(); //cooresponding map dot is highlighted
    d3.selectAll(".line").style('opacity', 0);
    d3.selectAll(".templine" + x).style('opacity', 1);
    d3.selectAll(".templine" + (x-1)).style('opacity', .5);
    d3.selectAll(".templine" + (x-2)).style('opacity', .3);

};

clickTimeDots = function() {
  d3.selectAll(".timedot").on("click", function() {
    displayPaths = 'xx';
    displayTime = 'xx';
    d3.selectAll(".dot").attr("r", r).style("fill", "steelblue"); //reset map dots
    d3.selectAll(".timedot").attr("r", timer).style("fill", "steelblue"); //reset time dots
    d3.select(this).attr("r", timer+1).style("fill", "red").raise(); //clicked dot is highlightd
    var id = d3.select(this).attr("id");
    displayTime = id.slice(4); //get the index from the id 
    displayTime = parseInt(displayTime); //make number
    TimeDotsRender(displayTime);

});

};





