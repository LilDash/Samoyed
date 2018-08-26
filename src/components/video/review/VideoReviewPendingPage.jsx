import * as React from 'react';
import PropTypes from 'prop-types';
import { List, Card, Row, Col, Button, Tag, Icon } from 'antd';
import 'antd/dist/antd.css'; 
import './video-review.scss';
import { VideoReviewService } from '../../../services/VideoReviewService';


export class VideoReviewPendingPage extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			page: 0,
		};

		this.loadVideoReviewPending = this.loadVideoReviewPending.bind(this);
	}

	componentWillMount() {
		
	}

	componentDidMount() {
		this.loadVideoReviewPending();
	}

	loadVideoReviewPending(page) {
		const self = this;
		VideoReviewService.getVideoReviewPending(page, function(uploadPolicy) {
			if (uploadPolicy){
				//self.setState({uploadPolicy});
			}
		});
	}

	render() {
		const data = [
			{
			  title: 'Ant Design Title 1',
			},
			{
			  title: 'Ant Design Title 2',
			},
			{
			  title: 'Ant Design Title 3',
			},
			{
			  title: 'Ant Design Title 4',
			},
		  ];

		return (
			<div className="video-review-pending-page" >
				<List
					className="video-review-list"
					itemLayout="vertical"
					split={true}
					dataSource={data}
					renderItem={item => (
					<List.Item >
						<Row type="flex" justify="space-around" align="middle">
							<Col span={14} >
								<Card className="video-review-snapshot" title="Video Title">
									<Card.Grid className="video-review-snapshot-item">
										<img src="http://img.mp.itc.cn/upload/20170511/587a4645ac4644139cb6416c11743b56_th.jpg" />
									</Card.Grid>
									<Card.Grid className="video-review-snapshot-item">
										<img src="http://img.mp.itc.cn/upload/20170511/587a4645ac4644139cb6416c11743b56_th.jpg" />
									</Card.Grid>
									<Card.Grid className="video-review-snapshot-item">
										<img src="http://img.mp.itc.cn/upload/20170511/587a4645ac4644139cb6416c11743b56_th.jpg" />
									</Card.Grid>
								</Card>
							</Col>
							<Col span={8} >
								<div className="video-review-item-info">
									<Row className="user">
										<label>上传者：</label>
										<span>Dash Fu</span>
										<label>上传时间：</label>
										<span>2018/08/01 13:00:01</span>
									</Row>
									<Row className="properties">
										<label>视频属性：</label>
										<span>大小：3.2M</span>
									</Row>
									<Row className="tags">
										<label>标签：</label>
										<Tag color="blue">标签tag</Tag>
										<Tag color="blue">标签tag</Tag>
										<Tag color="blue">标签tag</Tag>
										<Tag color="blue">标签tag</Tag>
										<Tag color="blue">标签tag</Tag>
										<Tag color="blue">标签tag</Tag>
									</Row>
									<Row className="buttons">
										<Button size="large" >
											<Icon type="play-circle" />
										</Button>
										<Button type="primary" size="large" icon="check">通过</Button>
										<Button type="danger" size="large" icon="close">屏蔽</Button>
									</Row>
								</div>
							</Col>
						</Row>
					</List.Item>
					)}
				/>
			</div>
		);
		
	}
}

VideoReviewPendingPage.propTypes = {

};

VideoReviewPendingPage.defaultProps = {

};