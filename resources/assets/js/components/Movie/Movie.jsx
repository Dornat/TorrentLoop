import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
/*localization*/
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import globalTranslations from '../translations/global.json';
import ToggleButton from 'react-toggle-button';
/*localization end*/

import { Card, CardTitle , Col} from 'react-materialize';

import Navbar from '../Navbar/Navbar';
import Foot from '../Footer/Footer';
import MovieData from '../MovieData/MovieData';

import GetFilmsInfo from '../../functions/GetFilmsInfo';

import './Movie.css';

class Movie extends Component  {
	constructor(props) {
		super(props);
		let isMovie = this.props.location.state === undefined ? this.props.location.state : this.props.location.state.movie
		this.state = {
			movie: isMovie
		}
	}

	componentDidUpdate(prevProps) {
		const prevLangCode = prevProps.activeLanguage && prevProps.activeLanguage.code;
		const curLangCode = this.props.activeLanguage && this.props.activeLanguage.code;
		const hasLanguageChanged = prevLangCode !== curLangCode;
	}

	componentWillMount() {
		const params = "movie_details.json?movie_id=" + this.props.match.params.id;
		if (this.state.movie === undefined) {
			GetFilmsInfo(params)
			.then ((result) => {
				this.setState({ movie: result.data.movie});
			});
		}
	}

	render() {
		if (this.state.movie === undefined) {
			return (
				<div className="progress">
					<div className="indeterminate"></div>
				</div>
			)
		}

		return (
			<div className="movie-flex">
				<Navbar />
					<div className="container">
						<MovieData movieData={this.state.movie}/>
					</div>
				<Foot />
			</div>
		);
	}
}
export default withLocalize(Movie);
/*<MovieData movieData={this.state.movie}/>*/
