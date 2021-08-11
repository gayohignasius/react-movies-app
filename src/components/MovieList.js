import { Modal } from 'bootstrap';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import MyModal from './MyModal';

const MovieList = (props) => {
  const location = useLocation()
  const { data } = props;
  let titleMovie = data.title;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='col-sm-3 col-md-4 movie-container'>
      <div className='card movie'>
        <div className='card-body'>
          <Link to={{
            pathname: `/detail/${data.id}`,
            state: {
              background: location,
              thumbnail: data.poster
            }
          }}>
          <img
            src={data.poster}
            alt={data.title}
          />
          </Link>
        </div>
        <div className='card-body'>
          <p className='movie-title'>{(titleMovie.length > 35) ? titleMovie.substring(0, 35) + '...': titleMovie}</p>
        </div>
        <div className='card-footer text-center'>
          <p><span className='text-dark badge bg-warning'>{data.type}</span></p>
          <Link to={{
            pathname: `detail/${data.id}`,
            state: {
              imdbID: data.id
              // title: data.title,
              // poster: data.poster,
              // year: data.year
            }
          }}><button type="button" className="btn btn-primary c-100" >Detail...</button></Link>
        </div>
      </div>
    </div>
  )
}

export default MovieList;
