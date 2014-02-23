var bodyheight = $(window).height();
var remainingHeight = bodyheight - $("#myTab").height();

var map = new GMaps({
  div: '#map',
  lat: -12.043333,
  lng: -77.028333,
  width: $(window).width(),
  height: remainingHeight,
  zoom: 12,
  zoomControl: true,
  zoomControlOpt: {
    style: 'SMALL',
    position: 'TOP_LEFT'
  },
  panControl: false
});


var marker = map.addMarker({
  lat: -12.043333,
  lng: -77.028333,
  draggable: true
});

google.maps.event.addListener(marker, 'dragend', function() {
  var long = marker.position.lng();
  var lat = marker.position.lat();

  var request = new XMLHttpRequest();
  request.open('POST', '/location', true);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); 
  request.send(JSON.stringify({'locations':[{'latitude':lat, 'longitude':long}]}));
});