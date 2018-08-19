import * as React from 'react';
import { Row, Col } from 'antd';
import './header.scss';

export class Header extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			
        };

      
	}

	render() {

		return (
			
			<header className='header'>              
                <a className='header-logo' href="/" >
                    <i />
                    <span>Samoyed</span>
                </a>
			</header>
		);
  	}
}

Header.propTypes = {
	
};

Header.defaultProps = {
};