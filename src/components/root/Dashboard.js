import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import MovieList from '../movieList/MovieList'
//import {Route,Switch} from "react-router-dom"
//import SimilarList from "../movieList/SimilarList";

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col xs="12">
                        <MovieList></MovieList>
                    </Col>
                </Row>
            </div>
        )
    }
}
