import React from 'react';
import { Switch, Route, useLocation } from "react-router-dom";
import DetailMovieScreen from '../screens/DetailMovieScreen';
import MovieScreen from '../screens/MovieScreen';
import MyModal from '../components/MyModal';

const Routes = (props) => {
  let location = useLocation();
  let background = location.state && location.state.background;
  
  return (
    <div>
      <Switch location={background || location}>
        <Route exact path='/' component={MovieScreen} />
        <Route path='/detail/:id' component={DetailMovieScreen} />
        {/* <Route path='/:id' component={MyModal} /> */}
      </Switch>
      {background && <Route path="/detail/:id" children={<MyModal />} />}
    </div>
  )
}

export default Routes