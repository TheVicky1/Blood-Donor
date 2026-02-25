import React, { useEffect, useState } from "react";
import DonorCard from "./components/DonorCard";
import FilterBar from "./components/FilterBar";

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function App() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [searchCity, setSearchCity] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((user) => ({
          id: user.id,
          name: user.name,
          city: user.address.city,
          bloodGroup: bloodGroups[Math.floor(Math.random() * 8) + 1],
          available: Math.random() > 0.3,
          requested: false,
        }));

        setDonors(mapped);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleRequest = (id) => {
    setDonors((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, requested: true } : d
      )
    );
  };

  const filteredDonors = donors
    .filter((d) =>
      selectedGroup === "All" ? true : d.bloodGroup === selectedGroup
    )
    .filter((d) =>
      d.city.toLowerCase().includes(searchCity.toLowerCase())
    )
    .sort((a, b) => b.available - a.available);

  const availableCount = filteredDonors.filter((d) => d.available).length;

  return (
    <div className="app">
      <h1>🩸 Community Blood Donor Finder</h1>

      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <FilterBar
        bloodGroups={bloodGroups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        searchCity={searchCity}
        setSearchCity={setSearchCity}
      />

      <h3>Available Donors: {availableCount}</h3>

      {loading ? (
        <div className="loader">Loading donors...</div>
      ) : filteredDonors.length === 0 ? (
        <p className="no-data">No donors found 😕</p>
      ) : (
        <div className="grid">
          {filteredDonors.map((donor) => (
            <DonorCard
              key={donor.id}
              donor={donor}
              onRequest={handleRequest}
            />
          ))}
        </div>
      )}
    </div>
  );
}