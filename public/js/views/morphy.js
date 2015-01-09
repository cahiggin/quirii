define(['QuiriiNetViewPublic', 'text!templates/morphyUi.html', 'models/Morphii', 'views/morphy'], 
  function(QuiriiNetViewPublic, morphyUiTemplate, Morphy, MorphyView){
    
    var morphyView = QuiriiNetViewPublic.extend({
      
      el: $('#morphy-container'),
      

      initialize:function(options){
        _.bindAll(this, 'render','updateMorphy');
      },
      
      render: function(morphObj){
        console.log(morphObj);
        var cell = document.getElementById("morphy");
        if (cell != null)
        {
          cell.parentNode.removeChild( cell );
        };

        var svgns = "http://www.w3.org/2000/svg";
        var width = 250;
        var height = 250;
        var vbx1 = 478; //was 250
        var vbx2 = 478; //was 250

        var morphy = document.createElementNS(svgns, "svg:svg");
        morphy.setAttribute("width", width);
        morphy.setAttribute("height", height);
        morphy.setAttribute("viewBox", "0 0 " + vbx1 + " " + vbx2);
        morphy.setAttribute("id", "morphy");

        var partArray = [];
        for (var part in morphObj){
          partArray.push(morphObj[part]);
        };
        
        partArray.forEach(function(i){

          var path = document.createElementNS(svgns, "path");
          //path details go here
          var d = "M" + i.st.x + "," + i.st.y +
              "C" + i.c1.x1 + "," + i.c1.y1 + " " + i.c1.x2 + "," + i.c1.y2 + " " + i.c1.x + "," + i.c1.y + 
              "C" + i.c2.x1 + "," + i.c2.y1 + " " + i.c2.x2 + "," + i.c2.y2 + " " + i.c2.x + "," + i.c2.y + 
              "C" + i.c3.x1 + "," + i.c3.y1 + " " + i.c3.x2 + "," + i.c3.y2 + " " + i.c3.x + "," + i.c3.y + 
              "C" + i.c4.x1 + "," + i.c4.y1 + " " + i.c4.x2 + "," + i.c4.y2 + " " + i.c4.x + "," + i.c4.y + 
              "Z";
          //end path details
          path.setAttribute("d", d);
          path.setAttribute("fill", i.color);
          path.setAttribute("stroke", "transparent");
          path.setAttribute("stroke-width", "0");
          morphy.appendChild(path);
        });
       
      this.$el.append(morphy);
      
      },



      morphMe: function(anchor, intensity, delta){


          //accessory functions:
          //MorphMe is called from buildMyMorphy to create the anch:
          function MorphMe(ankor, smiley, delta){
              var that = this;
              this.head = new MakeMorph(ankor.head, smiley, delta.head);
              this.ewl = new MakeMorph(ankor.ewl, smiley, delta.ewl);
              this.ewr = new MakeMorph(ankor.ewr, smiley, delta.ewr);
              this.pl = new MakeMorph(ankor.pl, smiley, delta.pl);
              this.pr = new MakeMorph(ankor.pr, smiley, delta.pr);
              this.bl = new MakeMorph(ankor.bl, smiley, delta.bl);
              this.br = new MakeMorph(ankor.br, smiley, delta.br);
              this.mouth = new MakeMorph(ankor.mouth, smiley, delta.mouth);
          };
          //end MorphMe();
          


          //MakeMorph is called from MorphMe to determine values for Morphy:
          function MakeMorph(anch, smiley, delt){
              this.color = anch.color;
              this.st = {
                  x: anch.st.x + (smiley *  delt.st.x),
                  y: anch.st.y + (smiley * delt.st.y)};
              this.c1 = {
                  x1: anch.c1.x1 + (smiley *  delt.c1.x1),
                  y1: anch.c1.y1 + (smiley *  delt.c1.y1),
                  x2: anch.c1.x2 + (smiley *  delt.c1.x2),
                  y2: anch.c1.y2 + (smiley *  delt.c1.y2),
                  x: anch.c1.x + (smiley *  delt.c1.x),
                  y: anch.c1.y + (smiley *  delt.c1.y)};
              this.c2 = {
                  x1: anch.c2.x1 + (smiley *  delt.c2.x1),
                  y1: anch.c2.y1 + (smiley *  delt.c2.y1),
                  x2: anch.c2.x2 + (smiley *  delt.c2.x2),
                  y2: anch.c2.y2 + (smiley *  delt.c2.y2),
                  x: anch.c2.x + (smiley *  delt.c2.x),
                  y: anch.c2.y + (smiley *  delt.c2.y)};
              this.c3 = {
                  x1: anch.c3.x1 + (smiley *  delt.c3.x1),
                  y1: anch.c3.y1 + (smiley *  delt.c3.y1),
                  x2: anch.c3.x2 + (smiley *  delt.c3.x2),
                  y2: anch.c3.y2 + (smiley *  delt.c3.y2),
                  x: anch.c3.x + (smiley *  delt.c3.x),
                  y: anch.c3.y + (smiley *  delt.c3.y)};
              this.c4 = {
                  x1: anch.c4.x1 + (smiley *  delt.c4.x1),
                  y1: anch.c4.y1 + (smiley *  delt.c4.y1),
                  x2: anch.c4.x2 + (smiley *  delt.c4.x2),
                  y2: anch.c4.y2 + (smiley *  delt.c4.y2),
                  x: anch.c4.x + (smiley *  delt.c4.x),
                  y: anch.c4.y + (smiley *  delt.c4.y)};
          };
          //end MakeMorph();

          
          if (!intensity){
            intensity = 0.05;

            var newAnchor = new MorphMe(anchor, intensity, delta);
          
            this.render(newAnchor);

          }

          var newAnchor = new MorphMe(anchor, intensity, delta);
          
          this.render(newAnchor);
      },
      


      updateMorphy: function(e){
        var inputSlider = this.$('input[name=intensity]').val();
        this.morphMe(this.anchor, inputSlider, this.delta);
        //this.render();
      }


      });

  return morphyView;

  });