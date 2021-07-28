import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

function BusinessList(props) {
  const businesses = props.businesses;
  return (
    <div className="BusinessList">
      {
        businesses.length > 0 ? 
        businesses.map(business => <Business business={business} key={business.id} />)
        : <div></div>
      }
    </div>
  );
};

export default BusinessList;