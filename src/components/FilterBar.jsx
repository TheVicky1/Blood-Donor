import React from "react";

export default function FilterBar({
  bloodGroups,
  selectedGroup,
  setSelectedGroup,
  searchCity,
  setSearchCity,
}) {
  return (
    <div className="filters">
      <select
        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
      >
        {bloodGroups.map((bg) => (
          <option key={bg} value={bg}>
            {bg}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search by city..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />
    </div>
  );
}