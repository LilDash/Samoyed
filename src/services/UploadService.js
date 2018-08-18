import { Ajax } from './utils/Ajax';
import { Config } from '../config';

var UploadService = {

	getUploadPolicy: function(callback){
        Ajax.get(Config.getUploadPolicyEndpoint, {}, function(response){
            if (response && response.data && response.data.uploadPolicy) {
                return callback(response.data.uploadPolicy);
            } else {
                return callback(null);
            }
        });
    },

    syncGetUploadPolicy: function() {
        const response = Ajax.syncGet(Config.getUploadPolicyEndpoint);
        if (response && response.uploadPolicy) {
            return response.uploadPolicy;
        } else {
            return null;
        }
    },

    upload: function(action, data, file, callback) {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        })
        formData.append("file", file);

        const config = {
			method: 'post',
			url: action,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            
			responseType: 'json',
            data: formData,
		  }
        Ajax.post(action, formData, function(response){
            return callback(response);
        }, config);
    },

    sendUploadNotification: function(key, title) {

    },



    
    
};

export { UploadService };