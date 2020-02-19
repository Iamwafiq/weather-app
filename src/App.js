import React from 'react';
import './App.css';
import MainPage from './Routes/MainPage/mainPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
     <Router>
          <Switch>
            
            <Route exact path="/">
              <MainPage />
            </Route>    
             
          </Switch>
     
        </Router>
      

    </div>
  );
}

export default App;
