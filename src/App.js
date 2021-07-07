import { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

import "leaflet/dist/leaflet.css";

import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import TableCasos from "./components/TableCasos";
import LineGraph from "./components/LineGraph";

import { sortData } from "./hooks/utils";

import "leaflet/dist/leaflet.css";

import "./App.css";

function App() {
  const [countries, setCountries] = useState(["ARG", "USA", "OK"]);
  const [country, setCountry] = useState("mundo");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const dCountries = data.map((dCountry) => ({
            id: dCountry.countryInfo._id,
            name: dCountry.country,
            value: dCountry.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(dCountries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (ev) => {
    const countryIso = ev.target.value;
    const url =
      countryIso === "mundo"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryIso}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryIso);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  return (
    <div className="App">
      <div className="App__Left">
        <div className="App__Header">
          <h1>Covid Tracker</h1>
          <FormControl className="App__Dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="mundo">Mundo Entero</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.name} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="App__Stats">
          <InfoBox
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Con Coronavirus"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recuperados"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Muertes"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
          casesType={casesType}
        />
      </div>
      <Card className="App__Right">
        <CardContent>
          <h3>Casos Activos por País</h3>
          <TableCasos countries={tableData} />
          <h3>Nuevos {casesType} (Mundo Entero)</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
