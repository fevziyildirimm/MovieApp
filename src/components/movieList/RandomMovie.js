import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as movieAction from "../../redux/actions/movieAction";
import * as trailerAction from "../../redux/actions/trailerAction";
import YouTube from "react-youtube";
import "./random.scss";
import * as categoryActions from "../../redux/actions/categoryActions";
import LoadingPage from "../root/Loading"


class RandomMovie extends React.Component {
  state = {
    movies: [],
    categ: [],
    isLoading:false
  };
  toggleNavs = (e, yeri, index) => {
    e.preventDefault();
    const yenidizi = [...this.state.dizi];
    yenidizi[yeri] = index;
    this.setState({ dizi: yenidizi });
  };
  async componentDidMount() {
    this.state.isLoading=true;
    await this.getApi();
    var dict = {};
    await this.props.actions.getCategories();
    await this.matchToCategory(dict);
  }
  matchToCategory(dict) {
    for (let index = 0; index < this.props.genres.length; index++) {
      dict[this.props.genres[index].id] = this.props.genres[index].name;
    }
    this.setState({ categ: dict,
    isLoading:false });
  }
  _onReady(event) {
    event.target.pauseVideo();
  }
  async Unlike(index) {
    this.state.isLoading=true;
    const delMovie = this.state.movies;
    if (delMovie.length < 2) {
      await this.getApi();
    }
    delMovie[index] = delMovie[1];
    delMovie.splice(1, 1);
    this.setState({ movie: delMovie,isLoading:false });
  }
  getApi = async () => {
    const random = Math.floor(Math.random() * 20 + 1);
    let movies = await this.props.actions.getMovie(null, random);
    movies.payload ? (movies = movies.payload) : (movies = []);
    const newMovies = movies;
    newMovies.sort(() => Math.random() - 0.5);
    for (let m of movies) {
      m.trailer = await this.props.actions.getTrailer(m.id);
      m.trailer.payload ? (m.trailer = m.trailer.payload) : (m.trailer = []);
    }
    this.setState({ movies: newMovies });
  };

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
        {this.state.isLoading?(<LoadingPage></LoadingPage>):(
        this.state.movies.map(
          (result, index) =>
            index < 1 && (
              <div className="movie_card" id="bright">
                {console.log(result)}
                <div className="info_section">
                  <div className="movie_header">
                    <img
                      className="locandina"
                      src={
                        "https://image.tmdb.org/t/p/w500/" + result.poster_path
                      }
                      alt={result.poster_path}
                    />
                    <h1>{result.title}</h1>
                    <h4>{result.release_date.substring(0, 4)}</h4>
                    <span className="minutes">117 min</span>
                    <p className="type">
                      {result.genre_ids.map(
                        (genre, index) =>
                          this.state.categ[result.genre_ids[index]] + " "
                      )}
                    </p>
                  </div>
                  <div className="movie_desc">
                    <p className="text">{result.overview}</p>
                  </div>

                  <div style={{ paddingLeft: "20px" }}>
                    <YouTube
                      videoId={
                        result.trailer
                          ? result.trailer.length
                            ? result.trailer[0].key
                            : "-"
                          : "-"
                      }
                      opts={opts}
                      onReady={this._onReady}
                    />
                    <button
                      onClick={() => this.Unlike(index)}
                      className="btn btn-danger"
                    >
                      İzledim Başka Film Getir
                    </button>
                  </div>
                </div>

                <div
                  className="blur_back "
                  style={{
                    backgroundImage: `url(${
                      "https://image.tmdb.org/t/p/w500/" + result.backdrop_path
                    })`,
                  }}
                >
                  {" "}
                </div>
              </div>
            )
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movie: state.movieListReducer,
    movieDetail: state.movieDetailReducer,
    trailer: state.trailerReducer,
    genres: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getMovie: bindActionCreators(movieAction.getMovie, dispatch),
      getTrailer: bindActionCreators(trailerAction.getTrailer, dispatch),
      getCategories: bindActionCreators(categoryActions.getCategories, dispatch),

    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RandomMovie);
