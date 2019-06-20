import React, { useState, useEffect } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap'
import { paginationButton } from '../helpers'

const allEpisodesQuery = gql`
query($page: Int!){
  episodes(page:$page){
    info {
      count
      next
      prev
      pages
    }
    results {
      id
      name 
      air_date
    }
  }
}
`;


export default function Episodes() {
  const [isOpen, toggle] = useState(false)
  const [page, setPage] = useState(1)
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
        <NavbarBrand href="./">Rick & Morty Episodes</NavbarBrand>
        <NavbarToggler onClick={() => toggle(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Link to="/" className="btn btn-success mr-2">Characters</Link>
        </Collapse>
      </Navbar>
      <Query variables={{ page }} query={allEpisodesQuery}>
        {(
          {
            loading,
            error,
            data: {
              episodes: {
                info: { next, prev, pages, count } = {},
                results
              } = {}
            }
          }
        ) => {
          console.log(loading, error, results);
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error<span role="img" aria-label="error">👅</span></p>

          next = next ? next : pages;
          prev = prev ? prev : 1;
          return (
            <>
              <table className="table table-dark"></table>
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
