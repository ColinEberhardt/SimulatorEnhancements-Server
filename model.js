function Model() {
  this.accelerometer = {
    x : ko.observable(0.0),
    y : ko.observable(0.0),
    z : ko.observable(0.0)
  };

  this.locations = [{
    lat : ko.observable(0.0),
    long : ko.observable(0.0)
  }];
}