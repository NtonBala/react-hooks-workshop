// Core
import React, { useState, useEffect } from "react";
import "./styles/main.css";
import {getStyles} from "../instruments";
import { api } from "../API";
import cx from "classnames";

const sortUtility = (a, b, filter) => {
  if (filter === "DESC") return b -a;

  return a -b;
};

export const Kinoafisha = () => {
  const [selectedFilter, setSelectedFilter] = useState("upcoming");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [displayFilter, setDisplayFilter] = useState("DESC");

  const styles = getStyles({
    selectedFilter
  });

  useEffect(() => {
  const getMoviesByFilter = async () => {
    const newMovies = await api.getMovies(selectedFilter);
    console.log(newMovies);

    setMovies(newMovies);
  };

  getMoviesByFilter();
  }, [selectedFilter]);

  const moviesJSX = movies.sort((a, b) => sortUtility(a.release, b.release, displayFilter)).map(movie => {
    const posterStyle = cx("poster", {
      selectedPoster: movie.id === selectedMovie
    });

    return (
      <div
        className="movie"
        key={movie.id}
      >
        <div
          className={posterStyle}
          onClick={() => setSelectedMovie(movie.id)}
        >
          <span className="genre">{movie.genre}</span>
          <img src={movie.poster}/>
          <span className="rating">{movie.rating}</span>
        </div>
        <span className="title">{movie.title}</span>
      </div>
    );
  });

  return (
    <>
      <div className="header">
        <div className="logo"/>

        <div className="filters">
          <div
            className={styles.latestFilter}
            data-name="latest"
            onClick={e => setSelectedFilter(e.currentTarget.dataset.name)}
          >
            <span>Новинки 2019</span>
          </div>

          <div
            className={styles.upcomingFilter}
            data-name="upcoming"
            onClick={e => setSelectedFilter(e.currentTarget.dataset.name)}
          >
            <span>Скоро в кинотеатрах</span>
          </div>

          <div
            className={styles.popularFilter}
            data-name="popular"
            onClick={e => setSelectedFilter(e.currentTarget.dataset.name)}
          >
            <span>В топ-чартах</span>
          </div>
        </div>
      </div>

      <div className="sorting">
        <button
          className=""
          onClick={() => setDisplayFilter(displayFilter === "DESC" ? "ASC" : "DESC")}
        >
          по новизне
        </button>
      </div>

      <div className="content">
        {moviesJSX}
      </div>

      <div className="footer">
        <a href="mailto:team@lectrum.io">team@lectrum.io</a>
        <span>
          2019 © Все права защищены. Разработано с любовью в&nbsp; <a href="https://lectrum.io/intensive/react" rel="noreferrer noopener" target="_blank">Лектруме</a>.
        </span>
        <div className="social">
          <a className="facebook" href="https://www.facebook.com/lectrum/" rel="noreferrer noopener" target="_blank"/>
          <a className="telegram" href="https://t.me/lectrum" rel="noreferrer noopener" target="_blank"/>
        </div>
      </div>
    </>
  );
};
