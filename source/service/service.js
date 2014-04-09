RAD.service("service.network", RAD.Blanks.Service.extend({

	onInitialize : function(){
		"use strict";
		this.subscribe('service.network', this.test, this);
	},

	baseUrl: 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy',

	buildUrl : function(city, page){
		var cityParam = city ? '&place_name=' + city : '';
		var pageParam = page ? '&page=' + page : '';
		return this.baseUrl + cityParam + pageParam;
	},

	buildUrlLocation : function(location){
		var locationParam = location ? '&centre_point=' + location : '';
		return this.baseUrl + locationParam;
	},

	matchFaves: function(listing){
		"use strict";
		return RAD.model('favesList').where({guid : listing}).length > 0;
	},

	setCollection : function(response){
		"use strict";
		var listing = response.response.listings;
		var locationCity = response.results;
		if (listing){
			for (var i = 0; i < listing.length; i++){
				var price = listing[i].price_formatted,
					description = listing[i].summary,
					address = listing[i].title,
					image = listing[i].img_url,
					bedroomNum = listing[i].bedroom_number,
					bathroomNum = listing[i].bathroom_number,
					model_guid = listing[i].guid,
					mark = this.matchFaves(listing[i].guid);

				RAD.model('itemsList').add({
					price: price,
					description: description,
					image: image,
					bedroomNum: bedroomNum,
					bathroomNum: bathroomNum,
					address: address,
					guid: model_guid,
					favesMarked : mark
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
			city, page, location, skipRequest = false,
			get_location = function(){
				navigator.geolocation.getCurrentPosition(show_map);
			},
			show_map = function(position){
//				var latitude = position.coords.latitude;
//				var longitude = position.coords.longitude;
				var latitude = '51.5085300';
				var longitude = '-0.1257400';
				location = (latitude + ',' + longitude);
				self.prepareRequestLocation(location);
			};
		switch (parts[2]){
			case 'city' :
				city = data;
				callback = function (){
					self.setCollection.apply(self, arguments);
				};
				break;
			case 'page' :
				page = data;
				callback = function (){
					self.setCollection.apply(self, arguments);
				};
				break;
			case 'location' :
				skipRequest = true;
				location = data;
				get_location();
				callback = function(){
					self.setCollection.apply(self, arguments);
				};
				break;
			case 'someError' :
				console.log('we get it!');
				skipRequest = true;
				break;
		}
		if (!skipRequest){
			this.prepareRequest(city, page);
		}
	},

	prepareRequest : function(city, page){
		var url = this.buildUrl(city, page);
		this.sendRequest(url, callback);
	},

	prepareRequestLocation : function(location){
		console.log(location, '1111');
		var url = this.buildUrlLocation(location);
		this.sendRequest(url, callback);
	},

	sendRequest : function(url, callback){
		var self = this;
		$.ajax({
			url: url,
			dataType: "json",
			success: function (response){
//				var responseCode = response.response.application_response_code;
				self.publish('network.success', response);
				if (typeof callback == 'function'){
					callback(response);
					console.log(url, 'est response');
				}
			},
			error: function(){
				self.publish('network.error');
			}
		});
	}

}));

