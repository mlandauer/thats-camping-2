window.App = Ember.Application.create();

App.ApplicationAdapter = DS.RESTAdapter.extend();

// Make touch events on buttons & links feel quicker
document.addEventListener("touchstart", function(){}, true)