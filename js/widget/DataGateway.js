define([
  'schema/Invitation',
  'init/stackmob'
], function (
  Invitation
) {
  return function () {
    
    var getInvitationFromStackMob = function (id, handler) {
      console.log('Getting invitation from StackMob', id);
      new Invitation({
        invitation_id: id
      }).fetchExpanded(1, {
        success: _.bind(function (model) {
          handler(JSON.parse(JSON.stringify(model)));
        }, this)
      });
    };

    var saveInvitationIntoStackMob = function (invitation) {
      console.log('Saving invitation into StackMob', invitation);
      invitation.save();
    };

    return {

      init: function (options) {
        return this;
      },
      
      getInvitation: function (id, handler) {
        getInvitationFromStackMob(id, handler);
      },

      setInvitation: function (invitation) {
        saveInvitationIntoStackMob(invitation);
      }

    };
  };
});