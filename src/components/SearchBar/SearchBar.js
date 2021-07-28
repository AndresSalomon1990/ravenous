import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar(props) {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('best_match');

  const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
  };

  // will be used to check if the sort by option link is active
  const getSortByClass = sortByOption => sortBy === sortByOption ? 'active' : '';

  // sets the state of a sorting option on a click
  const handleSortByClick = sortByOption => setSortBy(sortByOption);

  // sets the state of the term on a change
  const handleTermChange = event => setTerm(event.target.value);

  // sets the state of the location on a change
  const handleLocationChange = event => setLocation(event.target.value);

  // return a li tag with each key of the sortByOptions object
  const renderSortByOptions = () => Object.keys(sortByOptions)
    .map(sortByOption => {
      const sortByOptionValue = sortByOptions[sortByOption];
      return (
        <li 
          key={sortByOptionValue}
          className={getSortByClass(sortByOptionValue)}
          onClick={() => handleSortByClick(sortByOptionValue)}>
            {sortByOption}
        </li>
      );
    });

  // handle the search when the user click Let's Go button, passing the current state
  const handleSearch = event => {
    event.preventDefault();
    props.searchYelp(term, location, sortBy)
  };

  return (
    <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>
          { renderSortByOptions() }
        </ul>
      </div>
      <div className="SearchBar-fields">
        <input placeholder="Search Businesses" onChange={handleTermChange} />
        <input placeholder="Where?" onChange={handleLocationChange} />
      </div>
      <div className="SearchBar-submit">
        <a href='#' onClick={handleSearch} aria-label='Search'>Let's Go</a>
      </div>
    </div>
  );
};

export default SearchBar;