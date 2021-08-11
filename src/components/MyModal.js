import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Image({ color }) {
  return (
    <div
      style={{
        width: '300px',
        height: 500,
        // backgroundImage: color,
        backgroundRepeat: 'no-repeat',
        // justifyItems: 'center'
      }}
    >
      <img src={color}/>
        {/* <img src="https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_SX300.jpg" alt="Captain America: The First Avenger"/> */}
    </div>
  );
}


const MyModal = (props) => {
  let history = useHistory();
  let { id } = useParams();
  
  let image = useSelector(state => state.movies.listMovieByID)
  console.log(image);
  let poster = history.location.state.thumbnail
  console.log(history.location.state.thumbnail);
  // console.log(poster);
    // IMAGES[parseInt(id, 10)];

  if (!poster) return null;

  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div
      // className="container"
      onClick={back}
      style={{
        maxHeight: '100%', 
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.25)",
        backgroundRepeat: 'repeat'
      }}
    >
      <div
        style={{
          top: 'auto',
          position: "absolute",
          background: "#fff",
          marginLeft: '35%',
          padding: 15,
          // height: '100vh',
          border: "2px solid #444"
        }}
      >
        {/* <h1>{poster}</h1> */}
        <Image color={poster}/>
        <button type="button" onClick={back}>
          Close
        </button>
      </div>
    </div>
  )
}

export default MyModal
