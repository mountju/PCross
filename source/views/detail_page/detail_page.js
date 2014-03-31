RAD.view("view.detail_page", RAD.Blanks.View.extend({
    url: 'source/views/detail_page/detail_page.html',
    events: {
	    'tap .home-holder': 'goBack',
        'tap #addToFaves': 'addToFaves',
	    'tap .star-holder': 'goToFaves'
    },

	goBack: function (){
		"use strict";
		var options = {
			container_id: '#screen',
			content: "view.home_page"
		};
		this.publish('navigation.show', options);
	},

	goToFaves: function (){
		"use strict";
		var options = {
			container_id: '#screen',
			content: "view.faves_page"
		};
		this.publish('navigation.show', options);
	},

	onNewExtras: function(extras){
		'use strict';
		this.model = extras.targetModel;
		this.renderRequest = true;
	},

	addToFaves: function(){
		'use strict';
		RAD.model('favesList').add(this.model);
		RAD.model('favesList').saveToStorage();
	}

}));

