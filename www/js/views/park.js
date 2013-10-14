App.ParkView = Ember.View.extend({
  didInsertElement: function(){
    $('a.back').click(function(){
      history.back();
      return false;
    });
  }
});
