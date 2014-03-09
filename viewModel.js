
function ViewModel() {
  var that = this, timerHandle;

  // ------ properties
  this.model = new Model();
  this.isPlaying = ko.observable(false);
  this.locations = ko.observableArray();
  this.currentLocation = ko.observable();

  // expose the model as a JSON property
  this.serializedModel = ko.computed(function() {
    return ko.toJSON(this.model);
  }, this);

  // ------  functions
  this.stop = function() {
    clearInterval(timerHandle);
    that.isPlaying(false);
  };

  this.removeAll = function() {
    that.locations.removeAll();
  };

  this.play = function() {
    var time = 0;
    this.isPlaying(true);
    timerHandle = setInterval(function() {
      var locationCount = that.locations().length - 1;
      var index = Math.floor(locationCount * time);
      var leftLocation = that.locations()[index];
      var rightLocation = that.locations()[index + 1];
      var fraction = (time * locationCount - index);

      that.currentLocation(google.maps.geometry.spherical.interpolate(leftLocation, rightLocation, fraction));

      time += 0.01;
      if (time>=1.0) {
        clearInterval(timerHandle);
        that.isPlaying(false);
      }
    }, 100);
  };

  // update the model when the currentLocation property changes
  this.currentLocation.subscribe(function(currentLocation) {
    this.model.location.lat(currentLocation.lat());
    this.model.location.long(currentLocation.lng());
  }, this);

  // when the model changes, send thew new data, throttled at 200ms
  this.serializedModel.throttle(200, true).subscribe(function(newValue) {
    console.log(newValue);
    var request = new XMLHttpRequest();
    request.open('POST', '/update', true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); 
    request.send(newValue);
  })
}

var viewModel = new ViewModel();
ko.applyBindings(viewModel);