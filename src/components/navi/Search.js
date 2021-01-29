import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchAction from "../../redux/actions/searchAction";
import * as similarAction from "../../redux/actions/similarAction";
import * as movieDetailAction from "../../redux/actions/movieDetailAction";
import * as popularShowAction from "../../redux/actions/popularShowAction";
import * as showDetailAction from "../../redux/actions/showDetailAction";
import * as similarShowAction from "../../redux/actions/similarShowAction";
import * as popularAction from "../../redux/actions/popularAction";


import "./search.css";
import { withRouter } from "react-router-dom";

class Search extends Component {
  async search(e) {
    await this.props.actions.getSearch(e.target.value);
    console.log(this.props.search);
  }

  async nextPath(path, result) {
    if (result.media_type === "movie") {
      await  this.props.actions.getSimilar(result.id);
      await this.props.actions.getMovieDetail(result.id);
      await this.props.actions.getSearch("");
      await  this.props.history.push("../../SimilarList/"+path);
      await this.props.actions.getPopular();

    }
    if(result.media_type === "tv") {
      await this.props.actions.getShowPopular();
      await this.props.actions.getShowSimilar(result.id);
      await this.props.actions.getShowDetail(result.id);
      await this.props.actions.getSearch("");
      await this.props.history.push("../../SimilarShowList/"+path);
    }
  }

  render() {
    return (
      <div id="searchid">
        <div class="flexbox">
          <div class="search">
            <div>
              <input
                type="search"
                placeholder="Arama Yap . . ."
                onChange={(e) => this.search(e)}
              />
            </div>
          </div>
        </div>
        <ul id="listsearch">
          {this.props.search.map((item) => (
            <div>
              <li onClick={() => this.nextPath(item.id, item)}>
                <img
                  src={"https://image.tmdb.org/t/p/w500/" + item.poster_path}
                  alt={item.poster_path}
                />
                <h5 style={{ color: "#efefef" }}>{item.title}</h5>
                <h5
                  style={
                    item.vote_average > 7
                      ? { color: "green" }
                      : item.vote_average > 5
                      ? { color: "yellow" }
                      : { color: "red" }
                  }
                >
                  
                  <h5 style={{ color: "white", display: "inline" }}>Puan:</h5>
                  {item.vote_average}
                </h5>
                <h4>{item.media_type}</h4>
              </li>
              <hr />
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.searchReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getSearch: bindActionCreators(searchAction.getSearch, dispatch),
      getSimilar: bindActionCreators(similarAction.getSimilar, dispatch),
      getMovieDetail: bindActionCreators(
        movieDetailAction.getMovieDetail,
        dispatch
      ),
      getShowSimilar: bindActionCreators(
        similarShowAction.getShowSimilar,
        dispatch
      ),
      getShowDetail: bindActionCreators(
        showDetailAction.getShowDetail,
        dispatch
      ),
      getShowPopular: bindActionCreators(
        popularShowAction.getShowPopular,
        dispatch
      ),
      getPopular: bindActionCreators(
        popularAction.getPopular,
        dispatch
      ),
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));