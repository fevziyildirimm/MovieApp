import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryShowActions from "../../redux/actions/categoryShowAction";
import * as showAction from "../../redux/actions/showAction";
import * as similarShowAction from "../../redux/actions/similarShowAction";
import * as showDetailAction from "../../redux/actions/showDetailAction";
import {
    CarouselProvider,
    Slider,
    Slide,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Badge } from "reactstrap";
import "../movieList/movielist.css"
import { withRouter } from "react-router-dom";
import * as popularShowAction from "../../redux/actions/popularShowAction";
import LoadingPage from "../root/Loading"

class ShowList extends Component {
    state = {
        cagetoriesWithMovies: [],
        categories: [],
        isLoading:false
    }
    async componentDidMount() {
        this.state.isLoading=true;
        this.renderPage();
    }
    renderPage = async () => {
        let categories = await this.props.actions.getShowCategories();
        console.log(categories)
        this.setState({ categories: categories.payload });
        let tempArray = [];
        for (let category of this.state.categories) {
            let movies = await this.props.actions.getShow(category.id);
            movies = movies.payload;
            let tempObject = {
                category: category, movies: movies
            }
            tempArray.push(tempObject)
        }
        console.log(tempArray);
        await this.setState({ cagetoriesWithMovies: tempArray,
            isLoading:false })
    }
    async nextPathMovie(path, result) {
      await this.props.history.push(path);
    }
  

    render() {
        return (
            <div>
                {this.state.isLoading?(<LoadingPage></LoadingPage>):(
                this.state.cagetoriesWithMovies.map((categoryWithMovies, index) => (
                    <CarouselProvider key={index}
                    naturalSlideWidth={3}
                    naturalSlideHeight={4}
                    totalSlides={20}
                    visibleSlides={5}
                    step={5}
                    infinite={true}
                    > 
                        <h3>
                            <Badge color="warning">{categoryWithMovies.category.name}</Badge>
                        </h3>
                        <Slider>
                            {categoryWithMovies.movies.map((result, index) => (
                                <Slide className="property-card">
                                    <div
                                        key={index++}
                                        onClick={() => this.nextPathMovie("./SimilarShowList/"+result.id, result)}
                                    >
                                        <div className="property-image">
                                            <div>
                                                <h5 style={{ zIndex: "100" }}>{result.name}</h5>
                                                <img
                                                    src={
                                                        "https://image.tmdb.org/t/p/w500/" +
                                                        result.poster_path
                                                    }
                                                    className="property-image"
                                                    alt={
                                                        "https://image.tmdb.org/t/p/w500/" +
                                                        result.poster_path
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="property-description">
                                            <h5> {result.name} </h5>
                                            <hr />
                                            <h6> {result.overview.substring(0, 150)}</h6>
                                        </div>
                                    </div>

                                </Slide>
                            ))}
                        </Slider>
                    </CarouselProvider>
                )))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentCategory: state.changeCategoryReducer,
        genres: state.categoryShowListReducer,
        show: state.showListReducer,
    };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getShow: bindActionCreators(showAction.getShow, dispatch),
      getShowSimilar: bindActionCreators(similarShowAction.getShowSimilar, dispatch),
      getShowCategories: bindActionCreators(categoryShowActions.getShowCategories,dispatch),
      getShowDetail: bindActionCreators(
        showDetailAction.getShowDetail,
        dispatch
      ),
      getShowPopular: bindActionCreators(
        popularShowAction.getShowPopular,
        dispatch
      ),
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShowList)
);