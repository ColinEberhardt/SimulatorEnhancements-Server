function Model() {
  this.accelerometer = {
    x : ko.observable(0.0),
    y : ko.observable(0.0),
    z : ko.observable(0.0)
  };

  this.location = {
    latitude : ko.observable(54.99),
    longitude : ko.observable(-1.62)
  };
  
  this.notification = {
  	port: ko.observable(9930),
  	payload: ko.observable('{"aps": { "alert": "foo", "badge": 1, "sound": "default" }}')
  };
}