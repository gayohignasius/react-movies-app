import './App.css';
import MovieScreen from './screens/MovieScreen';
import { Provider} from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import movieReducers from './redux/reducers/movie-reducers';
import Routes from './router/index';
import 'bootstrap/dist/css/bootstrap.min.css';
// import MovieListHeading from './components/MovieListHeading';
// import AddFavourite from './components/AddFavourite';

// http://www.omdbapi.com API key : faf7e5bb

const rootReducers = combineReducers({
  movies: movieReducers
})

const store = createStore(rootReducers, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
      {/* <MovieScreen /> */}
  </Provider>
  );
};

export default App