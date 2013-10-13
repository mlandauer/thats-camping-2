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
    return store.find('campsite').then(function(){
      return store.filter('campsite', function(campsite){
        return campsite.get("hasCoordinates");
      });      
    });
  },
});

App.CampsiteRoute = Ember.Route.extend({
  model: function(params) {
    var store = this.get("store");
    return store.find('campsite').then(function(){
      return store.find('campsite', params.campsite_id);
    });
  }
});

App.MapRoute = Ember.Route.extend({
  model: function () {
    var store = this.get("store");
    return store.find('campsite').then(function(){
      return store.filter('campsite', function(campsite){
        return campsite.get("hasCoordinates");
      });      
    });
  },
});
