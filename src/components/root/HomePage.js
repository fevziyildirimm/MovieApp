import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./homePage.scss";
export class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="fullscreen">
          <div className="container">
            <div className="card card_1" style={{ borderRadius: "30px" }}>
              <a href="/MovieApp/RandomMovie">
                <div className="content">
                  <div className="title">Rastgele Film</div>
                  <div className="text">
                    Sizlere film arşivimizden rastgele filmleri getiriyoruz!
                  </div>
                </div>
                <div className="sinopse">
                  <div className="content-sinopse">
                    <div className="title">Rastgele Film</div>
                    <div className="text">
                      Film seçmenin zorluğunu biliyoruz.Bunun için rastgele bir
                      film seçimi muhtemelen sizin seçiminizden daha iyi ya da
                      daha kötü olmadığına inanıyoruz.
                    </div>
                  </div>
                  <div className="view series_lacasa">
                    {" "}
                    Başlamak için hemen tıklayın
                  </div>
                </div>{" "}
              </a>
            </div>

            <div className="card card_2" style={{ borderRadius: "25px" }}>
              <a href="/MovieApp/MovieList">
                <div className="content">
                  <div className="title">Film</div>
                  <div className="text">
                    Ruh halinize göre istediğiniz filmi seçin !{" "}
                  </div>
                </div>
                <div className="sinopse">
                  <div className="content-sinopse">
                    <div className="title">Film</div>
                    <div className="text">
                      En çok izlenen ,en çok ödül almış veya kendi ruha halinize
                      göre aradığınız yüzlerce filmi burada bulablirsiniz !
                    </div>
                  </div>
                  <div className="view series_got">
                    Başlamak için hemen tıklayın{" "}
                  </div>
                </div>
              </a>
            </div>
            <div className="card card_3" style={{ borderRadius: "25px" }}>
              <a href="/MovieApp/ShowList">
                <div className="content">
                  <div className="title">Dizi</div>
                  <div className="text">
                    İstediğiniz kategoriden istediğiniz diziyi seçin !
                  </div>
                </div>
                <div className="sinopse">
                  <div className="content-sinopse">
                    <div className="title">Dizi</div>
                    <div className="text">
                    En çok izlenen ,en çok ödül almış veya kendi ruha halinize
                      göre aradığınız yüzlerce diziyi burada bulablirsiniz !
                    </div>
                  </div>
                  <div className="view series_vikings">
                    {" "}
                    Başlamak için hemen tıklayın
                  </div>
                </div>
              </a>
            </div>

            <div className="card card_4" style={{ borderRadius: "25px" }}>
              <a href="/MovieApp/RandomShow">
                <div className="content">
                  <div className="title">Rastgele Dizi</div>
                  <div className="text">
                    Bir solukta bitirmelik rastgele diziler{" "}
                  </div>
                </div>
                <div className="sinopse">
                  <div className="content-sinopse">
                    <div className="title">Rastgele Dizi</div>
                    <div className="text">Dizi seçmenin zorluğunu biliyoruz.Bunun için rastgele bir
                      dizi seçimi muhtemelen sizin seçiminizden daha iyi ya da
                      daha kötü olmadığına inanıyoruz.</div>
                  </div>
                  <div className="view series_got">
                    Başlamak için hemen tıklayın{" "}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
