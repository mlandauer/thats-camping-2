App.Router.map(function () {
  this.resource('campsites', { path: '/' });
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    var store = this.get('store');
    $.getJSON("res/data/campsites.json", function(data){
      store.pushMany('campsite', data);
    });
  }
});

App.CampsitesRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('campsite');
  },
  setupController: function(controller, model) {
    controller.updateLocation();
    controller.set('model', model);
  }
});