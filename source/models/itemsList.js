RAD.model('itemsList', Backbone.Collection.extend({}), true);


RAD.model('requestsList', Backbone.Collection.extend({

	initialize: function(){
		this.loadFromStorage();
		this.on('change', function(){
			this.saveToStorage();
		}, this);
		this.on('add', function(){
			this.saveToStorage();
		}, this);
	},

	saveToStorage: function(){
		localStorage.setItem('dataCities', JSON.stringify(this.toJSON()));
		console.log(localStorage);
	},

	loadFromStorage: function(){
		var storageRefresh = localStorage.getItem('dataCities');
		this.set(JSON.parse(storageRefresh));
	},

	pushRequests: function(city, date, results){
		var self = this;
		var modelCity = this.findWhere({city: city});
		if(modelCity){
			modelCity.set({
				city: city,
				date: date,
				results: results
			});
			self.add(modelCity);
		} else {
			self.add({
				city: city,
				date: date,
				results: results
			});
			console.log('just add');
		}
	}
}), true);


RAD.model('locationsList', Backbone.Collection.extend({

	initialize: function(){
		this.loadFromStorage();
		this.on('change', function(){
			this.saveToStorage();
		}, this);
		this.on('add', function(){
			this.saveToStorage();
		}, this);
	},

	saveToStorage: function(){
		localStorage.setItem('dataLocation', JSON.stringify(this.toJSON()));
		console.log(localStorage);
	},

	loadFromStorage: function(){
		var storageRefresh = localStorage.getItem('dataLocation');
		this.set(JSON.parse(storageRefresh));
	},

	pushRequests: function(location){
		var self = this;
		var modelLocation = this.findWhere({location: location});
		if(modelLocation){
			modelLocation.set({
				location: location
			});
			self.add(modelLocation);
		} else {
			self.add({
				location: location
			});
			console.log('add location');
		}
	}

}), true);

RAD.model('favesList', Backbone.Collection.extend({

	initialize: function(){

		this.loadFromStorage();

		this.on('change', function(){
			this.saveToStorage();
		}, this);

		this.on('add', function(){
			this.saveToStorage();
			RAD.application.showPopup('Yeah, baby!', 'this item has been successfully added in faves ', 'push me to continue!');
		}, this);

		this.on('remove', function(){
			this.saveToStorage();
			RAD.application.showPopup('Yeah, baby!', 'this item has been successfully remove from faves ', 'push me to continue!');
		}, this);

	},

	saveToStorage: function(){
		localStorage.setItem('database', JSON.stringify(this.toJSON()));
	},

	loadFromStorage: function(){
		var storageRefresh = localStorage.getItem('database');
		this.set(JSON.parse(storageRefresh), {silent: true});
		this.trigger('change');
	}

}), true);

