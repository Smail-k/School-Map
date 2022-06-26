
function addMarker(graphicsLayer,place,Graphic){
    let point = { 
    type: "point",
    longitude:  place.longitude,
    latitude:   place.latitude
    };
    
    let symbol = {
    type: "picture-marker", 
    url: "/"+place.marker,
    width: "30px",
    height: "30px"
    };
    let pointGraphic;
    if(place.floors == undefined) {
      pointGraphic = new Graphic({
        geometry: point,
        symbol: symbol,
        attributes : {
          id : place.id,
          name : place.name,
          description : place.description,
          image : place.image,
        }
        });
    }else {
      pointGraphic = new Graphic({
        geometry: point,
        symbol: symbol,
        attributes : {
          id : place.id,
          name : place.name,
          description : place.description,
          image : place.image,
          floors : place.floors
        }
        });
    }
      
    
    graphicsLayer.add(pointGraphic);
    }
    
    function GlobalInformation(view,graphicsLayer){
    view.on("click", function (event) { //pointer-move
    view.hitTest(event).then(function (response) {
    if (response.results.length) {
    let graphic = response.results.filter(function (result) {
      return result.graphic.layer === graphicsLayer;
    })[0].graphic;
      
    view.popup.open({
      title : graphic.attributes.name,
      location: graphic.geometry,
      content : "<h4>"+ graphic.attributes.description+"</h4>",
      media : "/estab.png"
    });
    view.zoom=17;
    view.popup.autoOpenEnabled = false;
    }                
    });
    });
    }
    
    function GlobalInformationWithHover(view,graphicsLayer){
      view.on("pointer-move", function (event) { //pointer-move
      view.hitTest(event).then(function (response) {
      if (response.results.length) {
      let graphic = response.results.filter(function (result) {
        return result.graphic.layer === graphicsLayer;
      })[0].graphic;
      


      view.popup.open({
        title : graphic.attributes.name,
        location: graphic.geometry,
        content : "<h4>"+ graphic.attributes.description+"</h4><img src='https://school-map.herokuapp.com/"+graphic.attributes.image+"' alt='no image' style='width : 200px; height : 100px;'></img>",
      });
      //console.log(graphic.attributes.floors.length+"---")
      if(graphic.attributes.floors == undefined){
        document.querySelector(".buildings").style.display = "none";
      }

      view.popup.autoOpenEnabled = false;
      }                
      });
      });
      }



    function detailInfo(graphicsLayer,view,Graphic){
    view.on("click", function (event) {
    view.hitTest(event).then(function (response) {
    if (response.results.length) {
    let graphic = response.results.filter(function (result) {
      // check if the graphic belongs to the layer of interest
      return result.graphic.layer === graphicsLayer;
    })[0].graphic;
    
    //console.log(graphic.attributes.id+"------")
    if(graphic.attributes.floors != undefined){
      document.querySelector(".buildings").style.display = "block";
      loadsFloors(graphic.attributes)
    }
    else if(graphic.attributes.floors == undefined){
      document.querySelector(".buildings").style.display = "none";
    }
    if(graphic.attributes.id == undefined)
      return 
    let xhr = new XMLHttpRequest();
      xhr.open('get', '/place/'+graphic.attributes.id);
      xhr.send();
    
      xhr.onload = function() {
          let res = JSON.parse(xhr.response)
          console.log(res);
        for (let i = 0; i < res.length; i++) {
            addMarker(graphicsLayer,res[i],Graphic);   
        }
    };

    let xhr2 = new XMLHttpRequest();
    xhr2.open('get', '/building/'+graphic.attributes.id);
      xhr2.send();
    
      xhr2.onload = function() {
          res = JSON.parse(xhr2.response)
          console.log(res);
        for (i = 0; i < res.length; i++) {
            res[i].description ="nombre d'etages : "+ res[i].floors.length ; 
            addMarker(graphicsLayer,res[i],Graphic);   
            
        }
    };
    

    }                
    });
    });
    }

function zoomOn(view){
  require(["dojo/dom", "dojo/on", "dojo/domReady!"],
    function(dom, on){
      on(dom.byId("estab"), "change", function(){
        if(dom.byId("estab").value==""){
          view.zoom=10;
          return
        }
        view.center = [dom.byId("estab").value.split(";")[0],dom.byId("estab").value.split(";")[1]];
        view.zoom=17;
      });
    });
}
function loadEstab(){
  let xhr = new XMLHttpRequest();
  xhr.open('get', '/establishment/establishmentsJson');
  xhr.send();

  xhr.onload = function() {
      let res = JSON.parse(xhr.response)
      console.log(res);
    for (let i = 0; i < res.length; i++) {
        document.getElementById("estab").innerHTML +="<option value='"+ res[i].longitude+";"+res[i].latitude+"'>"+res[i].name+"</option>";
        
    }
    
};
}

function loadsFloors(res){
  let details = document.getElementById("details");
  let plus =document.getElementById("plus");
  let minus = document.getElementById("minus");
  plus.style.display="inline";
  minus.style.display="inline";
  var counter = 0;

  console.log(res+"---");
  update(res.floors[counter],counter+1);
  plus.addEventListener("click",()=>{
    if(counter != res.floors.length-1)
      counter++;
    update(res.floors[counter],counter+1);
  })
  minus.addEventListener("click",()=>{
    if(counter != 0)
      counter--;
    update(res.floors[counter],counter+1);
  })
  
}

function update(res,counter) {
  // let result = res.floors[counter].map(f=> "<tr>" +
	// 						"<td>" +f.classroomsCount +"</td>" +
	// 						"<td>" +f.description +"</td>" +
	// 					"</tr>").
	// 			reduce((pv,cv)=>pv+cv,'<table border="1" style="border-collapse :collapse;">'
	// 				+"<tr>" +
	// 					"<th>nombre de classe</th>" +
	// 					"<th>Description</th>" +
	// 				"</tr>") + "</table>";
  let result = '<h2>Etage numero : '+counter +'</h2>'+
  '<table border="1" style="border-collapse :collapse;" class="table-result">'
          +"<tr>" +
						"<th>nombre de classe</th>" +
	 					"<th>Description</th>" +
	 				"</tr>"+
           "<tr>" +
           						"<td>" +res.classroomsCount +"</td>" +
            						"<td>" +res.description +"</td>" +
            "</tr></table>";
            

          details.innerHTML = result;
}