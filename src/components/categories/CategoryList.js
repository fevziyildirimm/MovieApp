import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Badge } from "reactstrap";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as movieAction from "../../redux/actions/movieAction";


class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = (result) => {
    this.props.actions.changeCategory(result);
    this.props.actions.getMovie(result.id)
  };
  render() {
    return (
      <div>
        <h3><Badge color="warning">Category</Badge></h3>
        <ListGroup>
          {this.props.genres.map((result) => (
            <ListGroupItem color="info"
              active={result.id === this.props.currentCategory.id}
              onClick={() => this.selectCategory(result)}
              key={result.id}
            >
              {result.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    genres: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(categoryActions.getCategories,dispatch),
      changeCategory: bindActionCreators(categoryActions.changeCategory,dispatch),
      getMovie: bindActionCreators(movieAction.getMovie, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
