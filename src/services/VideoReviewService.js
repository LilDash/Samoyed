import { Ajax } from './utils/Ajax';
import { Config } from '../config';

var VideoReviewService = {

	getVideoReviewPending: function(page, callback){
        Ajax.get(Config.getVideoReviewPendingEndpoint, {page}, function(response){
            console.log(response);
            if (response && response.data && response.data.videoReviews) {
                return callback(response.data.videoReviews);
            } else {
                return callback(null);
            }
        });
    },

  
    
};

export { VideoReviewService };