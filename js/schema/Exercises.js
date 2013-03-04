define([
  'schema/Exercise',
  'init/stackmob'
], function (Exercise) {
	
	var Exercises = StackMob.Collection.extend({
	  model: Exercise
	});

	return new Exercises();
});