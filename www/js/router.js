App.Router.map(function () {
  this.resource('campsites', { path: '/' });
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