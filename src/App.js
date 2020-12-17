import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import './App.css';
import { sortData } from './util';
import "leaflet/dist/leaflet.css";

function App() {

  //Use states
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);


  // get worldwide data once when page is loaded
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, []); // <-- empty brackets = 1 execution when App() loads


  // fetch data and map through each country's data
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          //sort through the data
          //using util.js sort function
        const sortedData = sortData(data); // sort data by largest # of cases and display in table from greatest to least
        setTableData(sortedData);
        setCountries(countries);
        setMapCountries(data);
      });

    };
    getCountriesData();
  }, []);


  //e = trigger event to cause change (country changed)
  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);

      // All data from the country response
      setCountryInfo(data);

      //pass in array of lat & lng coords. from url fetch and set mapcenter to corresponding coords of country
      countryCode === "worldwide" ? setMapCenter([34.80746, -40.4796]) : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      countryCode === "worldwide" ? setMapZoom(3) : setMapZoom(4);

    });
  }


  return (
    <div className="app">

    <div className="app__left">
    <div className="app__header">
    <h1>COVID-19 Tracker</h1>
    <FormControl className="app__dropdown">
    <Select variant="outlined" onChange={onCountryChange} value={country}>
    <MenuItem value="worldwide">Worldwide</MenuItem>
    {/*loop through all countries and show dropdown list of all countries*/}
    {
      countries.map(country => (
        <MenuItem value={country.value}>
        {country.name}</MenuItem>
      ))}
      
    </Select>
    </FormControl>
    </div>

    <div className="app__stats">
    <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
    <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
    <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
    </div> 

    {/* map */}
    <Map countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
    </div> 

    <Card className="app__right">
    <CardContent>
    {/* table */}
    <h3>Live cases by country</h3>
    <Table countries={tableData}/>

    <h3>Worldwide new cases</h3>
    <LineGraph />
    </CardContent>
    </Card>

    </div>
  );
}

export default App;
