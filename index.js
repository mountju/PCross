(function (document, window) {
    'use strict';

    var scripts = [
        "libs/iscroll-lite.js",

        "source/application/application.js",

	    "source/models/item.js",
	    "source/models/itemsList.js",
	    "source/popup/popup.js",
	    "source/service/service.js",
        "source/views/home_page/home_page.js",
        "source/views/results_page/results_page.js",
	    "source/views/detail_page/detail_page.js",
	    "source/views/faves_page/faves_page.js"
    ];

    function onEndLoad() {

        var core = window.RAD.core,
            application = window.RAD.application,
            coreOptions = {
                defaultBackstack: false,
                defaultAnimation: 'slide',
                animationTimeout: 3000,
                debug: false
            };

        //initialize core by new application object
        core.initialize(application, coreOptions);

        //start
        application.start();
    }

    window.RAD.scriptLoader.loadScripts(scripts, onEndLoad);
}(document, window));