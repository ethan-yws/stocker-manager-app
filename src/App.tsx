import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Balance } from './components/Balance';
import { Canvas } from './components/Canvas';
import { HeaderBar } from './components/HeaderBar';
import { Profile } from './components/Profile';
import { SearchBar } from './components/SearchBar';

function App() {
  const [newStock, setNewStock] = useState<string>('');

  const retrieveInput = (input: string) => setNewStock(input);

  return (
    <Router>
      <div className="App">
        <HeaderBar />
        <Switch>
          <Route exact path="/">
            <SearchBar retrieveInput={retrieveInput} />
            <Canvas userInput={newStock} />
          </Route>
          <Route exact path="/balance" component={Balance} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
