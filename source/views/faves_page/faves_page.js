RAD.view("view.faves_page", RAD.Blanks.ScrollableView.extend({
	url: 'source/views/faves_page/faves_page.html',
	events: {
		'tap .home-holder': 'goHome',
		'tap .item-list li': 'showDetails'
	},

	model: RAD.model('favesList'),

    goHome: function (){
        "use strict";
        var options = {
                container_id: '#screen',
                content: "view.home_page",
	            animation: 'slide-out'
            };
        this.publish('navigation.show', options);
    },

//	showMore: function(e){
//		"use strict";
//		var data = {
//			page : parseInt(this.model.page) + 1
//		};
//		this.publish("service.network.page", data);
//	},
//
	showDetails: function(e){
		// TODO get model from collection
		if ($(e.currentTarget).attr('data-index')) {
			var num = $(e.currentTarget).attr('data-index');
			var options = {
				container_id: '#screen',
				content: "view.detail_page",
				extras : {
					targetModel: this.model.at(num)
				}
			};
			this.publish('navigation.show', options);
		} else {
			alert('lets try again!');
		}
		console.log(RAD.model('favesList'));

	}


}));