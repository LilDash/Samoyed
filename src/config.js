
var Config = Config || {};

Config.serverHost = 'http://localhost:8080';

Config.getAllCategoriesEndpoint = Config.serverHost + '/api/admin/category/list';
Config.editorServerUrl = Config.serverHost + '/api/admin/editor';
Config.imageUploadUrl = Config.serverHost + '/api/admin/image';
Config.submitEndPoint = Config.serverHost + '/api/admin/post/insert';
Config.listPostsEndPoint = Config.serverHost + '/api/admin/post/list';
Config.postEndPoint = Config.serverHost + '/api/admin/post';
// Video Upload
Config.getUploadPolicyEndpoint = Config.serverHost + '/upload/policy';
Config.uploadNotificationEndpoint = Config.serverHost  + '/upload/notification';
// Video Review
Config.getVideoReviewPendingEndpoint = Config.serverHost + '/video/review/pending';

export { Config };