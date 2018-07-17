import React, { Component } from 'react';
import axios from 'axios';
/*localization*/
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
/*localization end*/

import './Profile.css';
import {Card, CardTitle, Col, Chip, Row} from 'react-materialize';
import Navbar from '../Navbar/Navbar';
import Foot from '../Footer/Footer';

class ViewProfile extends Component  {
    constructor(props) {
        super(props);
      //  console.log(this.props);
        this.state = {'id': this.props.match.params.id};
    }

    componentWillMount() {
        axios.post('http://localhost:8100/profile/get-user-info', {'id': this.state.id}).then(result => {
            this.setState({
                'firstname': result.data.firstname,
                'lastname': result.data.lastname,
                'picture': result.data.photo,
                'info': result.data.info
            });
        //    console.log(this.state);
        });
    }

    render() {
      if (!this.state.picture)
        return <div></div>

        return (
            <div className="movie-flex">
                <Navbar />
                <div className="container">
                    <Row>
                        <Col m={12} s={12}>
                            <Card horizontal header={<CardTitle image={this.state.picture}></CardTitle>}>
                                <h4>{this.state.firstname} {this.state.lastname}</h4>
                                <h6>Bio</h6>
                                <p>{this.state.info}</p>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Foot />
            </div>
        );
    }
}
export default withLocalize(ViewProfile);
