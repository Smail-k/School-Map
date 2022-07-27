
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
          id : place.id || place._id,
          name : place.name,
          description : place.description,
          image : place.image,
          estab : place.establishment == undefined ? true : false
        }
        });
    }else {
      pointGraphic = new Graphic({
        geometry: point,
        symbol: symbol,
        attributes : {
          id : place.id || place._id,
          name : place.name,
          description : place.description,
          image : place.image,
          floors : place.floors
        }
        });
    }
      
    
    graphicsLayer.add(pointGraphic);
    }
    function removeMarker(graphicsLayer) {
      // graphicsLayer.graphics.forEach(graphic => {
      //   console.log(graphicsLayer.graphics.length+"---------------------------")
      //   if(graphic.attributes.id ==undefined){
      //       graphicsLayer.graphics.length=2
      //   }
      // });
      graphicsLayer.graphics.splice(2, graphicsLayer.graphics.length-1); 
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
    view.center=graphic.geometry;
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
      

      let link = document.getElementById("mylink");
      if(link != null && graphic.attributes.estab){
        link.setAttribute('href', "/establishment/delete/"+graphic.attributes.id);
        window.localStorage.setItem('estab',graphic.attributes.id)
      }
      else if(link != null && graphic.attributes.floors == undefined)
        link.setAttribute('href', "/place/delete/"+graphic.attributes.id);
      else if(link != null && graphic.attributes.floors != undefined) {
        link.setAttribute('href', "/building/delete/"+graphic.attributes.id);
      }
      let link2 = document.getElementById("Editlink");
      if(link2 != null && graphic.attributes.estab){
        link2.setAttribute('href', "/establishment/edit/"+graphic.attributes.id);
        // let addLink = document.getElementById("addLink");
        // addLink.setAttribute('href', "/establishment/add/");
      }
      else if(link2 != null && graphic.attributes.floors == undefined){
        link2.setAttribute('href', "/place/edit/"+graphic.attributes.id);
      }
      else if(link2 != null && graphic.attributes.floors != undefined) {
        link2.setAttribute('href', "/building/edit/"+graphic.attributes.id);
      }


      view.popup.open({
        title : graphic.attributes.name,
        location: graphic.geometry,
        content : "<h4>"+ graphic.attributes.description+"</h4>"+
        "<img src='http://localhost:8080/"+graphic.attributes.image+"' alt='no image' style='width : 200px; height : 100px;'></img>"
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
      view.popup.location = event.mapPoint;
      view.popup.content = "latitude : "+event.mapPoint.latitude+"- longitude : "+event.mapPoint.longitude;
      view.popup.visible = true;
    view.hitTest(event).then(function (response) {
    if (response.results.length) {
    let graphic = response.results.filter(function (result) {
      // check if the graphic belongs to the layer of interest
      return result.graphic.layer === graphicsLayer;
    })[0].graphic;
    window.localStorage.setItem('estab',graphic.attributes.id)

    let link = document.getElementById("Editlink");
    if(link != null)
      link.setAttribute('href', "/establishment/edit/"+graphic.attributes.id);

    if(graphic.attributes.floors != undefined){
      document.querySelector(".buildings").style.display = "block";
      loadsFloors(graphic.attributes)
    }
    else if(graphic.attributes.floors == undefined){
      document.querySelector(".buildings").style.display = "none";
    }
    if(graphic.attributes.id == undefined){
      return
    }else if(graphicsLayer.graphics.length!=2 && graphicsLayer.graphics.floors != undefined){
      removeMarker(graphicsLayer)
      return;
    }
    let user =  JSON.parse(window.localStorage.getItem("userInfo"));
    if(user.role !="presidence" && user.establishment != graphic.attributes.id){
      closeSideBar()
      return;
    }
    
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
            res[i].description ="nombre d'etages : "+ res[i].floors.length;
            addMarker(graphicsLayer,res[i],Graphic);   
            
        }
    };
    openSideBar();
    
    }
      
                   
    });
    });
    }

function openSideBar(){
  let sidebar = document.querySelector(".sidebar");
    if(sidebar.classList.contains("close")){
      sidebar.classList.remove("close");
    }
}
function closeSideBar(){
  let sidebar = document.querySelector(".sidebar");
    if(!sidebar.classList.contains("close")){
      sidebar.classList.add("close");
    }
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

function getPlacesByKeyword(keyword,estab,graphicsLayer,Graphic,view) {
  removeMarker(graphicsLayer)
  keyword = keyword.toLowerCase();
  if(estab ==null)
    estab = window.localStorage.getItem("estab");

  let xhr = new XMLHttpRequest();
  xhr.open('get', '/place/keyword/'+keyword+'/'+estab);
  xhr.send();

  xhr.onload = function() {
      let res = JSON.parse(xhr.response)
    for (let i = 0; i < res.length; i++) {
       addMarker(graphicsLayer,res[i],Graphic)
    }
    //view.center=[res[0].longitude,res[0].latitude];
};

if(estab ==window.localStorage.getItem("estab") && keyword == "batiment")
    keyword=" ";

let xhr2 = new XMLHttpRequest();
    xhr2.open('get', '/building/keyword/'+keyword+'/'+estab);
      xhr2.send();
    
      xhr2.onload = function() {
          res = JSON.parse(xhr2.response)
          console.log(res);
        for (i = 0; i < res.length; i++) {
            addMarker(graphicsLayer,res[i],Graphic);   
        }
    };
}