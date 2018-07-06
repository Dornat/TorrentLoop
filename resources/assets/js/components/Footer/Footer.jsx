import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withLocalize, Translate } from 'react-localize-redux';

import './Footer.css';

class Foot extends Component {
	render() {
		return (
			<footer className="page-footer">
				<div className="footer-copyright">
				  <div className="container footer-text-position">
						© 2018 <Translate id="footer">Created by</Translate>
					  <a className="grey-text text-lighten-4 right creat-margin" target="_blank" href="https://github.com/Dornat">dpolosuh</a>
						<a className="grey-text text-lighten-4 right creat-margin" target="_blank" href="https://github.com/Madranko">mmotov</a>
						<a className="grey-text text-lighten-4 right creat-margin" target="_blank" href="http://www.github.com/Gryshchenko">vgryshch</a>
						<a className="grey-text text-lighten-4 right creat-margin" target="_blank" href="http://www.github.com/ekiriche">ekiriche</a>
				  </div>
			  </div>
		  </footer>
		);
	}
}

export default withLocalize(Foot);
