const apiKey = "EtQikMwYB7nw7Z86BleaBSUawPcdcN1RYeID0Kxz3uZZQwDXOKdusFf83QGlbj4Kv_g2AnzPfjQkCg4DUY58d79CeajVMjyIIqi1gOk3j_OZVToj7bXd2oszs8ulWnYx";
// fetch() Polyfill: npm install whatwg-fetch --save
// https://www.yelp.com/developers/documentation/v3/business

class Yelp
{
	search(term, location, sortBy)
	{
		const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
		const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
		
		return fetch(corsAnywhere + yelpUrl, {
			headers: { "Authorization": `Bearer ${apiKey}` },
		}).then(response => {
			return response.json();
		}).then(jsonResponse => {
			if(jsonResponse.businesses) {
				return jsonResponse.businesses.map(business => {
					return {
						id: business.id,
						imageSrc: business.image_url,
						name: business.name,
						address: business.location.address1,
						city: business.location.city,
						state: business.location.state,
						zipCode: business.location.zip_code,
						category: business.categories[0].title,
						rating: business.rating,
						reviewCount: business.review_count,
					}
				});
			}
		});
	}
}

export default Yelp;