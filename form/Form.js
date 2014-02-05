define("crm/form/Form", [
	"dojo/_base/declare", // declare
	"dojo/_base/array",
	"core/form/Form",
	"dojo/request",
	"dojo/request/iframe",
	"dojo/query",
	"dojo/json",
	"dojo/on",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/query",
	"dojo/window", // winUtils.scrollIntoView
	"dojo/dom-attr",
	"dijit/registry",
	"core/dialog/Grid"
], function(declare, array, Form, request, iframe, query, JSON, on, array, lang, query, winUtils, domAttr, dijitRegistry, coreDialogGrid){

	return declare("crm.form.Form", [core.form.Form], {
		dialog: null,
		_buttons: null,

		setDialog: function(dialog) {
			this.dialog = dialog;
		},

		_handle: function(files) {

			var action = this.action.replace(/\/$/, '').replace(/\?.*/, '') + '/format/json';
			var values = this.get('value');

			var options = {
				method: this.method,
				query: values,
				data: files,
				handleAs: "json"
			};

			form = this;
			showDialog = this._isSaveAndAddNote();
			request(action, options).then(function(data){
				if (data.status != 'success') {
					form.value.salt = data.salt;
					if (data.status == 'error') {
						alert(data.message);
						console.log(data);
						//@TODO: obsługa błędu dla użytkownika
					}
					if (data.status == 'invalid') {
						alert(data.message);
						console.log(data);
						//@TODO: obsługa błędu dla użytkownika
					}
					return false;
				} else {
					form.dialog.hide();

					// jeśli został kliknięty button "Zapisz i dodaj notatkę" wykonujemy odpowiednie akcje
					if (showDialog && data.open) {
						array.forEach(data.open, function(item, i) {
							new coreDialogGrid({
								title: item.title,
								href: item.href
							}).show();
						});
					}
					return true;
				}
			}, function(err){
				// Handle the error condition
				console.log(err);
				alert('error');
				//@TODO: obsługa błędu dla użytkownika
			}, function(evt){
				// Handle a progress event from the request if the
				// browser supports XHR2
//				console.log(evt);
			});

			return false;
		},

		onSubmit: function(){
			this._disableButtons();

			if (this.validate()) {
				var widget = dijitRegistry.byId('name');
				// jeśli widget to mamy upload i czekamy aż zwróci complete
				if (widget) {
					var form = this;
					on(widget, 'complete', function(e) {
						return form._handle(e);
					});
					widget.submit();
				} else {
					return this._handle();
				}
			} else {
				this._enableButtons();
			}

			return false;
		},

		_getButtons: function() {
			if (null == this._buttons) {
				this._buttons = query('.submit .dijitButton', this.domNode);
			}

			return this._buttons;
		},

		_isSaveAndAddNote: function() {
			var r = false;
			array.forEach(this._getButtons(), function(item, i){
				n = dijitRegistry.byNode(item);
				if (n.get('name') == 'saveAndAddNote' && n.get('focused')) {
					r = true;
				}
			});

			return r;
		},

		_disableButtons: function() {
			array.forEach(this._getButtons(), function(item, i){
				dijitRegistry.byNode(item).set('disabled', true);
			});
		},

		_enableButtons: function() {
			array.forEach(this._getButtons(), function(item, i){
				dijitRegistry.byNode(item).set('disabled', false);
			});
		}
	});
});