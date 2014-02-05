define("crm/form/Region", [
	"dojo/_base/declare",
	"dijit/form/FilteringSelect",
	"dijit/registry"
], function(declare, FilteringSelect, registry){

	// module:
	//		crm/form/Region

	var Region = declare("crm.form.Region", [FilteringSelect], {
		// cityId: string
		cityId: "dict_city_id",

		onChange: function() {
			registry.byId(this.cityId).set('value', null);
		}
	});

	return Region;
});
