RAD.view("view.detail_page", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/detail_page/detail_page.html',
    events: {
	    'tap .home-holder': 'goHome',
        'tap #addToFaves': 'addToFaves',
	    'tap .star-holder': 'goToFaves',
	    'tap #goBack': 'goBack',
	    'tap #deleteFromFaves': 'removeFromFaves'
    },

	goHome: function (){
		"use strict";
		var options = {
			container_id: '#screen',
			content: "view.home_page",
			animation: 'slide-out'
		};
		this.publish('navigation.show', options);
	},

	goBack: function (){
		"use strict";
		var options = {
			container_id: '#screen',
			content: "view.results_page",
			animation: 'slide-out'
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
		this.model.set({
			favesMarked: true
		});
		RAD.model('favesList').add(this.model);
		$('body').find('#addToFaves').attr('id', 'deleteFromFaves').html('DELETE FROM FAVES');
	},

	removeFromFaves: function(){
		'use strict';
		this.model.set({
			favesMarked: false
		});
		RAD.model('favesList').remove(this.model);
		$('body').find('#deleteFromFaves').attr('id', 'addToFaves').html('ADD TO FAVES');
	}

}));

