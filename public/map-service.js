
function addMarker(graphicsLayer,place,Graphic){
    let point = { 
    type: "point",
    longitude:  place.longitude,
    latitude:   place.latitude
    };
    
    let symbol = {
    type: "picture-marker", 
    url: "/"+place.image,
    width: "30px",
    height: "30px"
    };
    let pointGraphic = new Graphic({
    geometry: point,
    symbol: symbol,
    attributes : {
    id : place.id,
    name : place.name,
    description : place.description
    }
    });
    graphicsLayer.add(pointGraphic);
    }
    
    function GlobalInformation(view,graphicsLayer){
    view.on("pointer-move", function (event) {
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
    
    function detailInfo(graphicsLayer,view,Graphic){
    view.on("click", function (event) {
    view.hitTest(event).then(function (response) {
    if (response.results.length) {
    let graphic = response.results.filter(function (result) {
      // check if the graphic belongs to the layer of interest
      return result.graphic.layer === graphicsLayer;
    })[0].graphic;
    
    //console.log(graphic.attributes.id+"------")
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
