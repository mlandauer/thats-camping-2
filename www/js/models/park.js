App.Park = DS.Model.extend({
  shortName: DS.attr('string'),
  longName: DS.attr('string'),
  webId: DS.attr('string'),
  description: DS.attr('string'),
  campsites: DS.hasMany('campsite')
});
