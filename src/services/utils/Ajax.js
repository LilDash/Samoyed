import axios from 'axios';

var Ajax = {

	get: function(url, data, callback){
		axios.get(url, data).then(callback).catch(function(error) {
			console.error(error);
		})
    },
    
    // post: function(url, data, callback){
	// 	axios.post(url, data).then(callback).catch(function(error) {
	// 		console.error(error);
	// 	})
	// },

	post: function(url, data, callback, config) {
		var cfg = config;
		if (!cfg) {	
			cfg = {
				method: 'post',
				url: url,
				data: data,
			};
		} else {
			config.method = 'post';
			config.url = url;
			config.data = data;
		}
		
		axios.request(config).then(callback).catch(function(error){
			console.error(error);	
		});
	},

    delete: function(url, data, callback){
		axios.delete(url, data).then(callback).catch(function(error) {
			console.error(error);
		})
	},

	// Axios does not provide synchronous ajax method. We should find a better way to do sync ajax call.
	syncGet: function(url) {
		var xmlhttp = null;
		if (window.XMLHttpRequest)
		{
				xmlhttp=new XMLHttpRequest();
		}
		else if (window.ActiveXObject)
		{
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	
		if (xmlhttp!=null)
		{
				xmlhttp.open( "GET", url, false );
				xmlhttp.send( null );
				if (xmlhttp.status==200)
				{
					if(xmlhttp.getResponseHeader('content-type')==='application/json'){
						return JSON.parse(xmlhttp.responseText);		
					} else {
						return xmlhttp.responseText;
					}
				}
				else {
					// TODO Throw exception
					return null;
				}
		}
		else
		{
				console.error("Your browser does not support XMLHTTP.");
		}
	}
    
};

export { Ajax };