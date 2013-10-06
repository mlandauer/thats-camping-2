App.ApplicationController = Ember.Controller.extend({
  updateLocation: function() {
    // TODO really should wait for deviceready event before calling this
    // document.addEventListener('deviceready', this.trulyUpdateLocation, false);
    navigator.geolocation.getCurrentPosition(this.geoLocation, null, {enableHighAccuracy: true});
  },
  geoLocation: function(location){
    Ember.set(App, 'latitude', location.coords.latitude);
    Ember.set(App, 'longitude', location.coords.longitude);
  }
});
