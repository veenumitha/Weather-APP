//store the API key which is sent along with the request.
//there are two differnt end points, one to get the city information in which it has city code.
// with the help of this city code a request is made to weather information API end point. 
//API reference from ACC weather site has different API services.
const key = 'f22faJhLwiyFpmDVX6SEJzpSErcTRrAH';
// A request is made to the location API to get the information of the city the user types in. 
// this information has a KEY code inside which is used to make another request to current condition API.
// 
const getWeather = async (id) => {
    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    //url is the API end point
    
    const query = `${id}?apikey=${key}`;
    //id is the location id.
   
    const Response = await fetch(base + query);
    const data = await Response.json();
    return data[0];

};


const getCity = async (city) => {
    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    //base URL of the API endpoint to make a request.
    const query = `?apikey=${key}&q=${city}`;
 //add the query parameters to the end of the URL as template strings.
    //city here is the parameter to the async function which returns as a variable.
    const Response = await fetch(base + query);
    //concatenate the url and query to fetch the resources.
    // the response has to wait untill the promise is resolved (Async getCIty constant).
    const data = await Response.json();
    //converting the response from fetch into a data using json method.
    // the response is now resolved and is returned into the variable. 
    return data[0];
    //since the first match is the closet, the first position is used to return a single object
};


getCity('city').then(data => {
    //first we get city information with the key.
    
   return getWeather(data.Key);
    //this Key is passed on to the data. 
}).then (data => {
    //when the getWeather promise is resolved the data is logged on to the console
   console.log(data);
}).catch(err => console.log(err));
