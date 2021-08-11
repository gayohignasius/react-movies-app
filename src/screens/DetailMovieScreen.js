import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as movieActions from '../redux/actions/movie-actions';

const DetailMovieScreen = (props) => {
  const movieID = useSelector(state => state.movies.listMovieByID);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(movieActions.fetchMovieById(props.location.state.imdbID))
    setIsLoading(false)
  }, [])
  
  return (
    <div className='container-fluid'>
      {movieID && movieID.map((movie, index) => (
        <>
          <div className='row' key={index.toString()}>
            <div className='col-12'>
              <div className='detail-title'>
                <h4 className='display-7'>{movie.title}</h4>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', fontSize: '14px'}}>
                  <p>{movie.year}</p>
                  <span>&#9679;</span>
                  <p>{movie.rated}</p>
                  <span>&#9679;</span>
                  <p>{movie.runtime}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-12'>

            <div className='movie-detail'>
              <img src={movie.poster} className='detail-card-body' alt={movie.title}/>
              <p className='text-info-detail'>
                Director: <strong>{movie.director}</strong><br />
                Writer: <strong>{movie.writer}</strong><br />
                Actors: <strong>{movie.actors}</strong><br />
                Genre: <strong>{movie.genre}</strong><br />
                Released: <strong>{movie.released}</strong><br />
                Country: <strong>{movie.country}</strong><br />
                Language: <strong>{movie.language}</strong><br />
                Awards: <strong>{movie.awards}</strong><br />
                Ratings: <strong>{movie.imdbRating}/10</strong><br />
                Production: <strong>{movie.production}</strong><br />
              </p>
            </div>
            <div className='plot'>
              {movie.plot}
              </div>
            </div>
              
          </div>
        </>
      ))}
      </div>
  )
}

export default DetailMovieScreen;
