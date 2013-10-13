App.Router.map(function () {
  this.resource('campsites', { path: '/' });
  this.resource('campsite', { path: '/campsite/:campsite_id'});
  this.resource('map'), { path: '/map'};
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.updateLocation();
  }
});

App.CampsitesRoute = Ember.Route.extend({
  model: function () {
    var store = this.get("store");
    store.find('campsite');
    return store.filter('campsite', function(campsite){
      return campsite.get("hasCoordinates");
    });
  },
});

App.MapRoute = Ember.Route.extend({
  model: function () {
    return this.store.filter('campsite', function(campsite){
      return campsite.get("hasCoordinates");
    });
  },
});
