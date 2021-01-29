import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as popularAction from "../../redux/actions/popularAction";
import {Card,Button,CardImg,CardTitle,CardText,CardSubtitle,CardBody,Row,Col} from "reactstrap";
class PopularList extends Component {
  componentDidMount() {
    this.props.actions.getPopular()
  }
  render() {
    return (
      <div>
        <Row>
        {this.props.popular.map((result) => (
          <Col xs="12" sm="6" md="4" lg="4">
            <Card>
              <CardImg top width="100%" src={"https://image.tmdb.org/t/p/w500/"+result.backdrop_path} alt="Card image cap"/>
              <CardBody>
                <CardTitle tag="h5">{result.original_title}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{result.title}</CardSubtitle>
                <CardText>{result.overview}</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          </Col>
        ))}
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    popular: state.popularListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getPopular: bindActionCreators(popularAction.getPopular, dispatch),
    },
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(PopularList);
