// TODO Move these global functions somewhere sensible

calculateDistance = function(lat1, lon1, lat2, lon2) {
  R = 6371000;
  dLat = (lat2 - lat1).toRad();
  dLon = (lon2 - lon1).toRad();
  a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  d = R * c;
  return d;
}

// Bearing (as an angle) to this campsite from the given location
calculateBearing = function(lat1, lon1, lat2, lon2) {
  lon1 = lon1.toRad();
  lat1 = lat1.toRad();
  lon2 = lon2.toRad();
  lat2 = lat2.toRad();
  dLon = lon2 - lon1;
  y = Math.sin(dLon) * Math.cos(lat2);
  x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  // This is a number between 0 and 360
  bearing = (Math.atan2(y, x).toDeg() + 360.0) % 360;
  return bearing;
}

Number.prototype.toRad = function() {
  return (this * Math.PI / 180);
}

Number.prototype.toDeg = function() {
  return (this * 180 / Math.PI);
}

App.Campsite = DS.Model.extend({
  distance: DS.attr('number'),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  name: DS.attr('string'),
  park_name: DS.attr('string'),

  distance: function() {
    userLatitude = App.get("latitude");
    userLongitude = App.get("longitude");
    latitude = this.get("latitude");
    longitude = this.get("longitude");
    if(userLatitude && userLongitude && latitude && longitude) {
      distance = calculateDistance(userLatitude, userLongitude, latitude, longitude);
      return distance;
    }
    else {
      return null;      
    }
  }.property("App.latitude", "App.longitude", "latitude", "longitude"),

  distanceText: function() {
    distance = this.get("distance");
    units = undefined
    if(distance == null) {
      return "";
    }
    if(distance > 1000) {
      distance /= 1000;
      units = "km";
    }
    else {
      units = "m"      
    }
    return(distance.toFixed(0) + " " + units);
  }.property('distance'),

  bearing: function() {
    userLatitude = this.get("userLatitude");
    userLongitude = this.get("userLongitude");
    latitude = this.get("latitude");
    longitude = this.get("longitude");
    if (userLatitude && userLongitude && latitude && longitude) {
      return calculateBearing(userLatitude, userLongitude, latitude, longitude);
    }
    else {
      return null;      
    }
  }.property("userLatitude", "userLongitude", "latitude", "longitude"),

  bearingText: function() {
    bearing = this.get("bearing");
    if (bearing == null) {
      return ""  
    }
    // Dividing the compass into 8 sectors that are centred on north
    sector = Math.floor(((bearing + 22.5) % 360.0) / 45.0);
    sectorNames = [ "N", "NE", "E", "SE", "S", "SW", "W", "NW" ];
    return sectorNames[sector];
  }.property("bearing")

});

App.Campsite.FIXTURES = [
  {
    id: 1,
    distance: 34000,
    name: 'Cattai',
    park_name: 'Cattai NP',
    latitude: -33.56056,
    longitude: 150.89195
  },
  {
    id: 2,
    distance: 36000,
    name: 'Wheeny Creek',
    park_name: 'Wollemi NP',
    latitude: -33.45663,
    longitude: 150.72224
  },
  {
    id: 3,
    distance: 44000,
    name: 'Colo Meroo',
    park_name: 'Wollemi NP',
    latitude: -33.38363,
    longitude: 150.69215
  },
  {
    id: 4,
    distance: 48000,
    name: 'Lane Cove River',
    park_name: 'Lane Cove NP',
    latitude: -33.79077,
    longitude: 151.14421
  }
];
