ThatsCamping.Router.map(function () {
  this.resource('campsites', { path: '/' });
});

ThatsCamping.CampsitesRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('campsite');
  },
  setupController: function(controller, model) {
    navigator.geolocation.getCurrentPosition(controller.geoLocation);
    controller.set('model', model);
  }
});