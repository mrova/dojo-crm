define("crm/form/button/Clear", [
	"dojo/_base/declare", // declare
	"dijit/form/Button",
	"dojo/_base/array",
	"dijit/registry"
], function(declare, button, array, dijitReg){

	return declare("crm.form.button.clear", [button], {
		fields: null,
		iconClass: "dijitIconClear",
		onClick: function(/*Event*/ e){
			// summary:
			//		Callback for when button is clicked.
			//		If type="submit", return true to perform submit, or false to cancel it.
			// type:
			//		callback

			array.forEach(this.fields, function(item, i) {
				dijitReg.byId(item).set('value', null);
			});
			e.preventDefault(); // cancel BUTTON click and continue with hidden INPUT click
			e.stopPropagation();    // avoid two events bubbling from Button widget

			return false;		// Boolean
		},
	});
});