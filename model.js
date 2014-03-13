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
}