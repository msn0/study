define([
  'stackmob',
  'schema/Exercise'
], function (StackMob, Exercise) {
	return new StackMob.Collection.extend({
	  model: Exercise
	})();
});