if (!ko.subscribable.fn.throttle) {
  ko.subscribable.fn.throttle = function(throttleTime, fireWhileChanging) {
    var subscribable = this;
    var throttledObservable = ko.observable();
    var timeoutHandle = null;
    var newValue = null;

    subscribable.subscribe(function(val) {
      if (fireWhileChanging) {
        // capture the updated value
        newValue = val;
        // if a timer is not running, start a new one
        if (!timeoutHandle) {
          timeoutHandle = setTimeout(function() {
            throttledObservable(newValue);
            timeoutHandle = null;
          }, throttleTime);
        }
      } else {
        // if a timer is running, restart it
        clearTimeout(timeoutHandle);
        timeoutHandle = setTimeout(function() {
          throttledObservable(val);
          timeoutHandle = null;
        }, throttleTime);
      }
    });

    return throttledObservable;
  };
}


function ViewModel() {
  var that = this;
  this.model = new Model();

  this.locations = ko.observableArray();

  this.currentLocation = ko.observable();

  this.play = function() {
    var time = 0;
    var handle = setInterval(function() {
      var locationCount = that.locations().length - 1;
      var index = Math.floor(locationCount * time);
      var leftLocation = that.locations()[index];
      var rightLocation = that.locations()[index + 1];
      var fraction = (time * locationCount - index);

      that.currentLocation(google.maps.geometry.spherical.interpolate(leftLocation, rightLocation, fraction));

      time += 0.01;
      if (time>=1.0) {
        clearInterval(handle);
      }
    }, 100);
  };

  this.serializedModel = ko.computed(function() {
    return ko.toJSON(this.model);
  }, this);

  this.currentLocation.subscribe(function(currentLocation) {
    this.model.location.lat(currentLocation.lat());
    this.model.location.long(currentLocation.lng());
  }, this);

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