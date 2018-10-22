
//array of data points
//lat,lang,time,midpointlat,midlang
placetime = [
[23.209174, 72.689561,new Date(2018, 1, 1)],
[51.463161, -0.151170,new Date(2018, 1, 8),44.106204, 42.673316],//londonhome
[43.208110, -2.918529,new Date(2018, 3, 5),47.396708, -7.099842],
[51.463161, -0.151170,new Date(2018, 3, 8),46.543675, -5.721130],
[33.772819, -84.36121,new Date(2018, 3, 21),47.600826, -50.948232],//home
[51.463161, -0.151170,new Date(2018, 5, 5),54.598230, -50.510201],//londonhome
[32.696341, 34.942186,new Date(2018, 5, 14),50.755626, 27.043367],
[48.841881, 2.336053,new Date(2018, 5, 20),39.717285, 14.677288],
[51.463161, -0.151170,new Date(2018, 5, 23),50.644717, 0.954276],//londonhome
];



window.onresize = function(){  // when window is resized
   background_int();
   };
   
window.onload = function(){ //when page loads
   background_int();
   clickDots();
   };



//get those dynamic font sizes
background_int = function() {
   //h = $(window).height();
   w = window.innerWidth;
   fontSize = w * .015; 
   document.body.style.fontSize = fontSize;
   };



function initMap() {

  center = new google.maps.LatLng(44.721914, 11.751138);
    var map = new google.maps.Map(
    document.getElementById("map_canvas"), { //init map, basically useless
        center: center,
        zoom: 3,
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
          .attr("r", 5)
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
  };


};


clickDots = function() {
  d3.selectAll(".dot").on("click", function() {
     d3.selectAll(".dot").style("fill", "steelblue");
     d3.select(this).style("fill", "red").raise();
     var id = d3.select(this).attr("id");
     var x = id.slice(3);
     displayPaths = []
     for (i = 0; i < placetime.length; i++){
      coords = [placetime[i][0] - placetime[x][0], placetime[i][1] - placetime[x][1]];

      if (coords[0]==0 & coords[1]==0){
              displayPaths.push(i);
      };
     };

     d3.selectAll(".line").style('opacity', 0);
     for (i = 0; i < displayPaths.length; i++){
        console.log(displayPaths[i])
        d3.selectAll(".templine" + displayPaths[i]).style('opacity', 1);
        d3.selectAll(".templine" + (displayPaths[i]+1)).style('opacity', 1);
    };


});

};
  






