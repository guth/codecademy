import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

class BusinessList extends React.Component
{
	renderOneLine()
	{
	    return (
	      <div className="BusinessList">
	        {
	          this.props.businesses.map(business => {
	            return <Business business={business} key={business.id} />
	          })
	        }
	      </div>
	    );
  	}

	render()
	{
		const businessComponents = this.props.businesses.map(business => {
			return <Business business={business} key={business.id} />;
		});

		return (
			<div className="BusinessList">
				{businessComponents}
			</div>
		);
	}
}

export default BusinessList;