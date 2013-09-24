calculateDistance = function(lat1, lon1, lat2, lon2) {
  R = 6371000;
  dLat = (lat2 - lat1).toRad();
  dLon = (lon2 - lon1).toRad();
  a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  d = R * c;
  return d;
}

Number.prototype.toRad = function() {
  return (this * Math.PI / 180);
}

ThatsCamping.Campsite = DS.Model.extend({
  distance: DS.attr('number'),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  userLatitude: DS.attr('number'),
  userLongitude: DS.attr('number'),
  bearingText: DS.attr('string'),
  name: DS.attr('string'),
  park_name: DS.attr('string'),

  distance: function() {
    userLatitude = this.get("userLatitude");
    userLongitude = this.get("userLongitude");
    latitude = this.get("latitude");
    longitude = this.get("longitude");
    if(userLatitude && userLongitude && latitude && longitude) {
      distance = calculateDistance(userLatitude, userLongitude, latitude, longitude);
      return distance;
    }
    else {
      return null;      
    }
  }.property("userLatitude", "userLongitude", "latitude", "longitude"),

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
  }.property('distance')
});

ThatsCamping.Campsite.FIXTURES = [
  {
    id: 1,
    distance: 34000,
    bearingText: 'NE',
    name: 'Cattai',
    park_name: 'Cattai NP',
    latitude: -33.56056,
    longitude: 150.89195,
    userLatitude: -33.01008163699043,
    userLongitude: 150.31314922114512
  },
  {
    id: 2,
    distance: 36000,
    bearingText: 'N',
    name: 'Wheeny Creek',
    park_name: 'Wollemi NP',
    latitude: -33.45663,
    longitude: 150.72224,
    userLatitude: -33.01008163699043,
    userLongitude: 150.31314922114512
  },
  {
    id: 3,
    distance: 44000,
    bearingText: 'N',
    name: 'Colo Meroo',
    park_name: 'Wollemi NP',
    latitude: -33.38363,
    longitude: 150.69215,
    userLatitude: -33.01008163699043,
    userLongitude: 150.31314922114512
  },
  {
    id: 4,
    distance: 48000,
    bearingText: 'E',
    name: 'Lane Cove River',
    park_name: 'Lane Cove NP',
    latitude: -33.79077,
    longitude: 151.14421,
    userLatitude: -33.01008163699043,
    userLongitude: 150.31314922114512
  }
];
