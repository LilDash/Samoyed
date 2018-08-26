import * as React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import VideoUploadPage from './video/upload/VideoUploadPage';
import { VideoReviewPendingPage } from './video/review/VideoReviewPendingPage'
import PropTypes from 'prop-types';
import EventManager from '../services/utils/EventManager';
import { Header } from './common/header/Header';
import './page-container.scss';

export class PageContainer extends React.Component {

	constructor(props){
		super(props);
		this.state = {
            curPage: 'list',
            pageParams: {},
            editPageEventListener: null,
		};
	}

	componentDidMount() {
        const self = this;
        const editPageEventListener = (postId) =>{
            self.setState({curPage: 'edit', pageParams: {postId: postId}});
        };
        EventManager.addListener("go_to_edit_page", editPageEventListener);
        this.setState({editPageEventListener});
    }

    componentWillUnmount() {
        EventManager.removeListener('go_to_edit_page', this.state.editPageEventListener);
    }

    handleNavClick(obj) {
        // obj.item;
        // obj.key;
        // obj.keyPath;
        this.setState({curPage: obj.key});

    }

    renderPage() {
        switch(this.state.curPage) {
            case 'video:review:pending': return <VideoReviewPendingPage />;
            case 'video:upload': return <VideoUploadPage />;
        }
    }

    renderNav() {
        return (
            <Menu
                onClick={this.handleNavClick.bind(this)}
                selectedKeys={[this.state.curPage]}
                mode="horizontal"
            >
                <Menu.Item key="stat">
                    <Icon type="area-chart" />数据统计
                </Menu.Item>
                <SubMenu title={<span><Icon type="video-camera" />视频</span>}>  
                    <MenuItemGroup title="上传">
                        <Menu.Item key="video:upload">
                            <Icon type="upload" />上传视频
                        </Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="审核">
                        <Menu.Item key="video:review:pending">
                            <Icon type="solution" />待审核视频
                        </Menu.Item>
                        <Menu.Item key="video:review:pass">
                            <Icon type="smile-o" />已审核视频
                        </Menu.Item>
                        <Menu.Item key="video:review:block">
                            <Icon type="frown-o" />已屏蔽视频
                        </Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
                <Menu.Item key="credit">
                    <Icon type="team" />用户行为信用管理
                </Menu.Item>
            </Menu>
        );
    }

	render() {

		return (
			<div className='page-container'>
                <Header />
                <div className='nav'>
                    {this.renderNav()}
                </div>        
                <div className='page-content'>
                    {this.renderPage()}
                </div>  
			</div>
		);
  	}
}

PageContainer.propTypes = {
	
};

PageContainer.defaultProps = {
};