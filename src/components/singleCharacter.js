import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost';
import "./singleCharacter.scss";

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
      image
      status
      species
      type
      gender
    }
  }
}
`;

const SingleCharacter = () => {
  const [page, setPage] = useState(1);
  const [character, setCharacter] = useState("morty");
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand" href="./">Rick & Morty Characters</a>
        <div className="collapse navbar-collapse">
          <form className="form-inline my-2 my-md-0">
            <input type="text" defaultValue={character}
              onChange={(event) => setCharacter(event.target.value)}
            />
          </form>
        </div>
      </nav>
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

          next = next ? next : pages;
          prev = prev ? prev : 1;
          return (
            <> {count && <p>Your search gave {count} results</p>}
              <div className="row">
                {results ? results.map(
                  ({ name, id, image, status, species, type, gender }) => (
                    <div key={id} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                      <img src={image} alt={name} />
                      <p className="character-name">{name}</p>
                      <ul>
                        <li><span className="italic">species:</span>{species}</li>
                        {type && (<li><span className="italic">type:</span>{type}</li>)}
                        {gender && (<li><span className="italic">gender:</span>{gender}</li>)}
                        {status && (<li><span className="italic">status:</span> {status}</li>)}
                      </ul>
                    </div>
                  )
                ) : (<p>No Results</p>)}
              </div>
              <div>
                {page === 1 ? (<button type="button" className="btn btn-secondary" disabled>Prev</button>) : (<button type="button" className="btn btn-primary" onClick={() => setPage(prev)}>Prev</button>)}
                {page === pages ? (<button type="button" className="btn btn-secondary" disabled>Next</button>) : (<button type="button" className="btn btn-primary" onClick={() => setPage(next)}>Next</button>)}
              </div>
              <div>{paginationButton(pages, setPage, page)}</div>
            </>
          );
        }}

      </Query>
    </>
  )
}

const paginationButton = (pageCount, setPage, currentPage) => {
  const pageButtons = [];
  let start, stop;
  if (pageCount > 11) {
    if (currentPage <= 5) {
      start = 1;
      stop = 11;
    } else if (currentPage >= pageCount - 5) {
      start = pageCount - 10;
      stop = pageCount;
    } else {
      start = currentPage - 5;
      stop = currentPage + 5;
    }
  } else {
    start = 1;
    stop = pageCount;
  }
  for (let i = start; i <= stop; i++) {
    pageButtons.push(
      <button className={currentPage === i ? "btn active btn-secondary" : "btn btn-primary"}
        key={i}
        onClick={() => setPage(i)}
      >{i}</button>
    );
  }
  console.log(pageButtons)
  return pageButtons
}

export default SingleCharacter;