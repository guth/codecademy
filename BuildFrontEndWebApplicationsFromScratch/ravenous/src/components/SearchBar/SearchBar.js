import React from 'react';
import './SearchBar.css';

// https://www.yelp.com/developers/documentation/v3/business_search

const sortByOptions = {
	'Best Match': 'best_match',
	'Highest Rated': 'rating',
	'Most Reviewed': 'review_count',
};

class SearchBar extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			term: "",
			location: "",
			sortBy: "best_match",
		};
	}

	render()
	{
		return (
			<div className="SearchBar">
				<div className="SearchBar-sort-options">
					<ul>
						{ this.renderSortByOptions() }
					</ul>
				</div>
				<div className="SearchBar-fields">
					<input placeholder="Search Businesses" />
					<input placeholder="Where?" />
				</div>
				<div className="SearchBar-submit">
					<a>Let's Go</a>
				</div>
			</div>
		);
	}

	renderSortByOptions()
	{
		return Object.keys(sortByOptions).map(sortByOption =>
		{
			let sortByOptionValue = sortByOptions[sortByOption];
			return (
				<li
					key={sortByOptionValue}
					className={this.getSortByClass(sortByOptionValue)}
					onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
						{sortByOption}
				</li>
			);
		});
	}

	getSortByClass(sortByOption)
	{
		return (this.state.sortBy === sortByOption) ? "active" : "";
	}

	handleSortByChange(sortByOption)
	{
		this.setState({
			sortBy: sortByOption
		});
	}
}

export default SearchBar;