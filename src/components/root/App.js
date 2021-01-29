import React from "react";
import Navbar from "../navi/Navbar";
import Dashboard from "./Dashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SimilarList from "../movieList/SimilarList";
import RandomMovie from "../movieList/RandomMovie";
import HomePage from "./HomePage";
import { Col, Container, Row } from "reactstrap";
import SliderPage from "../movieList/SliderPage"
import ShowList from "../showList/ShowList";
import SimilarShowList from "../showList/SimilarShowList";
import RandomShow from "../showList/RandomShow";
function App() {
  return (
    <div>
    <Container>
      <Row>
        <Col xs="12">
          <Navbar></Navbar>
        </Col>
      </Row>

      <Row>
        <Col xs="12">
          <Switch>

            <Route path="/MovieApp/SimilarShowList" component={SimilarShowList}></Route>
            <Route path="/MovieApp/RandomShow" component={RandomShow}></Route>
            <Route path="/MovieApp/ShowList" component={ShowList}></Route>
            <Route path="/SliderPage/:id" component={SliderPage}></Route>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/MovieApp/SimilarList" component={SimilarList}></Route>
            <Route path="/MovieApp/RandomMovie" component={RandomMovie}></Route>
            <Route path="/MovieApp/MovieList" component={Dashboard}></Route>

          </Switch>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default App;
