import React, { useState, useEffect } from 'react';

const Location = ({ setAddressFromLocation }) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if geolocation is available in the browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLocation({ latitude, longitude });

            const fetchedAddress = await getAddressFromLatLng(latitude, longitude);
            setAddress(fetchedAddress);
            setAddressFromLocation(fetchedAddress);  // Send address to parent component

          } catch (error) {
            console.error("Error fetching address:", error);
            setError("Failed to fetch address.");
          }
        },
        (err) => {
          console.error("Geolocation Error:", err);
          setError("Geolocation error: " + err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [setAddressFromLocation]);  // Re-run effect only if setAddressFromLocation changes

  const getAddressFromLatLng = async (lat, lng) => {
    const apiKey = 'pk.57c30aa083841c7fc633e5b66b13fe63';  // LocationIQ API key
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${lat}&lon=${lng}&format=json`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }

      const data = await response.json();
      if (data && data.address) {
        const {
          house_number,
          road,
          suburb,
          neighbourhood,
          hamlet,
          village,
          town,
          city,
          county,
          state_district,
          state,
          postcode,
          country
        } = data.address;

        const parts = [
          house_number,
          road,
          suburb,
          neighbourhood,
          hamlet,
          village,
          town,
          city,
          county,
          state_district,
          state,
          postcode,
          country
        ];

        const fullAddress = parts.filter(Boolean).join(', ');
        return fullAddress;
      } else {
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Unable to fetch address';
    }
  };

  return (
    <div>
      <h3>Your Location</h3>
      {location ? (
        <div className="review-cards" style={{ backgroundColor: "#12a9a1", color: "white", padding: "30px" }}>
          <p><strong>Latitude:</strong> {location.latitude}</p><br />
          <p><strong>Longitude:</strong> {location.longitude}</p><br />
          <p><strong>Address:</strong> {address || "Fetching address..."}</p>
        </div>
      ) : (
        <p>{error || "Fetching location..."}</p>
      )}
    </div>
  );
};

export default Location;
