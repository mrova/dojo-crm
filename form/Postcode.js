define("crm/form/Postcode", [
	"dojo/_base/declare",
	"core/form/MaskedTextBox",
	"dijit/registry"
], function(declare, MaskedTextBox, registry){

	// module:
	//		crm/form/Postcode
	//$this->setAttrib('data-dojo-props', "");

	var MaskedTextBox = declare("crm.form.Postcode", [MaskedTextBox], {
		// cityId: string
		cityId: "cityId",

		placeHolder:'__-___',
		pattern:'[0-9]{2}-[0-9]{3}',

		onChange: function() {
			var cityId = registry.byId(this.cityId);
			cityId.set('value', null);
		}
	});

	return MaskedTextBox;
});
