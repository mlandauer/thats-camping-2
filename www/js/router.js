App.Router.map(function () {
  this.resource('campsites', { path: '/' });
  this.resource('campsite', { path: '/campsite/:campsite_id'});
  this.resource('map'), { path: '/map'};
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    var store = this.get('store');
    // Loading campsites data synchronously so that we know the data is loaded
    // before something like CampsiteRoute tries to get data from it.
    // This isn't necessary if we don't explicitly load one of the campsite detail
    // pages directly from the url which is the case when we use it as a PhoneGap app.
    $.ajax({
      dataType: "json",
      url: "res/data/campsites.json",
      // async: false,
      success: function(data) {
        store.pushMany('campsite', data);
      }
    });
  },
  setupController: function(controller, model) {
    controller.updateLocation();
  }
});

App.CampsitesRoute = Ember.Route.extend({
  model: function () {
    return this.store.filter('campsite', function(campsite){
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
