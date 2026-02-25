import React from "react";

export default function DonorCard({ donor, onRequest }) {
  return (
    <div className={`card ${donor.available ? "" : "unavailable"}`}>
      <h3>{donor.name}</h3>
      <p><strong>Blood:</strong> {donor.bloodGroup}</p>
      <p><strong>City:</strong> {donor.city}</p>
      <p>
        <strong>Status:</strong>{" "}
        {donor.available ? "Available ✅" : "Unavailable ❌"}
      </p>

      <button
        disabled={donor.requested || !donor.available}
        onClick={() => onRequest(donor.id)}
      >
        {donor.requested ? "Request Sent ✅" : "Request Help"}
      </button>
    </div>
  );
}