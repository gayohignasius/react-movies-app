import React from 'react';

const SearchBox = (props) => {
  return (
    <>
      <div className='col-10'>
        <div className="search-container">
          <div className="form-outline">
            <input
              type="search"
              className="form-control"
              placeholder="Search"
              value={props.value}
              onChange={(event) => props.setSearchValue(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='col-2'>
        <button type="button" className="btn btn-warning c-100" onClick={props.getListMovies}>
          Search
        </button>
      </div>
    </>
      // <input
      //   className='form-control'
      //   value={props.value}
      //   onChange={(event) => props.setSearchValue(event.target.value)}
      //   placeholder='Type to search...'
      // ></input>
      // {/* <button className='search-button' type='button' onClick={props.getListMovies}>Search</button> */}
  );
};

export default SearchBox;