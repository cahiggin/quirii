	//
	// MORPHY METHODS
	//

	// Create a morphii object
	var morphiiObject = {};

	// This creates the morphii object with the updated path values
	morphiiObject.setPathSegs = function (anchor, intensity, delta){
		
		if(anchor === undefined){
			console.log("nothing to show");
			return 
		};

		current_morphii = {};
		var current_anch = JSON.parse(anchor);
		var current_delt = JSON.parse(delta);

		for (var segment in current_anch){
			current_morphii[segment]= this.calculatePath(segment, current_anch[segment], intensity, current_delt[segment]);
		};
		
		return current_morphii;
	};
  
	// This calculates the anchor and control points for each individual morphii object path
	morphiiObject.calculatePath = function (segment, anchorSeg, intensity, deltaSeg){

		segment = {
			seg: segment,
		  color: anchorSeg.color,
		  st : {
		    x: anchorSeg.st.x + (intensity *  deltaSeg.st.x),
		    y: anchorSeg.st.y + (intensity * deltaSeg.st.y)},
		  c1: {
		    x1: anchorSeg.c1.x1 + (intensity *  deltaSeg.c1.x1),
		    y1: anchorSeg.c1.y1 + (intensity *  deltaSeg.c1.y1),
		    x2: anchorSeg.c1.x2 + (intensity *  deltaSeg.c1.x2),
		    y2: anchorSeg.c1.y2 + (intensity *  deltaSeg.c1.y2),
		    x: anchorSeg.c1.x + (intensity *  deltaSeg.c1.x),
		    y: anchorSeg.c1.y + (intensity *  deltaSeg.c1.y)},
		  c2: {
		    x1: anchorSeg.c2.x1 + (intensity *  deltaSeg.c2.x1),
		    y1: anchorSeg.c2.y1 + (intensity *  deltaSeg.c2.y1),
		    x2: anchorSeg.c2.x2 + (intensity *  deltaSeg.c2.x2),
		    y2: anchorSeg.c2.y2 + (intensity *  deltaSeg.c2.y2),
		    x: anchorSeg.c2.x + (intensity *  deltaSeg.c2.x),
		    y: anchorSeg.c2.y + (intensity *  deltaSeg.c2.y)},
		  c3: {
		    x1: anchorSeg.c3.x1 + (intensity *  deltaSeg.c3.x1),
		    y1: anchorSeg.c3.y1 + (intensity *  deltaSeg.c3.y1),
		    x2: anchorSeg.c3.x2 + (intensity *  deltaSeg.c3.x2),
		    y2: anchorSeg.c3.y2 + (intensity *  deltaSeg.c3.y2),
		    x: anchorSeg.c3.x + (intensity *  deltaSeg.c3.x),
		    y: anchorSeg.c3.y + (intensity *  deltaSeg.c3.y)},
		  c4: {
		    x1: anchorSeg.c4.x1 + (intensity *  deltaSeg.c4.x1),
		    y1: anchorSeg.c4.y1 + (intensity *  deltaSeg.c4.y1),
		    x2: anchorSeg.c4.x2 + (intensity *  deltaSeg.c4.x2),
		    y2: anchorSeg.c4.y2 + (intensity *  deltaSeg.c4.y2),
		    x: anchorSeg.c4.x + (intensity *  deltaSeg.c4.x),
		    y: anchorSeg.c4.y + (intensity *  deltaSeg.c4.y)},
		}
		return(segment);
	};




	// this sets the morphii paths and calls renderMorphii with the new morphii object
	var setMorphiiPaths = function(anchor, intensity, delta, height, width){

		if (!height){ var height = 250; };
		if (!width){ var width = 250; };

	  // create a new morphii object with the passed in values.
	  var newAnchor = morphiiObject.setPathSegs(anchor, intensity, delta);

	  //return newAnchor;

	  // call renderMorphii and pass the new morphii object in
		// along with whatever height and width you'd like morphii to be
	 
	  var morphiisvg = renderMorphii(newAnchor, height, width);
	  return morphiisvg;
	};



	// Render the morphii
	// THIS DRAWS THE MORPHY SVG BASED ON THE PASSED IN MORPHY OBJECT
	var renderMorphii = function(morphObj, morphii_height, morphii_width){

		//console.log(morphObj);

	    /*var cell = document.getElementById("morphii");
			// this clears the old morphii out when he's redrawn
	    if (cell != null){
	      cell.parentNode.removeChild( cell );
	    };
		
		// set the svg namespace
	    var svgns = "http://www.w3.org/2000/svg";
     
		// mess with this to change the width of the morphii
		var width = morphii_width;
		// mess with this to change the height of the morphii
	    var height = morphii_height; 
		
	    var morphii = document.createElementNS(svgns, "svg:svg");
	    morphii.setAttribute("width", width);
	    morphii.setAttribute("height", height);
	    morphii.setAttribute("viewBox", "0 0 478 478");
	    morphii.setAttribute("id", "morphii");*/

	    var group = document.getElementById("morphiiGroup");
        var cell = document.getElementById("morphii");
        var path = document.getElementById("morphii-path");
        //console.log("MORPHII ", cell);
        
        /*if (group != null){
        	console.log("GROUP ISN'T NULL");
        	console.log(group);
            $(group).empty();

        };*/



	    var morphii = [];

	    var partArray = [];
	    for (var part in morphObj){
	      partArray.push(morphObj[part]);
	    };
    
			// this sets the bezier curve drawing paths for each segment of morphii
	    partArray.forEach(function(i){
	      //var path = document.createElementNS(svgns, "path");
	      var d = "M" + i.st.x + "," + i.st.y +
	          "C" + i.c1.x1 + "," + i.c1.y1 + " " + i.c1.x2 + "," + i.c1.y2 + " " + i.c1.x + "," + i.c1.y + 
	          "C" + i.c2.x1 + "," + i.c2.y1 + " " + i.c2.x2 + "," + i.c2.y2 + " " + i.c2.x + "," + i.c2.y + 
	          "C" + i.c3.x1 + "," + i.c3.y1 + " " + i.c3.x2 + "," + i.c3.y2 + " " + i.c3.x + "," + i.c3.y + 
	          "C" + i.c4.x1 + "," + i.c4.y1 + " " + i.c4.x2 + "," + i.c4.y2 + " " + i.c4.x + "," + i.c4.y + 
	          "Z";
	      
	      var segment = {};
	      segment.order = partArray.indexOf(i) + 1;
	      segment.name = i.seg;
	      segment.path = d;
	      segment.color = i.color;

	      morphii.push(segment);
	      /*path.setAttribute("d", d);
	      path.setAttribute("fill", i.color);
	      path.setAttribute("stroke", "transparent");
	      path.setAttribute("stroke-width", "0");
	      morphii.appendChild(path);*/
	    });
   
	   // This draws the svg into the empty div in view
		 // whatever element you'd like morphii to be appended to
		 // specify here

		 //JQUERY MORPHII
	  	//$("#morphii-container").append(morphii);
	  	//console.log(morphii);

	  	
	  	//angular


	  	
	  	//angular.element('#morphii-container').append(morphiiString);
	  	//var morphiiEl = angular.element( document.querySelector( '#morphii-container' ) );
     	//morphiiEl.append(morphii);
     	console.log(morphii);
  		return morphii;
     	//return morphii;
  		//$("#morphii-container").html($("#morphii-container").html());
	};



		/*
		FOR FINDING MORPHY PARTS 
		var lookup = {};
			for (var i = 0, len = array.length; i < len; i++) {
			    lookup[array[i].id] = array[i];
			}

			... now you can use lookup[id]...


		app.controller('MainCtrl', function($scope) {
		 $scope.squares = [{
		    path: "M0,0L50,0L50,50L0,50z",
		    color: 'blue',
		    order: 2
		  }, {
		    path: "M0,0L75,0L75,75L0,75z",
		    color: 'purple',
		    order: 1
		  }];
		});

		app.directive('hello', function($compile) {
		  return {
		    restrict: 'E',
		    transclude: true,
		    compile: function(tElement, tAttr, transclude) {
		      return function(scope, element) {
		        transclude(scope.$parent, function(clone) {
		          var newElement = $('<div>Hello </div>');
		          newElement.append(clone);
		          element.replaceWith(newElement);
		        });
		      }
		    }
		  }
		});

		app.directive('world', function() {
		  return {
		    restrict: 'E',
		    compile: function(tElement, tAttr) {
		      return function(scope, element) {
		        element.replaceWith('<span>World</span>');
		      }
		    }
		  }
		}) 

		app.directive('group', function($compile) {
		  return {
		    restrict: 'E',
		    link: function(scope, lElement, lAttr) {
		      var path = makeNode('g', lElement, lAttr);
		      var newDad = path.cloneNode(true);
		      var children = lElement.children();
		      $(newDad).append(children);
		      lElement.replaceWith(newDad);
		    }
		  }
		});

		app.directive('shape', function($timeout) {
		  return {
		    restrict: 'E',
		    link: function(scope, lElement, lAttr) {
		      var path = makeNode('path', lElement, lAttr);
		      var newGuy = path.cloneNode(true);
		      $timeout(function() {
		        lElement.replaceWith(newGuy);
		      })
		      console.log('Replacing ', lElement, ' with ', newGuy);
		    }
		  }
		})*/

		/* Create a shape node with the given settings. */
		/*function makeNode(name, element, settings) {
		  var ns = 'http://www.w3.org/2000/svg';
		  var node = document.createElementNS(ns, name);
		  for (var attribute in settings) {
		    var value = settings[attribute];
		    if (value !== null && value !== null && !attribute.match(/\$/) &&
		      (typeof value !== 'string' || value !== '')) {
		      node.setAttribute(attribute, value);
		    }
		  }
		  return node;
		}*/