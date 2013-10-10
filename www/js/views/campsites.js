App.CampsitesView = Ember.View.extend({
  didInsertElement: function(){
    // Only show the modal if the data hasn't been loaded
    if (this.get("controller.content.length") == 0) {
      $("#loadingModal").modal({backdrop: "static"});
    }
  }
});
