define("crm/app", ["dojo/dom", "dojo/on", "dojo/_base/unload",
"crm/PasswordChange", "core/form/IdenticalTextBox", "core/grid/Inline",
"terazteatr/Grid", "crm/form/Form",
"core/form/ValidationTextBox", "crm/UserRoleManage", "dojox/form/TriStateCheckBox",
"terazteatr/form/PlayTitle", "dojox/form/CheckedMultiSelect", "dijit/form/DateTextBox", "core/form/ValidationTextarea", "dijit/form/Textarea"
],
function(dom, on, baseUnload) {
	return {
		init: function() {
			window.onbeforeunload=this.onBeforeUnload;
		},

		onBeforeUnload: function(e) {
			var mesg = "Opuszczenie strony spowoduje utratę aktualnego widoku oraz niezapisanych danych.";
			// For IE
			e.returnValue = mesg;

			// For all others
			return mesg;
		}
	};
});
