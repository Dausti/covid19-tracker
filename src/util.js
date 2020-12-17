import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeByColor = {
  cases: {
    multiplier: 800,
    option: { color:"#cc1034", fillColor: "#cc1034" },
  },
  recovered: {
    multiplier: 1200,
    option: { color:"#7dd71d", fillColor: "#7dd71d" },
  },
  deaths: {
    multiplier: 2000,
    option: { color:"#ff6c47", fillColor: "#ff6c47" }
  },
};

//sort through cases 
export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

//draw circles on map with tooltips
export const drawDataOnMap = (data, casesType = "cases") => (
  data.map(country => (
    <Circle center={[country.countryInfo.lat, country.countryInfo.long]}
    pathOptions={casesTypeByColor[casesType].option}
    fillOpacity={0.35}
    radius={
        Math.sqrt(country[casesType]) * casesTypeByColor[casesType].multiplier}
        >
        <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ))
);

export const stylePrintedStat = (stat) => 
stat ? `+${numeral(stat).format("0.0a")}` : "+0";
