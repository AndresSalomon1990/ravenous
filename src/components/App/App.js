import React, { useState } from 'react';
import './App.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';

function App() {
  const [businesses, setBusinesses] = useState([]);

  const searchYelp = (term, location, sortBy) => {
    fetch(`yelp?term=${term}&location=${location}&sortBy=${sortBy}`)
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse);
        if (jsonResponse.businesses.length > 0) {
          const businesses = jsonResponse.businesses.map(business => {
            const yelpData = {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0],
              rating: business.rating,
              reviewCount: business.review_count
            };

            return yelpData;
          });

          setBusinesses(businesses);
        }
      })
    .catch(err => setBusinesses([]))
  };

  return (
    <div className="App">
      <h1>ravenous</h1>
      <SearchBar searchYelp={searchYelp} />
      <BusinessList businesses={businesses} />
    </div>
  );
}

export default App;