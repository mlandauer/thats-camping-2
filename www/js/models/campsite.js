ThatsCamping.Campsite = DS.Model.extend({
  distance_text: DS.attr('string'),
  name: DS.attr('string'),
  park_name: DS.attr('string')
});

ThatsCamping.Campsite.FIXTURES = [
 {
   id: 1,
   distance_text: '34 km NE',
   name: 'Cattai',
   park_name: 'Cattai NP'
 },
 {
   id: 2,
   distance_text: '36 km N',
   name: 'Wheeny Creek',
   park_name: 'Wollemi NP'
 },
 {
   id: 3,
   distance_text: '44 km N',
   name: 'Colo Meroo',
   park_name: 'Wollemi NP'
 },
 {
   id: 4,
   distance_text: '48 km E',
   name: 'Lane Cove River',
   park_name: 'Lane Cove NP'
 }
];
