import axios from "axios";
import { API_KEY } from "../../env";
import MovieDetail from "../../models/MovieDetail";
import Movies from "../../models/Movies";

export const GET_MOVIES = 'GET_MOVIES';
export const GET_MORE_MOVIES = 'GET_MORE_MOVIES';
export const GET_MOVIE_ID = 'GET_MOVIE_ID';

// new apikey => 535cac25
// old apikey => faf7e5bb
export const fetchMovies = (searchValue, currentPage) => {
  return async (dispatch, getState) => {
    try {
      let responseJson;
      const url = `http://www.omdbapi.com/?s=${searchValue}&page=${currentPage}&apikey=${API_KEY}`;
      await axios(url).then((response) => {
        responseJson = response.data.Search;
      })

      const listMovies = [];
      for (const key in responseJson) {
        listMovies.push(
          new Movies(
            responseJson[key].imdbID,
            responseJson[key].Title,
            responseJson[key].Year,
            responseJson[key].Type,
            responseJson[key].Poster,
          ),
        );
      }
      console.log('page action: ' + currentPage)
      if (currentPage === 1) {
        return dispatch({
          type: GET_MORE_MOVIES,
          payload: listMovies
        })
      }
      else {
        return dispatch({
          type: GET_MOVIES,
          payload: listMovies,
        });
      }
    } catch (error) {
      throw error;
    }
  }
}

export const fetchMovieById = (id) => {
  return async (dispatch, getState) => {
    try {
      let responseJson;
      const url = `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
      const listMovieByID = [];
      await axios(url).then((response) => {
        responseJson = response.data;
      })

      listMovieByID.push(
        new MovieDetail(
          responseJson.Title,
          responseJson.Year,
          responseJson.Rated,
          responseJson.Released,
          responseJson.Runtime,
          responseJson.Genre,
          responseJson.Director,
          responseJson.Writer,
          responseJson.Actors,
          responseJson.Plot,
          responseJson.Language,
          responseJson.Country, 
          responseJson.Awards, 
          responseJson.Poster, 
          responseJson.Ratings,
          responseJson.Metascore,
          responseJson.imdbRating, 
          responseJson.imdbVotes, 
          responseJson.imdbID, 
          responseJson.Type, 
          responseJson.DVD, 
          responseJson.BoxOffice, 
          responseJson.Production
          // responseJson.imdbID,
          // responseJson.Title,
          // responseJson.Year,
          // responseJson.Rated,
          // responseJson.Released,
          // responseJson.Runtime,
          // responseJson.Genre,
          // responseJson.Director,
          // responseJson.Actors,
          // responseJson.Plot,
          // responseJson.Language,
          // responseJson.Country,
          // responseJson.Awards, 
          // responseJson.Poster, 
          // responseJson.Ratings, 
          // responseJson.Metascore, 
          // responseJson.imdbVotes, 
          // responseJson.imdbRating
        ),
      );
        console.log(listMovieByID)
      dispatch({
        type: GET_MOVIE_ID,
        payload: listMovieByID
      })
    } catch (error) {
      throw error;
    }
  }
}

// this.id = id;
//     this.title = title;
//     this.year = year;
//     this.rated = rated;
//     this.released = released;
//     this.runtime = runtime;
//     this.genre = genre;
//     this.director = director;
//     this.actors = actors;
//     this.plot = plot;
//     this.language = language;
//     this.country = country;
//     this.awards = awards; 
//     this.poster = poster; 
//     this.ratings = ratings; 
//     this.metascore = metascore; 
//     this.imdbVotes = imdbVotes; 
//     this.imdbRating = imdbRating; 