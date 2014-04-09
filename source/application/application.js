RAD.application(function (core) {
    'use strict';

    var app = this;

    app.start = function () {
        var options = {
            container_id: '#screen',
            content: "view.home_page"
        }
        core.publish('navigation.show', options);
    };

	app.showPopup = function( title, text, btnText, callback ){
		"use strict";
		var options = {
			content: "view.popup",
			width: 500,
			height: 200,
			target: $('#screen')[0],

			extras: {
				title: title,
				text: text,
				btnText: btnText,
				success: callback
			}
		};
		core.publish('navigation.popup.show', options);
	};

	return app;
}, true);

