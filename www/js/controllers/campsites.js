ThatsCamping.CampsitesController = Ember.ArrayController.extend({
  geoLocation: function(location){
    Ember.set(ThatsCamping, 'latitude', location.coords.latitude);
    Ember.set(ThatsCamping, 'longitude', location.coords.longitude);
  }
});