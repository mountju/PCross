RAD.view("view.results_page", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/results_page/results_page.html',
    events: {
        'tap .home-holder': 'goHome',
	    'tap #more': 'showMore',
	    'tap .item-list li': 'showDetails',
	    'tap .star-holder': 'goToFaves'
    },

	model: RAD.model('itemsList'),

    goHome: function (){
        "use strict";
        var options = {
                container_id: '#screen',
                content: "view.home_page",
	            animation: 'slide-out'
            };

        this.publish('navigation.show', options);
    },

	goToFaves: function(){
		"use strict";
		var options = {
			container_id: '#screen',
			content: "view.faves_page"
		};
		this.publish('navigation.show', options);
	},

	showMore: function(e){
		"use strict";
		var data = {
			page : parseInt(this.model.page) + 1
		};
		this.publish("service.network.page", data);
	},

	showDetails: function(e){
		"use strict";
		var num = $(e.currentTarget).attr('data-index');
		var options = {
			container_id: '#screen',
			content: "view.detail_page",
			extras: {
				targetModel: this.model.at(num)
			}
		};
		this.publish('navigation.show', options);
	}

}));