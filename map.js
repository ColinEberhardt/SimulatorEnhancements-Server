
var mapOptions = {
  center: new google.maps.LatLng(viewModel.model.location.lat(),
    viewModel.model.location.long()),
  disableDoubleClickZoom: true,
  zoom: 10
};
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
map.setOptions({draggableCursor:'crosshair'});

var markersArray = [];

google.maps.event.addListener(map, 'dblclick', function(event) {
  viewModel.locations.push(event.latLng);
});

var pinImage = new google.maps.MarkerImage("https://chart.googleapis.com/chart?chst=d_map_spin&chld=0.4|0|FF0000|13|b|",
    new google.maps.Size(17, 28),
    new google.maps.Point(0,0),
    new google.maps.Point(8, 28));

viewModel.locations.subscribe(function(locations) {
  clearOverlays();
  for (var i = locations.length - 1; i >= 0; i--) {
    var location = locations[i];
    var marker  = new google.maps.Marker({
      position: location,
      icon: pinImage,
      map: map
    });
    markersArray.push(marker);
  };

  var path = new google.maps.Polyline({
    path: locations,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    map: map
  });
  markersArray.push(path);
});

var currentLocationMarker = undefined;
viewModel.currentLocation.subscribe(function(currentLocation) {
  if (!currentLocationMarker) {
    currentLocationMarker = new google.maps.Marker({
      position: currentLocation,
      map: map
    });
  } else {
    currentLocationMarker.setPosition(currentLocation);
  }
});

function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}