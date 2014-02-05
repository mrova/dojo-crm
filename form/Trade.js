define("crm/form/Trade", [
	"dojo/_base/declare",
	"dijit/form/ComboBox",
	"dijit/registry"
], function(declare, ComboBox, registry){

	// module:
	//		crm/form/Postcode

	var Trade = declare("crm.form.Trade", [ComboBox], {

		// tradeId: string
		tradeId: "tradeId",

		onSearch: function() {
			this._lastValueReported = '';
		},

		onChange: function() {
			console.log(this);
//			var tradeId = registry.byId(this.tradeId);
//
//			if (this.item) {
//				tradeId.set('value', this.item.i.id);
//			} else {
//				tradeId.set('value', null);
//			}
		}
	});

	return Trade;
});
