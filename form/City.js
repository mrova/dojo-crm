define("crm/form/City", [
	"dojo/_base/declare",
	"dijit/form/ComboBox",
	"dijit/registry",
	"dojox/data/QueryReadStore"
], function(declare, ComboBox, registry, QueryReadStore){

	// module:
	//		crm/form/City

	var City = declare("crm.form.City", [ComboBox], {

		// url: string
		url: "",

		// cityId: string
		cityId: "cityId",

		// postcode: string
		// 		id of postcode element to set value after autocomplete
		postcode: "postcode",

		// region: string
		// 		id of region element to set value after autocomplete
		region: "region",

		autoComplete: false,
		pageSize:20,
		searchAttr:'name',
		labelAttr:'label',
		hasDownArrow: false,
		highlightMatch: "all",
		queryExpr: '%${0}%',

		postMixInProperties: function(){
			if(!this.store){
				this.store = new QueryReadStore({
					url: this.url
				});
			}
			this.inherited(arguments);
		},

		onSearch: function() {
			this._lastValueReported = '';
		},

		onChange: function() {
			var postcode = region = cityId = null;

			var cityId = registry.byId(this.cityId);

			if (this.postcode) {
				postcode = registry.byId(this.postcode);
			}

			if (this.region) {
				region = registry.byId(this.region);
			}

			if (this.item) {
				// wstawiamy ID miasta.
				// jeśli kod pocztowy/region zmienią się to usuwamy wartość (chyba, że zmiany wynikają z autocomplete'a)
				cityId.set('value', this.item.i.id);

				// jeśli jest kod pocztowy to go wstawiamy do powiązanego pola
				if (postcode && this.item.i.postcode) {
					postcode.set('value', this.item.i.postcode);
				}

				// jeśli jest region to go wstawiamy do powiązanego pola
				if (region && this.item.i.region) {
					region.set('value', this.item.i.region);
				}
			} else {
				cityId.set('value', null);
//				if (postcode) {
//					postcode.set('value', '');
//				}
//				if (region) {
//					region.set('value', '');
//				}
			}
		}
	});

	return City;
});
