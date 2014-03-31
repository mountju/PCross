RAD.view("view.faves_page", RAD.Blanks.View.extend({
	url: 'source/views/faves_page/faves_page.html',
	events: {
		'tap .home-holder': 'goBack',
		'tap .item-list li': 'showDetails'
	},
	model: RAD.model('favesList'),

	onInitialize: function(){
		'use strict';
		this.model.loadFromStorage();
	},
//
//	load: function(){
//		'use strict';
//		this.model.loadFromStorage();
//		console.log('to sho nado');
//	},

    goBack: function (){
        "use strict";
        var options = {
                container_id: '#screen',
                content: "view.home_page"
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
		var num = $(e.currentTarget).attr('data-index');
//		RAD.model('itemDetail').set(this.model.at(num).toJSON());
		var options = {
			container_id: '#screen',
			content: "view.detail_page",
			extras : {
				targetModel: this.model.at(num)
			}
		};
		this.publish('navigation.show', options);
	}


}));