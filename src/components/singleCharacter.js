import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost';

const SingleCharacterQuery = gql`
query($page: Int!, $character: String!){
  characters(page: $page, filter: {name: $character}){
    info {
      count
      next
      prev
      pages
    }
    results {
      name
      id
    }
  }
}
`;

const SingleCharacter = () => {
  const [page, setPage] = useState(1);
  const [character, setCharacter] = useState("morty");
  return (
    <>
      <input type="text" value={character} onChange={(event) => setCharacter(event.target.value)} />
      <Query variables={{ page, character }} query={SingleCharacterQuery}>

        {(
          {
            loading,
            error,
            data: { characters: { info: { next, prev, pages, count } = {}, results } = {}
            } = {}
          }
        ) => {
          console.log(loading, error, results);
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error<span role="img" aria-label="error">👅</span></p>

          next = next ? next : 1;
          prev = prev ? prev : 1;
          return (
            <> {count && <span>({count})</span>}
              {results ? results.map(
                ({ name, id }) => (
                  <p key={id}>{name}</p>
                )
              ) : (<p>No Results</p>)}
              {/* Pagination will be here */}
              <button type="button" onClick={() => setPage(prev)}>Prev</button>
              <button type="button" onClick={() => setPage(next)}>Next</button>
              <div>{paginationButton(pages, setPage, next - 1)}</div>
            </>
          );
        }}

      </Query>
    </>
  )
}

const paginationButton = (pageCount, setPage, currentPage) => {
  const pageButtons = [];
  for (let i = 1; i <= pageCount; i++) {
    pageButtons.push(
      <button className={currentPage === i ? "btn active" : "btn"}
        key={i}
        onClick={() => setPage(i)}
      >{i}</button>
    );
  }
  console.log(pageButtons)
  return pageButtons
}

export default SingleCharacter;