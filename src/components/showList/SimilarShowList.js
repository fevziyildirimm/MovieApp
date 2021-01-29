import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as similarShowAction from "../../redux/actions/similarShowAction";
import * as showDetailAction from "../../redux/actions/showDetailAction";
import * as showChangeAction from "../../redux/actions/showChangeAction";
import * as showAction from "../../redux/actions/showAction";
import * as popularShowAction from "../../redux/actions/popularShowAction";
import "../movieList/similar.scss";
import { Badge } from "reactstrap";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import * as trailerShowAction from "../../redux/actions/trailerShowAction";
import YouTube from "react-youtube";

class SimilarShowList extends Component {
  state = {
    currentSlide: "",
    trailer: [],
  };
  async componentDidMount() {
    const id = this.props.location.pathname.split("/")[2];
    await this.detail(id);

    
    await this.getTra(id);
  }

  detail = async (id) => {
    await this.props.actions.getShowDetail(id);
    await this.props.actions.getShowPopular();
    await this.props.actions.getShowSimilar(id);
  };



  getTra = async (id) => {
    let movies = await this.props.showDetail;
    movies.trailer = await this.props.actions.getShowTrailer(id);
    movies.trailer.payload
      ? (movies.trailer = movies.trailer.payload)
      : (movies.trailer = []);
    await this.setState({ trailer: movies.trailer });
  };
  async pageChange() {
    this.setState({ currentSlide: 0 });
    await this.props.actions.getShowSimilar(this.props.showDetail.id, 2);
    this.setState({ currentSlide: "" });

  }

  async nextPathMovie(path, result) {
    this.setState({ currentSlide: 0 });
    await this.props.actions.getShowPopular("1");
    await this.props.actions.changeShow(result);
    await this.props.actions.getShowSimilar(result.id);
    await this.props.actions.getShowDetail(result.id);
    await this.props.history.push(path);
    await this.getTra(result.id);
    this.setState({ currentSlide: "" });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  async getPopularMore() {
    this.setState({ currentSlide: 0 });
    await this.props.actions.getShowPopular();
    this.setState({ currentSlide: "" });

  }
  _onReady(event) {
    event.target.pauseVideo();
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
        <div className="movie_card" id="bright">
          <div className="info_section">
            <div className="movie_header">
              <img
                className="locandina"
                src={
                  "https://image.tmdb.org/t/p/w500/" +
                  this.props.showDetail.poster_path
                }
                alt={this.props.showDetail.poster_path}
              />
              <h1>{this.props.showDetail.name}</h1>
              <h4>{this.props.showDetail.first_air_date}</h4>
              <span className="minutes">{this.props.showDetail.runtime} min</span>
              {/* <p className="type">
                {this.props.showDetail.genres.map(
                  (genre, index) => genre.name + " "
                )}
              </p> */}
            </div>
            <div className="movie_desc">
              <p className="text">{this.props.showDetail.overview}</p>
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
                this.props.showDetail.backdrop_path
              })`,
            }}
          >
            {" "}
          </div>
        </div>
{this.props.similar.length>0&&
<div>

          <h3>
            <Badge color="warning">Bu Filme Benzer Diziler</Badge>
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
                      this.nextPathMovie("./"+result.id, result)
                    }
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
                </div>}
          <h3>
            <Badge color="warning">Populer Diziler</Badge>
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
                      this.nextPathMovie("./"+result.id, result)
                    }
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
                    <hr />
                    <div className="property-description">
                      <h5> {result.name} </h5>
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
    );
  }
}

function mapStateToProps(state) {
  return {
    similar: state.similarShowListReducer,
    showDetail: state.showDetailReducer,
    popular: state.popularShowListReducer,
    trailer: state.trailerShowReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getShowSimilar: bindActionCreators(
        similarShowAction.getShowSimilar,
        dispatch
      ),
      getShowDetail: bindActionCreators(
        showDetailAction.getShowDetail,
        dispatch
      ),
      showChange: bindActionCreators(
        showChangeAction.showChangeSuccess,
        dispatch
      ),
      changeShow: bindActionCreators(showAction.changeShow, dispatch),
      getShowPopular: bindActionCreators(
        popularShowAction.getShowPopular,
        dispatch
      ),
      getShowTrailer: bindActionCreators(
        trailerShowAction.getShowTrailer,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SimilarShowList);
