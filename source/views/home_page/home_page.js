RAD.view("view.home_page", RAD.Blanks.View.extend({
    url: 'source/views/home_page/home_page.html',
    events: {
	    'tap .star-holder': 'goToFaves',
	    'tap #search': 'search'
    },
	onInitialize : function(){
		"use strict";
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
		var self = this;
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
		};
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
						RAD.application.showPopup('You are right, baby!', responseText, 'push me to continue!', function(){
							self.publish('navigation.show', options);
						});
					break;
					case '101' :
						RAD.application.showPopup('You are right, baby!', responseText, 'push me to continue!!', function(){
							self.publish('navigation.show', options);
						});

					break;
					case '110' :
						RAD.application.showPopup('You are right, baby!', responseText, 'push me to continue!!', function(){
							self.publish('navigation.show', options);
						});
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