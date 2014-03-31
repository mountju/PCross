RAD.model('itemsList', Backbone.Collection.extend({}), true);

RAD.model('favesList', Backbone.Collection.extend({

	initialize: function(){
		this.on('add', function(){
			this.saveToStorage();
			console.log('saveToStorage!!');
		}, this);
	},

	saveToStorage: function(){
		localStorage.setItem('database', JSON.stringify(this.toJSON()));
		console.log(localStorage, 'load__________________');
	},

	loadFromStorage: function(){
		var storageRefresh = localStorage.getItem('database');
		this.set(JSON.parse(storageRefresh));
		//this.trigger('add');
	}

}), true);

