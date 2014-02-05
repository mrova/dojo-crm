define("crm/PasswordChange", [
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
	"dijit/_WidgetBase",
], function(declare, query, Dialog, on, dom, domClass, domStyle, winUtils, fx, basefx, easing, dijitRegistry, _WidgetBase){

	return declare("crm.PasswordChange", [_WidgetBase], {
		postCreate: function(){
			this.on('click', this._onClick);
		},
		_onClick: function(event){
			event.preventDefault();
			event.stopPropagation();

			var myDialog = new Dialog({
				title: this.title,
				href: this.href,
				draggable: false,
				afterStore: function(){
					this.hide();
				},
				onHide: function(){
					// refresh table
					this.destroyRecursive();
				},
				onLoad: function(){
					var widgets = dijitRegistry.findWidgets(this.containerNode);
					widgets[0].setDialog(this);

					var viewport = winUtils.getBox(this.ownerDocument);

					height = this._contentBox.h;
					width = viewport.w-45;
					var top = 150;
					if (height+top > viewport.h) {
						height = viewport.h - 70;
						top = 11;
					}

					domStyle.set(this.containerNode, {
						overflow: "auto"
					});

					var a1 = fx.wipeIn({
						node: this.domNode,
						duration: 300,
						easing: easing.expoOut
					});

					var a2 = fx.slideTo({
						node: this.domNode,
						top: top,
						left: viewport.w/2-this._contentBox.w/2,
						unit: "px",
						duration: 300,
						easing: easing.expoOut
					});

					var cn = this.containerNode;
					var a3 = basefx.animateProperty({
						node:cn,
						duration: 300,
						properties: {
							height: { end: height}
						}
					});

					fx.combine([a1, a2, a3]).play();
				}
			});
			myDialog.show();

			return false;
		}
	});
});