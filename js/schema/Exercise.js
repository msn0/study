define([
  'jquery', 
  'underscore', 
  'stackmob'
], function ($, _, StackMob) {
	console.log(StackMob.Model);
	return StackMob.Model.extend({
	  schemaName: 'exercise'
	});
});