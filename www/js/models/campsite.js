ThatsCamping.Campsite = DS.Model.extend({
  distanceText: DS.attr('string'),
  bearingText: DS.attr('string'),
  name: DS.attr('string'),
  park_name: DS.attr('string')
});

ThatsCamping.Campsite.FIXTURES = [
 {
   id: 1,
   distanceText: '34 km',
   bearingText: 'NE',
   name: 'Cattai',
   park_name: 'Cattai NP'
 },
 {
   id: 2,
   distanceText: '36 km',
   bearingText: 'N',
   name: 'Wheeny Creek',
   park_name: 'Wollemi NP'
 },
 {
   id: 3,
   distanceText: '44 km',
   bearingText: 'N',
   name: 'Colo Meroo',
   park_name: 'Wollemi NP'
 },
 {
   id: 4,
   distanceText: '48 km',
   bearingText: 'E',
   name: 'Lane Cove River',
   park_name: 'Lane Cove NP'
 }
];
