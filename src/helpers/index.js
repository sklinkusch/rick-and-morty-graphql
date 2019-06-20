import React from 'react';

export const paginationButton = (pageCount, setPage, currentPage, width) => {
  const pageButtons = [];
  let beginStart, beginStop;
  let endStart, endStop;
  let maxSide, maxMain, maxTotal;
  if (width > 768) {
    maxTotal = 15;
    maxMain = 5;
    maxSide = 2;
  } else if (width > 576) {
    maxTotal = 11;
    maxMain = 3;
    maxSide = 2;
  } else {
    maxTotal = 7;
    maxMain = 2;
    maxSide = 1;
  }
  if (pageCount > maxTotal) {
    if (currentPage <= maxMain) {
      beginStart = null;
      beginStop = 1;
      endStart = 2 * maxMain + 1;
      endStop = pageCount + 1 - maxSide;
    } else if (currentPage >= pageCount - maxMain) {
      beginStart = maxSide;
      beginStop = currentPage - maxMain;
      endStart = pageCount;
      endStop = null;
    } else {
      beginStart = maxSide;
      beginStop = currentPage - maxMain;
      endStart = currentPage + maxMain;
      endStop = pageCount + 1 - maxSide;
    }
  } else {
    beginStart = null;
    beginStop = 1;
    endStart = pageCount;
    endStop = null;
  }
  if (beginStart) {
    for (let i = 1; i <= beginStart; i++) {
      pageButtons.push(
        <button className="btn btn-primary"
          key={i}
          onClick={() => setPage(i)}
        >{i}</button>
      );
    }
    pageButtons.push(
      <button className="btn btn-secondary" disabled key="start">...</button>
    );
  }
  for (let i = beginStop; i <= endStart; i++) {
    pageButtons.push(
      <button className={currentPage === i ? "btn active btn-secondary" : "btn btn-primary"}
        key={i}
        onClick={() => setPage(i)}
      >{i}</button>
    );
  }
  if (endStop) {
    pageButtons.push(<button className="btn btn-secondary" key="end" disabled>...</button>)
    for (let i = endStop; i <= pageCount; i++) {
      pageButtons.push(
        <button className="btn btn-primary"
          key={i}
          onClick={() => setPage(i)}
        >{i}</button>
      );
    }
  }
  // console.log(pageButtons)
  return pageButtons
}
