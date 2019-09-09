import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Trips from './components/trips/trips'
import TripDetails from './components/trip-details/trip-details'
import './App.css';


const App = () => {
  console.log(process.env.REACT_APP_BACK_END_API)
  return (
    <div className={'container'}>
      <h1>Illa Challenge</h1>
      <Switch>
        <Route exact path="/" component={Trips} />
        <Route exact path="/trips/:id" component={TripDetails} />
      </Switch>
      
    </div>
  );
};
export default App;
