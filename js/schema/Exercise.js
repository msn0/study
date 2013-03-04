define([
  'init/stackmob'
], function () {

	var Exercise = StackMob.Model.extend({
	  schemaName: 'exercise'
	});
	
	return Exercise;
});