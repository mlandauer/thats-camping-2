App.MapView = Ember.View.extend({
  didInsertElement: function() {
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tile.cloudmade.com/be7a385fc3034f60805677eadddb4130/997/256/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
    }).addTo(map);
    // Make leaflet get the current location
    map.locate({setView: true, maxZoom: 16});
  }
});
