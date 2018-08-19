import * as React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import { EditPage } from './page/EditPage';
import { ListPage } from './page/ListPage';
import UploadVideoPage from './video/UploadVideoPage';
import PropTypes from 'prop-types';
import EventManager from '../services/utils/EventManager';
import { Header } from './common/header/Header';

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
            case 'video_edit': return <EditPage {...this.state.pageParams} />;
            case 'video_list': return <ListPage />;
            case 'video_upload': return <UploadVideoPage />;
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
                <SubMenu title={<span><Icon type="solution" />视频审核</span>}>     
                    <Menu.Item key="video_audit:pending">待审核视频</Menu.Item>
                    <Menu.Item key="video_audit:finished">已审核视频</Menu.Item>
                </SubMenu>
                <Menu.Item key="video_upload">
                    <Icon type="upload" />上传视频
                </Menu.Item>
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