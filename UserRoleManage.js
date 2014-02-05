define("crm/UserRoleManage", [
	"dojo/_base/declare",
	"dojo/query",
	"dijit/Dialog",
	"dojo/on",
	"dojo/dom",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/window",
	"dojo/fx",
	"dojo/_base/fx",
	"dojo/fx/easing",
	"dijit/registry",
	"dojo/_base/array",
	"dojo/json",
	"dijit/_WidgetBase",
	"dojo/NodeList-traverse",
], function(declare, query, Dialog, on, dom, domClass, domStyle, winUtils, fx, basefx, easing, dijitRegistry, array, json, _WidgetBase){

	return declare("crm.UserRoleManage", [_WidgetBase], {
		value: "on",
		checked: "",
		name: "acl",

		//@TODO: czy wszystkie eventy nie powinnu tu zostać podpięte dopiero po utworzeniu obiektu?
		// Zamiast go zwracać przypisać i na defered wykonać podpinanie eventów?
		postCreate: function(){
			// zaznacz/odznacz wszystkie
//			on(query('thead tr th.resource', this.domNode), 'click', function() {
//				dijitRegistry.byClass('dojox.form.TriStateCheckBox').forEach(function(node) {
//					node.set('value', !node.get('value'));
//				});
//			});

			on(query('thead tr img', this.domNode), 'click', function() {
				console.log('zaznacz kolumnę');
			});

			on(query('tbody tr th', this.domNode), 'click', function() {
				console.log('zaznacz wiersz');
			});
		},

		_getValueAttr: function(){
			// get widget values
			var obj = {};
			dijitRegistry.findWidgets(this.domNode).forEach(function(widget){
				var name = widget.name;
				if(!name || widget.disabled){ return; }

				var value = widget.get('value');

				if(value !== false){
					r = widget.get('resource');
					p = widget.get('privilege');
					if (!obj[r]) {
						obj[r] = { };
					}
					obj[r][p] = value;
				}
			});

			return json.stringify(obj);
		}
	});
});
