import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { number } from "prop-types";
import "./allCharacter.css";

const allCharactersQuery = gql`
  query($page: Int!) {
    characters(page: $page) {
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

const allCharacters = ({ page, setPage }) => {
  return (
    <>
      <Query variables={{ page }} query={allCharactersQuery}>
        {({
          loading,
          error,
          data: {
            characters: { info: { next, prev, pages } = {}, results } = {}
          } = {}
        }) => {
          console.log(loading, error, next, prev, results);
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          next = next ? next : 1;
          prev = prev ? prev : 1;

          return (
            <>
              {results.map(({ name, id }) => (
                <p key={id}>{name}</p>
              ))}
              <button type="button" onClick={() => setPage(prev)}>
                Prev
              </button>
              <button type="button" onClick={() => setPage(next)}>
                Next
              </button>
              <div>{paginationButtons(pages, setPage, next - 1)}</div>
            </>
          );
        }}
      </Query>
    </>
  );
};

const paginationButtons = (pageCount, setPage, currentPage) => {
  const pageButtons = [];
  console.log(currentPage);
  for (let i = 1; i < pageCount; i++) {
    pageButtons.push(
      <button
        className={currentPage === i ? "active" : ""}
        key={i}
        onClick={() => setPage(i)}
      >
        {i}
      </button>
    );
  }

  return pageButtons;
};

allCharacters.propTypes = {
  page: number.isRequired
};

export default allCharacters;
