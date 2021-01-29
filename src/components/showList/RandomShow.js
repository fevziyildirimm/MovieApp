import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as showAction from "../../redux/actions/showAction";
import * as trailerShowAction from "../../redux/actions/trailerShowAction";
import YouTube from "react-youtube";
import "../movieList/random.scss";
import * as categoryShowAction from "../../redux/actions/categoryShowAction";
import LoadingPage from "../root/Loading"



class RandomShow extends React.Component {
  state = {
    movies: [],
    categ: [],
    isLoading:false
  };
    toggleNavs = async(e, yeri, index) => {
    await e.preventDefault();
    const yenidizi = await [...this.state.dizi];
    yenidizi[yeri] = await index;
    await this.setState({ dizi: yenidizi });
  };
  async componentDidMount() {
    this.state.isLoading=true;
    await this.getApi();
    var dict = {};
    await this.props.actions.getShowCategories();
    await this.matchToCategory(dict);
    //console.log(this.props.genres);
  }
  async matchToCategory(dict) {
    console.log(this.props.genres.length)
    for (let index = 0; index < this.props.genres.length; index++) {
      dict[this.props.genres[index].id] = await this.props.genres[index].name;
      console.log(dict);
    }
    await this.setState({ categ: dict,
      isLoading:false });
    //console.log(this.state.categ);
  }
  async _onReady(event) {
    await event.target.pauseVideo();
  }
  async Unlike(index) {
    this.state.isLoading=true;
    const delMovie = await this.state.movies;
    if (delMovie.length < 2) {
      await this.getApi();
    }
    delMovie[index] = delMovie[1];
    delMovie.splice(1, 1);
    await this.setState({ show: delMovie,
    isLoading:false });
  }
  getApi = async () => {
    const random = Math.floor(Math.random() * 20 + 1);
    let movies = await this.props.actions.getShow(null, random);
    movies.payload ? (movies = movies.payload) : (movies = []);
    const newMovies = movies;
    newMovies.sort(() => Math.random() - 0.5);
    for (let m of movies) {
      m.trailer = await this.props.actions.getTrailer(m.id);
      m.trailer.payload ? (m.trailer = m.trailer.payload) : (m.trailer = []);
    }
    await this.setState({ movies: newMovies });
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
              <div className="movie_card" id="bright" key={index}>
                <div className="info_section">
                  <div className="movie_header">
                    <img
                      className="locandina"
                      src={
                        "https://image.tmdb.org/t/p/w500/" + result.poster_path
                      }
                      alt={result.poster_path}
                    />
                    <h1>{result.name}</h1>
                    <h4>{result.first_air_date.substring(0, 4)}</h4>
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
    show: state.showListReducer,
    showDetail: state.showDetailReducer,
    trailer: state.trailerReducer,
    genres: state.categoryShowListReducer,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getShow: bindActionCreators(showAction.getShow, dispatch),
      getTrailer: bindActionCreators(
        trailerShowAction.getShowTrailer,
        dispatch
      ),
      getShowCategories: bindActionCreators(categoryShowAction.getShowCategories, dispatch),

    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RandomShow);
