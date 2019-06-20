import React, { useState, useEffect } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';
import "./singleCharacter.scss";
import { paginationButton } from '../helpers'

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
      location {
        name
      }
    }
  }
}
`;

const SingleCharacter = () => {
  const [page, setPage] = useState(1);
  const [character, setCharacter] = useState("morty");
  const [isOpen, toggle] = useState(false);
  const [width, setWidth] = useState(null);
  useEffect(
    () => {
      setWidth(window.innerWidth);
      window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, []
  )
  return (
    <>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="./">Rick & Morty Characters</NavbarBrand>
        <NavbarToggler onClick={() => toggle(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Link to="/episodes" className="btn btn-success mr-2">Episodes</Link>
          <form className="form-inline my-2 my-md-0">
            <input type="text" defaultValue={character}
              onChange={(event) => setCharacter(event.target.value)}
            />
          </form>
        </Collapse>
      </Navbar>
      <Query variables={{ page, character }} query={SingleCharacterQuery}>

        {(
          {
            loading,
            error,
            data: { characters: { info: { next, prev, pages, count } = {}, results } = {}
            } = {}
          }
        ) => {
          // console.log(loading, error, results);
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error<span role="img" aria-label="error">👅</span></p>

          next = next ? next : pages;
          prev = prev ? prev : 1;
          return (
            <> {count && <p>Your search gave {count} results on {pages} pages.</p>}
              <div className="row">
                {results ? results.map(
                  ({ name, id, image, status, species, type, gender, location }) => (
                    <div key={id} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                      <img src={image} alt={name} />
                      <p className="character-name">{name}</p>
                      <ul>
                        <li><span className="italic">species:</span>{species}</li>
                        {type && (<li><span className="italic">type:</span>{type}</li>)}
                        {gender && (<li><span className="italic">gender:</span>{gender}</li>)}
                        <li><span className="italic">location:</span>{location.name}</li>
                        {status && (<li><span className="italic">status:</span> {status}</li>)}
                      </ul>
                    </div>
                  )
                ) : (<p>No Results</p>)}
              </div>
              {/* <div className="btn-group mr-2" role="group" aria-label="prevnext"> */}
              {page === 1 ? (<button type="button" className="btn btn-secondary" disabled>Prev</button>) : (<button type="button" className="btn btn-primary" onClick={() => setPage(prev)}>Prev</button>)}
              {page === pages ? (<button type="button" className="btn btn-secondary" disabled>Next</button>) : (<button type="button" className="btn btn-primary" onClick={() => setPage(next)}>Next</button>)}
              {/* </div> */}

              <div>
                {paginationButton(pages, setPage, page, width)}
              </div>
            </>
          );
        }}

      </Query>
    </>
  )
}



export default SingleCharacter;