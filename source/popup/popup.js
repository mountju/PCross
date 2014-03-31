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
//	options : {
//		extras: {
//			title: title,
//			text: text,
//			btnText: btnText
//		}
//	},
	title: '',
	text: '',
	btnText: '',

	onNewExtras: function (extras) {
		'use strict';
		this.title = extras.title;
		this.text = extras.text;
		this.btnText = extras.btnText;
	},
//	onNewExtras: function (extras) {
//		'use strict';
//		this.model.set({msg: extras.msg});
//		this.caller = extras.parent;
//		this.outSideClose = extras.outSideClose;
//		this.onCloseDestroy = extras.onCloseDestroy;
//	},
//	onStartAttach: function () {
//		"use strict";
//		if (this.outSideClose) {
//			this.$el.addClass('outside');
//		} else {
//			this.$el.removeClass('outside');
//		}
//	},
//	onEndDetach: function () {
//		"use strict";
//		var tag = this.$('#text').get(0),
//			resultString = (tag) ? tag.value : '';
//		//transfer data to parent
//		this.publish(this.caller + '.popup', {result: resultString });
//	},

	closeDialog: function () {
		"use strict";
//TODO why not working?		this.publish('navigation.popup.close', {content: self.viewID });
		var callback = this.extras.success;
		_(callback).isFunction() && callback();
		this.close();
	}
}));