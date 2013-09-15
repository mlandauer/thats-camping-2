ThatsCamping.Campsite = DS.Model.extend({
  distance: DS.attr('number'),
  bearingText: DS.attr('string'),
  name: DS.attr('string'),
  park_name: DS.attr('string'),

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
   park_name: 'Cattai NP'
 },
 {
   id: 2,
   distance: 36000,
   bearingText: 'N',
   name: 'Wheeny Creek',
   park_name: 'Wollemi NP'
 },
 {
   id: 3,
   distance: 44000,
   bearingText: 'N',
   name: 'Colo Meroo',
   park_name: 'Wollemi NP'
 },
 {
   id: 4,
   distance: 48000,
   bearingText: 'E',
   name: 'Lane Cove River',
   park_name: 'Lane Cove NP'
 }
];
