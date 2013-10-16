window.App = Ember.Application.create();

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: function() {
    // Use the current directory as the namespace
    return window.location.pathname.split("/").slice(1,-1).join("/");
  }.property()
});
