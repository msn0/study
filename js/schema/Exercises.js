define([
  'schema/Exercise',
  'init/stackmob'
], function (Exercise) {
	return StackMob.Collection.extend({
	  model: Exercise
	});
});