RAD.service("service.network", RAD.Blanks.Service.extend({

	onInitialize : function(){
		"use strict";
		this.subscribe('service.network', this.test, this);
	},

	baseUrl: 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy',

	buildUrl : function(city, page){

		var cityParam = city ? '&place_name=' + city : '&place_name=' + RAD.model('itemsList').city;
		var pageParam = page ? '&page=' + page : '';
		return this.baseUrl + cityParam + pageParam;
	},

//	getCity: function(response){
//		var baseCity = response.request.location;
//		return baseCity;
//	},

	setCollection : function(response){
		"use strict";
		var listing = response.response.listings;
		if (listing){
			for (var i = 0; i < listing.length; i++){
				var price = listing[i].price_formatted,
					description = listing[i].summary,
					address = listing[i].title,
					image = listing[i].img_url,
					bedroomNum = listing[i].bedroom_number,
					bathroomNum = listing[i].bathroom_number;

				RAD.model('itemsList').add({
					price: price,
					description: description,
					image: image,
					bedroomNum: bedroomNum,
					bathroomNum: bathroomNum,
					address: address
				});
				RAD.model('itemsList').city = response.request.location;
				RAD.model('itemsList').page = response.request.page;
				RAD.model('itemsList').num_res = response.request.num_res;
				RAD.model('itemsList').total_results = response.response.total_results;
			}
		} else {
			console.log('what are you looking for?');
		}
	},

	test: function(channel, data){
		var parts = channel.split('.'),
			self = this,
			//callback = (data && data.callback && typeof data.callback == 'function') ? data.callback : null,
			city, page, skipRequest = false;
		switch (parts[2]){
			case 'city' :
				city = data;
				callback = self.setCollection;
				break;
			case 'page' :
				page = data;
				callback = self.setCollection;
				break;
			case 'someError' :
				console.log('we get it!');
				skipRequest = true;
				break;
		}
		if (!skipRequest){
			var url = this.buildUrl(city, page);
			this.sendRequest(url, callback);
		}
	},

	sendRequest : function(url, callback){
		var self = this;
		$.ajax({
			url: url,
			dataType: "json",
			success: function (response){
				var responseCode = response.response.application_response_code;
				self.publish('network.success', response);
				if (typeof callback == 'function'){
					callback(response);
				}
//				var cityName = self.getCity(response);
			},
			error: function(){
				self.publish('network.error');
			}
		});
	}

}));

