// Core
import React, { useState, useEffect } from "react";
import "./styles/main.css";
import {getStyles} from "../instruments";
import { api } from "../API";
import cx from "classnames";

export const Kinoafisha = () => {
  const [selectedFilter, setSelectedFilter] = useState("upcoming");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");

  const styles = getStyles({
    selectedFilter
  });

  useEffect(() => {
    const getMoviesByFilter = async () => {
      const newMovies = await api.getMovies(selectedFilter);

      setMovies(newMovies);
    };

    getMoviesByFilter();
  }, [selectedFilter]);

  const moviesJSX = movies.map(movie => {
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

  return <>
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

    <div className="content">
      {moviesJSX}
    </div>
    </>
};
