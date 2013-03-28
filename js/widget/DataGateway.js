define([
  'schema/Invitation',
  'init/stackmob'
], function (
  Invitation
) {
  return function () {
    
    var getInvitationFromStackMob = function (id, handler) {
      new Invitation({
        invitation_id: id
      }).fetchExpanded(1, {
        success: _.bind(function (model) {
          handler(JSON.parse(JSON.stringify(model)));
        }, this)
      });
    };

    var saveInvitationIntoStackMob = function (invitation, handler) {
      invitation.save({
        success: function () {
          handler();
        }
      });
    };

    return {

      init: function (options) {
        return this;
      },
      
      getInvitation: function (id, handler) {
        getInvitationFromStackMob(id, handler);
      },

      setInvitation: function (invitation, handler) {
        saveInvitationIntoStackMob(invitation, handler);
      }

    };
  };
});