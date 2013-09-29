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
  shortName: DS.attr('string'),
  longName: DS.attr('string'),
  parkShortName: DS.attr('string'),
  parkLongName: DS.attr('string'),
  description: DS.attr('string'),
  toilets: DS.attr('string'),
  picnicTables: DS.attr('boolean'),
  barbecues: DS.attr('string'),
  showers: DS.attr('string'),
  drinkingWater: DS.attr('boolean'),
  caravans: DS.attr('boolean'),
  trailers: DS.attr('boolean'),
  car: DS.attr('boolean'),

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

  hasCoordinates: function() {
    latitude = this.get("latitude");
    longitude = this.get("longitude");
    if (latitude != null && longitude != null) {
      return true;
    }
    else {
      return false;
    }
  }.property("latitude", "longitude"),

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
    userLatitude = App.get("latitude");
    userLongitude = App.get("longitude");
    latitude = this.get("latitude");
    longitude = this.get("longitude");
    if (userLatitude && userLongitude && latitude && longitude) {
      return calculateBearing(userLatitude, userLongitude, latitude, longitude);
    }
    else {
      return null;      
    }
  }.property("App.latitude", "App.longitude", "latitude", "longitude"),

  bearingText: function() {
    bearing = this.get("bearing");
    if (bearing == null) {
      return ""  
    }
    // Dividing the compass into 8 sectors that are centred on north
    sector = Math.floor(((bearing + 22.5) % 360.0) / 45.0);
    sectorNames = [ "N", "NE", "E", "SE", "S", "SW", "W", "NW" ];
    return sectorNames[sector];
  }.property("bearing"),

  html_description: function() {
    description = this.get("description");
    return "<p>" + description.replace("\n\n", "</p><p>") + "</p>";
  }.property("description"),

  facilitiesFields: function() {
    have = [];
    notHave = [];

    toilets = this.get("toilets");
    picnicTables = this.get("picnicTables");
    barbecues = this.get("barbecues");
    showers = this.get("showers");
    drinkingWater = this.get("drinkingWater");

    if (toilets == "flush") {
      have.push("flush toilets");
    }
    else if (toilets == "non_flush") {
      have.push("non-flush toilets");
    }
    else if (toilets == "none") {
      notHave.push("toilets");
    }

    if (picnicTables) {
      have.push("picnic tables"); 
    }
    else {
      notHave.push("picnic tables");        
    }

    // TODO: show whether you need to bring your own firewood elsewhere
    // Like "You will need to bring firewood (if you want to use the wood BBQs) and drinking water"
    if(barbecues == "wood" || barbecues == "wood_supplied" || barbecues == "wood_bring_your_own") {
      have.push("wood BBQs"); 
    }
    else if (barbecues == "gas_electric") {
      have.push("gas/electric BBQs"); 
    }
    else if (barbecues == "none") {
      notHave.push("BBQs");
    }

    if (showers == "hot") {
      have.push("hot showers");
    }
    else if (showers == "cold") {
      have.push("cold showers");
    }
    else if (showers == "none") {
      notHave.push("showers"); 
    }

    if (drinkingWater) {
      have.push("drinking water");
    }
    else {
      notHave.push("drinking water");
    }
    return {have: have, notHave: notHave};
  }.property("toilets", "picnicTables", "barbecues", "showers", "drinkingWater"),

  accessFields: function() {
    have = [];
    notHave = [];

    caravans = this.get("caravans");
    trailers = this.get("trailers");
    car = this.get("car");

    if (caravans) {
      have.push("caravans");      
    }
    else {
      notHave.push("caravans");
    }
    if (trailers) {
      have.push("trailers");      
    }
    else {
      notHave.push("trailers");      
    }
    if (car) {
      have.push("car camping");      
    }
    else {
      notHave.push("car camping");
    }

    return {have: have, notHave: notHave};
  }.property("caravans", "trailers", "car"),

  haveFacilitiesText: function() {
    return this.listAsText(this.get("facilitiesFields")["have"]);
  }.property("facilitiesFields"),

  notHaveFacilitiesText: function() {
    return this.listAsText(this.get("facilitiesFields")["notHave"]);
  }.property("facilitiesFields"),

  haveAccessText: function() {
    return this.listAsText(this.get("accessFields")["have"]);
  }.property("accessFields"),

  notHaveAccessText: function() {
    return this.listAsText(this.get("accessFields")["notHave"]);
  }.property("accessFields"),

  listAsText: function(list) {
    if (list.length == 0) {
      return null;
    }
    else if (list.length == 1) {
      return list[0];
    }
    else {
      return list.slice(0, -1).join(", ") + " and " + list[list.length - 1];      
    }
  },

  mapUrl: function() {
    userLongitude = App.get("longitude");
    userLatitude = App.get("latitude");
    if (userLongitude && userLatitude) {
      return "http://maps.google.com/maps?saddr=you+are+here@" + userLatitude + "," + userLongitude + "&daddr=" + this.get("shortName") + "@" + this.get("latitude") + "," + this.get("longitude") + ")";      
    }
  }.property("longitude", "latitude", "App.latitude", "App.longitude")

});

App.Campsite.FIXTURES = [];
