import React, { useState } from "react";
import axios from "axios";

const LocationFinder = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [village, setVillage] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?country=${country}&state=${state}&city=${city}&county=${district}&village=${village}&format=json`
      );

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        console.log(lat);
        console.log(lon);
        setLatitude(lat);
        setLongitude(lon);
        setError("");
      } else {
        setError("Location not found");
      }
    } catch (error) {
      setError("Error fetching location data");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter country name"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter state name"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter district name"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter village name"
        value={village}
        onChange={(e) => setVillage(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {latitude && longitude && (
        <div>
          Latitude: {latitude}, Longitude: {longitude}
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default LocationFinder;
