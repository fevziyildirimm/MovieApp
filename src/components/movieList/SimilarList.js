import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as similarAction from "../../redux/actions/similarAction";
import * as movieDetailAction from "../../redux/actions/movieDetailAction";
import * as movieChangeAction from "../../redux/actions/movieChangeActions";
import * as movieAction from "../../redux/actions/movieAction";
import * as popularAction from "../../redux/actions/popularAction";
import YouTube from "react-youtube";
import * as trailerAction from "../../redux/actions/trailerAction";
import "./similar.scss";
import {  Badge } from "reactstrap";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import LoadingPage from "../root/Loading";

class SimilarList extends Component {
  state = {
    currentSlide: "",
    trailer: [],
    isLoading: false,
  };
  async componentDidMount() {
    const id = this.props.location.pathname.split("/")[2];
    await this.detail(id);
    await this.getTra(id);
  }
  detail = async (id) => {
    await this.props.actions.getMovieDetail(id);
    await this.props.actions.getPopuler();
    await this.props.actions.getSimilar(id);
  };
  getTra = async (id) => {
    let movies = await this.props.movieDetail;
    movies.trailer = await this.props.actions.getTrailer(id);
    movies.trailer.payload
      ? (movies.trailer = movies.trailer.payload)
      : (movies.trailer = []);
    await this.setState({ trailer: movies.trailer, isLoading: false });
  };

  async pageChange() {
    await this.props.actions.getSimilar(this.props.movieDetail.id);
  }

  async nextPathMovie(path, result) {
    this.setState({ currentSlide: 0 });
    await this.props.actions.getPopuler("1");
    await this.props.actions.getSimilar(result.id);
    await this.props.actions.getMovieDetail(result.id);
    await this.props.history.push(path);
    await this.getTra(result.id);
    this.setState({ currentSlide: "" });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  _onReady(event) {
    event.target.pauseVideo();
  }

  async getPopularMore() {
    await this.props.actions.getPopuler();
  }
  render() {
    const opts = {
      height: "300",
      width: "500",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };
    return (
      <div>
        {this.state.isLoading ? (
          <LoadingPage></LoadingPage>
        ) : (
          <div>
            <div className="movie_card" id="bright">
              <div className="info_section">
                <div className="movie_header">
                  <img
                    className="locandina"
                    src={
                      "https://image.tmdb.org/t/p/w500/" +
                      this.props.movieDetail.poster_path
                    }
                    alt={this.props.movieDetail.poster_path}
                  />
                  <h1>{this.props.movieDetail.title}</h1>
                  <h4>{this.props.movieDetail.release_date}</h4>
                  <span className="minutes">
                    {this.props.movieDetail.runtime} min
                  </span>
                  

                 {/*  {this.props.movieDetail.title.map((genre, index) => (
                    <p className="type" key={index}> {genre.name}</p>
                  ))} */}
                </div>
                <div className="movie_desc">
                  <p className="text">{this.props.movieDetail.overview}</p>
                </div>

                <div style={{ paddingLeft: "20px" }}>
                  <YouTube
                    videoId={
                      this.state.trailer
                        ? this.state.trailer.length
                          ? this.state.trailer[0].key
                          : "-"
                        : "-"
                    }
                    opts={opts}
                    onReady={this._onReady}
                  />
                </div>
              </div>

              <div
                className="blur_back "
                style={{
                  backgroundImage: `url(${
                    "https://image.tmdb.org/t/p/w500/" +
                    this.props.movieDetail.backdrop_path
                  })`,
                }}
              >
                {" "}
              </div>
            </div>

              {this.props.similar.length > 0 && (
                <div>
                  <h3>
                    <Badge color="warning">Bu Filme Benzer Filmler</Badge>
                  </h3>
                  <hr />

                  <CarouselProvider
                    naturalSlideWidth={3}
                    naturalSlideHeight={4}
                    totalSlides={23}
                    visibleSlides={5}
                    step={5}
                    infinite={true}
                    currentSlide={this.state.currentSlide}
                  >
                    <Slider>
                      {this.props.similar.map((result, index) => (
                        <Slide className="property-card">
                          <div
                            key={index++}
                            onClick={() =>
                              this.nextPathMovie("./" + result.id, result)
                            }
                          >
                            <div className="property-image">
                              <div>
                                <h5 style={{ zIndex: "100" }}>
                                  {result.title}
                                </h5>
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
                            <hr />
                            <div className="property-description">
                              <h5> {result.title} </h5>
                              <hr />
                              <h6> {result.overview.substring(0, 150)}</h6>
                            </div>
                          </div>
                        </Slide>
                      ))}{" "}
                      <button
                        onClick={() => this.pageChange()}
                        className={"btn btn-warning"}
                      >
                        Daha Fazla
                      </button>
                    </Slider>
                  </CarouselProvider>
                </div>
              )}
              <h3>
                <Badge color="warning">Populer Fİlmler</Badge>
              </h3>
              <hr />

              <CarouselProvider
                naturalSlideWidth={3}
                naturalSlideHeight={4}
                totalSlides={23}
                visibleSlides={5}
                step={5}
                infinite={true}
                currentSlide={this.state.currentSlide}
              >
                <Slider>
                  {this.props.popular.map((result, index) => (
                    <Slide className="property-card">
                      <div
                        key={index++}
                        onClick={() =>
                          this.nextPathMovie("./" + result.id, result)
                        }
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
                          </div>
                        </div>
                        <hr />
                        <div className="property-description">
                          <h5> {result.title} </h5>
                          <hr />
                          <h6> {result.overview.substring(0, 150)}</h6>
                        </div>
                      </div>
                    </Slide>
                  ))}{" "}
                  <button
                    onClick={() => this.getPopularMore()}
                    className={"btn btn-warning"}
                  >
                    Daha Fazla
                  </button>
                </Slider>
              </CarouselProvider>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    popular: state.popularListReducer,
    similar: state.similarListReducer,
    movieDetail: state.movieDetailReducer,
    trailer: state.trailerReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getSimilar: bindActionCreators(similarAction.getSimilar, dispatch),
      movieDetail: bindActionCreators(
        movieDetailAction.getMovieDetail,
        dispatch
      ),
      movieChange: bindActionCreators(
        movieChangeAction.movieChangeSuccess,
        dispatch
      ),
      changeMovie: bindActionCreators(movieAction.changeMovie, dispatch),
      getMovieDetail: bindActionCreators(
        movieDetailAction.getMovieDetail,
        dispatch
      ),
      getPopuler: bindActionCreators(popularAction.getPopular, dispatch),
      getTrailer: bindActionCreators(trailerAction.getTrailer, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SimilarList);
