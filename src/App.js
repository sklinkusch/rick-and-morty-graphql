import React from "react";
// import of Apollo stuff
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import SingleCharacter from "./components/singleCharacter";
import { Switch, Route } from 'react-router-dom'
import Episodes from "./components/Episodes";
// external component
// import AllCharacters from "./components/allCharacters";
// Apollo client
const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/"
});
// functional component
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <div className="App">
          <div className="container">
            <Switch>
              <Route exact path="/" component={SingleCharacter} />
              <Route path="/episodes" component={Episodes} />
            </Switch>
          </div>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
