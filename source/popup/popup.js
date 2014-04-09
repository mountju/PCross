RAD.view("view.popup", RAD.Blanks.Popup.extend({
	url: 'source/popup/popup.html',
	outSideClose: true,
	events: {
		'tap .btn-close': 'closeDialog'
	},
	onInitialize: function () {
		'use strict';
		this.model = new Backbone.Model;
	},

	title: '',
	text: '',
	btnText: '',

	onNewExtras: function (extras) {
		'use strict';
		this.title = extras.title;
		this.text = extras.text;
		this.btnText = extras.btnText;
	},

	closeDialog: function () {
		"use strict";
		var callback = this.extras.success;
		_(callback).isFunction() && callback();
		this.close();
	}
}));