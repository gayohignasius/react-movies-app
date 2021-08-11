/* eslint-disable import/no-anonymous-default-export */
import { GET_MORE_MOVIES, GET_MOVIES, GET_MOVIE_ID } from "../actions/movie-actions";

const initialState = {
  listOfMovies: [],
  listMovieByID: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        // listOfMovies: action.payload
        listOfMovies: state.listOfMovies.concat(action.payload),
      }
    case GET_MORE_MOVIES:
      return {
        listOfMovies: action.payload
      }
    case GET_MOVIE_ID:
      return {
        listMovieByID: action.payload
      }
    default:
      return state; 
  }
};