import React, {useCallback, useEffect, useState} from 'react'
import SearchBox from '../components/SearchBox'
import MovieList from '../components/MovieList';
import { useDispatch, useSelector } from 'react-redux';
import * as movieActions from '../redux/actions/movie-actions';

const MovieScreen = (props) => {
  const movies = useSelector(state => state.movies.listOfMovies);
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // const [dummyData, setDummyData] = useState([
  //   {
  //     "title": "Star Wars: Episode IV - A New Hope",
  //     "year": "1977",
  //     "imdbID": "tt0076759",
  //     "type": "movie",
  //     "poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
  //   },
  //   {
  //     "title": "Star Wars: Episode V - The Empire Strikes Back",
  //     "year": "1980",
  //     "imdbID": "tt0080684",
  //     "type": "movie",
  //     "poster": "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
  //   },
  //   {
  //     "title": "Star Wars: Episode VI - Return of the Jedi",
  //     "year": "1983",
  //     "imdbID": "tt0086190",
  //     "type": "movie",
  //     "poster": "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
  //   },
  //   {
  //     "title": "Star Wars: Episode IV - A New Hope",
  //     "year": "1977",
  //     "imdbID": "tt0076759",
  //     "type": "movie",
  //     "poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
  //   },
  //   {
  //     "title": "Star Wars: Episode V - The Empire Strikes Back",
  //     "year": "1980",
  //     "imdbID": "tt0080684",
  //     "type": "movie",
  //     "poster": "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
  //   },
  //   {
  //     "title": "Star Wars: Episode VI - Return of the Jedi",
  //     "year": "1983",
  //     "imdbID": "tt0086190",
  //     "type": "movie",
  //     "poster": "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
  //   },
  //   {
  //     "title": "Iron Man",
  //     "year": "2008",
  //     "imdbID": "tt0371746",
  //     "type": "movie",
  //     "poster": "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg"
  //   },
  //   {
  //     "title": "Iron Man Three",
  //     "year": "2013",
  //     "imdbID": "tt1300854",
  //     "type": "movie",
  //     "poster": "https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg"
  //   },
  //   {
  //     "title": "Iron Man 2",
  //     "year": "2010",
  //     "imdbID": "tt1228705",
  //     "type": "movie",
  //     "poster": "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_SX300.jpg"
  //   },
  //   {
  //     "title":	"The Iron Giant",
  //     "year":	"1999",
  //     "imdbID":	"tt0129167",
  //     "type":	"movie",
  //     "poster":	"https://m.media-amazon.com/images/M/MV5BMjIxNDU2Njk0OV5BMl5BanBnXkFtZTgwODc3Njc3NjE@._V1_SX300.jpg"
  //     },
  //     {	
  //     "title":	"The Man in the Iron Mask",
  //     "year":	"1998",
  //     "imdbID":	"tt0120744",
  //     "type":	"movie",
  //     "poster":	"https://m.media-amazon.com/images/M/MV5BZjM2YzcxMmQtOTc2Mi00YjdhLWFlZjUtNmFmMDQzYzU2YTk5L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
  //     },
  //     {
  //     "title":	"Iron Fist",
  //     "year":	"2017–2018",
  //     "imdbID":	"tt3322310",
  //     "type":	"series",
  //     "poster":	"https://m.media-amazon.com/images/M/MV5BMjI5Mjg1NDcyOV5BMl5BanBnXkFtZTgwMjAxOTQ5MTI@._V1_SX300.jpg"
  //     },
  //     {	
  //     "title":	"The Iron Lady",
  //     "year":	"2011",
  //     "imdbID":	"tt1007029",
  //     "type":	"movie",
  //     "poster":	"https://m.media-amazon.com/images/M/MV5BODEzNDUyMDE3NF5BMl5BanBnXkFtZTcwMTgzOTg3Ng@@._V1_SX300.jpg"
  //     },
  //     {	
  //     "title":	"Iron Sky",
  //     "year":	"2012",
  //     "imdbID":	"tt1034314",
  //     "type":	"movie",
  //     "poster":	"https://m.media-amazon.com/images/M/MV5BMTM2MDg5MzgxNF5BMl5BanBnXkFtZTcwODUzNjMxOA@@._V1_SX300.jpg"
  //     },
  //     {	
  //     "title":	"The Man with the Iron Fists",
  //     "year":	"2012",
  //     "imdbID":	"tt1258972",
  //     "type":	"movie",
  //     "poster":	"https://m.media-amazon.com/images/M/MV5BMTg5ODI3ODkzOV5BMl5BanBnXkFtZTcwMTQxNjUwOA@@._V1_SX300.jpg"
  //     },
  //     {	
  //     "title":	"Cross of Iron",
  //     "year":	"1977",
  //     "imdbID":	"tt0074695",
  //     "type":	"movie",
  //     "poster":	"https://m.media-amazon.com/images/M/MV5BZGM3MWJjZTUtZmYyYi00NWVkLTgzN2ItM2U4ZmExZjIzYjVmXkEyXkFqcGdeQXVyMjI4MjA5MzA@._V1_SX300.jpg"
  //     }
  // ]);

  const dispatch = useDispatch();

  const getListMovies = useCallback(async () => {
    setCurrentPage(1);
    setIsLoading(true);
    setTimeout(() => {
      dispatch(movieActions.fetchMovies(searchValue, currentPage))
    }, 1000)
    setIsLoading(false);
  }, [dispatch, searchValue, currentPage])
  
  useEffect(() => {
    getListMovies();
  }, []);

  const fetchMoreListMovies = () => {
    setTimeout(() => {
      dispatch(movieActions.fetchMovies(searchValue, currentPage))
      setIsLoading(false);
    }, 1000)
  }

  useEffect(() => {
    if (!isLoading) return;
    fetchMoreListMovies();
    console.log('page fetch more: ' + currentPage);

  }, [fetchMoreListMovies]);

  const handleScroll = useCallback(async () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setIsLoading(true);
    setCurrentPage(currentPage + 1);
  }, [currentPage])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='container'>
      <div className='row header'>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}
          getListMovies={getListMovies}/>
      </div>
      <div className='row'>
        {movies && movies.map((movie, index) => (
          <MovieList key={index.toString()} data={movie} />
          ))
        }
      </div>
      <div className='centered-info'>
        <h1>{isLoading && 'Loading data...'}</h1>
      </div>
    </div>
  )
}
export default MovieScreen;

  // return (
  //   <div className='container-fluid movie-app'>
  //     <div className='row'>
  //       <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}
  //         getListMovies={getListMovies} />
  //     </div>
  //     {
  //       <>
  //         <div className='list-container'>
  //           {dummyData.map((movie, index) => (
  //             <MovieList key={index.toString()} data={movie} />
  //             ))
  //           }
  //         </div>
  //         {/* <div className='centered-info'>
  //           <h1>{isLoading && 'Loading data...'}</h1>
  //         </div> */}
  //       </>
  //       // <>
  //       //   <div className='list-container'>
  //       //     {movies.map((movie, index) => (
  //       //       <MovieList key={index.toString()} data={movie} />
  //       //       ))
  //       //     }
  //       //   </div>
  //       //   <div className='centered-info'>
  //       //     <h1>{isLoading && 'Loading data...'}</h1>
  //       //   </div>
  //       // </>
  //     }
  //     {/* {searchValue.length < 1 ?
  //       <h1 className='centered-info'>No movies are shown! Type movie in the search bar to display the movie info</h1>
  //       :
  //       <>
  //         <div className='list-container'>
  //           {movies.map((movie, index) => (
  //             <MovieList key={index.toString()} data={movie} />
  //             ))
  //           }
  //         </div>
  //         <div className='centered-info'>
  //           <h1>{isFetching && 'Loading data...'}</h1>
  //         </div>
  //       </>
  //     } */}
  //   </div>
  // );
// };

