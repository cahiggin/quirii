//$(function(){


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

	  return newAnchor;

	  // call renderMorphii and pass the new morphii object in
		// along with whatever height and width you'd like morphii to be
	 
	  //var morphiisvg = renderMorphii(newAnchor, height, width);
	  //return morphiisvg;
	};



	// Render the morphii
	// THIS DRAWS THE MORPHY SVG BASED ON THE PASSED IN MORPHY OBJECT
	var renderMorphii = function(morphObj, morphii_height, morphii_width){

		//console.log(morphObj);

	    var cell = document.getElementById("morphii");
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
	    morphii.setAttribute("id", "morphii");

	    var partArray = [];
	    for (var part in morphObj){
	      partArray.push(morphObj[part]);
	    };
    
			// this sets the bezier curve drawing paths for each segment of morphii
	    partArray.forEach(function(i){
	      var path = document.createElementNS(svgns, "path");
	      var d = "M" + i.st.x + "," + i.st.y +
	          "C" + i.c1.x1 + "," + i.c1.y1 + " " + i.c1.x2 + "," + i.c1.y2 + " " + i.c1.x + "," + i.c1.y + 
	          "C" + i.c2.x1 + "," + i.c2.y1 + " " + i.c2.x2 + "," + i.c2.y2 + " " + i.c2.x + "," + i.c2.y + 
	          "C" + i.c3.x1 + "," + i.c3.y1 + " " + i.c3.x2 + "," + i.c3.y2 + " " + i.c3.x + "," + i.c3.y + 
	          "C" + i.c4.x1 + "," + i.c4.y1 + " " + i.c4.x2 + "," + i.c4.y2 + " " + i.c4.x + "," + i.c4.y + 
	          "Z";
	      path.setAttribute("d", d);
	      path.setAttribute("fill", i.color);
	      path.setAttribute("stroke", "transparent");
	      path.setAttribute("stroke-width", "0");
	      morphii.appendChild(path);
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
  		
     	return morphii;
  		//$("#morphii-container").html($("#morphii-container").html());
	};

	// that's all the code you need to make morphii work; the rest is just 
	// a demo





/*

// DEMO of Morphii

// GET request to /morphiis/:scaleName will return a morphii with this structure:
	var morphii = {
	  "_id": "525bfff64900a85a1d000207",
	  "name": "Delight",
	  "anchor": "{\"head\":{\"color\":\"#D5E741\",\"st\":{\"x\":239,\"y\":474},\"c1\":{\"x1\":369.3389892578125,\"y1\":474,\"x2\":475,\"y2\":368.3389892578125,\"x\":475,\"y\":238},\"c2\":{\"x1\":475,\"y1\":107.66100311279297,\"x2\":369.3389892578125,\"y2\":2,\"x\":239,\"y\":2},\"c3\":{\"x1\":108.66100311279297,\"y1\":2,\"x2\":3,\"y2\":107.66100311279297,\"x\":3,\"y\":238},\"c4\":{\"x1\":3,\"y1\":368.3389892578125,\"x2\":108.66100311279297,\"y2\":474,\"x\":239,\"y\":474}},\"ewl\":{\"color\":\"#FFFFFF\",\"st\":{\"x\":244.51100158691406,\"y\":262.72198486328125},\"c1\":{\"x1\":244.51100158691406,\"y1\":316.76300048828125,\"x2\":201.0030059814453,\"y2\":360.5719909667969,\"x\":147.33299255371094,\"y\":360.5719909667969},\"c2\":{\"x1\":93.66300201416016,\"y1\":360.5719909667969,\"x2\":50.154998779296875,\"y2\":316.76300048828125,\"x\":50.154998779296875,\"y\":262.72198486328125},\"c3\":{\"x1\":50.154998779296875,\"y1\":208.68099975585938,\"x2\":93.66300201416016,\"y2\":164.8719940185547,\"x\":147.33299255371094,\"y\":164.8719940185547},\"c4\":{\"x1\":201.0030059814453,\"y1\":164.8719940185547,\"x2\":244.51100158691406,\"y2\":208.68099975585938,\"x\":244.51100158691406,\"y\":262.72198486328125}},\"ewr\":{\"color\":\"#FFFFFF\",\"st\":{\"x\":405.2359924316406,\"y\":261.260986328125},\"c1\":{\"x1\":405.2359924316406,\"y1\":308.8550109863281,\"x2\":367.80999755859375,\"y2\":347.43701171875,\"x\":321.64300537109375,\"y\":347.43701171875},\"c2\":{\"x1\":275.47601318359375,\"y1\":347.43701171875,\"x2\":238.05099487304688,\"y2\":308.8550109863281,\"x\":238.05099487304688,\"y\":261.260986328125},\"c3\":{\"x1\":238.05099487304688,\"y1\":213.66700744628906,\"x2\":275.47601318359375,\"y2\":175.0850067138672,\"x\":321.64300537109375,\"y\":175.0850067138672},\"c4\":{\"x1\":367.80999755859375,\"y1\":175.0850067138672,\"x2\":405.2359924316406,\"y2\":213.66700744628906,\"x\":405.2359924316406,\"y\":261.260986328125}},\"pl\":{\"color\":\"#4A4A4A\",\"st\":{\"x\":150.9669952392578,\"y\":288},\"c1\":{\"x1\":162.031005859375,\"y1\":288,\"x2\":171,\"y2\":278.6700134277344,\"x\":171,\"y\":267.1619873046875},\"c2\":{\"x1\":171,\"y1\":255.6529998779297,\"x2\":162.031005859375,\"y2\":246.32400512695312,\"x\":150.9669952392578,\"y\":246.32400512695312},\"c3\":{\"x1\":139.9029998779297,\"y1\":246.32400512695312,\"x2\":130.9340057373047,\"y2\":255.6529998779297,\"x\":130.9340057373047,\"y\":267.1619873046875},\"c4\":{\"x1\":130.9340057373047,\"y1\":278.6700134277344,\"x2\":139.9029998779297,\"y2\":288,\"x\":150.9669952392578,\"y\":288}},\"pr\":{\"color\":\"#4A4A4A\",\"st\":{\"x\":321.6719970703125,\"y\":284.80499267578125},\"c1\":{\"x1\":331.2980041503906,\"y1\":284.80499267578125,\"x2\":339.10101318359375,\"y2\":276.843994140625,\"x\":339.10101318359375,\"y\":267.02398681640625},\"c2\":{\"x1\":339.10101318359375,\"y1\":257.2040100097656,\"x2\":331.2980041503906,\"y2\":249.2429962158203,\"x\":321.6719970703125,\"y\":249.2429962158203},\"c3\":{\"x1\":312.0469970703125,\"y1\":249.2429962158203,\"x2\":304.2430114746094,\"y2\":257.2040100097656,\"x\":304.2430114746094,\"y\":267.02398681640625},\"c4\":{\"x1\":304.2430114746094,\"y1\":276.843994140625,\"x2\":312.0469970703125,\"y2\":284.80499267578125,\"x\":321.6719970703125,\"y\":284.80499267578125}},\"bl\":{\"color\":\"#9CAF13\",\"st\":{\"x\":39.97600173950195,\"y\":181.0850067138672},\"c1\":{\"x1\":85.23500061035156,\"y1\":144.22900390625,\"x2\":101.05400085449219,\"y2\":127.37200164794922,\"x\":164.86399841308594,\"y\":137.80099487304688},\"c2\":{\"x1\":202.03500366210938,\"y1\":143.8769989013672,\"x2\":215.38099670410156,\"y2\":151.96200561523438,\"x\":218.34300231933594,\"y\":138.33799743652344},\"c3\":{\"x1\":221.7729949951172,\"y1\":122.55799865722656,\"x2\":186.91600036621094,\"y2\":125.9530029296875,\"x\":138.63099670410156,\"y\":122.82099914550781},\"c4\":{\"x1\":92.45500183105469,\"y1\":124.1510009765625,\"x2\":61.65999984741211,\"y2\":154.41799926757812,\"x\":39.97600173950195,\"y\":181.0850067138672}},\"br\":{\"color\":\"#9CAF13\",\"st\":{\"x\":256.24200439453125,\"y\":144.56199645996094},\"c1\":{\"x1\":247.92999267578125,\"y1\":127.61199951171875,\"x2\":309.4119873046875,\"y2\":130.54800415039062,\"x\":334.3240051269531,\"y\":129.68299865722656},\"c2\":{\"x1\":358.4289855957031,\"y1\":128.8459930419922,\"x2\":391.0350036621094,\"y2\":152.0850067138672,\"x\":417.4110107421875,\"y\":186.8719940185547},\"c3\":{\"x1\":367.5950012207031,\"y1\":144.60400390625,\"x2\":355.656005859375,\"y2\":136.9980010986328,\"x\":309.07501220703125,\"y\":143.05099487304688},\"c4\":{\"x1\":262.3999938964844,\"y1\":149.11599731445312,\"x2\":262.6789855957031,\"y2\":157.68800354003906,\"x\":256.24200439453125,\"y\":144.56199645996094}},\"mouth\":{\"color\":\"#9CAE13\",\"st\":{\"x\":200.96099853515625,\"y\":396.1050109863281},\"c1\":{\"x1\":201.92999267578125,\"y1\":394.0069885253906,\"x2\":224.625,\"y2\":393.3489990234375,\"x\":242.54400634765625,\"y\":392.93701171875},\"c2\":{\"x1\":260.4630126953125,\"y1\":392.5260009765625,\"x2\":282.42401123046875,\"y2\":391.0589904785156,\"x\":280.9410095214844,\"y\":394.2699890136719},\"c3\":{\"x1\":279.4590148925781,\"y1\":397.4809875488281,\"x2\":256.9110107421875,\"y2\":393.8609924316406,\"x\":239.08900451660156,\"y\":394.2699890136719},\"c4\":{\"x1\":221.26699829101562,\"y1\":394.6789855957031,\"x2\":199.99200439453125,\"y2\":398.2030029296875,\"x\":200.96099853515625,\"y\":396.1050109863281}}}",
	  "delta": "{\"head\":{\"st\":{\"x\":0,\"y\":0},\"c1\":{\"x1\":0,\"y1\":0,\"x2\":0,\"y2\":0,\"x\":0,\"y\":0},\"c2\":{\"x1\":0,\"y1\":0,\"x2\":0,\"y2\":0,\"x\":0,\"y\":0},\"c3\":{\"x1\":0,\"y1\":0,\"x2\":0,\"y2\":0,\"x\":0,\"y\":0},\"c4\":{\"x1\":0,\"y1\":0,\"x2\":0,\"y2\":0,\"x\":0,\"y\":0}},\"ewl\":{\"st\":{\"x\":0.3939971923828125,\"y\":-25.363983154296875},\"c1\":{\"x1\":0.3939971923828125,\"y1\":-23.907989501953125,\"x2\":-1.4860076904296875,\"y2\":-22.72698974609375,\"x\":-3.8029937744140625,\"y\":-22.72698974609375},\"c2\":{\"x1\":-6.121002197265625,\"y1\":-22.72698974609375,\"x2\":-8,\"y2\":-23.907989501953125,\"x\":-8,\"y\":-25.363983154296875},\"c3\":{\"x1\":-8,\"y1\":-26.82000732421875,\"x2\":-6.121002197265625,\"y2\":-28,\"x\":-3.8029937744140625,\"y\":-28},\"c4\":{\"x1\":-1.4860076904296875,\"y1\":-28,\"x2\":0.3939971923828125,\"y2\":-26.82000732421875,\"x\":0.3939971923828125,\"y\":-25.363983154296875}},\"ewr\":{\"st\":{\"x\":7.33502197265625,\"y\":-25.402984619140625},\"c1\":{\"x1\":7.33502197265625,\"y1\":-24.121002197265625,\"x2\":5.718994140625,\"y2\":-23.081024169921875,\"x\":3.725006103515625,\"y\":-23.081024169921875},\"c2\":{\"x1\":1.73199462890625,\"y1\":-23.081024169921875,\"x2\":0.1150054931640625,\"y2\":-24.121002197265625,\"x\":0.1150054931640625,\"y\":-25.402984619140625},\"c3\":{\"x1\":0.1150054931640625,\"y1\":-26.685012817382812,\"x2\":1.73199462890625,\"y2\":-27.725006103515625,\"x\":3.725006103515625,\"y\":-27.725006103515625},\"c4\":{\"x1\":5.718994140625,\"y1\":-27.725006103515625,\"x2\":7.33502197265625,\"y2\":-26.685012817382812,\"x\":7.33502197265625,\"y\":-25.402984619140625}},\"pl\":{\"st\":{\"x\":24.533004760742188,\"y\":-83.01300048828125},\"c1\":{\"x1\":31.805999755859375,\"y1\":-83.01300048828125,\"x2\":26,\"y2\":-58.7440185546875,\"x\":26,\"y\":-59.6619873046875},\"c2\":{\"x1\":26,\"y1\":-60.57899475097656,\"x2\":25.342987060546875,\"y2\":-61.324005126953125,\"x\":24.533004760742188,\"y\":-61.324005126953125},\"c3\":{\"x1\":23.723007202148438,\"y1\":-61.324005126953125,\"x2\":23.065994262695312,\"y2\":-60.57899475097656,\"x\":23.065994262695312,\"y\":-59.6619873046875},\"c4\":{\"x1\":23.065994262695312,\"y1\":-58.7440185546875,\"x2\":17.259994506835938,\"y2\":-83.01300048828125,\"x\":24.533004760742188,\"y\":-83.01300048828125}},\"pr\":{\"st\":{\"x\":-13.1719970703125,\"y\":-77.18099975585938},\"c1\":{\"x1\":-4.298004150390625,\"y1\":-77.18099975585938,\"x2\":-12.10101318359375,\"y2\":-58.381988525390625,\"x\":-12.10101318359375,\"y\":-59.399993896484375},\"c2\":{\"x1\":-12.10101318359375,\"y1\":-60.41801452636719,\"x2\":-12.58099365234375,\"y2\":-61.24299621582031,\"x\":-13.1719970703125,\"y\":-61.24299621582031},\"c3\":{\"x1\":-13.764007568359375,\"y1\":-61.24299621582031,\"x2\":-14.243011474609375,\"y2\":-60.41801452636719,\"x\":-14.243011474609375,\"y\":-59.399993896484375},\"c4\":{\"x1\":-14.243011474609375,\"y1\":-58.381988525390625,\"x2\":-22.0469970703125,\"y2\":-77.18099975585938,\"x\":-13.1719970703125,\"y\":-77.18099975585938}},\"bl\":{\"st\":{\"x\":5.053997039794922,\"y\":-7.673004150390625},\"c1\":{\"x1\":-14.762001037597656,\"y1\":-23.348007202148438,\"x2\":-23.368003845214844,\"y2\":-28.454002380371094,\"x\":-24.938995361328125,\"y\":-56.39799499511719},\"c2\":{\"x1\":-25.85400390625,\"y1\":-72.6760025024414,\"x2\":-23.688003540039062,\"y2\":-79.07400512695312,\"x\":-29.723007202148438,\"y\":-79.04899597167969},\"c3\":{\"x1\":-36.71299743652344,\"y1\":-79.02099990844727,\"x2\":-32.011993408203125,\"y2\":-64.60700225830078,\"x\":-28.811996459960938,\"y\":-43.907997131347656},\"c4\":{\"x1\":-23.923004150390625,\"y1\":-24.516998291015625,\"x2\":-8.247001647949219,\"y2\":-14.339004516601562,\"x\":5.053997039794922,\"y\":-7.673004150390625}},\"br\":{\"st\":{\"x\":33.889007568359375,\"y\":-85.32799530029297},\"c1\":{\"x1\":42.490997314453125,\"y1\":-87.25500106811523,\"x2\":34.456024169921875,\"y2\":-59.66200256347656,\"x\":32.134002685546875,\"y\":-48.258995056152344},\"c2\":{\"x1\":29.886016845703125,\"y1\":-37.22399139404297,\"x2\":15.782989501953125,\"y2\":-24.954010009765625,\"x\":-2.885009765625,\"y\":-16.77099609375},\"c3\":{\"x1\":21.7340087890625,\"y1\":-34.780006408691406,\"x2\":26.48699951171875,\"y2\":-39.371002197265625,\"x\":28.816986083984375,\"y\":-61.178993225097656},\"c4\":{\"x1\":31.1510009765625,\"y1\":-83.02999877929688,\"x2\":27.22802734375,\"y2\":-83.83700561523438,\"x\":33.889007568359375,\"y\":-85.32799530029297}},\"mouth\":{\"st\":{\"x\":-7.9739990234375,\"y\":-25.6300048828125},\"c1\":{\"x1\":-22.6669921875,\"y1\":-53.218994140625,\"x2\":-25.470001220703125,\"y2\":-27.260986328125,\"x\":2.89898681640625,\"y\":-26.8489990234375},\"c2\":{\"x1\":31.267974853515625,\"y1\":-26.43798828125,\"x2\":27.802978515625,\"y2\":-47.9219970703125,\"x\":19.08599853515625,\"y\":-23.79498291015625},\"c3\":{\"x1\":12.670989990234375,\"y1\":-5.83599853515625,\"x2\":23.23199462890625,\"y2\":40.17999267578125,\"x\":8.771987915039062,\"y\":39.77099609375},\"c4\":{\"x1\":-5.6880035400390625,\"y1\":39.36199951171875,\"x2\":0.1929931640625,\"y2\":-12.156005859375,\"x\":-7.9739990234375,\"y\":-25.6300048828125}}}"
	};

		// INITIALIZE THE MORPHY

		// your GET request to /morphiis/:scaleName returns a morphii object
		// Each morphii has an anchor parameter and a delta parameter
		var anch = JSON.parse(morphii.anchor);
		var delt = JSON.parse(morphii.delta);

		// Get the current slider value which should be 0
		var intensityVal = $("input[name=intensity]").val();

		// Call setMorphiiPaths with the morphii.anchor, slider value, and morphii.delta 
		// to update morphii 
		// you can pass in a height and width as additional parameters if you'd like
		// otherwise morphii will be drawn 250px x 250px
		setMorphiiPaths(anch, intensityVal, delt);




		// EVENT HANDLER FOR THE VIEW WITH THE SLIDER

		// Handle the range input change event

		$("input[name=intensity]").change(function(){
	
			// your slider event handler just needs to call setMorphiiPaths() again
			// pass the morphii.anchor, current slider value, and morphii.delta
			setMorphiiPaths(anch, $(this).val(), delt);
	
		});

		*/
		
		// The only other thing you need to make sure you do is have an empty <div>
		// with id "morphii-container".  The SVG is drawn into this div.
		
		// =========================== //
		// HOW TO DRAW A STATIC MORPHY //
		// =========================== //
		
		// All you need to do is call the same setMorphiiPaths function, but specify
		// what the intensity is
		//
		// If a user gave feedback of 0.312, you would just call
		
		// setMorphiiPaths(anch, 0.312, delt);
		

//});
