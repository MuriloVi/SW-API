import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
} from "react-router-dom";

//containersImport
import SWMovies from './Containers/SWMovies/SWMovies';
import Planets from './Containers/Planets/Planets';
import Starships from './Containers/Starships/Starships';
import People from './Containers/People/People';

const Routes = () => (

    <BrowserRouter >
        < Switch >
        <Route exact path="/" component={SWMovies}/>
        <Route exact path="/planets" component={Planets}/>
        <Route exact path="/starships" component={Starships}/>
        <Route exact path="/people" component={People}/>
        </Switch>
    </BrowserRouter>

);

export default Routes;