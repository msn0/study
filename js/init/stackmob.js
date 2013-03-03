define([
  'stackmob',
  'underscore'
], function (StackMob) {
  return {
    run: function () {
      StackMob.init({
		    appName: "study",
		    clientSubdomain: "michaj",
		    publicKey: "58c19fd7-964d-4bfa-95f5-9eb5a16cbae6",
		    apiVersion: 0
		  });      
    }
  };
});

	