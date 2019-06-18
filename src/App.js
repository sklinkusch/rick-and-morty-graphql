import React from "react";
// import of Apollo stuff
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import SingleCharacter from "./components/singleCharacter";
// external component
// import AllCharacters from "./components/allCharacters";
// Apollo client
const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/"
});
// functional component
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* <AllCharacters /> */}
        <SingleCharacter />
      </div>
    </ApolloProvider>
  );
}

export default App;
