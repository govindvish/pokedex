import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { Pokedex } from './container/Pokedex';
import { Pokemon } from './container/Pokemon';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" render={(props) => <Pokedex {...props} />} />
        <Route
          exact
          path="/:pokemonId"
          render={(props) => <Pokemon {...props} />}
        />
        <Redirect path="/" component={Pokemon} />
      </Switch>
    </>
  );
}

export default App;
