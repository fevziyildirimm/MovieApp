import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as movieAction from "../../redux/actions/movieAction";
import * as similarAction from "../../redux/actions/similarAction";
import * as movieDetailAction from "../../redux/actions/movieDetailAction";
import * as popularAction from "../../redux/actions/popularAction";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Badge } from "reactstrap";
import "./movielist.css";
import { withRouter } from "react-router-dom";
import LoadingPage from "../root/Loading"
class MovieList extends Component {
  state = {
    cagetoriesWithMovies: [],
    categories: [],
    isLoading:false
  };
  async componentDidMount() {
    this.state.isLoading=true;
    this.renderPage();
  }
  renderPage = async () => {
    let categories = await this.props.actions.getCategories();
    this.setState({ categories: categories.payload });
    let tempArray = [];
    for (let [index,category] of this.state.categories.entries()) {
      let movies = await this.props.actions.getMovie(category.id);
      console.log(index)
      movies = movies.payload;
      //console.log(index)
      //if(movies[index].overview===""){
        //console.log(movies[index].title)
      //}
      let tempObject = {
        category: category,
        movies: movies,
      };
      tempArray.push(tempObject);
    }
    await this.setState({ cagetoriesWithMovies: tempArray,
    isLoading:false });
  };
  async nextPathMovie(path, result) {
    await this.props.history.push(path);
  }

  render() {
    return (
      <div>
        {this.state.isLoading?(<LoadingPage></LoadingPage>):(
        this.state.cagetoriesWithMovies.map((categoryWithMovies, index) => (
          <CarouselProvider
            naturalSlideWidth={3}
            naturalSlideHeight={4}
            totalSlides={this.props.movie.length+4}
            visibleSlides={5}
            step={5}
            infinite={true}
          >
            <h3>
              <Badge color="warning">{categoryWithMovies.category.name}</Badge>
            </h3>
            <Slider key={index} >
              {categoryWithMovies.movies.map((result, index) => (
                <Slide className="property-card">
                  <div
                    key={index++}
                    onClick={() => this.nextPathMovie("./SimilarList/"+result.id, result)}
                  >
                    <div className="property-image">
                      <div>
                        <h5 style={{ zIndex: "100" }}>{result.title}</h5>
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
                        <div className="card__rating">8.2</div>
                      </div>
                    </div>
                    <div className="property-description">
                      <h5> {result.title} </h5>
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
    genres: state.categoryListReducer,
    movie: state.movieListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getMovie: bindActionCreators(movieAction.getMovie, dispatch),
      getSimilar: bindActionCreators(similarAction.getSimilar, dispatch),
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      getMovieDetail: bindActionCreators(
        movieDetailAction.getMovieDetail,
        dispatch
      ),
      getPopuler: bindActionCreators(popularAction.getPopular, dispatch),
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MovieList)
);
