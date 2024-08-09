import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [data, setData] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = async (inputSearch) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=d10eed0ed92048518ee53841240205&q=${inputSearch}`
      );
      setData(response.data.current);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      alert("Failed to fetch weather data");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getData(searchText);
  };

  useEffect(() => {
    setLoading(true);
  }, [searchText]);

  return (
    <>
      <form style={{ padding: "30px" }} onSubmit={handleSubmit}>
        <input
          type="text"
          style={{
            width: "250px",
            height: "27px",
            border: "0px",
            borderRadius: "5px",
            paddingLeft: "10px",
          }}
          placeholder="Enter city name"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          required
        />
        <button
          style={{
            width: "60px",
            height: "30px",
            margin: "20px",
            background: "green",
            color: "white",
            borderRadius: "5px",
            border: "0px",
          }}
        >
          Search
        </button>
      </form>
      {loading ? (
        <p>Loading data ...</p>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {" "}
          <div
            style={{
              width: "180px",
              height: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              flexDirection: "column",
              boxShadow: "2px 2px #ededed",
            }}
            className="weather-cards"
          >
            <b>Temperature</b>
            <br />
            {data?.temp_c + "°C"}
          </div>
          <div
            style={{
              width: "180px",
              height: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              flexDirection: "column",
              boxShadow: "2px 2px #ededed",
            }}
            className="weather-cards"
          >
            <b>Humidity</b>
            <br />
            {data?.humidity + " %"}
          </div>
          <div
            style={{
              width: "180px",
              height: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              flexDirection: "column",
              boxShadow: "2px 2px #ededed",
            }}
            className="weather-cards"
          >
            <b>Condition</b>
            <br />
            {data?.condition?.text}
          </div>
          <div
            style={{
              width: "180px",
              height: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              flexDirection: "column",
              boxShadow: "2px 2px #ededed",
            }}
            className="weather-cards"
          >
            <b>Wind Speed</b>
            <br />
            {data?.wind_kph + " kph"}
          </div>
        </div>
      )}
    </>
  );
};

export default Weather;
