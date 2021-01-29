import React, { Component } from 'react'
import { Container,Row } from 'reactstrap'
import LoadingImage from "../../img/giphy.gif"
import "../movieList/movielist.css"


export default class Loading extends Component {
    render() {
        return (
            <Container className="center">
                <Row>
                <img src={LoadingImage} alt="Loading" ></img>
                </Row>
            </Container>
            
        )
    }
}
