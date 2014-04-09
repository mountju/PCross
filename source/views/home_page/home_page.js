RAD.view("view.home_page", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/home_page/home_page.html',

    events: {
	    'tap .star-holder': 'goToFaves',
	    'tap #search': 'search',
	    'tap .searches-list li div': 'goSearch',
	    'tap .locations-list li div': 'goLocation',
	    'tap #locations': 'locations'
    },

	requestsCollection: RAD.model('requestsList'),

	locationsCollection: RAD.model('locationsList'),

	onInitialize : function(){
		"use strict";
		RAD.model('favesList').loadFromStorage();

		this.requestsCollection.loadFromStorage();
		this.requestsCollection.on("add", function(){
			this.renderRequest = true;
		}, this);
		this.requestsCollection.on("change", function(){
			this.renderRequest = true;
		}, this);

		this.locationsCollection.loadFromStorage();
		this.locationsCollection.on("add", function(){
			this.renderRequest = true;
		}, this);
		this.locationsCollection.on("change", function(){
			this.renderRequest = true;
		}, this);

		this.subscribe('network', this.test, this);

	},

	goToFaves: function(){
		"use strict";
		var options = {
			container_id: '#screen',
			content: "view.faves_page"
		};
		this.publish('navigation.show', options);
	},

	search: function(e){
		"use strict";
		var publish = this.publish;
		var data = this.$('#city').val();
		if (!data.length){
			RAD.application.showPopup('Sorry!!!', 'enter city name', 'push me and do it!');
		}
		else if (!/[A-Za-z]/.test(data) ){
			RAD.application.showPopup('Sorry!!!', 'use just english alphabet!', 'push me and do it!');
		}
		else{
			publish("service.network.city", data);
		}
	},

	goSearch: function(e){
		"use strict";
		console.log($(e.currentTarget).attr('data-index'));
		var data = this.$('#city').val();
		this.publish("service.network.city", data);
	},

	locations: function(){
		"use strict";
		this.publish("service.network.location");
	},

	goLocation: function(e){
		"use strict";
		var data = $(e.currentTarget).attr('data-index');
		console.log(data);
		this.publish("service.network.city", data);
	},

	test: function(channel, response){
		var self = this;
		var responseCode = response.response.application_response_code,
			responseText = response.response.application_response_text;
		var parts = channel.split('.');
		switch (parts[1]){
			case 'success' :
				var options = {
					container_id: '#screen',
					content: "view.results_page"
				};

				switch (responseCode){
					case '100' :
					case '101' :
					case '110' :
						console.log(response);
						var city = response.request.location;
						var date = response.response.created_http;
						var results = response.response.total_results;
						var location = response.request.location;
						var regExp = /[0-9]/.test(location);
						if (regExp) {
							self.locationsCollection.pushRequests(location);
							$('body').find('.search-block').fadeOut(600);
							$('body').find('.locations-block').fadeIn(600);
							self.publish('navigation.show', options);
						} else {
							self.requestsCollection.pushRequests(city, date, results);
							self.publish('navigation.show', options);
						}
					break;
					case '200' :
						RAD.application.showPopup('You are not right, baby!', responseText, 'but push me now!');
					break;
					case '201' :
						RAD.application.showPopup('You are not right, baby!', responseText, 'but push me anyway!');
						break;
					case '202' :
						RAD.application.showPopup('You are not right, baby!', responseText, 'push me to....!');
					break;
				}
			break;

			case 'error' :
				RAD.application.showPopup('You are not right, baby!', responseText, 'push me to try again!');
			break;
		}
	}
}));