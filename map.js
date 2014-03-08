var map;

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(viewModel.model.location.lat(),
      viewModel.model.location.long()),
    zoom: 10
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // To add the marker to the map, use the 'map' property
  var marker = new google.maps.Marker({
      position: mapOptions.center,
      draggable: true
  });

  marker.setMap(map);

  google.maps.event.addListener(marker, 'dragend', function() {
    var long = marker.position.lng();
    var lat = marker.position.lat();

    viewModel.model.location.lat(lat);
    viewModel.model.location.long(long);
  });
}
google.maps.event.addDomListener(window, 'load', initialize);