import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Upload, Icon, Form, Input } from 'antd';
import { UploadService } from '../../services/UploadService';
import { FileUtil } from '../../services/utils/FileUtil';
import 'antd/dist/antd.css'; 
import './styles/upload-video-page.scss';

const FormItem = Form.Item;

class UploadVideoPageInner extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			formData: {
				title: '',
				file: null,
			},
    	uploadStatus: 0, // 0: ready, 1: uploading, 2: done
			uploadPolicy: null,
		};

		this.handleUpload = this.handleUpload.bind(this);
		this.getUploadData = this.getUploadData.bind(this);
		this.getUploadPolicy = this.getUploadPolicy.bind(this);
		this.renderUploader = this.renderUploader.bind(this);
	}

	componentWillMount() {
		
	}

	componentDidMount() {
		this.getUploadPolicy();
	}

	handleUpload() {
		const self = this;
		
		this.props.form.validateFields(null, { force: true }, (err, values) => {
				if (!err) {
					// Start upload
					const uploadData = self.getUploadData();
					const file = self.state.formData.file;
					if (file) {
						self.setState({
							uploadStatus: 1,
						});
						
						UploadService.upload(self.state.uploadPolicy.host, uploadData, file, (response) => {		
							if (response.status === 200 || response.status === 203) { // TODO: Remove 203 when callback stuff is done.
								self.setState({
									uploadStatus: 2,
								});
								const notification = {
									key: uploadData.key, 
									title: values.videoTitle, 
									mimeType: file.type, 
									size: file.size, 
									metadata: ''
								}
								UploadService.sendUploadNotification(notification);
							} else {
								self.setState({
									uploadStatus: 0,
								});
							}
						});
					}
				} 
      },
    );
	}

	getUploadPolicy() {
		const self = this;
		UploadService.getUploadPolicy(function(uploadPolicy) {
			if (uploadPolicy){
				self.setState({uploadPolicy});
			}
		});
	}

	getUploadData() {
		const now = Date.now()/1000; // in seconds
		var uploadPolicy = this.state.uploadPolicy;
		if (!uploadPolicy || (uploadPolicy && now + 10 > Number(uploadPolicy.expire))) {
			// If policy is null or expired, get a new one.
			uploadPolicy = UploadService.syncGetUploadPolicy();
			this.setState({uploadPolicy});
		} 
		return {
			key : uploadPolicy.key,
			policy: uploadPolicy.policy,
			OSSAccessKeyId: uploadPolicy.accessId, 
			success_action_status : '200',
			callback : uploadPolicy.callback,
			signature: uploadPolicy.signature,
		}
	}
	
	renderUploader() {
		const { formData } = this.state;
		const readyFile = formData.file;
		const props = {
			action: this.state.uploadPolicy && this.state.uploadPolicy.host,
			listType: "picture-card",
			showUploadList: false,
			className: "video-uploader",
			beforeUpload: (file) => {
				this.setState(({ formData }) => {
					formData.file = file;
					return {
						formData
					}
				});
				return false;
			},
		  fileList: readyFile ? [readyFile] : [],
		};

		if (readyFile) {
			const size = FileUtil.formatBytes(readyFile.size, 2);
			return  (
				<Upload {...props}>
					<div>
						<p>{readyFile.name}</p>
						<p>{readyFile.type}</p>
						<p>{size}</p>
					</div>
				</Upload>
			);
		} 

		return (
			<Upload {...props}>
				<div>
					<Icon type="upload" />
				</div>
			</Upload>
		);
	}
	
	render() {
		const { uploadStatus, formData } = this.state;
		const { getFieldDecorator } = this.props.form;
		var btnText = '';
		if (uploadStatus === 0) {
			btnText = '开始上传';
		} else if (uploadStatus === 1) {
			btnText = '上传中';
		} else {
			btnText = '上传完成';
		}

		return (
		  <div className='upload-video-page'>
				<Form className='upload-video-form'>
					<FormItem
						hasFeedback
					>
						{getFieldDecorator('videoTitle', {
							rules: [{
								required: true,
								message: '请输入视频标题',
							},{
								whitespace: true,
								message: '视频标题不允许是空格',
							}],
						})(
							<Input placeholder="视频标题" />
						)}
					</FormItem>
					{this.renderUploader()}
					<Button
						className="btn-upload-start"
						type="primary"
						onClick={this.handleUpload}
						disabled={formData.file == null || uploadStatus > 0}
						loading={uploadStatus===1}
					>
						{btnText}
					</Button>
				</Form>
				</div>
		);
	}
}

UploadVideoPageInner.propTypes = {
	form: PropTypes.object,
};

UploadVideoPageInner.defaultProps = {

};

UploadVideoPage = Form.create({})(UploadVideoPageInner);

export default UploadVideoPage