App.MapView = Ember.View.extend({
  map: function() {
    return L.map('map');
  }.property(),
  didInsertElement: function() {
    this.didUpdateLocation();
    var map = this.get("map");

    L.tileLayer('http://{s}.tile.cloudmade.com/be7a385fc3034f60805677eadddb4130/997/256/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
    }).addTo(map);

    // Assumes that the data has been loaded
    console.log("this.controller", this.controller);
    this.controller.forEach(function(campsite){
      var marker = L.marker([campsite.get("latitude"), campsite.get("longitude")]);
      marker.addTo(map);
    });
  },

  didUpdateLocation: function() {
    latitude = App.get("latitude");
    longitude = App.get("longitude");
    map = this.get("map");
    if (latitude != null && longitude != null) {
      map.setView([latitude, longitude], 10);
      // TODO Move the existing marker
      var marker = L.marker([latitude, longitude]).addTo(map);      
    }
    else {
      map.setView([-35, 133], 3);
    }
  }.observes("App.latitude", "App.longitude")
});
